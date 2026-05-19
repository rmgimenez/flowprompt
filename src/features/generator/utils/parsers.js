// Smart parsing helpers for Veo 3.1 JSON Prompt Engineering

export const VIDEO_NEGATIVE_PROMPTS = [
  "glitch", "deformed details", "sudden cuts", "abrupt transition", 
  "cartoonish physics", "unstable frames", "flickering lighting", 
  "blurry low-resolution"
];

export const parseCamera = (text) => {
  if (typeof text !== 'string' || !text || text.includes('<<<')) {
    return {
      camera_type: 'tripod',
      movement: { type: 'static', speed: 'medium', easing: 'ease_in_out' },
      framing: 'wide',
      veo_version: '3.1'
    };
  }

  const lowerText = text.toLowerCase();
  
  // Camera Type
  let camera_type = 'tripod';
  if (lowerText.includes('drone') || lowerText.includes('aerial') || lowerText.includes('aérea') || lowerText.includes('voo')) {
    camera_type = 'drone';
  } else if (lowerText.includes('handheld') || lowerText.includes('mão') || lowerText.includes('jitter') || lowerText.includes('shaky') || lowerText.includes('selfie')) {
    camera_type = 'handheld';
  } else if (lowerText.includes('gimbal')) {
    camera_type = 'gimbal';
  } else if (lowerText.includes('crane') || lowerText.includes('elevador') || lowerText.includes('grua')) {
    camera_type = 'crane';
  } else if (lowerText.includes('dolly') || lowerText.includes('tracking') || lowerText.includes('sequência') || lowerText.includes('truck')) {
    camera_type = 'dolly';
  } else if (lowerText.includes('tripod') || lowerText.includes('estática') || lowerText.includes('static')) {
    camera_type = 'tripod';
  }

  // Movement Type
  let type = 'static';
  if (lowerText.includes('orbit_cw') || lowerText.includes('órbita 360') || lowerText.includes('orbit')) {
    type = 'orbit_cw';
  } else if (lowerText.includes('orbit_ccw')) {
    type = 'orbit_ccw';
  } else if (lowerText.includes('dolly_in') || lowerText.includes('dolly in') || lowerText.includes('push_in') || lowerText.includes('push in') || lowerText.includes('aproximação') || lowerText.includes('zoom suave in')) {
    type = 'push_in';
  } else if (lowerText.includes('dolly_out') || lowerText.includes('dolly out') || lowerText.includes('pull_out') || lowerText.includes('pull out') || lowerText.includes('zoom suave out')) {
    type = 'pull_out';
  } else if (lowerText.includes('pan_left') || lowerText.includes('pan left') || lowerText.includes('panorâmica esquerda')) {
    type = 'pan_left';
  } else if (lowerText.includes('pan_right') || lowerText.includes('pan right') || lowerText.includes('panorâmica direita')) {
    type = 'pan_right';
  } else if (lowerText.includes('tilt_up') || lowerText.includes('tilt up') || lowerText.includes('inclinação para cima')) {
    type = 'tilt_up';
  } else if (lowerText.includes('tilt_down') || lowerText.includes('tilt down') || lowerText.includes('inclinação para baixo')) {
    type = 'tilt_down';
  } else if (lowerText.includes('truck_left') || lowerText.includes('truck left')) {
    type = 'truck_left';
  } else if (lowerText.includes('truck_right') || lowerText.includes('truck right')) {
    type = 'truck_right';
  } else if (lowerText.includes('descend') || lowerText.includes('descendo') || lowerText.includes('descer')) {
    type = 'descend';
  } else if (lowerText.includes('ascend') || lowerText.includes('subindo') || lowerText.includes('subir')) {
    type = 'ascend';
  } else if (lowerText.includes('zoom lento') || lowerText.includes('slow zoom')) {
    type = 'push_in';
  } else if (lowerText.includes('static') || lowerText.includes('estática')) {
    type = 'static';
  }

  // Speed
  let speed = 'medium';
  if (lowerText.includes('very slow') || lowerText.includes('muito lento') || lowerText.includes('very_slow')) {
    speed = 'very_slow';
  } else if (lowerText.includes('slow') || lowerText.includes('lento') || lowerText.includes('suave')) {
    speed = 'slow';
  } else if (lowerText.includes('very fast') || lowerText.includes('muito rápido') || lowerText.includes('very_fast')) {
    speed = 'very_fast';
  } else if (lowerText.includes('fast') || lowerText.includes('rápido') || lowerText.includes('dinâmica')) {
    speed = 'fast';
  }

  // Lens (Focal Length / Aperture)
  let lens = { focal_length: '24mm', aperture: 'f/2.8' };
  if (lowerText.includes('macro')) {
    lens = { focal_length: '90mm', aperture: 'f/2.8' };
  } else if (lowerText.includes('wide') || lowerText.includes('aberto') || lowerText.includes('drone')) {
    lens = { focal_length: '18mm', aperture: 'f/4.0' };
  } else if (lowerText.includes('close-up') || lowerText.includes('close up') || lowerText.includes('closeup') || lowerText.includes('retrato')) {
    lens = { focal_length: '50mm', aperture: 'f/1.8' };
  }

  // Framing
  let framing = 'medium';
  if (lowerText.includes('wide') || lowerText.includes('aberto') || lowerText.includes('estabelecer')) {
    framing = 'wide_establishing';
  } else if (lowerText.includes('extreme close-up') || lowerText.includes('macro')) {
    framing = 'extreme_close_up';
  } else if (lowerText.includes('close-up') || lowerText.includes('close up') || lowerText.includes('closeup') || lowerText.includes('selfie')) {
    framing = 'close_up';
  } else if (lowerText.includes('medium') || lowerText.includes('médio')) {
    framing = 'medium';
  } else if (lowerText.includes('pov')) {
    framing = 'pov';
  }

  return {
    camera_type,
    movement: { 
      type, 
      speed, 
      easing: 'ease_in_out',
      veo_31_temporal_consistency: 'high_fidelity_flow' 
    },
    lens,
    framing,
    veo_version: '3.1'
  };
};

