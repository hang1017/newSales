import { Reducer } from 'redux';
import { queryEvaluationLabel } from '@/services/evaluationApi';
import { Effect } from 'alita';

export interface ProductReviewModelState {
  name: string;
  labelData: any;
  goodId: string | number;
}

export interface ProductReviewModelType {
  namespace: 'productReview';
  state: ProductReviewModelState;
  effects: {
    queryEvaluationLabel: Effect;
  };
  reducers: {
    save: Reducer<ProductReviewModelState>;
  };
}

const ProductReviewModel: ProductReviewModelType = {
  namespace: 'productReview',

  state: {
    name: '',
    labelData: [],
    goodId: '',
  },

  effects: {
    *queryEvaluationLabel({ payload }, { call, put }) {
      const data = yield call(queryEvaluationLabel, payload);
      yield put({
        type: 'save',
        payload: { labelData: data },
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

export default ProductReviewModel;
