import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { 
  Sparkles, Folders, Copy, Check, RotateCcw, Shuffle, Info, 
  HelpCircle
} from 'lucide-react';
import styles from './TikTokCollections.module.css';

// Estilos de Alta Conversão (Nano Banana 2 Formulas - Total de 56 estilos)
const STYLE_PRESETS = [
  { 
    id: 'normal', 
    category: 'Fotografia & Realismo',
    emoji: '✨',
    label: 'Estilo Padrão (Sem Filtro)', 
    desc: 'Sem direcionamento de estilo artistic específico. Foco em realismo e alta fidelidade natural.', 
    formula: 'A clean, natural high-fidelity photographic style, clear representation, focus on realism, vertical 9:16.'
  },
  { 
    id: 'realista', 
    category: 'Fotografia & Realismo',
    emoji: '📸',
    label: 'Foto Realista 8k', 
    desc: 'Fotografia profissional de estúdio de altíssimo nível.', 
    formula: 'Professional studio portrait photography, 8k resolution, sharp focus, natural highly detailed skin textures, cinematic lighting, Kodachrome film look, shallow depth of field, professional grade.'
  },
  { 
    id: 'natgeo', 
    category: 'Fotografia & Realismo',
    emoji: '🌍',
    label: 'Documentário NatGeo', 
    desc: 'Fotografia documental de natureza crua e realismo geográfico impecável.', 
    formula: 'National Geographic documentary photography, raw natural lighting, tack-sharp realism, professional telephoto lens composition, authentic environmental textures, vertical 9:16.'
  },
  { 
    id: 'macro', 
    category: 'Fotografia & Realismo',
    emoji: '🔍',
    label: 'Macro Lente Extrema', 
    desc: 'Foco hiper-detalhado em texturas microscópicas com fundo totalmente desfocado.', 
    formula: 'Extreme macro photography, hyper-detailed texture patterns (water droplets, skin scales, fiber weaves), razor-thin depth of field, giant scale perspective, professional studio lighting, vertical 9:16.'
  },
  { 
    id: 'goldenhour', 
    category: 'Fotografia & Realismo',
    emoji: '🌇',
    label: 'Golden Hour / Pôr do Sol', 
    desc: 'Luz dourada difusa com contra-luz suave e reflexos solares cinematográficos.', 
    formula: 'Stunning golden hour photography, warm glowing sun flare backlighting, long dramatic shadows, soft ambient orange and gold light, dreamy cinematic atmosphere, vertical 9:16.'
  },
  { 
    id: 'polaroid', 
    category: 'Fotografia & Realismo',
    emoji: '📼',
    label: 'Polaroid Vintage', 
    desc: 'Visual analógico nostálgico com cores levemente desbotadas e brilho vintage.', 
    formula: 'Vintage Polaroid snapshot photo style, faded washed-out analog colors, warm light leaks, nostalgic film grain, authentic retro atmosphere, vertical 9:16.'
  },
  { 
    id: 'gopro', 
    category: 'Fotografia & Realismo',
    emoji: '🏎️',
    label: 'GoPro Action POV', 
    desc: 'Perspectiva em primeira pessoa com lente fisheye ultra-angular e ação dinâmica.', 
    formula: 'GoPro action camera POV shot, extreme wide-angle fisheye lens perspective, dramatic motion blur, high action adrenaline-fueled camera angle, vertical 9:16.'
  },
  { 
    id: 'motivacional', 
    category: 'Fotografia & Realismo',
    emoji: '🌅',
    label: 'Motivacional Moody', 
    desc: 'Fundo perfeito e desfocado para sobrepor textos inspiradores.', 
    formula: 'Cinematic vast moody landscape, shallow depth of field with blurred foreground/background, optimized with a large clean empty negative space in the center, prepared for text overlay. Mood: noir_melancholy, atmospheric lighting, vertical 9:16. Mandatory negative prompts: text, typography, letters.'
  },

  // Cinema (Diretores Famosos)
  { 
    id: 'wesanderson', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '📐',
    label: 'Wes Anderson', 
    desc: 'Simetria impecável e cores pastéis marcantes.', 
    formula: 'Wes Anderson movie style, perfectly symmetrical composition, centered subject, pastel color palette (soft pink, mustard yellow, pale blue, mint green), vintage retro aesthetic, flat cinematic lighting, vertical 9:16.'
  },
  { 
    id: 'tarantino', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🎬',
    label: 'Cinematográfico Tarantino', 
    desc: 'Cores quentes e saturadas com ângulos de câmera dramáticos e atitude de filme clássico.', 
    formula: 'Gritty 70s cinema style inspired by Quentin Tarantino, rich warm saturated color palette, high contrast dramatic lighting, intense character expression, vintage movie frame look, vertical 9:16.'
  },
  { 
    id: 'nolan', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🚀',
    label: 'IMAX Christopher Nolan', 
    desc: 'Cores frias, tom realista estéril e escalas monumentais.', 
    formula: 'Epic IMAX cinematic style, cold clinical color grading, grand architectural scale, dramatic natural lighting, sterile sci-fi thriller atmosphere, vertical 9:16.'
  },
  { 
    id: 'kubrick', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '👁️',
    label: 'Simetria Stanley Kubrick', 
    desc: 'Composição perfeitamente centralizada com perspectiva de um ponto de fuga.', 
    formula: 'Stanley Kubrick signature style, perfect one-point perspective, perfectly symmetrical composition, intense centered subject gaze, cold sterile atmospheric lighting, vertical 9:16.'
  },
  { 
    id: 'timburton', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🦇',
    label: 'Gótico Tim Burton', 
    desc: 'Personagens magros e caricatos com olheiras profundas em ambientes misteriosos.', 
    formula: 'Tim Burton gothic art style, pale whimsical character with large dark expressive eyes, high contrast shadows, twisted trees, gloomy spiral backdrops, surreal claymation feel, vertical 9:16.'
  },
  { 
    id: 'spielberg', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🦕',
    label: 'Steven Spielberg', 
    desc: 'Aventura nostálgica dos anos 80, lens flare dourado e atmosfera mágica.', 
    formula: 'Classic 1980s adventure family-friendly cinematic style inspired by Steven Spielberg, warm nostalgic anamorphic lens flare, soft golden haze lighting, awe-struck expressive subjects looking slightly upwards, rich natural high-fidelity colors, vertical 9:16.'
  },
  { 
    id: 'villeneuve', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🪐',
    label: 'Denis Villeneuve', 
    desc: 'Ficção científica brutalista monumental, escala épica, poeira e luz lateral dramática.', 
    formula: 'Epic brutalist sci-fi architecture inspired by Denis Villeneuve, massive monolithic structures, atmospheric dust and sand swirling, moody cinematic warm orange and steel-grey color grading, dramatic scale, cinematic side key lighting, vertical 9:16.'
  },
  { 
    id: 'snyder', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🛡️',
    label: 'Zack Snyder', 
    desc: 'Ação heroica ultra-dramática, alto contraste, dessaturação e forte luz de contorno.', 
    formula: 'Ultra-dramatic dark action cinematic style inspired by Zack Snyder, high-contrast desaturated color palette, intense gritty textures, volumetric rim lighting, epic slow-motion freeze-frame feel, deep heavy shadows, premium comic book action aesthetic, vertical 9:16.'
  },
  { 
    id: 'deltoro', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '👹',
    label: 'Guillermo del Toro', 
    desc: 'Fantasia sombria poética, detalhes biológicos/mecânicos e paleta âmbar/teal.', 
    formula: 'Dark fantasy fairytale aesthetic inspired by Guillermo del Toro, biological and vintage mechanical details, amber and rich teal color palette, gothic whimsical atmosphere, cinematic soft glowing light, mysterious organic creature elements, vertical 9:16.'
  },
  { 
    id: 'wachowski', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🕶️',
    label: 'Irmãs Wachowski', 
    desc: 'Ação cyberpunk Matrix, tonalidade verde marcante e poses em câmera lenta.', 
    formula: 'Futuristic cyberpunk action style inspired by the Wachowski sisters, signature green matrix tint color grading, raining digital code accents, slick black leather and high-tech chrome gear, dramatic slow-motion action pose, epic cyber aesthetic, vertical 9:16.'
  },
  { 
    id: 'miller', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🔥',
    label: 'George Miller', 
    desc: 'Pós-apocalíptico caótico e desértico, cores saturadas e energia extrema de Mad Max.', 
    formula: 'High-octane post-apocalyptic desert wasteland style inspired by George Miller, hyper-saturated orange sand and deep blue sky, dusty retrofitted survival vehicles, dramatic chaotic energy, extreme high-speed motion feel, raw post-apocalyptic punk aesthetic, vertical 9:16.'
  },
  { 
    id: 'kurosawa', 
    category: 'Cinema (Diretores Famosos)',
    emoji: '🌧️',
    label: 'Akira Kurosawa', 
    desc: 'Cinema samurai clássico, preto e branco dinâmico sob vento e chuva forte.', 
    formula: 'Legendary Japanese cinematic master style inspired by Akira Kurosawa, dynamic high-contrast black and white photography, dramatic blowing wind and heavy rain textures, epic samurai stance, deep emotion, composition of weather elements, vertical 9:16.'
  },

  // Animação & 3D
  { 
    id: 'pixar', 
    category: 'Animação & 3D',
    emoji: '🧸',
    label: 'Pixar 3D Cute', 
    desc: 'Estilo de animação 3D fofo e carismático.', 
    formula: 'A hyper-adorable character, Pixar 3D animation style, big expressive eyes, sub-surface scattering, vibrant colors, ray tracing, highly detailed, vertical 9:16. Bold stylized 3D bubble typography showing "[THEME_PT]" integrated at the bottom.'
  },
  { 
    id: 'claymation', 
    category: 'Animação & 3D',
    emoji: '🦖',
    label: 'Massinha Claymation/Stop-Motion', 
    desc: 'Visual de animação stop-motion com texturas reais de massinha e marcas de dedo.', 
    formula: 'Stop-motion claymation style, hand-crafted plasticine clay textures with subtle fingerprint details, studio lighting, highly adorable miniature models, vertical 9:16.'
  },
  { 
    id: 'papercut', 
    category: 'Animação & 3D',
    emoji: '📄',
    label: 'Origami / Papel Recortado', 
    desc: 'Camadas tridimensionais de papel colorido recortado com sombras suaves.', 
    formula: 'Intricate 3D papercut illustration style, layered colored paper sheets creating deep drop shadows, origami art elements, clean minimalist craft design, vertical 9:16.'
  },
  { 
    id: 'lowpoly', 
    category: 'Animação & 3D',
    emoji: '🧊',
    label: 'Low Poly Retro 3D', 
    desc: 'Modelos 3D geométricos feitos de poucos polígonos com cores sólidas e retrô.', 
    formula: 'Minimalist low-poly 3D render style, flat-shaded geometric polygon meshes, cute clean shapes, soft warm ambient lighting, retro game console aesthetic, vertical 9:16.'
  },
  { 
    id: 'minecraft', 
    category: 'Animação & 3D',
    emoji: '🧱',
    label: 'Minecraft Voxel 3D', 
    desc: 'Construção em blocos tridimensionais voxelizados com luzes suaves.', 
    formula: 'Minecraft-inspired voxel 3D blocky art style, pixelated textures, soft volumetric lighting, cute cubic character design, high-fidelity block world aesthetic, vertical 9:16.'
  },

  // Arte & Pintura Clássica
  {
    id: 'davinci',
    category: 'Arte & Pintura Clássica',
    emoji: '📜',
    label: 'Leonardo da Vinci',
    desc: 'Esfuminho renascentista clássico, tons terrosos e traços anatômicos detalhados.',
    formula: 'Classical Renaissance painting inspired by Leonardo da Vinci, masterfully executed sfumato shading, soft atmospheric contours, rich earthy pigments, detailed ink-and-wash anatomical sketch elements, vertical 9:16.'
  },
  {
    id: 'picasso',
    category: 'Arte & Pintura Clássica',
    emoji: '🧩',
    label: 'Cubismo Pablo Picasso',
    desc: 'Figuras geométricas abstratas, múltiplas perspectivas e formas desconstruídas.',
    formula: 'Analytical Cubism masterpiece inspired by Pablo Picasso, fragmented geometric shapes, multiple simultaneous perspective planes, deconstructed portrait composition, muted earthy and blue color palette, vertical 9:16.'
  },
  {
    id: 'monet',
    category: 'Arte & Pintura Clássica',
    emoji: '🪷',
    label: 'Impressionismo Claude Monet',
    desc: 'Pinceladas rápidas e suaves com luz natural vibrante e foco em paisagens aquáticas.',
    formula: 'French Impressionism painting style inspired by Claude Monet, soft delicate brushstrokes, vibrant play of outdoor sunlight, glowing pastel textures, dappled light reflection, vertical 9:16.'
  },
  {
    id: 'michelangelo',
    category: 'Arte & Pintura Clássica',
    emoji: '🏛️',
    label: 'Afresco Michelangelo',
    desc: 'Figuras humanas esculturais, musculosas e expressivas com textura de afresco de parede.',
    formula: 'Sistine Chapel fresco painting style inspired by Michelangelo, heroic hyper-muscular human anatomy, dynamic expressive poses, chalky weathered plaster wall texture, classical Renaissance masterwork, vertical 9:16.'
  },
  {
    id: 'munch',
    category: 'Arte & Pintura Clássica',
    emoji: '😱',
    label: 'Expressionismo Edvard Munch',
    desc: 'O Grito. Linhas ondulantes, cores dramáticas e forte carga emocional.',
    formula: 'Expressionist painting style inspired by Edvard Munch (The Scream), swirling wavy brushstrokes, intense dramatic blood-orange and dark teal sky, heavy emotional anxiety tone, stark black silhouettes, vertical 9:16.'
  },
  {
    id: 'fridakahlo',
    category: 'Arte & Pintura Clássica',
    emoji: '🌺',
    label: 'Surrealismo Frida Kahlo',
    desc: 'Arte folclórica mexicana, autorretratos com natureza exuberante e simbolismo profundo.',
    formula: 'Naïve folk surrealist art style inspired by Frida Kahlo, vibrant Mexican cultural motifs, lush exotic tropical plants, symbolic animals (monkeys, birds), rich warm decorative colors, vertical 9:16.'
  },
  {
    id: 'klimt',
    category: 'Arte & Pintura Clássica',
    emoji: '🌟',
    label: 'Simbolismo Gustav Klimt',
    desc: 'O Beijo. Padrões ornamentais intrincados, folhas de ouro brilhantes e mosaicos decorativos.',
    formula: 'Symbolist golden art style inspired by Gustav Klimt (The Kiss), intricate swirling decorative patterns, glittering gold leaf overlays, mosaic textures, warm amber and bronze tones, vertical 9:16.'
  },
  {
    id: 'hokusai',
    category: 'Arte & Pintura Clássica',
    emoji: '🌊',
    label: 'Xilogravura Katsushika Hokusai',
    desc: 'Gravuras em madeira de estilo Ukiyo-e clássico com ondas dramáticas e contornos fortes.',
    formula: 'Classical Japanese Ukiyo-e woodblock print style inspired by Katsushika Hokusai, dynamic stylized ocean wave patterns, bold black ink outlines, clean solid color fills on aged block print paper texture, vertical 9:16.'
  },
  {
    id: 'warhol',
    category: 'Arte & Pintura Clássica',
    emoji: '🥫',
    label: 'Pop Art Andy Warhol',
    desc: 'Serigrafia colorida repetitiva em cores neon saturadas e alto contraste.',
    formula: '1960s silkscreen pop art portrait style inspired by Andy Warhol, high-contrast flat neon screen-print textures, vibrant saturated colors, offset printing misalignment artifacts, vertical 9:16.'
  },
  {
    id: 'rembrandt',
    category: 'Arte & Pintura Clássica',
    emoji: '🕯️',
    label: 'Chiaroscuro Rembrandt',
    desc: 'Contraste dramático de luz e sombra (chiaroscuro) com tons dourados ricos e intimistas.',
    formula: 'Baroque chiaroscuro portrait painting inspired by Rembrandt, dramatic deep shadow contrast, rich golden candlelight glow illuminating face, highly detailed organic skin textures, dark earthy backdrops, vertical 9:16.'
  },
  {
    id: 'matisse',
    category: 'Arte & Pintura Clássica',
    emoji: '✂️',
    label: 'Fauvismo Henri Matisse',
    desc: 'Cores puras e selvagens com recortes de papel minimalistas e expressivos.',
    formula: 'Fauvist cut-out paper art style inspired by Henri Matisse, bold abstract minimalist organic shapes, highly vibrant flat pure colors, expressive naive composition, vertical 9:16.'
  },
  { 
    id: 'vangogh', 
    category: 'Arte & Pintura Clássica',
    emoji: '🌻',
    label: 'Óleo Impressionista', 
    desc: 'Pintura texturizada com pinceladas grossas e redemoinhos de tinta a óleo à la Van Gogh.', 
    formula: 'Post-impressionist oil painting style inspired by Vincent van Gogh, thick textured impasto brushstrokes, swirly sky details, vibrant complementary colors, vertical 9:16.'
  },

  // Ilustração & Quadrinhos
  { 
    id: 'anime', 
    category: 'Ilustração & Quadrinhos',
    emoji: '🎨',
    label: 'Anime Anos 90', 
    desc: 'Aparência nostálgica de desenhos clássicos pintados à mão.', 
    formula: 'Nostalgic 90s anime illustration, hand-drawn aesthetic, cel-shaded animation style, lush hand-painted background texture, vintage soft color grading, Ghibli style visual cues.'
  },
  { 
    id: 'ghibli', 
    category: 'Ilustração & Quadrinhos',
    emoji: '🌳',
    label: 'Anime Ghibli', 
    desc: 'Aquarela pintada à mão, natureza verdejante e atmosfera nostálgica.', 
    formula: 'Studio Ghibli aesthetic, hand-painted lush watercolor background, soft natural lighting, nostalgic warm mood, highly detailed anime illustration, vertical 9:16.'
  },
  { 
    id: 'popart', 
    category: 'Ilustração & Quadrinhos',
    emoji: '💥',
    label: 'Pop Art Comics', 
    desc: 'Cores chapadas primárias com contornos fortes e retículas estilo quadrinho antigo.', 
    formula: '1960s Pop Art style, Roy Lichtenstein inspired, bold primary colors, heavy black outlines, retro comic book halftone dot pattern, dramatic dialogue panel feel, vertical 9:16.'
  },
  { 
    id: 'pencilsketch', 
    category: 'Ilustração & Quadrinhos',
    emoji: '✏️',
    label: 'Desenho a Lápis de Grafite', 
    desc: 'Rascunho feito à mão com sombreamento cruzado clássico e traços brutos.', 
    formula: 'Detailed graphite pencil sketch, hand-drawn cross-hatching shading, raw charcoal pencil lines on aged cream sketch paper, high contrast textured drawing, vertical 9:16.'
  },
  { 
    id: 'watercolor', 
    category: 'Ilustração & Quadrinhos',
    emoji: '🖌️',
    label: 'Aquarela Artística', 
    desc: 'Bordas de tinta fluida e manchas transparentes de aquarela com textura de papel.', 
    formula: 'Artistic watercolor illustration, bleeding translucent colorful paint margins, organic paint splashes, elegant wet brush texture on rough textured paper backdrop, vertical 9:16.'
  },
  { 
    id: 'artnouveau', 
    category: 'Ilustração & Quadrinhos',
    emoji: '⚜️',
    label: 'Art Nouveau Elegante', 
    desc: 'Linhas curvas e contornos florais orgânicos inspirados em Alphonse Mucha.', 
    formula: 'Elegant Art Nouveau illustration style inspired by Alphonse Mucha, ornate golden borders, flowing long organic hair and floral vine motifs, flat warm colors, vertical 9:16.'
  },
  { 
    id: 'surrealismo', 
    category: 'Ilustração & Quadrinhos',
    emoji: '⏳',
    label: 'Surrealismo de Sonho', 
    desc: 'Mundos oníricos com objetos derretendo e física distorcida.', 
    formula: 'Surrealist dreamscape art style inspired by Salvador Dali, melting clocks and floating surreal structures, desert canvas background, strange dream logic, warm soft golden lighting, vertical 9:16.'
  },

  // Efeitos & Retro-Future
  { 
    id: 'cyberpunk2077', 
    category: 'Efeitos & Retro-Future',
    emoji: '🏙️',
    label: 'Cyberpunk Neon', 
    desc: 'Metrópole futurista com luzes neon intensas e sombras cibernéticas.', 
    formula: 'Cyberpunk 2077 aesthetic, wet rain-slicked futuristic city streets reflecting pink and cyan neon lights, glowing holographic advertisements, high tech low life, vertical 9:16.'
  },
  { 
    id: 'cyber_gothic', 
    category: 'Efeitos & Retro-Future',
    emoji: '🖤',
    label: 'Cyber-Gótico Neon', 
    desc: 'Roupas escuras cibernéticas combinadas com detalhes e maquiagens em neon brilhante.', 
    formula: 'Cyber-gothic aesthetic, dark leather and futuristic chrome cyberwear, glowing neon hair and makeup, high-contrast gothic rave lighting, deep shadows, vertical 9:16.'
  },
  { 
    id: 'synthwave', 
    category: 'Efeitos & Retro-Future',
    emoji: '🌴',
    label: 'Synthwave / Retro-Future', 
    desc: 'Grade 3D no horizonte, sol roxo gigante e palmeiras neon dos anos 80.', 
    formula: 'Synthwave outrun aesthetic, glowing wireframe grid horizon, giant retro sun graphic, neon pink palm tree silhouettes, 80s futuristic vector lines, vertical 9:16.'
  },
  { 
    id: 'retro30s', 
    category: 'Efeitos & Retro-Future',
    emoji: '🎞️',
    label: 'Cartoon Clássico Anos 30', 
    desc: 'Estilo desenho antigo com animação rubberhose e granulado de película.', 
    formula: '1930s rubberhose cartoon style, Cuphead aesthetic, monochrome black and white, vintage film grain and scratches, high contrast ink-and-paint illustration, vertical 9:16.'
  },
  { 
    id: 'pixelart', 
    category: 'Efeitos & Retro-Future',
    emoji: '👾',
    label: 'Retro 16-Bit Pixel Art', 
    desc: 'Estilo videogame nostálgico com pixels detalhados e cores saturadas.', 
    formula: 'Detailed 16-bit pixel art style, vibrant limited color palette, clean grid sprites, nostalgic retro game aesthetic, vertical 9:16.'
  },
  { 
    id: 'steampunk', 
    category: 'Efeitos & Retro-Future',
    emoji: '⚙️',
    label: 'Steampunk Vitoriano', 
    desc: 'Máquinas de cobre, engrenagens douradas e fumaça em atmosfera vitoriana.', 
    formula: 'Steampunk industrial aesthetic, Victorian copper and brass clockwork gears, glowing bronze pressure meters, steam vents, sepia atmospheric lighting, vertical 9:16.'
  },
  { 
    id: 'thermal', 
    category: 'Efeitos & Retro-Future',
    emoji: '🌡️',
    label: 'Câmera Térmica / Infravermelho', 
    desc: 'Cores de assinatura de calor, do azul frio ao amarelo e vermelho incandescente.', 
    formula: 'Thermal imaging camera filter style, infrared heat signature map, glowing hot red and orange zones, warm yellow contours, deep cold blue and purple background shadows, vertical 9:16.'
  },
  { 
    id: 'holomap', 
    category: 'Efeitos & Retro-Future',
    emoji: '🌐',
    label: 'Projeção Holográfica 3D', 
    desc: 'Grade de feixes azuis translúcidos, scanlines e pontos de dados flutuantes.', 
    formula: 'Translucent blue glowing 3D holographic projection, digital matrix scanlines, floating glowing wireframes and data nodes, high-tech interface design, vertical 9:16.'
  },
  { 
    id: 'chalk', 
    category: 'Efeitos & Retro-Future',
    emoji: '🖍️',
    label: 'Lousa de Giz Escolar', 
    desc: 'Desenho feito a giz colorido em quadro negro clássico com textura apagada.', 
    formula: 'Chalkboard drawings style, colorful dusty chalk sketches on a textured black slate chalkboard, chalk dust smudges, raw hand-crafted artistic blackboard feel, vertical 9:16.'
  },
  { 
    id: 'blueprint', 
    category: 'Efeitos & Retro-Future',
    emoji: '🗺️',
    label: 'Cópia Heliográfica / Blueprint', 
    desc: 'Desenhos técnicos de engenharia em azul com linhas de giz e notas de projeto.', 
    formula: 'Architectural blueprint style, technical white chalk draft lines on deep cyan blueprint grid paper, handwritten engineering notes and measurements, vertical 9:16.'
  }
];

