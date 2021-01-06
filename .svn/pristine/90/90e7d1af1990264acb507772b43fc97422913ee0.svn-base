import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface ConsumerRightsModelState {
  name: string;
}

export interface ConsumerRightsModelType {
  namespace: 'consumerRights';
  state: ConsumerRightsModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<ConsumerRightsModelState>;
  };
}

const ConsumerRightsModel: ConsumerRightsModelType = {
  namespace: 'consumerRights',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      // const data = yield call(query, payload);
      // console.log(data)
      // yield put({
      //   type: 'save',
      //   payload: { name: data.text },
      // });
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

export default ConsumerRightsModel;
