# FlowPrompt - Gerador de Prompts para Google Flow

FlowPrompt é uma ferramenta interativa e visual de alta performance para a criação de prompts estruturados e profissionais voltados aos modelos de IA do Google: **Nano Banana** (imagens) e **Veo** (vídeos). A ferramenta automatiza o uso de fórmulas oficiais para garantir a máxima qualidade técnica e estética nas gerações.

**🌐 Acesse agora: [flowprompt-blue.vercel.app](https://flowprompt-blue.vercel.app)**

---

## 🚀 Funcionalidades Principais

### 🎨 Modos de Geração
- **Vídeo Novo (Veo)**: Crie vídeos cinematográficos a partir de descrições textuais detalhadas.
- **Vídeo de Imagem (Veo)**: Anime imagens estáticas adicionando movimento de câmera e efeitos sonoros (SFX).
- **Foto Nova (Nano Banana)**: Gere fotografias e ilustrações de alta resolução com controle de composição.
- **Transformar Foto (Nano Banana)**: Reimagine imagens existentes aplicando novos estilos artísticos ou alterando o cenário.

### ⚡ Produtividade e UX
- **Histórico Inteligente**: Salvamento automático dos últimos 20 prompts gerados no navegador.
- **Sistema de Favoritos**: Favorite seus melhores resultados para acesso permanente e rápido.
- **Restauração de Estado**: Recarregue instantaneamente um prompt salvo, preenchendo todos os campos e mudando o modo automaticamente.
- **Botão "Surpreenda-me"**: Preenchimento aleatório baseado em sugestões curadas para inspiração instantânea.
- **Sugestões Inteligentes**: Sistema de "chips" contextuais para facilitar a escolha de estilos, ângulos e ações.
- **Interface Premium**: Design focado em *Glassmorphism*, com animações fluidas via Framer Motion e modo escuro nativo.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 (Hooks, Context, Memoization)
- **Build Tool**: Vite 6+
- **Estilização**: Vanilla CSS (CSS Modules) + Tailwind Merge
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Persistência**: LocalStorage API
- **Analytics**: Vercel Analytics

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
├── src/
│   ├── components/      # Componentes de UI reutilizáveis (GlassCard, HelpBox)
│   ├── features/        # Módulos organizados por funcionalidade
│   │   └── generator/   # Lógica central do gerador de prompts
│   │       ├── components/  # Formulários, Preview, Sidebar e Abas
│   │       ├── constants/   # Definições de fórmulas e sugestões (modes.js)
│   │       ├── hooks/       # Custom hooks (useGenerator para lógica e persistência)
│   │       └── styles/      # Estilos específicos dos componentes
│   ├── layouts/         # Templates de página (MainLayout)
│   ├── styles/          # Tokens, variáveis globais e utilitários CSS
│   ├── App.jsx          # Orquestrador principal da aplicação
│   └── main.jsx         # Ponto de entrada do React
```

### Fluxo de Dados e Persistência

1. **Seleção de Modo**: O estado global (`currentModeId`) define qual fórmula e campos serão renderizados.
2. **Preenchimento Dinâmico**: O `PromptForm` gera inputs baseados no `modes.js`. O usuário pode digitar ou usar o botão **Randomize**.
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
# Clone o repositório
git clone https://github.com/rmgimenez/flowprompt.git
cd flowprompt

# Instale as dependências
pnpm install
```

### 2. Desenvolvimento

```bash
# Inicie o servidor dev do Vite
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

---

**Autor:** Ricardo Moura Gimenez  
**Contato:** [rmgimenez@gmail.com](mailto:rmgimenez@gmail.com)  
**Licença:** MIT
