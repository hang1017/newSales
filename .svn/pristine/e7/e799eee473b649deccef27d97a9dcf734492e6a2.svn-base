import { Reducer } from 'redux';
import { queryPhoneNumInfoForBilibiliService } from '@/services/selectNumberApi';
import { Effect } from 'alita';

export interface SelectNumberModelState {
  phoneData: any;
}

export interface SelectNumberModelType {
  namespace: 'selectNumber';
  state: SelectNumberModelState;
  effects: {
    queryPhoneNumInfoForBilibiliModal: Effect;
  };
  reducers: {
    save: Reducer<SelectNumberModelState>;
  };
}

const SelectNumberModel: SelectNumberModelType = {
  namespace: 'selectNumber',

  state: {
    phoneData: {},
  },

  effects: {
    *queryPhoneNumInfoForBilibiliModal({ payload }, { call, put }) {
      const data = yield call(queryPhoneNumInfoForBilibiliService, payload);
      console.log(data);
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

export default SelectNumberModel;
