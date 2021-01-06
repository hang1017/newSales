/* eslint-disable require-yield */
/* eslint-disable no-param-reassign */
import { Reducer } from 'redux';
import { addMemberInvoice } from '@/services/invoiceApi';
import {
  selOrderInvoice,
  selAddress,
  choosePhoneNum,
  commitOrder,
  commitOrderBfCheck,
  queryDefaultOrderGoodsService,
} from '@/services/tradingCenter';
import { queryPhoneNumByMemberIdService } from '@/services/rechargeApi';
import { getH5ConfigurationService } from '@/services/basicApi';
import { query } from '@/services/api';
import Utils, { getUrlkey } from '@/utils/tool';
import { Toast } from 'antd-mobile';
import { Effect } from 'alita';

export interface PayConfirmModelState {
  addressInfo: any;
  orderInfo: any; // 订单提交接口返回参数
  nameAndNo: any; // 真实姓名和身份证号码
  choosePhoneTypeValue: any; // 选择的号码类型
  invoiceContent: any;
  phoneInfo: any; // 选择的手机号信息
  guideList: any; // 引导的列表数据
  claimValue: string;
  addrLabel: string[];
  addrValue: any;
  needShowOrdAddr: string;
  claimType: string[];
  halfPaymenet: any;
  singleFlag: string;
}

export interface PayConfirmModelType {
  namespace: 'payConfirm';
  state: PayConfirmModelState;
  effects: {
    query: Effect;
    addMemberInvoice: Effect; // 会员发票新增
    selAddress: Effect; // 收货地址选择
    commitOrder: Effect; // 提交订单
    clearAddress: Effect;
    commitOrderBfCheck: Effect;
    queryDefaultOrderGoodsModel: Effect;
    getH5ConfigurationModel: Effect; // 查询配置开关
  };

  reducers: {
    save: Reducer<PayConfirmModelState>;
  };
}

const PayConfirmModel: PayConfirmModelType = {
  namespace: 'payConfirm',

  state: {
    addressInfo: {},
    orderInfo: {},
    nameAndNo: {},
    choosePhoneTypeValue: undefined,
    invoiceContent: { personal: {}, company: {} },
    phoneInfo: {},
    guideList: [],
    claimValue: '', // 配送方式的值
    addrLabel: ['上海市', '上海市辖区'], // 归属地数据
    addrValue: {
      label: '上海市辖区',
      lanId: 8310100,
      provinceId: 8310000,
      value: 8310100,
    }, // 归属地数据
    needShowOrdAddr: '', // 是否需要展示选址的功能
    claimType: [], // 配送方式
    halfPaymenet: {}, //
    singleFlag: '', // 空：代表原先的保持不变，1: 代表是单个号码，2:代表是多个号码
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
    *addMemberInvoice({ payload }, { call, put, select }) {
      const data = yield call(addMemberInvoice, payload);
      console.log(data);
      if (data) {
        const { invoiceTemplateId } = data;
        yield call(selOrderInvoice, { invoiceTemplateId, invoiceContent: 1000 });
      } else {
        Toast.show('新建发票错误！');
      }
    },
    *selAddress({ payload }, { call, put, select }) {
      const { receiveAddrId } = payload.data;
      const data = yield call(selAddress, { receiveAddrId });
      const { orderInfo } = yield select((_) => _.payConfirm);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            addressInfo: payload.data,
            orderInfo: {
              ...orderInfo,
              memberReceiveAddr: payload.data,
            },
          },
        });
        return true;
      }
      return false;
    },
    *choosePhoneNum({ payload }, { call, put }) {
      const data = yield call(choosePhoneNum, payload);
      return data;
    },
    *commitOrder({ payload }, { call, select }) {
      const payConfirm = yield select((_: any) => _.payConfirm);
      const source = localStorage.getItem('source');
      const sn = localStorage.getItem('sn');
      const salesCode = localStorage.getItem('salesCode') || '';

      let payChannelType = '1';
      if (Utils.isWeChat()) {
        payChannelType = '2';
      }
      if (source === 'wxamp' || source === '4') {
        payChannelType = '4';
      }
      const data = yield call(commitOrder, {
        ...payload,
        claimType: payConfirm?.claimValue || '',
        extValues: {
          grayFlag: Utils.getGrayFlag(),
          locationUrl: window.location.origin,
          sn,
          source,
          sourceType: source,
          salesCode,
          claimType: payConfirm?.claimValue || '',
          payChannelType,
          notifyUrl: `${window.location.origin}/#/customer/paySuccess`,
          ...payConfirm?.halfPaymenet,
        },
      });
      if (data) {
        if (!payConfirm?.orderInfo?.payAmount) {
          return data;
        }
        if (source === 'wxamp' || source === '4') {
          if (wx) {
            console.log(wx);
            const par = getUrlkey(data?.payUrl);
            wx.miniProgram.getEnv(function (res) {
              if (res.miniprogram) {
                // alert("是小程序2")
                // 如果当前是小程序环境
                wx.miniProgram.navigateTo({
                  url: `/pages/htmlView/index?payAmount=${payConfirm?.orderInfo?.payAmount}&orderId=${data?.orderId}&cashierId=${par?.cashierId}&payUserId=${par?.payUserId}&url=${data?.payUrl}`,
                });
              }
            });
          }
          return null;
        }
        return data;
      }
      return null;
    },
    *queryPhoneNumByMemberIdModels(_, { call }) {
      const res = yield call(queryPhoneNumByMemberIdService, {});
      return res;
    },
    *clearAddress({ payload }, { put, select }) {
      const { addressInfo, orderInfo } = yield select((_) => _.payConfirm);
      orderInfo.memberReceiveAddr = {};
      if (`${addressInfo.receiveAddrId}` === `${payload.receiveAddrId}`) {
        yield put({
          type: 'save',
          addressInfo: {},
          orderInfo: {
            ...orderInfo,
          },
        });
      }
    },
    *commitOrderBfCheck({ payload }, { call, put, select }) {
      const data = yield call(commitOrderBfCheck, payload);
      console.log(data);
      if (data) {
        return data?.success;
      }
      return false;
    },
    *queryDefaultOrderGoodsModel({ payload }, { call, put }) {
      const data = yield call(queryDefaultOrderGoodsService, payload);
      if (data && data.length) {
        const newData = data.map((item: any) => {
          item.quantity = 0;
          return item;
        });
        yield put({
          type: 'save',
          payload: { guideList: newData },
        });
      }
    },
    *getH5ConfigurationModel({ payload }, { call }) {
      const data = yield call(getH5ConfigurationService, payload);
      if (data && data === 'true') return true;
      return false;
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

export default PayConfirmModel;
