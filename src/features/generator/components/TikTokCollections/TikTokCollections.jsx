import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { 
  Sparkles, Folders, Copy, Check, RotateCcw, Shuffle, Info, 
  HelpCircle
} from 'lucide-react';
import styles from './TikTokCollections.module.css';

// Estilos de Alta Conversão (Nano Banana 2 Formulas)
const STYLE_PRESETS = [
  { 
    id: 'normal', 
    label: 'Estilo Padrão (Sem Filtro)', 
    desc: 'Sem direcionamento de estilo artístico específico. Foco em realismo e alta fidelidade natural.', 
    formula: 'A clean, natural high-fidelity photographic style, clear representation, focus on realism, vertical 9:16.'
  },
  { 
    id: 'pixar', 
    label: 'Pixar 3D Cute', 
    desc: 'Estilo de animação 3D fofo e carismático.', 
    formula: 'A hyper-adorable character, Pixar 3D animation style, big expressive eyes, sub-surface scattering, vibrant colors, ray tracing, highly detailed, vertical 9:16. Bold stylized 3D bubble typography showing "[THEME_PT]" integrated at the bottom.'
  },
  { 
    id: 'gtav', 
    label: 'GTA V Poster Art', 
    desc: 'Arte de capa de jogo estilizada e cheia de atitude.', 
    formula: 'Vertical video game cover art in classic GTA V loading screen style, cel-shaded rendering, highly saturated colors, sharp black outlines, premium quality, vertical 9:16. Features bold GTA-inspired logo displaying "[THEME_PT]" in the center.'
  },
  { 
    id: 'darksouls', 
    label: 'Dark Souls Boss', 
    desc: 'Estilo sombrio, gótico e épico inspirado na FromSoftware.', 
    formula: 'Epic Dark Souls-inspired boss design, intricate armor and legendary weaponry, glowing eyes, FromSoftware dark fantasy aesthetic, misty atmospheric lighting, vertical 9:16. Ancient gothic typography integrated displaying "[THEME_PT]".'
  },
  { 
    id: 'wesanderson', 
    label: 'Wes Anderson', 
    desc: 'Simetria impecável e cores pastéis marcantes.', 
    formula: 'Wes Anderson movie style, perfectly symmetrical composition, centered subject, pastel color palette (soft pink, mustard yellow, pale blue, mint green), vintage retro aesthetic, flat cinematic lighting, vertical 9:16.'
  },
  { 
    id: 'motivacional', 
    label: 'Motivacional Moody', 
    desc: 'Fundo perfeito e desfocado para sobrepor textos inspiradores.', 
    formula: 'Cinematic vast moody landscape, shallow depth of field with blurred foreground/background, optimized with a large clean empty negative space in the center, prepared for text overlay. Mood: noir_melancholy, atmospheric lighting, vertical 9:16. Mandatory negative prompts: text, typography, letters.'
  },
  { 
    id: 'realista', 
    label: 'Foto Realista 8k', 
    desc: 'Fotografia profissional de estúdio de altíssimo nível.', 
    formula: 'Professional studio portrait photography, 8k resolution, sharp focus, natural highly detailed skin textures, cinematic lighting, Kodachrome film look, shallow depth of field, professional grade.'
  },
  { 
    id: 'anime', 
    label: 'Anime Anos 90', 
    desc: 'Aparência nostálgica de desenhos clássicos pintados à mão.', 
    formula: 'Nostalgic 90s anime illustration, hand-drawn aesthetic, cel-shaded animation style, lush hand-painted background texture, vintage soft color grading, Ghibli style visual cues.'
  }
];

const VIBE_PRESETS = [
  { id: 'normal', label: 'Neutro / Natural (Padrão)', desc: 'Narrativa equilibrada e direta, sem exageros dramáticos.' },
  { id: 'cômico', label: 'Humorístico / Cômico', desc: 'Engraçado, inusitado e descontraído.' },
  { id: 'épico', label: 'Épico / Heroico', desc: 'Grandioso, poderoso e impactante.' },
  { id: 'inspirador', label: 'Inspirador / Motivacional', desc: 'Profundo, reflexivo e encorajador.' },
  { id: 'curioso', label: 'Curiosidades / Fatos', desc: 'Instigante, didático e intrigante.' },
  { id: 'drama', label: 'Sombrio / Drama', desc: 'Misterioso, tenso e cinematográfico.' }
];

