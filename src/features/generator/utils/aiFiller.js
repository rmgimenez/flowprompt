/**
 * Utility to query OpenRouter and dynamically fill form fields based on user instructions.
 */

export async function fillFormWithAI(userInstructions, fields, currentModeTitle) {
  const isProduction = import.meta.env.PROD;
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'deepseek/deepseek-v4-flash';

  // If in production or if no VITE api key is found, call our secure serverless endpoint
  if (isProduction || !apiKey || apiKey.trim() === '') {
    const response = await fetch('/api/fill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInstructions,
        fields,
        currentModeTitle
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData?.error === 'API_KEY_MISSING') {
        throw new Error('API_KEY_MISSING');
      }
      throw new Error(errorData?.error || `Erro na API segura: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  // Filter out informational or static instructions card fields
  const interactiveFields = fields.filter(f => f.type !== 'info');

    const fieldsSchema = interactiveFields.map(f => {
      let schemaStr = `- ID: "${f.id}"\n  Label: "${f.label}"\n  Tipo: "${f.type}"`;
      if (f.hint) schemaStr += `\n  Dica/Contexto: "${f.hint}"`;
      if (f.placeholder) schemaStr += `\n  Exemplo: "${f.placeholder}"`;
      if (f.suggestions && Array.isArray(f.suggestions)) {
        if (f.type === 'select') {
          schemaStr += `\n  Opções aceitas (você DEVE escolher rigorosamente e apenas um destes valores exatos): ${f.suggestions.map(s => `"${s.value}"`).join(', ')}`;
        } else {
          const sugValues = f.suggestions.map(s => {
            if (typeof s.value === 'object') {
              return JSON.stringify(s.value);
            }
            return `"${s.value}"`;
          }).join(', ');
          schemaStr += `\n  Sugestões de exemplo (opcionais, apenas para inspiração. NÃO copie estes valores exatos; priorize criar valores novos, altamente personalizados e criativos com base estritamente no pedido do usuário): ${sugValues}`;
        }
      }
      if (f.type === 'characters-table') {
        schemaStr += `\n  Estrutura esperada: Array JSON de objetos (ATENÇÃO: retorne como um Array JSON nativo contendo objetos, NÃO serialize como String) com as propriedades:
    - name: Nome do personagem (curto, minúsculo, ex: 'morango')
    - appearance: Aparência visual detalhada em Inglês (ex: 'cute red fruit character with strawberry face')
    - clothing: Vestimenta em Inglês (ex: 'tiny white leaf collar')
    - motion: Movimento. Escolha apenas entre 'composed_natural' (Natural) ou 'high_energy_expressive' (TikTok/Vibrante)
    - voice: Voz e tom do personagem em Inglês (ex: 'sweet high-pitched voice')`;
      }
      return schemaStr;
    }).join('\n\n');

  const systemPrompt = `Você é um assistente especialista em Engenharia de Prompts para geração de fotos (Nano Banana) e vídeos virais (Sora, Luma, Veo, Kling).
O usuário está na tela: "${currentModeTitle}".
Você deve receber uma instrução do usuário em português ou inglês e mapear essa descrição para os campos do formulário listados abaixo.

Retorne APENAS um objeto JSON válido, onde as chaves são os IDs dos campos e os valores são os conteúdos preenchidos para esses campos.
Não escreva nenhuma explicação antes ou depois do JSON. Não envolva o JSON em blocos de código com crases (ex: \`\`\`json ... \`\`\`). Retorne apenas o texto puro do JSON.

CAMPOS DISPONÍVEIS E SEUS REQUISITOS:
${fieldsSchema}

REGRAS DE PREENCHIMENTO:
1. Mapeie a descrição do usuário de forma inteligente para todos os campos relevantes.
2. Seja criativo e rico em detalhes para preencher os campos que não foram detalhados, mas que combinam com a ideia central da cena do usuário.
3. Se o campo for de estilo, câmera ou composição, use as terminologias técnicas ideais em inglês para maximizar a qualidade visual (ex: close-up shot, depth of field, sharp focus, 8k resolution, cinematic lighting).
4. Para o campo 'characters_definition' (se disponível), extraia ou invente personagens criativos descritos pelo usuário. Preencha TODAS as propriedades de cada personagem em inglês, conforme a estrutura esperada.
5. Se houver um campo de diálogo ('dialogue'), escreva falas divertidas no formato "[personagem] (expressão): [Fala]" correspondente aos personagens do 'characters_definition'.
6. Importante: valores de texto/descrição para campos como 'subject', 'action', 'context', 'style', 'clothing', 'appearance', 'voice' devem ser preenchidos preferencialmente em INGLÊS para melhor desempenho nas IAs de imagem/vídeo, a menos que o usuário peça especificamente em português ou que o contexto faça mais sentido em português (como diálogos).
7. ATENÇÃO A PEDIDOS DE SILÊNCIO/MUDO: Se o usuário pedir explicitamente para o vídeo ser sem som, sem falas, silencioso ou mudo, você DEVE deixar o campo 'dialogue' completamente vazio ("") e direcionar toda a ação física do sujeito ('action') e movimentos dos personagens para ações corporais puramente visuais (ex: 'dancing happily', 'running fast', 'gesturing') em vez de conversar ou falar.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'Flow Prompt',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userInstructions }
      ],
      temperature: 0.7,
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Erro na API do OpenRouter: ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error('A IA retornou uma resposta vazia.');
  }

  // Clean raw JSON formatting if the AI still returned backticks despite the prompt
  let jsonText = text;
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
  }

  try {
    const parsedData = JSON.parse(jsonText);
    return parsedData;
  } catch (err) {
    console.error('Failed to parse JSON response:', text, err);
    // Regex fallback to extract anything between { and }
    const match = jsonText.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerErr) {
        throw new Error('Falha ao formatar a resposta da IA como JSON.', { cause: innerErr });
      }
    }
    throw new Error('A IA não retornou um JSON válido.', { cause: err });
  }
}
