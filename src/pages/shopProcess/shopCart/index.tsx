import React, { FC, useEffect, useState } from 'react';
import { ShopCartModelState, ConnectProps, connect, setPageNavBar, history } from 'alita';
import { PullToRefresh, Toast } from 'antd-mobile';

import Utils from '@/utils/tool';

import ShopCartCard from '@/components/ShopCartCard';
import unSelectIcon from '@/assets/img/un_select.png';
import selectIcon from '@/assets/img/select.png';

import emptyIcon from '@/assets/img/empty_cart.png';
import Recommend from '@/components/Recommend';
import FootBlock from '@/components/FootBlock';
import Empty from '@/components/Empty';

import styles from './index.less';

interface PageProps extends ConnectProps {
  shopCart: ShopCartModelState;
}

const ShopCartPage: FC<PageProps> = ({ shopCart, dispatch }) => {
  const [shopCarNum, updateShopCarNum] = useState(0);
  const [managerFlag, updateManager] = useState(true);
  const { storeList, payAmount, shopNum, allGoodsSkuIdList } = shopCart;
  const [selectGoodsList, updateSelectGoodsList] = useState(new Set([])); // 选中的商品
  const [selectAll, updateSelectAll] = useState(false);
  const [refreshing, updateRefreshing] = useState(false);
  const { memberId = '' } = Utils.getStorageForJson('userInfo') || {};

  const managerClick = () => {
    updateManager(!managerFlag);
  };

  /**
   * 购物车商品勾选/取消勾选--则需要更新结算的金额
   */
  const cartItemCheckGoods = (operation: string) => {
    dispatch!({
      type: 'shopCart/cartItemCheckGoods',
      payload: {
        selectGoodsList,
        memberId,
        operation,
        // visitorId: '10086',
      },
    }).then(() => {
      updateShopCarNum(selectGoodsList.size);
    });
  };

  /**
   * 更新购物车信息
   */
  const queryCartInfo = (isSelect: boolean) => {
    dispatch!({
      type: 'shopCart/queryCartInfo',
      payload: {
        memberId,
        // memberId: '10086',
        // visitorId: '10086',
      },
    }).then((res) => {
      const { shopNum, tempCheckIdList } = res;
      updateSelectGoodsList(new Set(tempCheckIdList));
      updateSelectAll(allGoodsSkuIdList.length === tempCheckIdList.length);
      updateShopCarNum(selectGoodsList.size);
      setPageNavBar({
        pagePath: '/shopProcess/shopCart',
        navBar: {
          pageTitle: `购物车(${shopNum})`,
        },
      });
      updateRefreshing(false);
      updateShopCarNum(shopNum);
      if (isSelect) {
        // 在增加和减少商品数量时，如果该商品在选择当中，则需要更新结算的金额
        cartItemCheckGoods('0');
      }
    });
  };

  // 这里发起了初始化请求
  useEffect(() => {
    if (!memberId) {
      Toast.info('您还未登录，请先登录', 3);
      history.push({
        pathname: '/login',
      });
    } else {
      queryCartInfo(false);
    }

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);

  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  /**
   * 商品选择
   * @param goodsInfo
   * @param select
   * @param proNum
   */
  const shopCartSelect = (goodsInfo: any, select: boolean) => {
    const { skuId } = goodsInfo;
    if (select) {
      selectGoodsList.add(skuId);
    } else {
      selectGoodsList.delete(skuId);
    }
    if (selectGoodsList.size === allGoodsSkuIdList.length) {
      updateSelectAll(true);
    }
    if (selectGoodsList.size < allGoodsSkuIdList.length) {
      updateSelectAll(false);
    }
    updateSelectGoodsList(selectGoodsList);
    cartItemCheckGoods('0');
  };

  /**
   *页面全选按钮事件
   */
  const selectAllClick = () => {
    let operation = '0'; // 非全选或者是全取消
    if (!selectAll) {
      updateSelectGoodsList(new Set(allGoodsSkuIdList));
      operation = '1';
    } else {
      selectGoodsList.clear();
      updateSelectGoodsList(new Set([]));
      operation = '2';
    }
    updateSelectAll(!selectAll);
    cartItemCheckGoods(operation);
  };

  /**
   * 更改商品数量
   */
  const modifyGoodsNum = (data: any, quantity: number) => {
    const { skuId } = data;
    dispatch!({
      type: 'shopCart/modifyGoodsNum',
      payload: {
        goodsList: [
          {
            skuId,
            quantity,
          },
        ],
        // visitorId: '1111245',
        memberId,
        // memberId: '10086',
      },
    }).then(() => {
      // 变更商品之后，需要重新查询购物车的信息
      queryCartInfo(selectGoodsList.has(skuId));
    });
  };

  /**
   * 增加商品数量
   * @param data
   */

  const addGoodsNum = (data: any, goodsNum: number) => {
    console.log(`增加商品数量${goodsNum}`);
    modifyGoodsNum(data, goodsNum);
  };
  /**
   * 减少商品数量
   * @param data
   */
  const subGoodsNum = (data: any, goodsNum: number) => {
    modifyGoodsNum(data, goodsNum);

    console.log('减少商品数量');
  };
  /**
   * 删除购物车当中的商品
   */
  const cartItemGoodsDelete = () => {
    dispatch!({
      type: 'shopCart/cartItemGoodsDelete',
      payload: {
        selectGoodsList,
        memberId,
        // visitorId: '11235',
      },
    }).then(() => {
      selectGoodsList.clear();
      updateSelectGoodsList(new Set([]));
      queryCartInfo(true);
    });
  };
  /**
   * 下拉刷新
   */
  const onRefresh = () => {
    updateRefreshing(true);
    selectGoodsList.clear();
    updateSelectGoodsList(new Set([]));
    updateSelectAll(false);
    updateShopCarNum(0);
    queryCartInfo(false);
  };
  /**
   * 购物车结算
   */
  const commitCart = () => {
    if (selectGoodsList.size === 0) {
      Toast.info('您还没选择商品哦');
      return false;
    }

    dispatch!({
      type: 'shopCart/commitCart',
      payload: {
        singleFlag: 0, // 直接对某个商品进行计算
        // memberId: '10086',
        memberId,
      },
    }).then((res: any) => {
      if (res) {
        dispatch!({
          type: 'fillOrder/saveCommitData',
          payload: {
            commitData: res,
          },
        }).then(() => {
          history.push({
            pathname: '/shopProcess/fillOrder',
          });
        });
      }
    });
  };
  return (
    <>
      {storeList && storeList.length ? (
        <>
          <span className={styles.managerText} onClick={managerClick} id="managerText">
            {managerFlag ? '管理' : '完成'}
          </span>
          <div className={styles.shopCartPage}>
            <PullToRefresh
              damping={80}
              style={{ background: '#F5F7F9' }}
              refreshing={refreshing}
              onRefresh={onRefresh}
            >
              {storeList.map((item) => {
                return (
                  <ShopCartCard
                    data={item}
                    shopCartSelect={shopCartSelect}
                    addGoodsNum={addGoodsNum}
                    subGoodsNum={subGoodsNum}
                    selectGoodsList={selectGoodsList}
                  />
                );
              })}

              <Recommend />

              <FootBlock />
            </PullToRefresh>
            <div className={styles.footBtn}>
              <div className={styles.footContent}>
                <div onClick={selectAllClick}>
                  <img
                    src={selectAll ? selectIcon : unSelectIcon}
                    className={styles.selectImg}
                    alt=""
                  />
                  <span className={styles.selectText}>全选</span>
                </div>
                <div className={styles.rightContent}>
                  {managerFlag ? (
                    <>
                      <div>
                        <span className={styles.allText}>合计：</span>
                        <span className={styles.priceText}>
                          ¥
                          {(Utils.getIntegerAndDecimal(selectGoodsList.size ? payAmount : 0)
                            .integer || '') +
                            (Utils.getIntegerAndDecimal(selectGoodsList.size ? payAmount : 0)
                              .decimal || '')}
                        </span>
                      </div>
                      <div className={styles.submit} onClick={commitCart}>
                        去结算({shopCarNum})
                      </div>
                    </>
                  ) : (
                    <span className={styles.deleteBtn} onClick={cartItemGoodsDelete}>
                      删除
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PullToRefresh
            damping={80}
            style={{ background: '#F5F7F9' }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          >
            <div className={styles.emptyCart}>
              <Empty imgSrc={emptyIcon} text="购物车还是空的" />
              <Recommend />
            </div>

            <FootBlock />
          </PullToRefresh>
        </>
      )}
    </>
  );
};

export default connect(({ shopCart }: { shopCart: ShopCartModelState }) => ({ shopCart }))(
  ShopCartPage,
);
