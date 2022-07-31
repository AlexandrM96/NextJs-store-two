import Aside from './Aside';
import Content from './Content';
import styles from '../styles/components/Main.module.css';

export default function Main() {
  return (
    <main className="main">
      <section className={styles.main__container}>
        <Aside/>
        <Content/>
      </section>
    </main>
  );
}


