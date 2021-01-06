import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface PayResultModelState {
  name: string;
}

export interface PayResultModelType {
  namespace: 'payResult';
  state: PayResultModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<PayResultModelState>;
  };
}

const PayResultModel: PayResultModelType = {
  namespace: 'payResult',

  state: {
    name: '',
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

export default PayResultModel;
