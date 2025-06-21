import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} page-layout`}>
      <h1 className={styles['header-logo']}>JobsNow</h1>
      <nav>
        <ul className={styles['header-nav']}>
          <Link to="/home" style={{ color: 'black', fontWeight: 'normal' }}>
            <li>Home</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
