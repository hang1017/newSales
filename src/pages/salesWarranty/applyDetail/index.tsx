import React, { FC, useEffect, useState } from 'react';
import {
  ApplyDetailModelState,
  ConnectProps,
  connect,
  OrderDetailModelState,
  history,
} from 'alita';
import HeaderView from './components/HeaderView';
import { ProgressView, Logistics } from './components/ProgressView';
import ServiceInfoView from './components/ServiceInfoView';
import DistributionInfo from '@/pages/order/components/DistributionInfo';
import styles from './index.less';
import { WhiteSpace } from 'antd-mobile';
import Utils from '@/utils/tool';

// import ShopInfoView from './components/ShopInfoView';
import ProductInfo from '@/pages/order/components/ProductInfo';

interface PageProps extends ConnectProps {
  applyDetail: ApplyDetailModelState;
}

const ApplyDetailPage: FC<PageProps> = ({ applyDetail, dispatch, orderDetail, location }) => {
  const [offsetY, setOffsetY] = useState(0);
  const { memberId = '' } = Utils.getStorageForJson('userInfo') || {};

  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'orderDetail/queryDetail',
      payload: { orderId: location.query.orderId },
    });

    dispatch!({
      type: 'applyDetail/quryApplyDetail',
      payload: { applyId: location.query.applyId, memberId },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { info } = applyDetail;
  const { orderInfo = {}, orderState = '' } = orderDetail;
  return (
    <div
      className={styles.applyDetail}
      onScroll={(e) => {
        setOffsetY(e.currentTarget.scrollTop);
      }}
    >
      <HeaderView offsetY={offsetY} orderState={orderState} />
      <ProgressView marginTop="-0.68rem" orderInfo={orderInfo} />
      {/* <Logistics orderInfo={orderInfo} /> */}
      <WhiteSpace size="md" />

      <DistributionInfo
        info={orderInfo}
        onViewClick={() => {
          history.push({ pathname: '/order/orderTracking' });
        }}
      />
      <ProductInfo info={orderInfo} orderId={location.query.orderId} />
      <ServiceInfoView info={info} orderInfo={orderInfo} />
    </div>
  );
};

export default connect(
  ({
    applyDetail,
    orderDetail,
  }: {
    applyDetail: ApplyDetailModelState;
    orderDetail: OrderDetailModelState;
  }) => ({
    applyDetail,
    orderDetail,
  }),
)(ApplyDetailPage);
