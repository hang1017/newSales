import React, { FC } from 'react';
import styles from './index.less';
import { WhiteSpace } from 'antd-mobile';
import IconRightArrow from '@/assets/img/rigth_more.png';
import IconTime from '@/assets/img/salesWarranty/time.png';
import IconDistribution from '@/assets/img/salesWarranty/cart.png';
import IconApprover from '@/assets/img/salesWarranty/approver.png';

// approver.png
interface ProgressViewProps {
  marginTop?: string;
  orderInfo?: any;
}

const ProgressView: FC<ProgressViewProps> = (props) => {
  const { marginTop = '0' } = props;

  return (
    <div className={styles.progressView} style={{ marginTop }}>
      <img className={styles.leftIcon} src={IconTime} alt="" />
      <div className={styles.contentModel}>
        <div className={styles.title}>服务已完成，感谢您的支持</div>
        <div className={styles.subTitle}>查看售后进度</div>
      </div>
      <img className={styles.rightIcon} src={IconRightArrow} alt="" />
    </div>
  );
};

interface LogisticsProps {
  orderInfo?: any;
}

const Logistics: FC<LogisticsProps> = (props) => {
  const { orderInfo = {} } = props;
  const { receiverInfo = {} } = orderInfo;
  const { receiverDetailAddress = '', receiverName = '', receiverPhone = '' } = receiverInfo;
  return (
    <>
      <WhiteSpace size="md" />
      <div className={styles.progressView}>
        <img className={styles.leftIcon} src={IconDistribution} alt="" />
        <div className={styles.contentModel}>
          <div className={styles.title}>
            您的订单已由公司前台代收。投递员：张帅帅，如果疑问请电联：
          </div>
          <div className={styles.subTitle}>2019-07-05 09:36:45</div>
        </div>
        <img className={styles.rightIcon} src={IconRightArrow} alt="" />
      </div>
    </>
  );
};

interface OrderReviewProps {}

const OrderReview: FC<OrderReviewProps> = (props) => {
  return (
    <>
      <WhiteSpace size="md" />
      <div className={styles.progressView}>
        <img className={styles.leftIcon} src={IconApprover} alt="" />
        <div className={styles.contentModel}>
          <div className={styles.title}>您的订单已审核通过</div>
          <div className={styles.subTitle}>最后审核人：姜超</div>
        </div>
        <img className={styles.rightIcon} src={IconRightArrow} alt="" />
      </div>
    </>
  );
};

export { ProgressView, Logistics, OrderReview };
