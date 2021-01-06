import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface MaintenanceRecordsModelState {
  name: string;
}

export interface MaintenanceRecordsModelType {
  namespace: 'maintenanceRecords';
  state: MaintenanceRecordsModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<MaintenanceRecordsModelState>;
  };
}

const MaintenanceRecordsModel: MaintenanceRecordsModelType = {
  namespace: 'maintenanceRecords',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data);
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

export default MaintenanceRecordsModel;
