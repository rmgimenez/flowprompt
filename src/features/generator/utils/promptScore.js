/**
 * Heuristic Quality Score Engine for AI Prompts
 * Analyzes generated prompts in real-time and returns a 0-100 score
 * with contextual improvement tips.
 */

const KEYWORD_CATEGORIES = {
  lighting: [
    'cinematic lighting', 'golden hour', 'neon', 'volumetric', 'studio lighting',
    'rim light', 'backlight', 'softbox', 'three-point', 'dramatic lighting',
    'natural light', 'moonlight', 'sunlight', 'ambient glow', 'light rays',
    'shadow', 'contrast', 'highlight', 'anamorphic flare', 'lens flare'
  ],
  camera: [
    'close-up', 'close up', 'wide shot', 'medium shot', 'extreme close-up',
    'macro', 'aerial', 'drone', 'pov', 'handheld', 'gimbal', 'dolly',
    'tracking', 'orbit', 'tilt', 'pan', ' establishing shot', 'selfie',
    'overhead', 'bird\'s eye', 'worm\'s eye', 'low angle', 'high angle',
    'dutch angle', 'rule of thirds', 'symmetrical', 'depth of field',
    'shallow dof', 'bokeh', 'f/1.4', 'f/2.8', 'focal length', 'mm lens',
    '85mm', '50mm', '35mm', '24mm', '90mm', '18mm'
  ],
  quality: [
    '8k', '4k', 'high resolution', 'sharp focus', 'hyper-realistic',
    'ultra-detailed', 'intricate details', 'photorealistic', 'lifelike',
    'masterpiece', 'professional', '8k resolution', 'octane render',
    'unreal engine', 'ray tracing', 'high fidelity', 'crisp',
    'crystal clear', 'premium quality', 'studio quality'
  ],
  style: [
    'cyberpunk', 'ghibli', 'disney', 'pixar', 'anime', 'steampunk',
    'surrealist', 'minimalist', 'noir', 'vaporwave', 'retro',
    'futuristic', 'vintage', 'oil painting', 'watercolor', 'sketch',
    '3d render', 'cartoon', 'realistic', 'fantasy', 'dreamy',
    'cinematic', 'film look', 'analog', 'kodak', 'portra'
  ],
  motion: [
    'slow motion', 'fast motion', 'tracking', 'orbit', 'push in',
    'pull out', 'pan', 'tilt', 'dolly', 'handheld', 'gimbal',
    'steady', 'fluid', 'continuous', 'dynamic', 'energetic'
  ],
  audio: [
    'asmr', 'sound effects', 'sfx', 'ambient audio', 'dialogue',
    'lip sync', 'voice acting', 'dubbing', 'soundtrack', 'music'
  ]
};

function countMatches(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.reduce((count, kw) => {
    return lower.includes(kw.toLowerCase()) ? count + 1 : count;
  }, 0);
}

function detectPlaceholders(prompt, formValues) {
  if (!prompt) return true;
  if (prompt.includes('<<<')) return true;
  // Check if any critical field is empty
  const criticalFields = ['subject', 'action', 'context', 'scene_summary', 'cinematography', 'composition', 'style', 'style_ambiance'];
  const hasEmptyCritical = criticalFields.some(fieldId => {
    const val = formValues[fieldId];
    return val !== undefined && val !== null && String(val).trim() === '';
  });
  return hasEmptyCritical;
}

function checkTextLength(text) {
  if (!text) return 0;
  return text.length;
}

