import { apiCode } from '@/utils/apiConfig';
import { HttpMethod, requestWithParams } from './api';

/**
 * 抽奖请求接口
 */
export async function joinRaffleDrawService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.joinRaffleDrawApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}
/**
 * 抽奖结果查询接口
 */
export async function queryRaffleDrawResultByMemberService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryRaffleDrawResultByMemberApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}
/**
 * 查询时间以及校验是否有抽奖权限接口
 */
export async function raffleDrawTimeAndAuthorityService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.raffleDrawTimeAndAuthorityApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

/**
 * 订单数和skuId查询
 */
export async function querySkuIdAndOrderCountService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.querySkuIdAndOrderCountApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post);
}
