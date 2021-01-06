import React, { FC } from 'react';
import IconMyOrder from '@/assets/img/goodsdetail/myOrder.png';
import styles from './index.less';

interface OrderMaskViewProps {
  show?: boolean;
  badge?: boolean;
}

const OrderMaskView: FC<OrderMaskViewProps> = (props) => {
  const { show } = props;
  return (
    <div hidden={!show} className={styles.orderMaskView}>
      <img src={IconMyOrder} alt="" />
    </div>
  );
};

export default OrderMaskView;
