import { Reducer } from 'redux';
import { Toast } from 'antd-mobile';
import {
  joinRaffleDrawService,
  querySkuIdAndOrderCountService,
  queryRaffleDrawResultByMemberService,
  raffleDrawTimeAndAuthorityService,
} from '@/services/gooseApi';
import { Effect } from 'alita';

export interface GooseModelState {
  name: string;
  timeMenu: any[];
}

export interface GooseModelType {
  namespace: 'goose';
  state: GooseModelState;
  effects: {
    joinRaffleDrawModel: Effect;
    queryRaffleDrawResultByMemberModel: Effect;
    raffleDrawTimeAndAuthorityModel: Effect;
    querySkuIdAndOrderCountModel: Effect;
  };
  reducers: {
    save: Reducer<GooseModelState>;
  };
}

const GooseModel: GooseModelType = {
  namespace: 'goose',

  state: {
    name: '',
    timeMenu: [],
  },

  effects: {
    *joinRaffleDrawModel({ payload }, { call }) {
      const data = yield call(joinRaffleDrawService, payload);
      if (data && data?.success) {
        return data?.data;
      }
      Toast.show(data?.errMessage || '接口出小差啦，请重试～', 1);
      return {};
    },
    *queryRaffleDrawResultByMemberModel({ payload }, { call }) {
      const data = yield call(queryRaffleDrawResultByMemberService, payload);
      if (data && data?.success) {
        return data?.data;
      }
      Toast.show('接口开小差啦～请重试', 1);
      return {};
    },
    *raffleDrawTimeAndAuthorityModel({ payload }, { call }) {
      const data = yield call(raffleDrawTimeAndAuthorityService, payload);
      if (data && data?.success) {
        return data?.data;
      }
      Toast.show('接口开小差啦～请重试', 1);
      return {};
    },
    *querySkuIdAndOrderCountModel({ payload }, { call }) {
      const data = yield call(querySkuIdAndOrderCountService, payload);
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

export default GooseModel;
