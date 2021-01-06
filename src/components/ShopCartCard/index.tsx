import React from 'react';

import { Flex } from 'antd-mobile';
import smallLogoIcon from '@/assets/img/samll_log.png';

import ShopCartItem from '@/components/ShopCartItem';

import styles from './index.less';

const { Item } = Flex;
interface ShopCartCard {
  data: any;
  selectGoodsList: any; // 选中的商品skuId
  shopCartSelect: (item: any, addFlag: boolean) => void;
  addGoodsNum: (item: any, goodsNum: number) => void; // 增加商品数据
  subGoodsNum: (item: any, goodsNum: number) => void; // 减少商品数据
}

const Page: React.FC<ShopCartCard> = (props) => {
  const { data, shopCartSelect, selectGoodsList, addGoodsNum, subGoodsNum } = props;
  const { storeName = '', goodsList = [] } = data || {};

  return (
    <div className={styles.shopCartCard}>
      <Flex>
        <Item>
          <img src={smallLogoIcon} style={{ marginRight: '6px' }} />
          {storeName}
        </Item>
        <Item className="textRigth">
          <span className={styles.grayFont}>已免运费</span>
        </Item>
      </Flex>

      {goodsList.map((item) => {
        return (
          <ShopCartItem
            data={item}
            shopCartSelect={shopCartSelect}
            selectGoodsList={selectGoodsList}
            addGoodsNum={addGoodsNum}
            subGoodsNum={subGoodsNum}
          />
        );
      })}
    </div>
  );
};

export default Page;
