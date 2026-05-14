export const MODES = {
  'video-new': {
    id: 'video-new',
    title: 'Vídeo Novo (Veo)',
    desc: 'Gere vídeos cinematográficos a partir de descrições textuais.',
    helpText: 'Para obter os melhores resultados, seja específico sobre o movimento da câmera e a iluminação. Use termos como "cinematic", "slow motion" ou "handheld" para definir o ritmo e a emoção da cena.',
    formula: (vals) => `A professional, cinematic video sequence shot with ${vals.cinematography}. The focus is on ${vals.subject} as they are ${vals.action}. The setting is a detailed ${vals.context}, carefully composed to highlight the depth of the scene. The visual aesthetic is ${vals.style_ambiance}, rendered in high resolution with realistic textures and fluid motion.`,
    fields: [
      { id: 'cinematography', label: 'Cinematografia', hint: 'Ângulo e movimento da câmera', placeholder: 'Ex: Medium shot', type: 'text', suggestions: [{ label: 'Plano Aberto', value: 'Wide Shot' }, { label: 'Close-up', value: 'Close-up' }, { label: 'Visão em 1ª Pessoa', value: 'POV Shot' }, { label: 'Vista Aérea', value: 'Aerial View' }, { label: 'Câmera em Movimento', value: 'Tracking Shot' }, { label: 'Câmera na Mão', value: 'Handheld Camera' }, { label: 'Contra-mergulho', value: 'Low Angle' }, { label: 'Mergulho', value: 'High Angle' }, { label: 'Zoom Lento', value: 'Slow Zoom' }, { label: 'Órbita 360°', value: '360-degree Orbit' }, { label: 'Time-lapse', value: 'Time-lapse' }, { label: 'Câmera Lenta', value: 'Slow Motion' }, { label: 'Macro Extremo', value: 'Extreme Macro' }, { label: 'Plano Sequência', value: 'One-shot Sequence' }, { label: 'Foco Alternado', value: 'Rack Focus' }, { label: 'Plano Holandês', value: 'Dutch Angle' }] },
      { id: 'subject', label: 'Sujeito/Personagem', hint: 'Quem ou o que aparece na cena', placeholder: 'Ex: Um astronauta', type: 'text', suggestions: [{ label: 'Um robô', value: 'A robot' }, { label: 'Uma mulher', value: 'A woman' }, { label: 'Um dragão', value: 'A dragon' }, { label: 'Um samurai', value: 'A samurai' }, { label: 'Um astronauta', value: 'An astronaut' }, { label: 'Um mago', value: 'A wizard' }, { label: 'Uma fênix', value: 'A phoenix' }, { label: 'Um gato cibernético', value: 'A cybernetic cat' }, { label: 'Um carro voador', value: 'A flying car' }, { label: 'Uma criatura mística', value: 'A mystical creature' }, { label: 'Um ferreiro', value: 'A blacksmith' }, { label: 'Uma bailarina', value: 'A ballerina' }, { label: 'Um alienígena', value: 'An alien being' }, { label: 'Um navio pirata', value: 'A pirate ship' }, { label: 'Uma inteligência artificial', value: 'A digital AI avatar' }, { label: 'Um explorador', value: 'A brave explorer' }] },
      { id: 'action', label: 'Ação', hint: 'O que o sujeito está fazendo', placeholder: 'Ex: caminhando', type: 'text', suggestions: [{ label: 'correndo', value: 'running' }, { label: 'dançando', value: 'dancing' }, { label: 'flutuando', value: 'floating' }, { label: 'lutando', value: 'fighting' }, { label: 'explorando ruínas', value: 'exploring ruins' }, { label: 'meditando', value: 'meditating' }, { label: 'desaparecendo', value: 'fading away' }, { label: 'transformando-se', value: 'transforming' }, { label: 'explodindo em luz', value: 'exploding into light' }, { label: 'cozinhando', value: 'cooking with fire' }, { label: 'consertando algo', value: 'repairing a machine' }, { label: 'saltando dimensões', value: 'jumping through dimensions' }, { label: 'tocando um instrumento', value: 'playing a glowing instrument' }, { label: 'manipulando energia', value: 'manipulating raw energy' }, { label: 'derretendo', value: 'melting like liquid metal' }, { label: 'atravessando portais', value: 'walking through a portal' }] },
      { id: 'context', label: 'Contexto/Cenário', hint: 'Onde a cena se passa', placeholder: 'Ex: em uma floresta', type: 'text', suggestions: [{ label: 'em Marte', value: 'on Mars' }, { label: 'cidade cyberpunk', value: 'in a cyberpunk city' }, { label: 'embaixo d\'água', value: 'underwater' }, { label: 'floresta mágica', value: 'in a magical forest' }, { label: 'estação espacial', value: 'in a space station' }, { label: 'castelo medieval', value: 'in a medieval castle' }, { label: 'metrópole flutuante', value: 'in a floating metropolis' }, { label: 'laboratório secreto', value: 'in a secret lab' }, { label: 'dentro de um vulcão', value: 'inside a volcanic landscape' }, { label: 'biblioteca infinita', value: 'in an infinite library' }, { label: 'deserto de cristal', value: 'in a crystal desert' }, { label: 'ruas de Tóquio', value: 'on the streets of neon Tokyo' }, { label: 'jardim flutuante', value: 'in a hanging garden in the sky' }, { label: 'reino de engrenagens', value: 'inside a clockwork kingdom' }, { label: 'caverna de gelo', value: 'in a glowing ice cave' }, { label: 'templo antigo', value: 'in a forgotten ancient temple' }] },
      { id: 'style_ambiance', label: 'Estilo & Ambiance', hint: 'Iluminação, cores e clima', placeholder: 'Ex: Iluminação cinematográfica', type: 'textarea', suggestions: [{ label: 'Cinematográfico', value: 'Cinematic' }, { label: 'Atmosférico', value: 'Moody' }, { label: 'Neon Noir', value: 'Neon Noir' }, { label: 'Hora Dourada', value: 'Golden Hour' }, { label: 'Fantasia Sombria', value: 'Dark Fantasy' }, { label: 'Minimalista', value: 'Minimalist' }, { label: 'Retrô Anos 80', value: 'Retro 80s aesthetic' }, { label: 'Surrealista', value: 'Surrealist' }, { label: 'Épico e Grandioso', value: 'Epic and grand' }, { label: 'Cyberpunk Vibrante', value: 'Vibrant Cyberpunk' }, { label: 'Eterno e Etéreo', value: 'Ethereal and timeless' }, { label: 'Hiper-realista', value: 'Hyper-realistic' }, { label: 'Estilo Noir', value: 'Film Noir aesthetic' }, { label: 'Sonhador/Onírico', value: 'Dreamy and soft focus' }, { label: 'Industrial Sombrio', value: 'Gritty industrial' }, { label: 'Psicodélico', value: 'Psychedelic and colorful' }] }
    ]
  },
  'video-from-img': {
    id: 'video-from-img',
    title: 'Vídeo de Imagem (Veo)',
    desc: 'Dê vida a uma imagem estática com movimento e som.',
    helpText: 'Dê vida às suas fotos! Descreva o que deve se mover na cena e qual o tipo de movimento de câmera desejado. Dica: descrever sons (SFX) ajuda o modelo a criar uma atmosfera mais rica.',
    formula: (vals) => `Using the provided high-quality base image as a foundation, initiate a cinematic animation sequence where the camera performs a ${vals.motion_sound}. The central action within the frame focuses on ${vals.action}, ensuring smooth temporal consistency and rich audio-visual synchronization.`,
    fields: [
      { id: 'motion_sound', label: 'Movimento & Som', hint: 'Câmera e efeitos sonoros', placeholder: 'Ex: movimento de câmera', type: 'text', suggestions: [{ label: 'Panorâmica Lenta Direita', value: 'Slow Pan Right' }, { label: 'Dolly Zoom', value: 'Dolly Zoom' }, { label: 'Som de Trovão', value: 'SFX: Thunder cracks' }, { label: 'Zoom Suave', value: 'Smooth Zoom In' }, { label: 'Inclinação para Cima', value: 'Tilt Up' }, { label: 'Som de Chuva', value: 'SFX: Rain falling' }, { label: 'Vento Uivante', value: 'SFX: Wind howling' }, { label: 'Trilha Épica', value: 'SFX: Epic cinematic music' }, { label: 'Órbita Circular', value: 'Circular Orbit around subject' }, { label: 'Zoom Rápido', value: 'Fast Zoom Out' }, { label: 'Ruído Mecânico', value: 'SFX: Mechanical whirring' }, { label: 'Gritos de Multidão', value: 'SFX: Distant crowd cheering' }, { label: 'Bipe Digital', value: 'SFX: Electronic beeps' }, { label: 'Batida de Coração', value: 'SFX: Heartbeat thumping' }, { label: 'Som Espacial', value: 'SFX: Deep space ambience' }, { label: 'Vidro Quebrando', value: 'SFX: Shifting glass sounds' }] },
      { id: 'action', label: 'Ação Adicional', hint: 'O que deve se mover na imagem', placeholder: 'Ex: nuvens se movem', type: 'textarea', suggestions: [{ label: 'cabelo ao vento', value: 'hair blowing in the wind' }, { label: 'mudança de luz', value: 'cinematic lighting shift' }, { label: 'água escorrendo', value: 'water flowing' }, { label: 'nuvens passando', value: 'clouds passing' }, { label: 'olhos piscando', value: 'eyes blinking' }, { label: 'fumaça subindo', value: 'smoke rising' }, { label: 'neve caindo', value: 'snow falling' }, { label: 'fogo queimando', value: 'fire burning' }, { label: 'brilho de energia', value: 'glowing with energy' }, { label: 'dissolvendo em pixels', value: 'dissolving into digital pixels' }, { label: 'sombras se movendo', value: 'shadows stretching and moving' }, { label: 'flores desabrochando', value: 'flowers blooming quickly' }, { label: 'roupas balançando', value: 'clothing flowing in the breeze' }, { label: 'olhos mudando de cor', value: 'eyes shifting colors' }, { label: 'objetos flutuando', value: 'objects starting to levitate' }, { label: 'textura mudando', value: 'surface texture transforming' }] }
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
  }
};


