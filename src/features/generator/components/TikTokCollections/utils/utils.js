import {
  VIBE_PRESETS,
  TARGET_PRESETS,
  STYLE_PRESETS,
  HOOK_TEMPLATES,
  VIRAL_SCORE_CONFIG
} from '../constants/constants';

const STYLE_DNA_MAP = {
  normal:        'clean high-fidelity digital photograph. Sharp focus, balanced natural light, neutral exposure, natural colors, 50mm standard camera lens, true-to-life details',
  realista:      'professional studio portrait photography screenshot. Shot on medium format Hasselblad camera, 85mm f/1.8 lens. Sharp focus on subject with natural highly-detailed skin pores and texture, soft studio rim lighting. Cinematic shallow depth of field, subtle film grain, Kodak Portra 400 color science',
  natgeo:        'National Geographic documentary photography screenshot. Telephoto 200mm lens, tack-sharp environmental realism. Authentic raw textures, dusty atmospheric daylight, high visual fidelity, captured in the wild',
  macro:         'extreme macro close-up photograph. Shot with a 100mm f/2.8 macro lens, razor-thin depth of field. Hyper-detailed microscopic textures, dew drops, fine fiber details, illuminated by professional ring flash, extreme scale perspective',
  goldenhour:    'golden hour cinema screenshot. Warm backlit 3200K golden sunlight, dramatic horizontal shadows, dreamy diffuse sun flare, anamorphic lens flares. Fujifilm Pro 400H analog film stock aesthetic',
  polaroid:      'vintage Polaroid instant photograph. Pronounced film grain, faded washed-out analog colors, warm light leaks, nostalgic overexposed look with soft focus, authentic paper print margins',
  gopro:         'GoPro Hero action camera POV screenshot. Extreme wide-angle 12mm fisheye lens perspective, dramatic motion blur, high-dynamic range, intense dynamic action angle with natural lens dirt',
  motivacional:  'cinematic moody desaturated landscape screenshot. Wide 35mm lens, massive dark negative space optimized for text overlays, atmospheric mist, dramatic volumetric rim lighting, deep shadows',
  wesanderson:   'Wes Anderson symmetrical movie screenshot. Perfectly centered composition, 40mm flat lens framing. Stylized dollhouse miniature aesthetic, high-fidelity physical props. Soft retro pastel color palette (mustard yellow, dusty rose, mint green), vintage warm theatrical lighting',
  tarantino:     'Quentin Tarantino 70s grindhouse movie screenshot. Shot on 35mm Fujifilm Eterna cinema film stock, rich high-contrast colors, warm split-toning. Intense dramatic character expression, dynamic dutch angle framing, gritty film texture',
  nolan:         'IMAX 65mm anamorphic film screenshot in Christopher Nolan style. Ultra-wide grand architectural scale, cold clinical desaturated color science, sterile tense atmosphere. Kodak Vision3 250D, deep natural shadows, sharp hard lighting',
  kubrick:       'Stanley Kubrick symmetrical cinema screenshot. Perfect one-point perspective centered composition, 24mm rectilinear wide lens. Cold sterile atmospheric key lights, intense psychological tension, rich vintage textures',
  timburton:     'Tim Burton gothic dark fantasy movie screenshot. Whimsical characters with pale skin and large expressive dark eyes, hand-crafted claymation aesthetic. Highly-stylized twisted physical environments, high-contrast deep gothic shadows, moody dark ambiance',
  spielberg:     'Steven Spielberg 1980s adventure cinema screenshot. Nostalgic anamorphic golden lens flares, soft cinematic golden haze. Rich natural Kodachrome color science, awe-struck upward gazes, warm emotional atmosphere',
  villeneuve:    'Denis Villeneuve epic sci-fi movie screenshot. IMAX 65mm anamorphic scale, massive monolithic brutalist structures. Swirling atmospheric dust and sand particles, moody steel-grey and orange color grading, dramatic side key lighting',
  snyder:        'Zack Snyder ultra-dramatic action movie screenshot. Extreme high-contrast desaturated palette, metallic textures, intense volumetric rim lighting. Slow-motion freeze-frame feel, deep heavy charcoal shadows, epic dark fantasy tone',
  deltoro:       'Guillermo del Toro dark fantasy movie screenshot. Rich amber and deep teal color grading, gothic whimsical atmosphere. Intricate biological and physical brass clockwork mechanisms, soft glowing practical lights, organic textures',
  wachowski:     'Wachowski sisters cyberpunk action movie screenshot. Slick black leather, reflective dark vinyl, high-tech chrome gear. Signature matrix green tint grading, cascading glowing green digital code overlays, dynamic bullet-time slow-motion action pose',
  miller:        'George Miller Mad Max post-apocalyptic movie screenshot. Saturated orange sand dunes under a deep blue sky. Dusty customized scrap metal vehicles, chaotic high-speed motion blur, raw gritty post-apocalyptic punk aesthetic',
  kurosawa:      'Akira Kurosawa dynamic classic film screenshot. High-contrast black and white cinematography, rich film grain. Dramatic sweeping wind, heavy rain textures, epic samurai stance, deep emotional framing',
  pixar:         'Pixar RenderMan 3D animation screenshot. Vibrant saturated color palette, smooth ray-traced subsurface scattering skin shaders. Global illumination, extremely detailed physical textures, charming stylized character design',
  claymation:    'stop-motion claymation film screenshot. Hand-crafted plasticine clay models, detailed physical fingerprints, clay textures. Soft studio miniature lighting, charming retro animation feel',
  papercut:      '3D papercut illustration screenshot. Multi-layered colored paper sheets, deep realistic drop shadows, origami art craft details. Clean minimalist physical layers, soft shadow transitions',
  lowpoly:       'low-poly 3D render screenshot. Flat-shaded geometric polygon meshes, retro game console aesthetic. Soft ambient occlusion, clean solid matte colors, cute angular shapes',
  minecraft:     'Minecraft-inspired voxel 3D blocky art screenshot. Sharp pixelated block textures, volumetric sunlight shafts. Charming cubic layout, retro high-fidelity block world',
  davinci:       'Leonardo da Vinci classical Renaissance painting. Sfumato atmospheric shading, soft smooth contour transitions. Deep earthy pigments, chalky raw sketch underdrawings, weathered aged canvas texture',
  picasso:       'Pablo Picasso cubism painting. Fragmented geometric shapes, multi-angled deconstructed perspective planes, bold abstract lines. Muted blue and earthy sienna color palette',
  monet:         'Claude Monet French impressionism oil painting. Loose rapid delicate brushstrokes, vibrant natural sunlight reflections, glowing pastel textures. Dappled light, visible canvas texture',
  michelangelo:  'Michelangelo Sistine Chapel classical fresco. Heroic hyper-muscular human anatomy, dynamic expressive postures. Cracked weathered plaster wall textures, chalky pigments, historic Renaissance masterwork',
  munch:         'Edvard Munch expressionism painting. Agitated sweeping brushstrokes, blood-orange and dark teal swirling sky. Heavy existential anxiety atmosphere, dark emotional silhouettes',
  fridakahlo:    'Frida Kahlo naive folk surrealism painting. Vibrant Mexican cultural decorative motifs, lush tropical plant patterns, symbolic animals, warm passionate colors',
  klimt:         'Gustav Klimt symbolist painting. Intricate swirling decorative patterns, glittering gold leaf textures, mosaic tiles. Warm glowing amber and bronze tones, flat decorative figures',
  hokusai:       'Katsushika Hokusai Ukiyo-e woodblock print. Dynamic stylized ocean wave claws, bold black ink outlines, clean solid color pigments on aged handmade fibrous paper texture',
  warhol:        'Andy Warhol 1960s silkscreen pop art print. High-contrast flat neon acrylic paint, misaligned color offset printing artifacts, vibrant saturated repetitive silkscreen pattern',
  rembrandt:     'Rembrandt baroque oil painting. Masterful high-contrast chiaroscuro, deep mysterious shadows. Warm golden candle glow key light, detailed organic skin textures, dark earthy pigments',
  matisse:       'Henri Matisse fauvist cut-out paper collage. Bold abstract minimalist organic shapes, highly vibrant flat pure colors (pure red, electric blue, bright yellow), naive layout',
  vangogh:       'Vincent van Gogh oil painting. Thick textured impasto brushstrokes applied with a palette knife, swirling turbulent sky patterns. Vibrant complementary colors, coarse canvas texture',
  anime:         '90s sci-fi anime style screenshot. Cel animation style, hand-drawn look with distinct dark ink outlines, sharp shadows, and a slight film grain texture, vintage hand-painted background details',
  ghibli:        'Studio Ghibli aesthetic anime screenshot. Hand-painted watercolor background, lush green nature details, soft natural lighting. Dreamy nostalgic atmosphere, highly detailed classical animation',
  popart:        '1960s Roy Lichtenstein pop art comic book panel. Bold primary flat colors, heavy black outlines, retro half-tone dot patterns, dynamic action framing',
  pencilsketch:  'detailed academic graphite pencil sketch. Fine hand-drawn cross-hatching shading, raw charcoal lines on heavily textured aged cream paper, smudges, eraser marks',
  watercolor:    'fine art watercolor illustration. Translucent colorful paint bleeding, organic wet paint splashes, detailed wet brush paper texture, elegant bleeding gradients',
  artnouveau:    'Alphonse Mucha Art Nouveau illustration. Flowing organic long hair, ornate golden borders, elaborate floral vine motifs, flat warm gilded color palette',
  surrealismo:   'Salvador Dali surrealist painting. Melting clocks, distorted impossible physical objects in a vast desert landscape. Strange dream logic, warm soft golden atmosphere',
  cyberpunk2077: 'Cyberpunk 2077 videogame screenshot. Rain-slicked wet asphalt streets reflecting pink and cyan neon light blooms. Chromatic aberration, high-tech holographic ads, gritty details',
  cyber_gothic:  'cyber-gothic dark aesthetic screenshot. Dark matte leather, polished futuristic chrome, glowing UV neon makeup and cybernetic implants. High-contrast strobe rave lighting',
  synthwave:     'synthwave retro-future vector screenshot. Glowing wireframe perspective grid, colossal glowing geometric retro sun, neon pink palm silhouettes. 80s outrun vaporous vectors',
  retro30s:      '1930s rubberhose black and white cartoon screenshot. Monochrome vintage ink-and-paint illustration, film grain, scratches, hairs on lens, retro hand-crafted projector look',
  pixelart:      'detailed 16-bit retro pixel art screenshot. Limited CGA/EGA color palette, pixel-perfect clean grid lines, nostalgic classic game sprites',
  steampunk:     'steampunk Victorian industrial screenshot. Polished copper and physical brass clockwork gears, glowing bronze pressure gauges, steam pipes, warm sepia lighting',
  thermal:       'thermal infrared camera screenshot. Heat signature color map (blue cold to yellow warm to red hot), glowing thermal contours, scientific imaging aesthetic',
  holomap:       'translucent blue 3D holographic projection screenshot. Glowing digital matrix scanlines, floating wireframe data nodes, high-tech interface, glowing light blooms in dark rooms',
  chalk:         'hand-drawn blackboard chalk sketch. Colorful dusty chalk lines on highly textured black slate chalkboard, chalk dust smudges, raw handmade feel',
  blueprint:     'heliographic blueprint draft drawing. Clean white chalk technical draft lines on deep cyan blue engineering grid paper, hand-written technical notes',
};

