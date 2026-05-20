import { CheckCircle2, ExternalLink } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  const docs = [
    { label: 'Guia Nano Banana (Imagens)', url: 'https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana' },
    { label: 'Guia Veo 3.1 (Vídeos)', url: 'https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>O que é o Flow Prompt?</h2>
      <p className={styles.description}>
        Esta ferramenta foi criada para ajudar criadores a explorarem o potencial máximo dos modelos generativos do Google Cloud: 
        <strong> Nano Banana</strong> (Imagens) e <strong>Veo</strong> (Vídeos).
      </p>

      <h3 className={styles.subtitle}>Como funciona?</h3>
      <p className={styles.description}>
        Nós utilizamos os frameworks oficiais de prompting do Google. Em vez de você precisar decorar fórmulas complexas de cinematografia e composição, 
        nós estruturamos seus inputs para garantir que o modelo receba instruções claras, verbosas e profissionais.
      </p>

      <ul className={styles.featureList}>
        <li className={styles.featureItem}>
          <CheckCircle2 className={styles.featureIcon} size={20} />
          <span><strong>Estrutura:</strong> Seguimos fórmulas narrativas em vez de apenas listas de palavras-chave.</span>
        </li>
        <li className={styles.featureItem}>
          <CheckCircle2 className={styles.featureIcon} size={20} />
          <span><strong>Qualidade:</strong> Adicionamos termos de fidelidade e iluminação automaticamente.</span>
        </li>
        <li className={styles.featureItem}>
          <CheckCircle2 className={styles.featureIcon} size={20} />
          <span><strong>Agilidade:</strong> Sugestões rápidas para estilos e enquadramentos comuns.</span>
        </li>
      </ul>

      <h3 className={styles.subtitle}>Documentação Oficial</h3>
      <div className={styles.linksContainer}>
        {docs.map((doc) => (
          <a key={doc.url} href={doc.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <ExternalLink size={18} />
            {doc.label}
          </a>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>Desenvolvido para facilitar a vida de artistas e desenvolvedores no ecossistema Google Flow.</p>
      </footer>
    </div>
  );
};

export default About;
