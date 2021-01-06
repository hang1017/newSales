import { Reducer } from 'redux';
import {
  queryCartInfo,
  addToCart,
  cartItemGoodsDelete,
  modifyGoodsNum,
  cartItemCheckGoods,
  commitCart,
} from '@/services/tradingCenter';
import { Effect, Subscription } from 'alita';

import { getGoodsInfoList } from '@/utils/bizCommon';

export interface ShopCartModelState {
  storeList: any; // 购物车详情
  shopNum: number; // 购物车数量
  payAmount: string; // 总的金额
  allPayAmount: string;
  allGoodsSkuIdList: any[]; // 购物车当中所有商品的skuId
}

export interface ShopCartModelType {
  namespace: 'shopCart';
  state: ShopCartModelState;
  effects: {
    queryCartInfo: Effect; // 获取购物车信息
    addToCart: Effect; // 添加商品到购物车
    cartItemGoodsDelete: Effect; // 删除购物车信息
    modifyGoodsNum: Effect; // 购物车商品数量变更
    cartItemCheckGoods: Effect; //  购物车商品勾选/取消勾选
    commitCart: Effect; // 购物车结算
    updateStoreList: Effect;
  };
  reducers: {
    save: Reducer<ShopCartModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ShopCartModel: ShopCartModelType = {
  namespace: 'shopCart',

  state: {
    storeList: [],
    shopNum: 0,
    payAmount: '',
    allGoodsSkuIdList: [],
    allPayAmount: '',
  },

  effects: {
    *queryCartInfo({ payload }, { call, put }) {
      let shopNum = 0;
      let tempCheckIdList: any[] = [];
      let allGoodsSkuIdList: any[] = [];
      const data = yield call(queryCartInfo, payload);
      if (data) {
        const { storeList = [], payAmount } = data;
        const allPayAmount = payAmount; // 这里全选会需要用到
        if (storeList && storeList.length) {
          storeList.map((item) => {
            let tempList: any[] = [];

            const { goodsList } = item;
            shopNum += goodsList.length;
            goodsList.map((goodsItem: any) => {
              const { skuId, checked } = goodsItem;
              tempList.push(skuId);
              if (checked + '' === '1') {
                tempCheckIdList.push(skuId);
              }
            });

            allGoodsSkuIdList = allGoodsSkuIdList.concat(tempList);
          });
        }
        yield put({
          type: 'save',
          payload: {
            storeList,
            shopNum,
            payAmount,
            allPayAmount,
            allGoodsSkuIdList,
          },
        });
      }

      return { tempCheckIdList, shopNum };
      // console.log(data);
    },
    *addToCart({ payload }, { call, put }) {
      const res = yield call(addToCart, payload);
    },
    *cartItemGoodsDelete({ payload }, { call, put, select }) {
      const { selectGoodsList, memberId, visitorId } = payload;
      const { storeList } = yield select((_) => _.shopCart);
      const goodsList = getGoodsInfoList({
        selectGoodsList,
        storeList,
      });

      const res = yield call(cartItemGoodsDelete, { goodsList, memberId, visitorId });
      // if (res) {
      //   const storeList = res.storeList || [];

      // }
    },
    *modifyGoodsNum({ payload }, { call, put, select }) {
      const { skuId, quantity } = payload;
      const res = yield call(modifyGoodsNum, payload);
      if (res) {
        const { storeList } = yield select((_) => _.shopCart);
        if (storeList && storeList.length) {
          // 更改购物车的数据
          storeList.map((item: any, index: number) => {
            item.goodsList.map((childItem: any, childIndex: number) => {
              if (`${childItem.skuId}` === `${skuId}`) {
                storeList[index][childIndex].quantity = quantity;
              }
            });
          });
          yield put({
            type: 'save',
            payload: {
              storeList,
            },
          });
        }
      }
    },
    *cartItemCheckGoods({ payload }, { call, put, select }) {
      let { selectGoodsList, memberId, visitorId, operation } = payload;
      const { storeList, allGoodsSkuIdList } = yield select((_) => _.shopCart);
      if (operation === '1') {
        // 全选的情况下
        selectGoodsList = new Set(allGoodsSkuIdList);
      } else if (operation === '2') {
        // 全不选的情况下
        selectGoodsList = new Set([]);
      }
      if (selectGoodsList.size) {
        const goodsList = getGoodsInfoList({
          selectGoodsList,
          storeList,
          checked: 1,
        });

        const res = yield call(cartItemCheckGoods, { goodsList, memberId, visitorId });
        console.log(JSON.stringify(res) + '--------');
        if (res) {
          const { payAmount } = res;
          let tempPayAmount = yield select((_) => _.shopCart).payAmount;
          if (`${tempPayAmount}` !== `${payAmount}`) {
            // 如果值不发生改变，则取上一次的值
            tempPayAmount = payAmount;
          }
          // console.log(payAmount + "payAmount")
          yield put({
            type: 'save',
            payload: {
              payAmount: tempPayAmount,
              shopNum: selectGoodsList.size,
            },
          });
        }
      } else {
        yield put({
          type: 'save',
          payload: {
            payAmount: 0,
            shopNum: 0,
          },
        });
      }
    },
    *commitCart({ payload }, { call, put }) {
      const res = yield call(commitCart, payload);
      if (res && res.storeList.length) {
        console.log(JSON.stringify(res) + '购物车结算');
        return res;
      }
      return '';
    },
    *updateStoreList({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          storeList: [],
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/shopProcess/shopCart') {
          dispatch({
            type: 'shopCart/updateStoreList',
          });
        }
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ShopCartModel;
