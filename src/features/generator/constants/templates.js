/**
 * Curated Template Library for FlowPrompt
 * Professionally crafted starter prompts for each generation mode.
 */

export const TEMPLATES = {
  'video-new': [
    {
      name: 'Cinema Épico (Veo 3.1)',
      emoji: '🎬',
      desc: 'Widescreen cinemático com iluminação dramática e movimentos lentos.',
      fields: {
        scene_summary: 'Astronauta descobrindo ruínas bioluminescentes em planeta distante.',
        cinematography:
          'Cinematic slow push-in, wide focal length 18mm, aperture f/4.0, gimbal dolly camera',
        subject: 'brave explorer astronaut in glowing space suit exploring the caves',
        action: 'pointing their hand-held lights scanner at ancient glowing alien walls',
        context:
          'gritty bioluminescent cavern on a desert planet, volumetric dust particles, reflections',
        style_ambiance:
          'Epic and grand cinematic lighting, warm golden accents, dark blue atmospheric shadows',
      },
    },
    {
      name: 'Vlog Viral TikTok',
      emoji: '🤳',
      desc: 'Câmera na mão, comédia e falas com dublagem enérgica.',
      fields: {
        scene_summary: 'Vlog engraçado de frutas conversando de forma dinâmica no balcão.',
        cinematography:
          'Handheld camera with natural jitter, fast orbit, close-up framing, active visual hooks',
        subject: 'energetic cartoon strawberry talking excitedly to camera',
        action: 'jumping and screaming while looking directly at camera',
        context: 'modern clean kitchen counter, dynamic warm sunlight coming from window',
        style_ambiance:
          'Vibrant, high saturated colors, professional stream lighting, warm golden tones',
        characters_definition: [
          {
            name: 'morango',
            appearance: 'cute red fruit character with strawberry face',
            clothing: 'tiny white leaf collar',
            motion: 'high_energy_expressive',
            voice: 'sweet high-pitched voice',
          },
          {
            name: 'abacaxi',
            appearance: 'relaxed yellow fruit character with pineapple crown',
            clothing: 'sunglasses and tropical shirt',
            motion: 'composed_natural',
            voice: 'calm deep laidback voice',
          },
        ],
        dialogue:
          '[morango] (excited): [E aí abacaxi! Você viu que o chef comprou um liquidificador novo?!]\n[abacaxi] (calmo): [Sim morango... relaxa aí, não entra em pânico não...]\n[morango] (rindo): [hahaha corrreeeee!]',
      },
    },
    {
      name: 'Cyberpunk Neon',
      emoji: '🕶️',
      desc: 'Ruas molhadas, luzes neon de alta fidelidade e câmera lenta.',
      fields: {
        scene_summary: 'Guerreiro caminhando por rua cyberpunk chuvosa.',
        cinematography: 'Gimbal tracking shot, low-angle, slow dolly in, realistic fluid motion',
        subject:
          'mysterious cybernetic street racer wearing oversized glowing cyberpunk leather hoodie',
        action: 'walking slowly through the rain puddles, steam rising from glowing grates',
        context:
          'neon cyberpunk city street at rain, holographic billboards, reflections on ground',
        style_ambiance:
          'Vibrant Cyberpunk, high contrast neon colors, cool blue and magenta grading',
      },
    },
    {
      name: 'Documentário Natureza',
      emoji: '🦁',
      desc: 'Fotografia de vida selvagem em movimento com luz natural.',
      fields: {
        scene_summary: 'Leopardo se movendo silenciosamente pela savana ao entardecer.',
        cinematography:
          'Long lens tracking shot, 200mm telephoto, smooth gimbal, eye-level perspective',
        subject: 'majestic leopard with spotted golden fur',
        action: 'prowling slowly through tall savanna grass, muscles tensing before a leap',
        context:
          'African savanna at golden hour, warm amber sky, acacia trees silhouetted on horizon',
        style_ambiance:
          'National Geographic documentary style, warm golden hour lighting, shallow depth of field, cinematic color science',
      },
    },
    {
      name: 'Terror Psicológico',
      emoji: '🎃',
      desc: 'Atmosfera de suspense com iluminação baixa e movimentos abruptos.',
      fields: {
        scene_summary: 'Figura sombria se aproximando por um corredor abandonado.',
        cinematography: 'Handheld shaky camera, Dutch angle, slow push-in with sudden quick pan',
        subject: 'shadowy figure with indistinct face, wearing tattered dark cloak',
        action: 'limping slowly toward camera, dragging heavy chains on wet floor',
        context:
          'abandoned mental asylum corridor, flickering fluorescent lights, peeling paint, water dripping',
        style_ambiance:
          'Dark horror aesthetic, desaturated colors, high contrast shadows, film grain, eerie green tint',
      },
    },
    {
      name: 'Reels de Receita',
      emoji: '🍳',
      desc: 'Vídeo rápido de gastronomia com dublagem e close-ups deliciosos.',
      fields: {
        scene_summary: 'Chef preparando um prato gourmet com dublagem descontraída.',
        cinematography: 'Handheld overhead and close-up macro alternating, fast orbit around plate',
        subject: 'professional chef with vibrant personality',
        action: 'skillfully plating a gourmet dish with artistic precision',
        context:
          'modern industrial kitchen, stainless steel counters, fresh ingredients scattered artistically',
        style_ambiance:
          'Bright and vibrant food photography lighting, warm tones, sharp focus on textures, appetizing color grading',
        characters_definition: [
          {
            name: 'chef',
            appearance: 'charismatic young chef with stylish apron',
            clothing: 'white chef coat and black apron',
            motion: 'high_energy_expressive',
            voice: 'energetic passionate cooking show voice',
          },
        ],
        dialogue:
          '[chef] (excited): [Galera, olha essa textura! Perfeita pra viralizar no feed!]\n[chef] (proud): [Só mais uma pitadinha de sal... pronto!]',
      },
    },
  ],
  'photo-new': [
    {
      name: 'Estúdio Profissional (Banana 2)',
      emoji: '📸',
      desc: 'Fotografia com nitidez extrema e desfoque profissional.',
      fields: {
        subject: 'charismatic cyberpunk model with glowing tattoos and silver hair',
        action: 'looking directly at camera, posing with confident expression',
        context: 'professional photography studio, minimalist dark grey backdrop, soft fill light',
        composition: 'close-up shot, shallow depth of field, 85mm f/1.4 lens, portrait lighting',
        style:
          'professional studio photography, ultra-realistic textures, grainy analog film look, sharp focus, 8k resolution',
      },
    },
    {
      name: 'Estilo Anime Ghibli',
      emoji: '🍃',
      desc: 'Aquarela pintada à mão e cores mágicas vibrantes.',
      fields: {
        subject: 'cute samurai cat holding a miniature glowing katana sword',
        action: 'sitting peacefully on a mossy stone under a cherry blossom tree',
        context: 'lush green floating fantasy island, glowing pink flower petals falling around',
        composition: 'cinematic wide establishing shot, panoramic beautiful scale',
        style:
          'Studio Ghibli style, hand-drawn anime illustration, vintage watercolor textures, soft sun rays',
      },
    },
    {
      name: 'Vetor Minimalista',
      emoji: '🍦',
      desc: 'Ilustração moderna com tons pastel suaves.',
      fields: {
        subject: 'cute robot character with big glowing blue digital eyes',
        action: 'holding a tiny digital flower pot smiling',
        context: 'dreamy clean workspace, simple flat color elements, minimal bright background',
        composition: 'symmetrical eye-level composition, aesthetic flat layout',
        style:
          'modern vector illustration, pastel tones, minimalist flat color, clean line art, high aesthetic',
      },
    },
    {
      name: 'Retrato Documental',
      emoji: '📰',
      desc: 'Fotografia realista com luz natural e expressão autêntica.',
      fields: {
        subject: 'elderly fisherman with weathered face and deep wrinkles',
        action: 'gazing thoughtfully at the ocean horizon with quiet dignity',
        context: 'rustic wooden fishing dock at dawn, misty ocean, soft morning fog',
        composition: 'medium close-up, rule of thirds, natural framing with weathered wood beams',
        style:
          'documentary portraiture, natural window light, muted earthy tones, Kodak Portra 400 film, subtle grain',
      },
    },
    {
      name: 'Arte Conceitual Sci-Fi',
      emoji: '🚀',
      desc: 'Cenário futurista com detalhes técnicos impressionantes.',
      fields: {
        subject: 'massive terraforming machine towering over alien landscape',
        action: 'emitting streams of glowing plasma into the atmosphere',
        context:
          'red-orange alien desert with floating rock formations, twin moons in twilight sky',
        composition:
          'epic wide shot, low angle looking up at machine, scale emphasized by tiny human figure in foreground',
        style:
          'concept art matte painting, hyper-detailed mechanical design, volumetric god rays, Unreal Engine 5 render, 8k, cinematic atmosphere',
      },
    },
    {
      name: 'Macro Biologia',
      emoji: '🔬',
      desc: 'Detalhes microscópicos da natureza com cores vibrantes.',
      fields: {
        subject: 'iridescent dragonfly wings with complex veined patterns',
        action: 'catching morning light revealing rainbow refractions',
        context: 'dewdrop-covered green leaf, soft blurred garden background, morning mist',
        composition: 'extreme macro shot, shallow depth of field, focus stacking effect',
        style:
          'scientific macro photography, hyper-detailed textures, bioluminescent color effects, National Geographic quality, crystal sharp focus',
      },
    },
    {
      name: 'Motivacional (Apenas Imagem)',
      emoji: '💪',
      desc: 'Imagem inspiradora sem texto — apenas o visual motivacional.',
      fields: {
        subject:
          'random motivational scene: person reaching mountain summit at golden hour OR lone tree on a hill at sunrise OR waves crashing against cliffs at dawn OR athlete silhouetted against sun',
        action:
          'contemplating the vast horizon with a sense of achievement and inner peace, breathing deeply',
        context:
          'dramatic natural landscape at golden hour, warm sunlight piercing through clouds, breathtaking scenic view',
        composition:
          'cinematic wide shot, rule of thirds, leading lines towards the horizon, natural framing',
        style:
          'ultra-realistic inspirational photography, warm golden tones, cinematic color grading, soft atmospheric haze, high detail, no text or typography whatsoever, no letters or words, pure visual storytelling, 8k, sharp focus',
      },
    },
    {
      name: 'Citação de Livro Motivacional',
      emoji: '📖',
      desc: 'Imagem com frase motivacional aleatória de um livro, nome do livro e autor.',
      fields: {
        subject:
          'random person in a contemplative pose reading or reflecting, OR a cozy library vignette with warm lighting, OR an open book on a natural landscape',
        action: 'sitting calmly while absorbing wisdom, soft natural movement',
        context:
          'warm inviting atmosphere, cozy reading nook with soft lamp light OR peaceful natural setting at golden hour OR vintage library with wooden shelves',
        composition:
          'intimate close-up to medium shot, shallow depth of field, emphasis on both the scenery and the overlaid quote text',
        style:
          'Generate a different random motivational quote each time. The image MUST include: (1) a famous inspirational quote from a real book, displayed in elegant typography over the image, (2) the book title below the quote in smaller text, (3) the author name at the bottom. Randomly select a different quote, book, and author from classic literature every generation. Do not repeat quotes. Examples of books to draw from: "O Pequeno Príncipe" (Saint-Exupéry), "Dom Quixote" (Cervantes), "Grandes Esperanças" (Dickens), "O Alquimista" (Coelho), "A República" (Platão), "Meditações" (Marco Aurélio), "O Poder do Hábito", "1984" (Orwell), "A Arte da Guerra" (Sun Tzu), "O Mundo de Sofia", "Sapiens" (Harari). Quote must be in Portuguese (Brazilian). Elegant serif typography, warm vintage tones, premium book cover aesthetic, soft lighting, high detail, 8k',
      },
    },
  ],
  'photo-transform': [
    {
      name: 'Estilo Os Simpsons',
      emoji: '🍩',
      desc: 'Transforme o sujeito em um personagem amarelo clássico de Os Simpsons.',
      fields: {
        relationship:
          'The Simpsons cartoon style, classic yellow skin, iconic bold outlines, animated screen aesthetic',
        new_scenario:
          'in front of the iconic Simpsons house in Springfield, sunny day, cartoon clouds',
      },
    },
    {
      name: 'Estilo Pixar 3D',
      emoji: '🧸',
      desc: 'Transforme em uma animação 3D premium com iluminação suave.',
      fields: {
        relationship:
          '3D Pixar animation style, adorable features, highly detailed fabric and hair textures, raytraced render',
        new_scenario:
          'inside a cozy warm kids playroom, toys in the background, soft warm lighting',
      },
    },
    {
      name: 'Guerreiro Cyberpunk',
      emoji: '🏮',
      desc: 'Aplica um traje cibernético e iluminação neon.',
      fields: {
        relationship:
          'Cyberpunk 2077 aesthetic, cybernetic warrior details, neon holographic visor, high tech plates',
        new_scenario:
          'on a rainy street in Neo-Tokyo, giant glowing hologram billboards, wet ground reflections',
      },
    },
    {
      name: 'Pintura Renascentista',
      emoji: '🎨',
      desc: 'Transforma em uma obra de arte clássica de museu.',
      fields: {
        relationship:
          'Renaissance oil painting style, Caravaggio chiaroscuro lighting, rich fabric textures, classical composition',
        new_scenario:
          'in a grand baroque palace hall, gilded frames on walls, dramatic window light from stained glass',
      },
    },
    {
      name: 'Aquarela de Sonho',
      emoji: '☁️',
      desc: 'Efeito de tinta escorrendo com paleta de cores pastel.',
      fields: {
        relationship:
          'ethereal watercolor dream style, soft bleeding edges, pastel color palette, delicate brush strokes, romantic atmosphere',
        new_scenario:
          'floating among soft watercolor clouds, gentle rain of flower petals, dreamy abstract garden background',
      },
    },
  ],
  'video-from-img': [
    {
      name: 'Dança em Loop Fluido',
      emoji: '🪩',
      desc: 'Personagens dançam de forma animada e voltam exatamente à pose inicial para um loop perfeito e contínuo.',
      fields: {
        scene_summary:
          'A fun animated character dancing to a catchy beat, starting and ending in the exact same pose for a seamless looping video.',
        characters_definition: [
          {
            name: 'dançarino',
            appearance: 'charismatic animated character full of energy',
            clothing: 'cool street wear with glowing neon highlights',
            motion: 'high_energy_expressive',
            voice: 'energetic hyped voice',
          },
        ],
        camera_motion:
          'Static camera with subtle pulsing zoom matched to the rhythm, keeping the subject perfectly centered',
        sound_effects: 'SFX: Upbeat energetic dance floor music with a clean looping beat',
        action:
          'performing a highly energetic and synchronized dance routine, starting in a dynamic pose, dancing expressively, and smoothly returning to the exact starting pose at the final frame for a seamless fluid loop',
        dialogue: '',
      },
    },
    {
      name: 'URL Viral com Falas',
      emoji: '🗣️',
      desc: 'Anime sua imagem com dublagem em português e movimentos naturais.',
      fields: {
        scene_summary:
          'charismatic fruit character comes to life and talks dynamically directly to the camera',
        characters_definition: [
          {
            name: 'morango',
            appearance: 'cute red fruit character with strawberry face',
            clothing: 'tiny white leaf collar',
            motion: 'high_energy_expressive',
            voice: 'sweet high-pitched voice',
          },
          {
            name: 'abacaxi',
            appearance: 'relaxed yellow fruit character with pineapple crown',
            clothing: 'sunglasses and tropical shirt',
            motion: 'composed_natural',
            voice: 'calm deep laidback voice',
          },
        ],
        camera_motion: 'Handheld selfie camera with natural jitter and active visual zoom',
        sound_effects: 'SFX: Clear studio audio with comedic dynamic background music',
        action: 'jumping up and down excitedly, gesturing dramatically with hands while speaking',
        dialogue:
          '[morango] (excited): [E aí abacaxi! Você viu que o chef comprou um liquidificador novo?!]\n[abacaxi] (calmo): [Sim morango... relaxa aí, não entra em pânico não...]\n[morango] (rindo): [hahaha corrreeeee!]',
      },
    },
    {
      name: 'Câmera Lenta Dramática',
      emoji: '⏱️',
      desc: 'Movimento fluido em slow-motion com efeitos sonoros atmosféricos.',
      fields: {
        scene_summary: 'A breathtaking cinematic shot animated in slow motion with high fidelity',
        characters_definition: [],
        camera_motion: 'Slow cinematic push-in with a subtle high-quality gimbal tracking',
        sound_effects: 'SFX: Immersive wind howling and atmospheric slow-motion rumble',
        action:
          'leaves and volumetric dust particles floating slowly down, light rays shifting gracefully',
        dialogue: '',
      },
    },
    {
      name: 'Câmera em Movimento',
      emoji: '🎥',
      desc: 'Tracking shot profissional com dinâmica cinematográfica.',
      fields: {
        scene_summary:
          'A professional tracking shot showing the subject interacting naturally with the environment',
        characters_definition: [],
        camera_motion:
          'Gimbal tracking from a wide Establishing shot to a medium close-up, rack focus transition',
        sound_effects: 'SFX: Heavy footsteps on gravel and ambient outdoor nature sounds',
        action:
          'walking forward step-by-step, breathing naturally, clothes moving realistically in the breeze',
        dialogue: '',
      },
    },
  ],
  'video-from-frames': [
    {
      name: 'Transição Viral',
      emoji: '✨',
      desc: 'Transição suave entre frames com match cut profissional.',
      fields: {
        characters_definition: [],
        visual_quality: 'hyper-realistic, 8k, cinematic lighting, masterfully executed',
        object_interaction:
          'the primary object in the foreground smoothly morphs and glides to match the ending position in the second frame',
        initial_hook:
          'pointing and looking at the transition area with highly expressive body language',
        general_notes: 'vibrant high-energy visual transition for social media',
        camera_motion: 'Orbit transition with speed ramping and a seamless snap match-cut',
        sound_effects: 'SFX: Energetic transition whoosh with digital synthesizer swell',
        dialogue: '',
      },
    },
    {
      name: 'Morph Criativo',
      emoji: '🌀',
      desc: 'Transformação fluida entre elementos das duas imagens.',
      fields: {
        characters_definition: [],
        visual_quality: 'highly detailed 3D animation, vibrant surrealist colors, raytraced render',
        object_interaction:
          'the primary subject organically dissolves into swirling glowing particles that reform into the target object',
        initial_hook: 'reacting with shock and wonder as the morphing transition begins',
        general_notes: 'surreal dreamlike transformation for TikTok/Reels',
        camera_motion: 'Slow circular orbit around the morphing subject to emphasize depth',
        sound_effects: 'SFX: Ethereal magical chime and sparkling sound effect',
        dialogue: '',
      },
    },
    {
      name: 'Loop Infinito',
      emoji: '🔁',
      desc: 'Animação que volta perfeitamente ao ponto inicial.',
      fields: {
        characters_definition: [],
        visual_quality: '8k resolution, cinematic lighting, cozy aesthetic pastel tones',
        object_interaction:
          'the flying leaves and floating lanterns drift in a constant circular loop returning to their exact starting points',
        initial_hook:
          'gazing peacefully at the infinite looping patterns, winking once at the camera',
        general_notes: 'hypnotic loops, satisfying clean satisfying animation',
        camera_motion: 'Continuous smooth panning shot that seamlessly loops',
        sound_effects: 'SFX: Soft wind blowing through leaves and ambient cozy forest sounds',
        dialogue: '',
      },
    },
  ],
  'video-from-img-avatar': [
    {
      name: 'Avatar Falante',
      emoji: '🎙️',
      desc: 'Avatar digital falando com sincronização labial perfeita.',
      fields: {
        prompt_main:
          'Transform this image into a talking avatar video with perfect lip-sync in Brazilian Portuguese. Natural head movements, expressive micro-expressions, professional lighting maintained.',
        motion_direction:
          'Subtle head tilts and nods, natural breathing motion, occasional hand gestures',
      },
    },
    {
      name: 'Apresentação Corporativa',
      emoji: '💼',
      desc: 'Estilo profissional com movimentos compostos e confiáveis.',
      fields: {
        prompt_main:
          'Corporate presentation style video from this image. Professional, trustworthy demeanor. Clean studio lighting maintained. Subtle confident movements.',
        motion_direction:
          'Composed professional posture, subtle hand gestures, steady eye contact with camera',
      },
    },
  ],
};