// Total de 26 vibes
const VIBE_PRESETS = [
  // Geral & Equilibrado
  { id: 'normal', category: 'Geral & Equilibrado', label: 'Neutro / Natural (Padrão)', desc: 'Narrativa equilibrada e direta, sem exageros dramáticos.' },
  { id: 'minimalista', category: 'Geral & Equilibrado', label: 'Direto / Sem Rodeios', desc: 'Linguagem direta, simples e focada na mensagem central.' },

  // Humor & Engajamento
  { id: 'cômico', category: 'Humor & Engajamento', label: 'Humorístico / Cômico', desc: 'Engraçado, inusitado e descontraído.' },
  { id: 'sarcástico', category: 'Humor & Engajamento', label: 'Sarcástico e Irônico', desc: 'Humor ácido, respostas afiadas e identificação rápida.' },
  { id: 'absurdo', category: 'Humor & Engajamento', label: 'Humor Nonsense / Surreal', desc: 'Totalmente sem sentido, focado no humor absurdo.' },
  { id: 'revoltado', category: 'Humor & Engajamento', label: 'Indignado / Crítico', desc: 'Divertida indignação com problemas irritantes do dia a dia.' },

  // Narrativa & Suspense
  { id: 'drama', category: 'Narrativa & Suspense', label: 'Sombrio / Drama', desc: 'Misterioso, tenso e cinematográfico.' },
  { id: 'sombrio_misterio', category: 'Narrativa & Suspense', label: 'Sombrio e Misterioso', desc: 'Suspense puro, histórias de suspense e segredos.' },
  { id: 'terror', category: 'Narrativa & Suspense', label: 'Terror / Lendas Urbanas', desc: 'Narrativa arrepiante ideal para histórias assustadoras.' },
  { id: 'investigativo', category: 'Narrativa & Suspense', label: 'Investigativo / True Crime', desc: 'Focado em suspense realista e desvendar mistérios.' },
  { id: 'cinematic', category: 'Narrativa & Suspense', label: 'Trailer Cinematográfico', desc: 'Estilo narração de trailer de Hollywood super dramático.' },

  // Social & Storytelling
  { id: 'fofoca', category: 'Social & Storytelling', label: 'Fofocas / Storytelling', desc: 'Estilo segredo revelado, bastidores quentes e intrigas.' },
  { id: 'lifestyle', category: 'Social & Storytelling', label: 'Vlog / Lifestyle', desc: 'Tom íntimo, espontâneo e mostrando o dia a dia.' },
  { id: 'tutorial', category: 'Social & Storytelling', label: 'Didático / Passo a Passo', desc: 'Linguagem de tutorial, direta, focada em ensinar algo.' },
  { id: 'desafio', category: 'Social & Storytelling', label: 'Desafio / Interativo', desc: 'Estimula o usuário com testes e desafios intelectuais.' },

  // Emocional & Estética
  { id: 'épico', category: 'Emocional & Estética', label: 'Épico / Heroico', desc: 'Grandioso, poderoso e impactante.' },
  { id: 'inspirador', category: 'Emocional & Estética', label: 'Inspirador / Motivacional', desc: 'Profundo, reflexivo e encorajador.' },
  { id: 'nostálgico', category: 'Emocional & Estética', label: 'Nostálgico Anos 90/2000', desc: 'Gera forte apelo emocional com memórias da infância.' },
  { id: 'romântico', category: 'Emocional & Estética', label: 'Romântico / Love Story', desc: 'Foco em conexões, afeto, casais e sentimentos calorosos.' },
  { id: 'futurista', category: 'Emocional & Estética', label: 'Tecnológico / Sci-Fi', desc: 'Narrativas com jargões de tecnologia e visões futuristas.' },
  { id: 'estético', category: 'Emocional & Estética', label: 'Aesthetic / Relaxante', desc: 'Visualmente harmônico, focado em paz e tranquilidade.' },
  { id: 'premium', category: 'Emocional & Estética', label: 'Luxuoso / Aspiracional', desc: 'Sofisticado, elegante, focado em alto padrão de vida.' },
  { id: 'gamer', category: 'Emocional & Estética', label: 'Gamer / Guilda', desc: 'Termos e jargões gamers com referências a e-sports.' },
  { id: 'filosófico', category: 'Emocional & Estética', label: 'Filosófico / Existencial', desc: 'Reflexões sobre a mente humana e os mistérios cósmicos.' },
  { id: 'festa', category: 'Emocional & Estética', label: 'Enérgico / Balada', desc: 'Vibe dinâmica, alegre, rápida e contagiante.' }
];

