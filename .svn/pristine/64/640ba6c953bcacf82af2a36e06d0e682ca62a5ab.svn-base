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
} from '@/utils/NativeBridge';

interface PageProps extends ConnectProps {
  payResult: PayResultModelState;
}

const PayResultPage: FC<PageProps> = ({ payResult, dispatch, location }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    hiddenNavigatorBar(true); // 隐藏App导航条
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = payResult;
  const goToOrder = () => {
    history.replace({
      pathname: '/salesWarranty/warrantyList',
    });
  };

  const goHome = () => {
    if (isMallSaleContainerApp()) {
      popToRootViewController();
    } else {
      history.push({
        pathname: '/',
      });
    }
  };
  return (
    <div className={styles.paySuccessPage}>
      <div className={styles.payInfo}>
        <img
          src={backWhite}
          onClick={() => {
            history.goBack();
          }}
        />
        <div className={styles.payIconBlock}>
          <img src={paySucessIcon} alt="" />
          <span>申请提交成功！</span>
        </div>
        <div className={styles.btnBlock}>
          <span onClick={goHome}>返回首页</span>
          <span onClick={goToOrder}>查看申请单</span>
        </div>
      </div>

      <Recommend />
    </div>
  );
};

export default connect(({ payResult }: { payResult: PayResultModelState }) => ({ payResult }))(
  PayResultPage,
);
