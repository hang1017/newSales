import { Reducer } from 'redux';
import { qryMyNumberInstList, cancelRequest, delayRequest } from '@/services/memberApi';
import { Effect } from 'alita';

export interface ElectronicBusinessModelState {
  dataList: Array<any>;
}

export interface ElectronicBusinessModelType {
  namespace: 'electronicBusiness';
  state: ElectronicBusinessModelState;
  effects: {
    qryMyNumberInstList: Effect;
    cancelRequest: Effect;
    delayRequest: Effect;
  };
  reducers: {
    save: Reducer<ElectronicBusinessModelState>;
  };
}

const ElectronicBusinessModel: ElectronicBusinessModelType = {
  namespace: 'electronicBusiness',

  state: {
    dataList: [],
  },

  effects: {
    *qryMyNumberInstList({ payload }, { call, put }) {
      const data = yield call(qryMyNumberInstList, payload);
      yield put({
        type: 'save',
        payload: { dataList: data },
      });
    },
    *cancelRequest({ payload }, { call }) {
      const data = yield call(cancelRequest, payload);
      return data;
    },
    *delayRequest({ payload }, { call }) {
      const data = yield call(delayRequest, payload);
      return data;
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

export default ElectronicBusinessModel;
