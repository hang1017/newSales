import React, { FC, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { router, setPageNavBar } from 'alita';
import paySuccessIcon from '@/assets/img/customer/pay_success.png';
import payFailIcon from '@/assets/img/customer/pay_fail.png';
import styles from './index.less';

const CheckResult: FC = ({ location }) => {
  const { status = '', code = '' } = location.query;
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick: () => {
          router.go(-4);
        },
      },
    });
  }, []);

  /**
   * 重新验证
   */
  const reCheck = () => {
    router.go(-4);
  };
  const params =
    status === '200'
      ? {
          image: paySuccessIcon,
          title: '提交成功',
          subTitle: '',
          qrCode: code && decodeURIComponent(code),
          remark: '复机申请资料已提交成功，请进入图中小程序进行活体认证，感谢您的支持！',
        }
      : {
          image: payFailIcon,
          title: '提交失败',
          subTitle: '',
        };
  return (
    <div className={styles.checkErrorStyle}>
      <div className={styles.errorContent}>
        <img src={params.image} alt="" className={styles.closeImg} />
        <div className={styles.errorTitle}>{params.title}</div>
        <div className={styles.errorSubTitle}>{params.subTitle}</div>
        {params.qrCode && <img src={params.qrCode} alt="" className={styles.qrCode} />}
        <div className={styles.errorSubTitle}>{params.remark}</div>
      </div>
      <div className={styles.btnDiv}>
        <Button className={styles.btn} onClick={reCheck}>
          返回
        </Button>
      </div>
    </div>
  );
};

export default CheckResult;
