import React, { FC, useEffect, useState } from 'react';
import { QryBalanceModelState, ConnectProps, connect, router } from 'alita';
import BalanceImg from '@/assets/img/customer/balance.png';
import RightImg from '@/assets/img/customer/right.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  qryBalance: QryBalanceModelState;
}

const QryBalancePage: FC<PageProps> = ({ qryBalance, dispatch }) => {
  const [amount, updateAmount] = useState('0.00');
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'myPage/qryBalance',
      payload: {
        balanceTypeId: '1',
      },
    }).then((res: any) => {
      updateAmount(res);
    });
    dispatch!({
      type: 'queryDetailList/save',
      payload: {
        phoneList: [],
      },
    });
  }, []);

  /**
   * 详单查询点击事件
   */
  const detailListClick = () => {
    router.push({
      pathname: '/queryDetailList/detailListLogin',
    });
  };

  return (
    <div className={styles.qryBalanceStyle}>
      <div className={styles.balanceHead}>
        <div className={styles.amount}>
          <div className={styles.amountMoney}>{amount}</div>
          <div className={styles.amountText}>元</div>
        </div>
        <div className={styles.label}>账户余额</div>
        <div className={styles.balanceBg} />
      </div>
      <div className={styles.content}>
        <div className={styles.detailList} onClick={detailListClick}>
          <div className={styles.left}>
            <img src={BalanceImg} alt="" className={styles.balImg} />
            <div className={styles.text}>
              <div className={styles.title}>详单查询</div>
              <div className={styles.subTitle}>流量、语音、短信</div>
            </div>
          </div>
          <div className={styles.right}>
            <img src={RightImg} alt="" className={styles.rightImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ qryBalance }: { qryBalance: QryBalanceModelState }) => ({ qryBalance }))(
  QryBalancePage,
);