const COLOR_PRESETS = [
  { id: 'normal', label: 'Cores Naturais (Padrão)', value: 'Natural, lifelike color representation, balanced contrast and exposure' },
  { id: 'cyberpunk', label: 'Neon Cyberpunk', value: 'Vibrant neon pink, electric blue, acid green, deep cybertech shadows' },
  { id: 'pastel', label: 'Tons Pastéis', value: 'Soft pastel palette (mint, blush pink, cream, lavender), clean airy feel' },
  { id: 'vibrante', label: 'Cores Vibrantes', value: 'Highly saturated primary colors, high-contrast, energetic visual tone' },
  { id: 'quente', label: 'Tons Quentes', value: 'Golden hour sunset glow, warm orange, rich reds, soft ambient lighting' },
  { id: 'frio', label: 'Tons Frios', value: 'Cool moody blue hour, deep teal, silver highlights, twilight atmosphere' },
  { id: 'monocromático', label: 'Preto e Branco', value: 'High contrast monochrome, rich silver grain, dramatic play of shadows' }
];

const TARGET_PRESETS = [
  { id: 'normal', label: 'Público Geral (Padrão)', desc: 'Narrativa natural e engajante para qualquer espectador do feed.' },
  { id: 'jovens', label: 'Geração Z / Jovens', desc: 'Linguagem rápida, memes, engajamento dinâmico.' },
  { id: 'gamers', label: 'Gamers', desc: 'Referências de jogos, jargão gamer, ritmo forte.' },
  { id: 'empreendedores', label: 'Empreendedores', desc: 'Foco em valor, negócios, hacks e crescimento.' },
  { id: 'criativos', label: 'Artistas / Criativos', desc: 'Foco na estética, design e inspiração técnica.' }
];

