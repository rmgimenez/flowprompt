# 🎬 FlowPrompt - Novo Criador de Personagens e Direção de Áudio

Este documento detalha o design técnico e as decisões tomadas no processo de brainstorming para aprimorar a naturalidade de diálogos em português (pt-BR) do motor Veo 3.1 no FlowPrompt, assim como a introdução do novo Criador de Personagens Estruturado.

---

## 🎯 Entendimento Geral

### O Problema
Falas geradas pelas ferramentas de vídeo padrão do Veo 3.1 soavam robóticas ou excessivamente formais, falhando em reter público no TikTok/Reels por falta de naturalidade, sotaque coloquial brasileiro e timing cômico. Adicionalmente, o cadastro de personagens no formato de caixas de texto brutas com brackets `[nome][descrição][tom]` prejudicava a experiência do usuário e propiciava erros de formatação.

### As Soluções Propostas
1.  **Direção Cênica de Áudio (Estruturada):** Introdução da chave `"voice_acting_direction"` no objeto `"audio"` do JSON do Veo 3.1 para instruir explicitamente o motor de voz sobre entonação, sotaque e timing cômico de criador do TikTok.
2.  **Escrita Coloquial de Diálogos:** Instruir ativamente o Gemini Gem (`gems-veo-3.1.md`) e os exemplos de diálogo na interface Web a escreverem falas super coloquiais em pt-BR com gírias virais (ex: *"Fala galera!", "meu parceiro", "confia"*).
3.  **Criador de Personagens Interativo (Tabela + Sugestões):** Substituir o textarea padrão de personagens por uma tabela dinâmica e polida com campos individuais (Nome, Aparência, Vestimenta, Assinatura de Movimento e Voz) com opções rápidas de preenchimento.
4.  **Atalhos de Integração de Campos:** Inserção automática de falas estruturadas no cursor do campo de dublagem e descrição no campo sujeito com um único clique com base nos personagens cadastrados.

---

## 📐 Especificações de Design

### 1. JSON Schema de Áudio Enriquecido
O objeto `"audio"` gerado em todos os modos de vídeo (`video-new`, `video-from-img` e `video-from-frames`) passa a conter a seguinte estrutura quando diálogos estão presentes:

```json
"audio": {
  "sound_effects": "SFX description...",
  "rules": "Always add audio. Never include subtitles or on-screen text overlays.",
  "dialogue": [
    {
      "character": "Name",
      "speech": "Falas coloquiais em pt-BR com gírias...",
      "emotion_tone": "natural" | "excited" | "laughing" | "thoughtful" | "angry",
      "timing": { "start": 0.0, "end": 2.5 },
      "voice_pacing": "moderate" | "lively",
      "ducking_level_db": -12
    }
  ],
  "language": "pt-BR",
  "lip_sync": "perfect",
  "voice_acting_direction": {
    "accent": "natural Brazilian Portuguese (pt-BR) accent with authentic pronunciation, zero robotic formalisms",
    "delivery_style": "energetic, comedic, charismatic, and expressive like a modern TikTok/Reels influencer vlog",
    "comedic_timing": "modern comedic influencer timing, utilizing subtle awkward pauses, realistic conversational breaths, and meme-style pacing"
  }
}
```

### 2. Mudanças no Gemini Gem (`gems-veo-3.1.md`)
*   **Regra 3:** Atualizada para exigir falas coloquiais, fluidas e com gírias virais de influenciador no Brasil.
*   **Esquema JSON:** Inclusão de `voice_acting_direction` nos modos relevantes.
*   **Few-Shots:** Atualizados para demonstrar as novas falas e o novo bloco de direção de áudio.

### 3. Criador de Personagens na UI (`PromptForm.jsx`)
*   **Tipo do Campo:** `characters_definition` alterado para `type: 'characters-table'`.
*   **Campos de Entrada por Linha:**
    *   *Nome:* Texto (ex: `worker`).
    *   *Aparência (Inglês):* Texto + Opções rápidas (ex: `young man`, `elderly man`, `cute character`).
    *   *Roupas (Inglês):* Texto + Opções rápidas (ex: `hoodie`, `t-shirt`, `armor`).
    *   *Movimento:* Dropdown (`composed_natural` ou `high_energy_expressive`).
    *   *Tom de Voz (Inglês):* Texto + Opções rápidas (ex: `energetic TikTok voice`, `sweet voice`).
*   **Automação na Fórmula:**
    *   A descrição do personagem enviada à IA será a combinação automática: `[Aparência] wearing [Roupas]`.
    *   A voz enviada à IA será o **Tom de Voz**.
    *   O movimento será associado à chave `motion_signature` correspondente.

---

## 🛠️ Log de Decisões

*   **Decisão 1:** Uso de `voice_acting_direction` estruturado sob `audio` no JSON final do Veo 3.1.
*   **Decisão 2:** Redesenho do campo de cadastro de personagens para um Criador de Personagens em Tabela Interativa de alta fidelidade visual.
*   **Decisão 3:** Inclusão de chips de preenchimento rápido (sugestões) nos subcampos da tabela.
*   **Decisão 4:** Botões de atalho acima dos campos de Roteiro/Falas (`dialogue`) e Sujeito (`subject`) para autocompletar nomes e descrições dos personagens selecionados.