const COLOR_DNA_MAP = {
  normal:            'natural lifelike color, balanced contrast and accurate exposure, true-to-life white balance',
  quente:            'golden sunset warmth, rich orange and red tones, soft warm ambient glow, elevated color temperature 3800K',
  goldenhour:        'warm amber 3200K key light, orange-gold specular highlights, long horizontal shadows, sun-flare glow accents',
  sunset_silhouettes:'fiery orange and magenta sky, subject in solid black silhouette, high contrast backlighting',
  frio:              'cool blue-hour 6500K tones, deep teal shadow values, crisp silver highlights, underexposed moody twilight atmosphere',
  ocean_deep:        'abyssal deep navy blue, marine teal midtones, bioluminescent cyan accent highlights, dark aquatic depth',
  arctic_glacier:    'frosty ice-white, freezing pale blue, deep grey underexposed shadows, subtle crystalline teal accents',
  cyberpunk:         'dominant neon magenta (#FF2D78) and electric cyan (#00F5FF), deeply underexposed dark shadows, wet reflective surface bloom',
  vaporwave:         'vibrant violet and hot pink pastels, hazy teal, dreamy retro sunset gradient, saturated diffuse glow',
  retro_arcade:      'pitch black background, glowing neon red and electric blue primary colors, radioactive yellow accent highlights',
  space_nebula:      'cosmic deep purple and pitch black, ultraviolet glow, deep magenta nebula dust, star field specks',
  toxic_waste:       'acid lime green, radioactive yellow, industrial pitch black, harsh charcoal grey',
  cyberpunk_glitch:  'saturated RGB split (red, green, blue) pixel artifacts, digital static noise, chromatic aberration color fringing',
  forest_moss:       'deep forest green, rich earthy brown, sage midtones, damp moss green, soft diffused woodland light',
  desert_sand:       'warm desert sand, terracotta, rich golden dust, dry high-contrast harsh shadows, arid atmospheric haze',
  earthy_terracotta: 'earthy clay, baked terracotta orange, olive green accents, warm copper metallic tones',
  mint_chocolate:    'cool mint green, deep rich chocolate brown, creamy white highlight accents',
  vintage_sepia:     'rich sepia tones, aged cream paper, dusty amber midtones, low saturation vintage brown, antique print feel',
  monocromático:     'high-contrast monochrome, deep rich blacks, bright pure whites, dramatic interplay of silver grain',
  steampunk_bronze:  'polished bronze metallic, heavy charcoal black, glowing amber-copper light accents',
  pastel:            'soft desaturated pastel palette (mint, blush pink, cream, lavender), clean airy +2 exposure, gentle luminous feel',
  cherry_blossom:    'soft sakura cherry blossom pink, crisp bright white, gentle rose petal accents, pale clear blue sky',
  candy_shop:        'cotton candy pink, sky blue, bubblegum brights, sugar yellow, high-key bright and cheerful',
  royal_luxury:      'rich imperial purple, deep royal blue, glistening metallic gold details, opulent high-contrast',
  royal_velvet:      'deep royal burgundy, dark velvet navy blue, elegant silver metallic accents, rich jewel tones',
  military_camo:     'olive drab green, khaki sand, military flat black, matte earthy military brown, desaturated natural tones',
  halloween_spooky:  'jack-o-lantern orange, pitch black, eerie purple, poisonous green glow, spooky high-contrast',
};

