import React, { FC } from 'react';
import styles from './index.less';
import { router } from 'alita';

interface LoginMaskViewProps {
  show?: boolean;
  sliderLeft?: boolean;
  top?: string;
}
const LoginMaskView: FC<LoginMaskViewProps> = (props) => {
  const { show = false, sliderLeft = false, top = '0.9rem' } = props;
  return (
    <div
      hidden={!show}
      className={`${styles.loginMaskView} ${sliderLeft && styles.maskViewLeft}`}
      style={{ top: top }}
    >
      <div className={`${styles.loginTips} ${sliderLeft && styles.tipsLeft}`}>
        打开APP开启品质生活
      </div>
      <div
        className={styles.loginBtn}
        onClick={() => {
          router.push({ pathname: '/shopProcess/productReview' });
        }}
      >
        立即打开
      </div>
    </div>
  );
};

export default LoginMaskView;
