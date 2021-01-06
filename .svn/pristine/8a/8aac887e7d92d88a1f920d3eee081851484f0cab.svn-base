import { Reducer } from 'redux';
import { cancelApply } from '@/services/orderApplyCenter';
import { Effect } from 'alita';

export interface AfterSaleListModelState {
  name: string;
}

export interface AfterSaleListModelType {
  namespace: 'afterSaleList';
  state: AfterSaleListModelState;
  effects: {
    cancelApply: Effect;
  };
  reducers: {
    save: Reducer<AfterSaleListModelState>;
  };
}

const AfterSaleListModel: AfterSaleListModelType = {
  namespace: 'afterSaleList',

  state: {
    name: '',
  },

  effects: {
    *cancelApply({ payload }, { call, put }) {
      const data = yield call(cancelApply, payload);
      return data;
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

export default AfterSaleListModel;
