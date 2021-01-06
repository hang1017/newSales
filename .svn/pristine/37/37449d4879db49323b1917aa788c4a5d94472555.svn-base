import { Reducer } from 'redux';
import { queryOrderApplyPage, cancelApply, editApplyInfo } from '@/services/orderApplyCenter';
import { Effect } from 'alita';

export interface WarrantyListModelState {
  list: Array<any>;
}

export interface WarrantyListModelType {
  namespace: 'warrantyList';
  state: WarrantyListModelState;
  effects: {
    queryOrderApplyPage: Effect;
    cancelApply: Effect;
    editApplyInfo: Effect;
  };
  reducers: {
    save: Reducer<WarrantyListModelState>;
  };
}

const WarrantyListModel: WarrantyListModelType = {
  namespace: 'warrantyList',

  state: {
    list: [],
  },

  effects: {
    *cancelApply({ payload = {} }, { call, put }) {
      const data = yield call(cancelApply, payload);
      if (data && payload.callback) {
        payload.callback();
      }
    },
    *editApplyInfo({ payload }, { call, put }) {
      const data = yield call(editApplyInfo, payload);
      if (data && payload.callback) {
        payload.callback();
      }
    },

    *queryOrderApplyPage({ payload }, { call, put }) {
      const data = yield call(queryOrderApplyPage, payload);
      console.log(data);
      if (data) {
        yield put({
          type: 'save',
          payload: { list: data || [] },
        });
      }
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

export default WarrantyListModel;
