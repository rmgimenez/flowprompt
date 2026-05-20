import { 
  parseCamera, 
  parseDialogue, 
  parseCharacters, 
  enrichCharacters, 
  VIDEO_NEGATIVE_PROMPTS 
} from '../../utils/parsers';

export const videoFromImg = {
  id: 'video-from-img',
  title: 'Vídeo de Imagem (Veo)',
  desc: 'Dê vida a uma imagem estática com movimento e som.',
  helpText: 'Dê vida às suas fotos! Descreva o que deve se mover na cena, o movimento de câmera e os efeitos sonoros. Dica: você pode escolher "Sem Som" se desejar apenas a animação visual.',
  formula: (vals) => {
    const camera = parseCamera(vals.camera_motion);
    const dialogue = parseDialogue(vals.dialogue);
    const characters = enrichCharacters(parseCharacters(vals.characters_definition), dialogue);

    const jsonPrompt = {
      scene_summary: vals.scene_summary || "An animated cinematic transition maintaining visual fidelity from the static frame.",
      cinematography: {
        style_aesthetic: "Cinematic photorealistic animation style maintaining original image quality",
        camera_instructions: vals.camera_motion || "Camera panning gently around the subject to establish depth",
        composition_framing: "Professional composition that maintains subject centrality during animation",
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
        context: "maintain from image",
        color_palette: "maintain from image, cohesive cinematic tones",
        lighting_and_mood: {
          key_light: "maintain_from_image",
          fill_light: "maintain_from_image",
          rim_light: "maintain_from_image",
          mood: "Cinematic continuity of light and mood from the static frame"
        },
        atmosphere: {
          weather: "maintain_from_image",
          mood: "cinematic_continuity"
        }
      },
      motion: {
        temporal_logic: "continuous",
        physics: vals.motion_fluidity || "realistic_fluid",
        stability_rules: vals.motion_stability || "standard consistent structure"
      },
      audio: {
        sound_effects: vals.sound_effects || "SFX: Ambient sounds and ASMR, no subtitles",
        rules: "Always add audio. Never include subtitles or on-screen text overlays.",
        ...(dialogue.length > 0 ? {
          dialogue,
          language: "pt-BR",
          lip_sync: "perfect",
          voice_acting_direction: {
            accent: "natural Brazilian Portuguese (pt-BR) accent with authentic pronunciation, zero robotic formalisms",
            delivery_style: "energetic, comedic, charismatic, and expressive like a modern TikTok/Reels influencer vlog",
            comedic_timing: "modern comedic influencer timing, utilizing subtle awkward pauses, realistic conversational breaths, and meme-style pacing"
          }
        } : {})
      },
      negative_prompts: [
        "subtitles", "text", "watermark", "distortions", "unrealistic proportions", "flickering lighting",
        ...VIDEO_NEGATIVE_PROMPTS,
        "extra characters not in the brief"
      ]
    };

    return JSON.stringify(jsonPrompt, null, 2);
  },
  fields: [
    {
      id: 'scene_summary',
      label: 'Resumo da Animação (Momento Cinematográfico)',
      hint: 'Descreva a animação em uma frase clara para roteirização',
      placeholder: 'Ex: O cabelo da guerreira voa ao vento enquanto as folhas caem ao redor',
      type: 'text',
      suggestions: [
        { label: 'Exemplo Vento', value: 'O cabelo longo do guerreiro e suas vestes balançam suavemente com um vento forte da montanha.' },
        { label: 'Dança em Loop', value: 'Personagem dança de forma super expressiva e dinâmica, retornando suavemente à pose inicial em um loop contínuo.' }
      ]
    },
    { 
      id: 'characters_definition', 
      label: 'Criação dos Personagens', 
      hint: 'Crie personagens estruturados com opções rápidas de montagem', 
      type: 'characters-table',
      suggestions: [
        { 
          label: 'Exemplo Frutas Animadas', 
          value: [
            { name: 'morango', appearance: 'cute red fruit character with strawberry face', clothing: 'tiny white leaf collar', motion: 'high_energy_expressive', voice: 'sweet high-pitched voice' },
            { name: 'abacaxi', appearance: 'relaxed yellow fruit character with pineapple crown', clothing: 'sunglasses and tropical shirt', motion: 'composed_natural', voice: 'calm deep laidback voice' },
            { name: 'uva', appearance: 'sarcastic purple fruit character with grape bunch body', clothing: 'tiny green vine leaf hat', motion: 'high_energy_expressive', voice: 'sarcastic medium-pitched voice' }
          ] 
        }
      ] 
    },
    { 
      id: 'camera_motion', 
      label: 'Movimento de Câmera & Enquadramento', 
      hint: 'Direção e tipo de movimento', 
      placeholder: 'Ex: Zoom suave', 
      type: 'text', 
      suggestions: [
        { label: 'Zoom Pulsante no Ritmo', value: 'Static camera with subtle zoom pulsing in and out matching the musical beat' },
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
        { label: 'Câmera Selfie na Mão', value: 'Handheld Selfie Camera' },
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
        { label: 'Música Eletrônica (Loop)', value: 'SFX: Upbeat electronic dance music loop with deep bass' },
        { label: 'Sem Som', value: 'no audio' }, 
        { label: 'Som de Trovão', value: 'SFX: Thunder cracks' }, 
        { label: 'Som de Chuva', value: 'SFX: Rain falling' }, 
        { label: 'Vento Uivante', value: 'SFX: Wind howling' }, 
        { label: 'Trilha Épica', value: 'SFX: Epic cinematic music' }, 
        { label: 'Impacto Cinemático', value: 'SFX: Cinematic impact hit' },
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
      label: 'Ação Adicional (O que se move na imagem)', 
      hint: 'O que deve se mover na imagem', 
      placeholder: 'Ex: nuvens se movem', 
      type: 'textarea', 
      suggestions: [
        { label: 'Dança em Loop Perfeito', value: 'performing a dynamic dance style, smoothly returning to the exact initial pose in the final frames to create a flawless seamless loop' },
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
        { 
          label: 'TikTok Viral (Vlog/Meme)', 
          value: '[morango] (excited): [Fala galera! Olha só quem resolveu aparecer no feed hoje!]\n[abacaxi] (calmo): [Fala baixo, mano...]\n[morango] (sarcastic): [Se ele tá tímido no vídeo... imagina na vida real, confia.]' 
        },
        { label: 'Diálogo Expressivo', value: '[morango] (feliz): [olá abacaxi, você viu o sol hoje?!]\n[abacaxi] (calmo): [sim morango, ele está radiante e quente!]\n[uva] (sarcástica): [radiante? está um forno isso aqui!]' },
        { label: 'Comédia Rápida', value: '[morango] (rindo): [hahaha abacaxi, você parece uma coroa!]\n[abacaxi] (irritado): [ei morango, respeite minha realeza vegetal!]' },
        { label: 'Sem Fala', value: '' }
      ] 
    },
    {
      id: 'motion_fluidity',
      label: 'Fluidez & Ritmo de Movimento',
      hint: 'Define a cadência, inércia e pacing físico do movimento',
      placeholder: 'Ex: Cinemática Lenta, microgravidade realista, física de fluidos sutil',
      type: 'text',
      suggestions: [
        { label: 'Cinemática Lenta (Slow Motion)', value: 'cinematic slow-motion 24fps, high motion inertia, realistic organic physics acceleration' },
        { label: 'Física Natural & Fluida', value: 'natural organic physics, subtle fluid motion, lifelike weight distribution, smooth flow' },
        { label: 'Alta Energia Cinemática', value: 'high-energy kinetic motion, explosive speed ramps, dynamic force vector, fluid wind-up' },
        { label: 'Microgravidade Fluida', value: 'dreamy slow motion floating, zero-gravity drift, stellar dust floating, ultra-fluid physics' },
        { label: 'Fluxo Líquido/Gelatinoso', value: 'fluid hydrodynamic flow, gelatinous elasticity, smooth surface tension transitions' }
      ]
    },
    {
      id: 'motion_stability',
      label: 'Estabilização Física & Anatômica',
      hint: 'Preserva a integridade estrutural e evita glitches de IA',
      placeholder: 'Ex: Integridade anatômica absoluta, anti-glitch e consistência temporal',
      type: 'text',
      suggestions: [
        { label: 'Anti-Glitch Absoluto', value: 'absolute physical and temporal consistency, zero visual glitches, no morphing artifacts, stable borders' },
        { label: 'Preservação Anatômica', value: 'strict anatomical preservation, flawless limb symmetry, logical joint movements, steady posture' },
        { label: 'Fluidez Cinemática Estável', value: 'perfect frame-to-frame coherence, stable spatial volume, flicker-free background, sharp details' },
        { label: 'Hiper-Consistência Corporal', value: 'rigid body physics consistency, persistent clothing folds, non-deforming face details during motion' }
      ]
    },
    {
      id: 'help_info',
      label: '🚀 Guia de Animação de Imagens (Video from Image)',
      type: 'info',
      content: `🌟 TÉCNICAS DE ANIMAÇÃO VIRAIS:
• CONTINUIDADE VISUAL: O Veo 3.1 mantém 100% da fidelidade do sujeito e cenário originais da sua imagem estática.
• CRIADOR DE PERSONAGENS: Defina as características na tabela interativa para garantir fidelidade visual e vocal ao dublar rostos.
• DUBLAGEM & ATUAÇÃO: Siga o formato padrão "[personagem] (emoção): [fala]". Escreva falas descontraídas e repletas de gírias para uma dublagem natural do TikTok.
• EFEITOS SONOROS (SFX): Efeitos sonoros imersivos (ASMR de passos, chuva ou vento crepitante) geram até 40% mais retenção nas redes.`
    }
  ]
};
