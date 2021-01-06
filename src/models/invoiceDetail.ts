import { Reducer } from 'redux';
import { queryInvoiceByOrderId } from '@/services/orderApi';
import { Effect } from 'alita';

export interface InvoiceDetailModelState {
  name: string;
}

export interface InvoiceDetailModelType {
  namespace: 'invoiceDetail';
  state: InvoiceDetailModelState;
  effects: {
    queryInvoice: Effect; // 根据orderId查询发票详情
  };
  reducers: {
    save: Reducer<InvoiceDetailModelState>;
  };
}

const InvoiceDetailModel: InvoiceDetailModelType = {
  namespace: 'invoiceDetail',

  state: {
    name: '',
  },

  effects: {
    *queryInvoice({ payload = {} }, { call, put }) {
      try {
        const data = yield call(queryInvoiceByOrderId, payload);
        return data;
      } catch (e) {
        return null;
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

export default InvoiceDetailModel;
