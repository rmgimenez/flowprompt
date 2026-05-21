# FlowPrompt - Gerador de Prompts para Google Flow

FlowPrompt é uma ferramenta interativa e visual de alta performance para a criação de prompts estruturados e profissionais voltados aos modelos de IA do Google: **Nano Banana** (imagens) e **Veo** (vídeos). Inclui também ferramentas especializadas para criar **coleções virais para TikTok**, **pins longos para Pinterest** e **montagens de fotos**.

**🌐 Acesse agora: [flowprompt-blue.vercel.app](https://flowprompt-blue.vercel.app)**

---

## 🚀 Funcionalidades Principais

### 🎨 Modos de Geração (Veo)
- **Vídeo Novo**: Crie vídeos cinematográficos a partir de descrições textuais detalhadas.
- **Vídeo de Imagem**: Anime imagens estáticas adicionando movimento de câmera e efeitos sonoros (SFX).
- **Interpolação (2 Frames)**: Gere transições suaves entre dois frames de referência.

### 📸 Modos de Geração (Nano Banana)
- **Foto Nova**: Gere fotografias e ilustrações de alta resolução com controle de composição.
- **Transformar Foto**: Reimagine imagens existentes aplicando novos estilos artísticos ou alterando o cenário.

### 🛠️ Ferramentas Especiais
- **Coleção TikTok (Nano Banana 2)**: Crie **prompts mestre** para posts de carrossel viral no TikTok. Gera um prompt completo com DNA visual, título em PT-BR, legenda com hashtags e N prompts de imagem individuais (um por slide) seguindo a fórmula oficial de engenharia de prompt estruturada.

  Componentes inclusos:
  - **Viral Score** — Pontuação em tempo real (0-100%) baseada em 5 fatores de coerência e alinhamento com tendências.
  - **Trends Radar** — Painel com 28 temas em alta no TikTok Brasil organizados em 6 categorias (Humor, Relacionamentos, Fitness, Carreira, Comida, Games).
  - **Hook Optimizer** — Gerador de ganchos virais para o Slide 1 em 5 categorias (Curiosidade, Identificação, Urgência, Lista, Opinião Polêmica).
  - **Combos de Alta Conversão** — 6 presets pré-engenheirados (Gen-Z Viral, Storytelling, Estoico & Superação, Motivacional, Aesthetic/Calm, Cultura Geek).
  - **Analytics Tracker** — Registro de métricas reais (views, likes, comments, shares, saves) com resumo de performance e ranking.
  - **TikTokDrawer** — Simulador de visualização do post no feed do TikTok com molde de smartphone, carrossel de slides e botões de interação.
  - **Gerador de Tema Aleatório** — Mashup com 18.000 combinações de sujeito + ação + twist.
  - **56 Estilos Visuais** — Inclui diretores (Wes Anderson, Tarantino, Nolan, Kubrick), animação (Pixar, Claymation, Ghibli), arte clássica (Da Vinci, Van Gogh, Monet), efeitos (Cyberpunk, Synthwave, Steampunk).
  - **Histórico Inteligente** — Salvamento automático dos últimos 50 prompts com restauração de configurações.
  - **Guia Prático** — Modal com fluxo de trabalho, dicas de viralização e estratégias avançadas.

- **Empilhador Pinterest**: Crie pins verticais longos juntando várias fotos em uma só.
- **Montagem de Fotos**: Combine várias fotos em um grid personalizado com bordas.

### ⚡ Produtividade e UX
- **Sistema de Favoritos**: Favorite seus melhores resultados para acesso permanente e rápido.
- **Restauração de Estado**: Recarregue instantaneamente um prompt salvo, preenchendo todos os campos e mudando o modo automaticamente.
- **Modal de IA**: Preencha todos os campos via linguagem natural (disponível em todas as páginas).
- **Sugestões Inteligentes**: Sistema de "chips" contextuais para facilitar a escolha de estilos, ângulos e ações.
- **Interface Premium**: Design focado em *Glassmorphism*, com animações fluidas via Framer Motion e modo escuro nativo.
- **Atalhos de Teclado**: Teclas `1-9` para navegar modos, `Ctrl+C` para copiar prompt.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 (Hooks, Context, Memoization)
- **Build Tool**: Vite 6+
- **Estilização**: CSS Modules + Tailwind Merge + clsx
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Persistência**: LocalStorage API
- **Analytics**: Vercel Analytics

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
├── src/
│   ├── components/          # Componentes de UI reutilizáveis (GlassCard, HelpBox)
│   ├── features/
│   │   └── generator/       # Lógica central do gerador de prompts
│   │       ├── components/
│   │       │   ├── Form/        # Formulários e inputs
│   │       │   ├── PromptPreview/  # Preview do prompt gerado
│   │       │   ├── Sidebar/     # Navegação principal
│   │       │   └── TikTokCollections/  # Feature completa de coleções TikTok
│   │       │       ├── components/
│   │       │       │   ├── form/          # ThemeInput, QuantityStepper, SelectorsGrid, etc.
│   │       │       │   ├── indicators/    # TrendsRadar, ViralScore, HookOptimizer, TikTokGuide
│   │       │       │   ├── analytics/     # AnalyticsTracker
│   │       │       │   ├── history/       # HistoryModal
│   │       │       │   └── actions/       # ActionButtons, FloatingActionButtons
│   │       │       ├── constants/     # 56 estilos, 27 cores, 26 vibes, 24 targets, 18k temas
│   │       │       ├── hooks/         # useTikTokHistory
│   │       │       └── utils/         # Geração de prompt, cálculo viral score
│   │       ├── constants/   # Definições de modos e fórmulas (modes.js, templates.js)
│   │       └── styles/      # Estilos específicos dos componentes
│   ├── layouts/             # Templates de página (MainLayout)
│   ├── pages/               # Páginas da aplicação
│   │   ├── AppShell.jsx     # Shell principal com Sidebar + ModeRouter
│   │   ├── ModeRouter.jsx   # Roteamento interno por modo
│   │   ├── FormulaPage.jsx  # Página padrão para modos de fórmula
│   │   ├── TikTokCollectionsPage.jsx
│   │   ├── ImageStackerPage.jsx
│   │   ├── PhotoMontagePage.jsx
│   │   └── AboutPage.jsx
│   ├── styles/              # Tokens, variáveis globais e utilitários CSS
│   ├── App.jsx              # Orquestrador principal com React Router
│   └── main.jsx             # Ponto de entrada do React
```

### Rotas Disponíveis

| Rota | Página | Tipo |
| :--- | :--- | :--- |
| `/tiktok-collections` | Coleção TikTok (Nano Banana 2) | Ferramenta Custom |
| `/image-stacker` | Empilhador Pinterest | Ferramenta Custom |
| `/photo-montage` | Montagem de Fotos | Ferramenta Custom |
| `/video-new` | Vídeo Novo (Veo) | Fórmula |
| `/video-from-img` | Vídeo de Imagem (Veo) | Fórmula |
| `/video-from-frames` | Interpolação 2 Frames (Veo) | Fórmula |
| `/photo-new` | Foto Nova (Nano Banana) | Fórmula |
| `/photo-transform` | Transformar Foto (Nano Banana) | Fórmula |
| `/about` | Sobre a Ferramenta | About |

A rota raiz (`/`) redireciona para `/tiktok-collections`.

### Navegação (Sidebar)

A navegação principal é feita via **Sidebar** com 3 abas: **Modos** (categorias Vídeo / Foto / Ferramentas), **Histórico** e **Favoritos**.

### Fluxo de Dados e Persistência

1. **Seleção de Modo**: O usuário seleciona um modo na Sidebar, que define qual fórmula ou ferramenta será renderizada.
2. **Preenchimento Dinâmico**: Cada modo gera inputs específicos baseados em suas definições.
3. **Geração em Tempo Real**: `useMemo` calcula o prompt final a cada mudança nos campos usando as funções de fórmula.
4. **Ciclo de Persistência**:
   - Ao **Copiar**: O prompt é adicionado ao histórico no `localStorage`.
   - Ao **Favoritar**: O estado é salvo na lista de favoritos persistente.
   - Ao **Restaurar**: O hook injeta os valores salvos de volta no estado do formulário.

---

## 🏁 Começando Localmente

### Pré-requisitos

- **Node.js** 18.0 ou superior
- **pnpm** (recomendado) ou **npm**

### 1. Instalação

```bash
git clone https://github.com/rmgimenez/flowprompt.git
cd flowprompt

pnpm install
```

### 2. Desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

### 3. Build para Produção

```bash
pnpm build
pnpm preview
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `pnpm dev` | Inicia o servidor de desenvolvimento com HMR |
| `pnpm build` | Compila o projeto para produção na pasta `dist/` |
| `pnpm lint` | Verifica a conformidade do código com ESLint |
| `pnpm preview` | Visualiza o build de produção localmente |

---

## 🚀 Implantação (Deployment)

O projeto está configurado para deploy contínuo na **Vercel**.

- **Plataforma**: Vercel
- **Configuração**: Auto-detecta Vite/React
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Analytics**: Integrado nativamente via `@vercel/analytics`

---

## 💡 Como Contribuir

1. Faça um **Fork** do projeto.
2. Crie uma **Branch** (`git checkout -b feature/nova-funcionalidade`).
3. Faça o **Commit** (`git commit -m 'Add: Descrição da mudança'`).
4. Envie para o GitHub (`git push origin feature/nova-funcionalidade`).
5. Abra um **Pull Request**.

## Links importantes e diversos

- [OpenRouter Multimedia Explorer](https://multimedia-explorer.openrouter.ai/): gerador de imagens e vídeos via api do openrouter.
- [Promptu AI](https://promptu.ai/): site para gerar prompts para IA
- [OpenRouter](https://openrouter.ai/): agregador de APIs de IA
- [Exemplo Json imagem](https://aiformarketings.com/blog/nano-banana-json-guide/)
- [Documentação Nano Banana 2](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana)

---

**Autor:** Ricardo Moura Gimenez
**Contato:** [rmgimenez@gmail.com](mailto:rmgimenez@gmail.com)
**Licença:** MIT
