import { Reducer } from 'redux';
import {
  qryFlowDetailService,
  qryMessageDetailService,
  qryVoiceDetailService,
  identityAuthService,
} from '@/services/queryDetailList';
import { numberList } from '@/services/memberApi';
import { Effect } from 'alita';

export interface QueryDetailListModelState {
  phoneList: any[];
}

export interface QueryDetailListModelType {
  namespace: 'queryDetailList';
  state: QueryDetailListModelState;
  effects: {
    qryFlowDetailModel: Effect; // 流量详单
    qryMessageDetailModel: Effect; // 短信详单
    qryVoiceDetailModel: Effect; // 语音详单
    numberList: Effect; // 查询手机号码
    identityAuthModel: Effect; // 详单身份验证
  };
  reducers: {
    save: Reducer<QueryDetailListModelState>;
  };
}

const QueryDetailListModel: QueryDetailListModelType = {
  namespace: 'queryDetailList',

  state: {
    phoneList: [],
  },

  effects: {
    *qryFlowDetailModel({ payload }, { call }) {
      const data = yield call(qryFlowDetailService, payload);
      return data;
    },
    *qryMessageDetailModel({ payload }, { call }) {
      const data = yield call(qryMessageDetailService, payload);
      return data;
    },
    *qryVoiceDetailModel({ payload }, { call }) {
      const data = yield call(qryVoiceDetailService, payload);
      return data;
    },
    *numberList({ payload }, { call, put }) {
      const data = yield call(numberList, payload);
      const phoneList: any[] = [];
      if (data && data.length) {
        // eslint-disable-next-line array-callback-return
        data.map((item: any) => {
          phoneList.push({
            label: item.accNbr,
            value: item.accNbr,
          });
        });
      }
      yield put({
        type: 'save',
        payload: {
          phoneList,
        },
      });
      return [];
    },
    *identityAuthModel({ payload }, { call }) {
      const data = yield call(identityAuthService, payload);
      console.log(data);
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

export default QueryDetailListModel;
