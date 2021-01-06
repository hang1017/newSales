import { Reducer } from 'redux';
import { cancelOrderById } from '@/services/orderApi';
import { Effect } from 'alita';

export interface OrderListModelState {
  name: string;
}

export interface OrderListModelType {
  namespace: 'orderList';
  state: OrderListModelState;
  effects: {
    cancelOrderById: Effect;
  };
  reducers: {
    save: Reducer<OrderListModelState>;
  };
}

const OrderListModel: OrderListModelType = {
  namespace: 'orderList',

  state: {
    name: '',
  },

  effects: {
    *cancelOrderById({ payload }, { call, put }) {
      const data = yield call(cancelOrderById, payload);
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

export default OrderListModel;