export const parseCharacters = (charVal) => {
  if (!charVal) return [];
  
  let parsedVal = charVal;
  if (typeof charVal === 'string') {
    const trimmed = charVal.trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        parsedVal = JSON.parse(trimmed);
      } catch (e) {
        // Fallback to manual line parsing
      }
    }
  }
  
  if (Array.isArray(parsedVal)) {
    return parsedVal.map(char => ({
      name: (char.name || '').trim(),
      description: `${(char.appearance || '').trim()}${char.clothing ? `, wearing ${(char.clothing || '').trim()}` : ''}`,
      voice_attributes: (char.voice || char.voice_attributes || '').trim(),
      motion_signature: char.motion || char.motion_signature || 'composed_natural'
    }));
  }
  
  if (typeof charVal !== 'string' || charVal.includes('<<<') || charVal.trim() === '') return [];
  const lines = charVal.split('\n').filter(l => l.trim() !== '');
  const chars = [];
  lines.forEach(line => {
    const matches = [...line.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
    if (matches.length >= 2) {
      chars.push({
        name: matches[0].trim(),
        description: matches[1].trim(),
        voice_attributes: matches[2] ? matches[2].trim() : '',
        motion_signature: 'composed_natural'
      });
    }
  });
  return chars;
};

export const parseDialogue = (dialStr) => {
  if (typeof dialStr !== 'string' || !dialStr || dialStr.includes('<<<') || dialStr.trim() === '') return [];
  const lines = dialStr.split('\n').filter(l => l.trim() !== '');
  const dialogue = [];
  let currentTime = 0.0;

  lines.forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;

    let charPart = line.substring(0, colonIdx).trim();
    let speechPart = line.substring(colonIdx + 1).trim();

    // Clean brackets
    speechPart = speechPart.replace(/^\[|\]$/g, '').trim();

    // Extract emotion in parentheses from charPart
    let emotion = 'natural';
    const emotionMatch = charPart.match(/\(([^)]+)\)/);
    if (emotionMatch) {
      emotion = emotionMatch[1].trim();
      charPart = charPart.replace(/\(([^)]+)\)/, '').trim();
    }
    
    charPart = charPart.replace(/^\[|\]$/g, '').trim();

    // Auto-detect emotion from speech punctuation if it is still 'natural'
    if (emotion === 'natural') {
      const lowerSpeech = speechPart.toLowerCase();
      if (lowerSpeech.includes('haha') || lowerSpeech.includes('kkk') || lowerSpeech.includes('risada') || lowerSpeech.includes('rsrs')) {
        emotion = 'laughing';
      } else if (speechPart.endsWith('!')) {
        emotion = 'excited';
      } else if (speechPart.endsWith('?')) {
        emotion = 'inquisitive';
      } else if (speechPart.endsWith('...')) {
        emotion = 'thoughtful';
      }
    }

    // Dynamic timing calculation based on word count
    const words = speechPart.split(/\s+/).filter(w => w.length > 0);
    const duration = Math.max(1.5, Math.min(6.0, words.length * 0.35)); // ~3 words per second, min 1.5s, max 6s
    const timing_start = parseFloat(currentTime.toFixed(1));
    const timing_end = parseFloat((currentTime + duration).toFixed(1));
    currentTime = parseFloat((timing_end + 0.3).toFixed(1)); // 0.3s gap

    dialogue.push({
      character: charPart,
      speech: speechPart,
      emotion_tone: emotion,
      timing: {
        start: timing_start,
        end: timing_end
      },
      voice_pacing: duration > 4 ? "moderate" : "lively",
      ducking_level_db: -12
    });
  });

  return dialogue;
};