const VIBE_DNA_MAP = {
  normal:          'balanced natural atmospheric lighting, clean grounded composition, authentic mood',
  minimalista:     'clean minimalist framing, strong negative space, clear simple focal point',
  cômico:          'bright even high-key lighting, exaggerated expressions, vibrant saturation, playful dynamic framing',
  sarcástico:      'deadpan flat lighting, slightly overexposed ironic look, subtle absurdist environmental details',
  absurdo:         'surreal impossible environment, dreamlike irrational scale, flat Wes Anderson-like staging',
  revoltado:       'frustrated tight framing, harsh direct lighting, exaggerated subject expression, high saturation',
  drama:           'deep shadow chiaroscuro, single motivated dramatic key light, tense atmospheric haze, tight claustrophobic framing',
  sombrio_misterio:'heavy atmospheric fog, underexposed mysterious shadows, cool desaturated blue-green palette, tension-building framing',
  terror:          'harsh underlighting from below, sickly desaturated palette, thick fog and deep shadow, extreme close-up claustrophobic framing',
  investigativo:   'stark documentary lighting, neutral realistic color, precise clean journalistic framing, no artistic embellishment',
  cinematic:       'Hollywood trailer style, wide establishing epic framing, dynamic camera angle, intense dramatic score mood, lens flare accents',
  fofoca:          'intimate over-the-shoulder angle, shallow depth of field blurred background, warm indoor social lighting',
  lifestyle:       'natural window light, authentic candid feel, warm color temperature, organic lifestyle documentary framing',
  tutorial:        'clean flat overhead or straight-on angle, bright even illumination, clear subject isolation',
  desafio:         'high-energy dynamic angle, bright vibrant lighting, sense of action and movement',
  épico:           'heroic extreme low-angle framing, vast dramatic sky composition, subject with powerful confident stance, epic atmospheric depth of field',
  inspirador:      'vast open hopeful landscape, subject silhouette against bright horizon, upward gaze posture, warm soft rim light',
  nostálgico:      'warm soft-focus haze, faded analog color grading, late afternoon golden tones, nostalgic childhood intimacy',
  romântico:       'soft diffused warm light, shallow depth of field bokeh background, gentle intimate framing, warm golden pink tones',
  futurista:       'stark cold futuristic lighting, metallic blue-grey tones, precise geometric framing, high-tech sterile atmosphere',
  estético:        'harmonious visually balanced composition, clean airy palette, tranquil soft natural light, minimal distraction',
  premium:         'luxury editorial lighting, sophisticated dark background, subject with confident elegant posture, premium product photography feel',
  gamer:           'dynamic dramatic angle, strong neon RGB accent lighting, high-energy vibrant colors, esports broadcast energy',
  filosófico:      'vast cosmic scale, subject dwarfed by immense environment, contemplative quiet mood, existential atmospheric haze',
  festa:           'high-energy motion blur, vibrant saturated party lighting, dynamic celebratory framing, joyful chaotic energy',
};

