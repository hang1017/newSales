import React, { FC, useEffect, useState } from 'react';
import {
  OrderDetailModelState,
  ConnectProps,
  connect,
  history,
  router,
  setPageNavBar,
} from 'alita';
import { Button } from 'antd-mobile';

import backWhite from '@/assets/img/back_white.png';
import paySucessIcon from '@/assets/img/payment/pay_sucess.png';
import deliveryIcon from '@/assets/img/order/delivery_icon.png';
import DistributionInfo from '@/pages/order/components/DistributionInfo';
import AddressInfo from '@/pages/order/components/AddressInfo';
import ProductInfo from '@/pages/order/components/ProductInfo';
import OrderInfo from '@/pages/order/components/OrderInfo';
import CommodityInfo from '@/pages/order/components/CommodityInfo';
import BroadbandInfo from '@/pages/order/components/BroadbandInfo';
import SingleBtn from '@/pages/customer/components/SingleBtn';
import { OrderType, OrderState, OrderStatusText } from '@/utils/AppContext';
import waitPayStateIcon from '@/assets/img/order/wait_pay_state.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  orderDetail: OrderDetailModelState;
}
/**
 * 订单详情
 */
const OrderDetailPage: FC<PageProps> = ({ orderDetail, dispatch, location }) => {
  const { orderInfo = {}, orderType = '', orderState = '', payChannelType } = orderDetail;
  const activeIndex = location.query.activeIndex;

  const { extValues = {} } = orderInfo;

  const { receiverInfo = {}, orderStatusName = '', applyId, isCanAfterSale } = orderInfo;

  // 这里发起了初始化请求
  useEffect(() => {
    document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';

    dispatch!({
      type: 'orderDetail/queryDetail',
      payload: {
        orderId: location.query.orderId,
      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
      // dispatch!({
      //   type: 'orderDetail/save',
      //   payload: {
      //     orderId: '',
      //     orderInfo: {},
      //     showAllProduct: true,
      //     orderState: '',
      //     orderType: OrderType.product,
      //   },
      // });
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const goToOrderTracking = () => {
    if (orderInfo.expressNo) {
      history.push({
        pathname: '/order/orderTracking',
        query: {
          expressNo: orderInfo.expressNo,
        },
      });
    }
  };
  /**
   * 商品展示视图
   */
  const renderProductView = () => {
    return (
      <div>
        {/* <DistributionInfo
          info={orderInfo}
          onViewClick={() => {
            router.push({ pathname: '/order/orderTracking' });
          }}
        /> */}
        {(receiverInfo?.receiverDetailAddress ||
          receiverInfo?.receiverName ||
          receiverInfo?.receiverPhone) && (
          <AddressInfo info={orderInfo} onClick={goToOrderTracking} />
        )}
        <ProductInfo
          info={orderInfo}
          orderId={location.query.orderId}
          onClickEvaluate={() => {
            dispatch!({
              type: 'evaluate/save',
              payload: {
                orderInfo: {
                  ...orderInfo,
                  orderId: location.query.orderId,
                },
              },
            });
            router.push({ pathname: '/order/storeEvaluate' });
          }}
        />
        <OrderInfo info={orderInfo} orderType={OrderType.product} />
        <CommodityInfo info={orderInfo} />
      </div>
    );
  };
  /**
   *  头部 待付款，待收货界面
   */
  const renderTopStateView = (myOrderState: string) => {
    const { payAmount = '', orderId, restPayTime = '', totalAmount = '' } = orderInfo;
    if (orderState === OrderState.waitPay) {
      return (
        <div className={styles.OrderStateStyle}>
          <div className={styles.orderSubStyle}>
            <img className={styles.oederstateImgStyle} src={waitPayStateIcon} />
            <span className={styles.orderStateFontStyle}>{orderStatusName}</span>
          </div>
          <div className={styles.payStyle}>
            <span className={styles.payFontStyle}>需付款:</span>
            <span className={styles.payFontStylesub}>{'¥' + payAmount}</span>
            <span className={styles.payFontStyle}>{'剩余：' + restPayTime}</span>
          </div>
          <div
            className={styles.deialStyle}
            onClick={() => {
              dispatch!({
                type: 'orderDetail/toPayFor',
                payload: {
                  orderId,
                  totalAmount,
                  payChannelType,
                },
              });
            }}
          >
            <span className={styles.toPayStyle}>去支付</span>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.OrderStateStyle}>
        <span className={styles.orderStateFontStyle}>{orderStatusName}</span>
      </div>
    );
  };
  /**
   * 宽带展示视图
   */
  const renderBroadbandView = () => {
    return (
      <div>
        <DistributionInfo
          info={orderInfo}
          onViewClick={() => {
            router.push({ pathname: '/order/orderTracking' });
          }}
        />
        {(receiverInfo?.receiverDetailAddress ||
          receiverInfo?.receiverName ||
          receiverInfo?.receiverPhone) && (
          <AddressInfo info={orderInfo} onClick={goToOrderTracking} />
        )}
        <BroadbandInfo info={orderInfo} />
        {(orderInfo?.receiverDetailAddress ||
          orderInfo?.receiverName ||
          orderInfo?.receiverPhone) && (
          <OrderInfo info={orderInfo} orderType={OrderType.broadband} />
        )}
        <CommodityInfo info={orderInfo} />
      </div>
    );
  };

  /**
   * 充值展示视图
   */
  const renderReChangeView = () => {
    return (
      <div>
        {(orderInfo?.receiverDetailAddress ||
          orderInfo?.receiverName ||
          orderInfo?.receiverPhone) && (
          <OrderInfo info={orderInfo} orderType={OrderType.recharge} />
        )}
      </div>
    );
  };

  const renderFinishView = () => {
    return (
      <div className={styles.payIconBlock}>
        <img src={paySucessIcon} alt="" />
        <span>完成!</span>
      </div>
    );
  };

  const renderDeliveryView = () => {
    return (
      <div className={styles.payIconBlock}>
        <img src={deliveryIcon} alt="" />
        <span>订单派送中!</span>
      </div>
    );
  };

  const renderWaitPayView = () => {
    return (
      <div className={styles.payIconBlock}>
        <img src={paySucessIcon} alt="" />
        <span>等待付款!</span>
      </div>
    );
  };

  let buttonList: any[] = [];
  buttonList = [
    {
      color: 'grey',
      name: '申请售后',
    },
  ];
  const orderStateHeight = orderState === OrderState.waitPay ? 300 : 'auto';

  return (
    <div className={styles.paySuccessPage}>
      <div className={styles.payInfo}>
        <img
          src={backWhite}
          alt=""
          onClick={() => {
            history.goBack();
            // history.replace({
            //   pathname: '/order/myOrder',
            //   query: {
            //     activeIndex,
            //   },
            // });
          }}
        />
        <div className={styles.payIconBlock} style={{ height: orderStateHeight }}>
          {renderTopStateView(orderState)}
        </div>
        {extValues?.type === 'starPkg' &&
          ['1600', '1700', '1900', '1100'].indexOf(orderInfo?.orderStatus) !== -1 && (
            <div className={styles.btnDiv}>
              <Button
                className={styles.btn}
                onClick={() => {
                  router.push({
                    pathname: '/starPkg/starHelp',
                    query: {
                      orderId: orderInfo?.orderId,
                      phone: orderInfo?.phoneNum,
                    },
                  });
                }}
              >
                助力分享
              </Button>
            </div>
          )}

        {
          // {orderState === OrderState.waitPay && renderWaitPayView()}
          // {orderState === OrderState.finish && renderFinishView()}
          // {orderState === OrderState.waitRecieve && renderDeliveryView()}
        }
      </div>
      <div className={styles.whitePage}>
        {orderType === OrderType.product && renderProductView()}
        {orderType === OrderType.broadband && renderBroadbandView()}
        {orderType === OrderType.recharge && renderReChangeView()}
      </div>

      {/* <div className={styles.btnView}>
        <div className={styles.bottomView}>
          {buttonList.map((item, index) => {
            return (
              <div
                className={item.color === 'red' ? styles.btnRedView : styles.btnGreyView}
                key={item.name + index}
                onClick={() => {
                  if (item.color !== 'red') {
                    history.push({
                      pathname: '/salesWarranty',
                      query: {
                        item: JSON.stringify(orderInfo),
                      },
                    });
                  }
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
     */}

      {applyId || isCanAfterSale === '1' ? (
        <div className={styles.footBtn}>
          <SingleBtn
            text={applyId ? '售后进度' : '申请售后'}
            canClick
            onClick={() => {
              if (applyId) {
                //
                history.push({
                  pathname: '/afterSale/refundResult',
                  query: {
                    itemData: JSON.stringify({ applyId }),
                  },
                });
              } else {
                history.push({
                  pathname: '/afterSale/applyAfterSale',
                  query: {
                    data: JSON.stringify(orderInfo),
                  },
                });
              }
            }}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default connect(({ orderDetail }: { orderDetail: OrderDetailModelState }) => ({
  orderDetail,
}))(OrderDetailPage);
