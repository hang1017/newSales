import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface AuthResultModelState {
  name: string;
}

export interface AuthResultModelType {
  namespace: 'authResult';
  state: AuthResultModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<AuthResultModelState>;
  };
}

const AuthResultModel: AuthResultModelType = {
  namespace: 'authResult',

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

export default AuthResultModel;
