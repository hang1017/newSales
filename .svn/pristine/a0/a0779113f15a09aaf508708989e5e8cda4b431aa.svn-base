import React, { useState } from 'react';
import { history, router } from 'alita';
import logo from '@/assets/img/order/logo.png';
import closeIcon from '@/assets/img/order/close_icon.png';
import phoneOrder from '@/assets/img/order/phone_order.png';
import contactIcon from '@/assets/img/order/contact_icon.png';

import style from './index.less';
import { OrderState } from '@/utils/AppContext';

/**
 * 商品信息
 */
interface ProductInfo {
  info: any;
  orderId: string;
  onClickEvaluate: () => void;
}

const Page: React.FC<ProductInfo> = (props) => {
  const { info = {}, orderId = '', onClickEvaluate = () => {} } = props;

  const { orderNbr = '', storeName = '', payTypeName = '', canAfterSale } = info;
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

  const getButtonList = (order) => {
    let buttonList: any[] = [];

    switch (`${order.orderStatus}`) {
      case OrderState.finish:
        buttonList = [
          {
            color: 'red',
            name: '交易快照',
            id: '2',
            onClick: (item) => {
              history.push({
                pathname: '/customer/snapshot',
                query: {
                  // orderInfo: JSON.stringify({ ...info, orderId }),
                  itemId: item.orderItemsId,
                },
              });
            },
          },
        ];
        break;
      case OrderState.waitPrint:
      case OrderState.waitOutLibrary:
      case OrderState.waitPack:
      case OrderState.waitDelivery:
        buttonList = [
          {
            color: 'red',
            name: '交易快照',
            id: '2',
            onClick: (item) => {
              history.push({
                pathname: '/customer/snapshot',
                query: {
                  // orderInfo: JSON.stringify({ ...info, orderId }),
                  itemId: item.orderItemsId,
                },
              });
            },
          },
        ];
        break;
      case OrderState.waitSureDelivery:
        buttonList = [
          {
            color: 'red',
            name: '交易快照',
            id: '2',
            onClick: (item) => {
              history.push({
                pathname: '/customer/snapshot',
                query: {
                  // orderInfo: JSON.stringify({ ...info, orderId }),
                  itemId: item.orderItemsId,
                },
              });
            },
          },
        ];
        break;
      case OrderState.waitRecieve:
        showDeleteView = true;
        buttonList = [];
        // if (canAfterSale) {
        //   buttonList = [
        //     {
        //       color: 'red',
        //       name: '申请售后',
        //       id: '1',
        //       onClick: (item) => {
        //         history.push({
        //           pathname: '/salesWarranty',
        //           query: {
        //             orderInfo: JSON.stringify({ ...info, orderId }),
        //             item: JSON.stringify(item),
        //           },
        //         });
        //       },
        //     },
        //   ];
        // } else {
        //   buttonList = [];
        // }

        break;
      default:
        break;
    }

    return buttonList;
  };

  // 渲染操作按钮
  let showDeleteView: boolean = false;

  // buttonList = [
  //   {
  //     color: 'grey',
  //     name: '申请售后',
  //     onClick: (item) => {
  //       console.log(item);
  //       history.push({
  //         pathname: '/salesWarranty',
  //         query: {
  //           orderInfo: JSON.stringify({ ...info, orderId }),
  //           item: JSON.stringify(item),
  //         },
  //       });
  //     },
  //   },
  // ];
  // if (info.orderStatus === '2000') {
  //   buttonList = [
  //     {
  //       color: 'grey',
  //       name: '删除订单',
  //       onClick: () => {},
  //     },
  //   ];
  // } else if (info.orderStatus === '1900') {
  //   buttonList = [
  //     {
  //       color: 'grey',
  //       name: '申请售后',
  //       onClick: (item) => {
  //         console.log(item);
  //         history.push({
  //           pathname: '/salesWarranty',
  //           query: {
  //             orderInfo: JSON.stringify({ ...info, orderId }),
  //             item: JSON.stringify(item),
  //           },
  //         });
  //       },
  //     },
  //   ];
  // } else if (info.orderStatus === '1700') {
  //   buttonList = [
  //     {
  //       color: 'grey',
  //       name: '退还',
  //       onClick: () => {},
  //     },
  //   ];
  // }

  return (
    <div className={style.productView}>
      <div className={style.pageView} onClick={() => changeView(showAllStore)}>
        <div className={style.leftView}>
          <img src={logo} className={style.iconLeft} />
          <div className={style.centerView}>{storeName}</div>
        </div>
        {/* <img src={closeIcon} className={style.iconRight} /> */}
      </div>
      {/* <div className={style.orderNumberView}> */}
      {/* <div className={style.leftView}>订单编号：{orderNbr}</div> */}
      {/* <div className={style.delivery}>{payTypeName}</div> */}
      {/* </div> */}

      {(info.storeList || []).map((item: any, index: number) => {
        const { skuName = '', skuAttr = '', realAmount = '', promotionPrice, skuQuantity } =
          item || {};
        let skuAttrList = [];

        if (skuAttr !== '') {
          skuAttrList = JSON.parse(skuAttr);
        }
        let skuAttrStrList: string[] = [];
        skuAttrList.forEach((element: any) => {
          const { attrValue = '', attrName = '', attrValName = '' } = element;
          skuAttrStrList.push(`${attrName}：${attrValName}`);
        });
        const skuAttrStr = skuAttrStrList.join(' ');
        return (
          <div className={style.storeView} key={item.skuPicFileId + index}>
            <div className={style.centerSingleView}>
              <img src={item.skuPicFileUrl} className={style.productImg} />
              <div className={style.rightView}>
                <span className={style.title}>{skuName}</span>
                <div className={style.attr}>
                  <span>{skuAttrStr}</span>
                </div>
                {info?.cityName && (
                  <div className={style.attr}>
                    <span>{`归属地：${info.cityName || '暂无'}`}</span>
                  </div>
                )}
                {info?.phoneNum && (
                  <div className={style.attr}>
                    <span>{`订购号码：${info.phoneNum}`}</span>
                  </div>
                )}
                <div>x {skuQuantity}</div>
                <div className={style.priceView}>
                  <span className={style.price}>{realAmount}元</span>
                </div>
                {parseFloat(promotionPrice) > 0 ? (
                  <div>
                    {' '}
                    <span className={style.promotionPrice}> 优惠价格：{promotionPrice}</span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={style.bottomView}>
              {getButtonList(info).map((btnItem, index) => {
                return (
                  <div
                    className={btnItem.color === 'red' ? style.btnRedView : style.btnGreyView}
                    key={btnItem.name + index}
                    onClick={() => {
                      btnItem.onClick(item);
                    }}
                  >
                    {btnItem.name}
                  </div>
                );
              })}
            </div>
            <div className={style.line}></div>
          </div>
        );
      })}

      {
        //   <div className={style.contactView}>
        //   <img src={contactIcon} />
        //   <span>联系客服1</span>
        // </div>
      }
    </div>
  );
};

export default Page;
