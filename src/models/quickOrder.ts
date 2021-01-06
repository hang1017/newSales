import { Reducer } from 'redux';
import Utils from '@/utils/tool';
import { loginAppService } from '@/services/memberApi';
import { addAddress } from '@/services/memberApi';
import { commitCartQuickByMemberService, cartLoginService } from '@/services/quickOrder';
import { Effect } from 'alita';

export interface QuickOrderModelState {
  name: string;
}

export interface QuickOrderModelType {
  namespace: 'quickOrder';
  state: QuickOrderModelState;
  effects: {
    query: Effect;
    commitCartQuickByMemberModal: Effect;
    cartLoginModal: Effect;
    addAddressModal: Effect;
  };
  reducers: {
    save: Reducer<QuickOrderModelState>;
  };
}

const QuickOrderModel: QuickOrderModelType = {
  namespace: 'quickOrder',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
    *commitCartQuickByMemberModal({ payload }, { call, put }) {
      const data = yield call(commitCartQuickByMemberService, payload);
      if (data) {
        const { tokenCode = '', extValues = {} } = data;
        localStorage.setItem('grayFlag', extValues?.grayFlag);
        console.log('grayFlag: ', extValues?.grayFlag);
        localStorage.setItem('tokenCode', tokenCode);
        const memData = yield call(loginAppService, {});
        Utils.setStorageForJson('memberInfo', {
          ...extValues,
          ...memData,
        });
        yield put({
          type: 'oldUserLoginSuccess/save',
          payload: {
            cartOrderId: data?.cartOrderId,
          },
        });
        return data;
      }
      return null;
    },
    *cartLoginModal({ payload }, { call }) {
      const data = yield call(cartLoginService, payload);
      if (data) {
        const { extValues = {}, tokenCode = '' } = data;
        const { memberId = '', grayFlag = '' } = extValues;
        localStorage.setItem('grayFlag', grayFlag);
        console.log('grayFlag: ', grayFlag);
        if (memberId) {
          whaleCollect.set('user_id', memberId);
        }
        localStorage.setItem('tokenCode', tokenCode);
        const memData = yield call(loginAppService, {});
        Utils.setStorageForJson('memberInfo', {
          ...extValues,
          ...memData,
        });
        return data;
      }
      return null;
    },
    *addAddressModal({ payload }, { call }) {
      const data = yield call(addAddress, payload);
      if (data) {
        return data;
      }
      return null;
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

export default QuickOrderModel;
