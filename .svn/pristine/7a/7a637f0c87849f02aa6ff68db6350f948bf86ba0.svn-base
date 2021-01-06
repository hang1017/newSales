import { Reducer } from 'redux';
import { Effect } from 'alita';
import { Toast } from 'antd-mobile';
import { sectMemberList, sectLeaveMember, sectOwnerTransfer } from '@/services/sect';

export interface AllMemberModelState {
  memberList: any;
  isOwner: boolean;
  circleInstId: any;
  accNbr: any;
  unclaimedId: any;
}

export interface AllMemberModelType {
  namespace: 'allMember';
  state: AllMemberModelState;
  effects: {
    qrySectMemberList: Effect;
    sectLeaveMember: Effect;
    sectOwnerTransfer: Effect;
  };
  reducers: {
    save: Reducer<AllMemberModelState>;
  };
}

const AllMemberModelModel: AllMemberModelType = {
  namespace: 'allMember',

  state: {
    memberList: [],
    isOwner: false,
    circleInstId: '',
    accNbr: '',
    unclaimedId: '',
  },

  effects: {
    *qrySectMemberList({ payload }, { call, put, select }) {
      const { circleInstId, isOwner, accNbr = '', unclaimedId = '' } = yield select(_ => _.allMember);
      const requestParam = {
        marketingCircleInstId: circleInstId,
        applyFlag: true,
        current: 1,
        size: 50,
        ...payload,
      };
      const data = yield call(sectMemberList, requestParam);
      if (data) {
        const {
          records = [],
        } = data;
        yield put({
          type: 'save',
          payload: {
            memberList: records,
            isOwner,
            accNbr,
            unclaimedId,
          },
        });
      }
    },
    *sectLeaveMember({ payload }, { call, put, select }) {
      const data = yield call(sectLeaveMember, payload);
    },
    *sectOwnerTransfer({ payload }, { call, put, select }) {
      const { circleInstId, selfCircleMemInstId } = yield select(_ => _.allMember);
      const requestParam = {
        circleInstId: circleInstId,
        ownerMarketingCircleInstMemberId: selfCircleMemInstId,
        ...payload
      };
      const data = yield call(sectOwnerTransfer, requestParam);
      const { success, errMessage } = data;
      if (success) {
        Toast.success('转移成功');
      } else {
        Toast.info(errMessage);
      }
      return success;
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

export default AllMemberModelModel;
