import { Reducer } from 'redux';
import { receiveOrderPayResultNotify } from '@/services/orderApi';
import { Effect, router } from 'alita';

export interface PaymentViewModelState {
  name: string;
}

export interface PaymentViewModelType {
  namespace: 'paymentView';
  state: PaymentViewModelState;
  effects: {
    receiveOrderPayResultNotify: Effect;
  };
  reducers: {
    save: Reducer<PaymentViewModelState>;
  };
}

const PaymentViewModel: PaymentViewModelType = {
  namespace: 'paymentView',

  state: {
    name: '',
  },

  effects: {
    *receiveOrderPayResultNotify({ payload }, { call, put }) {
      const data = yield call(receiveOrderPayResultNotify, payload);
      if (data) {
        router.push({
          pathname: '/bili/biliPayResult',
          query: {
            payAmount: payload.totalFee / 100,
          },
        });
      }
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

export default PaymentViewModel;
