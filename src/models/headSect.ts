import { Reducer } from 'redux';
import { circleList, sectMemberList, qryMarketDetail, cancelCreateCircle, shareCircle } from '@/services/sect';
import { Effect } from 'alita';

import addPeopleIcon from '@/assets/img/customer/sect/add_people.png';
import defaultIcon from '@/assets/img/customer/my/toux.png';

export interface HeadSectModelState {
  userInfo: any;
  sectInfo: any;
  gridViewData: any[];
  accNbre: any;
  marketInfo: any;
}

export interface HeadSectModelType {
  namespace: 'headSect';
  state: HeadSectModelState;
  effects: {
    circleList: Effect;
    sectMemberList: Effect;
    qryMarketDetail: Effect;
    cancelCreateCircle: Effect;
    shareCircle: Effect;
  };
  reducers: {
    save: Reducer<HeadSectModelState>;
  };
}

const HeadSectModel: HeadSectModelType = {
  namespace: 'headSect',

  state: {
    userInfo: {},
    sectInfo: {},
    gridViewData: [],
    accNbre: '',
    marketInfo: {},
  },

  effects: {
    *circleList({ payload }, { call, put }) {
      const data = yield call(circleList, payload);
      yield put({
        type: 'save',
        payload:
          { sectInfo: data.records.length ? data.records[0] : {} },
      });
      return data.records.length ? data.records[0] : {};
    },
    *sectMemberList({ payload }, { call, put, select }) {
      const data = yield call(sectMemberList, payload);
      const { userInfo } = yield select(_ => _.headSect);
      const { circleMemberType } = userInfo;
      const gridViewData = [];
      // if (circleMemberType === '1') { // 掌门权限
      //   gridViewData.push({
      //     icon: addPeopleIcon,
      //     text: '邀请',
      //   });
      // }
      if (data && data.records) {
        data.records.map((item: any) => {
          const { nickName, memberImage } = item;
          gridViewData.push({
            icon: memberImage || defaultIcon,
            text: nickName,
          });
        });
      }
      yield put({
        type: 'save',
        payload:
          { gridViewData },
      });
    },
    *qryMarketDetail({ payload }, { call, put, select }) {
      const { accNbre } = yield select(_ => _.headSect);
      const { circleId, mktCircleInstId } = payload;
      const requestData = {
        accNbr: accNbre,
        circleId,
        mktCircleInstId,
      };
      const data = yield call(qryMarketDetail, requestData);
      yield put({
        type: 'save',
        payload:
          { marketInfo: data, accNbre },
      });
    },
    *cancelCreateCircle({ payload }, { call, put }) {
      const data = yield call(cancelCreateCircle, payload);
      return data;
    },
    *shareCircle({ payload }, { call, put }) {
      const data = yield call(shareCircle, payload);
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

export default HeadSectModel;
