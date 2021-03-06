/* eslint-disable no-empty */
/* eslint-disable require-yield */
import { Reducer } from 'redux';
import {
  queryGoodsByFgCategoryService,
  queryFgCategoryByParIdService,
  queryGoodsByStoreCatalog,
} from '@/services/customerApi';
import { tmscalFee } from '@/services/tradingCenter';
import { dmosbrowse } from '@/services/memberApi';
import { qryPageDetailCacheService } from '@/services/scms';
import { checkSaleChannelNbrOpenStatus } from '@/services/basicApi';
import { Effect, router } from 'alita';

export interface IndexListModelState {
  tabData: any; // 类目全部数据
  activeGoodData: any; // 当前选中增加或减少的数据
  cartAllData: any; // 购物车全部数据，商品列表，赠品列表，总金额等等
  tabs: any[]; // 左侧tab 列表
  tabActiveId: number;
  skuQueryList: any[]; // 属性的查询的数据
  skuList: any[]; // sku列表
  carouselList: any[]; // 首页轮播图列表
}

export interface IndexListModelType {
  namespace: 'indexList';
  state: IndexListModelState;
  effects: {
    queryGoodsByFgCategoryModels: Effect;
    calFeeModels: Effect;
    dmosbrowse: Effect;
    goToIndexList: Effect;
    checkSaleChannelNbrOpenStatus: Effect;
    qryPageDetailCacheModal: Effect;
  };
  reducers: {
    save: Reducer<IndexListModelState>;
  };
}

const IndexListModel: IndexListModelType = {
  namespace: 'indexList',

  state: {
    tabData: [], // 类目全部数据
    activeGoodData: {
      categoryId: '',
      goodDetail: {},
    }, // 当前选中增加或减少的数据
    cartAllData: {}, // 购物车全部数据，商品列表，赠品列表，总金额等等
    tabs: [], // 左侧tab 列表
    tabActiveId: 0, // 当前选中的tab
    skuQueryList: [], // 属性的查询的数据
    skuList: [],
    carouselList: [],
  },

  effects: {
    *queryGoodsByFgCategoryModels({ payload = {} }, { call, put }) {
      try {
        const params = yield call(queryFgCategoryByParIdService, {
          url: `/consumer/sms/saleCatalog/level/list`,
        });
        // if (params && params.length) {
        const categoryList = params.map((it: any) => {
          return { catalogId: it.catalogId, name: it.name };
        });
        const source = localStorage.getItem('source');
        const sn = localStorage.getItem('sn');
        // const data = yield call(queryGoodsByStoreCatalog, categoryList);
        const data = yield call(queryGoodsByStoreCatalog, {
          catalogList: categoryList,
          source: source || '',
          sn: sn || '',
        });
        return data;
        // }
      } catch (e) {}
    },
    *dmosbrowse({ payload }, { call, put }) {
      const data = yield call(dmosbrowse, payload);
    },
    *calFeeModels({ payload = {} }, { call, put }) {
      const { goodsList = [] } = payload;
      try {
        const data = yield call(tmscalFee, payload);
        let params = {
          ...data,
        };
        if (data.storeList && data.storeList.length) {
          let giftList: any[] = [];
          let rightsList: any[] = [];
          data.storeList.map((sItem: any) => {
            giftList = [...giftList, ...sItem.giftList];
            if (sItem.rightsList && sItem.rightsList.length) {
              rightsList = [...rightsList, ...sItem.rightsList];
            }
          });
          params = {
            ...data,
            giftList,
            rightsList,
          };
        }
        yield put({
          type: 'save',
          payload: {
            cartAllData: params,
            skuList: goodsList,
          },
        });
      } catch (e) {}
    },
    *goToIndexList() {
      const source = localStorage.getItem('source') || '';
      const sn = localStorage.getItem('sn') || '';
      const salesCode = localStorage.getItem('salesCode') || '';
      const test = localStorage.getItem('test') || '';
      // localStorage.setItem('test', '') // 将值还原
      if (source && sn) {
        router.push({
          pathname: '/customer/indexList',
          query: {
            source,
            sn,
            salesCode,
            test,
          },
        });
      } else {
        router.push({
          pathname: '/customer/indexList',
          query: {
            test,
          },
        });
      }
    },
    *checkSaleChannelNbrOpenStatus({ payload }, { call, put }) {
      const data = yield call(checkSaleChannelNbrOpenStatus, payload);
      return data;
    },
    *qryPageDetailCacheModal({ payload }, { call, put }) {
      try {
        const data = yield call(qryPageDetailCacheService, payload);
        if (data) {
          const { pageWidgetQryCacheCOList = [] } = data;
          if (pageWidgetQryCacheCOList && pageWidgetQryCacheCOList.length) {
            yield put({
              type: 'save',
              payload: {
                carouselList: pageWidgetQryCacheCOList[0].widgetDetailQryCacheCOList,
              },
            });
          }
        }
      } catch (e) {}
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

export default IndexListModel;
