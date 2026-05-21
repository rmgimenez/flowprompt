import { GlassCard } from '../../../../../../components/ui/GlassCard';
import { Sparkles } from 'lucide-react';
import styles from '../../TikTokCollections.module.css';

export const TikTokGuide = () => {
  return (
    <div className={styles.guideFullWidth}>
      <GlassCard className="p-6">
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
                <strong>1. Escolha o Combo & Tema:</strong> Clique em um dos presets de preenchimento rápido (ex: <code>⚡ Gen-Z Viral</code>) para configurar a base. Insira o tema principal do post (ex: <em>"Gatos detetives resolvendo mistérios"</em>).
              </li>
              <li>
                <strong>2. Copie o Prompt Mestre:</strong> Copie o prompt gerado em tempo real na coluna da direita e envie para o seu chat de IA favorito (ChatGPT Plus ou Claude 3.5 Sonnet).
              </li>
              <li>
                <strong>3. Copie os JSONs de Volta:</strong> A IA gerará a legenda e os blocos de código JSON sequenciais para cada slide. Copie cada JSON gerado e cole diretamente na ferramenta <strong>Foto Nova (Nano Banana 2)</strong> do FlowPrompt para criar as imagens ultra-coesas.
              </li>
            </ul>
          </div>

          <div className={styles.guideCard}>
            <h4 className={styles.guideCardTitle}>💡 Dicas de Ouro para Viralização</h4>
            <ul className={styles.guideList}>
              <li>
                <strong>Consistência de Personagem (Seeds):</strong> Sempre mantenha a mesma string no campo <code>visual_consistency_id</code> de cada JSON de imagem da sequência (ex: <code>char_cat_sherlock_v2</code>). Isso força o modelo a desenhar o mesmo personagem exato em todas as cenas.
              </li>
              <li>
                <strong>Curva Narrativa em Carrossel:</strong> TikToks em formato de fotos performam absurdamente bem se contarem uma história em partes. Slide 1 deve ser um "Gancho impactante", Slides 2-4 o "Desenvolvimento com nuances", e o último slide o "Clímax/Desfecho inusitado".
              </li>
              <li>
                <strong>Ajuste Fino Manual:</strong> Após selecionar um preset, sinta-se livre para refinar as seleções nos dropdowns inferiores ou adicionar observações adicionais no campo de texto para personalizar ainda mais o resultado da IA.
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default TikTokGuide;
