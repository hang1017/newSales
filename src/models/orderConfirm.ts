import { Reducer } from 'redux';
import {
  queryAreaFatherList,
  queryAreaNextLevel,
  queryAreaByLimitCond,
} from '@/services/foundationCenterApi';
import {
  commitCartQuickByMember,
  phoneNumOccupForBilibili,
} from '@/services/tradingCenter';
import { loginAppService } from '@/services/memberApi';
import { Toast } from 'antd-mobile';
import { genAppLoginMsgCode, smsLogin, addRegistAndLogin, getSlideVerificationCode } from '@/services/basicApi';
import { getAddrListData } from '@/utils/bizCommon';

import Utils from '@/utils/tool';
import { Effect } from 'alita';

export interface OrderConfirmModelState {
  homeAddrData: any; // 区域数据
  skuList: any; // 购物车信息
  selectPhoneValue: {}; // 选中号码的信息
  tabeValues: {}; // 表单数据
  tabOneData: any; // tab1 页面的数据
  tabTwoData: any; // tab2 页面的数据
  initiazePage: number;
  loginFlag: boolean; // 是否是从 orderConfirm 登录的
  slipInfo: any;
}

export interface OrderConfirmModelType {
  namespace: 'orderConfirm';
  state: OrderConfirmModelState;
  effects: {
    queryAreaFatherList: Effect;
    queryAreaNextLevel: Effect;
    queryAreaByLimitCond: Effect;
    genAppLoginMsgCode: Effect;
    phoneNumOccupForBilibili: Effect;
    oldUserLogin: Effect;
    addRegistAndLogin: Effect;
    commitCartQuickByMember: Effect;
    getSlideVerificationCode: Effect;
  };
  reducers: {
    save: Reducer<OrderConfirmModelState>;
  };
}

const OrderConfirmModel: OrderConfirmModelType = {
  namespace: 'orderConfirm',

  state: {
    homeAddrData: [], // 区域数据
    skuList: [],
    selectPhoneValue: {},
    tabeValues: {},
    tabOneData: {},
    tabTwoData: {},
    initiazePage: 0,
    loginFlag: false,
    slipInfo: {}
  },

  effects: {
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
    *genAppLoginMsgCode({ payload = {} }, { call, put }) {
      const data = yield call(genAppLoginMsgCode, {
        phone: payload.phone,
      });
      if (data && payload.callback) {
        payload.callback();
      }
    },
    *phoneNumOccupForBilibili({ payload }, { call, put }) {
      const data = yield call(phoneNumOccupForBilibili, payload);
      if (data) {
        return data;
      }
    },

    *oldUserLogin({ payload }, { call, put, select }) {
      const res = yield call(smsLogin, {
        ...payload,
        sourceFrom: 'oldLogin',
      });
      if (res) {
        const { data, success = true, errMessage = '' } = res;
        if (data) {
          const { tokenCode, grayFlag, memberId } = data;
          localStorage.setItem('tokenCode', tokenCode);
          localStorage.setItem('grayFlag', grayFlag);
          // Utils.setStorageForJson('memberInfo', data);
          whaleCollect.set('user_id', memberId);
          const memData = yield call(loginAppService, {});
          Utils.setStorageForJson('memberInfo', {
            ...memData,
            ...data,
          });
          return res;
        }
        if (!success) {
          // Toast.show(errMessage, 1);
        }
        return res;
      }
      return false;
    },
    *addRegistAndLogin({ payload = {} }, { call, put }) {
      const res = yield call(addRegistAndLogin, {
        ...payload,
        loginType: '2000',
      });
      if (res) {
        const { data, success, errMessage = '' } = res;
        if (data && data.tokenCode) {
          const { grayFlag, memberId } = data;
          localStorage.setItem('tokenCode', data.tokenCode);
          // Utils.setStorageForJson('memberInfo', data);
          whaleCollect.set('user_id', memberId);
          localStorage.setItem('grayFlag', grayFlag);
          const memData = yield call(loginAppService, {});
          Utils.setStorageForJson('memberInfo', {
            ...memData,
            ...data,
          });
          if (payload.callback) {
            payload.callback(res);
          }
        } else {
          payload.callback(res);
          // Toast.fail(errMessage);
        }
      }
    },
    *commitCartQuickByMember({ payload = {} }, { call, put }) {
      const data = yield call(commitCartQuickByMember, {
        ...payload,
        sourceType: 1300,
        orderType: 1000,
      });
      return data;
    },
    *getSlideVerificationCode({ payload = {} }, { call, put }) {
      const data = yield call(getSlideVerificationCode, {});
      yield put({
        type: 'save',
        payload: {
          slipInfo: data,
        }
      })
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

export default OrderConfirmModel;
