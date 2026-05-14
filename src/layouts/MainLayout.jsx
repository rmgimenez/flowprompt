import React from 'react';
import styles from './MainLayout.module.css';

const MainLayout = ({ sidebar, content }) => {
  return (
    <div className={styles.appContainer}>
      {sidebar}
      <main className={styles.content}>
        {content}
      </main>
    </div>
  );
};

export default MainLayout;
