/* eslint-disable no-nested-ternary */
import React, { FC, useEffect, useState } from 'react';
import { CheckoutCounterModelState, ConnectProps, connect, history, setPageNavBar } from 'alita';

import SingleBtn from '@/components/SingleBtn';
import ActionSheet from '@/components/ActionSheet';
import AlertModal from '@/components/AlertModal';

import tyIcon from '@/assets/img/payment/ty.png';
import zfbIcon from '@/assets/img/payment/zfb.png';
import wxIcon from '@/assets/img/payment/wx.png';
import zzIcon from '@/assets/img/payment/zz.png';
import nyIcon from '@/assets/img/payment/ny.png';
import jsIcon from '@/assets/img/payment/js.png';
import cardIcon from '@/assets/img/payment/card.png';
import rightMoreIcon from '@/assets/img/rigth_more.png';
import selectedIcon from '@/assets/img/select.png';
import unselectIcon from '@/assets/img/un_select.png';

import styles from './index.less';

const tempCardList = [
  {
    cardIcon: zzIcon,
    cardDes: '招商银行储蓄卡(6666)',
    isOther: false,
    key: '1',
    selected: true,
  },
  {
    cardIcon: nyIcon,
    cardDes: '农业银行储蓄卡(8888)',
    isOther: false,
    key: '2',
    selected: false,
  },
  {
    cardIcon: jsIcon,
    cardDes: '建设银行储蓄卡(3333)',
    isOther: false,
    key: '3',
    selected: false,
  },
];

interface PageProps extends ConnectProps {
  checkoutCounter: CheckoutCounterModelState;
}

const CheckoutCounterPage: FC<PageProps> = ({ checkoutCounter, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    setPageNavBar({
      pagePath: '/shopProcess/checkoutCounter',
      navBar: {
        onLeftClick: () => {
          AlertModal.show({
            content: '您的订单在23小时59分钟内未支付将被取消,请尽快完成支付。',
            leftItem: {
              title: '残忍离开',
              onPress: () => {
                history.goBack();
              },
            },
            rightItem: {
              title: '继续支付',
              onPress: () => {},
            },
          });
        },
      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  const [otherPayList, updateotherPayList] = useState([
    {
      cardIcon: tyIcon,
      cardDes: '翼支付',
      key: '1',
      selected: true,
    },
    {
      cardIcon: zfbIcon,
      cardDes: '支付宝支付',
      key: '2',
      selected: false,
    },
    {
      cardIcon: wxIcon,
      cardDes: '微信支付',
      key: '3',
      selected: false,
    },
  ]);

  const [actionSheet, updateActionSheet] = useState(false);
  const [cardList, updateCardList] = useState(tempCardList);
  const [actionCardList, updateActionCardList] = useState([
    ...tempCardList,
    {
      cardIcon,
      cardDes: '使用新卡支付',
      isOther: true,
      key: '4',
      selected: false,
    },
  ]);
  const otherItemClick = (data: any) => {
    const tempList: any = [];
    otherPayList.map((item) => {
      if (item.key === data.key) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      tempList.push(item);
    });
    updateotherPayList(tempList);
  };
  const cardItemClick = (data: any) => {
    const tempList: any = [];
    cardList.map((item) => {
      if (item.key === data.key) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      tempList.push(item);
    });
    updateCardList(tempList);
  };
  const actionAardItemClick = (data: any) => {
    const tempList = [];
    actionCardList.map((item) => {
      if (item.key === data.key) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      tempList.push(item);
    });
    updateActionCardList(tempList);
  };
  const { name } = checkoutCounter;
  const submit = () => {
    history.push({
      pathname: '/shopProcess/paySuccess',
    });
  };
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.money}>
        <span>￥</span>
        <span className={styles.priceInteger}>29</span>
        <span>.00</span>
      </div>
      <div className={styles.payMethod}>当前支付方式：个人支付</div>
      <div className={styles.payMethodParent}>
        <div className={styles.otherPayBlock}>
          {otherPayList.map((item: any) => {
            return (
              <div
                className={styles.cardItem}
                onClick={() => {
                  otherItemClick(item);
                }}
              >
                <div>
                  <img src={item.cardIcon} alt="" className={styles.cardIcon} />
                  <span>{item.cardDes}</span>
                </div>
                <div>
                  <img
                    src={item.selected ? selectedIcon : unselectIcon}
                    className={styles.rightIcon}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.cardPayBlock}>
        {cardList.map((item: any) => {
          return (
            <div
              className={styles.cardItem}
              onClick={() => {
                cardItemClick(item);
              }}
            >
              <div>
                <img src={item.cardIcon} alt="" className={styles.cardIcon} />
                <span>{item.cardDes}</span>
              </div>
              <div>
                <img
                  src={item.isOther ? rightMoreIcon : item.selected ? selectedIcon : unselectIcon}
                  className={styles.rightIcon}
                />
              </div>
            </div>
          );
        })}

        <div
          className={styles.cardItem}
          onClick={() => {
            updateActionSheet(true);
          }}
        >
          <div className={styles.newCardItemText}>其他付款方式</div>
          <div className={styles.newCardSubText}>
            其他银行卡、绑定新卡
            <img src={rightMoreIcon} className={styles.rightIcon} />
          </div>
        </div>
      </div>

      <SingleBtn text="立即支付" onClick={submit} />
      <ActionSheet
        show={actionSheet}
        closeClick={() => {
          updateActionSheet(false);
        }}
        title="其他付款方式"
      >
        {actionCardList.map((item: any) => {
          return (
            <div
              className={styles.cardItem}
              onClick={() => {
                actionAardItemClick(item);
              }}
            >
              <div>
                <img src={item.cardIcon} alt="" className={styles.cardIcon} />
                <span>{item.cardDes}</span>
              </div>
              <div>
                <img
                  src={item.isOther ? rightMoreIcon : item.selected ? selectedIcon : unselectIcon}
                  className={styles.rightIcon}
                />
              </div>
            </div>
          );
        })}
      </ActionSheet>
    </div>
  );
};

export default connect(({ checkoutCounter }: { checkoutCounter: CheckoutCounterModelState }) => ({
  checkoutCounter,
}))(CheckoutCounterPage);
