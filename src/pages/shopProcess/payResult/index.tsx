import React, { FC, useEffect, useState } from 'react';
import { PayResultModelState, ConnectProps, connect, history } from 'alita';

import backWhite from '@/assets/img/back_white.png';
import paySucessIcon from '@/assets/img/payment/pay_sucess.png';
import payFailIcon from '@/assets/img/payment/pay_fail.png';

import Recommend from '@/components/Recommend';

import styles from './index.less';
import {
  popToRootViewController,
  isMallSaleContainerApp,
  hiddenNavigatorBar,
  popViewController,
} from '@/utils/NativeBridge';

interface PageProps extends ConnectProps {
  payResult: PayResultModelState;
}

const PayResultPage: FC<PageProps> = ({ payResult, dispatch, location }) => {
  const [resultState, updatePayResult] = useState(true);
  const [totoalAmount, setTotalAmount] = useState('0');
  const [paymentTypeSting, setPaymentTypeSting] = useState('支付失败!');
  const [isPopView, setisPopView] = useState('0'); //是否返回上一级页面，如：从我的订单重新支付，查看订单返回上一级
  // 这里发起了初始化请求
  useEffect(() => {
    setTotalAmount(location.query.total_amount);
    if (location.query.total_amount) {
      updatePayResult(true);
      setPaymentTypeSting('支付成功!');
    } else {
      updatePayResult(false);
      if (location.query.paymentTypeSting) {
        setPaymentTypeSting(location.query.paymentTypeSting);
      }
    }
    if (location.query.isPopView) {
      setisPopView(location.query.isPopView);
    }
    hiddenNavigatorBar(true); // 隐藏App导航条
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = payResult;
  const goToOrder = () => {
    if (isPopView === '1') {
      popViewController();
    } else {
      history.push({
        pathname: '/order/myOrder',
      });
    }
  };
  return (
    <div className={styles.paySuccessPage}>
      {resultState ? (
        <div className={styles.payInfo}>
          <img
            src={backWhite}
            alt=""
            onClick={() => {
              if (isMallSaleContainerApp()) {
                popToRootViewController();
              } else {
                history.goBack();
              }
            }}
          />
          <div className={styles.payIconBlock}>
            <img src={paySucessIcon} alt="" />
            <span>{setPaymentTypeSting}</span>
          </div>
          <div className={styles.priceBlock}>实付￥{totoalAmount}</div>
          <div className={styles.btnBlock}>
            <span onClick={goToOrder}>查看订单</span>
          </div>
        </div>
      ) : (
        <div className={styles.payInfo}>
          <img src={backWhite} />
          <div className={styles.payIconBlock}>
            <img src={payFailIcon} alt="" />
            <span>支付失败!</span>
          </div>
          {/* <div className={styles.priceBlock}>账户余额不足</div> */}
          <div className={styles.btnBlock}>
            {/* <span>重新支付</span> */}
            <span onClick={goToOrder}>查看订单</span>
          </div>
        </div>
      )}

      <Recommend />
    </div>
  );
};

export default connect(({ payResult }: { payResult: PayResultModelState }) => ({ payResult }))(
  PayResultPage,
);
