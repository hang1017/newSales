import React, { FC } from 'react';
import { history } from 'alita';
import { WhiteSpace, Toast, Modal } from 'antd-mobile';
import styles from './index.less';
import IconLogo from '@/assets/img/samll_log.png';
import IconRightArrow from '@/assets/img/rigth_more.png';
import IconFinishOrder from '@/assets/img/order/finish_icon.png';
import Utils from '@/utils/tool';
import { OrderStatusText, OrderState } from '@/utils/AppContext';

const alert = Modal.alert;

interface OrderListCellProps {
  data: any;
  itemClick: (orderId: string) => void;
  cancelOrder?: (data: any) => void;
  dispatch?: any;
  shouldRefresh?: () => void;
}

const OrderListCell: FC<OrderListCellProps> = (props) => {
  const { data = {}, itemClick, cancelOrder, dispatch, shouldRefresh } = props;
  const {
    storeName,
    storeList = [],
    orderId,
    orderStatus,
    orderStatusName = '',
    createDate = '--',
    totalAmount,
    isCanAfterSale = '',
    payChannelType = '',
  } = data || {};
  const renderOrderStatus = () => {
    return (
      <div className={orderStatus === '1000' ? styles.redStatus : styles.orderStatus}>
        {orderStatusName}
      </div>
    );
  };

  const orderList = (): Array<{ title: string; onPress?: () => void }> => {
    return [
      {
        title: '取消订单',
        onPress: () => {
          cancelOrder(data);
        },
      },
    ];
  };

  const renderActionBtns = (): React.ReactNode | string => {
    return orderList().length ? (
      <div className={styles.footerBtns}>
        {orderList().map((item) => {
          return (
            <div
              onClick={() => {
                if (typeof item.onPress === 'function') {
                  item.onPress();
                }
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    ) : (
      ''
    );
  };

  const renderOrderInfo = () => {
    if (storeList) {
      return storeList.map((item: any) => {
        const {
          goodsName,
          skuName,
          skuPrice,
          skuPicFileUrl,
          skuId,
          skuQuantity,
          promotionPrice,
          realAmount = '',
        } = item;
        const pice = Utils.getIntegerAndDecimal(skuPrice);
        const promotion = Utils.getIntegerAndDecimal(promotionPrice);
        return (
          <div
            onClick={() => {
              // if (orderStatus === '2000') {
              //   return false;
              // }
              itemClick(orderId);
            }}
          >
            <div className={styles.orderInfo} key={skuId}>
              <div className={styles.leftContent}>
                <img src={skuPicFileUrl} className={styles.goodsPic} alt="" />
                <div>
                  <div className={styles.goodsName}>{goodsName}</div>
                  <div className={styles.skuNum}>x {skuQuantity}</div>
                </div>
              </div>

              <div className={styles.price}>
                <div>
                  <span>{realAmount}</span> 元
                </div>
              </div>
            </div>

            {
              // <div className={parseInt(promotionPrice) > 0 ? styles.promotion : 'hideElement'}>
              //   优惠：{promotion.integer}
              //   <span>{promotion.decimal}</span>
              // </div>
            }
          </div>
        );
      });
    }
    return <div />;
  };
  // 渲染操作按钮
  let buttonList: any[] = [];
  let showDeleteView: boolean = false;
  switch (`${orderStatus}`) {
    case OrderState.finish:
      if (isCanAfterSale && `${isCanAfterSale}` === '1') {
        buttonList.push({
          color: '',
          name: '申请售后',
          id: '6',
        });
      }

      break;
    case OrderState.waitPrint: // 等待打印
    case OrderState.waitOutLibrary: // 等待出库
    case OrderState.waitPack: // 等待打包
    case OrderState.waitSureDelivery: //  等待确认发货
    case OrderState.waitRecieve: // 待收货,即  已付款
      showDeleteView = true;
      buttonList = [
        {
          color: 'red',
          name: '确认收货',
          id: '5',
        },
      ];
      if (isCanAfterSale && `${isCanAfterSale}` === '1') {
        buttonList.push({
          color: '',
          name: '申请售后',
          id: '6',
        });
      }
      break;
    case OrderState.waitPay: // 等待支付
      buttonList = [
        {
          color: 'red',
          name: '去支付',
          id: '3',
        },
        {
          color: 'red',
          name: '取消订单',
          id: '4',
        },
      ];
      break;
    case OrderState.waitDelivery: // 等待发货
      if (isCanAfterSale && `${isCanAfterSale}` === '1') {
        buttonList.push({
          color: '',
          name: '申请售后',
          id: '6',
        });
      }
      break;
    default:
      break;
  }

  const btnClick = (item: any) => {
    const { id = '' } = item;
    switch (id) {
      case '1': //
        break;
      case '2':
        // 评价
        break;
      case '3': //
        dispatch!({
          type: 'orderDetail/toPayFor',
          payload: {
            orderId: data.orderId,
            totalAmount,
            payChannelType,
          },
        });
        break;
      case '4':
        alert('确认取消订单？', '', [
          { text: '取消', onPress: () => {} },
          {
            text: '确认',
            style: {
              color: '#2ca5ff',
            },
            onPress: () => {
              dispatch!({
                type: 'myOrder/cancelOrderById',
                payload: {
                  orderId,
                  callback: () => {
                    Toast.info('订单已取消');
                    shouldRefresh();
                  },
                },
              });
            },
          },
        ]);
        break;
      case '5':
        // buyerReceive
        dispatch!({
          type: 'myOrder/buyerReceive',
          payload: {
            orderId,
            callback: () => {
              Toast.info('收货已完成');
              shouldRefresh();
            },
          },
        });
        break;
      case '6': // 申请售后
        history.push({
          pathname: '/afterSale/applyAfterSale',
          query: {
            data: JSON.stringify(data),
          },
        });
        break;
      case '7':
        // 申请开票
        break;
      // eslint-disable-next-line no-lone-blocks
      case '8':
        {
          dispatch!({
            type: 'myOrder/queryInvoiceByOrderId',
            payload: {
              memberId: Utils.getStorageForJson('userInfo').memberId,
              orderId,
            },
          });
        }
        break;
      default:
        break;
    }
  };
  const renderButton = () => {
    return (
      <div className={styles.bottomContent}>
        <div className={styles.bottomDes}>
          共<span>{storeList.length}</span>件商品 实付<span>{totalAmount}</span>元
        </div>
        <div className={styles.bottomView}>
          {buttonList.map((item, index) => {
            const { name, id } = item;
            let parmaAction = '';
            switch (id) {
              case '3':
                parmaAction = 'orderPay';
                break;
              case '4':
                parmaAction = 'cancleOrder';
                break;
              case '5':
                parmaAction = 'receive';
                break;
              default:
                break;
            }
            return (
              <div
                param-action={parmaAction}
                className={item.color === 'red' ? styles.btnRedView : styles.btnGreyView}
                key={item.name + index}
                onClick={(e) => {
                  e.stopPropagation();
                  btnClick(item);
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <>
      <WhiteSpace size="lg" />
      <div className={styles.orderCell} key={orderId}>
        <div className={styles.storeInfo}>
          <div className={styles.storeMain}>
            <span className={styles.storeName}>下单时间：{createDate}</span>

            {/*   <span className={styles.tagName}>自营</span>
                <img src={IconRightArrow} alt="" /> */}
          </div>
          {renderOrderStatus()}
        </div>
        {renderOrderInfo()}
        {/* {orderStatus + '' === '1000' ? renderActionBtns() : ''} */}
        <img
          src={IconFinishOrder}
          className={orderStatus + '' === '1900' ? styles.finishOrder : 'hideElement'}
          alt=""
        />
        {renderButton()}
      </div>
    </>
  );
};

export default OrderListCell;
