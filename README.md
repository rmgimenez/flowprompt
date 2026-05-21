# FlowPrompt — Gerador de Prompts para Google Flow

FlowPrompt é uma SPA (Single Page Application) interativa para criação de prompts estruturados direcionados aos modelos de IA generativa do Google: **Nano Banana 2** (imagens) e **Veo** (vídeos). Além dos modos de fórmula, inclui ferramentas especializadas para coleções virais TikTok, empilhamento Pinterest e montagem de fotos.

**🌐 Produção:** [flowprompt-blue.vercel.app](https://flowprompt-blue.vercel.app)

---

## Sumário

- [Tech Stack](#tech-stack)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
  - [Estrutura de Diretórios](#estrutura-de-diretórios)
  - [Roteamento](#roteamento)
  - [Fluxo de Dados](#fluxo-de-dados)
  - [Contextos e Hooks](#contextos-e-hooks)
  - [Persistência](#persistência)
- [Pré-requisitos](#pré-requisitos)
- [Começando Localmente](#começando-localmente)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Implantação](#implantação)
- [Troubleshooting](#troubleshooting)
- [Contribuindo](#contribuindo)
- [Links Úteis](#links-úteis)
- [Licença](#licença)

---

## Tech Stack

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Linguagem** | JavaScript (ES2024+) | — |
| **UI** | React | ^19.2.6 |
| **Roteamento** | React Router DOM | ^7.15.1 |
| **Build** | Vite | ^8.0.12 |
| **Plugins Vite** | @vitejs/plugin-react | ^6.0.1 |
| **Animações** | Framer Motion | ^12.38.0 |
| **Ícones** | Lucide React | ^1.14.0 |
| **CSS** | CSS Modules + Tailwind Merge + clsx | ^3.6.0 / ^2.1.1 |
| **Analytics** | @vercel/analytics | ^2.0.1 |
| **Linter** | ESLint | ^10.3.0 |
| **Gerenciador** | pnpm | — |

Não há dependências de backend, banco de dados ou runtime server-side. O projeto é 100% client-side.

---

## Funcionalidades

### 🎬 Modos de Geração — Vídeo (Veo)

- **Vídeo Novo** (`/video-new`): Cria prompts para geração de vídeos cinematográficos a partir de descrições textuais. Campos: sujeito, ação, ângulo de câmera, iluminação, paleta de cores, estilo visual, efeitos sonoros (SFX).
- **Vídeo de Imagem** (`/video-from-img`): Anima uma imagem estática adicionando movimento de câmera (pan, zoom, tilt) e camada de SFX.
- **Interpolação (2 Frames)** (`/video-from-frames`): Gera transições entre dois frames de referência com controle de câmera e áudio.

### 📸 Modos de Geração — Foto (Nano Banana 2)

- **Foto Nova** (`/photo-new`): Gera prompts para fotografias e ilustrações com controle de composição, iluminação, cores e estilo.
- **Transformar Foto** (`/photo-transform`): Reimagina imagens existentes aplicando novos estilos artísticos ou alterando o cenário.

### 🛠️ Ferramentas Especiais

#### Coleção TikTok (Nano Banana 2)

Cria prompts mestre para posts de carrossel no TikTok. A interface inclui:

- **Viral Score**: Pontuação em tempo real (0–100%) baseada em 5 fatores de coerência (tema-alvo, gancho-nicho, estilo-tendência, legibilidade, densidade informacional).
- **Trends Radar**: Painel com 28 temas em alta no TikTok Brasil, organizados em 6 categorias (Humor, Relacionamentos, Fitness, Carreira, Comida, Games).
- **Hook Optimizer**: Gerador de ganchos virais para o Slide 1 em 5 categorias (Curiosidade, Identificação, Urgência, Lista, Opinião Polêmica).
- **Combos de Alta Conversão**: 6 presets prontos (Gen-Z Viral, Storytelling, Estoico & Superação, Motivacional, Aesthetic/Calm, Cultura Geek).
- **Analytics Tracker**: Registro de métricas reais (views, likes, comments, shares, saves) com resumo de performance por período.
- **TikTokDrawer**: Simulador de feed TikTok com molde de smartphone, carrossel de slides e botões de interação.
- **Gerador de Tema Aleatório**: Mashup com 18.000 combinações (sujeito × ação × twist narrativo).
- **56 Estilos Visuais**: Diretores (Wes Anderson, Tarantino, Nolan, Kubrick), animação (Pixar, Claymation, Ghibli), arte clássica (Da Vinci, Van Gogh, Monet), efeitos (Cyberpunk, Synthwave, Steampunk) e muito mais.
- **Histórico Inteligente**: Salvamento automático dos últimos 50 prompts com restauração completa de configurações.

#### Empilhador Pinterest (`/image-stacker`)

Junta múltiplas fotos em um único pin vertical (stack). Suporta reordenação drag-and-drop, espaçamento ajustável, cor de fundo customizável e exportação PNG/JPG com canvas de 1000px de largura.

#### Montagem de Fotos (`/photo-montage`)

Combina fotos em grid personalizado com até 5 colunas, espaçamento ajustável, cor de borda, modo de encaixe (cover/contain) e redimensionamento por lado maior (até 2500px). Inclui preview em tempo real e filmstrip com reordenação.

### ⚡ Produtividade e UX

- **Sistema de Favoritos**: Marque prompts como favoritos para acesso permanente.
- **Restauração de Estado**: Recarregue um prompt salvo preenchendo todos os campos e alterando o modo automaticamente.
- **Preenchimento com IA**: Modal que preenche todos os campos via linguagem natural usando a API do OpenRouter.
- **Chips de Sugestão**: Sugestões contextuais para estilos, ângulos e ações.
- **Interface Glassmorphism**: Tema escuro nativo, animações fluidas com Framer Motion, backdrop-filter.
- **Atalhos de Teclado**: Teclas `1-9` para navegar entre modos, `Ctrl+C` para copiar prompt.
- **Sidebar com 3 abas**: Modos (categorizado), Histórico, Favoritos.

---

## Arquitetura

### Estrutura de Diretórios

```
├── src/
│   ├── components/               # Componentes de UI reutilizáveis
│   │   └── ui/
│   │       ├── GlassCard.jsx     # Container glassmorphism
│   │       └── ToolPageLayout.jsx# Layout compartilhado (ImageStacker, Montage)
│   │
│   ├── contexts/                 # Contextos React (Providers + Hooks)
│   │   ├── FormContext.jsx       # Estado do formulário ativo
│   │   ├── PersistenceContext.jsx# Histórico + Favoritos + LocalStorage
│   │   ├── GeneratorContext.jsx  # Provider composto (ambos os contextos)
│   │   └── useGeneratorContext.js# Hooks de consumo (useGeneratorContext, useModeContext)
│   │
│   ├── features/
│   │   └── generator/
│   │       ├── components/
│   │       │   ├── About/        # Página "Sobre"
│   │       │   ├── Form/         # PromptForm, AIModal, CharacterChips, etc.
│   │       │   ├── ImageMontage/ # Montagem de Fotos
│   │       │   ├── ImageStacker/ # Empilhador Pinterest
│   │       │   ├── Preview/      # PromptPreview
│   │       │   ├── Sidebar/      # Sidebar, SavedItem, ModeItem
│   │       │   └── TikTokCollections/  # Feature completa TikTok
│   │       │       ├── components/
│   │       │       │   ├── actions/     # ActionButtons, FloatingActionButtons
│   │       │       │   ├── analytics/   # AnalyticsTracker
│   │       │       │   ├── form/        # ThemeInput, QuantityStepper, etc.
│   │       │       │   ├── history/     # HistoryModal
│   │       │       │   └── indicators/  # ViralScore, TrendsRadar, HookOptimizer
│   │       │       ├── constants/  # 56 estilos, 27 cores, 26 vibes, 24 targets
│   │       │       ├── hooks/      # useTikTokHistory
│   │       │       └── utils/      # parseAIResponse, geração de prompt
│   │       ├── constants/
│   │       │   ├── modes.js       # Mapa de modos → definições de fórmula
│   │       │   ├── modes/         # Fórmulas individuais (videoNew, photoNew, etc.)
│   │       │   ├── templates.js   # Templates de prompt
│   │       │   └── viralPrompts.js# Dados de VIRAL_PROMPTS
│   │       ├── hooks/             # Hooks compartilhados do generator
│   │       │   ├── useFormState.js
│   │       │   ├── useGenerator.js
│   │       │   ├── usePersistence.js
│   │       │   └── useImageManager.js
│   │       └── styles/
│   │
│   ├── layouts/
│   │   └── MainLayout.module.css  # Estilos do layout principal
│   │
│   ├── pages/
│   │   ├── AppShell.jsx           # Shell principal (Sidebar + Router)
│   │   ├── ModeRouter.jsx         # Dispatch interno de páginas
│   │   ├── FormulaPage.jsx        # Página genérica para modos de fórmula
│   │   ├── TikTokCollectionsPage.jsx
│   │   ├── ImageStackerPage.jsx
│   │   ├── PhotoMontagePage.jsx
│   │   └── AboutPage.jsx
│   │
│   ├── styles/                    # Tokens e variáveis CSS globais
│   ├── App.jsx                    # Entry point do React Router
│   └── main.jsx                   # Bootstrap (ReactDOM + BrowserRouter)
│
├── gems/                          # Documentação dos modelos Google
│   ├── gems-nanobanana-2.md
│   ├── gems-veo-3.1.md
│   └── opcoes-tela-colecao-tiktok.md
│
├── .env                           # Variáveis locais (NÃO comitar)
├── .env.exemplo                   # Template de variáveis de ambiente
├── index.html                     # HTML entry point
├── vite.config.js                 # Configuração Vite
└── package.json
```

### Roteamento

O React Router DOM gerencia as rotas:

```jsx
<Routes>
  <Route path="/:modeId" element={<AppShell />} />
  <Route path="*" element={<Navigate to="/tiktok-collections" replace />} />
</Routes>
```

| Rota | Página | Tipo |
|------|--------|------|
| `/tiktok-collections` | TikTokCollectionsPage | Ferramenta Custom |
| `/image-stacker` | ImageStackerPage | Ferramenta Custom |
| `/photo-montage` | PhotoMontagePage | Ferramenta Custom |
| `/video-new` | FormulaPage (vídeo) | Fórmula |
| `/video-from-img` | FormulaPage (vídeo) | Fórmula |
| `/video-from-frames` | FormulaPage (vídeo) | Fórmula |
| `/photo-new` | FormulaPage (foto) | Fórmula |
| `/photo-transform` | FormulaPage (foto) | Fórmula |
| `/about` | AboutPage | Informação |
| `/` | Redireciona → `/tiktok-collections` | — |

O `AppShell` extrai `modeId` dos params da URL, verifica se o modo existe em `MODES`, e renderiza `Sidebar` + `ModeRouter`. O `ModeRouter` faz o dispatch entre páginas baseado em `currentMode.isCustom` e `currentMode.isAbout`.

### Fluxo de Dados

```
1. Usuário navega → /:modeId
2. AppShell → lê modeId dos params
3. GeneratorProvider (FormContext + PersistenceContext) envolve a árvore
4. ModeRouter → renderiza a página correta (FormulaPage ou página custom)
5. FormulaPage → PromptForm coleta inputs → useMemo computa o prompt final
6. PromptPreview exibe o prompt → botão Copiar → addToHistory (localStorage)
7. Restauração → SavedItem → loadSavedItem (injeta valores no FormContext)
```

#### Contextos e Hooks

O estado global é dividido em dois contextos para evitar re-renders em cascata:

| Contexto | Responsabilidade | Consumido por |
|----------|-----------------|---------------|
| `FormContext` | `formValues`, `currentMode`, `updateField`, `addSuggestion`, `randomize`, `clearFields`, `applyPreset` | FormulaPage, PromptForm |
| `PersistenceContext` | `history`, `favorites`, `addToHistory`, `toggleFavorite`, `loadSavedItem`, `removeHistoryItem` | Sidebar (HistoryTab, FavoritesTab), PromptPreview |

O hook `useGeneratorContext()` faz merge dos dois contextos. O hook `useModeContext()` expõe apenas `currentMode` e `currentModeId` para componentes que não precisam de estado.

A função `updateField` atualiza o estado por meio de `parseFieldValue`, que converte strings para tipos corretos (`number`, `boolean`).

### Persistência

- **LocalStorage API** (100% client-side, sem backend)
- **Histórico**: últimos 50 prompts salvos automaticamente ao copiar
- **Favoritos**: armazenamento persistente separado, gerenciado via `toggleFavorite`
- **Restauração**: `loadSavedItem` injeta valores no `FormContext` e navega para o modo correspondente
- Chaves: `history-gerador-prompt`, `favorites-gerador-prompt`

### Fórmulas

Cada modo de fórmula tem uma definição em `src/features/generator/constants/modes/` com:

- `title`: nome do modo
- `icon`: componente Lucide
- `formula(inputs) → string`: função pura que gera o prompt
- `fields[]`: schema dos campos (id, label, type, placeholder, options)
- `templates[]`: presets para preenchimento rápido

Exemplo (simplificado):

```js
export const videoNew = {
  title: 'Vídeo Novo',
  icon: Play,
  fields: [
    { id: 'subject', label: 'Sujeito Principal', type: 'text' },
    { id: 'action', label: 'Ação', type: 'text' },
    { id: 'cameraAngle', label: 'Ângulo de Câmera', type: 'select', options: [...] },
  ],
  formula: (values) => `Generate a video... ${values.subject}...`,
};
```

---

## Pré-requisitos

- **Node.js** 18.0 ou superior (testado até Node 22)
- **pnpm** 8+ (recomendado) ou npm 9+
- Navegador moderno (Chrome 90+, Firefox 90+, Edge 90+, Safari 15+)

---

## Começando Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/rmgimenez/flowprompt.git
cd flowprompt

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente (opcional para dev)
cp .env.exemplo .env
# Edite .env com sua chave OpenRouter se quiser usar o modal de IA

# 4. Inicie o servidor de desenvolvimento
pnpm dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

### Build para Produção

```bash
pnpm build       # Gera dist/
pnpm preview     # Servidor local para testar o build
```

---

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `VITE_OPENROUTER_API_KEY` | Apenas para IA | Chave de API do OpenRouter | `sk-or-v1-...` |
| `VITE_OPENROUTER_MODEL` | Apenas para IA | Modelo a ser usado no modal de IA | `deepseek/deepseek-v4-flash` |

**⚠️ Segurança em produção (Vercel):** Nunca use o prefixo `VITE_` para chaves de API confidenciais — elas vazam para o bundle do browser. Cadastre as variáveis sem o prefixo no dashboard da Vercel e use-as no backend (se houver). As variáveis `VITE_` são seguras apenas para desenvolvimento local.

---

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento com HMR (porta 5173) |
| `pnpm build` | Compila para produção em `dist/` (Vite + Rollup) |
| `pnpm lint` | Verifica código com ESLint flat config |
| `pnpm preview` | Servidor local para preview do build de produção |

---

## Implantação

### Vercel (Recomendado)

O projeto está configurado para deploy contínuo na Vercel com detecção automática de Vite/React.

1. Conecte o repositório GitHub no dashboard da Vercel
2. Framework: **Vite** (detectado automaticamente)
3. Build Command: `pnpm build` (detectado automaticamente)
4. Output Directory: `dist` (detectado automaticamente)
5. Adicione as variáveis de ambiente no dashboard (sem prefixo `VITE_`)

### Docker (Alternativa)

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t flowprompt .
docker run -p 80:80 flowprompt
```

---

## Troubleshooting

### Vite não inicia / HMR não funciona

```bash
rm -rf node_modules/.vite
pnpm install
pnpm dev
```

### ESLint aponta erros

```bash
pnpm lint
# Corrija os erros apontados, ou execute com --fix
npx eslint . --fix
```

### Erro ao buildar ("Some chunks are larger than 500 kB")

Este é um warning conhecido causado pelo bundle do lucide-react + framer-motion. Para produção, considere code-splitting com `lazy()` nos componentes de página.

### Modal de IA não responde

1. Verifique se `OPENROUTER_API_KEY` está configurada (variável sem prefixo `VITE_` em produção, ou `VITE_OPENROUTER_API_KEY` em dev)
2. Verifique se o modelo configurado está ativo na sua conta OpenRouter
3. Verifique o console do navegador para erros de CORS ou rede

### Alterações de configuração não aparecem

O opencode carrega a configuração apenas na inicialização. Após alterar `opencode.json` ou arquivos em `.opencode/`, saia e reinicie o opencode.

---

## Contribuindo

1. **Fork** o projeto
2. Crie uma **branch**: `git checkout -b feature/nova-funcionalidade`
3. **Commit**: `git commit -m 'Add: descrição da mudança'`
4. **Push**: `git push origin feature/nova-funcionalidade`
5. Abra um **Pull Request**

### Convenções de Código

- O projeto segue ESLint flat config com regras para React Hooks e JSX
- CSS Modules para estilos com escopo local
- Preferir `pnpm` para instalação de dependências
- Nomes de arquivos em PascalCase para componentes, camelCase para hooks/utils
- Evitar `useRef` para estado de UI; preferir `useState` com `useCallback`

---

## Links Úteis

- [Documentação Nano Banana 2 — Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana)
- [Documentação Veo — Google DeepMind](https://deepmind.google/technologies/veo/)
- [OpenRouter](https://openrouter.ai/) — Agregador de APIs de IA
- [OpenRouter Multimedia Explorer](https://multimedia-explorer.openrouter.ai/) — Gerador de imagens e vídeos via OpenRouter
- [Guia JSON do Nano Banana](https://aiformarketings.com/blog/nano-banana-json-guide/)
- [Promptu AI](https://promptu.ai/) — Alternativa para criação de prompts

---

**Autor:** Ricardo Moura Gimenez — [rmgimenez@gmail.com](mailto:rmgimenez@gmail.com)

**Licença:** MIT
