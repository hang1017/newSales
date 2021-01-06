import React, { useState } from 'react';

import AddressItem from '@/components/AddressItem';

import closeIcon from '@/assets/img/close.png';
import styles from './index.less';
import IconLocation from '@/assets/img/goodsdetail/location.png';
import { router } from 'alita';

interface AddressAlert {
  addressData?: any; // 地址数据
  closeClick?: (e: any) => void;
  show?: boolean;
  onSelected?: (item: any, selectIndex: number) => void;
  selectIndex?: number;
}

const Page: React.FC<AddressAlert> = (props) => {
  const { show = false, closeClick = () => {}, addressData = [], onSelected, selectIndex } = props;
  console.log('caca', addressData);
  let addr: any = [];
  addressData.forEach((element: any, index: number) => {
    if (index === selectIndex) {
      addr.push({ ...element, select: true });
    } else {
      addr.push({ ...element, select: false });
    }
  });
  const [dataList, updateDateList] = useState(addr);

  const changeData = (item: any, selectIndex: number) => {
    const { province = '', city = '', region = '', street = '', detailAddress = '' } = item || {};
    const addr = `${province}${city}${region}${street}${detailAddress}`;
    onSelected && onSelected(addr, selectIndex);
    dataList.forEach((element: any) => {
      if (element.receiveAddrId === item.receiveAddrId) {
        element.select = true;
      } else {
        element.select = false;
      }
    });

    updateDateList(dataList);
  };

  return (
    <div className={styles.actionModel}>
      {show && (
        <div
          className={styles.actionBg}
          onClick={(e) => {
            e.stopPropagation();
            closeClick(e);
          }}
        ></div>
      )}
      <div className={`${styles.actAlert} ${show && styles.show}`}>
        <div className={styles.alertHead}>
          <div className={styles.alertTitle}>配送至</div>
          <div
            className={styles.rightClose}
            onClick={(e) => {
              e.stopPropagation();
              closeClick(e);
            }}
          >
            <img src={closeIcon} alt="" />
          </div>
        </div>
        <div className={styles.list}>
          {dataList.map((item: any, index: number) => {
            return <AddressItem data={item} onItemClick={() => changeData(item, index)} />;
          })}
        </div>
        <div
          className={styles.alertFooter}
          onClick={() => {
            router.push({ pathname: '/shopProcess/addDeliveryAddr' });
          }}
        >
          <div className={styles.footerBtn}>新建地址</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
