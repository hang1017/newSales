import { Reducer } from 'redux';
import { selAddress } from '@/services/tradingCenter';
import { commitCartSecondService, getSystemParamsCacheByCode } from '@/services/emergencyApi';
import { Effect } from 'alita';

export interface EmerPayConfirmModelState {
  phone: string;
  iccid: string;
  orderInfo: any;
  addressInfo: any;
  invoiceContent: any;
  idCardInfo: any;
}

export interface EmerPayConfirmModelType {
  namespace: 'emerPayConfirm';
  state: EmerPayConfirmModelState;
  effects: {
    selAddress: Effect;
    commitCartSecondModels: Effect;
    queryDownLoadLink: Effect; // 获取公共资源
  };
  reducers: {
    save: Reducer<EmerPayConfirmModelState>;
  };
}

const EmerPayConfirmModel: EmerPayConfirmModelType = {
  namespace: 'emerPayConfirm',

  state: {
    phone: '',
    iccid: '',
    idCardInfo: {}, // 二次业务-身份证认证出来的数据
    orderInfo: {},
    addressInfo: {},
    invoiceContent: { personal: {}, company: {} },
  },

  effects: {
    *selAddress({ payload }, { call, put, select }) {
      const { receiveAddrId } = payload.data;
      const data = yield call(selAddress, { receiveAddrId });
      const { orderInfo } = yield select((_: any) => _.payConfirm);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            addressInfo: payload.data,
            orderInfo: {
              ...orderInfo,
              memberReceiveAddr: payload.data,
            },
          },
        });
        return true;
      }
      return false;
    },
    *commitCartSecondModels({ payload = {} }, { call, put }) {
      const source = localStorage.getItem('source');
      const sn = localStorage.getItem('sn');

      const data = yield call(commitCartSecondService, {
        ...payload,
        sn,
        source,
        sourceType: source,
      });
      return data;
    },
    *queryDownLoadLink({ payload = {} }, { call, put }) {
      const data = yield call(getSystemParamsCacheByCode, {
        ...payload,
      });
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

export default EmerPayConfirmModel;
