import { Reducer } from 'redux';
import { qryGoodsSpecialRuls } from '@/services/goodsCenter';

import { numberList, make, contractList, cancelContract } from '@/services/memberApi';

import { Effect } from 'alita';

export interface MyServicesModelState {
  serviceList: any[];
  numberList: any[];
  phoneList: any[];
}

export interface MyServicesModelType {
  namespace: 'myServices';
  state: MyServicesModelState;
  effects: {
    qryGoodsSpecialRuls: Effect;
    numberList: Effect;
    contractList: Effect;
    make: Effect;
    cancelContract: Effect;
  };
  reducers: {
    save: Reducer<MyServicesModelState>;
  };
}

const MyServicesModel: MyServicesModelType = {
  namespace: 'myServices',

  state: {
    serviceList: [],
    numberList: [],
    phoneList: [],
  },

  effects: {
    *qryGoodsSpecialRuls({ payload }, { call, put }) {
      const data = yield call(qryGoodsSpecialRuls, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: { serviceList: data },
        });
        return data;
      }
      return [];
    },
    *numberList({ payload }, { call, put }) {
      const data = yield call(numberList, payload);
      let tempNumberList = [];
      const phoneList: any[] = [];
      if (data && data.length) {
        tempNumberList = data;
        data.map((item, index) => {
          phoneList.push({
            label: item.accNbr,
            value: index,
          });
        });
      }
      yield put({
        type: 'save',
        payload: {
          numberList: tempNumberList,
          phoneList,
        },
      });
      return phoneList;
    },
    *make({ payload }, { call, put }) {
      const data = yield call(make, payload);
      if (data) {
        return data;
      }
      return '';
    },
    *contractList({ payload }, { call, put }) {
      const res = yield call(contractList, payload);
      let serviceList = [];
      if (res && res.success) {
        serviceList = res.data;
      }

      yield put({
        type: 'save',
        payload: { serviceList },
      });
    },
    *cancelContract({ payload }, { call, put }) {
      const res = yield call(cancelContract, payload);
      return res;
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

export default MyServicesModel;
