import React, { FC } from 'react';
import styles from './index.less';

import IconPaySuccess from '@/assets/img/payment/pay_sucess.png';
import deliveryIcon from '@/assets/img/order/delivery_icon.png';

import { history } from 'alita';
import { OrderState } from '@/utils/AppContext';
interface HeaderViewProps {
  offsetY?: number;
  orderState?: '';
}

const HeaderView: FC<HeaderViewProps> = ({ offsetY = 0.0, orderState }) => {
  const renderContentView = () => {
    return (
      <div className={styles.payResult}>
        {orderState === OrderState.waitPay && (
          <>
            <img src={IconPaySuccess} alt="" />
            <span>等待付款!</span>
          </>
        )}
        {orderState === OrderState.finish && (
          <>
            <img src={IconPaySuccess} alt="" />
            <span>服务已完成！</span>
          </>
        )}
        {orderState === OrderState.waitRecieve && (
          <>
            <img src={IconPaySuccess} alt="" />
            <span>订单派送中!</span>
          </>
        )}
      </div>
    );
  };

  const opacity = offsetY / 300 <= 1 ? offsetY / 300 : 1;
  let display = 'none';
  if (opacity == 0) {
    display = 'none';
  } else {
    display = 'block';
  }
  return (
    <div className={styles.headerView}>
      <div className={styles.navBar} style={{ opacity, display }}>
        <div
          className={styles.backIcon}
          onClick={() => {
            history.goBack();
          }}
        ></div>
      </div>
      <div className={styles.header}>
        <div
          className={styles.backIcon}
          onClick={() => {
            history.goBack();
          }}
        ></div>
        {renderContentView()}
      </div>
    </div>
  );
};

export default HeaderView;
