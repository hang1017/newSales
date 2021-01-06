import React, { FC, useEffect } from 'react';
import { PaymentViewModelState, ConnectProps, connect, router } from 'alita';
import styles from './index.less';
import { Flex } from 'antd-mobile';

import IconSelect from '@/assets/img/select.png';

interface PageProps extends ConnectProps {
  paymentView: PaymentViewModelState;
}

const PaymentViewPage: FC<PageProps> = ({ paymentView, dispatch, location }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = paymentView;
  return (
    <div className={styles.center}>
      <div className={styles.price}>
        ￥ <span>{location.query.payAmount}</span>.00
      </div>
      <div className={styles.section}>当前支付方式: 在线支付</div>
      <Flex className={styles.selectList}>
        <Flex.Item>
          <span>在线支付</span>
        </Flex.Item>
        <img className={styles.selectTag} src={IconSelect} alt="" />
      </Flex>

      <div
        className={styles.footerBtn}
        onClick={() => {
          dispatch!({
            type: 'paymentView/receiveOrderPayResultNotify',
            payload: {
              timeEnd: new Date().getTime(),
              resultCode: '0',
              // payTransactionId
              preTransactionId: location.query.payTransactionId,
              transactionId: location.query.transactionId || '2020071722001404781434398796',
              payChannelType: '3',
              totalFee: location.query.payAmount * 100,
            },
          });
        }}
      >
        立即支付
      </div>
    </div>
  );
};

export default connect(({ paymentView }: { paymentView: PaymentViewModelState }) => ({
  paymentView,
}))(PaymentViewPage);
