import React, { FC, useEffect } from 'react';
import { EvaluateModelState, ConnectProps, connect, setPageNavBar } from 'alita';
import GoodsEvaluate from './components/goodsEvaluate';
import Utils from '@/utils/tool';
import styles from './index.less';
import LogisticsView from './components/logisticsView';
import moment from 'moment';

interface PageProps extends ConnectProps {
  evaluate: EvaluateModelState;
}

const EvaluatePage: FC<PageProps> = ({ evaluate, dispatch }) => {
  let orderInfo = evaluate.orderInfo;
  const { memberId = '', nickname = '' } = Utils.getStorageForJson('userInfo') || {};
  let commitData = {
    cmmtLogisticsSaveCOList: [],
    cmmtSkuSaveCoList: [],
    cmmtStoreServSaveCOList: [],
  };
  orderInfo = {
    ...orderInfo,
    memberId,
    memberName: nickname,
  };
  const { storeList = [] } = orderInfo;
  const goodsList: any[] = [];

  const addEvaluation = () => {
    dispatch!({
      type: 'evaluate/addEvaluation',
      payload: commitData,
    });
  };

  const getDateFormate = (dateString: string) => {
    if (!dateString || dateString.length == 0) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDate() + 1
    } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const initialzeData = () => {
    // 物流
    const cmmtLogisticsSaveCOList: any = [];
    // 商品
    const cmmtSkuSaveCoList: any = [];
    // 店铺
    const cmmtStoreServSaveCOList: any = [];
    storeList.forEach((item: { goodsId: any; orderItemsId: any; skuId: any }) => {
      console.log(orderInfo, orderInfo.receiverInfo.receiveTime);

      const cmmtLogisticsSaveCOItem = {
        goodId: item.goodsId,
        ishide: 1100,
        odCreatetime: orderInfo.createDate,
        odDealtime: orderInfo.receiverInfo.receiveTime,
        orderId: orderInfo.orderId,
        totalScore: 1500,
        storeId: orderInfo.storeId,
        type: '1000',
        workId: item.orderItemsId,
      };

      const cmmtSkuSaveCoItem = {
        goodId: item.goodsId,
        goodScore: 1500,
        odCreatetime: orderInfo.createDate,
        odDealtime: orderInfo.receiverInfo.receiveTime,
        orderId: orderInfo.orderId,
        skuId: item.skuId,
        storeId: orderInfo.storeId,
        workId: item.orderItemsId,
        cmmtRefFileCOList: [],
        type: '1000',
      };

      const cmmtStoreServSaveCOItem = {
        goodId: item.goodsId,
        odCreatetime: orderInfo.createDate,
        odDealtime: orderInfo.receiverInfo.receiveTime,
        orderId: orderInfo.orderId,
        servScore: 1500,
        storeId: orderInfo.storeId,
        type: '1000',
      };

      cmmtLogisticsSaveCOList.push(cmmtLogisticsSaveCOItem);
      cmmtSkuSaveCoList.push(cmmtSkuSaveCoItem);
      cmmtStoreServSaveCOList.push(cmmtStoreServSaveCOItem);
    });

    commitData = {
      cmmtLogisticsSaveCOList,
      cmmtSkuSaveCoList,
      cmmtStoreServSaveCOList,
    };
  };

  // 这里发起了初始化请求
  useEffect(() => {
    initialzeData();
    setPageNavBar({
      pagePath: '/order/storeEvaluate',
      navBar: {
        rightContent: (
          <span className={styles.releaseBtn} onClick={addEvaluation}>
            发布
          </span>
        ),
      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  return (
    <div className={styles.evalutePages}>
      {storeList.map((item: any, index: number) => {
        return (
          <GoodsEvaluate
            detail={orderInfo}
            info={item}
            onChange={(e) => {
              let cmmtLogisticsSaveCOItem: any = commitData.cmmtSkuSaveCoList[index];
              cmmtLogisticsSaveCOItem = {
                ...cmmtLogisticsSaveCOItem,
                cmmtRefFileCOList: e.cmmtRefFileCOList,
                goodCmmt: e.goodCmmt,
                goodScore: e.goodScore,
                ishide: e.ishide,
              };
              commitData.cmmtSkuSaveCoList[index] = cmmtLogisticsSaveCOItem;
            }}
          />
        );
      })}
      <LogisticsView
        detail={orderInfo}
        onChange={(e) => {
          commitData.cmmtLogisticsSaveCOList.forEach((element: any) => {
            element.totalScore = e.totalScore;
          });
          commitData.cmmtStoreServSaveCOList.forEach((element: any) => {
            element.servScore = e.servScore;
          });
        }}
      />
    </div>
  );
};

export default connect(({ evaluate }: { evaluate: EvaluateModelState }) => ({ evaluate }))(
  EvaluatePage,
);
