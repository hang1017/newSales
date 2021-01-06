import React from 'react';

import distributionIcon from '@/assets/img/order/distribution_icon.png';
import nextIcon from '@/assets/img/order/next_icon.png';

import style from './index.less';
import { router } from 'alita';

/**
 * 物流信息
 */
interface DistributionInfo {
  info: any;
  onViewClick?: () => void;
}

const Page: React.FC<DistributionInfo> = (props) => {
  const { info = {}, onViewClick } = props;

  return (
    <div
      className={style.pageView}
      onClick={() => {
        router.push({ pathname: '/order/orderTracking' });
        onViewClick && onViewClick();
      }}
    >
      <div className={style.leftView}>
        <img src={distributionIcon} className={style.iconLeft} />
        <div className={style.centerView}>
          <div className={style.title}>您的订单已由前台代收</div>
          <div className={style.detail}>
            快递员：张凯，电话：<span>13774518991</span>
          </div>
        </div>
      </div>
      <img src={nextIcon} className={style.iconRight} />
    </div>
  );
};

export default Page;
