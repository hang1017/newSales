import { Reducer } from 'redux';
import { createMarketingCircle, editCircle } from '@/services/sect';
import { Toast, } from 'antd-mobile';
import { Effect, } from 'alita';
import Utils from '@/utils/tool';


export interface CreateSectModelState {
  accNbre: string;
  numberInstId: string;
}

export interface CreateSectModelType {
  namespace: 'createSect';
  state: CreateSectModelState;
  effects: {
    createMarketingCircle: Effect;
    editCircle: Effect;
  };
  reducers: {
    save: Reducer<CreateSectModelState>;
  };
}

const CreateSectModel: CreateSectModelType = {
  namespace: 'createSect',

  state: {
    accNbre: '',
    numberInstId: '',
  },

  effects: {
    *createMarketingCircle({ payload }, { call, put, select }) {
      const { accNbre, numberInstId } = yield select(_ => _.createSect);
      const { circleInstDesc, marketingCircleInstName, callBack, sectsImage } = payload;
      const memberInfo = Utils.getStorageForJson('memberInfo');

      const requestData = {
        accNbre,
        // numberInstId,
        marketingCircleInstName,
        circleInstDesc,
        circleId: 1000,
        circleType: '01',
        sectsImage,
        memberName: memberInfo.nickname || Utils.phoneNum(accNbre),
      };
      const data = yield call(createMarketingCircle, requestData);
      if (data.success) {
        if (callBack) {
          callBack(data.data);
        }
      }
      else {
        Toast.fail(data.errMessage);
      }
    },
    *editCircle({ payload }, { call, put, select }) {
      const data = yield call(editCircle, payload);
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

export default CreateSectModel;
