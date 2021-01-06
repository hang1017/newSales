// loginToken
import { apiCode } from '@/utils/apiConfig';
import { uploadFiles, requestWithParams, HttpMethod } from './api';

// 账号密码登录;
export async function loginToken(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.loginToken,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}

export async function genAppLoginMsgCode(requestParams: any): Promise<any> {
  const params = {
    apiCode: `${apiCode.genAppLoginMsgCode}?phone=${requestParams.phone}&graphValidateCode=${requestParams?.graphValidateCode}&uuid=${requestParams?.uuid}`,
    requestObject: {},
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

export async function addUserMember(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addUserMember,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
export async function addRegistAndLogin(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addRegistAndLogin,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

export async function smsLogin(requestParams: any): Promise<any> {
  const { phone } = requestParams;
  const params = {
    apiCode: apiCode.smsLogin,
    requestObject: { ...requestParams, mobile: phone },
    // textPlain: true,
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

export async function addEmergencyOrder(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addEmergencyOrder,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 配置接口改造
 */
export async function getH5ConfigurationService(requestParams: any): Promise<any> {
  const params = {
    apiCode: `${apiCode.getH5ConfigurationApi}?propertyName=${requestParams.propertyName}`,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post);
}

/**
 * 获取滑块验证
 */
export async function getSlideVerificationCode(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.getSlideVerificationCode,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 滑块验证
 */
export async function checkSlideVerificationCode(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.checkSlideVerificationCode,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

/**
 * 渠道验证
 */
export async function checkSaleChannelNbrOpenStatus(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.checkSaleChannelNbrOpenStatus,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

/**
 *
 */
export async function checkCodeService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.checkCodeApi,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}
