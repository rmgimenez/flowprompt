# FlowPrompt - Gerador de Prompts para Google Flow

FlowPrompt é uma ferramenta interativa e visual para criar prompts estruturados e profissionais para os modelos de IA do Google: **Nano Banana** (imagens) e **Veo** (vídeos). A ferramenta utiliza fórmulas oficiais para garantir a melhor qualidade técnica e estética nas gerações.

**🌐 Acesse agora: [flowprompt-blue.vercel.app](https://flowprompt-blue.vercel.app)**

## 🚀 Funcionalidades

- **Vídeo Novo (Veo)**: Crie vídeos cinematográficos a partir de descrições textuais detalhadas.
- **Vídeo de Imagem (Veo)**: Anime imagens estáticas adicionando movimento de câmera e efeitos sonoros.
- **Foto Nova (Nano Banana)**: Gere fotografias e ilustrações de alta resolução com controle de composição.
- **Transformar Foto (Nano Banana)**: Reimagine imagens existentes aplicando novos estilos artísticos ou alterando o cenário.
- **Sugestões Inteligentes**: Sistema de "chips" de sugestão para facilitar a escolha de estilos, ângulos e ações.
- **Interface Premium**: Experiência fluida com animações via Framer Motion e design moderno.

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Estilização**: Vanilla CSS (com Tailwind Merge para utilitários)
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Gerenciamento de Pacotes**: pnpm

## 📋 Pré-requisitos

- Node.js 18 ou superior
- pnpm instalado globalmente (`npm install -g pnpm`)

## 🏁 Começando

### 1. Clone o repositório

```bash
git clone https://github.com/rmgimenez/flowprompt.git
cd flowprompt
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:5173](http://localhost:5173) no seu navegador para ver o resultado.

## 🏗️ Arquitetura do Projeto

```
├── public/              # Ativos estáticos
├── src/
│   ├── components/      # Componentes compartilhados
│   │   └── ui/          # Componentes de interface base
│   ├── features/        # Módulos por funcionalidade
│   │   └── generator/   # Lógica principal do gerador
│   │       ├── components/  # Formulário, Preview, Seleção de Modo
│   │       ├── constants/   # Definições de fórmulas e sugestões (modes.js)
│   │       └── hooks/       # Hooks personalizados para o gerador
│   ├── layouts/         # Componentes de layout da página
│   ├── styles/          # Tokens e utilitários globais de CSS
│   ├── App.jsx          # Componente raiz
│   ├── main.jsx         # Ponto de entrada do React
│   └── index.css        # Estilos globais e variáveis
└── vite.config.js       # Configuração do Vite
```

### Fluxo de Dados

1. O usuário seleciona um **Modo** (definido em `modes.js`).
2. O `PromptForm` renderiza os campos dinamicamente com base no modo escolhido.
3. As sugestões selecionadas são concatenadas nos campos de texto.
4. A **Fórmula** do modo (uma função JavaScript) processa os valores e gera o prompt final.
5. O `PromptPreview` exibe o resultado pronto para cópia.

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `pnpm dev` | Inicia o servidor de desenvolvimento do Vite |
| `pnpm build` | Gera o build de produção na pasta `dist` |
| `pnpm lint` | Executa o ESLint para verificar erros de código |
| `pnpm preview` | Visualiza o build de produção localmente |

## 💡 Como Contribuir

1. Faça um **Fork** do projeto.
2. Crie uma nova **Branch** para sua feature (`git checkout -b feature/nova-sugestao`).
3. Faça o **Commit** de suas alterações (`git commit -m 'Add: nova sugestão de estilo'`).
4. Envie para a branch principal (`git push origin feature/nova-sugestao`).
5. Abra um **Pull Request**.

---

**Autor:** Ricardo Moura Gimenez ([rmgimenez@gmail.com](mailto:rmgimenez@gmail.com))

Desenvolvido para facilitar a criação de arte generativa com precisão.
