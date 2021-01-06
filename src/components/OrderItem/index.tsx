import React from 'react';
import logo from '@/assets/img/order/logo.png';
import finishIcon from '@/assets/img/order/finish_icon.png';
import deleteIcon from '@/assets/img/order/delete_icon.png';
import phoneOrder from '@/assets/img/order/phone_order.png';
import dataOrder from '@/assets/img/order/data_order.png';
import orderDing from '@/assets/img/order/orderDing.png';
import styles from './index.less';
import Utils from '@/utils/tool';
import { Toast } from 'antd-mobile';
import { OrderState, SourceType } from '@/utils/AppContext';
import { router, MyOrderModelState, connect } from 'alita';
import { pushOCRAuthViewController, pushViewController } from '@/utils/NativeBridge';

interface OrderItem {
  data?: any; // 按钮的字体
  onItemClick?: () => void;
  dispatch?: any;
  shouldRefresh?: () => void;
  onClickEvaluate?: () => void;
}

const Page: React.FC<OrderItem> = (props) => {
  const {
    data = {},
    onItemClick,
    dispatch,
    shouldRefresh = () => {},
    onClickEvaluate = () => {},
  } = props;
  const {
    storeName = '',
    orderId = '',
    totalAmount = '',
    orderStatus = '',
    storeList = [],
    isComment,
    newNbr,
    isIssue,
    accNbr,
    sourceType,
  } = data;

  // 判断是多个商品还是单个商品
  let singleProduct = true;
  if (storeList.length > 1) {
    singleProduct = false;
  }
  const renderSingleView = () => {
    let product = null;
    if (storeList.length > 0) {
      product = storeList[0];
    }
    const { skuName = '', skuAttr = '', skuPicFileUrl = '' } = product || {};
    let skuAttrList = [];

    if (skuAttr !== '') {
      skuAttrList = JSON.parse(skuAttr);
    }
    let skuAttrStrList: string[] = [];
    skuAttrList.forEach((element: { attrValue?: '' | undefined }) => {
      const { attrName, attrValName = '' } = element;
      skuAttrStrList.push(attrName + attrValName);
    });
    const skuAttrStr = skuAttrStrList.join(',');
    return (
      <div className={styles.centerSingleView}>
        <img src={skuPicFileUrl} className={styles.productImg} />
        <div className={styles.rightView}>
          <span className={styles.title}>{skuName}</span>
          <div className={styles.skuAttr}>{skuAttrStr}</div>
          <div className={styles.priceView}>
            <span className={styles.priceSmall}>¥</span>
            <span className={styles.price}>{totalAmount}</span>
            <span className={styles.priceSmall}>.00</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMultiView = () => {
    return (
      <div className={styles.centerMultiView}>
        <div className={styles.leftView}>
          {storeList.map((item: { skuPicFileId: string; skuPicFileUrl: string }, index: string) => {
            return (
              <div className={styles.multiImg} key={item.skuPicFileId + '' + index}>
                <img className={styles.dataImg} src={item.skuPicFileUrl} />
              </div>
            );
          })}
        </div>
        <div className={styles.rightView}>
          {storeList.length > 3 && <div className={styles.shadow}></div>}
          <div className={styles.totalView}>
            <div className={styles.priceView}>
              <span className={styles.priceSmall}>¥</span>
              <span className={styles.price}>{totalAmount}</span>
            </div>
            <span className={styles.total}>共{storeList.length}件</span>
          </div>
        </div>
      </div>
    );
  };

  // 渲染操作按钮
  let buttonList: any[] = [];
  let showDeleteView: boolean = false;
  switch (`${orderStatus}`) {
    case OrderState.finish:
      showDeleteView = true;
      if (isComment === 1000) {
        buttonList = [
          {
            color: 'red',
            name: '评价晒单',
            id: '2',
          },
        ];
        if (isIssue === 1000) {
          buttonList.push({
            color: 'red',
            name: '申请开票',
            id: '7',
          });
        } else if (isIssue === 1100) {
          buttonList.push({
            color: 'red',
            name: '查看发票',
            id: '8',
          });
        }
      }

      break;
    case OrderState.waitPrint:
    case OrderState.waitOutLibrary:
    case OrderState.waitPack:
    case OrderState.waitDelivery:
    case OrderState.waitSureDelivery:
    case OrderState.waitRecieve:
      showDeleteView = true;
      buttonList = [
        {
          color: 'red',
          name: '确认收货',
          id: '5',
        },
      ];

      if (newNbr === true) {
        buttonList.push({
          color: 'red',
          name: '实名激活',
          id: '6',
        });
      }
      if (isIssue === 1000) {
        buttonList.push({
          color: 'red',
          name: '申请开票',
          id: '7',
        });
      } else if (isIssue === 1100) {
        buttonList.push({
          color: 'red',
          name: '查看发票',
          id: '8',
        });
      }
      break;

    case OrderState.waitPay:
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
    default:
      break;
  }

  const btnClick = (item: any) => {
    const { id = '' } = item;
    switch (id) {
      case '1': // 申请售后
        break;
      case '2':
        // 评价
        onClickEvaluate();
        break;
      case '3': //
        dispatch!({
          type: 'orderDetail/toPayFor',
          payload: {
            orderId: data.orderId,
          },
        }).then((result) => {});
        break;
      case '4':
        dispatch!({
          type: 'myOrder/cancelOrderById',
          payload: {
            memberId: Utils.getStorageForJson('userInfo').memberId,
            orderId,
            callback: () => {
              Toast.info('订单已取消');
              shouldRefresh();
            },
          },
        });
      case '5':
        // buyerReceive
        dispatch!({
          type: 'myOrder/buyerReceive',
          payload: {
            memberId: Utils.getStorageForJson('userInfo').memberId,
            orderId,
            callback: () => {
              Toast.info('收货已完成');
              shouldRefresh();
            },
          },
        });
        break;
      case '6':
        if (sourceType === SourceType.fromBli) {
          router.push({
            pathname: '/nameAuthentication',
            query: {
              bsFlag: '1',
              orderId: orderId,
              accNbr: accNbr,
            },
          });
        } else {
          pushOCRAuthViewController((e) => {
            // 调用接口
            const base64 = e.base64;
            dispatch!({
              type: 'myOrder/archivesUpAndCertification',
              payload: {
                imageBest: base64,
                liveNess: '1',
                rotate: '1',
                OrderId: orderId,
                authChannel: '2000',
                accNbr,
              },
            });
          });
        }
        break;
      case '7':
        // 申请开票
        pushViewController(
          {
            className: 'VoiceManagementViewController',
            params: {
              type: '1',
              orderId,
            },
          },
          () => {
            shouldRefresh();
          },
        );
        break;
      case '8': {
        dispatch!({
          type: 'myOrder/queryInvoiceByOrderId',
          payload: {
            memberId: Utils.getStorageForJson('userInfo').memberId,
            orderId,
          },
        });
      }
      default:
        break;
    }
  };
  const renderButton = () => {
    return (
      <div className={styles.bottomView}>
        {buttonList.map((item, index) => {
          return (
            <div
              className={item.color === 'red' ? styles.btnRedView : styles.btnGreyView}
              key={item.name + index}
              onClick={(e) => {
                e.stopPropagation();
                btnClick(item);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={styles.listItem}
      onClick={() => {
        onItemClick && onItemClick();
      }}
    >
      {showDeleteView && <img src={finishIcon} className={styles.finishImg} />}

      <div className={styles.titleView}>
        <div className={styles.titleLeftView}>
          <img src={logo} className={styles.logoImg} />
          <span>{storeName}</span>
        </div>

        {showDeleteView && (
          <div className={styles.titleRightView}>
            <img src={deleteIcon} className={styles.deleteImg} />
          </div>
        )}
      </div>
      <div>{singleProduct ? renderSingleView() : renderMultiView()}</div>
      {buttonList.length ? <div className={styles.line}></div> : ''}
      {renderButton()}
    </div>
  );
};

export default connect(({ myOrder }: { myOrder: MyOrderModelState }) => ({ myOrder }))(Page);
