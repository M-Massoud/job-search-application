type job = {
  attributes: {
    title: string;
  };
  id: string;
  relationships: {
    skills: {
      id: string;
    }[];
  };
};

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/Layout';
import styles from './Job.module.css';
import { API_URL } from '../../../constants';
import RelatedCard from '../../components/RelatedCard';

export default function JobPage() {
  const [jobData, setJobData] = useState<job | null>(null);
  const { id } = useParams();

  const fetchJobData = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/job/${id}`);
      const data = await response.json();
      setJobData(data.data.job);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  return (
    <PageLayout>
      <main className={styles['job-page-container']}>
        <h2>{jobData?.attributes?.title}</h2>
        <div className={styles['main-content-container']}>
          <section className={styles['related-skills-section']}>
            <h3>Related Skills:</h3>
            <div className={styles['related-skills-cards']}>
              {jobData?.relationships.skills.map(skill => {
                return <RelatedCard id={skill.id} cardType="skill" />;
              })}
            </div>
          </section>
          {/* <aside className={styles['aside-section']}>
            <h3>Related Jobs:</h3>
            <ul></ul>
          </aside> */}
        </div>
      </main>
    </PageLayout>
  );
}
