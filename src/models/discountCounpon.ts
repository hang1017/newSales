import { Reducer } from 'redux';
import { qryRightsGoods } from '@/services/promotionApi';
import { Effect } from 'alita';

export interface DiscountCounponModelState {}

export interface DiscountCounponModelType {
  namespace: 'discountCounpon';
  state: DiscountCounponModelState;
  effects: {
    qryRightsGoods: Effect;
  };
  reducers: {
    save: Reducer<DiscountCounponModelState>;
  };
}

const DiscountCounponModel: DiscountCounponModelType = {
  namespace: 'discountCounpon',

  state: {},

  effects: {
    *qryRightsGoods({ payload }, { call, put }) {
      const data = yield call(qryRightsGoods, payload);
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

export default DiscountCounponModel;
