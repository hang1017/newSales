import { Reducer } from 'redux';
import {
  boostActivityShareService,
  qryBoostActivityInstDetailByIdService,
  addBoostActivityInstDetailService,
} from '@/services/mcms';
import { checkCodeService } from '@/services/basicApi';
import { Effect } from 'alita';

export interface StarHelpModelState {
  name: string;
}

export interface StarHelpModelType {
  namespace: 'starHelp';
  state: StarHelpModelState;
  effects: {
    boostActivityShareModal: Effect; // 下单助力分享
    qryBoostActivityInstDetailByIdModal: Effect; // 助力活动详情
    addBoostActivityInstDetailModal: Effect; // 助力好友点亮头像
    checkCodeModal: Effect; // 校验验证码的接口
  };
  reducers: {
    save: Reducer<StarHelpModelState>;
  };
}

const StarHelpModel: StarHelpModelType = {
  namespace: 'starHelp',

  state: {
    name: '',
  },

  effects: {
    *boostActivityShareModal({ payload }, { call }) {
      const res = yield call(boostActivityShareService, {
        ...payload,
      });
      return res;
    },
    *qryBoostActivityInstDetailByIdModal({ payload }, { call }) {
      const res = yield call(qryBoostActivityInstDetailByIdService, payload);
      return res;
    },
    *addBoostActivityInstDetailModal({ payload }, { call }) {
      const res = yield call(addBoostActivityInstDetailService, payload);
      return res;
    },
    *checkCodeModal({ payload }, { call }) {
      const data = yield call(checkCodeService, payload);
      return data;
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

export default StarHelpModel;
