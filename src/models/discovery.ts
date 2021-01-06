import { Reducer } from 'redux';
import { query } from '@/services/memberApi';
import { Effect } from '@/models/connect';

export interface DiscoveryModelState {
  name: string;
}

export interface DiscoveryModelType {
  namespace: 'discovery';
  state: DiscoveryModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<DiscoveryModelState>;
  };
}

const DiscoveryModel: DiscoveryModelType = {
  namespace: 'discovery',

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

export default DiscoveryModel;
