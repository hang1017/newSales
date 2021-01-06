import React, { FC } from 'react';
import styles from './index.less';

interface PriceLabelProps {
  price: number; // 已 分 为单位传递
}

const PriceLabel: FC<PriceLabelProps> = ({ price = 0 }) => {
  return (
    <div className={styles.priceLabelStyle}>
      <span className={styles.symbol}>¥</span>
      <span className={styles.mainMoney}>{price}</span>
      {/* <span className={styles.mainMoney}>{(price / 100).toFixed(2).split('.')[0]}</span>
      <span className={styles.subMoney}>{`.${(price / 100).toFixed(2).split('.')[1]}`}</span> */}
    </div>
  );
};

export default PriceLabel;
