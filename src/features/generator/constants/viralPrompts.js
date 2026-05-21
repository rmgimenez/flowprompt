export const VIRAL_PROMPTS = {
  'video-from-frames': {
    speech: `{
  "cinematography": {
    "camera_type": "handheld",
    "movement": {
      "type": "orbit_cw",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "medium"
  },
  "subject": {
    "primary": {
      "type": "guided_by_frames",
      "description": "seamless high-fidelity transition optimized for vertical social media with high-energy retention hook",
      "action": "reacting with high energy within the first 2 seconds, performing dynamic actions to maximize retention"
    }
  },
  "environment": {
    "lighting": "maintain_from_frames",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "fluid_and_consistent",
    "transitions": {
      "from_start_frame": "match_cut",
      "to_end_frame": "smooth_interpolation"
    }
  },
  "audio": {
    "dialogue": [
      {
        "character": "personagem",
        "speech": "fala inteligente, cativante e altamente identificável para redes sociais"
      }
    ],
    "language": "pt-BR",
    "lip_sync": "perfect"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    sfx: `{
  "cinematography": {
    "camera_type": "handheld",
    "movement": {
      "type": "orbit_cw",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "medium"
  },
  "subject": {
    "primary": {
      "type": "guided_by_frames",
      "description": "seamless high-fidelity transition optimized for vertical social media with high-energy retention hook",
      "action": "reacting with high energy within the first 2 seconds, performing dynamic actions to maximize retention"
    }
  },
  "environment": {
    "lighting": "maintain_from_frames",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "fluid_and_consistent",
    "transitions": {
      "from_start_frame": "match_cut",
      "to_end_frame": "smooth_interpolation"
    }
  },
  "audio": {
    "sound_effects": "enriched with immersive sound effects, realistic ambient audio cues, and an engaging cinematic background soundtrack to match the action perfectly",
    "voice_dialogue": "none"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    silent: `{
  "cinematography": {
    "camera_type": "handheld",
    "movement": {
      "type": "orbit_cw",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "medium"
  },
  "subject": {
    "primary": {
      "type": "guided_by_frames",
      "description": "seamless high-fidelity transition optimized for vertical social media with high-energy retention hook",
      "action": "reacting with high energy within the first 2 seconds, performing dynamic actions to maximize retention"
    }
  },
  "environment": {
    "lighting": "maintain_from_frames",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "fluid_and_consistent",
    "transitions": {
      "from_start_frame": "match_cut",
      "to_end_frame": "smooth_interpolation"
    }
  },
  "audio": {
    "sound_effects": "none",
    "voice_dialogue": "none",
    "silent": true
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`
  },
  'video-from-img': {
    speech: `{
  "cinematography": {
    "camera_type": "gimbal",
    "movement": {
      "type": "push_in",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "maintain_from_image"
  },
  "subject": {
    "primary": {
      "type": "based_on_image",
      "description": "highly engaging viral video sequence using the base image as foundation",
      "action": "starting with a strong visual hook in the first 2 seconds, flowing towards a surprising high-retention climax"
    }
  },
  "environment": {
    "lighting": "maintain_from_image",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "realistic_fluid"
  },
  "audio": {
    "dialogue": [
      {
        "character": "personagem",
        "speech": "diálogo rápido, espirituoso e divertido"
      }
    ],
    "language": "pt-BR",
    "lip_sync": "perfect"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    sfx: `{
  "cinematography": {
    "camera_type": "gimbal",
    "movement": {
      "type": "push_in",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "maintain_from_image"
  },
  "subject": {
    "primary": {
      "type": "based_on_image",
      "description": "highly engaging viral video sequence using the base image as foundation",
      "action": "starting with a strong visual hook in the first 2 seconds, flowing towards a surprising high-retention climax"
    }
  },
  "environment": {
    "lighting": "maintain_from_image",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "realistic_fluid"
  },
  "audio": {
    "sound_effects": "enriched with immersive sound effects, realistic ambient audio cues, and an engaging cinematic background soundtrack to match the action perfectly",
    "voice_dialogue": "none"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    silent: `{
  "cinematography": {
    "camera_type": "gimbal",
    "movement": {
      "type": "push_in",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "maintain_from_image"
  },
  "subject": {
    "primary": {
      "type": "based_on_image",
      "description": "highly engaging viral video sequence using the base image as foundation",
      "action": "starting with a strong visual hook in the first 2 seconds, flowing towards a surprising high-retention climax"
    }
  },
  "environment": {
    "lighting": "maintain_from_image",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "realistic_fluid"
  },
  "audio": {
    "sound_effects": "none",
    "voice_dialogue": "none",
    "silent": true
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`
  }
};
