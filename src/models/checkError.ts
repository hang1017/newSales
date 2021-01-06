import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface CheckErrorModelState {
  name: string;
}

export interface CheckErrorModelType {
  namespace: 'checkError';
  state: CheckErrorModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<CheckErrorModelState>;
  };
}

const CheckErrorModel: CheckErrorModelType = {
  namespace: 'checkError',

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

export default CheckErrorModel;
