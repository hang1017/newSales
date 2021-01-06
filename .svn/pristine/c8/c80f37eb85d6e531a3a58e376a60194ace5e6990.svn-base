import { Reducer } from 'redux';
import { query } from '@/services/api';
import { history } from 'alita';
import { Toast } from 'antd-mobile';
import {
  exchangeCertificateOrderCommit,
  checkSkuNeedOrdAddrService,
} from '@/services/tradingCenter';
import { Effect } from '@/models/connect';

export interface EquityExchangeModelState {
  name: string;
  rightsInfo: any;
  exchangeInfo: any;
}

export interface EquityExchangeModelType {
  namespace: 'equityExchange';
  state: EquityExchangeModelState;
  effects: {
    query: Effect;
    exchangeCertificateOrderCommit: Effect;
    checkSkuNeedOrdAddrModel: Effect; // 权益兑换查询是否需要地址
  };
  reducers: {
    save: Reducer<EquityExchangeModelState>;
  };
}

const EquityExchangeModel: EquityExchangeModelType = {
  namespace: 'equityExchange',

  state: {
    name: '',
    rightsInfo: {},
    exchangeInfo: {},
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
    *exchangeCertificateOrderCommit({ payload }, { call, put }) {
      const data = yield call(exchangeCertificateOrderCommit, {
        ...payload,
        sourceType: 1000,
        orderType: 1600,
      });
      if (data && data?.success) {
        return true;
      }
      Toast.fail(data?.errMessage || '兑换失败', 2);
      return null;
    },
    *checkSkuNeedOrdAddrModel({ payload }, { call }) {
      const data = yield call(checkSkuNeedOrdAddrService, payload);
      if (data && data?.success) {
        return data?.data;
      }
      return false;
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

export default EquityExchangeModel;
