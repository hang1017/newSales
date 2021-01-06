import { Reducer } from 'redux';
import { queryAddress } from '@/services/memberApi';
import { Effect } from 'alita';

export interface CDeliveryAddrModelState {
  addressLists: any;
}

export interface CDeliveryAddrModelType {
  namespace: 'cDeliveryAddr';
  state: CDeliveryAddrModelState;
  effects: {
    queryAddress: Effect;
  };
  reducers: {
    save: Reducer<CDeliveryAddrModelState>;
  };
}

const CDeliveryAddrModel: CDeliveryAddrModelType = {
  namespace: 'cDeliveryAddr',

  state: {
    addressLists: [],
  },

  effects: {
    *queryAddress({ payload }, { call, put }) {
      const memberInfo = JSON.parse(localStorage.getItem('memberInfo'));
      const memberId = memberInfo ? memberInfo.memberId : '';
      const data = yield call(queryAddress, { memberId });
      data.map((item, index) => {
        if (item.defaultAddr === '1000') {
          // 默认地址
          data.unshift(item);
          data.splice(index + 1, 1);
        }
      });
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

export default CDeliveryAddrModel;
