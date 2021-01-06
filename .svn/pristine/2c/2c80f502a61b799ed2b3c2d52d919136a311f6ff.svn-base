import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface OnlineCarModelState {
  name: string;
}

export interface OnlineCarModelType {
  namespace: 'onlineCar';
  state: OnlineCarModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<OnlineCarModelState>;
  };
}

const OnlineCarModel: OnlineCarModelType = {
  namespace: 'onlineCar',

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

export default OnlineCarModel;
