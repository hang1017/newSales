import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface MineeQuitiesModelState {
  name: string;
}

export interface MineeQuitiesModelType {
  namespace: 'mineeQuities';
  state: MineeQuitiesModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<MineeQuitiesModelState>;
  };
}

const MineeQuitiesModel: MineeQuitiesModelType = {
  namespace: 'mineeQuities',

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

export default MineeQuitiesModel;
