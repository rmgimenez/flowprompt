import { Sparkles, X } from 'lucide-react';
import styles from '../../TikTokCollections.module.css';

const GuideContent = () => (
  <>
    <h3 className={styles.guideTitle}>
      <Sparkles size={18} className={styles.guideTitleIcon} />
      Guia Prático & Segredos de Alta Conversão para TikTok
    </h3>
    <p className={styles.guideSubtitle}>
      Aprenda a extrair o máximo poder do FlowPrompt e do modelo Google Nano Banana 2 para dominar o feed e acumular milhões de visualizações com posts carrossel.
    </p>

    <div className={styles.guideGrid}>
      <div className={styles.guideCard}>
        <h4 className={styles.guideCardTitle}>🚀 Fluxo de Trabalho em 3 Passos</h4>
        <ul className={styles.guideList}>
          <li>
            <strong>1. Escolha o Combo & Tema:</strong> Clique em um dos <strong>Combos de Alta Conversão</strong> (ex: <code>⚡ Gen-Z Viral</code>) para configurar estilo, vibe, cores e público automaticamente. Depois insira o tema principal (ex: <em>"Gatos detetives resolvendo mistérios"</em>) ou clique no botão ✨ <strong>Tema Aleatório</strong> para gerar combinações infinitas.
          </li>
          <li>
            <strong>2. Refine nos Seletores:</strong> Ajuste manualmente os dropdowns de <strong>Estilo, Vibe, Paleta de Cores e Público-Alvo</strong> para casar perfeitamente com a sua estratégia. Use o <strong>Otimizador de Gancho</strong> para copiar um gancho pronto e cole no campo de observações.
          </li>
          <li>
            <strong>3. Copie o Prompt e Gere:</strong> Copie o prompt mestre gerado na coluna da direita usando o botão flutuante <strong>📋 Copiar</strong> e envie para o ChatGPT ou Claude. A IA devolverá os JSONs para cada slide — cole cada um na ferramenta <strong>Foto Nova (Nano Banana 2)</strong> do FlowPrompt.
          </li>
        </ul>
      </div>

      <div className={styles.guideCard}>
        <h4 className={styles.guideCardTitle}>💡 Dicas de Ouro para Viralização</h4>
        <ul className={styles.guideList}>
          <li>
            <strong>Gancho nos Primeiros 0.5s:</strong> O primeiro slide decide se o usuário vai parar ou passar. Use o <strong>Otimizador de Gancho</strong> integrado para testar padrões de curiosidade, urgência e identificação. Sempre prefira hooks que gerem <em>"preciso saber mais"</em>.
          </li>
          <li>
            <strong>Consistência Visual (Seeds):</strong> Mantenha a mesma string no campo <code>visual_consistency_id</code> de todos os JSONs da sequência (ex: <code>char_cat_sherlock_v2</code>). Isso garante que o modelo desenhe o mesmo personagem, cenário e iluminação em todos os slides.
          </li>
          <li>
            <strong>Curva Narrativa em 5-7 Slides:</strong> Carrosséis com história performam 3x mais. Estrutura ideal: <strong>Slide 1</strong> = Gancho curioso/impactante · <strong>Slides 2-4</strong> = Desenvolvimento com reviravoltas · <strong>Slide 5+</strong> = Clímax surpreendente + CTA para seguir/compartilhar.
          </li>
          <li>
            <strong>Use os Combos Prontos:</strong> Os presets de <strong>Alta Conversão</strong> foram testados e calibrados com sinergias comprovadas (ex: Pixar + Humor + Gen-Z). Comece por eles e depois refine. O <strong>Viral Score</strong> ao lado mostra a pontuação da sua combinação em tempo real.
          </li>
          <li>
            <strong>Público-Alvo Correto:</strong> Selecionar o target certo dobra o engajamento. Use <strong>"Geração Z"</strong> para humor rápido e memes, <strong>"Storytelling"</strong> para narrativas, <strong>"CLT Exausto"</strong> para identificação corporativa, e <strong>"Motivacional Hardcore"</strong> para superação.
          </li>
        </ul>
      </div>

      <div className={styles.guideCard}>
        <h4 className={styles.guideCardTitle}>🎯 Como Usar Cada Ferramenta da Tela</h4>
        <ul className={styles.guideList}>
          <li>
            <strong>📝 Tema Principal:</strong> O coração do post. Seja específico: <em>"Capivaras no escritório"</em> rende mais que <em>"animais"</em>. Use o botão ✨ ao lado para sortear temas mashup infinitos.
          </li>
          <li>
            <strong>🔢 Quantidade de Slides:</strong> 5-7 slides é o ponto ideal para TikTok. Menos que 3 não cria narrativa; mais que 8 perde retenção. O <strong>Viral Score</strong> mostra se o número está otimizado.
          </li>
          <li>
            <strong>🎨 Estilos (56 Fórmulas):</strong> Cada estilo é uma fórmula de prompt testada. <strong>Pixar 3D</strong> para humor fofo, <strong>Tarantino</strong> para drama intenso, <strong>Golden Hour</strong> para estética aspiracional. Passe o mouse para ver a descrição.
          </li>
          <li>
            <strong>🌡️ Vibe & Paleta:</strong> A Vibe define o tom narrativo (cômico, sombrio, inspirador). A Paleta de Cores dita a atmosfera visual (neon, pastel, sépia). A combinação certa entrega coesão profissional.
          </li>
          <li>
            <strong>👥 Público-Alvo:</strong> Direciona o estilo de roteiro e a linguagem. Cada target tem um dialeto específico — desde <em>"jovens"</em> (memes, ironia) até <em>"investidores"</em> (dados, educação financeira).
          </li>
          <li>
            <strong>📡 Radar de Tendências:</strong> Clique para ver os temas em alta no TikTok Brasil. Escolher um trend do momento + seu estilo único = <strong>fórmula de ouro</strong> para viralizar.
          </li>
          <li>
            <strong>🏆 Combos de Alta Conversão:</strong> 6 combos pré-engenheirados que já configuram estilo + vibe + cores + target + observações de uma vez. Use como ponto de partida ou inspiração.
          </li>
          <li>
            <strong>🎣 Otimizador de Gancho:</strong> Gera frases de alto impacto para o primeiro slide. Copie uma e adicione nas observações para a IA criar a primeira imagem com o texto do gancho incorporado.
          </li>
          <li>
            <strong>🤖 IA Modal:</strong> Peça para a IA sugerir configurações completas para você. Descreva sua ideia em linguagem natural e ela preenche todos os campos automaticamente.
          </li>
        </ul>
      </div>

      <div className={styles.guideCard}>
        <h4 className={styles.guideCardTitle}>⚡ Estratégias Avançadas para Viralizar</h4>
        <ul className={styles.guideList}>
          <li>
            <strong>Storytelling em Série:</strong> Crie posts em partes (Parte 1/3, Parte 2/3...) com o mesmo <code>visual_consistency_id</code>. O algoritmo do TikTok favorece conteúdo serializado porque aumenta o tempo de tela e o retorno de usuários.
          </li>
          <li>
            <strong>Mashup de Tendência + Nicho:</strong> Pegue um tema do <strong>Radar de Tendências</strong> e aplique um estilo inusitado. Ex: trend de <em>"CLT"</em> + estilo <em>Pixar 3D</em> = viral na certa. O contraste entre tema mundano e visual épico gera curiosidade.
          </li>
          <li>
            <strong>CTA nos Últimos 2 Slides:</strong> Reserve o penúltimo slide para um "plot twist" e o último para uma chamada clara: "Salva pra ver depois", "Compartilha com alguém que...", "Segue pra parte 2". CTAs específicos convertem 4x mais que "curte aí".
          </li>
          <li>
            <strong>Teste A/B com Histórico:</strong> Use o botão <strong>📊 Analytics</strong> para registrar variações do mesmo tema com estilos diferentes. Compare o Viral Score e descubra qual combinação performa melhor antes mesmo de publicar.
          </li>
          <li>
            <strong>Toggle "Texto em PT-BR":</strong> Deixe sempre ativado se seu público é brasileiro. Isso força a IA a gerar textos em português natural nas imagens, aumentando a identificação e o tempo de retenção do público local.
          </li>
          <li>
            <strong>Ritmo de Publicação:</strong> Publique consistentemente no mesmo horário (19h-22h é o pico no Brasil). Alterne entre carrosséis de humor (viralização rápida) e carrosséis de valor (seguidores qualificados) para construir audiência sólida.
          </li>
          <li>
            <strong>Observações Detalhadas:</strong> Use o campo de observações para ditar EXATAMENTE o que cada slide deve conter. Ex: "Slide 1: close extremo no rosto do personagem assustado. Slide 2: plano aberto revelando o cenário..." — quanto mais específico, melhor a saída da IA.
          </li>
          <li>
            <strong>Sinergias de Alto Score:</strong> O <strong>Viral Score</strong> destaca sinergias entre estilo, vibe e target. Combinações como <em>Pixar + Humor + Gen-Z</em> ou <em>Tarantino + Mistério + Storytelling</em> ganham bônus de até 10 pontos. Priorize esses pares.
          </li>
        </ul>
      </div>
    </div>
  </>
);

export const TikTokGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.guideModalOverlay}>
      <div className={styles.guideModalBackdrop} onClick={onClose} />
      <div className={styles.guideModalContent}>
        <button className={styles.guideModalCloseBtn} onClick={onClose}>
          <X size={20} />
        </button>
        <div className={styles.guideModalBody}>
          <GuideContent />
        </div>
      </div>
    </div>
  );
};

export default TikTokGuideModal;
