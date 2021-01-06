import { Reducer } from 'redux';
import chunk from 'lodash/chunk';
import { Effect } from 'alita';
import { qryCartItemPageService, qryBuyGoodsPageService } from '@/services/customHoneyApi';

export interface CustomerCenterModelState {
  buyedData: any;
  cartData: any;
}

export interface CustomerCenterModelType {
  namespace: 'customerCenter';
  state: CustomerCenterModelState;
  effects: {
    queryBuyedList: Effect;
    queryCartList: Effect;
    queryCartListLocal: Effect;
  };
  reducers: {
    save: Reducer<CustomerCenterModelState>;
  };
}

const CustomerCenterModel: CustomerCenterModelType = {
  namespace: 'customerCenter',

  state: {
    buyedData: {
      pageNum: 1,
      list: [],
      hasMore: true,
      searchValue: '',
    },
    cartData: {
      pageNum: 1,
      list: [],
      hasMore: false,
      searchValue: '',
    },
  },

  effects: {
    *queryBuyedList({ payload = {} }, { call, put, select }) {
      const { buyedData = {} } = yield select((_: { customerCenter: any }) => _.customerCenter);
      let { pageNum = 1, list = [] } = buyedData;
      const { pageOne = false } = payload;
      if (pageOne) {
        list = [];
      }
      const { records = [], current = 1, pages = 0 } = yield call(qryBuyGoodsPageService, {
        pageNum: pageOne ? 1 : pageNum,
        pageSize: 20,
        goodsName: buyedData?.searchValue,
      });
      let hasMore = true;
      if (current >= pages) {
        hasMore = false;
      }
      const list1 = chunk(records, 2).reverse().concat(list);
      yield put({
        type: 'save',
        payload: {
          buyedData: {
            pageNum: current + 1,
            list: list1,
            hasMore,
            searchValue: buyedData?.searchValue,
          },
        },
      });
    },
    *queryCartListLocal({ payload = {} }, { call, put, select }) {
      const { cartData = {} } = yield select((_: { customerCenter: any }) => _.customerCenter);
      const { skuList = [] } = yield select((_: any) => _.indexList);
      let list = skuList;
      if (cartData?.searchValue) {
        list = skuList.filter((it: any) => it.goodsName.indexOf(cartData?.searchValue) !== -1);
      }
      const list1 = chunk(list, 2).reverse();

      yield put({
        type: 'save',
        payload: {
          cartData: {
            pageNum: 1,
            list: list1,
            hasMore: false,
            searchValue: cartData?.searchValue,
          },
        },
      });
    },
    *queryCartList({ payload = {} }, { call, put, select }) {
      const { cartData = {} } = yield select((_: { customerCenter: any }) => _.customerCenter);
      let { pageNum = 1, list = [] } = cartData;
      const { searchValue = '', pageOne = false } = payload;
      if (pageOne) {
        list = [];
      }
      const { records = [], current = 1, pages = 0 } = yield call(qryCartItemPageService, {
        pageNum: pageOne ? 1 : pageNum,
        pageSize: 20,
        goodsName: searchValue,
      });
      let hasMore = true;
      if (current >= pages) {
        hasMore = false;
      }
      const list1 = chunk(records, 2).reverse().concat(list);
      yield put({
        type: 'save',
        payload: {
          cartData: {
            pageNum: current + 1,
            list: list1,
            hasMore,
          },
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

export default CustomerCenterModel;
