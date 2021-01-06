import { Reducer } from 'redux';
import { selAddress, commitOrder } from '@/services/tradingCenter';
import { Effect } from 'alita';

export interface FillOrderModelState {
  commitData: any;
  addressInfo: any; // 地址信息
}

export interface FillOrderModelType {
  namespace: 'fillOrder';
  state: FillOrderModelState;
  effects: {
    selAddress: Effect; // 选址
    commitOrder: Effect; // 提交订单
    saveCommitData: Effect; // 保存要结算的数据
  };
  reducers: {
    save: Reducer<FillOrderModelState>;
  };
}

const FillOrderModel: FillOrderModelType = {
  namespace: 'fillOrder',

  state: {
    commitData: {},
    addressInfo: {},
  },

  effects: {
    *selAddress({ payload }, { call, put }) {
      const data = yield call(selAddress, payload);
      console.log(data);
    },
    *saveCommitData({ payload }, { call, put }) {
      const { commitData } = payload;
      yield put({
        type: 'save',
        payload: {
          commitData,
        },
      });
    },
    *commitOrder({ payload }, { call, put }) {
      const data = yield call(commitOrder, payload);
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

export default FillOrderModel;
