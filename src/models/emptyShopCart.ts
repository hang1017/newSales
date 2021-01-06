import { Reducer } from 'redux';
import { query } from '@/services/memberApi';
import { Effect } from 'alita';

export interface EmptyShopCartModelState {
  name: string;
}

export interface EmptyShopCartModelType {
  namespace: 'emptyShopCart';
  state: EmptyShopCartModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<EmptyShopCartModelState>;
  };
}

const EmptyShopCartModel: EmptyShopCartModelType = {
  namespace: 'emptyShopCart',

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

export default EmptyShopCartModel;
