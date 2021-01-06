import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

// 根据商品id查询活动信息
export async function promByGoodsQry(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.promByGoodsQry,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
export async function qryRights(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryRights,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}
export async function qryRightsGoods(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryRightsGoods,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}