export const enrichCharacters = (characters, dialogue) => {
  return characters.map(char => {
    const charNameLower = char.name.toLowerCase().trim();
    const charDialogue = dialogue.filter(d => d.character.toLowerCase().trim() === charNameLower);
    
    const expression_timeline = charDialogue.map(d => ({
      time_offset: d.timing.start,
      expression: d.emotion_tone,
      intensity: d.emotion_tone === 'laughing' || d.emotion_tone === 'excited' ? 0.9 : 0.7
    }));

    return {
      name: char.name,
      description: char.description,
      voice_attributes: char.voice_attributes,
      visual_consistency_id: `char_seed_${charNameLower.replace(/[^a-z0-9]/g, '')}_v31`,
      motion_signature: char.motion_signature || (char.description.toLowerCase().includes('agitad') || char.voice_attributes.toLowerCase().includes('agitad') 
        ? "high_energy_expressive" 
        : "composed_natural"),
      ...(expression_timeline.length > 0 ? { expression_timeline } : {})
    };
  });
};

export const parseImageComposition = (text) => {
  if (!text || text.includes('<<<') || text.trim() === '') {
    return {
      framing: 'medium',
      camera_angle: 'eye_level',
      lens: { focal_length: '50mm', aperture: 'f/1.8' },
      depth_of_field: 'shallow'
    };
  }

  const lowerText = text.toLowerCase();
  
  // Framing
  let framing = 'medium';
  if (lowerText.includes('macro') || lowerText.includes('close-up extremo') || lowerText.includes('extreme close-up')) {
    framing = 'extreme_close_up';
  } else if (lowerText.includes('close-up') || lowerText.includes('close up') || lowerText.includes('closeup') || lowerText.includes('retrato') || lowerText.includes('selfie')) {
    framing = 'close_up';
  } else if (lowerText.includes('wide') || lowerText.includes('aberto') || lowerText.includes('paisagem') || lowerText.includes('panorâmico')) {
    framing = 'wide_establishing';
  } else if (lowerText.includes('pov') || lowerText.includes('primeira pessoa')) {
    framing = 'pov';
  }

  // Camera Angle
  let camera_angle = 'eye_level';
  if (lowerText.includes('pássaro') || lowerText.includes('bird') || lowerText.includes('aéreo') || lowerText.includes('aerial')) {
    camera_angle = 'birds_eye_view';
  } else if (lowerText.includes('formiga') || lowerText.includes('worm') || lowerText.includes('plongée total')) {
    camera_angle = 'worms_eye_view';
  } else if (lowerText.includes('contra-mergulho') || lowerText.includes('low angle') || lowerText.includes('baixo')) {
    camera_angle = 'low_angle';
  } else if (lowerText.includes('mergulho') || lowerText.includes('high angle') || lowerText.includes('alto')) {
    camera_angle = 'high_angle';
  } else if (lowerText.includes('holandês') || lowerText.includes('dutch') || lowerText.includes('inclinado')) {
    camera_angle = 'dutch_angle';
  }

  // Lens & Depth of Field
  let lens = { focal_length: '50mm', aperture: 'f/1.8' };
  let depth_of_field = 'shallow';

  if (framing === 'extreme_close_up' || lowerText.includes('macro')) {
    lens = { focal_length: '90mm', aperture: 'f/2.8' };
    depth_of_field = 'shallow';
  } else if (framing === 'close_up' || lowerText.includes('retrato') || lowerText.includes('studio')) {
    lens = { focal_length: '85mm', aperture: 'f/1.4' };
    depth_of_field = 'shallow';
  } else if (framing === 'wide_establishing' || lowerText.includes('aberto')) {
    lens = { focal_length: '24mm', aperture: 'f/4.0' };
    depth_of_field = 'deep';
  }

  return {
    framing,
    camera_angle,
    lens,
    depth_of_field
  };
};

