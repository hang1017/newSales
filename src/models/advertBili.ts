import { Reducer } from 'redux';
import { query } from '@/services/api';
import { dmosbrowse } from '@/services/memberApi';
import { Effect } from '@/models/connect';

export interface AdvertBiliModelState {
  name: string;
}

export interface AdvertBiliModelType {
  namespace: 'advertBili';
  state: AdvertBiliModelState;
  effects: {
    getDcParamVal: Effect;
  };
  reducers: {
    save: Reducer<AdvertBiliModelState>;
  };
}

const AdvertBiliModel: AdvertBiliModelType = {
  namespace: 'advertBili',

  state: {
    name: '',
  },

  effects: {
    *getDcParamVal() {},
    *dmosbrowse({ payload }, { call, put }) {
      const data = yield call(dmosbrowse, payload);
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

export default AdvertBiliModel;
