import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface UpgradePageModelState {
  name: string;
}

export interface UpgradePageModelType {
  namespace: 'upgradePage';
  state: UpgradePageModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<UpgradePageModelState>;
  };
}

const UpgradePageModel: UpgradePageModelType = {
  namespace: 'upgradePage',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data)
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

export default UpgradePageModel;
