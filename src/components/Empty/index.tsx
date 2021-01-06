import React from 'react';
import receivedImg from '@/assets/img/customer/empty_content.png';

import styles from './index.less';

interface EmptyItem {
  text?: string;
  imgSrc?: string;
}

const Page: React.FC<EmptyItem> = (props) => {
  const { text = '暂无数据', imgSrc = receivedImg } = props;

  return (
    <div className={styles.emptyBlock}>
      <img src={imgSrc} alt="" />
      <div className={styles.tipText}>{text}</div>
    </div>
  );
};

export default Page;
