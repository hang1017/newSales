import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface ApplyAfterSaleModelState {
  name: string;
}

export interface ApplyAfterSaleModelType {
  namespace: 'applyAfterSale';
  state: ApplyAfterSaleModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<ApplyAfterSaleModelState>;
  };
}

const ApplyAfterSaleModel: ApplyAfterSaleModelType = {
  namespace: 'applyAfterSale',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data)
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

export default ApplyAfterSaleModel;
