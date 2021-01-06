import React, { useState } from 'react';

import logo from '@/assets/img/order/logo.png';
import closeIcon from '@/assets/img/order/close_icon.png';
import phoneOrder from '@/assets/img/order/phone_order.png';
import contactIcon from '@/assets/img/order/contact_icon.png';

import style from './index.less';

/**
 * 宽带信息
 */
interface BroadbandInfo {
  info: any;
}

const Page: React.FC<BroadbandInfo> = (props) => {
  const { info = {} } = props;
  const [storeList, updateStoreList] = useState(info.storeList || []);
  const [showAllStore, updateShowAllStore] = useState(true);

  /**
   * 改变展示的商品数
   */
  const changeView = (showAll: boolean) => {
    let showList: any[] = [];
    if (showAll) {
      storeList.forEach((element: any, index: number) => {
        if (index < 1) {
          showList.push(element);
        }
      });
    } else {
      showList = info.storeList || [];
    }

    updateStoreList(showList);
    updateShowAllStore(!showAll);
  };

  let buttonList: any[] = [];
  buttonList = [
    {
      color: 'grey',
      name: '申请售后',
    },
  ];

  return (
    <div className={style.productView}>
      <div className={style.pageView} onClick={() => changeView(showAllStore)}>
        <div className={style.leftView}>
          <img src={logo} className={style.iconLeft} />
          <div className={style.centerView}>中国电信自营商</div>
        </div>
        <img src={closeIcon} className={style.iconRight} />
      </div>
      <div className={style.orderNumberView}>
        <div className={style.leftView}>订单编号：1652656566565655</div>
        <div className={style.delivery}>上门安装</div>
      </div>

      {storeList.map((item: any, index: number) => {
        return (
          <div className={style.storeView} key={index + item.skuName}>
            <div className={style.centerSingleView}>
              <img src={phoneOrder} className={style.productImg} />
              <div className={style.rightView}>
                <span className={style.title}>全球通家庭版套餐100M宽带</span>

                <div className={style.priceView}>
                  <span className={style.priceSmall}>¥</span>
                  <span className={style.price}>543</span>
                  <span className={style.priceSmall}>.00</span>
                </div>
              </div>
            </div>
            <div className={style.bottomView}>
              {buttonList.map((item, index) => {
                return (
                  <div
                    className={item.color === 'red' ? style.btnRedView : style.btnGreyView}
                    key={item.name + index}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
            <div className={style.line}></div>
          </div>
        );
      })}

      <div className={style.contactView}>
        <img src={contactIcon} />
        <span>联系客服</span>
      </div>
    </div>
  );
};

export default Page;
