import { Reducer } from 'redux';
import { query } from '@/services/memberApi';
import { Effect } from '@/models/connect';

export interface CheckoutCounterModelState {
  name: string;
}

export interface CheckoutCounterModelType {
  namespace: 'checkoutCounter';
  state: CheckoutCounterModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<CheckoutCounterModelState>;
  };
}

const CheckoutCounterModel: CheckoutCounterModelType = {
  namespace: 'checkoutCounter',

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

export default CheckoutCounterModel;
