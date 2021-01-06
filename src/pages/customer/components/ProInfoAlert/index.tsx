import React, { useState, useEffect } from 'react';
import { Flex, Toast } from 'antd-mobile';
import SingleBtn from '@/components/SingleBtn';
import { SkuItem, DoubleButton } from '..';

import closeIcon from '@/assets/img/close.png';
import addNumIcon from '@/assets/img/add_num.png';
import subNumIcon from '@/assets/img/sub_num.png';
import styles from './index.less';
import { BackgroundColor } from 'chalk';

interface ProdInfoAlert {
  saleList?: []; // 销售属性
  closeClick?: () => void;
  show?: boolean;
  leftClick: (skuInfo: object, proNum: number, data: any, categoryId: string) => void; // 立即购买
  rightClick: (skuInfo: object, proNum: number) => void;
  flag: string; // 用来表示是加入购物车还是立即购买
  attrQueryCOList: any; // 当前选择的销售属性
  dispatch: any;
  updateAttrList?: (attrQueryCOList: any) => void; // 更新当前选择的销售属性
  goodDetail: any; // 商品详情
  categoryId: string; // 当前的 类目id
}

const Page: React.FC<ProdInfoAlert> = (props) => {
  const [proNum, updateProNum] = useState(1);
  const [canClick, updateCanClick] = useState(false);
  const [skuInfo, updateSkuInfo] = useState({
    skuNbr: '---',
    skuId: '',
    skuName: '---',
    salesPrice: '',
    skuInfoThumbnail: '',
    stockNum: '--',
    storeName: '--',
  });
  const [selectList, setSelectList] = useState([]);
  const {
    show = false,
    closeClick = () => { },
    leftClick,
    rightClick,
    flag,
    saleList = [],
    attrQueryCOList = [],
    dispatch,
    updateAttrList,
    goodDetail,
    categoryId = '',
  } = props;

  const requestSkuInfo = () => {
    dispatch!({
      type: 'goodsDetail/queryDetailByAttr',
      payload: {
        attrList: attrQueryCOList,
        goodsId: goodDetail.goodsId,
      },
    }).then((data: any) => {
      if (proNum > data.stockNum) {
        updateCanClick(false);
      } else {
        updateCanClick(true);
      }
      const { skuNbr, skuId, skuName, skuInfoThumbnail, salesPrice, storeName, stockNum } = data;
      updateSkuInfo({
        skuNbr,
        skuId,
        skuName,
        skuInfoThumbnail,
        salesPrice,
        storeName,
        stockNum,
      });
    });
  };

  const initSelectList = () => {
    // let li = attrQueryCOList.map(item => {
    //   return {
    //   }
    // })
  };

  useEffect(() => {
    if (show) {
      requestSkuInfo();
      updateProNum(1);

      // initSelectList();
    }
  }, [show]);

  const updateNumRequest = (currenNum: number) => {
    dispatch!({
      type: 'goodsDetail/queryDetailByAttr',
      payload: {
        attrList: attrQueryCOList,
        goodsId: goodDetail.goodsId,
      },
    }).then((data: any) => {
      if (currenNum > data.stockNum) {
        Toast.show('商品数量不符规定！');
      } else {
        updateProNum(currenNum);
      }
    });
  };
  // 选择每个sku时触发的属性
  const skuOnClick = (attrCode: any, attrValue: any, attrName: any) => {
    const existList = attrQueryCOList.filter(
      (item: any) => item.attrValue === attrValue && item.attrCode === attrCode,
    );

    console.log(attrQueryCOList);

    if (!existList.length) {
      attrQueryCOList.map((item: any, index: number) => {
        if (item.attrCode === attrCode) {
          attrQueryCOList[index].attrValue = attrValue;
          attrQueryCOList[index].attrName = attrName;
        }
      });
      updateAttrList && updateAttrList(attrQueryCOList);
      requestSkuInfo();
    }
  };
  const getSelectText = () => {
    let selectText = '';
    attrQueryCOList.map((item: any) => {
      // if (item.attrCode === attrCode) {
      //   attrQueryCOList[index].attrValue = attrValue;
      //   attrQueryCOList[index].attrName = attrName;
      selectText = selectText + '"' + item.attrName + '" ';
      // }
    });
    return selectText;
  };
  return (
    <div className={styles.actionModel}>
      {show && (
        <div
          className={styles.actionBg}
          onClick={(e) => {
            e.stopPropagation();
            closeClick(e);
          }}
        ></div>
      )}
      <div className={`${styles.actAlert} ${show && styles.show}`}>
        <div className={styles.alertContent}>
          <div className={styles.alertHead}>
            <div className={styles.priceBlock}>
              <img src={skuInfo.skuInfoThumbnail} alt="" className={styles.imgSize} />
              <div style={{ marginLeft: '24px' }} className={styles.priceBlockContent}>
                <div className={styles.price}>
                  <span>￥</span>
                  {skuInfo.salesPrice}
                </div>
                <div className={styles.proNum}>{'库存:' + skuInfo.stockNum + '件'}</div>
                <div className={styles.proSelectText}>{'已选:' + getSelectText()}</div>
              </div>
            </div>
            <div
              className={styles.rightClose}
              onClick={(e) => {
                e.stopPropagation();
                closeClick();
              }}
            >
              <img src={closeIcon} alt="" />
            </div>
          </div>

          <div className={styles.skuContent}>
            {saleList.map((item: any) => {
              if (!item.attrValues.length) {
                return <></>;
              }
              return (
                <SkuItem
                  key={item?.attrCode}
                  item={item}
                  onClick={skuOnClick}
                  attrCode={item.attrCode}
                />
              );
            })}

            <Flex>
              <Flex.Item className={styles.alertTitle}>数量</Flex.Item>
              <Flex.Item className={styles.textRigth}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div className={styles.imgDiv}>
                    <img
                      className={styles.imgs}
                      src={subNumIcon}
                      alt=""
                      onClick={() => {
                        if (proNum > 1) {
                          updateProNum(proNum - 1);
                        }
                      }}
                    />
                  </div>
                  <input
                    className={styles.inputNum}
                    type="number"
                    onChange={(event) => {
                      const currenNum = event.currentTarget.value;
                      updateNumRequest(parseInt(currenNum, 10));
                    }}
                    value={proNum}
                  />
                  <div className={styles.imgDiv}>
                    <img
                      className={styles.imgs}
                      src={addNumIcon}
                      alt=""
                      onClick={() => {
                        const currenNum = proNum + 1;
                        updateNumRequest(currenNum);
                      }}
                    />
                  </div>
                </div>
              </Flex.Item>
            </Flex>
          </div>
        </div>
        <SingleBtn
          text="加入购物车"
          newUIFlag
          action='shopCart'
          canClick={canClick}
          onClick={() => {
            // if (flag === '0') {
            //   if (canClick) {
            //     //  加入购物车
            //     addToShop(skuInfo, proNum);
            //   } else {
            //     Toast.show('不允许添加购物车！');
            //   }
            // } else {
            //   buyNowClick(skuInfo, proNum);
            // }
            leftClick(
              {
                ...skuInfo,
                select: getSelectText(),
                saleAttrList: goodDetail.saleAttrList,
              },
              proNum,
              goodDetail,
              categoryId,
            );
          }}
        />
        {/* <DoubleButton
          leftButton={{
            content: '加入购物车',
          }}
          // rightButton={{
          //   content: '去结算',
          // }}
          leftClick={() => {
            leftClick(
              {
                ...skuInfo,
                select: getSelectText(),
                saleAttrList: goodDetail.saleAttrList,
              },
              proNum,
              goodDetail,
              categoryId,
            );
          }}
          // rightClick={() => {
          //   rightClick(skuInfo, proNum);
          // }}
        /> */}
      </div>
    </div>
  );
};

export default Page;
