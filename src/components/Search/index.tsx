import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.css';
import { API_URL } from '../../../constants';
import { debounce, DebouncedFunc } from 'lodash';

type SearchProps = {
  fetchJobsData?: (url: string) => void;
};

export default function Search({ fetchJobsData }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedFetchJobs = useRef<DebouncedFunc<(query: string) => void> | null>(
    null
  );

  useEffect(() => {
    debouncedFetchJobs.current = debounce((query: string) => {
      if (fetchJobsData) {
        fetchJobsData(`${API_URL}/jobs/search?query=${query}`);
      }
    }, 750);

    return () => {
      debouncedFetchJobs.current?.cancel();
    };
  }, [fetchJobsData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchQuery(search);

    if (search.length > 3 || search.length == 0) {
      debouncedFetchJobs.current?.(search);
    }
  };

  return (
    <section className={styles['search-container']}>
      <input
        placeholder="Search Keyword"
        className={styles['search-input']}
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </section>
  );
}
