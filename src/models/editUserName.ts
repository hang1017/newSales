import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface EditUserNameModelState {
  name: string;
}

export interface EditUserNameModelType {
  namespace: 'editUserName';
  state: EditUserNameModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<EditUserNameModelState>;
  };
}

const EditUserNameModel: EditUserNameModelType = {
  namespace: 'editUserName',

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

export default EditUserNameModel;
