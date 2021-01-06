import React from 'react';

import Utils from '@/utils/tool';
import editAddrIcon from '@/assets/img/payment/edit_addr.png';
import { AddressType } from '@/utils/AppContext';
import styles from './index.less';

interface EmptyItem {
  data: any;
  itemClick: (item: any) => void;
  editAddrClick: (item: any) => void;
}

const Page: React.FC<EmptyItem> = (props) => {
  const { data, itemClick, editAddrClick } = props;
  const {
    name = '',
    phoneNumber = '',
    province = '',
    city = '',
    region = '',
    street = '',
    detailAddress = '',
    defaultAddr = '',
  } = data;
  const addr = `${province}${city}${region}${street || ''}${detailAddress}`;
  let isDefault = false;
  if (defaultAddr === AddressType.default) {
    // 默认地址
    isDefault = true;
  }
  return (
    <div className={styles.addrItem}>
      <div
        className={styles.addrInfo}
        onClick={() => {
          itemClick(data);
        }}
      >
        <div>
          <span className={styles.name}>{name}</span>
          <span className={styles.phone}>{Utils.phoneNumberDesensit(phoneNumber)}</span>
          <span className={isDefault ? styles.defalut : 'hideElement'}>默认地址</span>
        </div>
        <div className={styles.address}>{addr}</div>
      </div>
      <div
        className={styles.editIcon}
        onClick={() => {
          editAddrClick(data);
        }}
      >
        <img src={editAddrIcon} />
      </div>
    </div>
  );
};

export default Page;
