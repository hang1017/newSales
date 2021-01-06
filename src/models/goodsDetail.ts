import { Reducer } from 'redux';
import { Effect, Subscription } from 'alita';
import { Toast } from 'antd-mobile';
import { queryGoodsDetailByIds, queryDetailByAttr } from '@/services/goodsCenter';
import { queryEvaluationLabel, querySellerCommentsPage } from '@/services/evaluationApi';
import { promByGoodsQry } from '@/services/promotionApi';
import {
  addToCart,
  getVisitorId,
  queryPhoneNumInfo,
  commitCart,
  getMemberCartNum,
  phoneNumOccup,
  queryPhoneNumInfoForBilibili,
} from '@/services/tradingCenter';
import { queryAreaFatherList, queryAreaNextLevel } from '@/services/foundationCenterApi';

export interface GoodsDetailModelState {
  saleCount: string; // 总销量
  goodsName: string; // 商品名称
  goodsInfoAppText: string; // 商品详情
  lowestPrice: string;
  highestPrice: string;
  collectCount: string; // 收藏数量
  buyHighNum: string;
  goodsPictureList: any;
  saleList: any;
  storeId: string; // 店铺ID
  labelData: any; // 评价标签
  commentData: any; // 评论
  commentTotal: number; // 评论数
  goodsDesc: string; // 商品描述
  orderAttrs: any; // 订购属性
  cartNum: number; // 购物车商品数量
  attrQueryCOList: any; // 选择的商品属性
  defaultAddr: any; // 默认地址
  selectPhoneinfo: any; // 选择的号码信息
  coupons: any; // 活动内容
}

