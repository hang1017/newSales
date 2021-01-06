import { apiCode } from '@/utils/apiConfig';
import { HttpMethod, requestWithParams, uploadFiles } from './api';

/**
 * 根据关键属性查询sku和商品
 */
export async function qryServiceOfferByKeyAttrService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryServiceOfferByKeyAttrApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * -- 立即办理（二次业务）
 */
export async function commitCartSecondService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.commitCartSecondApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, false, 30);
}

/**
 * 二次业务(补卡)身份证头像面校验
 */
export async function idCardBackSideVerifyService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.idCardBackSideVerifyApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, false, 30);
}

/**
 * 二次业务(补卡)身份证国徽面面校验
 */
export async function idCardFrontSideVerifySerivce(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.idCardFrontSideVerifyApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, false, 30);
}

/**
 * 二次业务(补卡)免冠照校验
 */
export async function faceAnalysisVerifyService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.faceAnalysisVerifyApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, false, 30);
}

/**
 * 二次业务校验手机号码
 */
export async function queryCustOrderPageToAppService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.checkPhoneNumFromSalesApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

/**
 * 上传承诺书
 */
export async function uploadAgreement(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.uploadAgreement,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}
/**
 * 上传手持承诺书
 */
export async function uploadAgreementPic(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.uploadAgreementPic,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}

/**
 * 上传手持承诺书
 */
export async function getSystemParamsCacheByCode(requestParams: any): Promise<any> {
  const params = {
    apiCode: `${apiCode.getSystemParamsCacheByCode}?paramCode=${requestParams.paramCode}`,
    requestObject: { },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}