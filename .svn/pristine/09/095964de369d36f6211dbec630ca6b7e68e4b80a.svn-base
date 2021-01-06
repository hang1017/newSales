import React, { FC, useEffect } from 'react';
import { GeneralSuccessModelState, ConnectProps, connect, history, setPageNavBar } from 'alita';
import paySuccessIcon from '@/assets/img/customer/pay_success.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  generalSuccess: GeneralSuccessModelState;
}

const GeneralSuccessPage: FC<PageProps> = ({ generalSuccess, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    setPageNavBar({
      pagePath: '/customer/generalSuccess',
      navBar: {
        onLeftClick: () => {
          history.go(-3);
        },
      },
    });
  }, []);
  const goToOrder = () => {
    // history.push({
    //   pathname: '/customer/myPage',
    // });
    history.go(-3);
  };
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = generalSuccess;
  return (
    <div className={styles.payResult}>
      <div className={styles.payInfo}>
        <img src={paySuccessIcon} alt="" />
        <div className={styles.payDes}>兑换成功</div>
        <div className={styles.orderDes}>您的权益已经兑换</div>
      </div>
      <div className={styles.footBtn} onClick={goToOrder}>
        <span>返回首页</span>
      </div>
    </div>
  );
};

export default connect(({ generalSuccess }: { generalSuccess: GeneralSuccessModelState }) => ({
  generalSuccess,
}))(GeneralSuccessPage);