// Total de 27 paletas
const COLOR_PRESETS = [
  // Padrões & Naturais
  { id: 'normal', category: 'Padrões & Naturais', label: 'Cores Naturais (Padrão)', value: 'Natural, lifelike color representation, balanced contrast and exposure' },

  // Tons Quentes & Iluminação
  { id: 'quente', category: 'Tons Quentes & Iluminação', label: 'Tons Quentes', value: 'Golden hour sunset glow, warm orange, rich reds, soft ambient lighting' },
  { id: 'goldenhour', category: 'Tons Quentes & Iluminação', label: 'Golden Hour / Pôr do Sol', value: 'Stunning golden hour photography, warm glowing sun flare backlighting, long dramatic shadows, soft ambient orange and gold light, dreamy cinematic atmosphere, vertical 9:16.' },
  { id: 'sunset_silhouettes', category: 'Tons Quentes & Iluminação', label: 'Silhueta no Pôr do Sol', value: 'Bright fiery orange, magenta, silhouettes in solid black' },

  // Tons Frios & Profundos
  { id: 'frio', category: 'Tons Frios & Profundos', label: 'Tons Frios', value: 'Cool moody blue hour, deep teal, silver highlights, twilight atmosphere' },
  { id: 'ocean_deep', category: 'Tons Frios & Profundos', label: 'Profundezas do Oceano', value: 'Abyssal blue, navy, marine teal, bioluminescent cyan highlights' },
  { id: 'arctic_glacier', category: 'Tons Frios & Profundos', label: 'Glaciar Ártico', value: 'Frosty white, ice blue, deep freezing grey, subtle teal accents' },

  // Neon & Futurismo
  { id: 'cyberpunk', category: 'Neon & Futurismo', label: 'Neon Cyberpunk', value: 'Vibrant neon pink, electric blue, acid green, deep cybertech shadows' },
  { id: 'vaporwave', category: 'Neon & Futurismo', label: 'Vaporwave Estético', value: 'Vibrant violet, hot pink, teal, turquoise, dreamy retro sunset tones' },
  { id: 'retro_arcade', category: 'Neon & Futurismo', label: 'Fliperama Anos 80', value: 'Pitch black background, glowing neon red, electric blue, radioactive yellow accents' },
  { id: 'space_nebula', category: 'Neon & Futurismo', label: 'Nebulosa Espacial', value: 'Cosmic purple, starry black, ultraviolet, deep magenta dust' },
  { id: 'toxic_waste', category: 'Neon & Futurismo', label: 'Resíduo Tóxico e Ácido', value: 'Acid lime green, radioactive yellow, pitch black, industrial charcoal grey' },
  { id: 'cyberpunk_glitch', category: 'Neon & Futurismo', label: 'Glitch RGB', value: 'Saturated primary red, green, and blue pixels, static noise color artifacts' },

  // Orgânicos & Terra
  { id: 'forest_moss', category: 'Orgânicos & Terra', label: 'Verde Floresta e Musgo', value: 'Deep forest green, earthy brown, sage, damp moss green, soft woodland light' },
  { id: 'desert_sand', category: 'Orgânicos & Terra', label: 'Areia do Deserto e Ouro', value: 'Warm desert sand, terracotta, rich golden dust, dry high-contrast shadows' },
  { id: 'earthy_terracotta', category: 'Orgânicos & Terra', label: 'Argila e Terracota', value: 'Earthy clay, baked terracotta, olive green, warm copper tones' },
  { id: 'mint_chocolate', category: 'Orgânicos & Terra', label: 'Chocolate com Menta', value: 'Cool mint green, deep rich chocolate brown, creamy white highlights' },

  // Vintage & Clássicos
  { id: 'vintage_sepia', category: 'Vintage & Clássicos', label: 'Sépia Analógico Retro', value: 'Rich sepia tones, aged cream, dusty amber, low saturation vintage brown' },
  { id: 'monocromático', category: 'Vintage & Clássicos', label: 'Preto e Branco', value: 'High contrast monochrome, rich silver grain, dramatic play of shadows' },
  { id: 'steampunk_bronze', category: 'Vintage & Clássicos', label: 'Bronze Steampunk', value: 'Polished bronze, heavy black charcoal, glowing copper light accents' },

  // Suaves & Delicados
  { id: 'pastel', category: 'Suaves & Delicados', label: 'Tons Pastéis', value: 'Soft pastel palette (mint, blush pink, cream, lavender), clean airy feel' },
  { id: 'cherry_blossom', category: 'Suaves & Delicados', label: 'Cerejeira e Sakura', value: 'Soft cherry blossom pink, crisp white, gentle rose petals, pale blue sky' },
  { id: 'candy_shop', category: 'Suaves & Delicados', label: 'Doce de Algodão', value: 'Cotton candy pink, sky blue, sugar yellow, bright bubblegum hues' },

  // Dramáticos & Temáticos
  { id: 'royal_luxury', category: 'Dramáticos & Temáticos', label: 'Ouro e Realeza', value: 'Rich imperial purple, deep royal blue, glistening metallic gold details' },
  { id: 'royal_velvet', category: 'Dramáticos & Temáticos', label: 'Veludo Nobre', value: 'Deep royal burgundy, dark velvet navy blue, elegant silver accents' },
  { id: 'military_camo', category: 'Dramáticos & Temáticos', label: 'Camuflagem Militar', value: 'Olive drab green, khaki sand, military black, matte military brown' },
  { id: 'halloween_spooky', category: 'Dramáticos & Temáticos', label: 'Spooky Abóbora', value: 'Jack-o-lantern orange, pitch black, eerie purple, poisonous green glow' }
];