export const parseImageStyle = (text) => {
  if (!text || text.includes('<<<') || text.trim() === '') {
    return {
      medium: 'photograph',
      rendering_engine: 'nano_banana_2_engine',
      color_grading: 'natural',
      golden_tokens: ['hyper-realistic', 'high-fidelity textures', 'sharp focus', 'nano banana 2 style']
    };
  }

  const lowerText = text.toLowerCase();
  
  // Artistic Medium
  let medium = 'photograph';
  if (lowerText.includes('pintura') || lowerText.includes('oil painting') || lowerText.includes('óleo')) {
    medium = 'oil_painting';
  } else if (lowerText.includes('esboço') || lowerText.includes('lápis') || lowerText.includes('sketch') || lowerText.includes('desenho')) {
    medium = 'pencil_sketch';
  } else if (lowerText.includes('anime') || lowerText.includes('manga') || lowerText.includes('desenho animado') || lowerText.includes('cartoon') || lowerText.includes('ghibli') || lowerText.includes('simpsons')) {
    medium = 'anime_illustration';
  } else if (lowerText.includes('render') || lowerText.includes('3d') || lowerText.includes('blender') || lowerText.includes('octane') || lowerText.includes('unreal')) {
    medium = '3d_render';
  } else if (lowerText.includes('aquarela') || lowerText.includes('watercolor')) {
    medium = 'watercolor';
  }

  // Rendering Engine & Fidelity Model (Nano Banana v2 optimized)
  let rendering_engine = 'nano_banana_2_engine';
  if (lowerText.includes('unreal')) {
    rendering_engine = 'unreal_engine_5_banana_hybrid';
  } else if (lowerText.includes('octane')) {
    rendering_engine = 'octane_render_banana_hybrid';
  } else if (lowerText.includes('blender') || lowerText.includes('cycles')) {
    rendering_engine = 'blender_cycles_banana_hybrid';
  }

  // Color Grading
  let color_grading = 'natural';
  if (lowerText.includes('neon') || lowerText.includes('cyberpunk') || lowerText.includes('vibrant')) {
    color_grading = 'neon_cyberpunk';
  } else if (lowerText.includes('quente') || lowerText.includes('golden') || lowerText.includes('warm')) {
    color_grading = 'warm_golden';
  } else if (lowerText.includes('frio') || lowerText.includes('cool') || lowerText.includes('blue')) {
    color_grading = 'cool_toned';
  } else if (lowerText.includes('preto') || lowerText.includes('black and white') || lowerText.includes('monocrom')) {
    color_grading = 'monochrome';
  } else if (lowerText.includes('pastel')) {
    color_grading = 'pastel_tones';
  }

  // Golden Tokens optimized specifically for high conversion on social media (TikTok/Insta) with Nano Banana 2
  const user_tokens = text.split(',').map(s => s.trim()).filter(s => s !== '' && !s.includes('<<<'));
  const golden_tokens = [...user_tokens];

  // Auto-inject high aesthetic banana v2 fidelity keywords
  if (lowerText.includes('tiktok') || lowerText.includes('viral') || lowerText.includes('9:16') || lowerText.includes('reels')) {
    golden_tokens.push('hyper-detailed', 'vibrant detailed color grading', 'scroll-stopping visual contrast', 'perfect studio illumination');
  } else if (lowerText.includes('insta') || lowerText.includes('feed') || lowerText.includes('aesthetic') || lowerText.includes('square')) {
    golden_tokens.push('grainy analog film look', 'aesthetic soft color grading', 'curated editorial lifestyle', 'subtle cinematic shadows');
  } else {
    golden_tokens.push('nano banana 2 high fidelity', 'micro-textures rendered', 'cinematic atmosphere');
  }

  return {
    medium,
    rendering_engine,
    color_grading,
    golden_tokens: golden_tokens.length > 0 ? golden_tokens : ['high-resolution', 'professional-grade', 'intricate textures', 'nano banana v2 optimization']
  };
};

