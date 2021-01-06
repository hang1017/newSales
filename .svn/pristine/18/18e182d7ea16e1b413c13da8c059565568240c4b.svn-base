import { Reducer } from 'redux';
import { quryApplyDetail, queryApplyHistoryByApplyId } from '@/services/orderApplyCenter';
import { Effect } from 'alita';

export interface RefundResultModelState {
  myRefundInfo: any;
  orderRefundCO: any;
}

export interface RefundResultModelType {
  namespace: 'refundResult';
  state: RefundResultModelState;
  effects: {
    quryApplyDetail: Effect;
    queryApplyHistoryByApplyId: Effect;
  };
  reducers: {
    save: Reducer<RefundResultModelState>;
  };
}

const RefundResultModel: RefundResultModelType = {
  namespace: 'refundResult',

  state: {
    myRefundInfo: {},
    orderRefundCO: {},
  },

  effects: {
    *quryApplyDetail({ payload }, { call, put }) {
      const data = yield call(quryApplyDetail, payload);
      // console.log(data)
      yield put({
        type: 'save',
        payload: {
          myRefundInfo: data,
          orderRefundCO: {
            ...data.orderRefundCOList[0],
            orderId: data.orderId,
            orderNbr: data.orderNbr,
            applyStatus: data.applyStatus

          }
        },
      });
    },
    *queryApplyHistoryByApplyId({ payload }, { call, put }) {
      const data = yield call(queryApplyHistoryByApplyId, payload);
      console.log(data)
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

export default RefundResultModel;
