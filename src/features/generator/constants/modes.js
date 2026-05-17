// Smart parsing helpers for Veo 3.1 JSON Prompt Engineering

const VIDEO_NEGATIVE_PROMPTS = [
  "glitch", "deformed details", "sudden cuts", "abrupt transition", 
  "cartoonish physics", "unstable frames", "flickering lighting", 
  "blurry low-resolution"
];

const parseCamera = (text) => {
  if (!text || text.includes('<<<')) {
    return {
      camera_type: 'tripod',
      movement: { type: 'static', speed: 'medium', easing: 'ease_in_out' },
      framing: 'wide'
    };
  }

  const lowerText = text.toLowerCase();
  
  // Camera Type
  let camera_type = 'tripod';
  if (lowerText.includes('drone') || lowerText.includes('aerial') || lowerText.includes('aérea') || lowerText.includes('voo')) {
    camera_type = 'drone';
  } else if (lowerText.includes('handheld') || lowerText.includes('mão') || lowerText.includes('jitter') || lowerText.includes('shaky')) {
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
  } else if (lowerText.includes('close-up') || lowerText.includes('close up') || lowerText.includes('closeup')) {
    framing = 'close_up';
  } else if (lowerText.includes('medium') || lowerText.includes('médio')) {
    framing = 'medium';
  } else if (lowerText.includes('pov')) {
    framing = 'pov';
  }

  return {
    camera_type,
    movement: { type, speed, easing: 'ease_in_out' },
    lens,
    framing
  };
};

const parseCharacters = (charStr) => {
  if (!charStr || charStr.includes('<<<') || charStr.trim() === '') return [];
  const lines = charStr.split('\n').filter(l => l.trim() !== '');
  const chars = [];
  lines.forEach(line => {
    const matches = [...line.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
    if (matches.length >= 2) {
      chars.push({
        name: matches[0].trim(),
        description: matches[1].trim(),
        voice_attributes: matches[2] ? matches[2].trim() : ''
      });
    }
  });
  return chars;
};

const parseDialogue = (dialStr) => {
  if (!dialStr || dialStr.includes('<<<') || dialStr.trim() === '') return [];
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

const enrichCharacters = (characters, dialogue) => {
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
      motion_signature: char.description.toLowerCase().includes('agitad') || char.voice_attributes.toLowerCase().includes('agitad') 
        ? "high_energy_expressive" 
        : "composed_natural",
      ...(expression_timeline.length > 0 ? { expression_timeline } : {})
    };
  });
};

