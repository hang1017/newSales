import React, { useState, useEffect } from 'react';
import { Flex, Toast } from 'antd-mobile';
import SingleBtn from '@/components/SingleBtn';
import SkuItem from '@/components/SkuItem';

import closeIcon from '@/assets/img/close.png';
import addNumIcon from '@/assets/img/add_num.png';
import subNumIcon from '@/assets/img/sub_num.png';
import styles from './index.less';

interface ProdInfoAlert {
  saleList?: string; // 销售属性
  closeClick?: () => void;
  show?: boolean;
  buyNowClick?: (skuInfo: object, proNum: number) => void; // 立即购买
  addToShop?: (skuInfo: object, proNum: number) => void;
  flag: string; // 用来表示是加入购物车还是立即购买
  attrQueryCOList: any; // 当前选择的销售属性
  dispatch: any;
  updateAttrList?: (attrQueryCOList: any) => void; // 更新当前选择的销售属性
  goodsId: string; // 商品id
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
  const {
    show = false,
    closeClick = () => {},
    buyNowClick,
    addToShop,
    flag,
    saleList = [],
    attrQueryCOList = [],
    dispatch,
    updateAttrList,
    goodsId,
  } = props;

  console.log(props);

  const requestSkuInfo = () => {
    dispatch!({
      type: 'goodsDetail/queryDetailByAttr',
      payload: {
        attrList: attrQueryCOList,
        goodsId,
      },
    }).then((data) => {
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
  useEffect(() => {
    if (show) {
      requestSkuInfo();
    }
  }, [show]);

  const updateNumRequest = (currenNum) => {
    dispatch!({
      type: 'goodsDetail/queryDetailByAttr',
      payload: {
        attrList: attrQueryCOList,
        goodsId,
      },
    }).then((data) => {
      if (currenNum > data.stockNum) {
        Toast.show('商品数量不符规定！');
      } else {
        updateProNum(currenNum);
      }
    });
  };
  // 选择每个sku时触发的属性
  const skuOnClick = (attrCode, attrValue, attrName) => {
    const existList = attrQueryCOList.filter(
      (item) => item.attrValue === attrValue && item.attrCode === attrCode,
    );

    if (!existList.length) {
      attrQueryCOList.map((item, index) => {
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
    attrQueryCOList.map((item, index) => {
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

          <div
            className={styles.skuContent}
            style={{ height: document.documentElement.clientHeight * 0.5 }}
          >
            {saleList.map((item) => {
              if (!item.attrValues.length) {
                return <></>;
              }
              return <SkuItem item={item} onClick={skuOnClick} attrCode={item.attrCode} />;
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
                      updateNumRequest(currenNum);
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
          text="确定"
          canClick={canClick}
          onClick={() => {
            if (flag === '0') {
              if (canClick) {
                //  加入购物车
                addToShop(skuInfo, proNum);
              } else {
                Toast.show('不允许添加购物车！');
              }
            } else {
              buyNowClick(skuInfo, proNum);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Page;