// Helper to group presets by category for optgroup rendering
const groupByCategory = (presets) => {
  return presets.reduce((acc, preset) => {
    const cat = preset.category || 'Outros';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(preset);
    return acc;
  }, {});
};;

const TARGET_PRESETS = [
  { id: 'normal', label: 'Público Geral (Padrão)', desc: 'Narrativa natural e engajante para qualquer espectador do feed.' },
  { id: 'jovens', label: 'Geração Z / Jovens', desc: 'Linguagem rápida, memes, engajamento dinâmico.' },
  { id: 'gamers', label: 'Gamers', desc: 'Referências de jogos, jargão gamer, ritmo forte.' },
  { id: 'empreendedores', label: 'Empreendedores', desc: 'Foco em valor, negócios, hacks e crescimento.' },
  { id: 'criativos', label: 'Artistas / Criativos', desc: 'Foco na estética, design e inspiração técnica.' }
];

// Mashup Arrays para gerar temas infinitos e virais
const THEME_SUBJECTS = [
  'Capivaras brasileiras',
  'Legumes fitness',
  'Frutas tropicais falantes',
  'Gatos detetives',
  'Objetos de escritório',
  'Dinossauros corporativos',
  'Pinguins mafiosos',
  'Super-heróis idosos',
  'Pães caseiros artesanais',
  'Estátuas clássicas de mármore',
  'Plantas carnívoras de estimação',
  'Monstros extremamente tímidos',
  'ETs tentando se integrar no Brasil',
  'Cachorros caramelos lendários',
  'Astronautas perdidos',
  'Profissões brasileiras comuns',
  'Utensílios de cozinha falantes',
  'Ursinhos de pelúcia rebeldes',
  'Dragões com problemas do cotidiano',
  'Múmias tentando usar tecnologia',
  'Computadores antigos dos anos 90',
  'Inconfidentes mineiros modernos',
  'Drácula vivendo no Rio de Janeiro',
  'Robôs limpadores de chão inteligentes',
  'Preguiças velocistas',
  'Tubarões vegetarianos',
  'Sorvetes que não querem derreter',
  'Livros antigos da biblioteca',
  'Formigas operárias de elite',
  'Capangas de desenho animado'
];

