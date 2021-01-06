import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from 'alita';

export interface BeEvaluatedPagesModelState {
  name: string;
}

export interface BeEvaluatedPagesModelType {
  namespace: 'beEvaluatedPages';
  state: BeEvaluatedPagesModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<BeEvaluatedPagesModelState>;
  };
}

const BeEvaluatedPagesModel: BeEvaluatedPagesModelType = {
  namespace: 'beEvaluatedPages',

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

export default BeEvaluatedPagesModel;
