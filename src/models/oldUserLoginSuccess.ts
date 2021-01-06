import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Toast } from 'antd-mobile';
import { commitCartQuick, applyAttrValService } from '@/services/tradingCenter';
import { Effect } from 'alita';

export interface OldUserLoginSuccessModelState {
  name: string;
  cartOrderId: string | number;
  commonAttrData: any[];
  commonAttrValue: any;
  dynamicList: any[];
}

export interface OldUserLoginSuccessModelType {
  namespace: 'oldUserLoginSuccess';
  state: OldUserLoginSuccessModelState;
  effects: {
    query: Effect;
    commitCartQuick: Effect;
    applyAttrValModal: Effect;
  };
  reducers: {
    save: Reducer<OldUserLoginSuccessModelState>;
  };
}

const OldUserLoginSuccessModel: OldUserLoginSuccessModelType = {
  namespace: 'oldUserLoginSuccess',

  state: {
    name: '',
    cartOrderId: '',
    commonAttrData: [],
    commonAttrValue: {},
    dynamicList: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
    *commitCartQuick({ payload }, { call, put }) {
      const source = localStorage.getItem('source');
      const sn = localStorage.getItem('sn');

      const data = yield call(commitCartQuick, {
        ...payload,
        orderType: '1000',
        sn,
        source,
        sourceType: source,
      });
      if (data) {
        if (data?.cartOrderId) {
          yield put({
            type: 'save',
            payload: {
              cartOrderId: data?.cartOrderId,
            },
          });
        }
        return data;
      }
      return undefined;
    },
    *applyAttrValModal({ payload }, { call }) {
      const data = yield call(applyAttrValService, payload);
      if (data && data.success) {
        return true;
      }
      if (data?.errCode) {
        Toast.fail(data?.errCode, 1);
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

export default OldUserLoginSuccessModel;
