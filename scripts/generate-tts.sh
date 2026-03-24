#!/usr/bin/env bash
# =============================================================================
# generate-tts.sh — TTS Audio Generation for Remotion Video Pipeline
# =============================================================================
#
# Generates narration audio files from script.md using OpenAI TTS API.
# Each audio file is speed-adjusted to match its exact scene duration.
#
# USAGE:
#   ./scripts/generate-tts.sh                    # Generate all 12 parts
#   ./scripts/generate-tts.sh 1 3                # Generate only parts 1 and 3
#   ./scripts/generate-tts.sh --dry-run          # Show what would be generated
#   ./scripts/generate-tts.sh --voice shimmer    # Use a different voice
#   ./scripts/generate-tts.sh --model tts-1-hd   # Use HD model
#
# REQUIREMENTS:
#   - OPENAI_API_KEY environment variable (or ~/.openai-key file)
#   - curl, ffmpeg, ffprobe, python3, jq
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

# TTS settings
MODEL="${TTS_MODEL:-tts-1}"
VOICE="${TTS_VOICE:-onyx}"
SPEED="${TTS_SPEED:-1.0}"           # Base speed (1.0 = natural)
MAX_ATEMPO=2.0                      # ffmpeg atempo range
MIN_ATEMPO=0.5

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
      head -20 "$0" | grep "^#" | sed 's/^# \?//'
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

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  # Try ~/.openai-key file
  if [[ -f "$HOME/.openai-key" ]]; then
    OPENAI_API_KEY="$(cat "$HOME/.openai-key")"
  # Try OpenClaw agent models.json (Dagon's config has OpenAI key)
  elif [[ -f "$HOME/.openclaw/agents/dagon/agent/models.json" ]]; then
    OPENAI_API_KEY="$(python3 -c "
import json
with open('$HOME/.openclaw/agents/dagon/agent/models.json') as f:
    data = json.load(f)
providers = data.get('providers', {})
openai = providers.get('openai', {})
key = openai.get('apiKey', '')
if key and key.startswith('sk-'):
    print(key)
" 2>/dev/null)"
  fi

  # Try any agent's models.json
  if [[ -z "${OPENAI_API_KEY:-}" ]]; then
    for agent_dir in "$HOME/.openclaw/agents"/*/agent/models.json; do
      [[ -f "$agent_dir" ]] || continue
      OPENAI_API_KEY="$(python3 -c "
import json
with open('$agent_dir') as f:
    data = json.load(f)
providers = data.get('providers', {})
openai = providers.get('openai', {})
key = openai.get('apiKey', '')
if key and key.startswith('sk-'):
    print(key)
" 2>/dev/null)"
      [[ -n "$OPENAI_API_KEY" ]] && break
    done
  fi

  if [[ -z "${OPENAI_API_KEY:-}" ]]; then
    echo "❌ OPENAI_API_KEY not found"
    echo "   Options:"
    echo "   1. export OPENAI_API_KEY=sk-..."
    echo "   2. echo 'sk-...' > ~/.openai-key"
    echo "   3. Configure in OpenClaw agent auth profile"
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

# --- Functions ----------------------------------------------------------------

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

  # Step 1: Generate raw TTS audio
  local json_text
  json_text=$(python3 -c "import json,sys; print(json.dumps(sys.argv[1]))" "$text")

  echo "  → Calling OpenAI TTS API..."
  local http_code
  http_code=$(curl -s -w "%{http_code}" -X POST "https://api.openai.com/v1/audio/speech" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"model\": \"$MODEL\", \"voice\": \"$VOICE\", \"input\": $json_text, \"speed\": $SPEED}" \
    -o "$raw_file")

  if [[ "$http_code" != "200" ]]; then
    echo "  ❌ API returned HTTP $http_code"
    [[ -f "$raw_file" ]] && cat "$raw_file"
    return 1
  fi

  # Step 2: Get raw duration
  local raw_dur
  raw_dur=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$raw_file" 2>/dev/null)
  echo "  → Raw duration: ${raw_dur}s"

  if [[ -z "$raw_dur" || "$raw_dur" == "0" ]]; then
    echo "  ❌ Failed to get duration from raw file"
    return 1
  fi

  # Step 3: Calculate speed adjustment
  local atempo
  atempo=$(python3 -c "print(round($raw_dur / $target_dur, 6))")
  echo "  → Speed ratio: ${atempo}x"

  # Step 4: Apply speed adjustment + loudness normalization
  local in_range
  in_range=$(python3 -c "print('yes' if $MIN_ATEMPO <= $atempo <= $MAX_ATEMPO else 'no')")

  if [[ "$in_range" == "yes" ]]; then
    echo "  → Applying atempo=${atempo} + loudnorm..."
    ffmpeg -y -i "$raw_file" \
      -af "atempo=${atempo},loudnorm=I=-16:TP=-1:LRA=11" \
      -ar 48000 -ac 2 \
      "$out_file" 2>/dev/null
  else
    echo "  ⚠️  atempo ${atempo} out of range [${MIN_ATEMPO}-${MAX_ATEMPO}], using pad+trim..."
    ffmpeg -y -i "$raw_file" \
      -af "apad=whole_dur=${target_dur},loudnorm=I=-16:TP=-1:LRA=11" \
      -t "$target_dur" -ar 48000 -ac 2 \
      "$out_file" 2>/dev/null
  fi

  # Step 5: Verify final duration
  local final_dur
  final_dur=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$out_file" 2>/dev/null)
  local diff
  diff=$(python3 -c "print(f'{abs($final_dur - $target_dur):.3f}')")

  if python3 -c "exit(0 if abs($final_dur - $target_dur) <= 0.2 else 1)"; then
    echo "  ✅ Final: ${final_dur}s (target: ${target_dur}s, Δ${diff}s)"
  else
    echo "  ⚠️  Final: ${final_dur}s (target: ${target_dur}s, Δ${diff}s — outside ±0.2s tolerance)"
  fi

  # Step 6: Copy to public dir
  cp "$out_file" "$pub_file"
  echo "  → Copied to public/audio/"
}

# --- Main ---------------------------------------------------------------------

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  TTS Audio Generator — Remotion Video Pipeline           ║"
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
