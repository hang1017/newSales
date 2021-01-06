import React, { FC } from 'react';

import styles from './index.less';
import IconClose from '@/assets/img/close.png';

interface CouponsAlertViewProps {
  closeClick?: (e) => void;
  show?: boolean;
}

const CouponsAlertView: FC<CouponsAlertViewProps> = (props) => {
  const { show = false, closeClick = () => {} } = props;
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
            <img src={IconClose} alt="" />
          </div>
        </div>
        <div className={styles.alertBody}>
          <div className={styles.cell}>
            <div className={styles.cellBody}>
              <div className={styles.price}>
                <span className={styles.priceBefore}>¥</span>
                <span className={styles.priceAmount}>200.00</span>
                <span className={styles.couponsType}>商城优惠券</span>
              </div>
              <div className={styles.fullReduction}>满1000-200使用</div>
              <div className={styles.expiryDate}>有效期：2020-01-01 ~ 2020-12-31</div>
            </div>
            <div className={styles.cellFooter}>立即领取</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellBody}>
              <div className={styles.price}>
                <span className={styles.priceBefore}>¥</span>
                <span className={styles.priceAmount}>200.00</span>
                <span className={styles.couponsType}>商城优惠券</span>
              </div>
              <div className={styles.fullReduction}>满1000-200使用</div>
              <div className={styles.expiryDate}>有效期：2020-01-01 ~ 2020-12-31</div>
            </div>
            <div className={styles.cellFooter}>立即领取</div>
          </div>
        </div>
        <div className={styles.alertFooter}>
          <div className={styles.footerBtn}>完成</div>
        </div>
      </div>
    </div>
  );
};

export default CouponsAlertView;
