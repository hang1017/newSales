import { Reducer } from 'redux';
import { addSendMsgCode, resetPhoneForSelf } from '@/services/myApi';
import { Effect } from '@/models/connect';
import { Toast } from 'antd-mobile';

export interface EditUserPhoneModelState {
  name: string;
}

export interface EditUserPhoneModelType {
  namespace: 'editUserPhone';
  state: EditUserPhoneModelState;
  effects: {
    addSendMsgCode: Effect;
    resetPhoneForSelf: Effect;
  };
  reducers: {
    save: Reducer<EditUserPhoneModelState>;
  };
}

const EditUserPhoneModel: EditUserPhoneModelType = {
  namespace: 'editUserPhone',

  state: {
    name: '',
  },

  effects: {
    *addSendMsgCode({ payload }, { call, put }) {
      const data = yield call(addSendMsgCode, payload);
      console.log(data);
      if (!data?.success) {
        Toast.fail(data?.errMessage, 1);
        payload.callback(false);
      } else {
        payload.callback(true);
      }
    },
    *resetPhoneForSelf({ payload }, { call, put }) {
      const data = yield call(resetPhoneForSelf, payload);
      const { success } = data;
      if (!success) {
        Toast.fail(data?.errMessage, 1);
      }
      return success;
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

export default EditUserPhoneModel;
