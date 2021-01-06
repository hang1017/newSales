import React, { useState } from 'react';

import unSelectIcon from '@/assets/img/un_select.png';
import selectIcon from '@/assets/img/select.png';

import styles from './index.less';

interface SingleBtn {
  data?: any; // 按钮的字体
  onClick?: () => void;
}

const Page: React.FC<SingleBtn> = (props) => {
  const { data = {} } = props;
  const { promName = '', select = false } = data || {};

  const [selectFlag, updateFlag] = useState(select);

  return (
    <div
      className={styles.activityItem}
      onClick={() => {
        updateFlag(!selectFlag);
      }}
    >
      <div className={styles.leftActivity}>
        <span>满减</span>
        {promName}
      </div>
      {
        //   <div className={styles.rightActivity}>
        //   <img src={!selectFlag ? unSelectIcon : selectIcon} />
        // </div>
      }
    </div>
  );
};

export default Page;