export const parseAmbiance = (context, styleAmbiance) => {
  let time_of_day = 'day';
  let weather = 'clear';
  let mood = 'neutral';
  let key_light = 'natural';
  let fill_light = 'diffused';
  let rim_light = 'none';

  const textToCheck = `${context || ''} ${styleAmbiance || ''}`.toLowerCase();

  // Time of Day
  if (textToCheck.includes('night') || textToCheck.includes('noite') || textToCheck.includes('escuro') || textToCheck.includes('dark')) {
    time_of_day = 'night';
  } else if (textToCheck.includes('sunset') || textToCheck.includes('golden hour') || textToCheck.includes('pôr do sol') || textToCheck.includes('golden_hour')) {
    time_of_day = 'sunset';
  } else if (textToCheck.includes('sunrise') || textToCheck.includes('dawn') || textToCheck.includes('amanhecer')) {
    time_of_day = 'sunrise';
  } else if (textToCheck.includes('twilight') || textToCheck.includes('crepúsculo')) {
    time_of_day = 'twilight';
  }

  // Weather
  if (textToCheck.includes('rain') || textToCheck.includes('chuva') || textToCheck.includes('chovendo')) {
    weather = 'light_rain';
  } else if (textToCheck.includes('heavy rain') || textToCheck.includes('tempestade') || textToCheck.includes('storm')) {
    weather = 'stormy';
  } else if (textToCheck.includes('snow') || textToCheck.includes('neve') || textToCheck.includes('nevando')) {
    weather = 'snowy';
  } else if (textToCheck.includes('fog') || textToCheck.includes('neblina') || textToCheck.includes('mist')) {
    weather = 'foggy';
  }

  // Mood
  if (textToCheck.includes('epic') || textToCheck.includes('épico') || textToCheck.includes('grandioso')) {
    mood = 'epic_grand';
  } else if (textToCheck.includes('melancholy') || textToCheck.includes('melancolia') || textToCheck.includes('triste') || textToCheck.includes('sad')) {
    mood = 'noir_melancholy';
  } else if (textToCheck.includes('cyberpunk') || textToCheck.includes('neon')) {
    mood = 'cyberpunk_high_tech';
  } else if (textToCheck.includes('spooky') || textToCheck.includes('horror') || textToCheck.includes('gótico') || textToCheck.includes('creepy')) {
    mood = 'gothic_horror';
  } else if (textToCheck.includes('funny') || textToCheck.includes('engraçado') || textToCheck.includes('comedy') || textToCheck.includes('comédia')) {
    mood = 'lighthearted_comedy';
  }

  // Lighting
  if (textToCheck.includes('neon')) {
    key_light = 'neon_colored_accent';
    fill_light = 'neon_ambient_glow';
    rim_light = 'neon_edge';
  } else if (textToCheck.includes('sunset') || textToCheck.includes('golden')) {
    key_light = 'warm_golden_hour_sun';
    fill_light = 'soft_orange_ambient';
    rim_light = 'golden_edge';
  } else if (textToCheck.includes('night') || textToCheck.includes('noite')) {
    key_light = 'cool_moonlight';
    fill_light = 'dark_blue_ambient';
    rim_light = 'subtle_edge';
  } else if (textToCheck.includes('studio') || textToCheck.includes('estúdio')) {
    key_light = 'three_point_key';
    fill_light = 'softbox_fill';
    rim_light = 'hair_light';
  }

  return {
    time_of_day,
    lighting: { key_light, fill_light, rim_light },
    atmosphere: { weather, mood }
  };
};
