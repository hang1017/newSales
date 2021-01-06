import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from 'alita';
import Utils from '@/utils/tool';
// import { queryGoodsDetailByIds } from '@/services/goodsCenter';
import { qryOrderSnapshot } from '@/services/orderApi';

export interface SnapShotModelState {
  goodsPictureList: any;
  goodsInfoAppText: string;
  saleAttrList: any;
  goodsName: string;
  goodsDesc: string;
  lowestPrice: number;
  highestPrice: number;
  price: string;
  promotions: any;
}

export interface SnapShotModelType {
  namespace: 'snapShot';
  state: SnapShotModelState;
  effects: {
    qryOrderSnapshot: Effect;
  };
  reducers: {
    save: Reducer<SnapShotModelState>;
  };
}

const SnapShotModelModel: SnapShotModelType = {
  namespace: 'snapShot',

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
  },

  effects: {
    *qryOrderSnapshot({ payload }, { call, put }) {
      // const goodsId = Utils.getQueryString('goodsId');
      const data = yield call(qryOrderSnapshot, payload);
      if (data) {
        const {
          goodsInfoAppText = '',
          saleAttrList = [],
          goodsDesc = [],
          highestPrice,
          lowestPrice,
          goodsName,
          goodsInfoDetailPictureList = [],
          promInfo = {},
          realAmount = '--',
          // storeId,
        } = data;
        // let realPrice = '--';
        // if (highestPrice === lowestPrice) {
        //   realPrice = highestPrice;
        // } else {
        //   realPrice = lowestPrice + '元' + '-' + highestPrice;
        // }
        yield put({
          type: 'save',
          payload: {
            promotions: promInfo.promotions || [],
            goodsInfoAppText,
            saleAttrList,
            goodsDesc,
            price: realAmount,
            goodsName,
            goodsPictureList: goodsInfoDetailPictureList,
          },
        });
      }

      // const activityRes = yield call(promByGoodsQry, {
      //   goodsId,
      //   storeId,
      // });
      // const { promotions = [] } = activityRes;
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

export default SnapShotModelModel;
