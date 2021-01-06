import { Reducer } from 'redux';
import { Effect, router } from 'alita';
import { Toast } from 'antd-mobile';
import Utils from '@/utils/tool';
import { sendMsgCode, loginMsg, checkMsgCode } from '@/services/memberApi';

export interface VerificationCodeModelState {
  name: string;
  timer: any;
  userCode: string;
  sms: string; // 输入的验证码
  isLogin: boolean; // 登录还是注册
  pageType: string; // 区分来自的页面
}

export interface VerificationCodeModelType {
  namespace: 'verificationCode';
  state: VerificationCodeModelState;
  effects: {
    sendCode: Effect;
    phoneLogin: Effect;
    checkMsgCode: Effect;
  };
  reducers: {
    save: Reducer<VerificationCodeModelState>;
  };
}

const VerificationCodeModel: VerificationCodeModelType = {
  namespace: 'verificationCode',
  state: {
    name: '',
    timer: null,
    userCode: '',
    sms: '',
    isLogin: true,
    pageType: '',
  },

  effects: {
    *phoneLogin({ payload }, { call, put, select }) {
      // 验证码登录
      const thisData = yield select((state: any) => state.verificationCode);
      const { userCode = '', sms = '' } = thisData;
      const data = yield call(loginMsg, {
        phone: userCode, //
        msgCode: sms,
      });
      Toast.info('登录成功');

      // 获取会员信息
      const { memberId = '', tokenCode } = data;
      // (window as any).userInfo = data;
      Utils.setStorageForJson('userInfo', data);
      (window as any).isLogin = true;
      Utils.setStorage('token', tokenCode);
      // (window as any).token = tokenCode;
      (window as any).memberId = memberId;

      router.go(-2); //往后跳2页，返回到登录前的那个页面
    },

    *sendCode({ payload }, { call, put, select }) {
      const thisData = yield select((state: any) => state.verificationCode);
      const { userCode = '' } = thisData;
      const { bizId } = payload;
      const data = yield call(sendMsgCode, {
        phone: userCode,
        bizId,
      });
      if (data) {
       // Toast.info('验证码发送成功');
      }
    },

    *checkMsgCode({ payload }, { call, put, select }) {
      // 验证码登录
      const thisData = yield select((state: any) => state.verificationCode);
      const { userCode = '', sms = '' } = thisData;
      const { actionType } = payload;

      if (actionType && actionType === '1') {
        // 忘记密码
        const data = yield call(checkMsgCode, {
          phone: userCode, //
          msgCode: sms,
          actionType,
        });
        const { memberId = '' } = data;
        yield put({
          type: 'setPassword/save',
          payload: { memberId: memberId },
        });
        router.push({ pathname: '/register/setPassword' });
      } else {
        // 注册
        const data = yield call(checkMsgCode, {
          phone: userCode,
          msgCode: sms,
        });
        yield put({
          type: 'setPassword/save',
          payload: { phoneNumber: userCode },
        });
        router.push({ pathname: '/register/setPassword' });
      }
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

export default VerificationCodeModel;
