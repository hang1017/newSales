import React from 'react';

import style from './index.less';
import { OrderType } from '@/utils/AppContext';
import smileIcon from '@/assets/img/order/smile_icon.png';
import moment from 'moment';
/**
 * 订单信息
 */
interface OrderInfo {
  info: any;
  orderType?: string;
}

const Page: React.FC<OrderInfo> = (props) => {
  const { info = {}, orderType = OrderType.product } = props;
  const {
    orderNbr = '',
    payTypeName = '',
    payTime = '',
    totalAmount,
    createDate,
    expressNo,
  } = info;
  const renderProductView = () => {
    return (
      // <div className={style.top}>
      //   <div className={style.content}>
      //     期望配送时间：<span className={style.value}>工作日</span>
      //   </div>
      // </div>
      <div></div>
    );
  };

  const renderBroadbandView = () => {
    return (
      <div className={style.top}>
        <div className={style.content}>
          期望安装时间：<span className={style.value}>工作日</span>
        </div>
      </div>
    );
  };

  const renderRechargeView = () => {
    return (
      <div>
        <div className={style.top}>
          <div className={style.content}>
            手机号码：<span className={style.value}>13774518991</span>
          </div>
          <div className={style.content}>
            归属地区：<span className={style.value}>福建电信</span>
          </div>
          <div className={style.content}>
            充值面额：<span className={style.value}>10元</span>
          </div>
        </div>
        <div className={style.top}>
          <div className={style.content}>
            商家信息：<span className={style.value}>电信自营</span>
          </div>
        </div>
        <div className={style.line}></div>
        <div className={style.contactView}>
          <img src={smileIcon} />
          <span>联系客服</span>
        </div>
        <div className={style.line}></div>

        <div className={style.rechangeContent}>
          <div className={style.label}>商品金额</div>
          <div className={style.value}>￥{totalAmount}</div>
        </div>
        <div className={style.line}></div>

        <div className={style.needPay}>
          <div className={style.value}>
            ￥<span>518</span>.00
          </div>
          <div className={style.label}>需付款：</div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.pageView}>
      <div className={style.titleView}>
        <div className={style.redLine}></div>
        <span>订单信息</span>
      </div>
      <div className={style.contenView}>
        <div className={style.content}>
          订单编号：<span className={style.value}>{orderNbr}</span>
        </div>
        <div className={style.content}>
          下单时间：
          <span className={style.value}>{createDate}</span>
        </div>
        <div className={style.top}>
          <div className={style.content}>
            支付方式：<span className={style.value}>{payTypeName}</span>
          </div>
          <div className={style.content}>
            支付时间：<span className={style.value}>{payTime}</span>
          </div>
          {info?.claimType && (
            <div className={style.content}>
              配送方式：
              <span className={style.value}>
                {info?.claimType === '1100' ? '现场取货' : '物流配送'}
              </span>
            </div>
          )}
        </div>
        <div className={expressNo ? style.top : 'hideElement'}>
          <div className={style.content}>
            物流单号：<span className={style.value}>{expressNo}</span>
          </div>
        </div>
        {orderType === OrderType.product && renderProductView()}
        {
          // orderType === OrderType.broadband && renderBroadbandView()
        }
        {orderType === OrderType.recharge && renderRechargeView()}
      </div>
    </div>
  );
};

export default Page;
