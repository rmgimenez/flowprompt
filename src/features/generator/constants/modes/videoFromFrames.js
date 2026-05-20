import { 
  parseCamera, 
  parseDialogue, 
  parseCharacters, 
  enrichCharacters, 
  VIDEO_NEGATIVE_PROMPTS 
} from '../../utils/parsers';

export const videoFromFrames = {
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
        physics: vals.motion_fluidity || "fluid_pacing_and_retention",
        stability_rules: vals.motion_stability || "standard consistent structure",
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
          lip_sync: "perfect",
          voice_acting_direction: {
            accent: "natural Brazilian Portuguese (pt-BR) accent with authentic pronunciation, zero robotic formalisms",
            delivery_style: "energetic, comedic, charismatic, and expressive like a modern TikTok/Reels influencer vlog",
            comedic_timing: "modern comedic influencer timing, utilizing subtle awkward pauses, realistic conversational breaths, and meme-style pacing"
          }
        } : {})
      },
      negative_prompts: VIDEO_NEGATIVE_PROMPTS
    };

    return JSON.stringify(jsonPrompt, null, 2);
  },
  fields: [
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
        { label: 'Câmera Selfie na Mão', value: 'Handheld Selfie Camera' },
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
        { label: 'Impacto Cinemático', value: 'SFX: Heavy cinematic "THUD" or impact sound' },
        { label: 'Natureza Imersiva', value: 'SFX: Birds chirping, wind blowing through leaves, very clear audio' },
        { label: 'Pop/Cartoon', value: 'SFX: Classic cartoon "POP" sound effect' },
        { label: 'Caminhada (ASMR)', value: 'SFX: Clear footsteps on sand and rustling of fabric' }
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
      label: '🚀 Estratégias e Guia dos Campos',
      type: 'info',
      content: `🔥 ESTRATÉGIAS VIRAIS:
• REGRA DOS 2 SEGUNDOS: O "Gancho Inicial" deve ter movimento. Comece com uma risada, um pulo ou a câmera se aproximando rápido.
• CRIADOR DE PERSONAGENS: Defina as características na tabela interativa para garantir fidelidade visual e vocal.
• DUBLAGEM & ATUAÇÃO: Digite as falas no formato "[personagem] (emoção): [fala]". Escreva falas descontraídas e repletas de gírias para uma dublagem natural do TikTok.
• EFEITOS SONOROS (SFX): Efeitos sonoros imersivos (ASMR de passos, chuva ou vento crepitante) geram até 40% mais retenção nas redes.

📝 GUIA RÁPIDO DOS CAMPOS:
• Personagens: Mantenha este campo idêntico em todos os vídeos para que seu público reconheça sua "marca".
• Qualidade Visual: Você pode combinar várias sugestões. Ex: "8k, Unreal Engine 5, Pixar Style".
• Dublagem: O formato [personagem] (emoção): [fala] é recomendado para que a IA saiba a entonação correta, crie a linha do tempo e mova a boca correspondente de forma perfeita.
• Campos Vazios: Não se preocupe em preencher tudo. Se deixar vazio, o sistema usa "Default Inteligentes" para garantir que o vídeo não fique parado.`
    }
  ]
};
