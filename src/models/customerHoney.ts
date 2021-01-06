import { Reducer } from 'redux';
import {
  uploadFileService,
  qryCscOnlineMsgInfoService,
  qryOnlineSourceService,
} from '@/services/customHoneyApi';
import { Effect } from 'alita';
import moment from 'moment';
import { getHoneyGoodsDetail, random } from '@/utils';

export interface CustomerHoneyModelState {
  chatList: any[];
  chatPage: number;
  hasMore: boolean;
  timestamp: number;
}

export interface CustomerHoneyModelType {
  namespace: 'customerHoney';
  state: CustomerHoneyModelState;
  effects: {
    queryHistory: Effect; // 查询聊天历史记录
    uploadFileModels: Effect; // 上传文件
    qryOnlineSourceModels: Effect; // 判断客服类型
  };
  reducers: {
    save: Reducer<CustomerHoneyModelState>;
  };
}

const CustomerHoneyModel: CustomerHoneyModelType = {
  namespace: 'customerHoney',

  state: {
    chatList: [],
    chatPage: 1,
    hasMore: true,
    timestamp: 0,
  },

  effects: {
    *queryHistory(_, { call, put, select }) {
      let { chatPage = 1, hasMore = false, chatList = [], timestamp = 0 } = yield select(
        (_: any) => _.customerHoney,
      );
      const goodDetail = getHoneyGoodsDetail();
      const { goodsId = '', goodsName = '', goodsPictureList = [], price = 0 } = goodDetail;
      let img = '';
      if (goodsPictureList && goodsPictureList.length) {
        img = goodsPictureList[0].filePathInServer;
      }
      let newList = [];
      let newTimestamp = moment(new Date()).valueOf();
      const params = {
        msgType: 'goods',
        msgObj:
          JSON.stringify({
            goodsId: goodsId,
            goodsName: goodsName,
            goodsUrl: img,
            picPath: `${window.location.origin}/#/customer/cGoodsDetails?goodsId=${goodsId}`,
            goodsPrice: price,
          }) || '{}',
        timestamp: moment(new Date()).valueOf(),
        randomId: random(),
        timeFlag: '1',
      };
      if (hasMore) {
        const data = yield call(qryCscOnlineMsgInfoService, {
          pageNum: chatPage,
          pageSize: 20,
          timestamp: chatPage === 1 ? newTimestamp : timestamp,
        });
        if (data && data?.records && data?.records?.length) {
          newList = data?.records.reverse();
        } else {
          hasMore = false;
        }
      }
      newList.push(...chatList);
      if (Object.keys(goodDetail).length > 0 && chatPage === 1) {
        newList.push(params);
      }
      yield put({
        type: 'save',
        payload: {
          chatList: newList,
          chatPage: chatPage + 1,
          hasMore,
          timestamp: chatPage === 1 ? newTimestamp : timestamp,
        },
      });
    },
    *uploadFileModels({ payload }, { call }) {
      const data = yield call(uploadFileService, payload);
      if (data && Object.keys(data).length) {
        return {
          flag: true,
          data,
        };
      }
      return {
        flag: false,
        data: {},
      };
    },
    *qryOnlineSourceModels({ payload }, { call }) {
      const data = yield call(qryOnlineSourceService, payload);
      if (data) {
        return data;
      }
      return 'csms';
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

export default CustomerHoneyModel;
