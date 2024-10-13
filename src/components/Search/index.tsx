import styles from './Search.module.css';

export default function Search() {
  return (
    <section className={styles['search-container']}>
      <input
        placeholder="Search Keyword"
        className={styles['search-input']}
        type="search"
      />
    </section>
  );
}