const CREATIVE_THEMES = [
  'Frutas falantes brasileiras discutindo sobre o clima quente',
  'Animais fofos vestidos de samurais lendários defendendo sushis',
  'Cidades cyberpunk onde capivaras gigantes são animais de estimação',
  'Profissões comuns do Brasil representadas como chefões de Dark Souls',
  'Super-heróis idosos reclamando sobre coisas do dia a dia',
  'Objetos de escritório ganhando vida no estilo Pixar 3D',
  'Monstros assustadores que na verdade são extremamente tímidos',
  'Faraós do Egito antigo tentando entender como funciona um smartphone',
  'Gatos astronautas descobrindo um planeta feito inteiramente de novelos',
  'Legumes fitness fazendo exercícios pesados na academia'
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
    const optionalNotes = notes.trim() ? notes.trim() : 'Nenhuma observação adicional.';

    const promptText = `Você é o **FlowPrompt Image Engine**, um Engenheiro de Prompts e Diretor de Arte Sênior especializado no modelo **Google's Nano Banana 2**. 

Sua função é criar um post carrossel altamente viral no **TikTok** com o tema fornecido. O seu retorno DEVE conter exatamente os seguintes itens estruturados, cada um dentro de um bloco de código/artefato separado para fácil cópia individual:

1. **Título do Post (em Português):** Um título ultra-chamativo que desperte curiosidade nos primeiros 2 segundos.
2. **Legenda/Descrição do Post (em Português):** Um texto curto, envolvente e focado em engajamento com exatamente 5 hashtags relevantes no final.
3. **Imagens da Coleção (JSONs Individuais):** Uma coleção com exatamente ${quantity} imagens. Cada imagem deve ser representada por um bloco de código JSON único e independente (estilo 'photo-new') contendo prompts detalhados em **Inglês** adequados para o modelo **Nano Banana 2**.

---

### 📋 INFORMAÇÕES DE ENTRADA DO POST:
- **Tema da Coleção:** ${themeText}
- **Quantidade de Imagens:** ${quantity} imagens em sequência lógica de narrativa (início, meio e fim envolventes)
- **Estilo de Imagem Direcionado:** ${styleDesc} -> Fórmula base: "${styleFormula}"
- **Tom da Narrativa/Legenda:** ${vibeDesc}
- **Diretriz de Paleta de Cores:** ${colorDesc}
- **Público-Alvo Priorizado:** ${targetDesc}
- **Observações Importantes e Refinamentos:** ${optionalNotes}

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
   - Cada imagem (total de ${quantity}) deve estar dentro de seu próprio bloco: \`\`\`json (totalizando ${quantity} blocos JSON separados).
3. **Sem Conversação Extra:** Responda diretamente com os blocos contendo os resultados. Não insira saudações, introduções ou explicações antes ou depois.`;

    setGeneratedPrompt(promptText);
  }, [theme, quantity, selectedStyle, selectedVibe, selectedColors, selectedTarget, notes]);

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRandomize = () => {
    // Escolhe um tema criativo aleatório
    const randomTheme = CREATIVE_THEMES[Math.floor(Math.random() * CREATIVE_THEMES.length)];
    setTheme(randomTheme);

    // Quantidade entre 3 e 7
    setQuantity(Math.floor(Math.random() * 5) + 3);

    // Randomiza presets (pode incluir normal!)
    const randomStyle = STYLE_PRESETS[Math.floor(Math.random() * STYLE_PRESETS.length)].id;
    const randomVibe = VIBE_PRESETS[Math.floor(Math.random() * VIBE_PRESETS.length)].id;
    const randomColor = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)].id;
    const randomTarget = TARGET_PRESETS[Math.floor(Math.random() * TARGET_PRESETS.length)].id;

    setSelectedStyle(randomStyle);
    setSelectedVibe(randomVibe);
    setSelectedColors(randomColor);
    setSelectedTarget(randomTarget);
  };

  const handleClear = () => {
    setTheme('');
    setQuantity(5);
    setSelectedStyle('normal');
    setSelectedVibe('normal');
    setSelectedColors('normal');
    setSelectedTarget('normal');
    setNotes('');
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
              <input 
                id="themeInput"
                type="text" 
                className={styles.inputField} 
                placeholder="Ex: Legumes bombados na academia, Capivaras cyberpunk..." 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <input 
                type="number" 
                min="1" 
                max="20"
                className={styles.inputField} 
                title="Quantidade de Imagens"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
          </div>

          {/* Preset de Estilo */}
          <div className={styles.controlGroup}>
            <label htmlFor="styleSelect">Estilo Visual Principal (Fórmula Nano Banana)</label>
            <select 
              id="styleSelect"
              className={styles.selectField}
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              {STYLE_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id} title={preset.desc}>
                  {preset.id === 'normal' && '✨ '}
                  {preset.id === 'pixar' && '🧸 '}
                  {preset.id === 'gtav' && '🚗 '}
                  {preset.id === 'darksouls' && '⚔️ '}
                  {preset.id === 'wesanderson' && '📐 '}
                  {preset.id === 'motivacional' && '🌅 '}
                  {preset.id === 'realista' && '📸 '}
                  {preset.id === 'anime' && '🎨 '}
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tom / Vibe */}
          <div className={styles.controlGroup}>
            <label htmlFor="vibeSelect">Tom / Vibe do Post (Legenda e Histórias)</label>
            <select 
              id="vibeSelect"
              className={styles.selectField}
              value={selectedVibe}
              onChange={(e) => setSelectedVibe(e.target.value)}
            >
              {VIBE_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id} title={preset.desc}>
                  {preset.label}
                </option>
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
              {COLOR_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id} title={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          {/* Público-Alvo */}
          <div className={styles.controlGroup}>
            <label htmlFor="targetSelect">Público-Alvo (Engajamento e Cópia)</label>
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
