import { Reducer } from 'redux';
import { quryApplyDetail } from '@/services/orderApplyCenter';
import { Effect } from 'alita';

export interface ApplyDetailModelState {
  info: any;
}

export interface ApplyDetailModelType {
  namespace: 'applyDetail';
  state: ApplyDetailModelState;
  effects: {
    quryApplyDetail: Effect;
  };
  reducers: {
    save: Reducer<ApplyDetailModelState>;
  };
}

const ApplyDetailModel: ApplyDetailModelType = {
  namespace: 'applyDetail',

  state: {
    info: {},
  },

  effects: {
    *quryApplyDetail({ payload }, { call, put }) {
      const data = yield call(quryApplyDetail, payload);
      yield put({
        type: 'save',
        payload: { info: data },
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

export default ApplyDetailModel;
