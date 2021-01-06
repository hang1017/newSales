import { Reducer } from 'redux';
import { loginToken, genAppLoginMsgCode, addUserMember } from '@/services/basicApi';
import { Effect } from 'alita';
import { encode } from '@/utils/base64.min.js';
import { Toast } from 'antd-mobile';

export interface OrderSearchModelState {
  name: string;
}

export interface OrderSearchModelType {
  namespace: 'orderSearch';
  state: OrderSearchModelState;
  effects: {
    loginToken: Effect;
    genAppLoginMsgCode: Effect;
    addUserMember: Effect;
  };
  reducers: {
    save: Reducer<OrderSearchModelState>;
  };
}

const OrderSearchModel: OrderSearchModelType = {
  namespace: 'orderSearch',

  state: {
    name: '',
  },

  effects: {
    *loginToken({ payload }, { call, put }) {
      const data = yield call(loginToken, {
        sourceFrom: payload.sourceFrom,
        username: payload.username,
        password: payload.password,
        smsCode: payload.smsCode,
      });
      localStorage.setItem('tokenCode', data.tokenCode);
      if (data && payload.callback) {
        payload.callback();
      }
    },
    *genAppLoginMsgCode({ payload = {} }, { call }) {
      const data = yield call(genAppLoginMsgCode, payload);
      if (!data?.success) {
        Toast.fail(data?.errMessage, 1);
        payload.callback(false);
      } else {
        payload.callback(true);
      }
    },
    *addUserMember({ payload = {} }, { call, put }) {
      const { success, errCode } = yield call(addUserMember, {
        phone: payload.phone,
        pwd: payload.pwd, // 明文传输
        loginType: '2000',
        userType: '1000',
        address: '1,72',
      });

      if (errCode === 'POT-USR-00092' || `${success}` === 'true') {
        yield put({
          type: 'loginToken',
          payload: {
            sourceFrom: '', // BSITE
            username: payload.phone,
            password: encode(payload.pwd),
            callback: () => {
              if (payload.callback) {
                payload.callback();
              }
            },
          },
        });
      } else {
        Toast.fail('订单提交失败');
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

export default OrderSearchModel;
