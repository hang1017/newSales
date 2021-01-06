import React, { FC } from 'react';
import { WaitPageModelState, ConnectProps, connect } from 'alita';
import BucklePng from '@/assets/img/buckle.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  waitPage: WaitPageModelState;
}

const WaitPagePage: FC<PageProps> = ({ waitPage, dispatch }) => {
  return (
    <div className={styles.buckleStyle}>
      <img src={BucklePng} alt="" className={styles.buckleImg} />
      <div className={styles.buckleText}>等一下再戳我~</div>
    </div>
  );
};

export default connect(({ waitPage }: { waitPage: WaitPageModelState }) => ({ waitPage }))(
  WaitPagePage,
);
