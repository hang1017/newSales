import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from 'alita';

export interface SectSettingModelState {
  sectInfo: any;
}

export interface SectSettingModelType {
  namespace: 'sectSetting';
  state: SectSettingModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<SectSettingModelState>;
  };
}

const SectSettingModel: SectSettingModelType = {
  namespace: 'sectSetting',

  state: {
    sectInfo: {},
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

export default SectSettingModel;