export function calculatePromptScore(prompt, formValues, currentModeId) {
  if (!prompt) {
    return { score: 0, label: 'Incompleto', tips: ['Preencha os campos para gerar um prompt.'], color: '#ff5252' };
  }

  const hasPlaceholders = detectPlaceholders(prompt, formValues);

  // Base score
  let score = 0;
  const tips = [];

  // 1. Completeness (40 points)
  if (hasPlaceholders) {
    score += 10;
    tips.push('Preencha todos os campos marcados para aumentar a qualidade do resultado.');
  } else {
    score += 40;
  }

  // 2. Content richness (20 points)
  const length = checkTextLength(prompt);
  if (length > 800) {
    score += 20;
  } else if (length > 400) {
    score += 15;
    tips.push('Adicione mais detalhes à descrição para um resultado mais preciso.');
  } else if (length > 200) {
    score += 10;
    tips.push('O prompt está curto. Descreva mais elementos visuais para melhores resultados.');
  } else {
    score += 5;
    tips.push('Prompt muito curto. Seja específico sobre sujeito, ação e cenário.');
  }

  // 3. Technical terms (30 points)
  let techScore = 0;

  const lightingMatches = countMatches(prompt, KEYWORD_CATEGORIES.lighting);
  if (lightingMatches >= 2) {
    techScore += 8;
  } else if (lightingMatches >= 1) {
    techScore += 4;
    tips.push('Adicione termos de iluminação (ex: golden hour, cinematic lighting, neon) para atmosfera premium.');
  } else {
    tips.push('Inclua termos de iluminação para criar profundidade e emoção na cena.');
  }

  const cameraMatches = countMatches(prompt, KEYWORD_CATEGORIES.camera);
  if (cameraMatches >= 2) {
    techScore += 8;
  } else if (cameraMatches >= 1) {
    techScore += 4;
    tips.push('Especifique mais detalhes de câmera (ex: close-up, 85mm f/1.4, tracking shot).');
  } else {
    tips.push('Defina o ângulo e tipo de câmera para controlar a composição visual.');
  }

  const qualityMatches = countMatches(prompt, KEYWORD_CATEGORIES.quality);
  if (qualityMatches >= 2) {
    techScore += 7;
  } else if (qualityMatches >= 1) {
    techScore += 3;
    tips.push('Adicione termos de qualidade como "8k", "sharp focus" ou "hyper-realistic".');
  } else {
    tips.push('Inclua indicadores de qualidade (ex: 8k, photorealistic) para maior fidelidade.');
  }

  const styleMatches = countMatches(prompt, KEYWORD_CATEGORIES.style);
  if (styleMatches >= 1) {
    techScore += 7;
  } else {
    tips.push('Defina um estilo artístico ou visual (ex: cyberpunk, Studio Ghibli, oil painting).');
  }

  score += techScore;

  // 4. Mode-specific bonuses (10 points)
  let modeBonus = 0;
  if (currentModeId?.startsWith('video-')) {
    const motionMatches = countMatches(prompt, KEYWORD_CATEGORIES.motion);
    const audioMatches = countMatches(prompt, KEYWORD_CATEGORIES.audio);
    if (motionMatches >= 1) modeBonus += 5;
    else tips.push('Para vídeos, especifique o movimento da câmera (tracking, orbit, dolly).');

    if (audioMatches >= 1) modeBonus += 5;
    else tips.push('Considere adicionar direções de áudio, efeitos sonoros ou diálogos.');
  } else if (currentModeId?.startsWith('photo-')) {
    const compositionField = formValues['composition'] || '';
    if (compositionField && !compositionField.includes('<<<') && compositionField.trim().length > 0) {
      modeBonus += 5;
    } else {
      tips.push('Defina a composição da imagem (ex: rule of thirds, macro, wide shot).');
    }
    const styleField = formValues['style'] || formValues['style_ambiance'] || '';
    if (styleField && !styleField.includes('<<<') && styleField.trim().length > 20) {
      modeBonus += 5;
    } else {
      tips.push('Descreva o estilo com mais detalhes para resultados mais precisos.');
    }
  }
  score += modeBonus;

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Determine label and color
  let label, color;
  if (score >= 90) {
    label = 'Excepcional';
    color = '#00e5ff';
  } else if (score >= 75) {
    label = 'Muito Bom';
    color = '#00c853';
  } else if (score >= 60) {
    label = 'Bom';
    color = '#ffd700';
  } else if (score >= 40) {
    label = 'Regular';
    color = '#ff9800';
  } else {
    label = 'Básico';
    color = '#ff5252';
  }

  // Deduplicate tips
  const uniqueTips = [...new Set(tips)].slice(0, 3);

  // If score is high, give positive reinforcement
  if (score >= 80 && uniqueTips.length === 0) {
    uniqueTips.push('Prompt excelente! Alta chance de gerar um resultado profissional.');
  }

  return { score, label, tips: uniqueTips, color };
}
