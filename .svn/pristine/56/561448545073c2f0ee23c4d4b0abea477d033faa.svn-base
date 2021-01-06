import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from 'alita';
import Utils from '@/utils/tool';
import { queryGoodsDetailByIds } from '@/services/goodsCenter';
import { promByGoodsQry } from '@/services/promotionApi';

export interface CGoodsDetailsModelState {
  goodsPictureList: any;
  goodsInfoAppText: string;
  saleAttrList: any;
  goodsName: string;
  goodsDesc: string;
  lowestPrice: number;
  highestPrice: number;
  price: string;
  promotions: any;
  storeId: number;
}

export interface CGoodsDetailsModelType {
  namespace: 'cGoodsDetails';
  state: CGoodsDetailsModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<CGoodsDetailsModelState>;
  };
}

const CGoodsDetailsModel: CGoodsDetailsModelType = {
  namespace: 'cGoodsDetails',

  state: {
    goodsPictureList: [],
    goodsInfoAppText: '',
    saleAttrList: [],
    goodsName: '',
    goodsDesc: '',
    highestPrice: 0,
    lowestPrice: 0,
    price: '--',
    promotions: [],
    storeId: 0,
  },

  effects: {
    *query({ payload }, { call, put }) {
      const goodsId = Utils.getQueryString('goodsId');
      const data = yield call(queryGoodsDetailByIds, { goodsId });
      const {
        goodsInfoAppText = '',
        saleAttrList = [],
        goodsDesc = [],
        highestPrice,
        lowestPrice,
        goodsName,
        goodsInfoDetailPictureList = [],
        storeId,
      } = data;
      let realPrice = '--';
      if (highestPrice === lowestPrice) {
        realPrice = highestPrice;
      } else {
        realPrice = lowestPrice + '元' + '-' + highestPrice + '元';
      }

      const activityRes = yield call(promByGoodsQry, {
        goodsId,
        storeId,
      });
      const { promotions = [] } = activityRes;
      yield put({
        type: 'save',
        payload: {
          promotions,
          goodsInfoAppText,
          saleAttrList,
          goodsDesc,
          price: realPrice,
          goodsName,
          goodsPictureList: goodsInfoDetailPictureList,
          storeId,
        },
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

export default CGoodsDetailsModel;
