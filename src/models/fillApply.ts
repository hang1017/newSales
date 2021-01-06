import { Reducer } from 'redux';
import { addOrderApply } from '@/services/orderApi';
import { getAttrCacheByAttrNbr } from '@/services/memberApi';
import { custConfirm, omsUploadImg } from '@/services/orderApplyCenter'
import { Effect, history } from 'alita';
import { Toast } from 'antd-mobile';

export interface FillApplyModelState {
  reasonList: any;
  formValues: any;
}

export interface FillApplyModelType {
  namespace: 'fillApply';
  state: FillApplyModelState;
  effects: {
    addOrderApply: Effect;
    getAttrCacheByAttrNbr: Effect;
    custConfirm: Effect;
    omsUploadImg: Effect;
  };
  reducers: {
    save: Reducer<FillApplyModelState>;
  };
}

const FillApplyModel: FillApplyModelType = {
  namespace: 'fillApply',

  state: {
    reasonList: [],
    formValues: {}
  },

  effects: {
    *addOrderApply({ payload }, { call, put }) {
      const data = yield call(addOrderApply, payload);
      setTimeout(() => {
        history.push({
          pathname: '/afterSale/refundResult',
          query: {
            itemData: JSON.stringify(data)
          }
        });
      }, 500);


    },
    *getAttrCacheByAttrNbr({ payload }, { call, put }) {
      const data = yield call(getAttrCacheByAttrNbr, payload);
      const reasonList: any[] = [];
      if (data && data.attrValueCOs) {
        data.attrValueCOs.map(item => {
          const { attrValueName, attrValue } = item;
          reasonList.push({
            label: attrValueName,
            value: attrValue,
          });
        })
      }
      return reasonList;

    },
    *custConfirm({ payload }, { call, put }) {
      const data = yield call(custConfirm, payload);
      const { success, errMessage } = data;
      if (success) {
        setTimeout(() => {
          history.push({
            pathname: '/afterSale/refundResult',
            query: {
              itemData: JSON.stringify({
                applyId: payload.applyId
              })
            }
          });
        }, 500);
      }
      else {
        Toast.fail(errMessage, 2)
      }
    },
    *omsUploadImg({ payload }, { call, put }) {
      const data = yield call(omsUploadImg, payload);
      // console.log(data)

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

export default FillApplyModel;
