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

    const aspectRatio = vals.aspect_ratio || "9:16 (Vertical)";
    const durationText = vals.video_duration || "6 segundos";
    const durationNum = parseInt(durationText) || 6;
    const timelineMode = vals.timeline_mode || "Multi-shot Dinâmico";

    // Character manifest formatting
    let charManifest = "";
    if (characters.length > 0) {
      charManifest = characters.map(char => {
        let bio = `- **${char.name}**: ${char.description}`;
        if (char.voice_attributes) bio += `, voice direction: ${char.voice_attributes}`;
        if (char.motion_signature) bio += `, movement style: ${char.motion_signature}`;
        return bio;
      }).join('\n');
    } else {
      charManifest = "- **Main Focus**: Guided interpolation between start and end frames";
    }

    const voiceDirection = dialogue.length > 0
      ? `\n- **Voice & Dubbing Specs:** All character speech must be in natural Brazilian Portuguese (pt-BR) with flawless lip-sync. Voice acting should be highly expressive, charismatic, and energetic, matching comedic influencer delivery. Use realistic breaths and modern pacing.`
      : "";

    let timelineScript = "";

    if (dialogue.length > 0) {
      if (timelineMode.includes("Multi-shot")) {
        // Multi-shot mode: Create camera cuts for each dialogue line
        timelineScript = dialogue.map((line, idx) => {
          const start = line.timing.start.toFixed(1).padStart(5, '0').replace('.', ':');
          const end = line.timing.end.toFixed(1).padStart(5, '0').replace('.', ':');
          
          const characterObj = characters.find(c => c.name.toLowerCase() === line.character.toLowerCase());
          const actionText = characterObj ? `performing in a ${characterObj.motion_signature} manner` : "acting naturally in the scene";
          
          const cameraCuts = ["Close-up Shot", "Medium Close-up Shot", "Reverse Shot", "Tight Portrait Shot"];
          const selectedCut = cameraCuts[idx % cameraCuts.length];

          const startBridge = idx === 0 
            ? "Animate the first phase of transition starting directly from the first guided frame: " 
            : "";
          
          const endBridge = idx === dialogue.length - 1
            ? " Conclude the animation by seamlessly blending into the exact visual pose and state of the second guided frame."
            : "";

          return `[${start} - ${end}]
- **Camera Cut:** ${idx === 0 ? "Initial framing from first image, then transition to: " : ""}${selectedCut} focusing on '${line.character}'.
- **Action/Expression:** ${startBridge}'${line.character}' displays a '${line.emotion_tone}' expression while ${actionText}.${endBridge}
- **Dialogue Speech:** '${line.character}' says in a direct quote: "${line.speech}"
- **Sound Effects (SFX) & Ambiance:** ${vals.sound_effects && vals.sound_effects !== 'no audio' ? vals.sound_effects : "SFX: Atmospheric ambient sounds matching the action"}. ${idx === 0 ? "Perfect audio ducking for speaking voice." : ""}`;
        }).join('\n\n');
      } else {
        // Single continuous shot mode
        const totalDurationFormatted = `00:0${durationNum}:0`;
        const dialogueLinesText = dialogue.map(line => {
          const timestamp = line.timing.start.toFixed(1).padStart(5, '0').replace('.', ':');
          return `  * At [${timestamp}], '${line.character}' (feeling ${line.emotion_tone}) says in a direct quote: "${line.speech}"`;
        }).join('\n');

        timelineScript = `[00:00 - ${totalDurationFormatted}]
- **Camera Motion:** Continuous shot starting from the first frame's camera perspective, slowly interpolating to the second frame's perspective, using: ${vals.camera_motion || "gentle panning"}.
- **Action/Expression:** Begin exactly from the first frame's pose, performing: ${vals.initial_hook || "natural fluid movement"}. Interpolate and smoothly guide all motion trajectories to align perfectly with the second frame's end state.
- **Production Script (Dialogue Sequence):**
${dialogueLinesText}
- **Sound Effects (SFX) & Ambiance:** ${vals.sound_effects && vals.sound_effects !== 'no audio' ? vals.sound_effects : "SFX: Balanced background environmental soundscape with clear speech"}.`;
      }
    } else {
      const totalDurationFormatted = `00:0${durationNum}:0`;
      timelineScript = `[00:00 - ${totalDurationFormatted}]
- **Camera Motion:** Continuous shot starting from the first frame's camera perspective, slowly interpolating to the second frame's perspective, using: ${vals.camera_motion || "gentle panning"}.
- **Action & Movement:** Smoothly animate starting exactly from the first image pose, performing: ${vals.initial_hook || "natural fluid movement"}. Smoothly guide the motion of the subjects and objects to end precisely in the second image pose.
- **Sound Effects (SFX) & Ambiance:** ${vals.sound_effects && vals.sound_effects !== 'no audio' ? vals.sound_effects : "SFX: High-fidelity ambient sounds"}.`;
    }

    const negativeText = [
      "subtitles", "text", "watermark", "distortions", "unrealistic proportions", "flickering lighting",
      "extra characters not in the brief",
      ...VIDEO_NEGATIVE_PROMPTS
    ].join(', ');

    return `# GOOGLE VEO 3.1 FRAME-TO-FRAME INTERPOLATION DIRECTIVE

## 📸 GUIDED FRAME TRANSITION & CONTINUITY
- **Transition Goal:** Animate a seamless, highly engaging cinematic transition that connects the provided start frame (first image) to the end frame (second image).
- **Match-Cut & Coherence Rule:** The animation must start exactly at the visual state, character styling, outfits, and lighting of the first frame (00:00). It must morph and progress seamlessly over time to end exactly in the visual layout and pose of the second frame.
- **Initial Hook (0-2s):** ${vals.initial_hook || "Establish a strong dynamic connection to capture attention."}
- **Trajectory & Object Interaction:** ${vals.object_interaction || "Smooth physical trajectory interpolation of any moving objects."}

## 🎥 PRODUCTION SPECIFICATIONS
- **Aspect Ratio:** ${aspectRatio}
- **Target Duration:** ${durationText}
- **Timeline Configuration:** ${timelineMode}
- **Primary Camera Motion:** ${vals.camera_motion || "guided transition between frame perspectives"}
- **Atmosphere & General Notes:** ${vals.general_notes || "funny comedic skit for TikTok"}
- **Visual Quality & Style:** ${vals.visual_quality || "hyper-realistic, 8k, cinematic lighting"}
- **Motion Stability Rules:** ${vals.motion_stability || "perfect frame-to-frame coherence"}, ${vals.motion_fluidity || "fluid motion"}${voiceDirection}

## 👥 CHARACTER BIO-MANIFEST
${charManifest}

## ⏱️ TIMELINES & PRODUCTION SCRIPT
${timelineScript}

## 🔇 EXCLUSIONS (NEGATIVE PROMPT)
${negativeText}`;
  },
  fields: [
    {
      id: 'timeline_mode',
      label: 'Modo de Linha de Tempo (Timeline Mode)',
      hint: 'Escolha se a câmera fará cortes de cena para cada fala ou manterá um plano único.',
      placeholder: 'Ex: Multi-shot Dinâmico',
      type: 'text',
      suggestions: [
        { label: 'Multi-shot Dinâmico (Cortes para cada fala)', value: 'Multi-shot Dinâmico' },
        { label: 'Tomada Única Contínua (Sem cortes)', value: 'Tomada Única Contínua' }
      ]
    },
    {
      id: 'aspect_ratio',
      label: 'Proporção da Tela (Aspect Ratio)',
      hint: 'Proporção recomendada para redes sociais (9:16) ou cinema (16:9)',
      placeholder: 'Ex: 9:16 (Vertical)',
      type: 'text',
      suggestions: [
        { label: '9:16 (Vertical - TikTok/Reels)', value: '9:16 (Vertical)' },
        { label: '16:9 (Horizontal - Cinema/YouTube)', value: '16:9 (Horizontal)' }
      ]
    },
    {
      id: 'video_duration',
      label: 'Duração do Clipe (Video Duration)',
      hint: 'Defina a duração do vídeo suportada nativamente pelo Veo 3.1',
      placeholder: 'Ex: 6 segundos',
      type: 'text',
      suggestions: [
        { label: '4 segundos', value: '4 segundos' },
        { label: '6 segundos', value: '6 segundos' },
        { label: '8 segundos', value: '8 segundos' }
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
