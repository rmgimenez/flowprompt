export const MODES = {
  'video-new': {
    id: 'video-new',
    title: 'Vídeo Novo (Veo)',
    desc: 'Gere vídeos cinematográficos a partir de descrições textuais.',
    formula: (vals) => `A professional, cinematic video sequence shot with ${vals.cinematography}. The focus is on ${vals.subject} as they are ${vals.action}. The setting is a detailed ${vals.context}, carefully composed to highlight the depth of the scene. The visual aesthetic is ${vals.style_ambiance}, rendered in high resolution with realistic textures and fluid motion.`,
    fields: [
      { id: 'cinematography', label: 'Cinematografia', placeholder: 'Ex: Medium shot', type: 'text', suggestions: ['Wide Shot', 'Close-up', 'POV Shot', 'Aerial View', 'Tracking Shot'] },
      { id: 'subject', label: 'Sujeito/Personagem', placeholder: 'Ex: Um astronauta', type: 'text', suggestions: ['Um robô', 'Uma mulher', 'Um dragão'] },
      { id: 'action', label: 'Ação', placeholder: 'Ex: caminhando', type: 'text', suggestions: ['correndo', 'dançando', 'flutuando'] },
      { id: 'context', label: 'Contexto/Cenário', placeholder: 'Ex: em uma floresta', type: 'text', suggestions: ['em Marte', 'cidade cyberpunk', 'embaixo d\'água'] },
      { id: 'style_ambiance', label: 'Estilo & Ambiance', placeholder: 'Ex: Iluminação cinematográfica', type: 'textarea', suggestions: ['Cinematic', 'Moody', 'Neon Noir', 'Golden Hour'] }
    ]
  },
  'video-from-img': {
    id: 'video-from-img',
    title: 'Vídeo de Imagem (Veo)',
    desc: 'Dê vida a uma imagem estática com movimento e som.',
    formula: (vals) => `Using the provided high-quality base image as a foundation, initiate a cinematic animation sequence where the camera performs a ${vals.motion_sound}. The central action within the frame focuses on ${vals.action}, ensuring smooth temporal consistency and rich audio-visual synchronization.`,
    fields: [
      { id: 'motion_sound', label: 'Movimento & Som', placeholder: 'Ex: movimento de câmera', type: 'text', suggestions: ['Slow Pan Right', 'Dolly Zoom', 'SFX: Thunder cracks'] },
      { id: 'action', label: 'Ação Adicional', placeholder: 'Ex: nuvens se movem', type: 'textarea', suggestions: ['hair blowing in the wind', 'cinematic lighting shift'] }
    ]
  },
  'photo-new': {
    id: 'photo-new',
    title: 'Foto Nova (Nano Banana)',
    desc: 'Gere imagens estáticas com riqueza de detalhes.',
    formula: (vals) => `A high-resolution, professional-grade photograph of ${vals.subject} who is ${vals.action}. The scene is situated in a breathtaking ${vals.context}. The composition is a masterfully executed ${vals.composition}, emphasizing visual balance. The overall artistic style is ${vals.style}, featuring intricate textures, precise lighting, and a premium aesthetic finish.`,
    fields: [
      { id: 'subject', label: 'Sujeito', placeholder: 'Ex: Cyberpunk Warrior', type: 'text', suggestions: ['Warrior', 'Forest Spirit', 'Vintage Car'] },
      { id: 'action', label: 'Ação', placeholder: 'Ex: posando', type: 'text', suggestions: ['staring at camera', 'dissolving into smoke'] },
      { id: 'context', label: 'Local', placeholder: 'Ex: estúdio', type: 'text', suggestions: ['Abstract Space', 'Abandoned Cathedral'] },
      { id: 'composition', label: 'Composição', placeholder: 'Ex: Close-up', type: 'text', suggestions: ['Macro Shot', 'Rule of Thirds', 'Symmetrical'] },
      { id: 'style', label: 'Estilo', placeholder: 'Ex: Fotografia de revista', type: 'textarea', suggestions: ['Oil Painting', '3D Render', 'Pencil Sketch'] }
    ]
  },
  'photo-transform': {
    id: 'photo-transform',
    title: 'Transformar Foto (Nano Banana)',
    desc: 'Aplique novos estilos ou modifique cenas.',
    formula: (vals) => `Taking the provided source image as the structural reference, ${vals.relationship}. The transformation should result in ${vals.new_scenario}, preserving the core subject's identity while completely reimagining the aesthetic and atmosphere in a high-fidelity manner.`,
    fields: [
      { id: 'relationship', label: 'Transformação/Estilo', placeholder: 'Ex: transforme em anime', type: 'text', suggestions: ['90s Anime style', 'funny caricature', '3D Pixar style'] },
      { id: 'new_scenario', label: 'Novo Cenário/Ação', placeholder: 'Ex: coloque na praia', type: 'textarea', suggestions: ['funny beach scene', 'lava world', 'add a pet dragon'] }
    ]
  },
  'about': {
    id: 'about',
    title: 'Sobre a Ferramenta',
    desc: 'Entenda como esta ferramenta ajuda você a criar prompts melhores.',
    isAbout: true
  }
};
