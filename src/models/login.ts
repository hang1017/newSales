import { Toast } from 'antd-mobile';
import { loginAppService } from '@/services/memberApi';
import { getSystemParamsCacheByCode } from '@/services/emergencyApi';
import {
  loginToken,
  smsLogin,
  getSlideVerificationCode,
  checkSlideVerificationCode,
} from '@/services/basicApi';
import Utils from '@/utils/tool';

import { Effect, Reducer, history } from 'alita';

export interface LoginModelState {
  account: string;
  password: string;
  phoneNumber: string;
  isAccountLogin: boolean; // 是否账号密码登录
  showRegisterModal: boolean; // 是否显示注册弹框
  queryMemberId: boolean; // 通过 token 查询会员信息
  slipInfo: any;
}

export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects: {
    loginPassword: Effect;
    queryMemberId: Effect;
    smsLogin: Effect;
    getSlideVerificationCode: Effect;
    checkSlideVerificationCode: Effect;
    getSystemParamsCacheByCode: Effect;
  };
  reducers: {
    save: Reducer<LoginModelState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',

  state: {
    account: '',
    password: '',
    phoneNumber: '',
    isAccountLogin: true,
    showRegisterModal: false,
    slipInfo: {},
  },

  effects: {
    *loginPassword({ payload }, { call, put, select }) {
      const thisData = yield select((state: any) => state.login);
      const { account = '', password = '' } = thisData;
      const data = yield call(loginToken, {
        username: account,
        password: Utils.base64Encode(password),
      });

      const { memberId = '', tokenCode } = data;
      Utils.setStorageForJson('userInfo', data);
      // (window as any).userInfo = data;
      (window as any).isLogin = true;
      Utils.setStorage('token', tokenCode);
      // (window as any).token = tokenCode;
      (window as any).memberId = memberId;
    },
    *queryMemberId({ payload = {} }, { call }) {
      try {
        const {
          goBack = false, // 是否回到上一级
          loadingFlag = true, // 是否展示 Toast，有些时候是需要后台隐藏加载-陈书航
        } = payload;
        if (loadingFlag) Toast.loading('请稍后...');
        const data = yield call(loginAppService, {});
        Utils.setStorageForJson('memberInfo', data);
        if (goBack) {
          history.goBack();
        }
        if (loadingFlag) Toast.hide();
        return data;
      } catch (e) { }
    },

    *smsLogin({ payload = {} }, { call, put, select }) {
      const res = yield call(smsLogin, {
        ...payload,
        sourceFrom: 'memberLogin',
      });
      if (res) {
        const { data, success = true, errMessage = '' } = res;
        if (data) {
          const { tokenCode, grayFlag, memberId } = data;
          localStorage.setItem('tokenCode', tokenCode);
          localStorage.setItem('grayFlag', grayFlag);
          whaleCollect.set('user_id', memberId);
          Utils.setStorageForJson('memberInfo', data);

          const memData = yield call(loginAppService, {});
          Utils.setStorageForJson('memberInfo', {
            ...memData,
            ...data,
          });

          // yield put({
          //   type: 'queryMemberId',
          //   payload: {
          //     goBack: true,
          //   },
          // });

          // 上面的queryMemberId请求先不需要
          // 判断是否是直接打开登录页面，如果是就直接跳转到首页
          if (payload?.loginType === 'back') {
            history.goBack();
          } else {
            // const source = localStorage.getItem('source') || '';
            // const sn = localStorage.getItem('sn') || '';
            // history.push({
            //   pathname: '/customer/indexList',
            //   query: { source, sn },
            // });
            yield put({
              type: 'indexList/goToIndexList',
            });
          }
        }
        // if (!success) {
        //   Toast.show(errMessage, 1);
        // }
        return res;
      }
      return res;
    },
    *getSlideVerificationCode({ payload }, { call, put, select }) {
      const data = yield call(getSlideVerificationCode, {});
      yield put({
        type: 'save',
        payload: {
          slipInfo: data,
        },
      });
      return data;
    },
    *checkSlideVerificationCode({ payload }, { call, put, select }) {
      const data = yield call(checkSlideVerificationCode, payload);
      return data;
    },
    *getSystemParamsCacheByCode({ payload }, { call, put }) {
      const data = yield call(getSystemParamsCacheByCode, payload);
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

export default LoginModel;
