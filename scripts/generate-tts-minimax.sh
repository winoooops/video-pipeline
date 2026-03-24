#!/usr/bin/env bash
# =============================================================================
# generate-tts-minimax.sh — MiniMax Async TTS for Remotion Video Pipeline
# =============================================================================
#
# Generates narration audio using MiniMax's async TTS API (speech-2.8-hd).
# Falls back to this when OpenAI quota is exhausted.
#
# USAGE:
#   ./scripts/generate-tts-minimax.sh                # Generate all 12 parts
#   ./scripts/generate-tts-minimax.sh 1 3            # Generate only parts 1 and 3
#   ./scripts/generate-tts-minimax.sh --dry-run      # Show what would be generated
#   ./scripts/generate-tts-minimax.sh --voice deep_male_2   # Different voice
#   ./scripts/generate-tts-minimax.sh --model speech-2.8-turbo  # Faster model
#
# REQUIREMENTS:
#   - MINIMAX_API_KEY env variable (or auto-discovered from OpenClaw config)
#   - curl, ffmpeg, ffprobe, python3
#
# API FLOW (Async):
#   1. POST /v1/t2a_async_v2  → get task_id
#   2. GET  /v1/query/t2a_async_query_v2?task_id=X  → poll until done → get file_id
#   3. GET  /v1/files/retrieve_content?file_id=X  → download audio
#
# OUTPUT:
#   - src/assets/audio/part_XX.mp3  (source files for Remotion)
#   - public/audio/part_XX.mp3      (public copies)
#
# =============================================================================

set -euo pipefail

# --- Configuration -----------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ASSET_DIR="$PROJECT_ROOT/src/assets/audio"
PUBLIC_DIR="$PROJECT_ROOT/public/audio"
TMP_DIR="$PROJECT_ROOT/.tts-tmp"

# MiniMax TTS settings
MODEL="${MINIMAX_MODEL:-speech-2.8-hd}"
VOICE="${MINIMAX_VOICE:-audiobook_male_1}"
SPEED="${MINIMAX_SPEED:-1.0}"
VOLUME="${MINIMAX_VOLUME:-10}"
PITCH="${MINIMAX_PITCH:-1}"
SAMPLE_RATE="${MINIMAX_SAMPLE_RATE:-32000}"
BITRATE="${MINIMAX_BITRATE:-128000}"
FORMAT="mp3"
CHANNELS=2

# Polling settings
POLL_INTERVAL=3        # seconds between status checks
POLL_TIMEOUT=120       # max seconds to wait per task

# Scene durations (seconds) — from script.md SCENE TIMING TABLE
declare -A SCENE_DURATIONS=(
  [1]=11.0   [2]=18.0   [3]=17.5   [4]=17.5
  [5]=17.5   [6]=18.0   [7]=18.0   [8]=18.0
  [9]=18.0   [10]=18.0  [11]=18.0  [12]=20.5
)

# Narration text for each scene — from script.md AUDIO sections
declare -A SCENE_TEXT=(
  [1]="Three engineers. Five months. One million lines of code. Zero lines typed by a human."
  [2]="This isn't a thought experiment. This is what actually shipped. OpenAI's Symphony team. Three engineers, five months, everything written by Codex. And the real innovation wasn't Codex. It was what they built around it."
  [3]="When the code came out bad, the instinct was to blame the model. We thought: better AI, better code. We were wrong."
  [4]="Codex can only work with what's in the repo. Google Docs, Slack threads, decisions in someone's head — none of it exists to the model. What Codex can't see, doesn't exist."
  [5]="The gap is always yours. When an agent produces bad code, almost never is the model the problem. The gap is in what we provided. The model did what we made possible."
  [6]="Here's a real example from Symphony. Agents kept duplicating a concurrency helper. The same function, defined three different times, three different places. Three different agents, none of them aware of the others."
  [7]="The old instinct: write a note. Please don't do this. The new instinct: write a linter. A rule that makes it impossible — at parse time, before the code even runs — to define this function anywhere except one canonical location. Not a note. A lint."
  [8]="Their architecture followed a rule: Service can use Types, but Types can never import Service. This isn't a note in a README. It's enforced by the build system. Agents working in one domain see an opaque interface — they don't need to page in the entire codebase. The same principle as loading a SKILL.md file: description first, details on demand."
  [9]="Ryan was a backend infra engineer. He couldn't get good React from Codex. So they hired a frontend architect — Sarah. She encoded her taste into shared infrastructure: single-hook-per-file, snapshot testing, small components. After that, everyone's Codex produced better React. Not because the model changed. Because the codebase now contained the taste of someone who knew what good frontend looked like."
  [10]="And it's not just product code. Everything is agent-generated: CI configuration, internal dev tools, documentation, eval harnesses, review comments, scripts that manage the repo itself, production dashboard definitions. The full surface area. All of it needs to be legible, consistent, worth copying."
  [11]="The goal isn't to replace engineers. The goal is autonomy — agents that work longer, more reliably, with less hand-holding. Not because the models got better. Because the foundation got clearer."
  [12]="The bottleneck isn't the AI. It's the infrastructure around it. If you're getting slop from your coding agents, look at your lint rules, your docs, your architecture. The fix is almost always yours, not the model's. In the agent-first world, scaffolding matters more than the code itself."
)

