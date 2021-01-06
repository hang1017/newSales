/* eslint-disable no-nested-ternary */
import React, { FC, useEffect, useState } from 'react';
import { PaySuccessModelState, ConnectProps, connect, history, setPageNavBar } from 'alita';
import Utils from '@/utils/tool';
import paySuccessIcon from '@/assets/img/customer/pay_success.png';
import payFailIcon from '@/assets/img/customer/pay_fail.png';
import serviceLeft from '@/assets/img/customer/service_left.png';
import serviceRight from '@/assets/img/customer/service_right.png';
import { Toast } from 'antd-mobile';

import ServiceItem from '@/pages/customer/components/ServiceItem';
import styles from './index.less';

interface PageProps extends ConnectProps {
  paySuccess: PaySuccessModelState;
}

const PaySuccessPage: FC<PageProps> = ({ paySuccess, dispatch }) => {
  const [payAmount, setPayAmount] = useState<string | number>('');
  const getQueryString = (name: string) => {
    const url = window.location.href;
    if (!(url.indexOf('?') > -1)) {
      return null;
    }
    const param = url.split('?')[2];
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');

    const result = param && param.match && param.match(reg);
    if (result != null) {
      return result[2];
    }
    return null;
  };

  // const payAmount = Utils.getQueryString('payAmount');
  const retnCode = Utils.getQueryString('retnCode');
  const orderId = Utils.getQueryString('orderSeq');
  const payType = Utils.getQueryString('payType') || '';
  const { serviceList, signNumber } = paySuccess;

  const [resultState] = useState(retnCode === '0000');

  const getPageTitle = (payTypeRes: string, resultStateRes: boolean, orderIdRes: string) => {
    if (orderIdRes) {
      if (resultStateRes) {
        if (payTypeRes === '1') return '代付成功';
        return '支付成功';
      }
      if (payTypeRes === '1') return '代付失败';
      return '支付失败';
    }
    return '支付结果';
  };

  // 这里发起了初始化请求
  useEffect(() => {
    setPageNavBar({
      pagePath: '/customer/paySuccess',
      navBar: {
        pageTitle: getPageTitle(payType, resultState, orderId),
        title: getPageTitle(payType, resultState, orderId),
        onLeftClick: () => {
          dispatch!({
            type: 'indexList/goToIndexList',
          });
        },
      },
    });
    let payStatus = null;
    // 清空订单确认页面的数据
    if (retnCode === '0000') {
      dispatch!({
        type: 'orderConfirm/save',
        payload: {
          tabeValues: {},
          tabOneData: {},
          tabTwoData: {},
          initiazePage: 0,
          homeAddrData: [], // 区域数据
          skuList: [],
          selectPhoneValue: {},
          needShowOrdAddr: '', // 是否需要展示选址的功能
          claimType: [], // 配送方式
        },
      });

      dispatch!({
        type: 'oldUserLoginSuccess/save',
        payload: {
          cartOrderId: '',
          commonAttrData: [],
          commonAttrValue: {},
        },
      });

      payStatus = '1000';
    } else {
      payStatus = '1100';
    }
    if (orderId) {
      // 通过订单id 查询
      dispatch!({
        type: 'paySuccess/quryOrderBaseInfoByOrderIdModal',
        payload: {
          orderId,
        },
      }).then((res: any) => {
        const { extValues, payAmount } = res;
        setPayAmount(payAmount);
        if (extValues?.type === 'starPkg') {
          setTimeout(() => {
            Toast.show('即将前往助力下单页面!');
          }, 500);
          setTimeout(() => {
            Toast.hide();
            history.push({
              pathname: '/starPkg/starHelp',
              query: {
                orderId,
                paySuccess: '1', // 代表从支付成功回调页面跳转过去的
                phone: extValues?.phone,
              },
            });
          }, 2000);
        }
      });
      dispatch!({
        type: 'paySuccess/queryNoSignPhoneNum',
        payload: {
          orderId,
        },
      });
      dispatch!({
        type: 'paySuccess/payStatus',
        payload: {
          orderId,
          payStatus,
        },
      });
    }

    // 清空数据
    dispatch!({
      type: 'payConfirm/save',
      payload: {
        addressInfo: {},
        orderInfo: {},
        nameAndNo: {},
      },
    });
    dispatch!({
      type: 'nameAuthentication/save',
      payload: {
        userInfo: {},
        catchTime: 0,
      },
    });
    dispatch!({
      type: 'paySuccess/qryGoodsSpecialRuls',
      payload: {
        sType: '1000',
        storeId: -1,
      },
    });
  }, []);
  const goToOrder = () => {
    history.push({
      pathname: '/order/myOrder',
      query: {
        activeIndex: 0,
        type: 'index',
      },
    });
  };

  return (
    <div className={styles.payResult}>
      {!retnCode && (
        <div className={styles.careText}>注：您可以点击按钮，查看订单支付完成情况。</div>
      )}
      {retnCode && (
        <div className={styles.payInfo}>
          {retnCode && (
            <img
              src={resultState ? paySuccessIcon : payFailIcon}
              alt=""
              className={styles.payIcon}
            />
          )}
          {retnCode && (
            <div className={styles.payDes}>
              {resultState
                ? payType === '1'
                  ? '代付成功'
                  : '支付成功'
                : payType === '1'
                ? '代付失败'
                : '支付失败'}
            </div>
          )}
          {retnCode && payAmount && <div className={styles.payAmount}>{payAmount}元</div>}
          <div className={styles.orderDes}>
            {resultState ? '1-3个工作日内将安排发货，详情请查看订单' : ''}
          </div>
        </div>
      )}
      <div className={styles.footBtn} onClick={goToOrder}>
        <span param-action="order">查看订单</span>
      </div>
      {resultState && signNumber && signNumber.length > 0 && serviceList.length > 0 ? (
        <div className={styles.serviceList}>
          <div className={styles.serviceTitle}>
            <img src={serviceLeft} alt="" className={styles.serviceIcon} />
            <span>服务签约</span>
            <img src={serviceRight} alt="" className={styles.serviceIcon} />
          </div>
          <div className={styles.siginPhoneBlock}>
            <div className={styles.siginPhoneLabel}>签约号码</div>
            <div className={styles.siginPhone}>{signNumber[0].memberAcct}</div>
          </div>
          <div className={styles.serviceContent}>
            {serviceList.map((item) => {
              return (
                <ServiceItem
                  isMyService={false}
                  data={item}
                  accNbr={signNumber.length ? signNumber[0].memberAcct : ''}
                  dispatch={dispatch}
                  selectPhoneObj={{
                    lanId: signNumber.length ? signNumber[0].lanId : '',
                    numberInstId: signNumber.length ? signNumber[0].numberInstId : '',
                    accNbr: signNumber.length ? signNumber[0].memberAcct : '',
                  }}
                  myOrderSevice={(res) => {
                    if (res.success) {
                      // 跳转到支付页面
                      window.location.href = res.data;
                    } else {
                      Toast.fail(res.errMessage || '签约失败，请稍候再试', 1);
                    }
                    // console.log('签约结果:' + data)
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default connect(({ paySuccess }: { paySuccess: PaySuccessModelState }) => ({ paySuccess }))(
  PaySuccessPage,
);
