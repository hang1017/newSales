import React from 'react';

import addressIcon from '@/assets/img/order/address_icon.png';
import nextIcon from '@/assets/img/order/next_icon.png';

import style from './index.less';

/**
 * 地址信息
 */
interface AddressInfo {
  info: any;
  onClick?: () => void;
}

const Page: React.FC<AddressInfo> = (props) => {
  const { info = {}, onClick } = props;
  const { receiverInfo = {}, expressNo = '' } = info;
  const { receiverDetailAddress = '', receiverName = '', receiverPhone = '' } = receiverInfo;
  let phone = receiverPhone;
  if (phone && phone.length === 11) {
    phone = `${receiverPhone.substr(0, 3)}****${receiverPhone.substr(7, phone.length)}`;
  }
  return (
    <div
      className={style.pageView}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className={style.leftView}>
        <img src={addressIcon} className={style.iconLeft} />
        <div className={style.centerView}>
          <div className={style.title}>
            {receiverName}
            <span className={style.phone}>{phone}</span>
          </div>
          <div className={style.detail}>地址：{receiverDetailAddress}</div>
        </div>
      </div>

      {expressNo ? <img src={nextIcon} className={style.iconRight} /> : ''}
    </div>
  );
};

export default Page;
