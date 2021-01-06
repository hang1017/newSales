import React, { useState } from 'react';
import closeIcon from '@/assets/img/close.png';
import CactivityItem from '../CactivityItem';
import styles from './index.less';
interface CactivityAlert {
  coupons?: any; // 按钮的字体
  closeClick?: (e) => void;
  show?: boolean;
}

const Page: React.FC<CactivityAlert> = (props) => {
  const { show = false, closeClick = () => {}, coupons = [] } = props;
  return (
    <div className={styles.actionModel}>
      {show && (
        <div
          className={styles.actionBg}
          onClick={(e) => {
            e.stopPropagation();
            closeClick(e);
          }}
        ></div>
      )}
      <div className={`${styles.actAlert} ${show && styles.show}`}>
        <div className={styles.alertHead}>
          <div className={styles.alertTitle}>活动</div>
          <div
            className={styles.rightClose}
            onClick={(e) => {
              e.stopPropagation();
              closeClick(e);
            }}
          >
            <img src={closeIcon} alt="" />
          </div>
        </div>

        {coupons.map((item: any) => {
          return <CactivityItem data={item} />;
        })}
      </div>
    </div>
  );
};

export default Page;
