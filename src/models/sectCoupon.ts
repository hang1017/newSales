import { Reducer } from 'redux';
import { Effect } from 'alita';
import { qryCouponUnclaimedList, sectReceiveCoupon, sectAllotCoupon } from '@/services/sect';
import { Toast } from 'antd-mobile';


export interface SectCouponModelState {
  circleInstId: any;
  accNbr: any;
  circleMemberType: any;
  ownerCouponList: any;
  memberCouponList: any;
}

export interface SectCouponModelType {
  namespace: 'sectCoupon';
  state: SectCouponModelState;
  effects: {
    qryCouponUnclaimedList: Effect;
    sectReceiveCoupon: Effect;
    sectAllotCoupon: Effect;
  };
  reducers: {
    save: Reducer<SectCouponModelState>;
  };
}

const SectCouponModel: SectCouponModelType = {
  namespace: 'sectCoupon',

  state: {
    circleInstId: '',
    accNbr: '',
    circleMemberType: '',
    ownerCouponList: [],
    memberCouponList: [],
  },

  effects: {
    *qryCouponUnclaimedList({ payload }, { call, put, select }) {
      const { circleInstId, accNbre, circleMemberType } = yield select(_ => _.sectCoupon);
      const requestParam = {
        mktCircleInstId: circleInstId,
        accNbr: accNbre,
      };
      const data = yield call(qryCouponUnclaimedList, requestParam);
      if (data) {
        const {
          circleCouponList = [],
          memberCouponList = [],
        } = data;
        yield put({
          type: 'save',
          payload: {
            ownerCouponList: circleCouponList,
            memberCouponList,
            circleInstId,
            accNbr: accNbre,
            circleMemberType,
          },
        });
      }
    },
    *sectReceiveCoupon({ payload }, { call, put, select }) {
      const { circleInstId, accNbre } = yield select(_ => _.sectCoupon);
      const requestParam = {
        mktCircleInstId: circleInstId,
        accNbr: accNbre,
        ...payload,
      };
      const data = yield call(sectReceiveCoupon, requestParam);
      const { success } = data;
      if (success) {
        Toast.success('领取成功');
      }
    },
    *sectAllotCoupon({ payload }, { call, put }) {
      const data = yield call(sectAllotCoupon, payload);
      const { success } = data;
      if (success) {
        Toast.success('赠送成功');
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

export default SectCouponModel;
