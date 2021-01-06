/* eslint-disable prefer-destructuring */
import { Reducer } from 'redux';
import { Toast } from 'antd-mobile';
import { queryMemberLevel, modHeaderPortraitService, qryBalance } from '@/services/memberApi';
import { countOrderStatus } from '@/services/orderApi';
import { Effect } from 'alita';

export interface MyModelState {
  levelType: string;
  needPay: string;
  needReceive: string;
  amount: string;
}

export interface MyModelType {
  namespace: 'my';
  state: MyModelState;
  effects: {
    queryMemberLevel: Effect;
    countOrderStatus: Effect;
    modHeaderPortrait: Effect; // 个人中心头像修改
    qryBalance: Effect;
  };
  reducers: {
    save: Reducer<MyModelState>;
  };
}

const MyModel: MyModelType = {
  namespace: 'my',

  state: {
    levelType: '--',
    needPay: '',
    needReceive: '',
    amount: '--',
  },

  effects: {
    *queryMemberLevel({ payload }, { call, put }) {
      const data = yield call(queryMemberLevel, payload);
      let levelType = '--';
      if (!data) return false;
      if (data && data.length) {
        levelType = data[0].levelType;
      }

      yield put({
        type: 'save',
        payload: { levelType },
      });
      return true;
    },
    *countOrderStatus({ payload }, { call, put }) {
      const data = yield call(countOrderStatus, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            needPay: data.needPay,
            needReceive: data.needReceive,
          },
        });
      }
    },
    *modHeaderPortrait({ payload = {} }, { call }) {
      try {
        const { success, errMessage = '' } = yield call(modHeaderPortraitService, payload);
        if (success) {
          Toast.success('上传成功', 1);
          return true;
        } else {
          Toast.fail(errMessage, 1);
          return false;
        }
      } catch (e) {}
      return false;
    },
    *qryBalance({ payload = {} }, { call, put }) {
      const data = yield call(qryBalance, payload);
      if (data && data.amount) {
        yield put({
          type: 'save',
          payload: {
            amount: data.amount,
          },
        });
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

export default MyModel;
