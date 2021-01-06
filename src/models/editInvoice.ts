import { Reducer } from 'redux';
import { addMemberInvoice, addInvoice } from '@/services/invoiceApi';
import { Effect, router } from 'alita';
import { Toast } from 'antd-mobile';

export interface EditInvoiceModelState {
  name: string;
}

export interface EditInvoiceModelType {
  namespace: 'editInvoice';
  state: EditInvoiceModelState;
  effects: {
    addMemberInvoiceTemplate: Effect; // 新增发票模版信息
    addInvoice: Effect; // 发票开票
  };
  reducers: {
    save: Reducer<EditInvoiceModelState>;
  };
}

const EditInvoiceModel: EditInvoiceModelType = {
  namespace: 'editInvoice',

  state: {
    name: '',
  },

  effects: {
    *addMemberInvoiceTemplate({ payload = {} }, { call, put }) {
      try {
        const { params = {}, orderId = '' } = payload;
        const data = yield call(addMemberInvoice, params);
        if (data) {
          const { invoiceTemplateId = '' } = data;
          yield put({
            type: 'addInvoice',
            payload: {
              invoiceTemplateId,
              orderId,
              invoiceContent: '1000',
            },
          });
        }
      } catch (e) {}
    },
    *addInvoice({ payload = {} }, { call }) {
      try {
        const data = yield call(addInvoice, payload);
        if (data) {
          Toast.success('提交成功', 1);
          setTimeout(() => {
            router.go(-2);
          }, 1000);
        }
      } catch (e) {}
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

export default EditInvoiceModel;
