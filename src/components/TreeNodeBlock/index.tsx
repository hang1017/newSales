/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import firstImg from '@/assets/img/customer/c_select.png';
import normalImg from '@/assets/img/normal_node.png';

import styles from './index.less';

interface TreeNodeItem {
  data: any; //  数据后续根据服务端来定义
  isFirst: boolean; //  是否第一个节点
  linkMap: any[];
}
const Page: React.FC<TreeNodeItem> = (props) => {
  const { data, isFirst, linkMap } = props;
  const { trackName = '' } = data || {};

  const childHtml = linkMap.map((childItem) => {
    const { key, subTitle, isPhone } = childItem;
    return (
      <div className={data[key] ? styles.childContent : 'hideElement'} key={key}>
        <span className={subTitle ? '' : 'hideElement'}>{subTitle}：</span>
        <span className={isPhone ? styles.phone : ''}>{data[key]}</span>
      </div>
    );
  });

  return (
    <div className={styles.treeNodeBlock}>
      <img src={isFirst ? firstImg : normalImg} className={styles.treeNodeImg} />

      <div className={styles.childBlock}>
        <div className={styles.childBlockTitle}>
          <div className={styles.childTitle}>{trackName}</div>
        </div>
        <div style={{ marginTop: '4px' }}>{childHtml}</div>
      </div>
    </div>
  );
};

export default Page;
