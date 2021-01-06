import React, { FC } from 'react';
import { AddPng, ReducePng, GrayAddPng, GrayReducePng } from '@/assets';
import placeholderImg from '@/assets/img/placeholder.png';
import styles from './index.less';

interface TabItemProps {
  data: any;
  reduceClick: (e: any) => void;
  addClick: (e: any) => void;
  click?: (res: any) => void;
  type?: 'sku' | 'gift' | 'goods'; // 代表已选的sku商品/赠品/商品列表的数据
}

const TabItem: FC<TabItemProps> = (props) => {
  const { data = {}, reduceClick, addClick, click = () => { }, type = 'goods' } = props;

  const leftClick = (e: any) => {
    e.stopPropagation();
    reduceClick(data);
  };

  const rightClick = (e: any) => {
    e.stopPropagation();
    addClick(data);
  };

  const queryImg = () => {
    switch (type) {
      case 'goods':
        return data?.filePathInServer || placeholderImg;
      case 'gift':
        return data?.picUrl;
      case 'sku':
        return data?.skuInfoThumbnail;
    }
  };
  //

  const showInsAndReduce = (data: any) => {
    return (
      <React.Fragment>
        {data?.quantity > 0 && (
          <img
            src={type === 'gift' ? GrayReducePng : ReducePng}
            alt=""
            className={styles.footLeftImg}
            onClick={(e) => leftClick(e)}
          />
        )}
        {data?.quantity > 0 && <div className={styles.footNum}>{data?.quantity}</div>}
        <img
          src={type === 'gift' ? GrayAddPng : AddPng}
          alt=""
          className={styles.footRightImg}
          onClick={rightClick}
          param-action="shopCart"
          id={`add_${data.goodsId}`}
          onLoad={() => {
            const element = document.querySelector(`#add_${data.goodsId}`);
            if (element) {
              // console.log(element);
              element.pageset = { goodsId: data.goodsId };
            }
          }}
        />
      </React.Fragment>
    );
  };

  const showSelectBtn = () => {
    return (
      <div
        className={styles.selectSpec}
        onClick={rightClick}
        param-action="selectProduct"
        id={`add_${data.goodsId}`}
      >
        选规格
      </div>
    );
  };

  return (
    <div
      className={styles.TabItemStyle}
      onClick={() => click(data)}
      param-action="goodsDetails"
      id={`details_${data.goodsId}`}
    >
      <img src={queryImg()} alt="" className={styles.tdItemImg} param-action="goodsDetails" />
      <div className={styles.tdItemContent} param-action="goodsDetails">
        <div className={styles.tdiTitle} param-action="goodsDetails">
          {
            // type === 'sku' ? data.skuName :
            data?.goodsName
          }
        </div>
        <div className={styles.tdiSubTitle} param-action="goodsDetails">
          {type === 'sku' ? data?.select : data?.goodsDesc}
        </div>
        <div className={styles.tabItemfooter} param-action="goodsDetails">
          {type !== 'gift' && (
            <div className={styles.tdiFooterMoney} param-action="goodsDetails">
              {type === 'sku' ? (data.salesPrice * data.quantity).toFixed(1) : data?.lowestPrice}元
            </div>
          )}
          <div className={styles.tdiFooterChange} param-action="goodsDetails">
            {(data?.single || (data?.quantity !== undefined && data?.quantity !== 0)) &&
              showInsAndReduce(data)}
            {data?.single === false && !data?.quantity && showSelectBtn()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabItem;