const parseAmbiance = (context, styleAmbiance) => {
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

export const MODES = {
  'video-new': {
    id: 'video-new',
    title: 'Vídeo Novo (Veo)',
    desc: 'Gere vídeos cinematográficos a partir de descrições textuais.',
    helpText: 'Para obter os melhores resultados, seja específico sobre o movimento da câmera e a iluminação. Use termos como "cinematic", "slow motion" ou "handheld" para definir o ritmo e a emoção da cena.',
    formula: (vals) => {
      const camera = parseCamera(vals.cinematography);
      const dialogue = parseDialogue(vals.dialogue);
      const characters = enrichCharacters(parseCharacters(vals.characters_definition), dialogue);
      const envAmbiance = parseAmbiance(vals.context, vals.style_ambiance);

      const jsonPrompt = {
        cinematography: camera,
        subject: {
          primary: {
            type: characters.length > 0 ? "character" : "environment",
            description: vals.subject || "main focus",
            action: vals.action || "natural flow",
            attributes: vals.style_ambiance && !vals.style_ambiance.includes('<<<') 
              ? vals.style_ambiance.split(',').map(s => s.trim()).filter(s => s !== '') 
              : []
          },
          ...(characters.length > 0 ? { characters } : {})
        },
        environment: {
          context: vals.context || "cinematic space",
          ...envAmbiance
        },
        motion: {
          temporal_logic: "continuous",
          physics: "realistic",
          speed_ramp: "constant"
        },
        ...(dialogue.length > 0 ? {
          audio: {
            dialogue,
            language: "pt-BR",
            lip_sync: "perfect"
          }
        } : {}),
        negative_prompts: VIDEO_NEGATIVE_PROMPTS
      };

      return JSON.stringify(jsonPrompt, null, 2);
    },
    fields: [
      { 
        id: 'characters_definition', 
        label: 'Definição dos Personagens', 
        hint: 'Formato: [nome][descrição][tom de voz]', 
        placeholder: 'Ex: [morango][personagem morango][feminino]', 
        type: 'textarea', 
        suggestions: [
          { label: 'Exemplo Frutas', value: '[morango][personagem vermelho com cara de morango][voz doce, aguda e amigável]\n[abacaxi][personagem amarelo com cara de abacaxi][voz calma, levemente encorpada e relaxada]\n[uva][personagem roxo com cara de uva][voz muito aguda, agitada e estridente]' }
        ] 
      },
      { id: 'cinematography', label: 'Cinematografia', hint: 'Ângulo e movimento da câmera', placeholder: 'Ex: Medium shot', type: 'text', suggestions: [{ label: 'Plano Aberto', value: 'Wide Shot' }, { label: 'Close-up', value: 'Close-up' }, { label: 'Visão em 1ª Pessoa', value: 'POV Shot' }, { label: 'Vista Aérea', value: 'Aerial View' }, { label: 'Câmera em Movimento', value: 'Tracking Shot' }, { label: 'Câmera na Mão', value: 'Handheld Camera' }, { label: 'Contra-mergulho', value: 'Low Angle' }, { label: 'Mergulho', value: 'High Angle' }, { label: 'Zoom Lento', value: 'Slow Zoom' }, { label: 'Órbita 360°', value: '360-degree Orbit' }, { label: 'Time-lapse', value: 'Time-lapse' }, { label: 'Câmera Lenta', value: 'Slow Motion' }, { label: 'Macro Extremo', value: 'Extreme Macro' }, { label: 'Plano Sequência', value: 'One-shot Sequence' }, { label: 'Foco Alternado', value: 'Rack Focus' }, { label: 'Plano Holandês', value: 'Dutch Angle' }] },
      { id: 'subject', label: 'Sujeito/Personagem', hint: 'Quem ou o que aparece na cena', placeholder: 'Ex: Um astronauta', type: 'text', suggestions: [{ label: 'Um robô', value: 'A robot' }, { label: 'Uma mulher', value: 'A woman' }, { label: 'Um dragão', value: 'A dragon' }, { label: 'Um samurai', value: 'A samurai' }, { label: 'Um astronauta', value: 'An astronaut' }, { label: 'Um mago', value: 'A wizard' }, { label: 'Uma fênix', value: 'A phoenix' }, { label: 'Um gato cibernético', value: 'A cybernetic cat' }, { label: 'Um carro voador', value: 'A flying car' }, { label: 'Uma criatura mística', value: 'A mystical creature' }, { label: 'Um ferreiro', value: 'A blacksmith' }, { label: 'Uma bailarina', value: 'A ballerina' }, { label: 'Um alienígena', value: 'An alien being' }, { label: 'Um navio pirata', value: 'A pirate ship' }, { label: 'Uma inteligência artificial', value: 'A digital AI avatar' }, { label: 'Um explorador', value: 'A brave explorer' }] },
      { id: 'action', label: 'Ação', hint: 'O que o sujeito está fazendo', placeholder: 'Ex: caminhando', type: 'text', suggestions: [{ label: 'correndo', value: 'running' }, { label: 'dançando', value: 'dancing' }, { label: 'flutuando', value: 'floating' }, { label: 'lutando', value: 'fighting' }, { label: 'explorando ruínas', value: 'exploring ruins' }, { label: 'meditando', value: 'meditating' }, { label: 'desaparecendo', value: 'fading away' }, { label: 'transformando-se', value: 'transforming' }, { label: 'explodindo em luz', value: 'exploding into light' }, { label: 'cozinhando', value: 'cooking with fire' }, { label: 'consertando algo', value: 'repairing a machine' }, { label: 'saltando dimensões', value: 'jumping through dimensions' }, { label: 'tocando um instrumento', value: 'playing a glowing instrument' }, { label: 'manipulando energia', value: 'manipulating raw energy' }, { label: 'derretendo', value: 'melting like liquid metal' }, { label: 'atravessando portais', value: 'walking through a portal' }] },
      { id: 'context', label: 'Contexto/Cenário', hint: 'Onde a cena se passa', placeholder: 'Ex: em uma floresta', type: 'text', suggestions: [{ label: 'em Marte', value: 'on Mars' }, { label: 'cidade cyberpunk', value: 'in a cyberpunk city' }, { label: 'embaixo d\'água', value: 'underwater' }, { label: 'floresta mágica', value: 'in a magical forest' }, { label: 'estação espacial', value: 'in a space station' }, { label: 'castelo medieval', value: 'in a medieval castle' }, { label: 'metrópole flutuante', value: 'in a floating metropolis' }, { label: 'laboratório secreto', value: 'in a secret lab' }, { label: 'dentro de um vulcão', value: 'inside a volcanic landscape' }, { label: 'biblioteca infinita', value: 'in an infinite library' }, { label: 'deserto de cristal', value: 'in a crystal desert' }, { label: 'ruas de Tóquio', value: 'on the streets of neon Tokyo' }, { label: 'jardim flutuante', value: 'in a hanging garden in the sky' }, { label: 'reino de engrenagens', value: 'inside a clockwork kingdom' }, { label: 'caverna de gelo', value: 'in a glowing ice cave' }, { label: 'templo antigo', value: 'in a forgotten ancient temple' }] },
      { id: 'style_ambiance', label: 'Estilo & Ambiance', hint: 'Iluminação, cores e clima', placeholder: 'Ex: Iluminação cinematográfica', type: 'textarea', suggestions: [{ label: 'Cinematográfico', value: 'Cinematic' }, { label: 'Atmosférico', value: 'Moody' }, { label: 'Neon Noir', value: 'Neon Noir' }, { label: 'Hora Dourada', value: 'Golden Hour' }, { label: 'Fantasia Sombria', value: 'Dark Fantasy' }, { label: 'Minimalista', value: 'Minimalist' }, { label: 'Retrô Anos 80', value: 'Retro 80s aesthetic' }, { label: 'Surrealista', value: 'Surrealist' }, { label: 'Épico e Grandioso', value: 'Epic and grand' }, { label: 'Cyberpunk Vibrante', value: 'Vibrant Cyberpunk' }, { label: 'Eterno e Etéreo', value: 'Ethereal and timeless' }, { label: 'Hiper-realista', value: 'Hyper-realistic' }, { label: 'Estilo Noir', value: 'Film Noir aesthetic' }, { label: 'Sonhador/Onírico', value: 'Dreamy and soft focus' }, { label: 'Industrial Sombrio', value: 'Gritty industrial' }, { label: 'Psicodélico', value: 'Psychedelic and colorful' }] },
      { 
        id: 'dialogue', 
        label: 'Falas dos Personagens (Dublagem)', 
        hint: 'Use o formato [personagem] (emoção): [fala]', 
        placeholder: 'Ex: [morango] (feliz): [oi, eu sou a morango!]', 
        type: 'textarea', 
        suggestions: [
          { label: 'Diálogo Expressivo', value: '[morango] (feliz): [olá abacaxi, você viu o sol hoje?!]\n[abacaxi] (calmo): [sim morango, ele está radiante e quente!]\n[uva] (sarcástica): [radiante? está um forno isso aqui!]' },
          { label: 'Comédia Rápida', value: '[morango] (rindo): [hahaha abacaxi, você parece uma coroa!]\n[abacaxi] (irritado): [ei morango, respeite minha realeza vegetal!]' },
          { label: 'Sem Fala', value: '' }
        ] 
      }
    ]
  },
  'video-from-img': {
    id: 'video-from-img',
    title: 'Vídeo de Imagem (Veo)',
    desc: 'Dê vida a uma imagem estática com movimento e som.',
    helpText: 'Dê vida às suas fotos! Descreva o que deve se mover na cena, o movimento de câmera e os efeitos sonoros. Dica: você pode escolher "Sem Som" se desejar apenas a animação visual.',
    formula: (vals) => {
      const camera = parseCamera(vals.camera_motion);
      const dialogue = parseDialogue(vals.dialogue);
      const characters = enrichCharacters(parseCharacters(vals.characters_definition), dialogue);

      const jsonPrompt = {
        cinematography: {
          ...camera,
          framing: "maintain_from_image"
        },
        subject: {
          primary: {
            type: "based_on_image",
            description: "high-quality base image foundation",
            action: vals.action || "natural consistent animation"
          },
          ...(characters.length > 0 ? { characters } : {})
        },
        environment: {
          lighting: "maintain_from_image",
          atmosphere: {
            weather: "maintain_from_image",
            mood: "cinematic_continuity"
          }
        },
        motion: {
          temporal_logic: "continuous",
          physics: "realistic_fluid"
        },
        audio: {
          sound_effects: vals.sound_effects || "no audio",
          ...(dialogue.length > 0 ? {
            dialogue,
            language: "pt-BR",
            lip_sync: "perfect"
          } : {})
        },
        negative_prompts: VIDEO_NEGATIVE_PROMPTS
      };

      return JSON.stringify(jsonPrompt, null, 2);
    },
    fields: [
      { 
        id: 'characters_definition', 
        label: 'Definição dos Personagens', 
        hint: 'Formato: [nome][descrição][tom de voz]', 
        placeholder: 'Ex: [morango][personagem morango][feminino]', 
        type: 'textarea', 
        suggestions: [
          { label: 'Exemplo Frutas', value: '[morango][personagem vermelho com cara de morango][voz doce, aguda e amigável]\n[abacaxi][personagem amarelo com cara de abacaxi][voz calma, levemente encorpada e relaxada]\n[uva][personagem roxo com cara de uva][voz muito aguda, agitada e estridente]' }
        ] 
      },
      { 
        id: 'camera_motion', 
        label: 'Movimento de Câmera', 
        hint: 'Direção e tipo de movimento', 
        placeholder: 'Ex: Zoom suave', 
        type: 'text', 
        suggestions: [
          { label: 'Panorâmica Direita', value: 'Slow Pan Right' }, 
          { label: 'Panorâmica Esquerda', value: 'Slow Pan Left' }, 
          { label: 'Dolly Zoom', value: 'Dolly Zoom' }, 
          { label: 'Zoom Suave In', value: 'Smooth Zoom In' }, 
          { label: 'Zoom Suave Out', value: 'Smooth Zoom Out' }, 
          { label: 'Inclinação para Cima', value: 'Tilt Up' }, 
          { label: 'Inclinação para Baixo', value: 'Tilt Down' }, 
          { label: 'Órbita Circular', value: 'Circular Orbit around subject' }, 
          { label: 'Câmera Estática', value: 'Static camera' }, 
          { label: 'Zoom Rápido', value: 'Fast Zoom' },
          { label: 'Giro em Espiral', value: 'Spiral rotation' },
          { label: 'Shake Dramático', value: 'Dramatic camera shake' },
          { label: 'Aproximação Macro', value: 'Macro approach' },
          { label: 'Crane Shot', value: 'Craning up/down' },
          { label: 'Câmera na Mão', value: 'Handheld jitter' },
          { label: 'Foco Alternado', value: 'Rack focus shift' },
          { label: 'Avanço Rápido', value: 'Fast forward push-in' },
          { label: 'Voo Rasante', value: 'Low flying drone shot' }
        ] 
      },
      { 
        id: 'sound_effects', 
        label: 'Efeitos Sonoros (SFX)', 
        hint: 'Sons e ambiente', 
        placeholder: 'Ex: Som de vento', 
        type: 'text', 
        suggestions: [
          { label: 'Sem Som', value: 'no audio' }, 
          { label: 'Som de Trovão', value: 'SFX: Thunder cracks' }, 
          { label: 'Som de Chuva', value: 'SFX: Rain falling' }, 
          { label: 'Vento Uivante', value: 'SFX: Wind howling' }, 
          { label: 'Trilha Épica', value: 'SFX: Epic cinematic music' }, 
          { label: 'Impacto Cinematográfico', value: 'SFX: Cinematic impact hit' },
          { label: 'Ruído Mecânico', value: 'SFX: Mechanical whirring' }, 
          { label: 'Gritos de Multidão', value: 'SFX: Distant crowd cheering' }, 
          { label: 'Bipe Digital', value: 'SFX: Electronic beeps' }, 
          { label: 'Batida de Coração', value: 'SFX: Heartbeat thumping' }, 
          { label: 'Som Espacial', value: 'SFX: Deep space ambiance' }, 
          { label: 'Vidro Quebrando', value: 'SFX: Shifting glass sounds' },
          { label: 'Fogo Crepitante', value: 'SFX: Fire crackling' },
          { label: 'Água Corrente', value: 'SFX: Running water' },
          { label: 'Sussurros', value: 'SFX: Ethereal whispers' },
          { label: 'Natureza (Pássaros)', value: 'SFX: Birds and forest ambiance' },
          { label: 'Explosão Abafada', value: 'SFX: Muffled explosion' },
          { label: 'Sintetizador Retro', value: 'SFX: Retro synth pad' },
          { label: 'Som de Passos', value: 'SFX: Heavy footsteps' }
        ] 
      },
      { 
        id: 'action', 
        label: 'Ação Adicional', 
        hint: 'O que deve se mover na imagem', 
        placeholder: 'Ex: nuvens se movem', 
        type: 'textarea', 
        suggestions: [
          { label: 'cabelo ao vento', value: 'hair blowing in the wind' }, 
          { label: 'mudança de luz', value: 'cinematic lighting shift' }, 
          { label: 'água escorrendo', value: 'water flowing' }, 
          { label: 'nuvens passando', value: 'clouds passing' }, 
          { label: 'olhos piscando', value: 'eyes blinking' }, 
          { label: 'fumaça subindo', value: 'smoke rising' }, 
          { label: 'neve caindo', value: 'snow falling' }, 
          { label: 'fogo queimando', value: 'fire burning' }, 
          { label: 'brilho de energia', value: 'glowing with energy' }, 
          { label: 'dissolvendo em pixels', value: 'dissolving into digital pixels' }, 
          { label: 'sombras se movendo', value: 'shadows stretching and moving' }, 
          { label: 'flores desabrochando', value: 'flowers blooming quickly' }, 
          { label: 'roupas balançando', value: 'clothing flowing in the breeze' }, 
          { label: 'olhos mudando de cor', value: 'eyes shifting colors' }, 
          { label: 'objetos flutuando', value: 'objects starting to levitate' }, 
          { label: 'textura mudando', value: 'surface texture transforming' }
        ] 
      },
      { 
        id: 'dialogue', 
        label: 'Falas dos Personagens (Dublagem)', 
        hint: 'Use o formato [personagem] (emoção): [fala]', 
        placeholder: 'Ex: [morango] (feliz): [oi, eu sou a morango!]', 
        type: 'textarea', 
        suggestions: [
          { label: 'Diálogo Expressivo', value: '[morango] (feliz): [olá abacaxi, você viu o sol hoje?!]\n[abacaxi] (calmo): [sim morango, ele está radiante e quente!]\n[uva] (sarcástica): [radiante? está um forno isso aqui!]' },
          { label: 'Comédia Rápida', value: '[morango] (rindo): [hahaha abacaxi, você parece uma coroa!]\n[abacaxi] (irritado): [ei morango, respeite minha realeza vegetal!]' },
          { label: 'Sem Fala', value: '' }
        ] 
      }
    ]
  },
  'photo-new': {
    id: 'photo-new',
    title: 'Foto Nova (Nano Banana)',
    desc: 'Gere imagens estáticas com riqueza de detalhes.',
    helpText: 'Crie imagens incríveis focando no sujeito e na composição. Experimente diferentes estilos artísticos, de realismo fotográfico a ilustrações conceituais, para encontrar o visual perfeito.',
    formula: (vals) => `A high-resolution, professional-grade photograph of ${vals.subject} who is ${vals.action}. The scene is situated in a breathtaking ${vals.context}. The composition is a masterfully executed ${vals.composition}, emphasizing visual balance. The overall artistic style is ${vals.style}, featuring intricate textures, precise lighting, and a premium aesthetic finish.`,
    fields: [
      { id: 'subject', label: 'Sujeito', hint: 'O elemento principal da imagem', placeholder: 'Ex: Guerreiro Cyberpunk', type: 'text', suggestions: [{ label: 'Guerreiro Cyberpunk', value: 'Cyberpunk Warrior' }, { label: 'Espírito da Floresta', value: 'Forest Spirit' }, { label: 'Carro Vintage', value: 'Vintage Car' }, { label: 'Coruja Robótica', value: 'Robotic Owl' }, { label: 'Xamã Místico', value: 'Mystical Shaman' }, { label: 'Arranha-céu Futurista', value: 'Futuristic Skyscraper' }, { label: 'Água-viva Bioluminescente', value: 'Bioluminescent Jellyfish' }, { label: 'Gato Samurai', value: 'Samurai Cat' }, { label: 'Explorador Vitoriano', value: 'Victorian Explorer' }, { label: 'Botânico Alienígena', value: 'Alien Botanist' }, { label: 'Relojoeiro Steampunk', value: 'Steampunk Clockmaker' }, { label: 'Dragão Cósmico', value: 'Cosmic Dragon' }] },
      { id: 'action', label: 'Ação', hint: 'O que está acontecendo', placeholder: 'Ex: posando', type: 'text', suggestions: [{ label: 'olhando para a câmera', value: 'staring at camera' }, { label: 'dissolvendo em fumaça', value: 'dissolving into smoke' }, { label: 'levitando sobre um lago', value: 'levitating above a lake' }, { label: 'lançando feitiço', value: 'casting a glowing spell' }, { label: 'consertando um relógio', value: 'repairing a golden clock' }, { label: 'andando num mercado neon', value: 'wandering through a neon market' }, { label: 'tocando violino', value: 'playing a transparent violin' }, { label: 'mesclando com código', value: 'merging with digital code' }, { label: 'descansando em flores de vidro', value: 'resting in a field of glass flowers' }] },
      { id: 'context', label: 'Local', hint: 'Cenário da fotografia', placeholder: 'Ex: estúdio', type: 'text', suggestions: [{ label: 'Espaço Abstrato', value: 'Abstract Space' }, { label: 'Catedral Abandonada', value: 'Abandoned Cathedral' }, { label: 'Telhado Cyberpunk na chuva', value: 'Cyberpunk rooftop at rain' }, { label: 'Caverna Subaquática', value: 'Bioluminescent underwater cave' }, { label: 'Ilhas Flutuantes', value: 'Floating islands in the clouds' }, { label: 'Biblioteca de Luz', value: 'Library made of light' }, { label: 'Ruínas Antigas em Marte', value: 'Ancient ruins on a desert planet' }, { label: 'Laboratório Vitoriano', value: 'Victorian laboratory' }, { label: 'Sala de Espelhos', value: 'Enchanted mirror room' }] },
      { id: 'composition', label: 'Composição', hint: 'Organização visual (ex: Macro)', placeholder: 'Ex: Close-up', type: 'text', suggestions: [{ label: 'Foto Macro', value: 'Macro Shot' }, { label: 'Regra dos Terços', value: 'Rule of Thirds' }, { label: 'Simétrico', value: 'Symmetrical' }, { label: 'Vista de Pássaro', value: 'Bird\'s Eye View' }, { label: 'Vista de Formiga', value: 'Worm\'s Eye View' }, { label: 'Ângulo Holandês', value: 'Dutch Angle' }, { label: 'Close-up Extremo', value: 'Extreme Close-up' }, { label: 'Silhueta na Lua', value: 'Silhouette against the moon' }, { label: 'Exposição Longa', value: 'Long exposure motion blur' }, { label: 'Plano Cinematográfico', value: 'Cinematic Wide Shot' }] },
      { id: 'style', label: 'Estilo', hint: 'Visual artístico ou técnico', placeholder: 'Ex: Fotografia de revista', type: 'textarea', suggestions: [{ label: 'Realista', value: 'Ultra-realistic photography, high detail, lifelike textures' }, { label: 'Fotográfico Profissional', value: 'Professional studio photography, 8k resolution, sharp focus' }, { label: 'Ultra Detalhado', value: 'Hyper-detailed, intricate textures, extreme realism' }, { label: 'Estilo Os Simpsons', value: 'The Simpsons cartoon style' }, { label: 'Estilo Disney', value: 'Disney animation style' }, { label: 'Rick and Morty', value: 'Rick and Morty style' }, { label: 'Hora de Aventura', value: 'Adventure Time style' }, { label: 'Estilo Futurama', value: 'Futurama art style' }, { label: 'Game of Thrones', value: 'Game of Thrones aesthetic' }, { label: 'Studio Ghibli', value: 'Studio Ghibli style' }, { label: 'Estilo Cyberpunk', value: 'Cyberpunk aesthetic' }, { label: 'South Park', value: 'South Park style' }, { label: 'Dragon Ball Z', value: 'Dragon Ball Z style' }, { label: 'Marvel Comics', value: 'Marvel Comics style' }, { label: 'Estilo GTA V', value: 'GTA V style' }, { label: 'National Geographic', value: 'National Geographic photography' }, { label: 'Filme Kodak Portra 400', value: 'Kodak Portra 400 film look' }, { label: 'Hiper-realista 8k', value: 'Hyper-realistic 8k octane render' }, { label: 'Estilo H.R. Giger', value: 'Biomechanical H.R. Giger style' }, { label: 'Arte Surrealista', value: 'Surrealist digital art' }, { label: 'Vaporwave', value: 'Vaporwave aesthetics' }, { label: 'Glitch Art', value: 'Glitch art' }, { label: 'Dupla Exposição', value: 'Double exposure' }, { label: 'Pintura a Óleo', value: 'Impressionist oil painting' }, { label: 'Luz Cinematográfica', value: 'Anamorphic lens flare' }, { label: 'Iluminação de Retrato', value: 'Studio portrait lighting' }, { label: 'Macro Detalhado', value: 'Macro photography details' }, { label: 'Pintura a Óleo', value: 'Oil Painting' }, { label: 'Render 3D', value: '3D Render' }, { label: 'Esboço a Lápis', value: 'Pencil Sketch' }] }
    ]
  },
  'photo-transform': {
    id: 'photo-transform',
    title: 'Transformar Foto (Nano Banana)',
    desc: 'Aplique novos estilos ou modifique cenas.',
    helpText: 'Mude o estilo ou o cenário de uma foto existente de forma criativa. Mantenha a essência do sujeito principal enquanto descreve as mudanças radicais de ambiente ou estética.',
    formula: (vals) => `Taking the provided source image as the structural reference, ${vals.relationship}. The transformation should result in ${vals.new_scenario}, preserving the core subject's identity while completely reimagining the aesthetic and atmosphere in a high-fidelity manner.`,
    fields: [
      {
        id: 'relationship',
        label: 'Transformação/Estilo',
        hint: 'Novo estilo visual (clique em vários para combinar)',
        placeholder: 'Ex: transforme em anime',
        type: 'text',
        suggestions: [
          { label: 'Estilo Os Simpsons', value: 'The Simpsons style' },
          { label: 'Estilo Disney', value: 'Disney animation style' },
          { label: 'Rick and Morty', value: 'Rick and Morty style' },
          { label: 'Hora de Aventura', value: 'Adventure Time style' },
          { label: 'Estilo Futurama', value: 'Futurama art style' },
          { label: 'Game of Thrones', value: 'Game of Thrones aesthetic' },
          { label: 'Studio Ghibli', value: 'Studio Ghibli style' },
          { label: 'South Park', value: 'South Park style' },
          { label: 'Dragon Ball Z', value: 'Dragon Ball Z style' },
          { label: 'Naruto', value: 'Naruto anime style' },
          { label: 'One Piece', value: 'One Piece style' },
          { label: 'Marvel Comics', value: 'Marvel Comics style' },
          { label: 'DC Comics', value: 'DC Comics style' },
          { label: 'GTA V', value: 'GTA V loading screen style' },
          { label: 'Borderlands', value: 'Borderlands cell-shaded style' },
          { label: 'Fortnite', value: 'Fortnite art style' },
          { label: 'Cyberpunk 2077', value: 'Cyberpunk 2077 aesthetic' },
          { label: 'Anime anos 90', value: '90s Anime style' },
          { label: '3D Pixar', value: '3D Pixar style' },
          { label: 'Cyberpunk', value: 'Cyberpunk aesthetic' },
          { label: 'Pintura a óleo', value: 'Oil painting' },
          { label: 'Desenho a lápis', value: 'Pencil sketch' },
          { label: 'Massinha (Claymation)', value: 'Claymation' },
          { label: 'Vaporwave', value: 'Vaporwave' },
          { label: 'Luz cinematográfica', value: 'Cinematic lighting' },
          { label: 'Aquarela', value: 'Watercolor' },
          { label: 'Origami', value: 'Origami art' },
          { label: 'Low Poly 3D', value: 'Low poly 3D' },
          { label: 'Cartoon', value: 'Cartoon style' },
          { label: 'Pintura Histórica', value: 'Historical painting' },
          { label: 'Sci-fi Futurista', value: 'Futuristic sci-fi' },
          { label: 'Terror Gótico', value: 'Gothic horror' },
          { label: 'Art Déco', value: 'Art Deco' },
          { label: 'Impressionismo', value: 'Impressionism' },
          { label: 'Surrealismo', value: 'Surrealism' },
          { label: 'Steampunk', value: 'Steampunk' },
          { label: 'Pós-apocalíptico', value: 'Post-apocalyptic' },
          { label: 'Minimalista', value: 'Minimalist' },
          { label: 'Foto Vintage', value: 'Vintage photo' },
          { label: 'Foto de Rua', value: 'Street photography' },
          { label: 'Foto de Retrato', value: 'Portrait photography' },
          { label: 'Paisagem', value: 'Landscape photography' },
          { label: 'Foto de Moda', value: 'Fashion photography' },
          { label: 'Editorial', value: 'Editorial photography' },
          { label: 'Fine Art', value: 'Fine art photography' },
          { label: 'Conceitual', value: 'Conceptual photography' },
          { label: 'Experimental', value: 'Experimental photography' },
          { label: 'Abstrato', value: 'Abstract photography' },
          { label: 'Preto e Branco', value: 'Black and white' },
          { label: 'Sépia', value: 'Sepia tone' },
          { label: 'Alto Contraste', value: 'High contrast' },
          { label: 'Baixo Contraste', value: 'Low contrast' },
          { label: 'Luz Suave', value: 'Soft lighting' },
          { label: 'Luz Dura', value: 'Hard lighting' },
          { label: 'Iluminação Dramática', value: 'Dramatic lighting' },
          { label: 'Luz Natural', value: 'Natural lighting' },
          { label: 'Luz de Estúdio', value: 'Studio lighting' }
        ]
      },
      {
        id: 'new_scenario',
        label: 'Novo Cenário/Ação',
        hint: 'O que muda no fundo ou ação',
        placeholder: 'Ex: coloque na praia',
        type: 'textarea',
        suggestions: [
          { label: 'mesmo cenário original', value: 'the same scenario and action as the original' },
          { label: 'cidade neon futurista', value: 'a futuristic neon city' },
          { label: 'montanhas com neve', value: 'a snowy mountain landscape' },
          { label: 'reino subaquático', value: 'underwater kingdom' },
          { label: 'biblioteca aconchegante', value: 'a cozy library' },
          { label: 'espaço sideral', value: 'outer space background' }
        ]
      }
    ]
  },
  'image-stacker': {
    id: 'image-stacker',
    title: 'Empilhador Pinterest',
    desc: 'Crie pins verticais longos juntando várias fotos em uma só.',
    helpText: 'Arraste as fotos para mudar a ordem. Recomendamos até 10 fotos para melhor qualidade no Pinterest.',
    isCustom: true
  },
  'about': {
    id: 'about',
    title: 'Sobre a Ferramenta',
    desc: 'Entenda como esta ferramenta ajuda você a criar prompts melhores.',
    helpText: 'Esta ferramenta utiliza fórmulas estruturadas para os modelos Veo e Nano Banana, garantindo que seus prompts sejam profissionais e alcancem o máximo de qualidade técnica. Criado por Ricardo Moura Gimenez (rmgimenez@gmail.com).',
    isAbout: true
  },
  'photo-montage': {
    id: 'photo-montage',
    title: 'Montagem de Fotos',
    desc: 'Combine várias fotos em um grid personalizado com bordas.',
    helpText: 'Escolha o layout do grid, ajuste a espessura e cor das bordas e baixe sua montagem final.',
    isCustom: true
  },
  'video-from-frames': {
    id: 'video-from-frames',
    title: 'Interpolação Viral (TikTok/Reels)',
    desc: 'Transforme dois frames em um vídeo de alta retenção com física e dublagem.',
    helpText: 'Foque nos primeiros 2 segundos (O Gancho) e na trajetória dos objetos para evitar glitches e maximizar o engajamento.',
    formula: (vals) => {
      const camera = parseCamera(vals.camera_motion);
      const dialogue = parseDialogue(vals.dialogue);
      const characters = enrichCharacters(parseCharacters(vals.characters_definition), dialogue);

      const jsonPrompt = {
        cinematography: camera,
        subject: {
          primary: {
            type: "guided_by_frames",
            description: "seamless high-fidelity transition connecting the start and end frames",
            action: vals.initial_hook || "natural fluid connection",
            magic_interaction: vals.object_interaction || "smooth trajectory interpolation"
          },
          ...(characters.length > 0 ? { characters } : {})
        },
        environment: {
          lighting: "maintain_from_frames",
          atmosphere: {
            weather: "maintain_from_frames",
            mood: vals.general_notes || "funny comedic skit for TikTok"
          },
          style_quality: vals.visual_quality || "hyper-realistic, 8k, cinematic lighting"
        },
        motion: {
          temporal_logic: "continuous",
          physics: "fluid_pacing_and_retention",
          transitions: {
            from_start_frame: "match_cut",
            to_end_frame: "smooth_interpolation"
          }
        },
        audio: {
          sound_effects: vals.sound_effects || "no audio",
          ...(dialogue.length > 0 ? {
            dialogue,
            language: "pt-BR",
            lip_sync: "perfect"
          } : {})
        },
        negative_prompts: VIDEO_NEGATIVE_PROMPTS
      };

      return JSON.stringify(jsonPrompt, null, 2);
    },
    fields: [
      { 
        id: 'characters_definition', 
        label: 'Definição dos Personagens (Consistência)', 
        hint: 'Mantenha igual em toda a sua série de vídeos', 
        placeholder: 'Ex: [morango][personagem morango][voz doce]', 
        type: 'textarea', 
        suggestions: [
          { label: 'Exemplo Frutas', value: '[morango][personagem vermelho com cara de morango][voz doce, aguda e amigável]\n[abacaxi][personagem amarelo com cara de abacaxi][voz calma, levemente encorpada e relaxada]\n[uva][personagem roxo com cara de uva][voz muito aguda, agitada e estridente]' }
        ] 
      },
      { 
        id: 'visual_quality', 
        label: 'Qualidade Visual (Tokens de Ouro)', 
        hint: 'Palavras que "chamam" a qualidade do Nano Banana 2', 
        placeholder: 'Ex: Unreal Engine 5 render, 8k, photorealistic', 
        type: 'text', 
        suggestions: [
          { label: 'Unreal Engine 5', value: 'hyper-realistic, 8k, cinematic lighting, unreal engine 5 style, masterfully executed' },
          { label: 'Studio Ghibli Vibe', value: 'Studio Ghibli art style, lush hand-painted textures, soft natural lighting' },
          { label: 'Estilo Pixar/Disney', value: 'highly detailed 3D animation, vibrant colors, sub-surface scattering, disney style' },
          { label: 'Cyberpunk Noir', value: 'neon lighting, rainy atmosphere, high contrast, cinematic noir aesthetic' },
          { label: 'Hiper-Realismo Têxtil', value: 'extreme focus on fabric textures, skin pores, and micro-details, photorealistic' },
          { label: 'Anime Moderno', value: 'high-quality modern anime style, dynamic shadows, sharp lines, cinematic composition' }
        ] 
      },
      { 
        id: 'object_interaction', 
        label: 'Momento Mágico (Objeto)', 
        hint: 'Descreva a trajetória de objetos que mudam de lugar', 
        placeholder: 'Ex: a estrela do mar pula da areia para o rosto da morango', 
        type: 'textarea', 
        suggestions: [
          { label: 'Salto/Voo Repentino', value: 'the object on the ground suddenly jumps up and attaches to the character\'s face' },
          { label: 'Levitação Mística', value: 'the object begins to glow and slowly levitates into the character\'s hands' },
          { label: 'Teletransporte', value: 'the object disappears in a puff of smoke and reappears in a new position' },
          { label: 'Fusão Orgânica', value: 'two objects merge together to form a new single item' },
          { label: 'Ataque de Cócegas', value: 'the object starts moving on its own and tickles the character' },
          { label: 'Interação de Troca', value: 'the character quickly swaps the object they are holding for something else' }
        ] 
      },
      { 
        id: 'initial_hook', 
        label: 'Gancho e Ação Inicial', 
        hint: 'O que acontece nos primeiros 2 segundos para prender a atenção', 
        placeholder: 'Ex: os personagens começam a rir e apontar para a câmera', 
        type: 'textarea', 
        suggestions: [
          { label: 'Susto/Choque', value: 'reacting with extreme shock, jumping back with wide eyes directly at the camera' },
          { label: 'Risada Explosiva', value: 'bursting into a fit of uncontrollable laughter and pointing at each other' },
          { label: 'Quebra da 4ª Parede', value: 'the character looks directly at the camera, winks, and gives a thumbs up' },
          { label: 'Dança Viral', value: 'performing a quick and trendy dance move with high energy' },
          { label: 'Mistério/Sussurro', value: 'leaning into the camera and whispering something secret with an intrigued look' },
          { label: 'Ação de Atirar', value: 'the character throws something directly towards the camera lens' }
        ] 
      },
      { 
        id: 'general_notes', 
        label: 'Tom e Atmosfera', 
        hint: 'Humor, suspense, épico...', 
        placeholder: 'Ex: vídeo de humor para TikTok', 
        type: 'text', 
        suggestions: [
          { label: 'Comédia Social', value: 'funny comedic skit for TikTok, lighthearted and energetic' },
          { label: 'Épico/Grandioso', value: 'epic cinematic atmosphere, dramatic scale, orchestral feel' },
          { label: 'Suspense/Mistério', value: 'dark, mysterious, and intriguing atmosphere with sharp shadows' },
          { label: 'Fofo/Aesthetic', value: 'cute, soft, and aesthetic atmosphere, pastel colors, cozy vibes' },
          { label: 'Futurista/Cyber', value: 'high-tech, futuristic, and high-energy atmosphere with neon accents' },
          { label: 'Nostálgico/Retrô', value: 'vintage film aesthetic, nostalgic 90s vibe, warm colors' }
        ] 
      },
      { 
        id: 'camera_motion', 
        label: 'Câmera Dinâmica (Retenção)', 
        hint: 'Movimentos que "prendem" o olhar no feed', 
        placeholder: 'Ex: Dolly Zoom', 
        type: 'text', 
        suggestions: [
          { label: 'Dolly Zoom (Vértigo)', value: 'Dolly Zoom effect creating a sense of dramatic realization' }, 
          { label: 'Órbita Rápida 360°', value: 'Fast 360-degree circular orbit around the characters' },
          { label: 'Zoom de Impacto', value: 'Fast and sudden "Snap Zoom" into the character\'s expressive face' }, 
          { label: 'Câmera na Mão (POV)', value: 'Dynamic handheld shaky camera for a realistic documentary feel' },
          { label: 'Movimento de Drone', value: 'Sweeping cinematic drone-like movement from high to low' },
          { label: 'Foco Alternado', value: 'Rack focus transition from the background object to the foreground character' }
        ] 
      },
      { 
        id: 'sound_effects', 
        label: 'Sons e ASMR', 
        placeholder: 'Ex: Som de risadas e ambiente', 
        type: 'text', 
        suggestions: [
          { label: 'Risadas em Grupo', value: 'SFX: Group of people laughing loudly and hysterically' },
          { label: 'Som de Magia/Brilho', value: 'SFX: Magical ethereal chiming and sparkling sound' },
          { label: 'Impacto Cinematográfico', value: 'SFX: Heavy cinematic "THUD" or impact sound' },
          { label: 'Natureza Imersiva', value: 'SFX: Birds chirping, wind blowing through leaves, very clear audio' },
          { label: 'Pop/Cartoon', value: 'SFX: Classic cartoon "POP" sound effect' },
          { label: 'Caminhada (ASMR)', value: 'SFX: Clear footsteps on sand and rustling of fabric' }
        ] 
      },
      { 
        id: 'dialogue', 
        label: 'Falas (Dublagem pt-BR)', 
        hint: 'Use o formato [personagem] (emoção): [fala]', 
        placeholder: 'Ex: [uva] (assustada): [olha só isso!]', 
        type: 'textarea',
        suggestions: [
          { label: 'Diálogo Expressivo', value: '[morango] (feliz): [olá abacaxi, você viu o sol hoje?!]\n[abacaxi] (calmo): [sim morango, ele está radiante e quente!]\n[uva] (sarcástica): [radiante? está um forno isso aqui!]' },
          { label: 'Comédia Rápida', value: '[morango] (rindo): [hahaha abacaxi, você parece uma coroa!]\n[abacaxi] (irritado): [ei morango, respeite minha realeza vegetal!]' }
        ]
      },
      {
        id: 'help_info',
        label: '🚀 Estratégias e Guia dos Campos',
        type: 'info',
        content: `🔥 ESTRATÉGIAS VIRAIS:
• REGRA DOS 2 SEGUNDOS: O "Gancho Inicial" deve ter movimento. Comece com uma risada, um pulo ou a câmera se aproximando rápido.
• MOMENTOS MÁGICOS: Vídeos onde objetos se movem sozinhos geram muita curiosidade. Descreva o trajeto completo no campo "Momento Mágico".
• QUALIDADE NANO BANANA: Sempre use os tokens de "Qualidade Visual". Isso faz a IA usar mais processamento para detalhes.

📝 GUIA RÁPIDO DOS CAMPOS:
• Personagens: Mantenha este campo idêntico em todos os vídeos para que seu público reconheça sua "marca".
• Qualidade Visual: Você pode combinar várias sugestões. Ex: "8k, Unreal Engine 5, Pixar Style".
• Dublagem: O formato [personagem] (emoção): [fala] é recomendado para que a IA saiba a entonação correta, crie a linha do tempo e mova a boca correspondente de forma perfeita.
• Campos Vazios: Não se preocupe em preencher tudo. Se deixar vazio, o sistema usa "Default Inteligentes" para garantir que o vídeo não fique parado.`
      }
    ]
  }
};
