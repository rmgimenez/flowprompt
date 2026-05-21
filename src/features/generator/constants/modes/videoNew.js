import { 
  parseDialogue, 
  parseCharacters, 
  enrichCharacters, 
  parseAmbiance, 
  sanitizeValues
} from '../../utils/parsers';
import {
  buildCharacterManifest,
  buildVoiceDirection,
  buildNegativePrompt
} from './sharedVideoHelpers';

export const videoNew = {
  id: 'video-new',
  title: 'Vídeo Novo (Veo)',
  desc: 'Gere vídeos cinematográficos a partir de descrições textuais.',
  helpText: 'Para obter os melhores resultados, seja específico sobre o movimento da câmera e a iluminação. Use termos como "cinematic", "slow motion" ou "handheld" para definir o ritmo e a emoção da cena.',
  formula: (vals) => {
    const cleanVals = sanitizeValues(vals);
    const rawSubject = cleanVals.subject;
    const rawAction = cleanVals.action;
    const rawContext = cleanVals.context;
    const rawSceneSummary = cleanVals.scene_summary;

    const dialogue = parseDialogue(cleanVals.dialogue);
    const characters = enrichCharacters(parseCharacters(cleanVals.characters_definition), dialogue);
    const envAmbiance = parseAmbiance(rawContext, cleanVals.style_ambiance);

    const aspectRatio = cleanVals.aspect_ratio || "9:16 (Vertical)";
    const durationText = cleanVals.video_duration || "6 segundos";
    const durationNum = parseInt(durationText) || 6;
    const timelineMode = cleanVals.timeline_mode || "Multi-shot Dinâmico";

    const styleAmbianceText = cleanVals.style_ambiance && !cleanVals.style_ambiance.includes('<<<')
      ? cleanVals.style_ambiance
      : "Cinematic, photorealistic, professional film look";

    const cameraText = cleanVals.cinematography && !cleanVals.cinematography.includes('<<<')
      ? cleanVals.cinematography
      : "Cinematic camera movement";

    const sceneSummaryText = rawSceneSummary && !rawSceneSummary.includes('<<<')
      ? rawSceneSummary
      : "A compelling cinematic moment designed for TikTok engagement.";

    const charManifest = buildCharacterManifest(characters, rawSubject || "The main visual subject of the scene");
    const voiceDirection = buildVoiceDirection(dialogue);

    let timelineScript;

    if (dialogue.length > 0) {
      if (timelineMode.includes("Multi-shot")) {
        timelineScript = dialogue.map((line, idx) => {
          const start = line.timing.start.toFixed(1).padStart(5, '0').replace('.', ':');
          const end = line.timing.end.toFixed(1).padStart(5, '0').replace('.', ':');
          
          const characterObj = characters.find(c => c.name.toLowerCase() === line.character.toLowerCase());
          const actionText = characterObj ? `performing in a ${characterObj.motion_signature} manner` : "acting naturally in the scene";
          
          const cameraCuts = ["Close-up Shot", "Medium Close-up Shot", "Reverse Shot", "Tight Portrait Shot"];
          const selectedCut = cameraCuts[idx % cameraCuts.length];

          return `[${start} - ${end}]
- **Camera Cut:** ${selectedCut} focusing on '${line.character}'.
- **Action/Expression:** '${line.character}' displays a '${line.emotion_tone}' expression while ${actionText}.
- **Dialogue Speech:** '${line.character}' says in a direct quote: "${line.speech}"
- **Soundscape & Audio Hierarchy (Veo 3.1 Design):**
  * **Foreground Layer (Dialogue & SFX):** Clear, expressive pt-BR speech by '${line.character}' with '${line.emotion_tone}' tone. No overlap. SFX: Action-synced primary sound effect matching '${rawAction || 'the scene actions'}' (max 1 primary beat).
  * **Midground Layer (Music):** Supporting non-intrusive musical score or background pads, zero intrusive beats, avoiding speech masking (e.g., minimal reflective piano underscore).
  * **Background Layer (Ambience):** Background environmental bed matching '${rawContext || 'the scene atmosphere'}'.
  * **Mixing & Ducking:** Complete separation of dialogue, music, and SFX. Music and Ambience are ducked to -12dB during speech to prevent masking. No animal onomatopoeias in speech.`;
        }).join('\n\n');
      } else {
        const totalDurationFormatted = `00:0${durationNum}:0`;
        const dialogueLinesText = dialogue.map(line => {
          const timestamp = line.timing.start.toFixed(1).padStart(5, '0').replace('.', ':');
          return `  * At [${timestamp}], '${line.character}' (feeling ${line.emotion_tone}) says in a direct quote: "${line.speech}"`;
        }).join('\n');

        timelineScript = `[00:00 - ${totalDurationFormatted}]
- **Camera Cut:** Single continuous shot using ${cameraText}. Maintain framing and visual volume without any sudden camera cuts.
- **Action/Expression:** ${rawSubject || "Subjects"} performing ${rawAction || "realistic continuous movement"} inside the scene.
- **Production Script (Dialogue Sequence):**
${dialogueLinesText}
- **Soundscape & Audio Hierarchy (Veo 3.1 Design):**
  * **Foreground Layer (Dialogue & SFX):** Clear, staggered speech in pt-BR with expressive voice acting matching character emotions. SFX: Continuous action-synced sound effects (e.g. footsteps, object handling) matching the visuals.
  * **Midground Layer (Music):** Soft supporting atmospheric musical texture, zero heavy beats, no vocal masks.
  * **Background Layer (Ambience):** Steady environmental background noise bed matching '${rawContext || 'the scene atmosphere'}'.
  * **Mixing & Ducking:** All background layers (Music & Ambience) are ducked to -12dB when characters speak. No crosstalk.`;
      }
    } else {
      const totalDurationFormatted = `00:0${durationNum}:0`;
      timelineScript = `[00:00 - ${totalDurationFormatted}]
- **Camera Cut:** Continuous cinematic camera work. ${cameraText}.
- **Action & Movement:** The subject (${rawSubject || "main focus"}) performs the following action: ${rawAction || "natural organic motion"}. Consistent physics, continuous flow, dynamic pacing.
- **Environment Context:** ${rawContext || "cinematic scene environment"}.
- **Soundscape & Audio Hierarchy (Veo 3.1 Design):**
  * **Foreground Layer (SFX):** High-fidelity action-synced sound effects (SFX) matching '${rawAction || 'the visual movement'}'. High kinetic audio precision.
  * **Midground Layer (Music):** Thematic cinematic musical bed matching the scene mood.
  * **Background Layer (Ambience):** Immersive environmental ambiance matching '${rawContext || 'the environment'}'.
  * **Mixing & Ducking:** Balanced cinematic audio mix with strong foreground sound effects and supportive background atmosphere.`;
    }

    const negativeText = buildNegativePrompt();

    return `# GOOGLE VEO 3.1 CINEMATIC PROMPT DIRECTIVE

## 🎬 SCENE LOGLINE
${sceneSummaryText}

## 🎥 PRODUCTION SPECIFICATIONS
- **Aspect Ratio:** ${aspectRatio}
- **Target Duration:** ${durationText}
- **Timeline Configuration:** ${timelineMode}
- **Primary Cinematography:** ${cameraText}
- **Lighting & Ambiance:** ${envAmbiance.lighting.key_light} key light, ${envAmbiance.lighting.fill_light} fill light, ${envAmbiance.lighting.rim_light} rim light. Atmosphere: ${envAmbiance.atmosphere.weather} weather, ${envAmbiance.atmosphere.mood} mood.
- **Color Palette & Visuals:** ${styleAmbianceText}
- **Motion Stability Rules:** ${vals.motion_stability || "perfect frame-to-frame coherence"}, ${vals.motion_fluidity || "fluid motion"}${voiceDirection}

## 👥 CHARACTER BIO-MANIFEST
${charManifest}

## ⏱️ TIMELINES & PRODUCTION SCRIPT
${timelineScript}

## 🔇 EXCLUSIONS (NEGATIVE PROMPT)
${negativeText}`;
  },
  fields: [
    {
      id: 'scene_summary',
      label: 'Resumo da Cena (Momento Cinemática)',
      hint: 'Descreva a cena em uma frase clara para roteirização',
      placeholder: 'Ex: Um astronauta caindo em um portal de neon na chuva',
      type: 'text',
      suggestions: [
        { label: 'Exemplo Comédia', value: 'Um astronauta trapalhão escorrega e cai de costas em um portal de neon psicodélico e colorido.' }
      ]
    },
    {
      id: 'timeline_mode',
      label: 'Modo de Linha de Tempo (Timeline Mode)',
      hint: 'Escolha se a câmera fará cortes de cena para cada fala ou manterá um plano único.',
      placeholder: 'Ex: Multi-shot Dinâmico',
      type: 'text',
      suggestions: [
        { label: 'Multi-shot Dinâmico (Cortes para cada fala)', value: 'Multi-shot Dinâmico' },
        { label: 'Tomada Única Contínua (Sem cortes)', value: 'Tomada Única Contínua' }
      ]
    },
    {
      id: 'aspect_ratio',
      label: 'Proporção da Tela (Aspect Ratio)',
      hint: 'Proporção recomendada para redes sociais (9:16) ou cinema (16:9)',
      placeholder: 'Ex: 9:16 (Vertical)',
      type: 'text',
      suggestions: [
        { label: '9:16 (Vertical - TikTok/Reels)', value: '9:16 (Vertical)' },
        { label: '16:9 (Horizontal - Cinema/YouTube)', value: '16:9 (Horizontal)' }
      ]
    },
    {
      id: 'video_duration',
      label: 'Duração do Clipe (Video Duration)',
      hint: 'Defina a duração do vídeo suportada nativamente pelo Veo 3.1',
      placeholder: 'Ex: 6 segundos',
      type: 'text',
      suggestions: [
        { label: '4 segundos', value: '4 segundos' },
        { label: '6 segundos', value: '6 segundos' },
        { label: '8 segundos', value: '8 segundos' }
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
      id: 'motion_fluidity',
      label: 'Fluidez & Ritmo de Movimento',
      hint: 'Define a cadência, inércia e pacing físico do movimento',
      placeholder: 'Ex: Cinemática Lenta, microgravidade realista, física de fluidos sutil',
      type: 'text',
      suggestions: [
        { label: 'Cinemática Lenta (Slow Motion)', value: 'cinematic slow-motion 24fps, high motion inertia, realistic organic physics acceleration' },
        { label: 'Física Natural & Fluida', value: 'natural organic physics, subtle fluid motion, lifelike weight distribution, smooth flow' },
        { label: 'Alta Energia Cinemática', value: 'high-energy kinetic motion, explosive speed ramps, dynamic force vector, fluid wind-up' },
        { label: 'Microgravidade Fluida', value: 'dreamy slow motion floating, zero-gravity drift, stellar dust floating, ultra-fluid physics' },
        { label: 'Fluxo Líquido/Gelatinoso', value: 'fluid hydrodynamic flow, gelatinous elasticity, smooth surface tension transitions' }
      ]
    },
    {
      id: 'motion_stability',
      label: 'Estabilização Física & Anatômica',
      hint: 'Preserva a integridade estrutural e evita glitches de IA',
      placeholder: 'Ex: Integridade anatômica absoluta, anti-glitch e consistência temporal',
      type: 'text',
      suggestions: [
        { label: 'Anti-Glitch Absoluto', value: 'absolute physical and temporal consistency, zero visual glitches, no morphing artifacts, stable borders' },
        { label: 'Preservação Anatômica', value: 'strict anatomical preservation, flawless limb symmetry, logical joint movements, steady posture' },
        { label: 'Fluidez Cinemática Estável', value: 'perfect frame-to-frame coherence, stable spatial volume, flicker-free background, sharp details' },
        { label: 'Hiper-Consistência Corporal', value: 'rigid body physics consistency, persistent clothing folds, non-deforming face details during motion' }
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
