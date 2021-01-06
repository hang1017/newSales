import { Reducer } from 'redux';
import { sectMemberList, circleList } from '@/services/sect';
import { Effect } from 'alita';

export interface NormalSectModelState {
  sectList: any[];
  accNbre: any;
}

export interface NormalSectModelType {
  namespace: 'normalSect';
  state: NormalSectModelState;
  effects: {
    sectMemberList: Effect;
    circleList: Effect;
  };
  reducers: {
    save: Reducer<NormalSectModelState>;
  };
}

const NormalSectModel: NormalSectModelType = {
  namespace: 'normalSect',

  state: {
    sectList: [],
    accNbre: '',
  },

  effects: {
    *sectMemberList({ payload }, { call, put }) {
      const data = yield call(sectMemberList, payload);

      return data;

      // console.log(data)
      // yield put({
      //   type: 'save',
      //   payload: { name: data.text },
      // });
    },
    *circleList({ payload }, { call, put, select }) {
      const { accNbre } = yield select(_ => _.normalSect);
      const data = yield call(circleList, payload);
      yield put({
        type: 'save',
        payload:
          { sectList: data.records, accNbre },
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

export default NormalSectModel;