const THEME_ACTIONS = [
  'discutindo na fila do pão da padaria',
  'tentando entender como funciona o Pix',
  'em uma reunião de condomínio caótica',
  'fazendo treino pesado de crossfit',
  'enfrentando a segunda-feira de manhã no metrô',
  'em uma chamada de vídeo tensa no Zoom',
  'comprando pastel e caldo de cana na feira',
  'jogando uma partida intensa de dominó',
  'tentando declarar o imposto de renda',
  'organizando uma revolta contra a impressora',
  'se preparando para um desfile de moda de luxo',
  'cantando no karaokê de madrugada',
  'planejando um assalto a uma fábrica de sushis',
  'jogando futebol de várzea na chuva',
  'tirando foto para a carteira de motorista',
  'em uma missão ultrassecreta de espionagem',
  'fazendo compras de supermercado no sábado',
  'tentando cozinhar um miojo gourmet',
  'em uma balada cyberpunk tocando samba',
  'pedindo aumento de salário para o chefe',
  'se exercitando na praia de Copacabana',
  'tentando montar um móvel sem manual',
  'em um duelo de rap medieval',
  'fazendo terapia para lidar com o estresse',
  'viajando de ônibus interestadual na janela',
  'tentando cancelar uma assinatura de internet',
  'comemorando o aniversário com bolo de padaria',
  'aprendendo a andar de skate na praça',
  'procurando a chave de casa perdida no sofá',
  'preparando um churrasco de domingo clássico'
];

