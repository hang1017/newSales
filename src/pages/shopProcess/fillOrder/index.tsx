import React, { FC, useEffect } from 'react';
import { FillOrderModelState, ConnectProps, connect, history } from 'alita';
import { Flex, Toast } from 'antd-mobile';

import rigthMoreIcon from '@/assets/img/rigth_more.png';
import moreAlertIcon from '@/assets/img/payment/more_alert.png';
import smallLogoIcon from '@/assets/img/samll_log.png';
import phoneImg from '@/assets/img/payment/pro_phone.png';

import Utils from '@/utils/tool';

import styles from './index.less';
import { AddressType } from '@/utils/AppContext';

const { Item } = Flex;
interface PageProps extends ConnectProps {
  fillOrder: FillOrderModelState;
}

const FillOrderPage: FC<PageProps> = ({ fillOrder, dispatch }) => {
  const { memberId, memberReceiveAddrCO = {} } = Utils.getStorageForJson('userInfo') || {};
  const { addressInfo, commitData } = fillOrder;
  // 这里发起了初始化请求
  useEffect(() => {
    if (!memberId) {
      Toast.info('您还未登录，请先登录', 3);
      history.push({
        pathname: '/login',
      });
    } else {
      if (memberReceiveAddrCO && memberReceiveAddrCO.receiveAddrId) {
        dispatch!({
          type: 'fillOrder/save',
          payload: {
            addressInfo: addressInfo || memberReceiveAddrCO,
          },
        });
        dispatch!({
          type: 'fillOrder/selAddress',
          payload: {
            memberId,
            receiveAddrId: (memberReceiveAddrCO && memberReceiveAddrCO.receiveAddrId) || '',
            // receiveAddrId: '10',
          },
        });
      }
    }

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  const { payAmount, storeList = [] } = commitData;
  const tempPayAmount = Utils.getIntegerAndDecimal(payAmount);

  const goToSelectAddr = () => {
    //(window as any).isLogin = true;
    if (memberId) {
      history.push({
        pathname: '/shopProcess/deliveryAddr',
      });
    } else {
      history.push({
        pathname: '/login',
      });
    }
  };
  const {
    defaultAddr = '',
    province,
    city = '',
    region = '',
    street = '',
    detailAddress = '',
    name = '',
    phoneNumber = '',
  } = addressInfo;
  let isDefault = false;
  if (defaultAddr === AddressType.default) {
    isDefault = true;
  }
  const addressName = `${province}${city}${region}${street}`;
  let phone = phoneNumber;
  if (phone.length === 11) {
    phone = `${phoneNumber.substr(0, 3)}****${phoneNumber.substr(7, phone.length)}`;
  }
  /**
   * 提交订单
   */
  const commitOrder = () => {
    dispatch!({
      type: 'fillOrder/commitOrder',
      payload: {
        memberId,
      },
    }).then((data) => {
      const { payUrl } = data;
      window.location.href = payUrl;
    });
  };

  return (
    <div className={styles.fillOrder}>
      <div className={styles.fillAddr} onClick={goToSelectAddr}>
        {province ? (
          <div className={styles.leftAddr}>
            <div>
              {isDefault && <span>默认</span>} {addressName}
            </div>
            <div className={styles.addrDetails}>{detailAddress}</div>
            <div>
              {name} {phone}
            </div>
          </div>
        ) : (
          <div>请选择收货地址</div>
        )}
        <div className={styles.rightAddr}>
          <img src={rigthMoreIcon} alt="" />
        </div>
      </div>
      <Flex className={styles.fillOrderBlock}>
        <Item>支付方式</Item>
        <Item className="textRigth">
          在线支付
          <img src={moreAlertIcon} alt="" className={styles.moreAlertIcon} />
        </Item>
      </Flex>

      {storeList.map((item) => {
        return (
          <div className={styles.fillOrderBlock}>
            <Flex>
              <Item>
                <img src={smallLogoIcon} style={{ marginRight: '6px' }} />
                {item.storeName}
              </Item>
              <Item className="textRigth">
                <span className={styles.grayFont}>已免运费</span>
              </Item>
            </Flex>
            {item.goodsList.map((child) => {
              const { goodsName, skuName, picUrl, quantity, price, accNum } = child;
              const tempPrice = Utils.getIntegerAndDecimal(price);
              return (
                <div className={styles.prodInfoBlock}>
                  <img src={picUrl || phoneImg} alt="" />
                  <div className={styles.skuBlock}>
                    <div className={styles.prodDes}>{goodsName}</div>
                    <div className={styles.subDes}>{skuName}</div>
                    <div>
                      <span className={styles.accNumber}>手机</span>
                      {accNum}
                    </div>
                  </div>
                  <div className={styles.priceBlock}>
                    <div>
                      {' '}
                      <span className={styles.samllText}>￥</span>
                      {tempPrice.integer}{' '}
                      <span className={styles.samllText}>{tempPrice.decimal}</span>
                    </div>
                    <div className={styles.quantity}>X{quantity}</div>
                  </div>
                </div>
              );
            })}
            <Flex>
              <Item>留言</Item>
              <Item className="textRigth">
                <input placeholder="选填，请先和商家协商一致" style={{ width: '100%' }} />
              </Item>
            </Flex>
            <Flex>
              <Item>优惠券</Item>
              <Item className="textRigth">
                无可用
                <img src={moreAlertIcon} alt="" className={styles.moreAlertIcon} />
              </Item>
            </Flex>
            <Flex>
              <Item className={styles.marginBottom}>商品金额</Item>
              <Item className="textRigth">
                <span className={styles.blodPriceText}>
                  ￥{tempPayAmount.integer}
                  {tempPayAmount.decimal}
                </span>
              </Item>
            </Flex>
            <Flex>
              <Item className={styles.marginBottom}>运费(总重：0.060kg)</Item>
              <Item className="textRigth">
                <span className={styles.tipText}>+ ￥0.00</span>
              </Item>
            </Flex>
          </div>
        );
      })}

      <div className={styles.footBtn}>
        <div className={styles.blockFlex}>
          <span className={styles.decimal}>￥</span>
          <span className={styles.integer}>{tempPayAmount.integer}</span>
          <span className={styles.decimal}>{tempPayAmount.decimal}</span>
        </div>
        <div className="textRigth">
          <span className={styles.submit} onClick={commitOrder}>
            提交订单
          </span>
        </div>
      </div>
    </div>
  );
};

export default connect(({ fillOrder }: { fillOrder: FillOrderModelState }) => ({ fillOrder }))(
  FillOrderPage,
);
