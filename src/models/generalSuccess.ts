import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface GeneralSuccessModelState {
  name: string;
}

export interface GeneralSuccessModelType {
  namespace: 'generalSuccess';
  state: GeneralSuccessModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<GeneralSuccessModelState>;
  };
}

const GeneralSuccessModel: GeneralSuccessModelType = {
  namespace: 'generalSuccess',

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

export default GeneralSuccessModel;
