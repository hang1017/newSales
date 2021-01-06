import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

/**
 * 查询消费使用余量
 * @param requestParams
 */
export async function qryMyConsumeUsage(requestParams: any): Promise<any> {
  const params = {
    apiCode: `${apiCode.qryMyConsumeUsage}?teleBusiType=${requestParams.teleBusiType}`,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 查询壁纸
 */
export async function qryWallpaperService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryWallpaperApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}

/**
 * 券兑换核销
 */
export async function exchangeCouponService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.exchangeCouponApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 兑换后的壁纸查询
 */
export async function qryRedeemedWallpaperService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryRedeemedWallpaperApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}
/**
 * 生成并发送短信验证码 - 修改绑定手机号码时使用
 */
export async function addSendMsgCode(requestParams: any): Promise<any> {
  const params = {
    apiCode: `${apiCode.addSendMsgCode}?phone=${requestParams.phone}&smsType=${requestParams?.smsType}`,
    requestObject: {},
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}
/**
 * 用户修改自身绑定手机
 */
export async function resetPhoneForSelf(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.resetPhoneForSelf,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}
