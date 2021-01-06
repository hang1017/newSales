import { queryMarketingDetail } from '@/services/marketing';
import { Effect, Reducer } from 'alita';

export interface MarketingModelState {
  shareTitle: string, 
  shareDesc: string, 
  shareIcon: string,
  shareUrl: string,
  sn: string,
  source: string,
}

export interface MarketingModelType {
  namespace: 'marketing';
  state: MarketingModelState;
  effects: {
    queryMarketingDetail: Effect;
  };
  reducers: {
    save: Reducer<MarketingModelState>;
  };
}

const MarketingModel: MarketingModelType = {
  namespace: 'marketing',

  state: {
    shareDesc: '',
    shareIcon: '',
    shareTitle: '',
    shareUrl: '',
    sn: '',
    source: '',
  },

  effects: {
    *queryMarketingDetail({ payload }, { call, put }) {
      const data = yield call(queryMarketingDetail, payload);
      yield put({
        type: 'save',
        payload: { ...data.data },
      });
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

export default MarketingModel;
