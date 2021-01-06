/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import normalImg from '@/assets/img/normal_node.png';
import selectImg from '@/assets/img/select.png';
import receiveImg from '@/assets/img/receive.png';
import bSelectImg from '@/assets/img/customer/c_select.png';

import styles from './index.less';

interface OrderTrackItem {
  data: any; //  数据后续根据服务端来定义
  linkMap: any[];
}
const Page: React.FC<OrderTrackItem> = (props) => {
  const { data, linkMap } = props;
  const { receiveAddr, received, phone = '', trackDes = '', time } = data || {};

  return (
    <div className={styles.treeNodeBlock}>
      <img
        src={receiveAddr ? bSelectImg : received ? receiveImg : normalImg}
        className={styles.treeNodeImg}
      />

      <div className={styles.childContent}>
        <div className={styles.orderTrackText}>
          {trackDes}
          <span className={styles.phone}>{phone}</span>
        </div>
        <div className={styles.orderTrackText}>{time}</div>
      </div>
    </div>
  );
};

export default Page;
