import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

/**
 * 查询页面服务
 */
export async function qryPageDetailCacheService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryPageDetailCacheApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}
