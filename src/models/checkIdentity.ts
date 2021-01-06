import { Reducer } from 'redux';
import { Toast } from 'antd-mobile';
import {
  idCardBackSideVerifyService,
  idCardFrontSideVerifySerivce,
  faceAnalysisVerifyService,
  queryCustOrderPageToAppService,
  uploadAgreement,
  uploadAgreementPic,
} from '@/services/emergencyApi';
import Utils from '@/utils/tool';
import { Effect } from 'alita';

export interface CheckIdentityModelState {
  name: string;
}

export interface CheckIdentityModelType {
  namespace: 'checkIdentity';
  state: CheckIdentityModelState;
  effects: {
    idCardBackSideVerifyModel: Effect; // 二次业务(补卡)身份证头像面校验
    idCardFrontSideVerifyModel: Effect; // 二次业务(补卡)身份证国徽面面校验
    faceAnalysisVerifyModel: Effect; // 二次业务(补卡)免冠照校验
    queryCustOrderPageToAppModel: Effect; // 二次业务校验手机号码
    queryUploadAgreement: Effect; // 上传承诺书
    queryUploadAgreementPic: Effect; // 上传手持承诺书
  };
  reducers: {
    save: Reducer<CheckIdentityModelState>;
  };
}

const CheckIdentityModel: CheckIdentityModelType = {
  namespace: 'checkIdentity',

  state: {
    name: '',
  },

  effects: {
    *idCardBackSideVerifyModel({ payload }, { call, put }) {
      const data = yield call(idCardBackSideVerifyService, payload);
      if (data) {
        yield put({
          type: 'emerPayConfirm/save',
          payload: {
            idCardInfo: data,
          },
        });
        return data?.msgSeq || '';
      }
      return '';
    },
    *idCardFrontSideVerifyModel({ payload }, { call, put }) {
      const data = yield call(idCardFrontSideVerifySerivce, payload);
      console.log(data);
    },
    *faceAnalysisVerifyModel({ payload }, { call, put }) {
      const data = yield call(faceAnalysisVerifyService, payload);
      console.log(data);
      if (data) {
        const { tokenCode = '', msgSeq = '' } = data;
        Utils.setStorage('tokenCode', tokenCode);
        return msgSeq;
      }
      return '';
    },
    *queryCustOrderPageToAppModel({ payload }, { call, put }) {
      const data = yield call(queryCustOrderPageToAppService, payload);
      if (data?.success) {
        if (data?.data?.serviceOffer) {
          return data?.data?.serviceOffer;
        }
        return '1';
      }
      Toast.fail(data?.errMessage, 1);
      return '';
    },
    // 上传承诺书
    *queryUploadAgreement({ payload }, { call }) {
      const data = yield call(uploadAgreement, payload);
      if (data) {
        return data;
      }
      return {};
    },
    *queryUploadAgreementPic({ payload }, { call, put }) {
      const data = yield call(uploadAgreementPic, payload);
      if (data) {
        return data;
      }
      return {};
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

export default CheckIdentityModel;
