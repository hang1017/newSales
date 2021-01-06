import { Reducer } from 'redux';
import {
  qryBalance,
  instQryService,
  receiveCouponUnclaimedService,
  numberList,
  qryMyConsumeUsageAll,
} from '@/services/memberApi';
import { qryMyNumberInstList } from '@/services/memberApi';
import { qryRights } from '@/services/promotionApi';
import { getH5ConfigurationService } from '@/services/basicApi';
import { Effect } from 'alita';
import { sysParams } from '@/utils/AppContext';

import sectIcon from '@/assets/img/customer/my/sect.png';
import livingCheckPng from '@/assets/img/customer/my/livingCheck.png';

export interface MyPageModelState {
  amount: string;
  numberList: any;
  remainUnit: string;
  remain: string;
  rightsGoodsCouponNum: string;
  cumulativeInfo: object;
  showGainModal: boolean;
  userSelectPhone: string; // 用户选中的号码，需要和使用量保持同步
  numberInstId: string;
  numberStatusList: any[];
}

export interface MyPageModelType {
  namespace: 'myPage';
  state: MyPageModelState;
  effects: {
    qryBalance: Effect;
    numberList: Effect;
    qryMyConsumeUsageAll: Effect;
    qryRights: Effect;
    instQryModel: Effect;
    receiveCouponUnclaimedModel: Effect;
    qryMyNumberInstList: Effect;
    getH5ConfigurationModel: Effect;
  };
  reducers: {
    save: Reducer<MyPageModelState>;
  };
}

const MyPageModel: MyPageModelType = {
  namespace: 'myPage',

  state: {
    amount: '0.00',
    numberList: [],
    remainUnit: 'G',
    remain: '0.00',
    rightsGoodsCouponNum: '0',
    cumulativeInfo: {}, // 累积消费返回的实例对象
    showGainModal: false, // 是否展示领取成功的弹框
    userSelectPhone: '',
    numberInstId: '',
    numberStatusList: [],
  },

  effects: {
    *qryBalance({ payload = {} }, { call, put }) {
      const data = yield call(qryBalance, payload);
      if (data && data.amount) {
        yield put({
          type: 'save',
          payload: {
            amount: data.amount,
          },
        });
        return data.amount;
      }
      return '';
    },
    *numberList({ payload }, { call, put, select }) {
      const { userSelectPhone, numberInstId } = yield select((_) => _.myPage);
      const data = yield call(numberList, payload);
      let numberInst = '';
      let tempNumberList = [];
      let selectPhone = '';
      if (data && data.length) {
        tempNumberList = data;
        selectPhone = userSelectPhone || data[0].accNbr;
        numberInst = numberInstId || data[0].numberInstId;
      }
      yield put({
        type: 'save',
        payload: {
          numberList: tempNumberList,
          userSelectPhone: selectPhone,
          numberInstId: numberInst,
        },
      });
      return { selectPhone, numberInstId };
    },
    *qryMyConsumeUsageAll({ payload }, { call, put }) {
      const data = yield call(qryMyConsumeUsageAll, payload);
      if (data && data.flowList && data.flowList.length) {
        const { remainUnit = '', remain = '' } = data.flowList[0].teleBusiUsages.length
          ? data.flowList[0].teleBusiUsages[0]
          : {};
        yield put({
          type: 'save',
          payload: {
            remainUnit,
            remain,
          },
        });
      }
    },
    *qryRights({ payload = {} }, { call, put }) {
      const data = yield call(qryRights, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            rightsGoodsCouponNum: data.length,
          },
        });
      }
      console.log(data);
    },
    *instQryModel({ payload = {} }, { call, put }) {
      const data = yield call(instQryService, payload);
      if (data) {
        // const { rightsGoodsCouponNum } = data;
        yield put({
          type: 'save',
          payload: {
            // rightsGoodsCouponNum,
            cumulativeInfo: data,
          },
        });
      }
      console.log(data);
    },
    *receiveCouponUnclaimedModel({ payload = {} }, { call, put }) {
      const data = yield call(receiveCouponUnclaimedService, payload);
      console.log(data);
    },
    *qryMyNumberInstList({ payload }, { call, put }) {
      const data = yield call(qryMyNumberInstList, payload);
      yield put({
        type: 'save',
        payload: { numberStatusList: data },
      });
    },
    *getH5ConfigurationModel({ payload }, { call }) {
      let list = [];
      const fromType = localStorage.getItem('fromType');
      const source = localStorage.getItem('source');
      console.log(`fromType: ${fromType}`, `source: ${source}`);
      if (fromType === 'v1WeChat' && (source === '4' || source === 'wxamp')) {
        // res1: 门派圈子
        // res2: 活体检测
        let [res1, res2] = yield [
          call(getH5ConfigurationService, { propertyName: sysParams.sectParams }),
          call(getH5ConfigurationService, { propertyName: sysParams.livingCheck }),
        ];
        if (res1 && res1 === 'true') {
          list.push({
            icon: sectIcon,
            text: '我的圈子',
            pathname: 'menpai',
          });
        }
        if (res2 && res2 === 'true') {
          list.push({
            icon: livingCheckPng,
            text: '活体检测',
            pathname: 'livingCheck',
          });
        }
      } else {
        let res1 = yield call(getH5ConfigurationService, { propertyName: sysParams.sectParams });
        if (res1 && res1 === 'true') {
          list.push({
            icon: sectIcon,
            text: '我的圈子',
            pathname: 'menpai',
          });
        }
      }
      return list;
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

export default MyPageModel;
