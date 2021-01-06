import { Reducer } from 'redux';
import {
  tmscalFee,
  tmsCommitOrder,
  phoneNumOccupForBilibili,
  valIDCard,
} from '@/services/tradingCenter';
import { addRegistAndLogin } from '@/services/basicApi';
import { Effect, router } from 'alita';
import { Toast } from 'antd-mobile';

export interface CommitOrderModelState {
  proInfo: any; // 商品相关的信息
  tmscalFeeInfo: any;
}

export interface CommitOrderModelType {
  namespace: 'commitOrder';
  state: CommitOrderModelState;
  effects: {
    tmscalFee: Effect;
    tmsCommitOrder: Effect;
    phoneNumOccupForBilibili: Effect;
    saveProInfo: Effect; // 保存从商品详情跳转过来的商品数据
    valIDCard: Effect;
    addRegistAndLogin: Effect;
  };
  reducers: {
    save: Reducer<CommitOrderModelState>;
  };
}

const CommitOrderModel: CommitOrderModelType = {
  namespace: 'commitOrder',

  state: {
    proInfo: {},
    tmscalFeeInfo: {},
  },

  effects: {
    *saveProInfo({ payload }, { call, put }) {
      const { proInfo } = payload;
      yield put({
        type: 'save',
        payload: { proInfo },
      });
    },

    *valIDCard({ payload }, { call, put }) {
      const data = yield call(valIDCard, {
        cardNo: payload.cardNo,
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

    *tmscalFee({ payload }, { call, put }) {
      const data = yield call(tmscalFee, payload);
      console.log('tmscalFeeInfo', data);
      if (data) {
        yield put({
          type: 'save',
          payload: { tmscalFeeInfo: data },
        });
      }
    },

    *tmsCommitOrder({ payload }, { call, put, select }) {
      const data = yield call(tmsCommitOrder, payload);
      const { tmscalFeeInfo = {} } = yield select((_) => _.commitOrder);
      if (data) {
        if (data.payUrl && data.payUrl.length > 0) {
          window.location.href = data.payUrl;
        } else {
          router.push({
            pathname: '/paymentView',
            query: {
              ...data,
              ...tmscalFeeInfo,
            },
          });
        }

        payload.callback && payload.callback();
      }
    },
    *addRegistAndLogin({ payload = {} }, { call, put }) {
      const data = yield call(addRegistAndLogin, {
        phone: payload.phone,
        pwd: payload.pwd, // 明文传输
        loginType: '2000',
        smsCode: payload.smsCode,
      });
      if (data && data.tokenCode) {
        localStorage.setItem('tokenCode', data.tokenCode);
        if (payload.callback) {
          payload.callback();
        }
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

export default CommitOrderModel;
