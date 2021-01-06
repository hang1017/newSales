import { Reducer } from 'redux';
import { Effect } from 'alita';
import { queryGoodsPage } from '@/services/goodsCenter';

export interface SelectedPackagesModelState {
  dataList: Array<any>;
  pageNum: number;
  isLoadMore: Boolean; // 是否已经加载完
}

export interface SelectedPackagesModelType {
  namespace: 'selectedPackages';
  state: SelectedPackagesModelState;
  effects: {
    queryGoodsPage: Effect;
  };
  reducers: {
    save: Reducer<SelectedPackagesModelState>;
  };
}

const SelectedPackagesModel: SelectedPackagesModelType = {
  namespace: 'selectedPackages',

  state: {
    dataList: [],
    pageNum: 1,
    isLoadMore: false,
  },

  effects: {
    *queryGoodsPage({ payload }, { call, put }) {
      const data = yield call(queryGoodsPage, {
        labelCode: payload.labelCode,
        pageNum: payload.pageNum,
        pageSize: 10,
      });
      console.log(data);
      let dataLists: any = [];
      let tempAttrList: any = [];
      let isLoadMore1 = false;
      if (data.records.length < 10) {
        isLoadMore1 = true;
      }
      data.records.map((item) => {
        const { highestPrice, lowestPrice, highCommentRate, total } = item;
        const price = highestPrice === lowestPrice ? lowestPrice : lowestPrice + '-' + highestPrice;
        tempAttrList.push({
          icon: item.filePathInServer,
          title: item.goodsName,
          price: price,
          goodsId: item.goodsId,
          highCommentRate,
          total,
        });
      });
      if (parseInt(data.pages) === 1) {
        dataLists = tempAttrList;
      } else {
        dataLists = dataLists.concat(tempAttrList);
      }

      yield put({
        type: 'save',
        payload: { dataList: dataLists, isLoadMore: isLoadMore1 },
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

export default SelectedPackagesModel;
