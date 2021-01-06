import React, { FC } from 'react';
import { WhiteSpace } from 'antd-mobile';

// import IconBitMap from '@/assets/img/goodsdetail/bitmap.png';
import IconDetailDes from '@/assets/img/goodsdetail/detail-des.png';
// detail-des.png
import styles from './index.less';

interface IGoodsDetailProps {
  goodsInfoAppText: string; // 商品详情，从服务端返回的标签元素
  children?: React.ReactNode;
}

const IGoodsDetail: FC<IGoodsDetailProps> = (props) => {
  const { goodsInfoAppText = '', children } = props;
  return (
    <>
      {/* <WhiteSpace /> */}
      <div className={styles.goodsDetail}>
        {children || (
          <div className={styles.detailTitle}>
            <img src={IconDetailDes} alt="" />
            <span>详情介绍</span>
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: goodsInfoAppText }}
          className={styles.goodsContent}
        ></div>
      </div>
    </>
  );
};

export default IGoodsDetail;
