import { Reducer } from 'redux';
import { qryMyConsumeUsage } from '@/services/myApi';
import { Effect } from 'alita';

export interface QuantityQueryModelState {
  quantityList: any[];
  myTeleBusiUsages: any;
  phoneList: any; // 号码列表
  currentPhone: string; // 当前选中的号码
  allTotal: string;
  allRemain: string;
  totalUnit: string;
  remainUnit: string;
}

export interface QuantityQueryModelType {
  namespace: 'quantityQuery';
  state: QuantityQueryModelState;
  effects: {
    qryMyConsumeUsage: Effect;
  };
  reducers: {
    save: Reducer<QuantityQueryModelState>;
  };
}

const QuantityQueryModel: QuantityQueryModelType = {
  namespace: 'quantityQuery',

  state: {
    quantityList: [],
    myTeleBusiUsages: {},
    phoneList: [],
    currentPhone: '', // 页面当前选中的号码
    allTotal: '0.00',
    allRemain: '0.00',
    totalUnit: 'G',
    remainUnit: 'G',
  },

  effects: {
    *qryMyConsumeUsage({ payload }, { call, put, select }) {
      const data = yield call(qryMyConsumeUsage, payload); // 服务端数据是一次返回，所以需要自行处理
      let { currentPhone } = yield select((_) => _.quantityQuery);
      const { userSelectPhone } = yield select((_) => _.myPage);
      let myTeleBusiUsages = {};
      const phoneList: any[] = [];
      let tempData = {};
      if (data && data.length) {
        data.map((item) => {
          const { mobile } = item;
          if (mobile === (userSelectPhone || currentPhone)) {
            tempData = item;
          }
          phoneList.push({
            text: mobile,
            key: mobile,
          });
        });
        if (currentPhone) {
          myTeleBusiUsages = tempData;
        } else {
          myTeleBusiUsages = data[0];
          currentPhone = userSelectPhone || myTeleBusiUsages.mobile;
        }

        if (`${payload.teleBusiType}` === '101003') {
          let tempData = myTeleBusiUsages && myTeleBusiUsages.teleBusiUsages ? myTeleBusiUsages.teleBusiUsages[0] : {};
          yield put({
            type: 'save',
            payload: {
              quantityList: data,
              myTeleBusiUsages,
              allTotal: tempData && tempData.used || '0.00',
              allRemain: tempData && tempData.remain || '0.00',
              totalUnit: tempData && tempData.usedUnit || 'G',
              remainUnit: tempData && tempData.remainUnit || 'G',
              phoneList,
              currentPhone,
            },
          });
        }
        else {
          yield put({
            type: 'save',
            payload: {
              quantityList: data,
              myTeleBusiUsages,
              phoneList,
              currentPhone,
            },
          });
        }


        return data[0].mobile;
      }


      return '';
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

export default QuantityQueryModel;
