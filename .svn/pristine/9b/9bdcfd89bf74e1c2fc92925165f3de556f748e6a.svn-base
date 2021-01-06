import React from 'react';

import phoneImg from '@/assets/img/goodsdetail/shop-image.png';
import finishImg from '@/assets/img/order/finish_icon.png';

import Utils from '@/utils/tool';
import styles from './index.less';

interface EmptyItem {
  data: any;
  grayBtnText?: string;
  redBtnText?: string;
  grayBtnClick?: (item: any) => {};
  redBtnClick?: (item: any) => {};
}

const Page: React.FC<EmptyItem> = (props) => {
  const { data, grayBtnClick, grayBtnText, redBtnClick, redBtnText } = props;
  const { id, imgSrc, goodsName, count, source } = data || {};
  const tempCount = Utils.getIntegerAndDecimal(count);

  return (
    <div className={styles.goodsItem} key={id}>
      <img src={finishImg} alt="" className={styles.finishIcon} />
      <div>
        <span className={styles.source}>{source}</span>
      </div>
      <div className={styles.goodsInfo}>
        <img src={imgSrc || phoneImg} alt="" />
        <div className={styles.rightInfo}>
          <div className={styles.goodsName}>{goodsName}</div>
          <div>
            <span className={styles.decimal}>￥</span>
            <span className={styles.integer}>{tempCount.integer}</span>
            <span className={styles.decimal}>{tempCount.decimal}</span>
          </div>
        </div>
      </div>
      <div className={styles.btnBlock}>
        <span
          className={styles.greyBtn}
          onClick={() => {
            grayBtnClick(data);
          }}
        >
          {grayBtnText}
        </span>
        <span
          className={redBtnText?.length <= 2 ? styles.redBtn : styles.moreTextRedBtn}
          onClick={() => [redBtnClick(data)]}
        >
          {redBtnText}
        </span>
      </div>
    </div>
  );
};

export default Page;
