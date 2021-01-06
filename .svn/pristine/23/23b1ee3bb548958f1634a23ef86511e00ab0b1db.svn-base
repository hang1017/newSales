import { Reducer } from 'redux';
import { addEmergencyOrder } from '@/services/basicApi';
import { Effect } from 'alita';
import { Toast } from 'antd-mobile';

export interface EmergencyModelState {
  name: string;
}

export interface EmergencyModelType {
  namespace: 'emergency';
  state: EmergencyModelState;
  effects: {
    addEmergencyOrder: Effect;
  };
  reducers: {
    save: Reducer<EmergencyModelState>;
  };
}

const EmergencyModel: EmergencyModelType = {
  namespace: 'emergency',

  state: {
    name: '',
  },

  effects: {
    *addEmergencyOrder({ payload }, { call, put }) {
      const data = yield call(addEmergencyOrder, payload);
      Toast.success('留单成功', 2);
      // console.log(data)

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

export default EmergencyModel;
