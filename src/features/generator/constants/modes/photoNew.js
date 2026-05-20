import { 
  parseImageComposition, 
  parseImageStyle, 
  parseCharacters, 
  parseAmbiance,
  sanitizeValues
} from '../../utils/parsers';

export const photoNew = {
  id: 'photo-new',
  title: 'Foto Nova (Nano Banana)',
  desc: 'Gere imagens estáticas com riqueza de detalhes.',
  helpText: 'Crie imagens incríveis focando no sujeito e na composição. Experimente diferentes estilos artísticos, de realismo fotográfico a ilustrações conceituais, para encontrar o visual perfeito.',
  formula: (vals) => {
    const cleanVals = sanitizeValues(vals);
    const composition = parseImageComposition(cleanVals.composition);
    const styleInfo = parseImageStyle(cleanVals.style);
    const characters = parseCharacters(cleanVals.characters_definition);
    const envAmbiance = parseAmbiance(cleanVals.context, cleanVals.style);

    const processedCharacters = characters.map(char => ({
      name: char.name,
      description: char.description,
      visual_consistency_id: `char_seed_${char.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '')}_v31`,
      pose_or_expression: char.voice_attributes || "natural presentation"
    }));

    const jsonPrompt = {
      subject: {
        primary: {
          type: characters.length > 0 ? "character" : "environment",
          description: cleanVals.subject || "main focus scenery",
          action: cleanVals.action || "posing naturally",
          attributes: styleInfo.golden_tokens.slice(0, 3)
        },
        ...(processedCharacters.length > 0 ? { characters: processedCharacters } : {})
      },
      composition,
      environment: {
        context: cleanVals.context || "studio environment",
        ...envAmbiance
      },
      style_and_quality: styleInfo,
      negative_prompts: [
        "blurry", "low quality", "mutated details", "deformed limbs", 
        "extra fingers", "unstable anatomy", "flickering artifacts", "noisy text"
      ]
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
    { id: 'subject', label: 'Sujeito Principal', hint: 'O elemento principal da imagem', placeholder: 'Ex: Guerreiro Cyberpunk', type: 'text', suggestions: [{ label: 'Guerreiro Cyberpunk', value: 'Cyberpunk Warrior' }, { label: 'Espírito da Floresta', value: 'Forest Spirit' }, { label: 'Carro Vintage', value: 'Vintage Car' }, { label: 'Coruja Robótica', value: 'Robotic Owl' }, { label: 'Xamã Místico', value: 'Mystical Shaman' }, { label: 'Arranha-céu Futurista', value: 'Futuristic Skyscraper' }, { label: 'Água-viva Bioluminescente', value: 'Bioluminescent Jellyfish' }, { label: 'Gato Samurai', value: 'Samurai Cat' }, { label: 'Explorador Vitoriano', value: 'Victorian Explorer' }, { label: 'Botânico Alienígena', value: 'Alien Botanist' }, { label: 'Relojoeiro Steampunk', value: 'Steampunk Clockmaker' }, { label: 'Dragão Cósmico', value: 'Cosmic Dragon' }] },
    { id: 'action', label: 'Ação', hint: 'O que está acontecendo', placeholder: 'Ex: posando', type: 'text', suggestions: [{ label: 'olhando para a câmera', value: 'staring at camera' }, { label: 'dissolvendo em fumaça', value: 'dissolving into smoke' }, { label: 'levitando sobre um lago', value: 'levitating above a lake' }, { label: 'lançando feitiço', value: 'casting a glowing spell' }, { label: 'consertando um relógio', value: 'repairing a golden clock' }, { label: 'andando num mercado neon', value: 'wandering through a neon market' }, { label: 'tocando violino', value: 'playing a transparent violin' }, { label: 'mesclando com código', value: 'merging with digital code' }, { label: 'descansando em flores de vidro', value: 'resting in a field of glass flowers' }] },
    { id: 'context', label: 'Local', hint: 'Cenário da fotografia', placeholder: 'Ex: estúdio', type: 'text', suggestions: [{ label: 'Espaço Abstrato', value: 'Abstract Space' }, { label: 'Catedral Abandonada', value: 'Abandoned Cathedral' }, { label: 'Telhado Cyberpunk na chuva', value: 'Cyberpunk rooftop at rain' }, { label: 'Caverna Subaquática', value: 'Bioluminescent underwater cave' }, { label: 'Ilhas Flutuantes', value: 'Floating islands in the clouds' }, { label: 'Biblioteca de Luz', value: 'Library made of light' }, { label: 'Ruínas Antigas em Marte', value: 'Ancient ruins on a desert planet' }, { label: 'Laboratório Vitoriano', value: 'Victorian laboratory' }, { label: 'Sala de Espelhos', value: 'Enchanted mirror room' }] },
    { id: 'composition', label: 'Composição', hint: 'Organização visual (ex: Macro)', placeholder: 'Ex: Close-up', type: 'text', suggestions: [{ label: 'Foto Macro', value: 'Macro Shot' }, { label: 'Regra dos Terços', value: 'Rule of Thirds' }, { label: 'Simétrico', value: 'Symmetrical' }, { label: 'Vista de Pássaro', value: 'Bird\'s Eye View' }, { label: 'Vista de Formiga', value: 'Worm\'s Eye View' }, { label: 'Ângulo Holandês', value: 'Dutch Angle' }, { label: 'Close-up Extremo', value: 'Extreme Close-up' }, { label: 'Foto Selfie na Mão', value: 'Handheld Selfie Camera' }, { label: 'Silhueta na Lua', value: 'Silhouette against the moon' }, { label: 'Exposição Longa', value: 'Long exposure motion blur' }, { label: 'Plano Cinematográfico', value: 'Cinematic Wide Shot' }] },
    { id: 'style', label: 'Estilo', hint: 'Visual artístico ou técnico', placeholder: 'Ex: Fotografia de revista', type: 'textarea', suggestions: [{ label: 'Realista', value: 'Ultra-realistic photography, high detail, lifelike textures' }, { label: 'Fotográfico Profissional', value: 'Professional studio photography, 8k resolution, sharp focus' }, { label: 'Ultra Detalhado', value: 'Hyper-detailed, intricate textures, extreme realism' }, { label: 'Estilo Os Simpsons', value: 'The Simpsons cartoon style' }, { label: 'Estilo Disney', value: 'Disney animation style' }, { label: 'Rick and Morty', value: 'Rick and Morty style' }, { label: 'Hora de Aventura', value: 'Adventure Time style' }, { label: 'Estilo Futurama', value: 'Futurama art style' }, { label: 'Game of Thrones', value: 'Game of Thrones aesthetic' }, { label: 'Studio Ghibli', value: 'Studio Ghibli style' }, { label: 'Estilo Cyberpunk', value: 'Cyberpunk aesthetic' }, { label: 'South Park', value: 'South Park style' }, { label: 'Dragon Ball Z', value: 'Dragon Ball Z style' }, { label: 'Marvel Comics', value: 'Marvel Comics style' }, { label: 'Estilo GTA V', value: 'GTA V style' }, { label: 'National Geographic', value: 'National Geographic photography' }, { label: 'Filme Kodak Portra 400', value: 'Kodak Portra 400 film look' }, { label: 'Hiper-realista 8k', value: 'Hyper-realistic 8k octane render' }, { label: 'Estilo H.R. Giger', value: 'Biomechanical H.R. Giger style' }, { label: 'Arte Surrealista', value: 'Surrealist digital art' }, { label: 'Vaporwave', value: 'Vaporwave aesthetics' }, { label: 'Glitch Art', value: 'Glitch art' }, { label: 'Dupla Exposição', value: 'Double exposure' }, { label: 'Pintura a Óleo', value: 'Impressionist oil painting' }, { label: 'Luz Cinematográfica', value: 'Anamorphic lens flare' }, { label: 'Iluminação de Retrato', value: 'Studio portrait lighting' }, { label: 'Macro Detalhado', value: 'Macro photography details' }, { label: 'Pintura a Óleo', value: 'Oil Painting' }, { label: 'Render 3D', value: '3D Render' }, { label: 'Esboço a Lápis', value: 'Pencil Sketch' }] },
    {
      id: 'help_info',
      label: '🚀 Dicas de Criação de Imagens (Nano Banana 2)',
      type: 'info',
      content: `⚡ ENGENHARIA DE PROMPTS VIRAIS:
• SUJEITO & AÇÃO: Detalhe quem é o sujeito e o que ele está fazendo (ex: "Guerreiro Cyberpunk empunhando espada").
• COMPOSIÇÃO: Explore regras fotográficas clássicas como "Regra dos Terços", "Foto Macro", "Silhueta" ou "Vista Aérea".
• ESTILO VISUAL: Combine sugestões ricas (ex: "hyper-realistic photography", "Studio Ghibli style", "3D Pixar style") para obter resultados profissionais.
• CONSISTÊNCIA DE PERSONAGEM: Preencha a definição de personagem com o formato "[nome][descrição][pose]" para manter rostos idênticos em todas as fotos da sua série.

📝 GUIA RÁPIDO DOS CAMPOS:
• Local/Contexto: Detalhe o fundo da foto com iluminação para criar sombras e reflexos realistas.
• Surpreenda-me: Use o botão de varinha para preencher campos vazios aleatoriamente com ideias criativas de alta conversão.`
    }
  ]
};
