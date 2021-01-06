import { Reducer } from 'redux';
import { Effect } from 'alita';
import { qryServiceOfferByKeyAttrService } from '@/services/emergencyApi';
import PromotionImg from '@/assets/promotionImg.png';

export interface EmergencyListModelState {
  emList: any[];
}

export interface EmergencyListModelType {
  namespace: 'emergencyList';
  state: EmergencyListModelState;
  effects: {
    qryList: Effect;
  };
  reducers: {
    save: Reducer<EmergencyListModelState>;
  };
}

const EmergencyListModel: EmergencyListModelType = {
  namespace: 'emergencyList',

  state: {
    emList: [],
  },

  effects: {
    *qryList({ payload }, { call, put }) {
      // const data = Array.from(new Array(9)).map((_val, i) => ({
      //   id: i,
      //   filePathInServer: PromotionImg,
      //   goodsName: `挂失解挂${i}`,
      //   skuName:
      //     '挂失解挂挂失解挂挂失解挂挂失解挂挂失解挂挂失解挂挂失解挂挂失解挂解挂挂失解挂解挂挂失解挂解挂挂失解挂解挂挂失解挂',
      //   salesPrice: 20,
      // }));
      const data = yield call(qryServiceOfferByKeyAttrService, {
        // Communication_Busi_Type: [],
        // categoryCode: 'Secondary_Business',
        attrList: {
          Communication_Busi_Type: [],
        },
        categoryCode: 'Secondary_Business',
      });
      yield put({
        type: 'save',
        payload: {
          emList: data,
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

export default EmergencyListModel;
