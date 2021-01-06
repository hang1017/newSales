import React, { FC, useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { CartPng, PersonPng } from '@/assets';
import styles from './index.less';
import { router } from 'alita';

interface CartFooterProps {
  allData: any;
  cartClick: () => void;
  toOrderClick: (e: any) => void;
  data: any[];
}

const CartFooter: FC<CartFooterProps> = (props) => {
  const [totalNum, setTotalNum] = useState<number>(0);
  const { allData, cartClick, toOrderClick, data = [] } = props;

  useEffect(() => {
    let num = 0;
    if (data && data.length) {
      data.forEach((item: any) => {
        num += item.quantity;
      });
    }
    setTotalNum(num);
  }, [data]);

  /**
   * 前往个人中心页面
   */
  const goTpPerson = (e: any) => {
    e.stopPropagation();
    router.push('/customer/myPage');
  };

  return (
    <div className={styles.cartFooterStyle}>
      <div className={styles.ilTotal} onClick={cartClick}>
        <div className={styles.personContent} onClick={goTpPerson}>
          <img src={PersonPng} alt="" className={styles.personImg} />
          <div className={styles.personText}>个人中心</div>
        </div>
        <div className={styles.ilTotalImg}>
          <img src={CartPng} alt="" className={styles.cartImg} />
          <div className={styles.cartText}>购物车</div>
          {totalNum > 0 && <div className={styles.cartNum}>{totalNum}</div>}
        </div>
        <div className={styles.totalText}>
          合计: <span>{allData?.payAmount || 0}元</span>&nbsp;
          {allData?.promotionAmount !== undefined && allData?.promotionAmount !== 0 && (
            <div className={styles.promotion}>优惠:{allData?.promotionAmount}元</div>
          )}
        </div>
        <Button onClick={toOrderClick} className={styles.totalBtn} >
          <span param-action='accounts'>去结算</span>
        </Button>
      </div>
    </div>
  );
};

export default CartFooter;
