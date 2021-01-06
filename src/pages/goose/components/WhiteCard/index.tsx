import React, { FC } from 'react';
import styles from './index.less';

interface WhiteCardProps {
  title: string;
}

const WhiteCard: FC<WhiteCardProps> = ({ title = '', children }) => {
  return (
    <div className={styles.whiteCardStyle}>
      <div className={styles.wcTitlte}>
        <div className={styles.title}>{title}</div>
      </div>
      {children}
    </div>
  );
};

export default WhiteCard;