const buildDNA = (styleId, colorId, vibeId) => {
  const styleDNA = STYLE_DNA_MAP[styleId] || STYLE_DNA_MAP['normal'];
  const colorDNA = COLOR_DNA_MAP[colorId] || COLOR_DNA_MAP['normal'];
  const vibeDNA  = VIBE_DNA_MAP[vibeId]   || VIBE_DNA_MAP['normal'];
  return { styleDNA, colorDNA, vibeDNA };
};

export const generateTikTokPrompt = ({
  theme,
  quantity,
  selectedStyle,
  selectedVibe,
  selectedColors,
  selectedTarget,
  notes,
  portugueseText
}) => {
  const vibeObj   = VIBE_PRESETS.find(v => v.id === selectedVibe);
  const targetObj = TARGET_PRESETS.find(t => t.id === selectedTarget);

  const themeText  = theme.trim() || '<<< Tema Principal do Post >>>';
  const vibeDesc   = vibeObj  ? `${vibeObj.label} — ${vibeObj.desc}`   : 'Narrativa equilibrada e natural';
  const targetDesc = targetObj ? `${targetObj.label} — ${targetObj.desc}` : 'Público geral';

  const { styleDNA, colorDNA, vibeDNA } = buildDNA(selectedStyle, selectedColors, selectedVibe);

  const ptBrRules = portugueseText
    ? `\n5. **Textos nas Imagens em PT-BR:** SOMENTE se a imagem gerada naturalmente contiver texto visível (placas, camisetas, cartazes, letreiros), você DEVE incluir no [Estilo] a instrução: "with any visible text written in Brazilian Portuguese". Se a imagem for puramente visual sem texto, OMITA essa instrução completamente.`
    : '';

  const notesSection = notes.trim()
    ? `- **Refinamentos Específicos do Criador:** ${notes.trim()}`
    : '';

  const narrativeGuide = quantity === 1
    ? 'A única imagem deve ser o clímax visual do tema, o momento mais impactante.'
    : quantity <= 3
    ? `Slide 1: introdução visual do tema | Slides intermediários: desenvolvimento | Slide ${quantity}: clímax/conclusão impactante.`
    : `Slide 1: introdução e estabelecimento do tema | Slides 2 a ${quantity - 1}: desenvolvimento e progressão narrativa (variando ângulos e situações dentro do mesmo universo visual) | Slide ${quantity}: clímax final impactante e memorável.`;

  return `Você é o **FlowPrompt Image Engine v2**, um Engenheiro de Prompts Sênior especializado no modelo de geração de imagens **Nano Banana 2** e em criação de conteúdo viral para **TikTok**.

Sua missão: criar um carrossel de post altamente viral para TikTok sobre o tema abaixo, entregando **exatamente** os itens estruturados a seguir, cada um em seu próprio bloco de código separado.

---

## 🧬 DNA VISUAL DA COLEÇÃO (Aplicar em TODOS os slides individualmente)

Este é o "DNA" visual que garante consistência estética sem que os slides se conheçam:

- **Estilo Técnico:** ${styleDNA}
- **Paleta & Cor:** ${colorDNA}
- **Atmosfera & Mood:** ${vibeDNA}
- **Formato Obrigatório:** vertical 9:16, otimizado para tela de celular

---

## 📋 BRIEFING DO POST

- **Tema da Coleção:** ${themeText}
- **Quantidade de Imagens:** ${quantity} slide${quantity > 1 ? 's' : ''} em sequência narrativa
- **Tom da Legenda/Narrativa:** ${vibeDesc}
- **Público-Alvo:** ${targetDesc}
${notesSection ? notesSection + '\n' : ''}
---

## 📐 ESTRUTURA NARRATIVA DOS SLIDES

${narrativeGuide}

---

## ✅ ITENS QUE VOCÊ DEVE ENTREGAR

### Item 1 — Título do Post (OBRIGATORIAMENTE dentro de um bloco de código \`\`\`text)
\`\`\`text
[Escreva AQUI o título do post de 1 linha em Português do Brasil, ultra-chamativo, que desperte curiosidade imediata, sem nenhum texto fora deste bloco]
\`\`\`

### Item 2 — Legenda do Post (OBRIGATORIAMENTE dentro de um bloco de código \`\`\`text)
\`\`\`text
[Escreva AQUI o texto da legenda curto e envolvente em Português do Brasil + exatamente 5 hashtags relevantes no final, sem nenhum texto fora deste bloco]
\`\`\`

### Items 3 a ${quantity + 2} — Prompts das Imagens (um bloco \`\`\`prompt por slide)

Para cada um dos ${quantity} slides, gere um prompt de imagem em **inglês** altamente detalhado, escrito obrigatoriamente em **texto corrido e fluido (parágrafo único contínuo, SEM colchetes ou tags estruturais como '[Assunto]' ou '[Estilo]')**, estruturado internamente usando a **Fórmula de Engenharia de Prompt Estruturada (Especificidade Técnica e Contextualização)**:

1. **Âncora de Mídia e Época (Início Obrigatório):** Inicie o prompt IMEDIATAMENTE com o tipo de mídia e época do DNA Visual para definir a "lente" e o formato (ex: "${styleDNA.split(',')[0]}"). O uso de termos de mídia como "screenshot" ou "photo" no início força a proporção cinematográfica e o acabamento de um frame real, evitando arte conceitual genérica.
2. **Fidelidade do Sujeito e Ação Dinâmica:** Descreva o sujeito principal com riqueza de detalhes inconfundíveis (roupas icônicas, acessórios, traços físicos marcantes, expressões intensas) em uma pose dramática, dinâmica ou postura que expresse claramente a ação.
3. **Física da Mídia Tradicional (Acabamento Realista/Analógico):** Rejeite a perfeição digital computacional adicionando termos técnicos que simulam imperfeições da mídia física tradicional (ex: cel animation, linhas de contorno em nanquim, granulado de película de cinema, lens flares anamórficos, bokeh, etc.).
4. **Efeitos Visuais e Atmosfera Física Descritiva:** Adicione elementos táteis e efeitos atmosféricos físicos tangíveis que traduzam o clima para uma linguagem que a IA de imagem entende (ex: distorção de ar bullet-time, partículas de poeira suspensa, névoa volumétrica, luz difusa).
5. **Restrição Cromática Atmosférica (Fim do Prompt):** Termine o prompt limitando rigidamente a paleta de cores para amarrar toda a atmosfera visual com o tom do post (ex: "Palette dominated by deep blacks, dark grays, and the glowing digital green"). Adicione a especificação de estilo técnico embutida de forma fluida: "${styleDNA}, ${colorDNA}, ${vibeDNA}, in vertical 9:16 format".

> **CRÍTICO PARA FIDELIDADE DE MARCA/PERSONAGEM:** Se o tema do post for baseado em uma série, filme, desenho ou personagem famoso (ex: "Chaves", "Harry Potter", etc.), você **DEVE citar explicitamente o nome da obra ou referências culturais icônicas diretamente no prompt** (ex: "inspired by the classic Mexican sitcom El Chavo del Ocho", "featuring the iconic neighborhood courtyard with the wooden barrel from Chaves") para que a IA de imagem reconheça o contexto cultural e gere as características corretas. Nunca use apenas descrições vagas se o usuário pediu um tema de IP conhecido.

**Exemplo de saída esperada (parágrafo fluido e contínuo, sem tags estruturais):**
\`\`\`prompt
1970s vintage cinema screenshot of a lone determined warrior standing tall on the edge of a rocky desert plateau, wearing weathered bronze armor with subtle golden engravings. He is gazing forward with fierce and calm determination, cape dramatically flowing in the wind and fists clenched at his sides. Overlooking a vast arid canyon at dawn, with dramatic red rock formations stretching to the horizon, sparse dry vegetation, and golden dust particles floating in the air. Captured in an extreme low-angle heroic shot, with the subject centered and framed against the sky for maximum impact. Gritty analog film style, professional cinematography with rich film grain texture, shallow depth of field, and slight lens flare. Palette dominated by warm terracotta, golden sand tones, and deep charcoal shadows, in vertical 9:16 format.
\`\`\`

---

## ⚠️ REGRAS CRÍTICAS (Não viole nenhuma)

1. **Autossuficiência Total:** Cada prompt de imagem deve funcionar de forma COMPLETAMENTE INDEPENDENTE — sem qualquer referência a "o slide anterior", "o mesmo personagem do slide X" ou "continuar de". A consistência visual é garantida pelo DNA Visual que você injeta em cada slide.
2. **Fórmula Fluida Obrigatória:** Todos os prompts de imagem DEVEM seguir as 5 etapas da fórmula na ordem especificada, mas devem ser estruturados como um **parágrafo de texto corrido e natural, sem nenhum colchete ou tag estrutural literal** (ou seja, NUNCA inclua as palavras "[Assunto]", "[Ação]" ou "[Estilo]" no prompt final).
3. **Inglês nos Prompts de Imagem:** Os prompts das imagens (blocos \`\`\`prompt) DEVEM ser escritos em inglês.
4. **Sem texto fora de blocos de código (CRÍTICO):** Para garantir que o usuário copie cada item facilmente com um clique, você **NÃO DEVE escrever texto livre fora dos blocos de código**. Absolutamente **TODOS** os itens (Título, Legenda e os Prompts de cada slide) **DEVEM vir encapsulados em seus respectivos blocos de código individuais (usando \`\`\`text para o Título e a Legenda, e \`\`\`prompt para os prompts de imagem)**. Não coloque saudações, introduções ou explicações fora dos blocos. Entregue diretamente os ${quantity + 2} blocos solicitados.${ptBrRules}`;
};

