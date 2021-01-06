import React from 'react';

import cartIcon from '@/assets/img/customer/cart.png';
import myIcon from '@/assets/img/customer/my.png';
import { CustomerPng } from '@/assets';

import styles from './index.less';

interface CFootBlock {
  children?: React.ReactNode;
  righBtnText: string;
  cartNum: number;
  isCollect?: string; // 是否埋点
  rightClick: () => void;
  myClick?: () => void;
  cartClick?: () => void;
  customerClick?: () => void;
}

const Page: React.FC<CFootBlock> = (props) => {
  const {
    children,
    righBtnText,
    rightClick = () => {},
    cartNum = 0,
    myClick,
    isCollect,
    cartClick,
    customerClick = () => {},
  } = props;

  return (
    <div className={styles.footer}>
      <div className={styles.leftBlock}>
        {children || (
          <>
            <img src={CustomerPng} alt="" className={styles.customerIcon} onClick={customerClick} />
            {/* <img src={myIcon} alt="" className={styles.myIcon} onClick={myClick} /> */}
            <div>
              <img src={cartIcon} className={styles.cartIcon} alt="" onClick={cartClick} />
              {cartNum > 0 && <span className={styles.carNum}>{cartNum}</span>}
            </div>
          </>
        )}
      </div>

      <div className={styles.buyBtn} onClick={rightClick} param-action={isCollect || ''}>
        {righBtnText}
      </div>
    </div>
  );
};

export default Page;
