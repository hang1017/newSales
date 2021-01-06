import { query, checkMemberPhone } from '@/services/memberApi';
import { Effect, Reducer, router } from 'alita';

export interface RegisterPhoneModelState {
  name: string;
  phoneNumber: string;
  pageType: string; //用于区分是注册还是忘记密码
}

export interface RegisterPhoneModelType {
  namespace: 'registerPhone';
  state: RegisterPhoneModelState;
  effects: {
    checkMemberPhone: Effect;
  };
  reducers: {
    save: Reducer<RegisterPhoneModelState>;
  };
}

const RegisterPhoneModel: RegisterPhoneModelType = {
  namespace: 'registerPhone',

  state: {
    name: '',
    phoneNumber: '',
    pageType: '',
  },

  effects: {
    *checkMemberPhone({ payload }, { call, put, select }) {
      const thisData = yield select((state: any) => state.registerPhone);
      const { phoneNumber = '' } = thisData;
      const data = yield call(checkMemberPhone, {
        phone: phoneNumber,
      });
      // if (data) {
      //   (window as any).bizId = 'register';
      //   router.push({
      //     pathname: '/verificationCode',
      //   });
      // }
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

export default RegisterPhoneModel;
