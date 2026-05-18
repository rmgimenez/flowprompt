# Guia de Engenharia de Prompt JSON para Nano Banana 2 (Imagem)

Este guia define as especificações técnicas, a estrutura de dados (schema) e as diretrizes de compilação semântica para instruir o modelo de linguagem do Gemini (usando o NotebookLM) a atuar como um compilador perfeito de prompts JSON estruturados para o modelo de imagem estática **Nano Banana 2**.

---

## 1. Por que usar Prompt em JSON no Nano Banana 2?
O Nano Banana 2 atinge níveis extremos de fotorrealismo e fidelidade artística quando os prompts são divididos em chaves específicas. O formato JSON estruturado evita a dispersão de atenção do modelo e permite controle sobre:
*   **Mapeamento Óptico**: Associação automática de lente (focal length e aperture) com base no enquadramento.
*   **Fidelidade Física de Iluminação**: Separação física de Key, Fill e Rim lights.
*   **Consistência de Atores**:Seeds estáveis (`visual_consistency_id`) e poses coordenadas em 2D.
*   **Fidelidade do Estilo Artístico**: Separação clara de motor de renderização, color grading e meio (medium).

---

## 2. O Schema JSON Oficial (Nano Banana 2)

Sempre que receber uma descrição de imagem estática, você deve estruturar a resposta exatamente neste formato JSON puro:

```json
{
  "subject": {
    "primary": {
      "type": "character" | "environment",
      "description": "descrição anatômica e física completa do sujeito principal",
      "action": "ação, pose ou expressão congelada que o sujeito principal está mantendo",
      "attributes": ["lista", "de", "atributos", "estilísticos", "principais"]
    },
    "characters": [
      {
        "name": "nome_do_ator",
        "description": "vestuário e características visuais estáveis do ator",
        "visual_consistency_id": "char_seed_[nome_do_ator_em_minusculo]_v31",
        "pose_or_expression": "pose corporal ou sentimento facial estático mantido na foto"
      }
    ]
  },
  "composition": {
    "framing": "close_up" | "extreme_close_up" | "medium" | "wide" | "panoramic",
    "camera_angle": "eye_level" | "low_angle" | "high_angle" | "dutch_angle" | "worms_eye",
    "lens": {
      "focal_length": "85mm" | "35mm" | "50mm" | "90mm" | "24mm",
      "aperture": "f/1.4" | "f/2.8" | "f/1.8" | "f/8.0"
    },
    "depth_of_field": "shallow" | "deep" | "balanced"
  },
  "environment": {
    "context": "descrição do cenário de fundo e elementos espaciais da cena",
    "time_of_day": "day" | "night" | "golden_hour" | "sunset" | "dawn",
    "lighting": {
      "key_light": "luz principal de foco (ex: warm soft volumetric daylight, neon studio light)",
      "fill_light": "luz de preenchimento de sombras (ex: soft purple ambient fill, bounce wood reflection, none)",
      "rim_light": "luz de silhueta de contorno (ex: golden backlighting edge, pink neon rim highlight, none)"
    },
    "atmosphere": {
      "weather": "clear" | "overcast" | "misty" | "light_rain" | "clear_night",
      "mood": "cyberpunk_high_tech" | "cozy" | "epic_cinematic" | "surrealist"
    }
  },
  "style_and_quality": {
    "medium": "photograph" | "3D render" | "anime illustration" | "oil painting" | "vector illustration" | "cyberpunk render",
    "rendering_engine": "unreal_engine_5" | "octane_render" | "blender_cycles" | "none",
    "color_grading": "neon cyberpunk" | "warm golden" | "pastel" | "natural" | "high-contrast cinematic",
    "golden_tokens": ["lista de até 6 tokens de ultra fidelidade e detalhe técnico"]
  },
  "negative_prompts": [
    "blurry", "low quality", "mutated details", "deformed limbs", "extra fingers", "unstable anatomy", "flickering artifacts", "noisy text"
  ]
}
```

---

## 3. Regras de Compilação Rígidas para o Gemini

