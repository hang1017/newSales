import React, { useState, useEffect } from 'react';
import { Toast } from 'antd-mobile';

import phoneImg from '@/assets/img/payment/pro_phone.png';
import addNumIcon from '@/assets/img/add_num.png';
import subNumIcon from '@/assets/img/sub_num.png';
import unSelectIcon from '@/assets/img/un_select.png';
import Utils from '@/utils/tool';
import selectIcon from '@/assets/img/select.png';
import downIcon from '@/assets/img/payment/down.png';

import styles from './index.less';

interface ShopCartItem {
  data: any;
  selectGoodsList?: any; //  选中的商品的集合
  shopCartSelect: (item: any, addFlag: boolean) => void; // 取消或者选择商品
  addGoodsNum: (item: any, goodsNum: number) => void; // 增加商品数据
  subGoodsNum: (item: any, goodsNum: number) => void; // 减少商品数据
}

const Page: React.FC<ShopCartItem> = (props) => {
  const { selectGoodsList, data, shopCartSelect, addGoodsNum, subGoodsNum } = props;
  const {
    goodsName = '',
    quantity = 1,
    price,
    skuName = '',
    servList = [],
    giftList = [],
    skuId,
    picUrl,
    accNum = '',
    checkEd,
  } = data || {};
  const [proNum, updateProNum] = useState(quantity);
  const [selectFlag, updateSelect] = useState(selectGoodsList.has(skuId));
  const temPrice = Utils.getIntegerAndDecimal(price);

  useEffect(() => {
    updateSelect(selectGoodsList.has(skuId));
    return () => {};
  }, [selectGoodsList]);
  /**
   * 点击是否选中图标
   */
  const myAddShopCart = () => {
    updateSelect(!selectFlag);
    if (shopCartSelect) {
      shopCartSelect(data, !selectFlag);
    }
  };
  /**
   * 增加商品数量
   */
  const myAddGoodsNum = () => {
    const tempAddnNum = proNum + 1;
    updateProNum(tempAddnNum);
    if (addGoodsNum) {
      addGoodsNum(data, tempAddnNum);
    }
  };
  /**
   * 减少商品的数据
   */
  const mySubGoodsNum = () => {
    if (proNum > 1) {
      const tempNum = proNum - 1;
      updateProNum(tempNum);
      if (subGoodsNum) {
        subGoodsNum(data, tempNum);
      }
    } else {
      Toast.info('最少购买一件哦！');
    }
  };

  return (
    <div className={styles.prodInfoBlock}>
      <img
        src={selectFlag ? selectIcon : unSelectIcon}
        className={styles.selectImg}
        alt=""
        onClick={myAddShopCart}
      />
      <div className={styles.righContent}>
        <img src={picUrl || phoneImg} alt="" className={styles.goodsImg} />
        <div style={{ width: '100%', marginLeft: '20px' }}>
          <div className={styles.prodDes}>{goodsName}</div>
          <div className={styles.subDes}>
            <span>
              {skuName}
              <img src={downIcon} alt="" />
            </span>
          </div>
          <div className={styles.prodPriceAndNum}>
            <div className={styles.prodPrice}>
              <span className={styles.decimal}>￥</span>
              <span className={styles.integer}>{temPrice.integer}</span>
              <span className={styles.decimal}>{temPrice.decimal}</span>
            </div>
            <div>
              <img src={subNumIcon} alt="" onClick={mySubGoodsNum} />
              <input
                className="inputNum"
                type="number"
                onChange={(event) => {
                  updateProNum(event.currentTarget.value);
                }}
                value={proNum}
              />
              <img src={addNumIcon} alt="" onClick={myAddGoodsNum} />
            </div>
          </div>
          <div className={styles.goodsOther}>
            <div className={accNum ? '' : 'hideElement'}>
              <span>手机</span>
              <label>{accNum}</label>
            </div>
            {giftList.map((gifItem: any) => {
              return (
                <div>
                  <span>赠品</span>
                  {gifItem.giftName}
                </div>
              );
            })}

            {servList.map((serviceItem: any) => {
              return (
                <div>
                  <span>服务</span>
                  {serviceItem.servName}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
