import { query, updateMemberPassword, registerMemberForPhone } from '@/services/memberApi';
import { Effect, Reducer, router } from 'alita';

export interface SetPasswordModelState {
  name: string;
  password: string; //第一次输入的密码
  rePassword: string; //再次输入的密码
  pageType: string; //用于区分页面
  memberId: string; // 用于修改密码
  phoneNumber: string; // 用于注册的手机号
}

export interface SetPasswordModelType {
  namespace: 'setPassword';
  state: SetPasswordModelState;
  effects: {
    registerMemberForPhone: Effect;
    updateMemberPassword: Effect;
  };
  reducers: {
    save: Reducer<SetPasswordModelState>;
  };
}

const SetPasswordModel: SetPasswordModelType = {
  namespace: 'setPassword',

  state: {
    name: '',
    password: '',
    rePassword: '',
    pageType: '',
    memberId: '',
    phoneNumber: '',
  },

  effects: {
    *updateMemberPassword({ payload }, { call, put, select }) {
      // 修改密码
      const thisData = yield select((state: any) => state.setPassword);
      const { password = '', memberId = '' } = thisData;
      const data = yield call(updateMemberPassword, {
        password: password,
        memberId: memberId,
      });
      router.push({ pathname: '/commonSuccessPage' });
    },
    *registerMemberForPhone({ payload }, { call, put, select }) {
      // 注册会员
      const thisData = yield select((state: any) => state.setPassword);
      const { password = '', phoneNumber = '' } = thisData;
      const data = yield call(registerMemberForPhone, {
        phone: phoneNumber,
        password: password,
        sourceType: '1000',
        memberType: '1000', //1000-个人会员 1001-企业会员
      });
      router.push({ pathname: '/commonSuccessPage' });
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

export default SetPasswordModel;
