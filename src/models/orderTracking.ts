import { Reducer } from 'redux';
import { queryExpressInfo } from '@/services/orderApi';
import { Effect } from 'alita';

export interface OrderTrackingModelState {
  trackList: any;
}

export interface OrderTrackingModelType {
  namespace: 'orderTracking';
  state: OrderTrackingModelState;
  effects: {
    queryExpressInfo: Effect;
  };
  reducers: {
    save: Reducer<OrderTrackingModelState>;
  };
}

const OrderTrackingModel: OrderTrackingModelType = {
  namespace: 'orderTracking',

  state: {
    trackList: [],
  },

  effects: {
    *queryExpressInfo({ payload }, { call, put }) {
      const data = yield call(queryExpressInfo, payload);
      const trackList: { trackDes: string; time: any }[] = [];
      if (data && data.length) {
        data.map((item: any, index: number) => {
          const { statusName, statusDate, remark } = item;

          trackList.push({
            trackDes: `${statusName} ${remark}`,
            time: statusDate,
            receiveAddr: index === data.length - 1,
          });
        });

        yield put({
          type: 'save',
          payload: {
            trackList: trackList.reverse(),
          },
        });
      }
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

export default OrderTrackingModel;