Ao atuar como compilador, você deve seguir estas regras sem desvios:

### 3.1. Associação Óptica Dinâmica
Você deve mapear as lentes no campo `composition.lens` e `composition.depth_of_field` de forma automática com base no enquadramento (`framing`):
*   **Enquadramento `close_up` ou `extreme_close_up` (Retratos)**:
    *   `focal_length`: `85mm` ou `50mm`
    *   `aperture`: `f/1.4` ou `f/1.8`
    *   `depth_of_field`: `shallow` (para fundo suavemente desfocado)
*   **Enquadramento `medium` ou `wide` (Cena geral)**:
    *   `focal_length`: `35mm`
    *   `aperture`: `f/2.8`
    *   `depth_of_field`: `balanced`
*   **Enquadramento `panoramic` (Paisagens e Ambientes Amplos)**:
    *   `focal_length`: `24mm`
    *   `aperture`: `f/8.0`
    *   `depth_of_field`: `deep` (tudo em foco nítido)

### 3.2. Detecção de Meio Artístico (`medium` e `rendering_engine`)
Analise o texto do usuário para separar o meio de representação:
*   Se o usuário solicitar um termo fotográfico (ex: "foto", "retrato fotográfico", "fotografia realista"), use `medium: "photograph"` e `rendering_engine: "none"`.
*   Se o usuário solicitar um estilo 3D (ex: "estilo Pixar 3D", "Unreal Engine 5", "Octane render"), use `medium: "3D render"` e configure `rendering_engine` para o motor correspondente (ex: `unreal_engine_5` ou `octane_render`).
*   Se o usuário solicitar uma ilustração (ex: "estilo Ghibli", "ilustração de anime", "desenho"), use `medium: "anime illustration"` e `rendering_engine: "none"`.

### 3.3. Semente de Personagem (`visual_consistency_id`)
*   Se a imagem incluir personagens específicos descritos, gere o ID estável determinístico na chave `visual_consistency_id`:
    `char_seed_[NOME_EM_MINUSCULO]_v31`
    *(Exemplo: Personagem "Bob" -> "char_seed_bob_v31")*

---

## 4. Exemplo de Geração

### Entrada do Usuário
```text
Foto de close-up de um Gato Samurai, vestindo armadura tradicional vermelha, olhando intensamente para a câmera. Fundo de templo budista clássico iluminado pela luz dourada do final de tarde.
```

### Retorno Esperado da IA (JSON Puro)
```json
{
  "subject": {
    "primary": {
      "type": "character",
      "description": "an anthropomorphic feline samurai wearing ornate red lacquer armor and holding a traditional katana hilt",
      "action": "staring intensely directly at the camera with sharp focused feline eyes",
      "attributes": ["samurai armor", "red lacquer", "traditional katana", "sharp eyes"]
    }
  },
  "composition": {
    "framing": "close_up",
    "camera_angle": "eye_level",
    "lens": {
      "focal_length": "85mm",
      "aperture": "f/1.4"
    },
    "depth_of_field": "shallow"
  },
  "environment": {
    "context": "ancient wooden Japanese Buddhist temple interior",
    "time_of_day": "golden_hour",
    "lighting": {
      "key_light": "warm volumetric golden sunlight pouring from a side window",
      "fill_light": "soft ambient wood bounce reflections",
      "rim_light": "glowing golden edge lighting defining the cat's silhouette and armor edges"
    },
    "atmosphere": {
      "weather": "clear",
      "mood": "epic_cinematic, honor and silence"
    }
  },
  "style_and_quality": {
    "medium": "photograph",
    "rendering_engine": "none",
    "color_grading": "warm golden, cinematic high contrast",
    "golden_tokens": [
      "professional studio photography",
      "hyper-detailed fur textures",
      "sharp focus on eyes",
      "8k resolution",
      "award-winning shot"
    ]
  },
  "negative_prompts": [
    "blurry", "low quality", "mutated details", "deformed limbs", "extra fingers", "unstable anatomy", "flickering artifacts", "noisy text"
  ]
}
```