const THEME_TWISTS = [
  'com muita atitude cyberpunk e luzes neon',
  'vestidos como samurais medievais lendários',
  'no estilo de chefões épicos de Dark Souls',
  'em versão adorável e fofa de animação 3D',
  'com roupas elegantes de alta costura parisiense',
  'de forma extremamente sarcástica e irônica',
  'com uma vibe nostálgica de comercial dos anos 90',
  'reclamando das dores da vida adulta',
  'com uma iluminação dramática de filme noir',
  'em um estilo de desenho animado clássico rubberhose',
  'completamente cobertos de ouro e joias brilhantes',
  'com óculos escuros e visual de filme de ação retro',
  'com uma energia caótica de memes da internet',
  'como se fossem pinturas clássicas a óleo de museu',
  'com detalhes hiper-realistas e expressões engraçadas',
  'tentando agir de forma extremamente natural',
  'com uma paleta de cores pastel super estética',
  'esbanjando carisma e humor cômico',
  'com fumaça e atmosfera épica ao redor',
  'com um toque dramático de trailer de cinema'
];

export const TikTokCollections = () => {
  const [theme, setTheme] = useState('');
  const [quantity, setQuantity] = useState(5);
  const [selectedStyle, setSelectedStyle] = useState('normal');
  const [selectedVibe, setSelectedVibe] = useState('normal');
  const [selectedColors, setSelectedColors] = useState('normal');
  const [selectedTarget, setSelectedTarget] = useState('normal');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [portugueseText, setPortugueseText] = useState(true);

  // Atualiza o prompt em tempo real sempre que qualquer dependência mudar
  useEffect(() => {
    const styleObj = STYLE_PRESETS.find(s => s.id === selectedStyle);
    const vibeObj = VIBE_PRESETS.find(v => v.id === selectedVibe);
    const colorObj = COLOR_PRESETS.find(c => c.id === selectedColors);
    const targetObj = TARGET_PRESETS.find(t => t.id === selectedTarget);

    const themeText = theme.trim() || '<<< Tema Principal do Post >>>';
    const styleDesc = styleObj ? `${styleObj.label} (${styleObj.desc})` : 'Estilo personalizado';
    const styleFormula = styleObj ? styleObj.formula.replace('[THEME_PT]', themeText) : 'Free custom style';
    const vibeDesc = vibeObj ? `${vibeObj.label} (${vibeObj.desc})` : 'Vibe equilibrada';
    const colorDesc = colorObj ? colorObj.value : 'Paleta natural';
    const targetDesc = targetObj ? `${targetObj.label} (${targetObj.desc})` : 'Feed geral';
    
    let finalNotes = notes.trim() ? notes.trim() : 'Nenhuma observação adicional.';
    if (portugueseText) {
      finalNotes = `ATENÇÃO: Toda e qualquer imagem que contiver textos, letreiros, placas ou tipografia DEVE ter o texto gerado em Português do Brasil (PT-BR). ${finalNotes}`;
    }

    const portugueseInstruction = portugueseText 
      ? `\n4. **Textos em Português nas Imagens:** Como o público-alvo é brasileiro, caso alguma das imagens possua texto visível (placas, camisetas, cartazes, balões de fala, letreiros, ou elementos gráficos), você DEVE especificar no prompt em inglês que esse texto deve ser gerado rigorosamente em **Português do Brasil** (por exemplo: "with Brazilian Portuguese text written: '[Texto Aqui]'" ou "bold typography in Brazilian Portuguese showing: '[Texto]'").`
      : '';

    const promptText = `Você é o **FlowPrompt Image Engine**, um Engenheiro de Prompts e Diretor de Arte Sênior especializado no modelo **Google's Nano Banana 2**. 

Sua função é criar um post carrossel altamente viral no **TikTok** com o tema fornecido. O seu retorno DEVE conter exatamente os seguintes itens estruturados, cada um dentro de um bloco de código/artefato separado para fácil cópia individual:

1. **Título do Post (em Português):** Um título ultra-chamativo que desperte curiosidade nos primeiros 2 segundos.
2. **Legenda/Descrição do Post (em Português):** Um texto curto, envolvendo e focado em engajamento com exatamente 5 hashtags relevantes no final.
3. **Imagens da Coleção (JSONs Individuais):** Uma coleção com exatamente ${quantity} imagens. Cada imagem deve ser representada por um bloco de código JSON único e independente (estilo 'photo-new') contendo prompts detalhados em **Inglês** adequados para o modelo **Nano Banana 2**.

---

### 📋 INFORMAÇÕES DE ENTRADA DO POST:
- **Tema da Coleção:** ${themeText}
- **Quantidade de Imagens:** ${quantity} imagens em sequência lógica de narrativa (início, meio e fim envolventes)
- **Estilo de Imagem Direcionado:** ${styleDesc} -> Fórmula base: "${styleFormula}"
- **Tom da Narrativa/Legenda:** ${vibeDesc}
- **Diretriz de Paleta de Cores:** ${colorDesc}
- **Público-Alvo Priorizado:** ${targetDesc}
- **Observações Importantes e Refinamentos:** ${finalNotes}

---

### 📐 DIRETRIZES DO SCHEMA JSON DO NANO BANANA 2:
Cada uma das ${quantity} imagens deve ter seu próprio bloco de código contendo o JSON rigorosamente neste formato:
\`\`\`json
{
  "subject": {
    "primary": {
      "type": "character" | "environment",
      "description": "Detailed visual description of the subject in English (must use style formula hints)",
      "action": "Action or expressive pose in English (narrative progress of slide)",
      "attributes": ["Attribute1", "Attribute2", "Attribute3"] // Max 3 style descriptors in English
    },
    "characters": [ // Optional: Use only if specific named character consistency is needed across slides
      {
        "name": "Character Name",
        "description": "Detailed description of physical visual elements in English",
        "visual_consistency_id": "char_seed_lowercaseNameWithoutSpecialCharacters_v31",
        "pose_or_expression": "Pose or emotion of this character in this slide in English"
      }
    ]
  },
  "composition": {
    "framing": "medium" | "extreme_close_up" | "close_up" | "wide_establishing" | "pov",
    "camera_angle": "eye_level" | "birds_eye_view" | "worms_eye_view" | "low_angle" | "high_angle" | "dutch_angle",
    "lens": {
      "focal_length": "85mm" | "50mm" | "24mm" | "90mm",
      "aperture": "f/1.4" | "f/1.8" | "f/2.8" | "f/4.0"
    },
    "depth_of_field": "shallow" | "deep"
  },
  "environment": {
    "context": "Detailed setting background description in English",
    "time_of_day": "day" | "night" | "sunset" | "sunrise" | "twilight",
    "lighting": {
      "key_light": "Main light source in English",
      "fill_light": "Fill or ambient bounce light in English",
      "rim_light": "Backlight edge light in English or 'none'"
    },
    "atmosphere": {
      "weather": "clear" | "light_rain" | "stormy" | "snowy" | "foggy",
      "mood": "neutral" | "epic_grand" | "noir_melancholy" | "cyberpunk_high_tech" | "gothic_horror" | "lighthearted_comedy"
    }
  },
  "style_and_quality": {
    "medium": "photograph" | "oil_painting" | "pencil_sketch" | "anime_illustration" | "3d_render" | "watercolor",
    "rendering_engine": "none" | "unreal_engine_5" | "octane_render" | "blender_cycles",
    "color_grading": "natural" | "neon_cyberpunk" | "warm_golden" | "cool_toned" | "monochrome" | "pastel_tones",
    "golden_tokens": ["token1", "token2", "token3"] // ex: hyper-realistic, 8k, sharp focus
  },
  "negative_prompts": [
    "blurry", "low quality", "mutated details", "deformed limbs", 
    "extra fingers", "unstable anatomy", "flickering artifacts", "noisy text"
  ]
}
\`\`\`

---

### ⚠️ REGRAS CRÍTICAS DE RESPOSTA E FORMATAÇÃO:
1. **Consistência Visual:** Mantenha os mesmos personagens, IDs de consistência visual (\`visual_consistency_id\`) e estilo de imagem entre todas as ${quantity} imagens da coleção. O cenário deve evoluir para contar uma historinha (Slide 1: Introdução, Slides 2-4: Desenvolvimento, Slide ${quantity}: Clímax/Final impactante).
2. **Formato de Saída Obrigatório:** Forneça a sua resposta estritamente usando os blocos de código markdown (\`\`\`) separados para cada item, garantindo facilidade no clique de cópia individual.
   - O Título deve estar dentro de: \`\`\`text
   - A Legenda com as 5 hashtags deve estar dentro de: \`\`\`text
   - Cada imagem (total de ${quantity}) deve estar dentro de seu próprio bloco: \`\`\`json (totalizando ${quantity} blocks JSON separados).
3. **Sem Conversação Extra:** Responda diretamente com os blocos contendo os resultados. Não insira saudações, introduções ou explicações antes ou depois.${portugueseInstruction}`;

    setGeneratedPrompt(promptText);
  }, [theme, quantity, selectedStyle, selectedVibe, selectedColors, selectedTarget, notes, portugueseText]);

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateRandomTheme = () => {
    const subject = THEME_SUBJECTS[Math.floor(Math.random() * THEME_SUBJECTS.length)];
    const action = THEME_ACTIONS[Math.floor(Math.random() * THEME_ACTIONS.length)];
    const twist = THEME_TWISTS[Math.floor(Math.random() * THEME_TWISTS.length)];
    setTheme(`${subject} ${action} ${twist}`);
  };

  const handleRandomize = () => {
    // Escolhe um tema criativo aleatório usando a mashup engine
    const subject = THEME_SUBJECTS[Math.floor(Math.random() * THEME_SUBJECTS.length)];
    const action = THEME_ACTIONS[Math.floor(Math.random() * THEME_ACTIONS.length)];
    const twist = THEME_TWISTS[Math.floor(Math.random() * THEME_TWISTS.length)];
    setTheme(`${subject} ${action} ${twist}`);

    // Quantidade entre 3 e 7
    setQuantity(Math.floor(Math.random() * 5) + 3);

    // Randomiza presets
    const randomStyle = STYLE_PRESETS[Math.floor(Math.random() * STYLE_PRESETS.length)].id;
    const randomVibe = VIBE_PRESETS[Math.floor(Math.random() * VIBE_PRESETS.length)].id;
    const randomColor = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)].id;
    const randomTarget = TARGET_PRESETS[Math.floor(Math.random() * TARGET_PRESETS.length)].id;

    setSelectedStyle(randomStyle);
    setSelectedVibe(randomVibe);
    setSelectedColors(randomColor);
    setSelectedTarget(randomTarget);
    setPortugueseText(Math.random() > 0.5);
  };

  const handleClear = () => {
    setTheme('');
    setQuantity(5);
    setSelectedStyle('normal');
    setSelectedVibe('normal');
    setSelectedColors('normal');
    setSelectedTarget('normal');
    setNotes('');
    setPortugueseText(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlsColumn}>
        <GlassCard className="p-6">
          <h3 className={styles.sectionTitle}>
            <Folders size={18} className={styles.sectionTitleIcon} />
            Configuração da Coleção TikTok
          </h3>

          {/* Tema e Quantidade */}
          <div className={styles.controlGroup}>
            <label htmlFor="themeInput">
              Tema Principal do Post
              <span>* Obrigatório</span>
            </label>
            <div className={styles.basicInputsRow}>
              <div className={styles.themeInputContainer}>
                <input 
                  id="themeInput"
                  type="text" 
                  className={styles.inputFieldTheme} 
                  placeholder="Ex: Legumes bombados na academia, Capivaras cyberpunk..." 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.themeMagicBtn}
                  onClick={handleGenerateRandomTheme}
                  title="Gerar Tema Aleatório Incrível"
                >
                  <Sparkles size={16} />
                </button>
              </div>
              <input 
                type="number" 
                min="1" 
                max="20"
                className={styles.inputFieldQty} 
                title="Quantidade de Imagens"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
          </div>

          {/* Grid de Seleção Dual 1: Estilo e Público-Alvo */}
          <div className={styles.selectorsGrid}>
            {/* Preset de Estilo */}
            <div className={styles.controlGroup}>
              <label htmlFor="styleSelect">Estilo Principal (Fórmula Nano)</label>
              <select 
                id="styleSelect"
                className={styles.selectField}
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                {Object.entries(groupByCategory(STYLE_PRESETS)).map(([category, items]) => (
                  <optgroup key={category} label={category} className={styles.optGroup}>
                    {items.map(preset => (
                      <option key={preset.id} value={preset.id} title={preset.desc}>
                        {preset.emoji ? `${preset.emoji} ` : ''}{preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Público-Alvo */}
            <div className={styles.controlGroup}>
              <label htmlFor="targetSelect">Público-Alvo (Cópia/Roteiro)</label>
              <select 
                id="targetSelect"
                className={styles.selectField}
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
              >
                {TARGET_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id} title={preset.desc}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid de Seleção Dual 2: Vibe e Paleta de Cores */}
          <div className={styles.selectorsGrid}>
            {/* Tom / Vibe */}
            <div className={styles.controlGroup}>
              <label htmlFor="vibeSelect">Tom / Vibe do Post</label>
              <select 
                id="vibeSelect"
                className={styles.selectField}
                value={selectedVibe}
                onChange={(e) => setSelectedVibe(e.target.value)}
              >
                {Object.entries(groupByCategory(VIBE_PRESETS)).map(([category, items]) => (
                  <optgroup key={category} label={category} className={styles.optGroup}>
                    {items.map(preset => (
                      <option key={preset.id} value={preset.id} title={preset.desc}>
                        {preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Paleta de Cores */}
            <div className={styles.controlGroup}>
              <label htmlFor="colorSelect">Paleta de Cores (Diretriz Visual)</label>
              <select 
                id="colorSelect"
                className={styles.selectField}
                value={selectedColors}
                onChange={(e) => setSelectedColors(e.target.value)}
              >
                {Object.entries(groupByCategory(COLOR_PRESETS)).map(([category, items]) => (
                  <optgroup key={category} label={category} className={styles.optGroup}>
                    {items.map(preset => (
                      <option key={preset.id} value={preset.id} title={preset.value}>
                        {preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Texto em Português Opcional */}
          <label className={styles.toggleRow} htmlFor="portugueseTextToggle">
            <input 
              id="portugueseTextToggle"
              type="checkbox"
              className={styles.toggleInput}
              checked={portugueseText}
              onChange={(e) => setPortugueseText(e.target.checked)}
            />
            <div className={styles.toggleSwitch}></div>
            <div className={styles.toggleLabelText}>
              <span className={styles.toggleLabelTitle}>Forçar Texto das Imagens em Português</span>
              <span className={styles.toggleLabelDesc}>Caso as imagens contenham letreiros, placas ou camisas, força o texto em PT-BR.</span>
            </div>
          </label>

          {/* Observações Opcionais */}
          <div className={styles.controlGroup}>
            <label htmlFor="notesInput">Observações ou Refinamentos Específicos</label>
            <textarea 
              id="notesInput"
              className={styles.textareaField} 
              placeholder="Ex: Adicionar uma uva roxa sarcástica nos slides 2 e 4. Garantir iluminação dramática no final..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Ações Criativas */}
          <div className={styles.actionButtonsRow}>
            <button 
              type="button" 
              className={styles.resetBtn} 
              onClick={handleClear}
              title="Resetar todos os campos"
            >
              <RotateCcw size={16} />
              Limpar Campos
            </button>
            <button 
              type="button" 
              className={styles.randBtn} 
              onClick={handleRandomize}
              title="Gerar sugestões criativas"
            >
              <Shuffle size={16} />
              Idéia Aleatória
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Preview e Cópia do Prompt */}
      <div className={styles.workspaceColumn}>
        <GlassCard className="p-6">
          <div className={styles.previewHeader}>
            <div>
              <h3 className={styles.previewTitle}>
                <Sparkles size={18} style={{ color: '#ec4899' }} />
                Prompt Mestre para IA
              </h3>
              <span className={styles.previewSub}>Copie e cole este prompt no ChatGPT ou Claude</span>
            </div>
            <button 
              className={`${styles.copyButton} ${copied ? styles.copySuccess : ''}`}
              onClick={handleCopy}
              disabled={!theme.trim()}
              title={theme.trim() ? "Copiar prompt completo" : "Preencha o tema para habilitar"}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copiado!' : 'Copiar Prompt'}
            </button>
          </div>

          {theme.trim() ? (
            <pre className={styles.outputArea}>{generatedPrompt}</pre>
          ) : (
            <div className={styles.emptyState}>
              <HelpCircle size={48} opacity={0.2} />
              <p className={styles.emptyStateText}>
                Preencha o **Tema Principal** na coluna esquerda para visualizar o prompt gerado em tempo real.
              </p>
            </div>
          )}

          <div className={styles.infoBox}>
            <Info size={16} className={styles.infoIcon} />
            <p className={styles.infoText}>
              <strong>Como usar:</strong> Cole o prompt copiado no seu chat de IA. Ele irá gerar a legenda do post e os JSONs individuais de cada imagem prontos em **artefatos separados**. Copie cada JSON gerado e use na <strong>Foto Nova (Nano Banana)</strong> aqui no FlowPrompt para gerar as imagens perfeitas!
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default TikTokCollections;
