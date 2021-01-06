import { Reducer } from 'redux';
import { Effect } from 'alita';
import {
  qryWallpaperService,
  exchangeCouponService,
  qryRedeemedWallpaperService,
} from '@/services/myApi';

export interface WallPaperModelState {
  pageList: any[];
}

export interface WallPaperModelType {
  namespace: 'wallPaper';
  state: WallPaperModelState;
  effects: {
    queryPagerList: Effect; // 查询壁纸数据
    exchangeCouponModels: Effect; // 壁纸核销
    qryRedeemedWallpaperModels: Effect; // 已查询后的壁纸数据
  };
  reducers: {
    save: Reducer<WallPaperModelState>;
  };
}

const WallPaperModel: WallPaperModelType = {
  namespace: 'wallPaper',

  state: {
    pageList: [],
  },

  effects: {
    *queryPagerList({ payload = {} }, { call, put }) {
      const res = yield call(qryWallpaperService, {
        mcInstId: payload?.mcInstId || '',
      });
      yield put({
        type: 'save',
        payload: {
          pageList: res,
        },
      });
      if (res && res.length) {
        return res[0];
      }
    },
    *exchangeCouponModels({ payload = {} }, { call, put }) {
      const { mcInstIds = '', rightsMap = {} } = payload;
      const data = yield call(exchangeCouponService, {
        rightsMap: { [mcInstIds]: rightsMap },
        mcInstIds,
      });
      console.log(data);
    },
    *qryRedeemedWallpaperModels({ payload = {} }, { call, put }) {
      const res = yield call(qryRedeemedWallpaperService, {
        mcInstId: payload?.mcInstId || '',
      });
      yield put({
        type: 'save',
        payload: {
          pageList: res,
        },
      });
      if (res && res.length) {
        return res[0];
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

export default WallPaperModel;
