import { VIDEO_NEGATIVE_PROMPTS } from '../../utils/parsers';

export function buildCharacterManifest(characters, fallbackText) {
  if (characters.length === 0) {
    return `- **Main Focus**: ${fallbackText}`;
  }

  return characters.map(char => {
    let bio = `- **${char.name}**: ${char.description}`;
    if (char.voice_attributes) bio += `, voice direction: ${char.voice_attributes}`;
    if (char.motion_signature) bio += `, movement style: ${char.motion_signature}`;
    return bio;
  }).join('\n');
}

export function buildVoiceDirection(dialogue) {
  if (dialogue.length === 0) return '';

  return '\n- **Voice & Dubbing Specs:** All character speech must be in natural Brazilian Portuguese (pt-BR) with flawless lip-sync. Voice acting should be highly expressive, charismatic, and energetic, matching comedic influencer delivery. Use realistic breaths and modern pacing.';
}

export function buildNegativePrompt() {
  return [
    "subtitles", "text", "watermark", "distortions", "unrealistic proportions", "flickering lighting",
    "extra characters not in the brief",
    ...VIDEO_NEGATIVE_PROMPTS
  ].join(', ');
}

export function buildSfxBlock(hasAudio, sfxValText) {
  if (!hasAudio) {
    return '* Disabled - No audio generation requested. Completely silent video track.';
  }

  return `* **Foreground Layer (Dialogue & SFX):** Clear, staggered speech in pt-BR with expressive voice acting matching character emotions. SFX: Continuous action-synced sound effects (e.g. footsteps, object handling) matching: ${sfxValText}.
  * **Midground Layer (Music):** Soft supporting atmospheric musical texture, zero heavy beats, no vocal masks.
  * **Background Layer (Ambience):** Steady environmental background noise bed.
  * **Mixing & Ducking:** All background layers (Music & Ambience) are ducked to -12dB when characters speak. No crosstalk.`;
}

export function buildNoDialogueSfxBlock(hasAudio, sfxValText) {
  if (!hasAudio) {
    return '* Disabled - No audio generation requested. Completely silent video track.';
  }

  return `* **Foreground Layer (SFX):** High-fidelity action-synced sound effects (SFX) matching: ${sfxValText}. High kinetic audio precision.
  * **Midground Layer (Music):** Thematic cinematic musical bed matching the scene mood.
  * **Background Layer (Ambience):** Immersive environmental ambiance.
  * **Mixing & Ducking:** Balanced cinematic audio mix with strong foreground sound effects and supportive background atmosphere.`;
}

export function buildMultishotSfxBlock(hasAudio, sfxValText) {
  if (!hasAudio) {
    return '* Disabled - No audio generation requested. Completely silent video track.';
  }

  return `* **Foreground Layer (Dialogue & SFX):** Flawless, expressive pt-BR speech by '{character}' with '{emotion}' tone. SFX: Action-synced sound effects matching: ${sfxValText}.
  * **Midground Layer (Music):** Supporting non-intrusive musical score or background pads, zero intrusive beats, avoiding speech masking (e.g., minimal reflective piano underscore).
  * **Background Layer (Ambience):** Background environmental bed matching the scene atmosphere.
  * **Mixing & Ducking:** Complete separation of dialogue, music, and SFX. Music and Ambience are ducked to -12dB during speech to prevent masking. No animal onomatopoeias in speech.`;
}
