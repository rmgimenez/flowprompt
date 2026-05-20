import { 
  parseImageStyle, 
  parseAmbiance,
  sanitizeValues
} from '../../utils/parsers';

export const photoTransform = {
  id: 'photo-transform',
  title: 'Transformar Foto (Nano Banana)',
  desc: 'Aplique novos estilos ou modifique cenas.',
  helpText: 'Mude o estilo ou o cenário de uma foto existente de forma criativa. Mantenha a essência do sujeito principal enquanto descreve as mudanças radicais de ambiente ou estética.',
  formula: (vals) => {
    const cleanVals = sanitizeValues(vals);
    const styleInfo = parseImageStyle(cleanVals.relationship);
    const envAmbiance = parseAmbiance(cleanVals.new_scenario, cleanVals.relationship);

    const jsonPrompt = {
      transformation: {
        reference_mode: "structural_composition_fidelity",
        relationship_to_source: cleanVals.relationship || "reimagine aesthetic and atmosphere",
        target_scenario: cleanVals.new_scenario || "same scenery with new style"
      },
      environment: {
        context: cleanVals.new_scenario || "reimagined context",
        ...envAmbiance
      },
      style_and_quality: styleInfo,
      negative_prompts: [
        "blurry", "low quality", "deformed features", "artifacts", "unstable structural lines"
      ]
    };

    return JSON.stringify(jsonPrompt, null, 2);
  },
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
    },
    {
      id: 'help_info',
      label: '🚀 Guia de Transformação de Imagens',
      type: 'info',
      content: `🔄 TRANSFORMAÇÃO INTELIGENTE:
• TRANSFORMAÇÃO/ESTILO: Mude completamente o estilo visual da sua foto mantendo as linhas estruturais (ex: transforme uma foto real em desenho dos Simpsons, estilo Disney 3D, ou anime).
• NOVO CENÁRIO/AÇÃO: Mude radicalmente o fundo sem alterar o seu personagem original (ex: coloque uma pessoa que estava no quarto em uma praia futurista, estação espacial ou montanha de neve).
• COMPATIBILIDADE DE TRAÇOS: A IA preserva as linhas e poses principais da imagem original enquanto aplica o novo preenchimento estético de forma integrada.

📝 DICA DE RESTAURAÇÃO:
• Use os prompts rápidos ou selecione "Foto Vintage" para colorir, recuperar detalhes e aumentar a nitidez de fotografias antigas ou danificadas.`
    }
  ]
};
