import React, { useState } from 'react';

import unSelectIcon from '@/assets/img/un_select.png';
import selectIcon from '@/assets/img/select.png';
import IconLocation from '@/assets/img/goodsdetail/location.png';

import styles from './index.less';

interface AddressItem {
  data?: any;
  onItemClick?: () => void;
}

const Page: React.FC<AddressItem> = (props) => {
  const { data = {}, onItemClick } = props;
  const { province = '', city = '', region = '', street = '', detailAddress = '', select = false } =
    data || {};
  const addr = `${province}${city}${region}${street}${detailAddress}`;
  return (
    <div
      className={styles.activityItem}
      onClick={() => {
        onItemClick && onItemClick();
      }}
    >
      <div className={styles.leftActivity}>
        <img src={IconLocation} />
        {addr}
      </div>
      <div className={styles.rightActivity}>
        <img src={!select ? unSelectIcon : selectIcon} />
      </div>
    </div>
  );
};

export default Page;
