/* eslint-disable no-nested-ternary */
import React, { FC, useState, useEffect } from 'react';
import { Modal, Toast } from 'antd-mobile';

import addIcon from '@/assets/img/customer/add.png';
import reduceIcon from '@/assets/img/customer/reduce.png';
import ActionSheet from '@/components/ActionSheet';
import SingleBtn from '@/pages/customer/components/SingleBtn';
import ServiceProtocol from './components/ServiceProtocol';

import styles from './index.less';

const { alert } = Modal;

interface ServiceItemProps {
  data: any;
  cancelContract?: (data: any) => void;
  myOrderSevice?: (data?: any) => void; // 订购服务
  isMyService?: boolean;
  dispatch: any;
  accNbr: string;
  selectPhoneObj: any;
}

const FormItem: FC<ServiceItemProps> = (props) => {
  const {
    cancelContract,
    data,
    myOrderSevice = () => {},
    isMyService = false,
    dispatch,
    accNbr,
    selectPhoneObj,
  } = props;
  const [currentNum, upateNum] = useState(0);
  const [showASheet, updateShowASheet] = useState(false);
  const {
    goodsName,
    goodsId,
    salesPrice,
    skuId,
    skuName,
    signSkuName = '',
    createDate = '',
    signGoodName = '',
    spuId = '',
    storeId = '',
  } = data || {};
  const [payAmount, updatePayAmount] = useState(0);
  const [giftList, updateGifList] = useState([]);
  const [promotionStoreBestMap, updatePromotion] = useState(null);

  /**
   * 计费接口
   * @param quantity
   */
  const callFree = (quantity) => {
    dispatch!({
      type: 'paySuccess/tmscalFee',
      payload: {
        goodsList: [
          {
            goodsId,
            skuId,
            quantity,
          },
        ],
      },
    }).then((res) => {
      updatePayAmount(res.payAmount);
      // 这里目前服务端就一个数据，所以只要取第一个数据就可以
      if (res.storeList && res.storeList.length) {
        updateGifList(res.storeList[0].giftList);
      }
      if (JSON.stringify(promotionStoreBestMap) !== '{}') {
        updatePromotion(res.promotionStoreBestMap);
      }

      upateNum(quantity);
    });
  };
  /**
   * 减少数量
   */
  const reduceClick = () => {
    // upateNum()
    if (currentNum > 0) {
      const tempNum = currentNum - 1;
      callFree(tempNum);
    }
  };
  const addNum = () => {
    const tempNum = currentNum + 1;
    callFree(tempNum);
  };

  // const onScroll = (e) => {
  //   const windHeight = document.documentElement.clientWidth;
  //   console.log(windHeight * 0.7);

  //   console.log(e.currentTarget.scrollTop);
  // }

  const orderService = () => {
    updateShowASheet(false);
    Modal.alert('订购提示', '确认订购该服务吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          console.log(JSON.stringify(selectPhoneObj));

          const promGift: any[] = [];
          giftList.map((item) => {
            const { quantity, promId, promName } = item;
            promGift.push({
              giftSkuId: item.skuId,
              giftSkuIdNum: quantity,
              giftSkuName: item.skuName,
              promId,
              promName,
            });
          });
          const { lanId, numberInstId } = selectPhoneObj;
          const req = {
            accNbr: selectPhoneObj.accNbr,
            signGoodName: goodsName,
            signSkuId: skuId,
            signSkuName: skuName,
            signPrice: payAmount,
            signNum: currentNum,
            spuId,
            promGift,
            lanId,
            numberInstId,
            memberAcct: selectPhoneObj.accNbr,
            signStoreId: storeId,
          };

          dispatch!({
            type: 'myServices/make',
            payload: {
              ...req,
            },
          }).then((res) => {
            if (res.success) {
              upateNum(0);
            }
            if (myOrderSevice) {
              myOrderSevice(res);
            }
          });
        },
      },
    ]);
  };

  /**
   * 取消签约
   */
  const cancleMyService = () => {
    Modal.alert('提示', '确认取消该服务吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          const { autoBuySignUpInfoId, signNum } = data;

          dispatch!({
            type: 'myServices/cancelContract',
            payload: {
              autoBuySignUpInfoId,
              signNum,
            },
          }).then((res) => {
            if (res && res.success) {
              // eslint-disable-next-line no-unused-expressions
              cancelContract && cancelContract(data);
            } else {
              Toast.info(res.errMessage, 2);
            }
          });
        },
      },
    ]);
  };
  return (
    <>
      <div className={styles.seriveItem}>
        <div className={styles.serviceName}>{goodsName || signGoodName}</div>
        {
          // <div className={styles.serviceContent}>文案</div>
        }

        <>
          <div className={styles.flexBlock}>
            <div className={styles.subServiceName}>{skuName || signSkuName}</div>
            {isMyService ? (
              ''
            ) : (
              <div>
                <img src={reduceIcon} alt="" onClick={reduceClick} />
                <span className={styles.serviceNum}>{currentNum}</span>
                <img src={addIcon} alt="" onClick={addNum} />
              </div>
            )}
          </div>
          {isMyService ? (
            ''
          ) : (
            <>
              <div className={styles.serviceContent}>
                价格：<span>{salesPrice}元</span>
              </div>
              {promotionStoreBestMap &&
                promotionStoreBestMap[parseInt(storeId)]?.map((item) => {
                  const { promName, expDate = '' } = item;
                  return (
                    <>
                      <div className={styles.promotoContent}>
                        <span className={styles.promotoName}>促销：{promName}</span>
                        <span>促销日期：{expDate}</span>
                      </div>
                      <div>仅在有效期到期前触发自助订购获得赠送</div>
                    </>
                  );
                })}
            </>
          )}
        </>

        <div className={styles.flexBlock}>
          <div>
            {isMyService ? (
              <div className={styles.mySText}>
                <div>
                  签约账号：{data?.accNbr}
                  <br />
                  签约时间：{createDate}
                </div>
                <div></div>
              </div>
            ) : (
              <>
                合计：<span className={styles.price}>{payAmount}元</span>
              </>
            )}
          </div>
          <div>
            <span
              className={isMyService ? styles.cancleContract : styles.signUpBtn}
              onClick={() => {
                if (!isMyService) {
                  if (accNbr) {
                    if (currentNum > 0) {
                      if (data?.contractStatus) {
                        alert('是否重新签约？', '', [
                          { text: '取消', onPress: () => {} },
                          {
                            text: '确认',
                            onPress: () => {
                              updateShowASheet(true);
                            },
                          },
                        ]);
                      } else {
                        updateShowASheet(true);
                      }
                    } else {
                      Toast.fail('签约数量不能为0', 2);
                    }
                  } else {
                    Toast.fail('请先选择签约号码', 2);
                  }
                } else if (data?.statusCd === '1000') {
                  cancleMyService();
                }
              }}
            >
              {isMyService ? '解除签约' : data?.contractStatus ? '签约中' : '签约'}
            </span>
          </div>
        </div>
      </div>
      {
        <ActionSheet
          title="自助订购服务规则"
          show={showASheet}
          heigth={document.documentElement.clientHeight * 0.7}
          closeClick={() => {
            updateShowASheet(false);
          }}
        >
          <>
            <div className={styles.protcolContent} id="serviceInfo">
              <ServiceProtocol />
            </div>
            {
              // <div className={styles.tipMsg}>请仔细阅读条款 </div>
            }
            <SingleBtn text="确认协议" canClick onClick={orderService} />
          </>
        </ActionSheet>
      }
    </>
  );
};

export default FormItem;
