import React, { FC } from 'react';
import styles from './index.less';
import IconCollection from '@/assets/img/goodsdetail/collection-icon.png';

interface GoodsItem {
  goodsName: string; // 商品名称
  saleCount: string; // 销量
  lowestPrice: string;
  highestPrice: string;
  goodsDesc: string; //商品描述
}

interface ShopInfoProps {
  data: GoodsItem;
}

const ShopInfo: FC<ShopInfoProps> = (props) => {
  const { goodsName = '', saleCount = '', lowestPrice = '', highestPrice = '', goodsDesc = '' } =
    props.data || {};
  const price = lowestPrice === highestPrice ? lowestPrice : lowestPrice + '-' + highestPrice;
  return (
    <div className={styles.shopInfo}>
      <div className={styles.shopSet}>
        <div>
          <div className={styles.shopPrice}>
            ¥ <span>{price}</span>
          </div>
          <div className={styles.saleCount}>总销量 {saleCount}笔</div>
        </div>
        {/* <div className={styles.collection}>
          <img src={IconCollection} alt="" />
          <span>收藏</span>
        </div> */}
      </div>
      <div className={styles.shopTitle}>{goodsName}</div>
      <div className={styles.shopTips}>{goodsDesc}</div>

      {/*
        模块暂时不做
         <div className={styles.shopTips}>
        【5.17电信节预热启动，多款产品售享优惠】流量尊享任性用，再也不用担心流量不足。
      </div>

        */}
    </div>
  );
};

export default ShopInfo;
