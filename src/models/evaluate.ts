import { Reducer } from 'redux';
import { addEvaluation } from '@/services/evaluationApi';
import { Effect, router } from 'alita';
import formErrorToast from '@/utils/formErrorToast';
import { Toast } from 'antd-mobile';
export interface EvaluateModelState {
  orderInfo: any;
}

export interface EvaluateModelType {
  namespace: 'evaluate';
  state: EvaluateModelState;
  effects: {
    addEvaluation: Effect;
  };
  reducers: {
    save: Reducer<EvaluateModelState>;
  };
}

const EvaluateModel: EvaluateModelType = {
  namespace: 'evaluate',

  state: {
    orderInfo: {},
  },

  effects: {
    *addEvaluation({ payload }, { call, put }) {
      const data = yield call(addEvaluation, payload);
      Toast.success('评价成功');
      setTimeout(() => {
        router.goBack();
      }, 1500);

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

export default EvaluateModel;
