import React, { FC, useEffect } from 'react';
import { LivingCheckModelState, ConnectProps, connect } from 'alita';
import { Button } from 'antd-mobile';
import styles from './index.less';

interface PageProps extends ConnectProps {
  livingCheck: LivingCheckModelState;
}

const LivingCheckPage: FC<PageProps> = ({ livingCheck, dispatch }) => {
  const openLiving = () => {
    // if (whaleFace) {
    //   whaleFace.open();
    // }
  };

  return <div></div>;
};

export default connect(({ livingCheck }: { livingCheck: LivingCheckModelState }) => ({
  livingCheck,
}))(LivingCheckPage);
