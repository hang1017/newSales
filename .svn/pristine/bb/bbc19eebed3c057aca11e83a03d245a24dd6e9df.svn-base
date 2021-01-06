import React, { FC } from 'react';
import copyIcon from '@/assets/img/customer/copy.png';
import placeholder from '@/assets/img/placeholder.png';
import clipboard from '@/utils/clipboard';

import styles from './index.less';


interface RefundProductProps {
  data: any;
  footerElement?: React.ReactNode;
}

const RefundProduct: FC<RefundProductProps> = (props) => {
  const { data = {}, footerElement = '' } = props;
  const { storeList = [], orderId, totalAmount, orderReturnItemCOList = [], orderNbr } = data || {};
  let goodsList = [];
  if (storeList && storeList.length) {
    goodsList = storeList;
  }
  if (orderReturnItemCOList && orderReturnItemCOList.length) {
    goodsList = orderReturnItemCOList;
  }

  return (
    <div className={styles.refundInfo}>
      <div className={styles.orderId}>订单编号：<span>{orderNbr}</span> <img src={copyIcon} alt='' onClick={(e) => {
        clipboard(orderNbr, e, '复制成功啦');
        e.stopPropagation();
      }} /></div>
      {

        goodsList.map(item => {
          const { goodsName, skuPrice, skuQuantity, applyNum = '', skuPicFileUrl = '' } = item || {};
          return <div className={styles.productCell}>

            <div className={styles.productInfo}>
              <img src={skuPicFileUrl || placeholder} alt='' />
              <div>
                <div className={styles.productName}>{goodsName}</div>
                <div className={styles.subName}>{skuPrice}  元</div>
              </div>

            </div>
            <div>x {skuQuantity || applyNum}</div>

          </div>
        })
      }
      {
        footerElement || <div className={styles.allAccount}>已支付：￥<span className={styles.money}>{totalAmount}</span></div>
      }

    </div>
  );
};

export default RefundProduct;
