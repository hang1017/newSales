import { queryLotteryDetail } from '@/services/activityPreview';
import { Effect, Reducer } from 'alita';

export interface ActivityPreviewModelState {
  data: any,
}

export interface ActivityPreviewModelType {
  namespace: 'activityPreview';
  state: ActivityPreviewModelState;
  effects: {
    queryLotteryDetail: Effect;
  };
  reducers: {
    save: Reducer<ActivityPreviewModelState>;
  };
}

const ActivityPreviewModel: ActivityPreviewModelType = {
  namespace: 'activityPreview',

  state: {
    data: {},
  },

  effects: {
    *queryLotteryDetail({ payload }, { call, put }) {
      const data = yield call(queryLotteryDetail, payload);
      yield put({
        type: 'save',
        payload: data.data,
      });
      return data.data;
    },
  },
  reducers: {
    save(state, action) {
      return {
        data: action.payload,
      };
    },
  },
};

export default ActivityPreviewModel;
