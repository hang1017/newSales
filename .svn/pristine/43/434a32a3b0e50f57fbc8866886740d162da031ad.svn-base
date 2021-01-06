import { Reducer } from 'redux';
import { addRefundApply, addReturnApply } from '@/services/orderApplyCenter';
import { Effect } from 'alita';

export interface RefundModelState {
  name: string;
}

export interface RefundModelType {
  namespace: 'refund';
  state: RefundModelState;
  effects: {
    addRefundApply: Effect;
    addReturnApply: Effect;
  };
  reducers: {
    save: Reducer<RefundModelState>;
  };
}

const RefundModel: RefundModelType = {
  namespace: 'refund',

  state: {
    name: '',
  },

  effects: {
    *addRefundApply({ payload }, { call, put }) {
      const data = yield call(addRefundApply, payload);
      if (data && payload.callback) {
        payload.callback();
      }
    },
    *addReturnApply({ payload }, { call, put }) {
      const data = yield call(addReturnApply, payload);
      if (data && payload.callback) {
        payload.callback();
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

export default RefundModel;
