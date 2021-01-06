import React, { FC, useEffect, useState } from 'react';
import { BiliPayResultModelState, ConnectProps, connect, history } from 'alita';
import backWhite from '@/assets/img/back_white.png';
import paySucessIcon from '@/assets/img/payment/pay_sucess.png';
import payFailIcon from '@/assets/img/payment/pay_fail.png';
import Utils from '@/utils/tool';
import FootBlock from '@/components/FootBlock';

import styles from './index.less';

interface PageProps extends ConnectProps {
  biliPayResult: BiliPayResultModelState;
}

const BiliPayResultPage: FC<PageProps> = ({ biliPayResult, dispatch, location }) => {
  /**
   * 因为回调的地址含有2个？
   *
   * polarisApp/#/bili/biliPayResult?payAmount=20.00?retnCode=0000&retnInfo=0000&orderReqTranSeq=160008200915266071699286637181&orderSeq=114983&orderAmount=null&attach=&sign=95F2BED90917CD6255B96EA864F7E52C
   */
  const getQueryString = (name: string) => {
    const url = window.location.href;
    if (!(url.indexOf('?') > -1)) {
      return null;
    }
    const param = url.split('?')[2];
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');

    const result = param && param.match && param.match(reg);
    if (result != null) {
      return result[2];
    }
    return null;
  };

  const payAmount = Utils.getQueryString('payAmount');
  const retnCode = getQueryString('retnCode');
  console.log(`retnCode${retnCode}`);

  const [resultState, updatePayResult] = useState(retnCode === '0000');
  // const [totoalAmount, setTotalAmount] = useState('990.98');

  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const goToOrder = () => {
    history.push({
      pathname: '/order/myOrder',
      query: {
        activeIndex: 0,
      },
    });
  };

  const goToIndex = () => {
    history.push({
      pathname: '/',
    });
  };

  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = biliPayResult;
  return (
    <div className={styles.paySuccessPage}>
      {resultState ? (
        <div className={styles.payInfo}>
          <img
            src={backWhite}
            alt=""
            onClick={() => {
              history.goBack();
            }}
          />
          <div className={styles.payIconBlock}>
            <img src={paySucessIcon} alt="" />
            <span>支付成功</span>
          </div>
          <div className={styles.priceBlock}>实付￥{payAmount}</div>
          <div className={styles.btnBlock}>
            <span onClick={goToIndex}>返回首页</span> <span onClick={goToOrder}>查看订单</span>
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
      <div className={styles.footBlock}>
        <FootBlock />
      </div>
    </div>
  );
};

export default connect(({ biliPayResult }: { biliPayResult: BiliPayResultModelState }) => ({
  biliPayResult,
}))(BiliPayResultPage);
