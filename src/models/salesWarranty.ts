import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface SalesWarrantyModelState {
  name: string;
}

export interface SalesWarrantyModelType {
  namespace: 'salesWarranty';
  state: SalesWarrantyModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<SalesWarrantyModelState>;
  };
}

const SalesWarrantyModel: SalesWarrantyModelType = {
  namespace: 'salesWarranty',

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

export default SalesWarrantyModel;
