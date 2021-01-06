import React, { FC } from 'react';
import styles from './index.less';

interface CardProps {
  title: string;
}

const CardPage: FC<CardProps> = ({ title = '', children }) => {
  return (
    <div className={styles.cardStyle}>
      <div className={styles.cardTitle}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default CardPage;
