import { Reducer } from 'redux';
import { query } from '@/services/api';
import {
  queryTemplateNameByAccNumService,
  getInvoiceTemplateNameService,
} from '@/services/invoiceApi';
import { Effect } from 'alita';

export interface InvoiceModelState {
  editInfo: {};
}

export interface InvoiceModelType {
  namespace: 'invoice';
  state: InvoiceModelState;
  effects: {
    query: Effect;
    queryEditInvoiceFlag: Effect;
    getInvoiceTemplateNameModel: Effect;
  };
  reducers: {
    save: Reducer<InvoiceModelState>;
  };
}

const InvoiceModel: InvoiceModelType = {
  namespace: 'invoice',

  state: {
    editInfo: {},
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
    *queryEditInvoiceFlag({ payload }, { call, put }) {
      // const data = yield request('/api/invoiceFlag');
      const data = yield call(queryTemplateNameByAccNumService, payload);
      yield put({
        type: 'save',
        payload: {
          editInfo: data,
        },
      });
      return data;
    },
    *getInvoiceTemplateNameModel({ payload }, { call }) {
      const data = yield call(getInvoiceTemplateNameService, payload);
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

export default InvoiceModel;
