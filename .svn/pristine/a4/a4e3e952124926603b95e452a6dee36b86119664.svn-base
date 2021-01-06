import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface DefaultPageModelState {
  name: string;
}

export interface DefaultPageModelType {
  namespace: 'defaultPage';
  state: DefaultPageModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<DefaultPageModelState>;
  };
}

const DefaultPageModel: DefaultPageModelType = {
  namespace: 'defaultPage',

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

export default DefaultPageModel;
