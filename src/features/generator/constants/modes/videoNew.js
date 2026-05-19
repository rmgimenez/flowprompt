import { 
  parseCamera, 
  parseDialogue, 
  parseCharacters, 
  enrichCharacters, 
  parseAmbiance, 
  VIDEO_NEGATIVE_PROMPTS 
} from '../../utils/parsers';

export const videoNew = {
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
      scene_summary: vals.scene_summary || "A compelling cinematic moment designed for TikTok engagement.",
      cinematography: {
        style_aesthetic: "Always cinematic, photorealistic, professional film look, high detail",
        camera_instructions: vals.cinematography || "Cinematic eye-level shot emphasizing the subject",
        composition_framing: "Professional framing that emphasizes the subject clearly in the center",
        ...camera
      },
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
        color_palette: vals.style_ambiance && !vals.style_ambiance.includes('<<<')
          ? `Cohesive cinematic tones aligned with ${vals.style_ambiance}`
          : "Natural, lifelike color representation, balanced contrast",
        time_of_day: envAmbiance.time_of_day,
        lighting_and_mood: {
          ...envAmbiance.lighting,
          mood: `Realistic cinematic lighting matching a ${envAmbiance.atmosphere.mood || 'neutral'} mood`
        },
        atmosphere: envAmbiance.atmosphere
      },
      motion: {
        temporal_logic: "continuous",
        physics: "realistic",
        speed_ramp: "constant"
      },
      audio: {
        sound_effects: dialogue.length > 0 ? "ASMR and matching sound effects for dialogue" : "SFX: Ambient sounds fitting the scene, no subtitles",
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
      label: 'Resumo da Cena (Momento Cinematográfico)',
      hint: 'Descreva a cena em uma frase clara para roteirização',
      placeholder: 'Ex: Um astronauta caindo em um portal de neon na chuva',
      type: 'text',
      suggestions: [
        { label: 'Exemplo Comédia', value: 'Um astronauta trapalhão escorrega e cai de costas em um portal de neon psicodélico e colorido.' }
      ]
    },
    { 
      id: 'characters_definition', 
      label: 'Criação dos Personagens', 
      hint: 'Crie personagens estruturados com opções rápidas de montagem', 
      type: 'characters-table',
      suggestions: [
        { 
          label: 'Exemplo Egito (Vlog)', 
          value: [
            { name: 'worker', appearance: 'charismatic young Egyptian worker, sun-tanned skin', clothing: 'historically inspired simple white linen kilt', motion: 'high_energy_expressive', voice: 'energetic comedic TikTok vlog voice' },
            { name: 'guard', appearance: 'serious pharaoh guard in background, striped nemes headdress', clothing: 'ornate traditional guard armor', motion: 'composed_natural', voice: 'deep angry authority voice' }
          ]
        },
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
    { id: 'cinematography', label: 'Cinematografia & Câmera', hint: 'Ângulo e movimento da câmera', placeholder: 'Ex: Medium shot', type: 'text', suggestions: [{ label: 'Plano Aberto', value: 'Wide Shot' }, { label: 'Close-up', value: 'Close-up' }, { label: 'Visão em 1ª Pessoa', value: 'POV Shot' }, { label: 'Vista Aérea', value: 'Aerial View' }, { label: 'Câmera em Movimento', value: 'Tracking Shot' }, { label: 'Câmera na Mão', value: 'Handheld Camera' }, { label: 'Câmera Selfie na Mão', value: 'Handheld Selfie Camera' }, { label: 'Contra-mergulho', value: 'Low Angle' }, { label: 'Mergulho', value: 'High Angle' }, { label: 'Zoom Lento', value: 'Slow Zoom' }, { label: 'Órbita 360°', value: '360-degree Orbit' }, { label: 'Time-lapse', value: 'Time-lapse' }, { label: 'Câmera Lenta', value: 'Slow Motion' }, { label: 'Macro Extremo', value: 'Extreme Macro' }, { label: 'Plano Sequência', value: 'One-shot Sequence' }, { label: 'Foco Alternado', value: 'Rack Focus' }, { label: 'Plano Holandês', value: 'Dutch Angle' }] },
    { id: 'subject', label: 'Sujeito Principal (Detalhes Físicos e Roupas)', hint: 'Quem ou o que aparece na cena', placeholder: 'Ex: Um astronauta', type: 'text', suggestions: [{ label: 'Um robô', value: 'A robot' }, { label: 'Uma mulher', value: 'A woman' }, { label: 'Um dragão', value: 'A dragon' }, { label: 'Um samurai', value: 'A samurai' }, { label: 'Um astronauta', value: 'An astronaut' }, { label: 'Um mago', value: 'A wizard' }, { label: 'Uma fênix', value: 'A phoenix' }, { label: 'Um gato cibernético', value: 'A cybernetic cat' }, { label: 'Um carro voador', value: 'A flying car' }, { label: 'Uma criatura mística', value: 'A mystical creature' }, { label: 'Um ferreiro', value: 'A blacksmith' }, { label: 'Uma bailarina', value: 'A ballerina' }, { label: 'Um alienígena', value: 'An alien being' }, { label: 'Um navio pirata', value: 'A pirate ship' }, { label: 'Uma inteligência artificial', value: 'A digital AI avatar' }, { label: 'Um explorador', value: 'A brave explorer' }] },
    { id: 'action', label: 'Ação & Movimento Realista', hint: 'O que o sujeito está fazendo', placeholder: 'Ex: caminhando', type: 'text', suggestions: [{ label: 'correndo', value: 'running' }, { label: 'dançando', value: 'dancing' }, { label: 'flutuando', value: 'floating' }, { label: 'lutando', value: 'fighting' }, { label: 'explorando ruínas', value: 'exploring ruins' }, { label: 'meditando', value: 'meditating' }, { label: 'desaparecendo', value: 'fading away' }, { label: 'transformando-se', value: 'transforming' }, { label: 'explodindo em luz', value: 'exploding into light' }, { label: 'cozinhando', value: 'cooking with fire' }, { label: 'consertando algo', value: 'repairing a machine' }, { label: 'saltando dimensões', value: 'jumping through dimensions' }, { label: 'tocando um instrumento', value: 'playing a glowing instrument' }, { label: 'manipulando energy', value: 'manipulating raw energy' }, { label: 'derretendo', value: 'melting like liquid metal' }, { label: 'atravessando portais', value: 'walking through a portal' }] },
    { id: 'context', label: 'Cenário & Fundo (Ambiente Expandido)', hint: 'Onde a cena se passa', placeholder: 'Ex: em uma floresta', type: 'text', suggestions: [{ label: 'em Marte', value: 'on Mars' }, { label: 'cidade cyberpunk', value: 'in a cyberpunk city' }, { label: 'embaixo d\'água', value: 'underwater' }, { label: 'floresta mágica', value: 'in a magical forest' }, { label: 'estação espacial', value: 'in a space station' }, { label: 'castelo medieval', value: 'in a medieval castle' }, { label: 'metrópole flutuante', value: 'in a floating metropolis' }, { label: 'laboratório secreto', value: 'in a secret lab' }, { label: 'dentro de um vulcão', value: 'inside a volcanic landscape' }, { label: 'biblioteca infinita', value: 'in an infinite library' }, { label: 'deserte de cristal', value: 'in a crystal desert' }, { label: 'ruas de Tóquio', value: 'on the streets of neon Tokyo' }, { label: 'jardim flutuante', value: 'in a hanging garden in the sky' }, { label: 'reino de engrenagens', value: 'inside a clockwork kingdom' }, { label: 'caverna de gelo', value: 'in a glowing ice cave' }, { label: 'templo antigo', value: 'in a forgotten ancient temple' }] },
    { id: 'style_ambiance', label: 'Estilo, Cores & Iluminação', hint: 'Iluminação, cores e clima', placeholder: 'Ex: Iluminação cinematográfica', type: 'textarea', suggestions: [{ label: 'Cinematográfico', value: 'Cinematic' }, { label: 'Atmosférico', value: 'Moody' }, { label: 'Neon Noir', value: 'Neon Noir' }, { label: 'Hora Dourada', value: 'Golden Hour' }, { label: 'Fantasia Sombria', value: 'Dark Fantasy' }, { label: 'Minimalista', value: 'Minimalist' }, { label: 'Retrô Anos 80', value: 'Retro 80s aesthetic' }, { label: 'Surrealista', value: 'Surrealist' }, { label: 'Épico e Grandioso', value: 'Epic and grand' }, { label: 'Cyberpunk Vibrante', value: 'Vibrant Cyberpunk' }, { label: 'Eterno e Etéreo', value: 'Ethereal and timeless' }, { label: 'Hiper-realista', value: 'Hyper-realistic' }, { label: 'Estilo Noir', value: 'Film Noir aesthetic' }, { label: 'Sonhador/Onírico', value: 'Dreamy and soft focus' }, { label: 'Industrial Sombrio', value: 'Gritty industrial' }, { label: 'Psicodélico', value: 'Psychedelic and colorful' }] },
    { 
      id: 'dialogue', 
      label: 'Falas dos Personagens (Dublagem)', 
      hint: 'Use o formato [personagem] (emoção): [fala]', 
      placeholder: 'Ex: [morango] (feliz): [oi, eu sou a morango!]', 
      type: 'textarea', 
      suggestions: [
        { 
          label: 'TikTok Viral (Vlog/Meme)', 
          value: '[worker] (excited): [Fala galera! Mais um dia aqui levantando a pirâmide do faraó! Olha o tamanho disso, meu parceiro!]\n[guard] (angry): [Volte ao trabalho agora!]\n[worker] (sarcastic): [Os caras falaram que fica pronto em só vinte anos... confia.]' 
        },
        { label: 'Diálogo Expressivo', value: '[morango] (feliz): [olá abacaxi, você viu o sol hoje?!]\n[abacaxi] (calmo): [sim morango, ele está radiante e quente!]\n[uva] (sarcástica): [radiante? está um forno isso aqui!]' },
        { label: 'Comédia Rápida', value: '[morango] (rindo): [hahaha abacaxi, você parece uma coroa!]\n[abacaxi] (irritado): [ei morango, respeite minha realeza vegetal!]' },
        { label: 'Sem Fala', value: '' }
      ] 
    },
    {
      id: 'help_info',
      label: '🚀 Guia de Criação de Prompts (Vídeo Novo)',
      type: 'info',
      content: `🎬 DIREÇÃO CINEMATOGRÁFICA (11 REGRAS):
• RESUMO DA CENA: Explique o momento principal em uma única frase simples para roteirização clara.
• CRIADOR DE PERSONAGENS: Use a tabela compacta para definir nome, corpo, roupa, estilo de voz e movimento com o máximo de fidelidade visual.
• ILUMINAÇÃO & CORES: Adicione tons e estilos de iluminação coerentes (ex: "Golden hour", "Neon cyberpunk") para criar uma atmosfera premium.
• DUBLAGEM & ATUAÇÃO: Digite as falas no formato "[personagem] (emoção): [fala]" (ex: [worker] (excited): [Fala galera!]). Use gírias e português coloquial para obter a dublagem viral enérgica e cômica do TikTok!
• Campos Vazios: O sistema insere valores padrão inteligentes para garantir que seu vídeo nunca fique estático.`
    }
  ]
};
