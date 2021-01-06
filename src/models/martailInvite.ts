import { Reducer } from 'redux';
import { circleDecode, circleJion } from '@/services/sect';
import { Effect } from 'alita';

export interface MartailInviteModelState {
  sectInfo: any;
}

export interface MartailInviteModelType {
  namespace: 'martailInvite';
  state: MartailInviteModelState;
  effects: {
    circleDecode: Effect;
    circleJion: Effect;
  };
  reducers: {
    save: Reducer<MartailInviteModelState>;
  };
}

const MartailInviteModel: MartailInviteModelType = {
  namespace: 'martailInvite',

  state: {
    sectInfo: {},
  },
  effects: {
    *circleDecode({ payload }, { call, put }) {
      const res = yield call(circleDecode, payload);
      const { success, data } = res;
      if (success) {
        yield put({
          type: 'save',
          payload: { sectInfo: data },
        });
      }

      // console.log(data)



      return data ? data.expDate : '2020-12-31 23:59:59';
    },
    *circleJion({ payload }, { call, put, select }) {

      const data = yield call(circleJion, payload);
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

export default MartailInviteModel;
