import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

// 查询会员的业务号码
export async function queryPhoneNumByMemberIdService(): Promise<any> {
  const params = {
    apiCode: apiCode.queryPhoneNumByMemberIdApi,
    requestObject: {},
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

// 通过业务号码查询商品列表（充值）
export async function qrySkuListService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qrySkuListApi,
    requestObject: requestParams,
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

// 立即订购（算费）
export async function commitCartQuickService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.commitCartQuickApi,
    requestObject: requestParams,
  };
  return requestWithParams(params, HttpMethod.post);
}

// 购物车订单提交
export async function cartOrdercommitOrderService(): Promise<any> {
  const params = {
    apiCode: apiCode.cartOrdercommitOrderApi,
    requestObject: {},
  };
  return requestWithParams(params, HttpMethod.post);
}
