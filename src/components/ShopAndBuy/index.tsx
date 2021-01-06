import React from 'react';
import { Flex } from 'antd-mobile';

import cusSeviceIcon from '@/assets/img/customerService.png';
import shopIcon from '@/assets/img/shop.png';

import styles from './index.less';

interface ShopAndBuyBtn {
  shopBtnText?: string; // 购物车按钮的字体
  buyBtnText?: string; //  立即购买按钮字体
  customerServieClick?: () => void; // 客服
  goToShoopClick?: () => void; // 购物车
  addToShop?: () => void; //  加入购物车
  buyNowClick?: () => void; //  立即购买
}

const Page: React.FC<ShopAndBuyBtn> = (props) => {
  const {
    shopBtnText = '加入购物车',
    buyBtnText = '立即购买',
    customerServieClick,
    goToShoopClick,
    addToShop,
    buyNowClick,
  } = props;

  return (
    <div className={styles.footSingleBtn}>
      <Flex>
        <Flex.Item>
          <Flex>
            <Flex.Item className={styles.textCenter} onClick={customerServieClick}>
              <img src={cusSeviceIcon} alt="" />
              <div className={styles.tipText}>客服</div>
            </Flex.Item>
            <Flex.Item className={styles.textCenter} onClick={goToShoopClick}>
              <img src={shopIcon} alt="" />
              <div className={styles.tipText}>购物车</div>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <div className={styles.addShop} onClick={addToShop}>
            {shopBtnText}
          </div>
        </Flex.Item>
        <Flex.Item>
          <div className={styles.buyBtn} onClick={buyNowClick}>
            {buyBtnText}
          </div>
        </Flex.Item>
      </Flex>
    </div>
  );
};

export default Page;
