import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface SearchSectsModelState {
  name: string;
}

export interface SearchSectsModelType {
  namespace: 'searchSects';
  state: SearchSectsModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<SearchSectsModelState>;
  };
}

const SearchSectsModel: SearchSectsModelType = {
  namespace: 'searchSects',

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

export default SearchSectsModel;
