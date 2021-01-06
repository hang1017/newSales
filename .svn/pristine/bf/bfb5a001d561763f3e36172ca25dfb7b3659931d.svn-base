import { Reducer } from 'redux';
import { Effect } from '@/models/connect';

export interface BiliPayResultModelState {
  name: string;
}

export interface BiliPayResultModelType {
  namespace: 'biliPayResult';
  state: BiliPayResultModelState;
  effects: {};
  reducers: {
    save: Reducer<BiliPayResultModelState>;
  };
}

const BiliPayResultModel: BiliPayResultModelType = {
  namespace: 'biliPayResult',

  state: {
    name: '',
  },

  effects: {},
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default BiliPayResultModel;
