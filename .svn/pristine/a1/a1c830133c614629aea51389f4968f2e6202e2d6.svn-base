import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface AuthenticationInfoModelState {
  name: string;
}

export interface AuthenticationInfoModelType {
  namespace: 'authenticationInfo';
  state: AuthenticationInfoModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<AuthenticationInfoModelState>;
  };
}

const AuthenticationInfoModel: AuthenticationInfoModelType = {
  namespace: 'authenticationInfo',

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

export default AuthenticationInfoModel;
