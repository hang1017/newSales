/* eslint-disable no-unused-expressions */
import React, { FC, useEffect, useState } from 'react';
import { OrderTrackingModelState, ConnectProps, connect } from 'alita';

import OrderTrackItem from '@/components/TreeNodeBlock/OrderTrackItem';
import Recommend from '@/components/Recommend';
import GoodsDetailNavBar from '@/pages/shopProcess/goodsDetail/components/GoodsDetailNavBar';
import topIcon from '@/assets/img/gotoTop.png';

import FootBlock from '@/components/FootBlock';
import styles from './index.less';
import e from 'express';

interface PageProps extends ConnectProps {
  orderTracking: OrderTrackingModelState;
}

const OrderTrackingPage: FC<PageProps> = ({ orderTracking, dispatch, location }) => {
  const { expressNo = '', orderId = '' } = location.query || {};

  const [topFlag, updateTopFlag] = useState(false);
  const onScroll = () => {
    const windowHeight = document.documentElement.clientHeight;
    const scrolElement = document.getElementById('root')?.firstChild?.firstChild;
    scrolElement?.addEventListener('scroll', () => {
      // console.log('ssss');
      const top = scrolElement ? scrolElement?.scrollTop * devicePixelRatio : 0;
      if (top > windowHeight) {
        updateTopFlag(true);
      } else {
        updateTopFlag(false);
      }
    });
  };
  // 这里发起了初始化请求
  useEffect(() => {
    onScroll();
    dispatch!({
      type: 'orderTracking/queryExpressInfo',
      payload: {
        expressNo,
        orderId,
      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { trackList } = orderTracking;
  const linkMap = [
    {
      key: 'trackDes',
    },
    {
      key: 'time',
    },
  ];

  const goToTop = () => {
    // console.log(0);

    document.getElementById('base').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="navBarBlock">
        <GoodsDetailNavBar narmalNavBar navBarTitle="订单跟踪" hasRightContent={false} />
      </div>

      <div className={styles.trackPage}>
        <div className={styles.orderBaseInfo} id="base">
          <div>
            运单号：<span>{expressNo}</span>
          </div>

          {/*  <div>
            国内承接人：<span>顺丰快递</span>
          </div>
          <div>
            预计送达：<span>2019-07-05 09:00</span>
          </div> */}
        </div>

        <div className={styles.trackBlock}>
          {trackList.map((item: any, index: number) => (
            <OrderTrackItem data={item} linkMap={linkMap} />
          ))}
        </div>
        <FootBlock />
      </div>
      <img src={topIcon} className={topFlag ? 'topIcon' : 'hideElement'} onClick={goToTop} alt="" />
    </>
  );
};

export default connect(({ orderTracking }: { orderTracking: OrderTrackingModelState }) => ({
  orderTracking,
}))(OrderTrackingPage);
