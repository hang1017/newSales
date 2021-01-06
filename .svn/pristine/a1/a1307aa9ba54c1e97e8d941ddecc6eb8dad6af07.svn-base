import { Reducer } from 'redux';
import { Effect } from 'alita';
import { sectMemberList, sectApplyAuditing } from '@/services/sect';

export interface IntoSectAuditModelState {
  memberList: any;
  circleInstId: any,
  accNbre: any,
}

export interface IntoSectAuditModelType {
  namespace: 'intoSectAudit';
  state: IntoSectAuditModelState;
  effects: {
    qrySectMemberList: Effect;
    sectApplyAuditing: Effect;
  };
  reducers: {
    save: Reducer<IntoSectAuditModelState>;
  };
}

const IntoSectAuditModel: IntoSectAuditModelType = {
  namespace: 'intoSectAudit',

  state: {
    memberList: [],
    circleInstId: '',
    accNbre: '',
  },

  effects: {
    *qrySectMemberList({ payload }, { call, put, select }) {
      const { circleInstId, accNbre } = yield select(_ => _.intoSectAudit);
      const requestParam = {
        ...payload
      };
      // 我的申请列表不需要传圈子id，传accNbre
      if (payload.hasOwnProperty("accNbre")) {
        requestParam.accNbre = accNbre;
      } else {
        requestParam.marketingCircleInstId = circleInstId;
      }
      const data = yield call(sectMemberList, requestParam);
      if (data) {
        const {
          records = [],
        } = data;
        yield put({
          type: 'save',
          payload: {
            memberList: records,
            // circleInstId,
          },
        });
      }
    },
    *sectApplyAuditing({ payload }, { call, put }) {
      const data = yield call(sectApplyAuditing, payload);
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

export default IntoSectAuditModel;
