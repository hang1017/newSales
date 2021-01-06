import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface ProgressDetailsModelState {
  name: string;
}

export interface ProgressDetailsModelType {
  namespace: 'progressDetails';
  state: ProgressDetailsModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<ProgressDetailsModelState>;
  };
}

const ProgressDetailsModel: ProgressDetailsModelType = {
  namespace: 'progressDetails',

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

export default ProgressDetailsModel;
