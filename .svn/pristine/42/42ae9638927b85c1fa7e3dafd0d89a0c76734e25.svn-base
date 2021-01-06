import { Effect } from 'alita';
import { Reducer } from 'redux';
import { queryAreaFatherList, queryAreaNextLevel } from '@/services/foundationCenterApi';
import { getAddrListData } from '@/utils/bizCommon';

export interface BroadbandSelectModelState {
  homeAddrData: any; // 区域数据
  detailList: any[]; // 相信地址列表
}

export interface BroadbandSelectModelType {
  namespace: 'broadbandSelect';
  state: BroadbandSelectModelState;
  effects: {
    queryAreaFatherList: Effect;
    queryAreaNextLevel: Effect;
    queryDetailList: Effect;
  };
  reducers: {
    save: Reducer<BroadbandSelectModelState>;
  };
}

const BroadbandSelectModel: BroadbandSelectModelType = {
  namespace: 'broadbandSelect',

  state: {
    homeAddrData: [],
    detailList: [],
  },

  effects: {
    *queryAreaFatherList({ payload = {} }, { call, put }) {
      const data = yield call(queryAreaFatherList, payload);
      if (data) {
        const newData = getAddrListData(data);
        yield put({
          type: 'save',
          payload: { homeAddrData: newData },
        });
        if (payload.callback) {
          payload.callback(newData);
        }
      }
    },
    *queryAreaNextLevel({ payload }, { call, put }) {
      const { parentId, callback } = payload;
      const data = yield call(queryAreaNextLevel, parentId);
      let newData = [];
      if (data) {
        newData = getAddrListData(data);
        if (callback) {
          callback(newData);
        }
      }
      yield put({
        type: 'save',
        payload: { homeAddrData: newData },
      });
    },
    *queryDetailList({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          detailList: [
            { id: '1', name: '浩鲸1' },
            { id: '2', name: '浩鲸2' },
            { id: '3', name: '浩鲸3' },
            { id: '4', name: '浩鲸4' },
            { id: '5', name: '浩鲸5' },
            { id: '6', name: '浩鲸6' },
          ],
        },
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

export default BroadbandSelectModel;
