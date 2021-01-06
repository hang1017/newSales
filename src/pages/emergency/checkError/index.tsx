import React, { FC, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { CheckErrorModelState, ConnectProps, connect, router } from 'alita';
import CloseImg from '@/assets/close.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  checkError: CheckErrorModelState;
}

const CheckErrorPage: FC<PageProps> = ({ checkError, dispatch }) => {
  /**
   * 重新验证
   */
  const reCheck = () => {
    router.goBack();
  };

  return (
    <div className={styles.checkErrorStyle}>
      <div className={styles.errorContent}>
        <img src={CloseImg} alt="" className={styles.closeImg} />
        <div className={styles.errorTitle}>验证失败</div>
        <div className={styles.errorSubTitle}>信息验证不通过，请提供正确的机主信息</div>
      </div>
      <div className={styles.btnDiv}>
        <Button className={styles.btn} onClick={reCheck}>
          重新验证
        </Button>
      </div>
    </div>
  );
};

export default connect(({ checkError }: { checkError: CheckErrorModelState }) => ({ checkError }))(
  CheckErrorPage,
);
