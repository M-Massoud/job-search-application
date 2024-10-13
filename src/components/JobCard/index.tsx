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
  title: string;
  skills: {
    id: string;
  }[];
};

import { useState, useEffect } from 'react';
import styles from './JobCard.module.css';

export default function JobCard({ title, skills }: jobCardProps) {
  const [skillsData, setSkillsData] = useState<skill[]>([]);

  const fetchSkillData = async (id: string): Promise<skill> => {
    const response = await fetch(`https://skills-api-zeta.vercel.app/skill/${id}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchAllSkills = async () => {
      const skillsNamesPromises = skills.map(skill => fetchSkillData(skill.id));
      const fetchedSkills = await Promise.all(skillsNamesPromises);
      setSkillsData(fetchedSkills);
      console.log(fetchedSkills);
    };

    fetchAllSkills();
  }, [skills]);

  return (
    <div className={styles['card-container']}>
      <h4 className={styles['card-title']}>{title}</h4>
      <p className={styles['related-skills-title']}>Related Skills:</p>
      <ul className={styles['related-skills-list']}>
        {skillsData.map(skill => {
          return (
            <li key={skill.data.skill.id}>{skill.data.skill.attributes.name}</li>
          );
        })}
      </ul>
      {/* <a>View job details</a> */}
    </div>
  );
}
