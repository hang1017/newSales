import React, { FC } from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.less';

import IconRightMore from '@/assets/img/rigth_more.png';

export interface WarrantyTypeCellProps {
  icon?: string;
  title?: string;
  subTitle?: string;
  onClick?: () => void;
}

const WarrantyTypeCell: FC<WarrantyTypeCellProps> = (props) => {
  return (
    <Flex direction="row" align="center" className={styles.cellBox} onClick={props.onClick}>
      <img src={props.icon} alt="" />
      <Flex.Item>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.subTitle}>{props.subTitle}</div>
      </Flex.Item>
      <img src={IconRightMore} alt="" />
    </Flex>
  );
};

export default WarrantyTypeCell;
