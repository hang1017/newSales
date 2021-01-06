import { Reducer } from 'redux';
import { returnApplyBuyerDeliver } from '@/services/orderApplyCenter';
import { Effect } from 'alita';

export interface UpdateApplyModelState {
  name: string;
}

export interface UpdateApplyModelType {
  namespace: 'updateApply';
  state: UpdateApplyModelState;
  effects: {
    returnApplyBuyerDeliver: Effect;
  };
  reducers: {
    save: Reducer<UpdateApplyModelState>;
  };
}

const UpdateApplyModel: UpdateApplyModelType = {
  namespace: 'updateApply',

  state: {
    name: '',
  },

  effects: {
    *returnApplyBuyerDeliver({ payload }, { call, put }) {
      const data = yield call(returnApplyBuyerDeliver, payload);
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

export default UpdateApplyModel;
