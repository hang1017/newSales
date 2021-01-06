import React, { FC, useEffect } from 'react';
import { EvaluateModelState, ConnectProps, connect, setPageNavBar } from 'alita';

import EvaluteGoodsItem from '@/components/EvaluteGoodsItem';

import { EvaluateState, EvaluateType, StarScore, EvaluateKinds } from '@/utils/AppContext';
import FootBlock from '@/components/FootBlock';
import Utils from '@/utils/tool';
import styles from './index.less';

interface PageProps extends ConnectProps {
  evaluate: EvaluateModelState;
}

const EvaluatePage: FC<PageProps> = ({ evaluate, dispatch }) => {
  let orderInfo = evaluate.orderInfo;
  const { memberId = '', nickname = '' } = Utils.getStorageForJson('userInfo') || {};
  orderInfo = {
    ...orderInfo,
    memberId,
    memberName: nickname,
  };
  const { storeList = [] } = orderInfo;
  const goodsList: any[] = [];
  let cmmtSkuCoList: any = []; // 商品评价
  let cmmtLogisticsCOList: any[] = []; // 物流评价
  let cmmtServCOList: any[] = []; // 店铺评价
  storeList.forEach((element: any) => {
    goodsList.push({
      ...element,
      goodId: element.goodsId,
      goodName: element.goodsName,
    });
  });
  goodsList.forEach((element) => {
    console.log(element);
    let cmmtSkuCo = {
      goodId: element.goodId,
      memberId: orderInfo.memberId,
      orderId: orderInfo.orderId,
      state: EvaluateState.draft,
      type: EvaluateType.buyerEvaluate,
      goodCmmt: '',
      cmmtRefFileCOList: [],
      goodScore: StarScore.five,
    };
    cmmtSkuCoList.push(cmmtSkuCo);
    let cmmtLogisticsCO = {
      goodId: element.goodId,
      odCreatetime: orderInfo.orderTime,
      odDealtime: '', // 订单完成时间
      orderId: orderInfo.orderId,
      storeId: '',
      totalScore: StarScore.five,
      type: EvaluateType.buyerAddEvaluate,

      // memberId: orderInfo.memberId,
      // notes: '',
      // state: EvaluateState.draft,
    };
    cmmtLogisticsCOList.push(cmmtLogisticsCO);
    let cmmtServCO = {
      goodId: element.goodId,
      odCreatetime: orderInfo.orderTime,
      odDealtime: '', // 订单完成时间
      orderId: orderInfo.orderId,
      servScore: StarScore.five,
      storeId: '',
      type: EvaluateType.buyerAddEvaluate,
    };
    cmmtServCOList.push(cmmtServCO);
  });

  // const changeDatas = () => {
  //   storeList.forEach((element: any) => {
  //     goodsList.push({
  //       ...element,
  //       goodId: element.goodsId,
  //       goodName: element.goodsName,
  //     });
  //   });
  //   goodsList.forEach((element) => {
  //     let cmmtSkuCo = {
  //       goodId: element.goodId,
  //       locate: 1, // 前端暂时默认传1
  //       memberId: orderInfo.memberId,
  //       orderId: orderInfo.orderId,
  //       state: EvaluateState.draft,
  //       type: EvaluateType.buyerEvaluate,
  //       goodCmmt: '',
  //       cmmtRefFileCOList: [],
  //       goodScore: StarScore.five,
  //     };
  //     cmmtSkuCoList.push(cmmtSkuCo);
  //     let cmmtLogisticsCO = {
  //       goodId: element.goodId,
  //       locate: 1, // 前端暂时默认传1
  //       memberId: orderInfo.memberId,
  //       notes: '',
  //       orderId: orderInfo.orderId,
  //       state: EvaluateState.draft,
  //       totalScore: StarScore.five,
  //       type: EvaluateType.buyerAddEvaluate,
  //     };
  //     cmmtLogisticsCOList.push(cmmtLogisticsCO);
  //     let cmmtServCO = {
  //       goodId: element.goodId,
  //       locate: 1, // 前端暂时默认传1
  //       memberId: orderInfo.memberId,
  //       orderId: orderInfo.orderId,
  //       servCmmt: '',
  //       servScore: StarScore.five,
  //       state: EvaluateState.draft,
  //       type: EvaluateType.buyerAddEvaluate,
  //     };
  //     cmmtServCOList.push(cmmtServCO);
  //   });
  // };
  const addEvaluation = () => {
    console.log('cacaca', cmmtSkuCoList);
    dispatch!({
      type: 'evaluate/addEvaluation',
      payload: {
        cmmtSkuSaveCoList: cmmtSkuCoList,
        cmmtLogisticsSaveCOList: cmmtLogisticsCOList,
        cmmtStoreServSaveCOList: cmmtServCOList,
      },
    });
  };

  // 这里发起了初始化请求
  useEffect(() => {
    setPageNavBar({
      pagePath: '/order/evaluate',
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

  const getEvaluteData = (value: any) => {
    console.log('getEvaluteData---', value);
    const { type, data, goodId } = value;
    switch (type) {
      case EvaluateKinds.goods:
        cmmtSkuCoList = cmmtSkuCoList.filter((item: any) => `${item.goodId}` !== `${goodId}`);
        cmmtSkuCoList.push(data);
        break;
      case EvaluateKinds.logistics:
        cmmtLogisticsCOList = cmmtLogisticsCOList.filter(
          (item: any) => `${item.goodId}` !== `${goodId}`,
        );
        cmmtLogisticsCOList.push(data);
        break;
      case EvaluateKinds.service:
        cmmtServCOList = cmmtServCOList.filter((item: any) => `${item.goodId}` !== `${goodId}`);
        cmmtServCOList.push(data);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.evalutePages}>
      {goodsList.map((item) => {
        return (
          <EvaluteGoodsItem onChangeData={getEvaluteData} goodsInfo={item} orderInfo={orderInfo} />
        );
      })}
      <FootBlock />
    </div>
  );
};

export default connect(({ evaluate }: { evaluate: EvaluateModelState }) => ({ evaluate }))(
  EvaluatePage,
);
