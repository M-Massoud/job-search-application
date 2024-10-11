import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} page-layout`}>
      <h1 className={styles['header-logo']}>JobsNow</h1>
      <nav>
        <ul className={styles['header-nav']}>
          <li>Home</li>
          <li>Search</li>
          <li>History</li>
        </ul>
      </nav>
    </header>
  );
}
