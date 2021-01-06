import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface WaitPageModelState {
  name: string;
}

export interface WaitPageModelType {
  namespace: 'waitPage';
  state: WaitPageModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<WaitPageModelState>;
  };
}

const WaitPageModel: WaitPageModelType = {
  namespace: 'waitPage',

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

export default WaitPageModel;
