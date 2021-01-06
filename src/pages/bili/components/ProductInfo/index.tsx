import React, { FC } from 'react';
import styles from './index.less';

import IconLogo from '@/assets/img/samll_log.png';

interface ProductInfoProps {
  proInfo: any;
}

const ProductInfo: FC<ProductInfoProps> = (props) => {
  const { proInfo } = props;
  const { skuInfo, proNum } = proInfo;
  const { skuName, goodsName, salesPrice, storeName, skuInfoThumbnail } = skuInfo || {};
  const renderOrderInfo = () => {
    return (
      <div className={styles.orderInfo}>
        <img src={skuInfoThumbnail} className={styles.goodsPic} alt="" />
        <div className={styles.goodsInfo}>
          <div className={styles.goodsName}>{goodsName}</div>
          <div className={styles.skuProps}>{skuName || ''}</div>
          <div className={styles.priceAndNum}>
            <div className={styles.price}>
              ￥<span>{salesPrice}</span>
            </div>
            <div className={styles.proNum}>x {proNum}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.productInfo}>
      <div className={styles.storeInfo}>
        <img src={IconLogo} alt="" />
        <span className={styles.storeName}>{storeName}</span>
      </div>
      {renderOrderInfo()}
    </div>
  );
};

export default ProductInfo;
