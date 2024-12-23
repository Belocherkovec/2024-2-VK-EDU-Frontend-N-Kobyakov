import styles from './App.module.scss'
import { AppRouter } from "./routes/AppRouter";

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <div className={styles.app__content}>
          <h1 className={styles.app__title}>VK Translate</h1>
        </div>
      </header>
      <main>
        <AppRouter />
      </main>
    </div>
  )
}
