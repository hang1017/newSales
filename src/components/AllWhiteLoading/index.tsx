import React, { FC } from 'react';
import AllWhiteLoadingPng from '@/assets/img/firstLoad.png';
import styles from './index.less';

interface AllWhiteLoadingProps {}

const AllWhiteLoading: FC<AllWhiteLoadingProps> = () => {
  return (
    <div className={styles.allWhiteLoading}>
      <img src={AllWhiteLoadingPng} className={styles.loadingImg} />
    </div>
  );
};

export default AllWhiteLoading;
