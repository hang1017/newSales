import { Reducer } from 'redux';
import { query } from '@/services/memberApi';
import { Effect } from '@/models/connect';

export interface CommonSuccessPageModelState {
  name: string;
  pageType: string; //区别跳转的页面
}

export interface CommonSuccessPageModelType {
  namespace: 'commonSuccessPage';
  state: CommonSuccessPageModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<CommonSuccessPageModelState>;
  };
}

const CommonSuccessPageModel: CommonSuccessPageModelType = {
  namespace: 'commonSuccessPage',

  state: {
    name: '',
    pageType: '',
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

export default CommonSuccessPageModel;
