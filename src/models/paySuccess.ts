import { Reducer } from 'redux';
import { qryGoodsSpecialRuls } from '@/services/goodsCenter';
import { tmscalFee } from '@/services/tradingCenter';
import {
  payStatus,
  queryNoSignPhoneNum,
  quryOrderBaseInfoByOrderIdService,
} from '@/services/orderApi';
import { Effect } from 'alita';

export interface PaySuccessModelState {
  serviceList: any[];
  siginNum: string;
  signNumber: [];
}

export interface PaySuccessModelType {
  namespace: 'paySuccess';
  state: PaySuccessModelState;
  effects: {
    qryGoodsSpecialRuls: Effect;
    tmscalFee: Effect;
    payStatus: Effect;
    queryNoSignPhoneNum: Effect;
    quryOrderBaseInfoByOrderIdModal: Effect; // 通过订单id 查询订单详情，支付成功回调的查询
  };
  reducers: {
    save: Reducer<PaySuccessModelState>;
  };
}

const PaySuccessModel: PaySuccessModelType = {
  namespace: 'paySuccess',

  state: {
    serviceList: [],
    siginNum: '', // 可签约号码列表
    signNumber: [],
  },

  effects: {
    *qryGoodsSpecialRuls({ payload }, { call, put }) {
      // const data = yield call(qryGoodsSpecialRuls, payload);
      // if (data) {
      //   yield put({
      //     type: 'save',
      //     payload: { serviceList: data },
      //   });
      // }
    },
    *tmscalFee({ payload }, { call, put }) {
      const data = yield call(tmscalFee, payload);
      if (data) {
        return data;
      }
      return '';
    },
    *payStatus({ payload }, { call, put }) {
      const data = yield call(payStatus, payload);
    },
    *queryNoSignPhoneNum({ payload }, { call, put }) {
      const data = yield call(queryNoSignPhoneNum, payload);
      let serviceList = [];
      if (data && data.length) {
        serviceList = yield call(qryGoodsSpecialRuls, {
          stype: '1000',
          storeId: -1,
          accNbr: data[0].memberAcct,
          contractStatus: ['9999'],
        });
      }
      yield put({
        type: 'save',
        payload: {
          signNumber: data,
          serviceList,
        },
      });
    },
    *quryOrderBaseInfoByOrderIdModal({ payload }, { call }) {
      const res = yield call(quryOrderBaseInfoByOrderIdService, payload);
      return res;
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

export default PaySuccessModel;
