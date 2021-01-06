/* eslint-disable no-nested-ternary */
import React, { FC, useEffect } from 'react';
import { RefundResultModelState, ConnectProps, connect, history } from 'alita';
import successIcon from '@/assets/img/customer/success.png';
import SingleBtn from '@/pages/customer/components/SingleBtn';
import warrnIcon from '@/assets/img/customer/warn.png';
import waittngIcon from '@/assets/img/customer/waittng.png';
import DoubleButton from '@/pages/customer/components/DoubleButton';
import OrderTrackItem from '@/components/TreeNodeBlock';
// import RefundProgress from '../components/RefundProgress';

import styles from './index.less';

interface PageProps extends ConnectProps {
  refundResult: RefundResultModelState;
}

const RefundResultPage: FC<PageProps> = ({ refundResult, dispatch, location }) => {
  const { itemData = {} } = location.query || {};
  const myOrderInfo = JSON.parse(itemData);
  const { applyId } = myOrderInfo;

  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'refundResult/quryApplyDetail',
      payload: {
        applyId
      }
    });



    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { orderRefundCO, myRefundInfo } = refundResult;
  const {
    operateHistoryCOList = [],
    applyStatusName,
    applyStatus,
    returnItemCOList,
    returnAmount,
    applyType,
    orderId,
    reason,
    description,
    orderNbr,
    returnMethod,
    proofPicFileUrl,
    orderReceiverCO = {}
  } = myRefundInfo;
  const { receiverName, receiverPhone, receiverProvince, receiverCity, receiverRegion, receiverDetailAddress } = orderReceiverCO || {};
  const orderInfo = [

    {
      key: 'orderNbr',
      text: '订单号'
    },
    {
      key: 'refundTransactionId',
      text: '退款流水'
    },
    {
      key: 'refundTime',
      text: '退款时间'
    },
    {
      key: 'refundAmount',
      text: '退款金额'
    }

  ];
  const linkMap = [
    {
      key: 'createDate',
    },
    {
      key: 'note',
    },
  ];

  const goBack = () => {
    history.push({
      pathname: '/afterSale/afterSaleList',
    })
  }
  return <div className={styles.refundResult}>

    <div className={styles.content}>

      <div className={styles.baseInfo}>
        <div className={styles.refundHead}>
          <img src={`${applyStatus}` === '2200' ? successIcon : `${applyStatus}` === '1200' ? warrnIcon : waittngIcon} alt='' />
          <div className={styles.fefundStatus}>{applyStatusName}</div>
          {
            // <div className={styles.tipMsg}>商家确认退货成功后，系统会于三个工作日内将钱款向原路返回，若涉及现金银行卡，退款发往银行后需要等待银行受理入账</div>
          }

        </div>
      </div>
      <div className={styles.history}>
        {

          operateHistoryCOList.map((item: any, index: number) => (
            <OrderTrackItem data={item} linkMap={linkMap} isFirst={index === 0} />
          ))


          //   <RefundProgress
          //   progressData={['用户提交', '商家确认', '物流退回', '商家收货', '系统退款']}
          //   currentStatus={0}
          // />

        }

      </div>


      <div className={styles.orderInfo}>

        {orderInfo.map(item => {
          const { key, text } = item;
          return orderRefundCO[key] ? <div className={styles.orderInfoCell}>
            <div className={styles.labelText}>{text}</div>
            <div className={styles.labelValue}>{orderRefundCO[key] || ''}{orderRefundCO[key] && key === 'refundAmount' ? '元' : ''}</div>
          </div> : ''
        })}
      </div>


      {

        `${applyStatus}` === '1300' && `${applyType}` === '1100' && returnMethod === '1' ? <div className={styles.refundInfo}>
          <div className={styles.refundTitle}>退货地址</div>
          <div className={styles.refundAddr}>{receiverName}    {receiverPhone}</div>
          <div className={styles.refundAddr}>{receiverProvince + receiverCity + receiverRegion + receiverDetailAddress}</div>
          <div className={styles.refundDes}>请与商家协商一致，请勿使用到付，以免商家拒签货物，系统将会保证你的交易资金安全。请填写真是退货物流信息，逾期未填写，退货申请将关闭。</div>
        </div> : ''

      }



    </div>


    <div>

      {`${applyStatus}` === '1200' ? // 商家拒绝-用户可以修改申请信息
        <DoubleButton
          leftButton={{
            content: '确定',
          }}
          leftClick={goBack}
          rightButton={{
            content: '修改申请',

          }}
          rightClick={() => {
            const { preStatus } = operateHistoryCOList[0];

            history.push(
              {
                pathname: '/afterSale/fillApply',
                query: {
                  update: `${applyType}` === '1000' ? '1' : '2',// 1000 是仅退款
                  data: JSON.stringify({
                    storeList: returnItemCOList,
                    totalAmount: returnAmount,
                    orderId,
                    applyType,
                    applyId,
                    reason,
                    orderNbr,
                    description,
                    refuseType: preStatus === '1100' ? '1000' : preStatus === '1400' ? '1100' : '',
                    returnMethod,
                    proofPicFileUrl,
                  }),
                  type: `${applyType}` === '1000' ? '1' : '2',
                }
              }
            );

          }}
        /> : `${applyStatus}` === '1300' && `${applyType}` === '1100' && returnMethod === '1' ?  // 用户自行寄回的情况下，需要填写单号
          <DoubleButton
            leftButton={{
              content: '确定',
            }}
            leftClick={goBack}
            rightButton={{
              content: '填写单号',

            }}
            rightClick={() => {

              // 单号
              history.push(
                {
                  pathname: '/afterSale/updateApply',
                  query: {
                    data: JSON.stringify({
                      storeList: returnItemCOList,
                      totalAmount: returnAmount,
                      orderId,
                      applyType,
                      applyId,
                      orderNbr
                    }),

                  }
                }
              );

            }}
          /> : <SingleBtn
            text='确定'
            canClick
            onClick={goBack}
          />}


    </div>



  </div>;
};

export default connect(({ refundResult }: { refundResult: RefundResultModelState; }) => ({ refundResult }))(RefundResultPage);
