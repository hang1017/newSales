import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { WhiteSpace, Toast } from 'antd-mobile';
import IconShopAction from '@/assets/img/goodsdetail/shop-action.png';
import styles from './index.less';
import IconYHQ from '@/assets/img/goodsdetail/youhuiquan.png';
import IconLocation from '@/assets/img/goodsdetail/location.png';
import { AddressPicker } from '@alitajs/dform';
export const ActionListViewClickType = {
  clickSaleAttr: 1, //选择产品规格
  broughtVolume: 2, //领卷
  activityClick: 3, //活动
  chooseAddree: 4, //选择地址
  chooseMainNum: 5, // 选择主卡
  choosefreight: 7, // 运费
};
export const orderAttrsType = {
  mainPhone: 'HM', //订购属性手机号码
  address: 'DZ', //订购属性地址
};
export const isTypeCheck = (type: string, orderAttrs: Array<any>) => {
  for (const key in orderAttrs) {
    if (orderAttrs.hasOwnProperty(key)) {
      const element = orderAttrs[key];
      if (type === element.attrCode) {
        return true;
      }
    }
  }
  return true;
};
interface ActionListViewProps {
  onClick: (type: any) => void;
  attrQueryCOList: any; // 已选择的销售属性
  addrName?: string;
  orderAttrs: any; // 订购属性
  accNum?: string; // 号码
  lanId?: string; // 地址选择的lanId
  dispatch: any; //
  coupons: any; //活动内容
  selectCouponsName: string; //

  lanIdCallBack?: (lanId: string) => void; // 选择地址的本地网id回调
}
const ActionListView: FC<ActionListViewProps> = (props) => {
  // 设置地址选择框样式
  let div = document.getElementsByClassName('alitajs-dform-input-text');
  if (div) {
    for (let i = 0; i < div.length; i++) {
      div[i].style.cssText = 'text-align:left';
    }
  }
  let arrow = document.getElementsByClassName('am-list-arrow am-list-arrow-horizontal');
  if (arrow) {
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].style.cssText = `background-image:url(${IconShopAction});width:72px;height:72px`;
    }
  }
  const [addressData, setAddressData] = useState([]);
  const {
    onClick = () => {},
    attrQueryCOList = [],
    addrName,
    orderAttrs = [],
    accNum = '',
    dispatch,
    lanIdCallBack,
    lanId,
    coupons,
    selectCouponsName,
  } = props;

  let goodsAttrName = '';
  attrQueryCOList.map((item) => {
    goodsAttrName = goodsAttrName + item.attrName + '，';
  });
  if (goodsAttrName.length > 0) {
    goodsAttrName = goodsAttrName.substr(0, goodsAttrName.length - 1);
  }
  const AddressPickerClick = (click = false) => {
    // if (click===true && addressData.length === 0) {
    dispatch!({
      type: 'goodsDetail/queryAreaFatherList',
      payload: {},
    }).then((data) => {
      const addressData = data.map((item) => {
        return {
          label: item.areaName,
          value: item.areaId + ',' + item.lanId,
        };
      });
      setAddressData(addressData);
    });
    // }
  };

  return (
    <div className={styles.listView}>
      <WhiteSpace />
      {/* <div
        className={styles.listItem}
        onClick={() => onClick(ActionListViewClickType.broughtVolume)}
      >
        <div className={styles.itemHeader}>
          <span className={styles.title}>领券</span>
        </div>
        <div className={styles.itemBody}>
          <img src={IconYHQ} alt="" />
        </div>
        <div className={styles.itemFt}>
          <img src={IconShopAction} alt="" />
        </div>
      </div> */}
      <div
        className={coupons && coupons.length ? styles.listItem : 'hideElement'}
        onClick={() => onClick(ActionListViewClickType.activityClick)}
      >
        <div className={styles.itemHeader}>
          <span className={styles.title}>活动</span>
        </div>
        <div className={styles.itemBody}>
          <span>满减</span>
          {selectCouponsName}
        </div>
        <div className={styles.itemFt}>
          <img src={IconShopAction} alt="" />
        </div>
      </div>
      <WhiteSpace />
      {/* {isTypeCheck(orderAttrsType.mainPhone, orderAttrs) && (
        <AddressPicker
          hidden={false}
          title="归属"
          fieldProps="homeAddr"
          level={2}
          data={addressData}
          placeholderList={['请选择省', '请选择市']}
          onChangeLevel={(e) => {
            console.log(e);
            if (e.length === 1) {
              let string = e[0];
              const strings = string.split(',');
              const parentId = strings[0];
              dispatch!({
                type: 'goodsDetail/queryAreaNextLevel',
                parentId,
              }).then((data) => {
                const addressData = data.map((item) => {
                  return {
                    label: item.areaName,
                    value: item.areaId,
                  };
                });
                setAddressData(addressData);
              });
            } else if (e.length === 2) {
              let string = e[0];
              const strings = string.split(',');
              if (strings.length === 2) {
                const lanId = strings[1];
                lanIdCallBack && lanIdCallBack(lanId);
              }
            } else if (e.length === 0) {
              AddressPickerClick();
            }
          }}
          placeholder=""
        />
      )} */}
      {/* {isTypeCheck(orderAttrsType.mainPhone, orderAttrs) && (
        <div
          className={styles.listItem}
          onClick={() => {
            if (lanId) {
              onClick && onClick(ActionListViewClickType.chooseMainNum);
            } else {
              Toast.show('请先选择归属地！', undefined, false);
            }
          }}
        >
          <div className={styles.itemHeader}>
            <span className={styles.title}>号码</span>
          </div>
          <div className={styles.itemBody}>{accNum}</div>
          <div className={styles.itemFt}>
            <img src={IconShopAction} alt="" />
          </div>
        </div>
      )} */}

      <div
        className={styles.listItem}
        onClick={() => onClick(ActionListViewClickType.clickSaleAttr)}
      >
        <div className={styles.itemHeader}>
          <span className={styles.title}>已选</span>
        </div>
        <div className={styles.itemBody}>{goodsAttrName}</div>
        <div className={styles.itemFt}>
          <img src={IconShopAction} alt="" />
        </div>
      </div>
      {/* <div
        className={styles.listItem}
        onClick={() => onClick(ActionListViewClickType.chooseAddree)}
      >
        <div className={styles.itemHeader}>
          <span className={styles.title}>送至</span>
        </div>
        <div className={styles.itemBody}>
          <img className={styles.location} src={IconLocation} alt="" />
          {addrName}
        </div>
        <div className={styles.itemFt}>
          <img src={IconShopAction} alt="" />
        </div>
      </div>
      <div
        className={styles.listItem}
        onClick={() => onClick(ActionListViewClickType.choosefreight)}
      >
        <div className={styles.itemHeader}>
          <span className={styles.title}>运费</span>
        </div>
        <div className={styles.itemBody}>订单满88免运费</div>
        <div className={styles.itemFt}>
          <img src={IconShopAction} alt="" />
        </div>
      </div> */}
    </div>
  );
};

export default ActionListView;
