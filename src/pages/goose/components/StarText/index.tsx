import React, { FC } from 'react';
import StarPng from '@/assets/img/goose/star.png';
import styles from './index.less';

interface StarTextProps {}

const StarText: FC<StarTextProps> = ({ children }) => (
  <div className={styles.starTextStyle}>
    <img src={StarPng} alt="" className={styles.gooseStar} />
    {children}
  </div>
);

export default StarText;
