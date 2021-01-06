import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

/**
 * 下单助力分享
 */
export async function boostActivityShareService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.boostActivityShareApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 助力活动详情
 */
export async function qryBoostActivityInstDetailByIdService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryBoostActivityInstDetailByIdApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}

/**
 * 助力好友点亮头像
 */
export async function addBoostActivityInstDetailService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addBoostActivityInstDetailApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
