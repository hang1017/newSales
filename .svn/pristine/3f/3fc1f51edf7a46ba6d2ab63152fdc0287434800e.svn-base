import React from 'react';
import placeholderImg from '@/assets/img/placeholder.png';
import styles from './index.less';

interface BusinessItem {
  data?: any;
  clickCallback: (e: boolean, t: string) => void;
}

const Page: React.FC<BusinessItem> = (props) => {
  const { data = {}, clickCallback } = props;
  const { accNum = '', stopFlag = false, spuInstInfoCOs = [] } = data;
  let itemInfo = {};
  if (spuInstInfoCOs.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    itemInfo = spuInstInfoCOs[0];
  }
  const {
    name = '',
    price = '',
    renewFlag,
    effDate = '',
    expDate = '',
    spuInstId = '',
    imagUrl = '',
  } = itemInfo;
  const operationClick = () => {
    if (clickCallback) {
      clickCallback(renewFlag, spuInstId);
    }
  };
  return (
    <div className={styles.businessItem}>
      <div className={styles.itemHeader}>
        <div className={styles.phoneNum}>手机：{accNum}</div>
        <div className={styles.cardStatus}>{stopFlag ? '停机' : '正常'}</div>
      </div>
      <div className={styles.itemContent}>
        <img src={imagUrl || placeholderImg} alt="" />
        <div className={styles.cardInfo}>
          <div className={styles.contentTitle}>{name}</div>
          <div>
            服务有效期：{effDate}-{expDate}
          </div>
          {

            // <div>续订状态：{renewFlag ? '是' : '否'}</div>
            // <div className={styles.btnBlock}>
            //   <div>价格：{price}元/月</div>
            // </div>

          }

        </div>
      </div>
      {/* <div className={styles.operContent}>
        <span className={styles.cancleBtn} onClick={operationClick}>
          {renewFlag ? '取消续订' : '续订'}
        </span>
      </div> */}
    </div>
  );
};

export default Page;
