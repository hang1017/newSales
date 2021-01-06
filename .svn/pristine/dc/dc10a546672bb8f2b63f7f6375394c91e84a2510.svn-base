import React, { FC } from 'react';
import { WhiteSpace } from 'antd-mobile';
import styles from './index.less';
interface ServiceInfoViewProps {
  info?: any;
  orderInfo?: any;
}

const ServiceInfoView: FC<ServiceInfoViewProps> = (props) => {
  const { info = {} } = props;
  return (
    <>
      {/* <WhiteSpace size="md" /> */}
      <div className={styles.serviceInfo}>
        <div className={styles.title}>
          <span></span>
          服务单信息
        </div>
        <div className={styles.servicePage}>
          <div className={styles.row}>
            <div className={styles.rowHd}>服务单号：</div>
            <div className={styles.rowBd}>{info.applyId}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowHd}>申请时间：</div>
            <div className={styles.rowBd}>{info.createDate}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowHd}>服务类型：</div>
            <div className={styles.rowBd}>{info.applyType}</div>
          </div>
        </div>
        <div className={styles.servicePage}>
          <div className={styles.row}>
            <div className={styles.rowHd}>商品退回：</div>
            <div className={styles.rowBd}>快递至第三方卖家</div>
          </div>
        </div>
        <div className={styles.servicePage}>
          <div className={styles.row}>
            <div className={styles.rowHd}>联系人：</div>
            <div className={styles.rowBd}>{info.returnName}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowHd}>联系电话：</div>
            <div className={styles.rowBd}>{info.returnPhone}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowHd}>收货地址：</div>
            <div className={styles.rowBd}>
              湖南省长沙市开福区湖南省长沙市开福区湖南省长沙市开福区
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceInfoView;
