const TITLE_REGEXES = [
  /1\.\s+\*\*Título[^*]*\*\*:\s*([^\n]+)/i,
  /Título[^\n:]*:\s*([^\n]+)/i,
  /#\s+Título[^\n]*\n+([^\n]+)/i,
  /\*\*Título\*\*:\s*([^\n]+)/i
];

const CAPTION_REGEXES = [
  /2\.\s+\*\*Legenda[^*]*\*\*:\s*([\s\S]*?)(?=\n\n\d\.|\n\n---|```json|$)/i,
  /Legenda[^\n:]*:\s*([\s\S]*?)(?=\n\n\d\.|\n\n---|```json|$)/i,
  /\*\*Legenda\*\*:\s*([\s\S]*?)(?=\n\n\d\.|\n\n---|```json|$)/i
];

const JSON_BLOCK_REGEX = /```json\s*([\s\S]*?)```/g;
const HASHTAG_REGEX = /#\w+/g;

export function cleanAndParseJSON(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch {
    try {
      let cleaned = jsonStr.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
      cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
      cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
      cleaned = cleaned.replace(/'/g, '"');
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  }
}

function extractWithFallback(text, regexes) {
  for (const regex of regexes) {
    const match = text.match(regex);
    if (match && match[1]) {
      return match[1].replace(/["']/g, '').trim();
    }
  }
  return '';
}

function extractCaptionFallback(text) {
  const hashtagIndex = text.indexOf('#');
  if (hashtagIndex === -1) return '';
  const priorText = text.substring(0, hashtagIndex);
  const paragraphs = priorText.split('\n\n');
  return paragraphs[paragraphs.length - 1].trim();
}

export function extractSlidesFromText(text) {
  const slides = [];
  let match;
  while ((match = JSON_BLOCK_REGEX.exec(text)) !== null) {
    const rawJson = match[1].trim();
    const parsedJson = cleanAndParseJSON(rawJson);
    if (parsedJson) {
      slides.push({ raw: rawJson, parsed: parsedJson });
    }
  }
  return slides;
}

export function parseAIResponse(rawText, theme = '') {
  const title = extractWithFallback(rawText, TITLE_REGEXES);
  let caption = extractWithFallback(rawText, CAPTION_REGEXES);
  if (!caption) {
    caption = extractCaptionFallback(rawText);
  }
  const hashtags = rawText.match(HASHTAG_REGEX) || [];
  const slides = extractSlidesFromText(rawText);

  return {
    title: title || theme || 'Coleção de Fotos Viral',
    caption: caption || 'Carrossel incrível estruturado pelo FlowPrompt.',
    hashtags: hashtags.length > 0 ? hashtags.join(' ') : '#viral #carrossel #nano2 #art',
    slides
  };
}

export function buildParserFeedback(slides, hasTitle, hasCaption) {
  if (slides.length === 0) {
    return { type: 'error', message: 'Nenhum prompt JSON válido no formato do Nano Banana 2 foi encontrado no texto.' };
  }
  if (!hasTitle || !hasCaption) {
    return {
      type: 'warning',
      message: `Sucesso parcial! Carregamos ${slides.length} slides, mas não identificamos o Título ou a Legenda. Preenchemos com dados simulados.`
    };
  }
  return {
    type: 'success',
    message: `Sensacional! Extraímos com sucesso o Título, Legenda e os ${slides.length} slides de imagem.`
  };
}
