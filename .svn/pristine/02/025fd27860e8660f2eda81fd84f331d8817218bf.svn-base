import React from 'react';
import { OrderState } from '@/utils/AppContext';
import style from './index.less';

/**
 * 商品信息
 */
interface CommodityInfo {
  info: any;
}

const Page: React.FC<CommodityInfo> = (props) => {
  const { info = {} } = props;
  const { totalAmount = '', shipAmount = '', payAmount = '', orderStatus } = info;
  return (
    <div className={style.pageView}>
      <div className={style.titleView}>
        <div className={style.redLine}></div>
        <span>商品信息</span>
      </div>
      <div className={style.contenView}>
        {/* <div className={style.content}>
          <div className={style.label}>商品金额</div>
          <div className={style.value}>￥</div>
        </div> */}
        {/* <div className={style.content}>
          <div className={style.label}>不含税价</div>
          <div className={style.value}>￥508.00</div>
        </div> */}
        {/* <div className={style.content}>
          <div className={style.label}>运费(总重：0.060kg)</div>
          <div className={style.value}>+ ￥{shipAmount}</div>
        </div> */}
        <div className={style.content}>
          <div className={style.label}>订单总价</div>
          <div className={style.value}>
            ￥<span>{totalAmount}</span>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.label}>{OrderState.waitPay === orderStatus ? '需付款' : '实付款'}</div>
          <div className={style.redValue}>
            ￥<span>{payAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
