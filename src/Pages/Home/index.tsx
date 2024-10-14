import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import JobCard from '../../components/JobCard';
import PageLayout from '../../components/Layout';
import Search from '../../components/Search';

type job = {
  id: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: {
      id: string;
    }[];
  };
};

type meta = {
  count: number;
};

export default function Home() {
  const [jobsData, setJobsData] = useState<job[]>([]);
  const [jobsMeta, setJobsMeta] = useState<meta | null>(null);

  const fetchJobsData = async (): Promise<void> => {
    try {
      const data = await fetch(
        'https://skills-api-zeta.vercel.app/jobs?cursor=0&limit=12'
      );
      const response = await data.json();
      setJobsData(response.data.jobs);
      setJobsMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <PageLayout>
      <Search />
      <main className={styles['home-page-container']}>
        <h2>All Jobs ({jobsMeta?.count})</h2>
        <section className={styles['job-cards-container']}>
          {jobsData.map(job => {
            return (
              <JobCard
                key={job.id}
                title={job.attributes.title}
                skills={job.relationships.skills}
              />
            );
          })}
        </section>
      </main>
    </PageLayout>
  );
}
