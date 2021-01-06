import { Reducer } from 'redux';
import { updateMember, logout } from '@/services/memberApi';
import { Effect } from 'alita';

export interface EditPersonalInfoModelState {
  name: string;
}

export interface EditPersonalInfoModelType {
  namespace: 'editPersonalInfo';
  state: EditPersonalInfoModelState;
  effects: {
    updateMember: Effect;
    logout: Effect;
  };
  reducers: {
    save: Reducer<EditPersonalInfoModelState>;
  };
}

const EditPersonalInfoModel: EditPersonalInfoModelType = {
  namespace: 'editPersonalInfo',

  state: {
    name: '',
  },

  effects: {
    *updateMember({ payload }, { call, put }) {
      const data = yield call(updateMember, payload);
      return data;
    },
    *logout({ payload }, { call, put }) {
      const data = yield call(logout, payload);
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

export default EditPersonalInfoModel;
