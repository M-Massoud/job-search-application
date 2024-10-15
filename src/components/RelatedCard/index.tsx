type relatedCardProps = {
  id: string;
  cardType: 'job' | 'skill';
};

type cardData = {
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
  id: string;
  relationships: {
    jobs: {
      id: string;
    };
    skills: {
      id: string;
    };
  };
};

import { useEffect, useState } from 'react';
import { API_URL } from '../../../constants';
import styles from './RelatedCard.module.css';

export default function RelatedCard({ id, cardType }: relatedCardProps) {
  const [cardData, setCardData] = useState<cardData | null>(null);

  const fetchCardData = async () => {
    const response = await fetch(`${API_URL}/${cardType}/${id}`);
    const data = await response.json();
    setCardData(data.data.skill);
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  return (
    <div className={styles['related-card-container']}>
      <h4>{cardData?.attributes.name}</h4>
      <div className={styles['related-card-meta']}>
        <p>
          <span className="bold">Type: </span>
          {cardData?.attributes?.type}
        </p>
        <p>
          <span className="bold">Importance: </span>
          {cardData?.attributes?.importance}
        </p>
        <p>
          <span className="bold">Level:</span>
          {cardData?.attributes?.level}
        </p>
      </div>
    </div>
  );
}
