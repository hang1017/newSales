import { Reducer } from 'redux';
import { queryAddress } from '@/services/memberApi';
import { Effect } from 'alita';

export interface DeliveryAddrModelState {
  addressLists: any;
}

export interface DeliveryAddrModelType {
  namespace: 'deliveryAddr';
  state: DeliveryAddrModelState;
  effects: {
    queryAddress: Effect;
  };
  reducers: {
    save: Reducer<DeliveryAddrModelState>;
  };
}

const DeliveryAddrModel: DeliveryAddrModelType = {
  namespace: 'deliveryAddr',

  state: {
    addressLists: [],
  },

  effects: {
    *queryAddress({ payload }, { call, put }) {
      const data = yield call(queryAddress, payload);
      console.log(data);
      yield put({
        type: 'save',
        payload: { addressLists: data },
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

export default DeliveryAddrModel;