export interface GoodsDetailModelType {
  namespace: 'goodsDetail';
  state: GoodsDetailModelState;
  effects: {
    queryGoodsDetailByIds: Effect;
    addToCart: Effect;
    queryDetailByAttr: Effect;
    queryEvaluationLabel: Effect;
    querySellerCommentsPage: Effect;
    getVisitorId: Effect;
    queryPhoneNumInfo: Effect;
    queryAreaFatherList: Effect;
    getMemberCartNum: Effect;
    commitCart: Effect;
    queryAreaNextLevel: Effect;
    phoneNumOccup: Effect;
    queryPhoneNumInfoForBilibili: Effect;
  };
  reducers: {
    save: Reducer<GoodsDetailModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GoodsDetailModel: GoodsDetailModelType = {
  namespace: 'goodsDetail',

  state: {
    goodsName: '',
    goodsInfoAppText: '',
    saleCount: '',
    lowestPrice: '', // 最低价格
    highestPrice: '', // 最高价格
    buyHighNum: '', // 最高购物数量
    collectCount: '', // 收藏数量
    goodsPictureList: [], // 轮播图图片数据
    saleList: [], // 商品的销售信息
    storeId: '', // 店铺ID
    orderAttrs: [], // 订购属性
    cartNum: 0,
    labelData: [],
    attrQueryCOList: [],
    defaultAddr: '',
    selectPhoneinfo: {
      accNum: '',
      isNew: false,
      lanId: '',
      numLevel: '',
      phoneNumId: '',
      depositAmount: '',
      minConsume: '',
    }, // 选择的号码信息
    coupons: [],
  },
  effects: {
    *queryGoodsDetailByIds({ payload }, { call, put }) {
      const data = yield call(queryGoodsDetailByIds, payload);
      let tempAttrList: any = [];
      if (data) {
        const goodsDetail = data;
        const {
          goodsName = '',
          saleCount = '',
          goodsInfoAppText,
          lowestPrice = 0,
          highestPrice = 0,
          buyHighNum,
          collectCount,
          goodsInfoDetailPictureList = [],
          saleAttrs = [],
          storeId,
          goodsDesc,
          orderAttrs = [],
        } = goodsDetail || {};
        tempAttrList = saleAttrs;

        const tempList: any = [];
        tempAttrList.map((item) => {
          if (item.attrValues && item.attrValues.length) {
            tempList.push({
              attrCode: item.attrCode,
              attrValue: item.attrValues[0].attrValue,
              attrName: item.attrValues[0].name,
            });
          }
        });

        //获取商品的活动信息，需要的入参storeId是在商品详情接口返回
        const activityRes = yield call(promByGoodsQry, {
          ...payload,
          storeId,
        });

        const { coupons } = activityRes;
        yield put({
          type: 'save',
          payload: {
            goodsName,
            saleCount,
            goodsInfoAppText,
            lowestPrice,
            highestPrice,
            buyHighNum,
            collectCount,
            goodsPictureList: goodsInfoDetailPictureList,
            saleList: saleAttrs,
            storeId,
            goodsDesc,
            orderAttrs,
            attrQueryCOList: tempList,
            coupons,
          },
        });
      }
      return tempAttrList;
    },
    *addToCart({ payload }, { call, put }) {
      const data = yield call(addToCart, payload);
      if (data && data.success) {
        return true;
      }
      return false;
    },
    *queryDetailByAttr({ payload }, { call, put }) {
      const res = yield call(queryDetailByAttr, payload);
      if (res) {
        return res;
      }
    },
    *querySellerCommentsPage({ payload }, { call, put }) {
      const data = yield call(querySellerCommentsPage, {
        pageNum: 1,
        pageSize: 2,
        labelId: '',
        goodId: payload.goodId,
      });
      const { records = [], total = 0 } = data;
      yield put({
        type: 'save',
        payload: {
          commentData: records,
          commentTotal: total,
        },
      });
    },
    *queryEvaluationLabel({ payload }, { call, put }) {
      const data = yield call(queryEvaluationLabel, {
        goodId: payload.goodId,
      });
      yield put({
        type: 'save',
        payload: { labelData: data },
      });
    },
    *getVisitorId({ payload }, { call, put }) {
      const respData = yield call(getVisitorId, {});
      return respData;
    },
    *queryPhoneNumInfo({ payload }, { call, put }) {
      const respData = yield call(queryPhoneNumInfo, payload);
      return respData || [];
    },
    *queryPhoneNumInfoForBilibili({ payload }, { call, put }) {
      const respData = yield call(queryPhoneNumInfoForBilibili, payload);
      const { data = [], errMessage = '' } = respData;
      if (errMessage) {
        Toast.show(errMessage, 1);
      }
      return data || [];
    },

    *queryAreaFatherList({ payload }, { call, put }) {
      const respData = yield call(queryAreaFatherList, payload);
      return respData || [];
    },
    *queryAreaNextLevel({ parentId }, { call, put }) {
      const respData = yield call(queryAreaNextLevel, parentId);
      return respData || [];
    },
    *getMemberCartNum({ payload }, { call, put }) {
      const respData = yield call(getMemberCartNum, payload);
      const { data } = respData;
      const cartNums = data === 0 ? data : respData;
      yield put({
        type: 'save',
        payload: {
          cartNum: cartNums,
        },
      });
    },
    *commitCart({ payload }, { call, put }) {
      const respData = yield call(commitCart, payload);
    },
    *phoneNumOccup({ payload }, { call, put }) {
      const respData = yield call(phoneNumOccup, payload);
      return respData;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/shopProcess/goodsDetail') {
          const url = window.location.href;
          const goodsId = url.split('=')[1];
          dispatch!({
            type: 'goodsDetail/queryGoodsDetailByIds',
            payload: {
              goodsId: parseInt(goodsId),
            },
          });
          // dispatch!({
          //   type: 'goodsDetail/queryEvaluationLabel',
          //   payload: {
          //     goodId: goodsId,
          //   },
          // });
          // dispatch!({
          //   type: 'goodsDetail/querySellerCommentsPage',
          //   payload: {
          //     goodId: goodsId,
          //   },
          // });
          // if (!(window as any).isLogin) {
          //   dispatch!({
          //     type: 'goodsDetail/getVisitorId',
          //     payload: {},
          //   }).then((visitId) => {
          //     (window as any).memberId = visitId;
          //   });
          // }

          // if ((window as any).isLogin) {
          //   dispatch!({
          //     type: 'goodsDetail/getMemberCartNum',
          //     payload: {
          //       memberId: (window as any).memberId,
          //     },
          //   });
          //   // 设置配送地址
          //   const { memberReceiveAddrCO = {}, memberId } =
          //     Utils.getStorageForJson('userInfo') || {};
          //   const { province = '', city = '', region = '', street = '', detailAddress = '' } =
          //     memberReceiveAddrCO || {};
          //   const addr = `${province}${city}${region}${street}${detailAddress}`;
          //   dispatch!({
          //     type: 'goodsDetail/save',
          //     payload: {
          //       defaultAddr: addr,
          //     },
          //   });

          //   if (memberId !== '') {
          //     dispatch!({
          //       type: 'deliveryAddr/queryAddress',
          //       payload: {
          //         memberId,
          //       },
          //     });
          //   }
          //   return () => {
          //     dispatch!({
          //       type: 'deliveryAddr/save',
          //       payload: {
          //         addressLists: [],
          //       },
          //     });
          //   };
          // }
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

export default GoodsDetailModel;
