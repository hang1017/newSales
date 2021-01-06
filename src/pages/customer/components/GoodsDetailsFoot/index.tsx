import React from 'react';

import placeholderImg from '@/assets/img/placeholder.png';

import styles from './index.less';

interface ConfirmItem {
  data: any;
}

const Page: React.FC<ConfirmItem> = (props) => {
  const { data } = props;

  return (
    <div className={styles.goodsItem}>
      <div className={styles.goodsLeft}>
        <img src={placeholderImg} alt="" />
        <div className={styles.goodSkuInfo}>
          <div className={styles.goodsName}>青年一派洛神派</div>
          <div className={styles.goodsSku}>
            <span>X 1</span> <span>未开通自动续订服务</span>
          </div>
        </div>
      </div>
      <div className={styles.amount}>20元</div>
    </div>
  );
};

export default Page;
