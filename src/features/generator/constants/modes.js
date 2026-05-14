export const MODES = {
  'video-new': {
    id: 'video-new',
    title: 'Vídeo Novo (Veo)',
    desc: 'Gere vídeos cinematográficos a partir de descrições textuais.',
    helpText: 'Para obter os melhores resultados, seja específico sobre o movimento da câmera e a iluminação. Use termos como "cinematic", "slow motion" ou "handheld" para definir o ritmo e a emoção da cena.',
    formula: (vals) => `A professional, cinematic video sequence shot with ${vals.cinematography}. The focus is on ${vals.subject} as they are ${vals.action}. The setting is a detailed ${vals.context}, carefully composed to highlight the depth of the scene. The visual aesthetic is ${vals.style_ambiance}, rendered in high resolution with realistic textures and fluid motion.`,
    fields: [
      { id: 'cinematography', label: 'Cinematografia', hint: 'Ângulo e movimento da câmera', placeholder: 'Ex: Medium shot', type: 'text', suggestions: ['Wide Shot', 'Close-up', 'POV Shot', 'Aerial View', 'Tracking Shot'] },
      { id: 'subject', label: 'Sujeito/Personagem', hint: 'Quem ou o que aparece na cena', placeholder: 'Ex: Um astronauta', type: 'text', suggestions: ['Um robô', 'Uma mulher', 'Um dragão'] },
      { id: 'action', label: 'Ação', hint: 'O que o sujeito está fazendo', placeholder: 'Ex: caminhando', type: 'text', suggestions: ['correndo', 'dançando', 'flutuando'] },
      { id: 'context', label: 'Contexto/Cenário', hint: 'Onde a cena se passa', placeholder: 'Ex: em uma floresta', type: 'text', suggestions: ['em Marte', 'cidade cyberpunk', 'embaixo d\'água'] },
      { id: 'style_ambiance', label: 'Estilo & Ambiance', hint: 'Iluminação, cores e clima', placeholder: 'Ex: Iluminação cinematográfica', type: 'textarea', suggestions: ['Cinematic', 'Moody', 'Neon Noir', 'Golden Hour'] }
    ]
  },
  'video-from-img': {
    id: 'video-from-img',
    title: 'Vídeo de Imagem (Veo)',
    desc: 'Dê vida a uma imagem estática com movimento e som.',
    helpText: 'Dê vida às suas fotos! Descreva o que deve se mover na cena e qual o tipo de movimento de câmera desejado. Dica: descrever sons (SFX) ajuda o modelo a criar uma atmosfera mais rica.',
    formula: (vals) => `Using the provided high-quality base image as a foundation, initiate a cinematic animation sequence where the camera performs a ${vals.motion_sound}. The central action within the frame focuses on ${vals.action}, ensuring smooth temporal consistency and rich audio-visual synchronization.`,
    fields: [
      { id: 'motion_sound', label: 'Movimento & Som', hint: 'Câmera e efeitos sonoros', placeholder: 'Ex: movimento de câmera', type: 'text', suggestions: ['Slow Pan Right', 'Dolly Zoom', 'SFX: Thunder cracks'] },
      { id: 'action', label: 'Ação Adicional', hint: 'O que deve se mover na imagem', placeholder: 'Ex: nuvens se movem', type: 'textarea', suggestions: ['hair blowing in the wind', 'cinematic lighting shift'] }
    ]
  },
  'photo-new': {
    id: 'photo-new',
    title: 'Foto Nova (Nano Banana)',
    desc: 'Gere imagens estáticas com riqueza de detalhes.',
    helpText: 'Crie imagens incríveis focando no sujeito e na composição. Experimente diferentes estilos artísticos, de realismo fotográfico a ilustrações conceituais, para encontrar o visual perfeito.',
    formula: (vals) => `A high-resolution, professional-grade photograph of ${vals.subject} who is ${vals.action}. The scene is situated in a breathtaking ${vals.context}. The composition is a masterfully executed ${vals.composition}, emphasizing visual balance. The overall artistic style is ${vals.style}, featuring intricate textures, precise lighting, and a premium aesthetic finish.`,
    fields: [
      { id: 'subject', label: 'Sujeito', hint: 'O elemento principal da imagem', placeholder: 'Ex: Cyberpunk Warrior', type: 'text', suggestions: ['Warrior', 'Forest Spirit', 'Vintage Car'] },
      { id: 'action', label: 'Ação', hint: 'O que está acontecendo', placeholder: 'Ex: posando', type: 'text', suggestions: ['staring at camera', 'dissolving into smoke'] },
      { id: 'context', label: 'Local', hint: 'Cenário da fotografia', placeholder: 'Ex: estúdio', type: 'text', suggestions: ['Abstract Space', 'Abandoned Cathedral'] },
      { id: 'composition', label: 'Composição', hint: 'Organização visual (ex: Macro)', placeholder: 'Ex: Close-up', type: 'text', suggestions: ['Macro Shot', 'Rule of Thirds', 'Symmetrical'] },
      { id: 'style', label: 'Estilo', hint: 'Visual artístico ou técnico', placeholder: 'Ex: Fotografia de revista', type: 'textarea', suggestions: ['Oil Painting', '3D Render', 'Pencil Sketch'] }
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
          '90s Anime style',
          '3D Pixar style',
          'Cyberpunk aesthetic',
          'Oil painting',
          'Pencil sketch',
          'Claymation',
          'Vaporwave',
          'Cinematic lighting',
          'Watercolor',
          'Origami art',
          'Low poly 3D',
          'Cartoon style',
          'Historical painting',
          'Futuristic sci-fi',
          'Gothic horror',
          'Art Deco',
          'Impressionism',
          'Surrealism',
          'Steampunk',
          'Post-apocalyptic',
          'Minimalist',
          'Vintage photo',
          'Street photography',
          'Portrait photography',
          'Landscape photography',
          'Fashion photography',
          'Editorial photography',
          'Fine art photography',
          'Conceptual photography',
          'Experimental photography',
          'Abstract photography',
          'Black and white',
          'Sepia tone',
          'High contrast',
          'Low contrast',
          'Soft lighting',
          'Hard lighting',
          'Dramatic lighting',
          'Natural lighting',
          'Studio lighting'
        ]
      },
      {
        id: 'new_scenario',
        label: 'Novo Cenário/Ação',
        hint: 'O que muda no fundo ou ação',
        placeholder: 'Ex: coloque na praia',
        type: 'textarea',
        suggestions: [
          'the same scenario and action as the original',
          'a futuristic neon city',
          'a snowy mountain landscape',
          'underwater kingdom',
          'a cozy library',
          'outer space background'
        ]
      }
    ]
  },
  'about': {
    id: 'about',
    title: 'Sobre a Ferramenta',
    desc: 'Entenda como esta ferramenta ajuda você a criar prompts melhores.',
    helpText: 'Esta ferramenta utiliza fórmulas estruturadas para os modelos Veo e Nano Banana, garantindo que seus prompts sejam profissionais e alcancem o máximo de qualidade técnica.',
    isAbout: true
  }
};