export const generateHooks = (theme) => {
  if (!theme || !theme.trim()) return [];
  const trimmed = theme.trim();

  return HOOK_TEMPLATES.map(group => {
    const hooks = group.templates
      .filter(t => t.includes('{theme}'))
      .map(t => t.replace(/\{theme\}/g, trimmed));

    const shuffled = [...hooks].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);

    return {
      category: group.category,
      emoji: group.emoji,
      hooks: selected
    };
  }).filter(g => g.hooks.length > 0);
};

export const calculateViralScore = ({ theme, quantity, selectedStyle, selectedVibe, selectedTarget, portugueseText, notes }) => {
  const { weights, optimalQuantity, highRiskQuantity, synergyPairs } = VIRAL_SCORE_CONFIG;
  let score = 0;
  const breakdown = [];

  let coherenceScore;
  const matchedPairs = synergyPairs.filter(p =>
    p.style === selectedStyle && p.vibe === selectedVibe && p.target === selectedTarget
  );
  if (matchedPairs.length > 0) {
    const maxBonus = Math.max(...matchedPairs.map(p => p.bonus));
    coherenceScore = Math.min(weights.styleVibeTargetCoherence, 15 + maxBonus);
    breakdown.push({ factor: '✨ Sinergia Estilo + Vibe + Target', score: coherenceScore, max: weights.styleVibeTargetCoherence, detail: matchedPairs[0].label });
  } else {
    const styleObj = STYLE_PRESETS.find(s => s.id === selectedStyle);
    const vibeObj = VIBE_PRESETS.find(v => v.id === selectedVibe);
    const targetObj = TARGET_PRESETS.find(t => t.id === selectedTarget);
    const sameCategory = styleObj?.category === vibeObj?.category || vibeObj?.category === targetObj?.category;
    coherenceScore = sameCategory ? 18 : 10;
    breakdown.push({ factor: '🎨 Coerência entre seleções', score: coherenceScore, max: weights.styleVibeTargetCoherence, detail: sameCategory ? 'Categorias alinhadas' : 'Categorias mistas' });
  }

  score += coherenceScore;

  let qtyScore;
  if (quantity === optimalQuantity.ideal) {
    qtyScore = weights.quantityOptimization;
    breakdown.push({ factor: '📐 Quantidade de slides', score: qtyScore, max: weights.quantityOptimization, detail: `${quantity} slides — número ideal para retenção` });
  } else if (quantity >= optimalQuantity.min && quantity <= optimalQuantity.max) {
    qtyScore = 14;
    breakdown.push({ factor: '📐 Quantidade de slides', score: qtyScore, max: weights.quantityOptimization, detail: `${quantity} slides na faixa recomendada (${optimalQuantity.min}-${optimalQuantity.max})` });
  } else if (quantity >= highRiskQuantity.min && quantity <= highRiskQuantity.max) {
    qtyScore = 6;
    breakdown.push({ factor: '📐 Quantidade de slides', score: qtyScore, max: weights.quantityOptimization, detail: `${quantity} slide(s) — poucas imagens, menor retenção` });
  } else {
    qtyScore = 8;
    breakdown.push({ factor: '📐 Quantidade de slides', score: qtyScore, max: weights.quantityOptimization, detail: `${quantity} slides — acima de 7 pode cansar` });
  }

  score += qtyScore;

  let themeScore = 0;
  if (theme && theme.trim()) {
    themeScore += 10;
    const wordCount = theme.trim().split(/\s+/).length;
    if (wordCount >= 4) themeScore += 8;
    else if (wordCount >= 2) themeScore += 4;
    if (notes && notes.trim()) themeScore += 7;
  }
  breakdown.push({ factor: '📝 Completude do tema', score: themeScore, max: weights.themeCompleteness, detail: theme?.trim() ? (notes?.trim() ? 'Tema + observações preenchidas' : 'Tema preenchido') : 'Tema não preenchido' });

  score += themeScore;

  let trendScore = 7;
  breakdown.push({ factor: '📡 Alinhamento com tendências', score: trendScore, max: weights.trendAlignment, detail: 'Use o Trends Radar para temas em alta' });

  score += trendScore;

  let ptScore = portugueseText ? weights.portugueseToggle : 3;
  breakdown.push({ factor: '🇧🇷 Texto em português', score: ptScore, max: weights.portugueseToggle, detail: portugueseText ? 'PT-BR ativado — maior alcance nacional' : 'PT-BR desativado' });

  score += ptScore;

  let feedback;
  let label;
  if (score >= 85) {
    label = '🚀 Potencial Viral Altíssimo';
    feedback = 'Configuração quase perfeita! Este combo tem altíssimo potencial de viralização. Publique sem medo.';
  } else if (score >= 70) {
    label = '🔥 Alto Potencial Viral';
    feedback = 'Boa configuração! Ajuste os pontos de melhoria para maximizar o alcance.';
  } else if (score >= 50) {
    label = '📈 Potencial Moderado';
    feedback = 'Configuração razoável. Reveja as sugestões de melhoria para aumentar o impacto.';
  } else {
    label = '🔧 Precisa de Ajustes';
    feedback = 'A configuração atual tem baixo potencial viral. Preencha o tema e ajuste as seleções.';
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    label,
    feedback,
    breakdown
  };
};