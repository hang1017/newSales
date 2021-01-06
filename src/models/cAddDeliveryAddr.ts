import { Reducer } from 'redux';
import { addAddress, updateAddress, deleteAddress } from '@/services/memberApi';
import {
  queryAreaFatherList,
  queryAreaNextLevel,
  queryAreaByLimitCond,
} from '@/services/foundationCenterApi';
import { getAddrListData } from '@/utils/bizCommon';
import { Effect, history } from 'alita';

export interface CAddDeliveryAddrModelState {
  isAddAddress: boolean; // 区分是新增地址还是修改地址
  addressInfo: any; // 原地址信息
  canChangeDefault: boolean; // 用于判断默认地址是否可以修改
  homeAddrData: any; // 区域数据
}

export interface CAddDeliveryAddrModelType {
  namespace: 'cAddDeliveryAddr';
  state: CAddDeliveryAddrModelState;
  effects: {
    addAddress: Effect;
    updateAddress: Effect;
    deleteAddress: Effect;
    queryAreaFatherList: Effect;
    queryAreaNextLevel: Effect;
    queryAreaByLimitCond: Effect;
  };
  reducers: {
    save: Reducer<CAddDeliveryAddrModelState>;
  };
}

const CAddDeliveryAddrModel: CAddDeliveryAddrModelType = {
  namespace: 'cAddDeliveryAddr',

  state: {
    isAddAddress: true,
    addressInfo: {},
    canChangeDefault: true,
    homeAddrData: [],
  },

  effects: {
    *addAddress({ payload }, { call, put }) {
      const data = yield call(addAddress, payload);
      yield put({
        type: 'deliveryAddr/queryAddress',
        payload: {},
      });
      history.goBack();
    },
    *updateAddress({ payload }, { call, put }) {
      const data = yield call(updateAddress, payload);
      yield put({
        type: 'deliveryAddr/queryAddress',
        payload: {},
      });
      history.goBack();
    },
    *deleteAddress({ payload }, { call, put }) {
      const data = yield call(deleteAddress, {
        receiveAddrId: payload.receiveAddrId || '',
      });
      console.log(data);
      yield put({
        type: 'deliveryAddr/queryAddress',
        payload: {},
      });
      history.goBack();
    },
    *queryAreaFatherList({ payload = {} }, { call, put }) {
      const data = yield call(queryAreaFatherList, payload);
      if (data) {
        const newData = getAddrListData(data);
        yield put({
          type: 'save',
          payload: { homeAddrData: newData },
        });
        if (payload.callback) {
          payload.callback(newData);
        }
      }
    },
    *queryAreaByLimitCond({ payload = {} }, { call, put }) {
      const data = yield call(queryAreaByLimitCond, payload);
      if (data) {
        const newData = getAddrListData(data);
        yield put({
          type: 'save',
          payload: { homeAddrData: newData },
        });
        if (payload.callback) {
          payload.callback(newData);
        }
      }
    },
    *queryAreaNextLevel({ payload }, { call, put }) {
      const { parentId, callback } = payload;
      const data = yield call(queryAreaNextLevel, parentId);
      let newData = [];
      if (data) {
        newData = getAddrListData(data);
        if (callback) {
          callback(newData);
        }
      }
      yield put({
        type: 'save',
        payload: { homeAddrData: newData },
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

export default CAddDeliveryAddrModel;
