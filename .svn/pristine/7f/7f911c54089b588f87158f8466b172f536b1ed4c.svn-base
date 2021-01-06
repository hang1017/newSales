import { queryCustOrderDetailToApp, orderPaymentForJFUsingPOST } from '@/services/orderApi';
import { Effect, Reducer } from 'alita';
import Utils, { getUrlkey } from '@/utils/tool';
import { OrderType } from '@/utils/AppContext';
import { pushPayViewController, isMallSaleContainerApp } from '@/utils/NativeBridge';
export interface OrderDetailModelState {
  orderId: string;
  orderInfo: any;
  showAllProduct: boolean;
  orderType: string; // 订单类型
  orderState: string; // 订单状态
}

export interface OrderDetailModelType {
  namespace: 'orderDetail';
  state: OrderDetailModelState;
  effects: {
    queryDetail: Effect;
    toPayFor: Effect;
  };
  reducers: {
    save: Reducer<OrderDetailModelState>;
  };
}

const OrderDetailModel: OrderDetailModelType = {
  namespace: 'orderDetail',

  state: {
    orderId: '',
    orderInfo: {},
    showAllProduct: true,
    orderState: '',
    orderType: OrderType.product,
  },

  effects: {
    *queryDetail({ payload }, { call, put, select }) {
      const thisData = yield select((state: any) => state.orderDetail);
      let orderId = '';
      if (payload) {
        orderId = payload.orderId;
      }
      if (!orderId) {
        orderId = thisData.orderId;
      }

      const data = yield call(queryCustOrderDetailToApp, {
        orderId,
      });
      const { orderStatus = '' } = data;
      yield put({
        type: 'save',
        payload: {
          orderInfo: data,
          orderState: `${orderStatus}`,
        },
      });

      if (payload.callback) {
        payload.callback(data);
      }
    },
    *toPayFor({ payload = {} }, { call }) {
      const { orderId = '', totalAmount = '' } = payload;
      const source = localStorage.getItem('source');
      // const { memberId = '' } = Utils.getStorageForJson('userInfo') || {};
      const params = {
        orderId,
        sourceType: source,
      };
      let payChannelType = '1';
      if (Utils.isWeChat()) {
        payChannelType = '2';
      }
      if (source === 'wxamp' || source === '4') {
        payChannelType = '4';
      }
      if (payload?.payChannelType === '5') {
        payChannelType = '5';
      }
      const responData = yield call(orderPaymentForJFUsingPOST, {
        ...params,
        payChannelType,
        notifyUrl: `${window.location.origin}/#/customer/paySuccess`,
      });
      if (source === 'wxamp' || source === '4') {
        if (wx) {
          console.log(wx);
          // // getEnv获取环境
          const par = getUrlkey(responData);
          wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
              // alert("是小程序2")
              // 如果当前是小程序环境
              wx.miniProgram.navigateTo({
                url: `/pages/htmlView/index?payAmount=${totalAmount}&orderId=${orderId}&cashierId=${par?.cashierId}&payUserId=${par?.payUserId}&url=${responData}`,
              });
            }
          });
        }
      } else {
        window.location.href = responData;
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

export default OrderDetailModel;
