import React, { FC } from 'react';
import styles from './index.less';

import IconCart from '@/assets/img/goodsdetail/goodsdetail-cart.png';
import IconCustomer from '@/assets/img/goodsdetail/goodsdetail-customer.png';

interface GoodsDetailFooterProps {
  onCustomerClick: () => void;
  onCartClick: () => void;
  onAddCartClick: () => void;
  onBuyClick: () => void;
  cartNum?: number;
}

const GoodsDetailFooter: FC<GoodsDetailFooterProps> = (props) => {
  const {
    onCustomerClick = () => {},
    onCartClick = () => {},
    onAddCartClick = () => {},
    onBuyClick = () => {},
    cartNum,
  } = props;
  let isShowNum = false;
  if (cartNum) {
    if (cartNum > 0) {
      isShowNum = true;
    }
  }
  return (
    <div className={styles.footer}>
      {/* <div className={styles.customer} onClick={onCustomerClick}>
        <img src={IconCart} alt="" />
        <div>客服</div>
      </div> */}
      <div className={styles.cart} onClick={onCartClick}>
        <img src={IconCart} alt="" />
        <span className={isShowNum ? styles.shopCarNum : styles.hideElement}>{cartNum}</span>
        <div>购物车</div>
      </div>
      <div className={styles.cartButton} onClick={onAddCartClick}>
        加入购物车
      </div>
      <div className={styles.buyButton} onClick={onBuyClick}>
        立即购买
      </div>
    </div>
  );
};

export default GoodsDetailFooter;