# --- Parse Arguments ----------------------------------------------------------

DRY_RUN=false
PARTS_TO_GENERATE=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)    DRY_RUN=true; shift ;;
    --voice)      VOICE="$2"; shift 2 ;;
    --model)      MODEL="$2"; shift 2 ;;
    --speed)      SPEED="$2"; shift 2 ;;
    --help|-h)
      head -25 "$0" | grep "^#" | sed 's/^# \?//'
      exit 0
      ;;
    *)
      if [[ "$1" =~ ^[0-9]+$ ]] && (( $1 >= 1 && $1 <= 12 )); then
        PARTS_TO_GENERATE+=("$1")
      else
        echo "❌ Invalid argument: $1 (expected 1-12 or --flag)"
        exit 1
      fi
      shift
      ;;
  esac
done

# Default: generate all parts
if [[ ${#PARTS_TO_GENERATE[@]} -eq 0 ]]; then
  PARTS_TO_GENERATE=(1 2 3 4 5 6 7 8 9 10 11 12)
fi

# --- Resolve API Key ----------------------------------------------------------

if [[ -z "${MINIMAX_API_KEY:-}" ]]; then
  # Try OpenClaw agent models.json (any agent)
  for agent_dir in "$HOME/.openclaw/agents"/*/agent/models.json; do
    [[ -f "$agent_dir" ]] || continue
    MINIMAX_API_KEY="$(python3 -c "
import json
with open('$agent_dir') as f:
    data = json.load(f)
providers = data.get('providers', {})
for key in ['minimax-cn', 'minimax', 'minimax-portal']:
    p = providers.get(key, {})
    k = p.get('apiKey', '')
    if k and k.startswith('sk-'):
        print(k)
        break
" 2>/dev/null)"
    [[ -n "${MINIMAX_API_KEY:-}" ]] && break
  done

  if [[ -z "${MINIMAX_API_KEY:-}" ]]; then
    echo "❌ MINIMAX_API_KEY not found"
    echo "   Options:"
    echo "   1. export MINIMAX_API_KEY=sk-..."
    echo "   2. Configure in OpenClaw agent models.json"
    exit 1
  fi
fi

# --- Dependency Check ---------------------------------------------------------

for cmd in curl ffmpeg ffprobe python3; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "❌ Missing dependency: $cmd"
    exit 1
  fi
done

# --- API Functions ------------------------------------------------------------

# Create async TTS task → returns task_id
create_tts_task() {
  local text="$1"
  local json_text
  json_text=$(python3 -c "import json,sys; print(json.dumps(sys.argv[1]))" "$text")

  local payload
  payload=$(cat <<PAYLOADEOF
{
  "model": "$MODEL",
  "text": $json_text,
  "language_boost": "en",
  "voice_setting": {
    "voice_id": "$VOICE",
    "speed": $SPEED,
    "vol": $VOLUME,
    "pitch": $PITCH
  },
  "audio_setting": {
    "audio_sample_rate": $SAMPLE_RATE,
    "bitrate": $BITRATE,
    "format": "$FORMAT",
    "channel": $CHANNELS
  }
}
PAYLOADEOF
)

  local response
  response=$(curl -s -X POST "https://api.minimaxi.com/v1/t2a_async_v2" \
    -H "Authorization: Bearer $MINIMAX_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload")

  local task_id
  task_id=$(echo "$response" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('task_id',''))" 2>/dev/null)

  if [[ -z "$task_id" ]]; then
    echo "ERROR: Failed to create task. Response: $response" >&2
    return 1
  fi

  echo "$task_id"
}

# Poll task status → returns file_id when done
poll_task() {
  local task_id="$1"
  local elapsed=0

  while (( elapsed < POLL_TIMEOUT )); do
    local response
    response=$(curl -s -X GET \
      "https://api.minimaxi.com/v1/query/t2a_async_query_v2?task_id=${task_id}" \
      -H "Authorization: Bearer $MINIMAX_API_KEY" \
      -H "Content-Type: application/json")

    local status
    status=$(echo "$response" | python3 -c "
import json,sys
d = json.load(sys.stdin)
status = d.get('status', d.get('task_status', ''))
# MiniMax uses different status field names
if not status:
    # Try nested
    status = d.get('data', {}).get('status', '')
print(status)
" 2>/dev/null)

    case "$status" in
      "Success"|"success"|"2"|"Completed"|"completed")
        # Extract file_id
        local file_id
        file_id=$(echo "$response" | python3 -c "
import json,sys
d = json.load(sys.stdin)
fid = d.get('file_id', '')
if not fid:
    fid = d.get('data', {}).get('file_id', '')
if not fid:
    fid = d.get('output_file_id', '')
print(fid)
" 2>/dev/null)
        echo "$file_id"
        return 0
        ;;
      "Failed"|"failed"|"4"|"Error"|"error")
        echo "ERROR: Task failed. Response: $response" >&2
        return 1
        ;;
      "Processing"|"processing"|"1"|"Preparing"|"preparing"|"0"|"Queued"|"queued"|"")
        printf "." >&2
        sleep "$POLL_INTERVAL"
        elapsed=$((elapsed + POLL_INTERVAL))
        ;;
      *)
        echo "WARN: Unknown status '$status'" >&2
        sleep "$POLL_INTERVAL"
        elapsed=$((elapsed + POLL_INTERVAL))
        ;;
    esac
  done

  echo "ERROR: Timeout after ${POLL_TIMEOUT}s" >&2
  return 1
}

# Download audio file
download_audio() {
  local file_id="$1"
  local output_path="$2"

  curl -s -X GET \
    "https://api.minimaxi.com/v1/files/retrieve_content?file_id=${file_id}" \
    -H "Authorization: Bearer $MINIMAX_API_KEY" \
    -H "Content-Type: application/json" \
    -o "$output_path"

  # Verify it's actually audio (not an error JSON)
  local file_type
  file_type=$(file -b --mime-type "$output_path" 2>/dev/null)
  if [[ "$file_type" == "application/json" || "$file_type" == "text/plain" ]]; then
    echo "ERROR: Downloaded file is not audio. Content: $(head -c 200 "$output_path")" >&2
    return 1
  fi

  return 0
}

# --- Main Generate Function --------------------------------------------------

generate_part() {
  local part_num="$1"
  local target_dur="${SCENE_DURATIONS[$part_num]}"
  local text="${SCENE_TEXT[$part_num]}"
  printf -v part_id "%02d" "$part_num"

  local raw_file="$TMP_DIR/part_${part_id}_raw.mp3"
  local out_file="$ASSET_DIR/part_${part_id}.mp3"
  local pub_file="$PUBLIC_DIR/part_${part_id}.mp3"

  echo ""
  echo "━━━ Part $part_id ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Target: ${target_dur}s"
  echo "  Voice:  $VOICE ($MODEL)"
  echo "  Text:   ${text:0:60}..."

  if $DRY_RUN; then
    echo "  [DRY RUN] Would generate → $out_file"
    return 0
  fi

  # Step 1: Create async TTS task
  echo "  → Creating MiniMax TTS task..."
  local task_id
  task_id=$(create_tts_task "$text") || return 1
  echo "  → Task ID: $task_id"

  # Step 2: Poll until complete
  echo -n "  → Polling status"
  local file_id
  file_id=$(poll_task "$task_id") || return 1
  echo ""
  echo "  → File ID: $file_id"

  # Step 3: Download audio
  echo "  → Downloading audio..."
  download_audio "$file_id" "$raw_file" || return 1

  # Step 4: Get raw duration
  local raw_dur
  raw_dur=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$raw_file" 2>/dev/null)
  echo "  → Raw duration: ${raw_dur}s"

  if [[ -z "$raw_dur" || "$raw_dur" == "0" || "$raw_dur" == "N/A" ]]; then
    echo "  ❌ Failed to get duration from downloaded file"
    return 1
  fi

  # Step 5: Speed-adjust to match target duration
  local atempo
  atempo=$(python3 -c "print(round($raw_dur / $target_dur, 6))")
  echo "  → Speed ratio: ${atempo}x"

  local in_range
  in_range=$(python3 -c "print('yes' if 0.5 <= $atempo <= 2.0 else 'no')")

  if [[ "$in_range" == "yes" ]]; then
    echo "  → Applying atempo=${atempo} + loudnorm..."
    ffmpeg -y -i "$raw_file" \
      -af "atempo=${atempo},loudnorm=I=-16:TP=-1:LRA=11" \
      -ar 48000 -ac 2 \
      "$out_file" 2>/dev/null

    # If result is too short after atempo, pad with silence to exact target
    local check_dur
    check_dur=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$out_file" 2>/dev/null)
    local is_short
    is_short=$(python3 -c "print('yes' if $check_dur < $target_dur - 0.1 else 'no')")
    if [[ "$is_short" == "yes" ]]; then
      echo "  → Padding ${check_dur}s → ${target_dur}s..."
      local padded="$TMP_DIR/part_${part_id}_padded.mp3"
      ffmpeg -y -i "$out_file" \
        -af "apad=whole_dur=${target_dur}" \
        -t "$target_dur" -ar 48000 -ac 2 \
        "$padded" 2>/dev/null
      mv "$padded" "$out_file"
    fi
  else
    echo "  ⚠️  atempo ${atempo} out of range, using pad+trim..."
    ffmpeg -y -i "$raw_file" \
      -af "apad=whole_dur=${target_dur},loudnorm=I=-16:TP=-1:LRA=11" \
      -t "$target_dur" -ar 48000 -ac 2 \
      "$out_file" 2>/dev/null
  fi

  # Step 6: Verify final duration
  local final_dur
  final_dur=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$out_file" 2>/dev/null)
  local diff
  diff=$(python3 -c "print(f'{abs($final_dur - $target_dur):.3f}')")

  if python3 -c "exit(0 if abs($final_dur - $target_dur) <= 0.2 else 1)"; then
    echo "  ✅ Final: ${final_dur}s (target: ${target_dur}s, Δ${diff}s)"
  else
    echo "  ⚠️  Final: ${final_dur}s (target: ${target_dur}s, Δ${diff}s — outside ±0.2s tolerance)"
  fi

  # Step 7: Copy to public dir
  cp "$out_file" "$pub_file"
  echo "  → Copied to public/audio/"
}

# --- Main ---------------------------------------------------------------------

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  MiniMax TTS Generator — Remotion Video Pipeline         ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║  Model: $MODEL"
echo "║  Voice: $VOICE"
echo "║  Speed: $SPEED"
echo "║  Parts: ${PARTS_TO_GENERATE[*]}"
if $DRY_RUN; then
echo "║  Mode:  DRY RUN"
fi
echo "╚═══════════════════════════════════════════════════════════╝"

# Create directories
mkdir -p "$ASSET_DIR" "$PUBLIC_DIR" "$TMP_DIR"

# Generate each part
FAILED=()
for part in "${PARTS_TO_GENERATE[@]}"; do
  if ! generate_part "$part"; then
    FAILED+=("$part")
  fi
done

# Cleanup tmp
rm -rf "$TMP_DIR"

# --- Verification Summary ----------------------------------------------------

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  VERIFICATION SUMMARY"
echo "═══════════════════════════════════════════════════════════"

TOTAL_ACTUAL=0
TOTAL_EXPECTED=0

printf "  %-12s  %8s  %8s  %8s  %6s\n" "File" "Target" "Actual" "Diff" "Status"
printf "  %-12s  %8s  %8s  %8s  %6s\n" "────────────" "────────" "────────" "────────" "──────"

for i in $(seq 1 12); do
  printf -v part_id "%02d" "$i"
  local_file="$ASSET_DIR/part_${part_id}.mp3"
  target="${SCENE_DURATIONS[$i]}"
  TOTAL_EXPECTED=$(python3 -c "print($TOTAL_EXPECTED + $target)")

  if [[ -f "$local_file" ]]; then
    actual=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$local_file" 2>/dev/null)
    TOTAL_ACTUAL=$(python3 -c "print($TOTAL_ACTUAL + $actual)")
    diff=$(python3 -c "print(f'{$actual - $target:+.2f}')")
    ok=$(python3 -c "print('✅' if abs($actual - $target) <= 0.2 else '⚠️')")
    printf "  part_%s.mp3  %8.2f  %8.2f  %8s  %s\n" "$part_id" "$target" "$actual" "$diff" "$ok"
  else
    printf "  part_%s.mp3  %8.2f  %8s  %8s  ❌\n" "$part_id" "$target" "MISSING" "—"
  fi
done

echo ""
echo "  Total expected: ${TOTAL_EXPECTED}s"
echo "  Total actual:   ${TOTAL_ACTUAL}s"
echo ""

if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo "  ❌ Failed parts: ${FAILED[*]}"
  exit 1
else
  echo "  ✅ All parts generated successfully"
fi
