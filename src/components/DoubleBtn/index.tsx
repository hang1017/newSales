import React from 'react';
import { Flex } from 'antd-mobile';

import styles from './index.less';

interface DoubleBtn {
  shopBtnText?: string; // 购物车按钮的字体
  buyBtnText?: string; //  立即购买按钮字体
  addToShop?: () => void; //  加入购物车
  buyNowClick?: () => void; //  立即购买
}

const Page: React.FC<DoubleBtn> = (props) => {
  const { shopBtnText = '加入购物车', buyBtnText = '立即购买', addToShop, buyNowClick } = props;

  return (
    <div className={styles.footSingleBtn}>
      <Flex>
        <Flex.Item>
          <div className={styles.addShop} onClick={addToShop}>
            {shopBtnText}
          </div>
        </Flex.Item>
        <Flex.Item>
          <div className="buyBtn" onClick={buyNowClick}>
            {buyBtnText}
          </div>
        </Flex.Item>
      </Flex>
    </div>
  );
};

export default Page;
