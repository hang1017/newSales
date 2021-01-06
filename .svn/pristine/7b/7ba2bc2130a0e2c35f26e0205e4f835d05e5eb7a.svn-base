import { Reducer } from 'redux';
import {
  queryPhoneNumByMemberIdService,
  qrySkuListService,
  commitCartQuickService,
  cartOrdercommitOrderService,
} from '@/services/rechargeApi';
import { Effect } from 'alita';
import { Toast } from 'antd-mobile';

export interface RechargeModelState {
  lanId: string;
}

export interface RechargeModelType {
  namespace: 'recharge';
  state: RechargeModelState;
  effects: {
    queryPhoneNumByMemberIdModels: Effect; // 查询会员号码
    qrySkuListModels: Effect; // 查询充值列表
    commitCartQuickModels: Effect; // 立即订购（算费）-选择每一项数据时调的接口
    cartOrdercommitOrderModels: Effect; // 充值提交
  };
  reducers: {
    save: Reducer<RechargeModelState>;
  };
}

const RechargeModel: RechargeModelType = {
  namespace: 'recharge',

  state: {
    lanId: '',
  },

  effects: {
    *queryPhoneNumByMemberIdModels(_, { call }) {
      const data = yield call(queryPhoneNumByMemberIdService, {});
      return data;
    },
    *qrySkuListModels({ payload = {} }, { call, put }) {
      try {
        Toast.loading('请稍后...');
        const res = yield call(qrySkuListService, payload);
        const { success = false, data = [], errMessage = '' } = res;
        if (success) {
          Toast.hide();
          const { records = [] } = data?.skuList;
          yield put({
            type: 'save',
            payload: {
              lanId: data?.lanId,
            },
          });
          return { records: records || [], lanId: data?.lanId || '' };
        } else {
          yield put({
            type: 'save',
            payload: {
              lanId: '',
            },
          });
          Toast.hide();
          Toast.fail(errMessage, 2);
          return { records: [], lanId: '' };
        }
      } catch (e) {}
      return { records: [], lanId: '' };
    },
    *commitCartQuickModels({ payload = {} }, { call }) {
      try {
        const res = yield call(commitCartQuickService, payload);
        if (res) {
          return res;
        }
        return {};
      } catch (e) {}
    },
    *cartOrdercommitOrderModels({ payload = {} }, { call }) {
      try {
        const data = yield call(cartOrdercommitOrderService, {});
        if (data) {
          window.location.href = data?.payUrl;
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

export default RechargeModel;
