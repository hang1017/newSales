import React from 'react';

import placeholderImg from '@/assets/img/placeholder.png';

import styles from './index.less';

interface ConfirmItem {
  skuName: string;
  quantity: number;
  des: string;
  skuImg: string;
  salesPrice: string;
}

const Page: React.FC<ConfirmItem> = (props) => {
  const { skuName, quantity, des, skuImg, salesPrice } = props;

  return (
    <div className={styles.goodsItem}>
      <div className={styles.goodsLeft}>
        <img src={skuImg || placeholderImg} alt="" />
        <div className={styles.goodSkuInfo}>
          <div className={styles.goodsName}>{skuName}</div>
          <div className={styles.goodsSku}>
            <span>X {quantity}</span> <span>{des}</span>
          </div>
        </div>
      </div>
      <div className={styles.amount}>{salesPrice}元</div>
    </div>
  );
};

export default Page;
