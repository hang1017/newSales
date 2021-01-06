import { Effect, Reducer } from 'alita';
import { cancelOrderById, buyerReceive, queryInvoiceByOrderId } from '@/services/orderApi';
import { archivesUpAndCertification } from '@/services/memberApi';
import { pushViewController } from '@/utils/NativeBridge';
export interface MyOrderModelState {
  name: string;
}

export interface MyOrderModelType {
  namespace: 'myOrder';
  state: MyOrderModelState;
  effects: {
    cancelOrderById: Effect;
    buyerReceive: Effect;
    queryInvoiceByOrderId: Effect;
    archivesUpAndCertification: Effect;
  };
  reducers: {
    save: Reducer<MyOrderModelState>;
  };
}

const MyOrderModel: MyOrderModelType = {
  namespace: 'myOrder',

  state: {
    name: '',
  },

  effects: {
    *cancelOrderById({ payload = {} }, { put, call }) {
      const data = yield call(cancelOrderById, payload);
      if (payload.callback) {
        payload.callback();
      }
    },
    *buyerReceive({ payload = {} }, { put, call }) {
      const data = yield call(buyerReceive, payload);
      if (payload.callback) {
        payload.callback();
      }
    },
    *queryInvoiceByOrderId({ payload = {} }, { put, call }) {
      const data = yield call(queryInvoiceByOrderId, payload);
      if (data) {
        pushViewController({
          className: 'CommonWebViewController',
          params: {
            url: data.pdfUrl || '',
            title: '查看电子发票',
          },
        });
      }
    },

    *archivesUpAndCertification({ payload = {} }, { put, call }) {
      const data = yield call(archivesUpAndCertification, payload);
      if (data) {
        payload.callback && payload.callback();
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

export default MyOrderModel;
