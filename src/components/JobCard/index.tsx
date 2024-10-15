type skill = {
  data: {
    skill: {
      id: string;
      type: string;
      attributes: {
        name: string;
        type: string;
        importance: number;
        level: number;
      };
    };
    relationships: {
      jobs: { id: string }[];
    };
  };
};

type jobCardProps = {
  id: string;
  title: string;
  skills: {
    id: string;
  }[];
};

import { useState, useEffect } from 'react';
import styles from './JobCard.module.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../constants';

export default function JobCard({ id, title, skills }: jobCardProps) {
  const [skillsData, setSkillsData] = useState<skill[]>([]);

  const fetchSkillData = async (id: string): Promise<skill> => {
    const response = await fetch(`${API_URL}/skill/${id}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchAllSkills = async () => {
      const skillsNamesPromises = skills.map(skill => fetchSkillData(skill.id));
      const fetchedSkills = await Promise.all(skillsNamesPromises);
      setSkillsData(fetchedSkills);
    };

    fetchAllSkills();
  }, [skills]);

  return (
    <div className={styles['card-container']}>
      <h4 className={styles['card-title']}>{title}</h4>
      <p className={styles['related-skills-title']}>Related Skills:</p>
      <ul className={styles['related-skills-list']}>
        {skillsData.map(skillData => {
          const { skill } = skillData.data;
          return <li key={skill.id}>{skill.attributes.name}</li>;
        })}
      </ul>
      <Link to={`/job/${id}`} className={styles['job-details-link']}>
        View Job details
      </Link>
    </div>
  );
}
