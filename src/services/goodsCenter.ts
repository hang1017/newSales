import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

/**
 * 根据商品Id,查询商品详情
 * @param requestParams
 */
export async function queryGoodsDetailByIds(requestParams: any): Promise<any> {
  const params = {
    apiCode: `${apiCode.queryGoodsDetailById}?goodsId=${requestParams.goodsId}`,
    requestObject: {},
  };
  return requestWithParams(params, HttpMethod.post);
}

/**
 * 根据销售属性筛选SKU
 * @param requestParams
 */
export async function queryDetailByAttr(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryDetailByAttr,
    requestObject: requestParams,
  };
  return requestWithParams(params);
}
/**
 * 查询特定的商品列表
 * @param requestParams
 */
export async function queryGoodsPage(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryGoodsPage,
    requestObject: requestParams,
  };
  return requestWithParams(params);
}

/**
 * 查询商品服务
 * @param requestParams
 */
export async function qryGoodsSpecialRuls(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryAutoOrderGoods,
    requestObject: requestParams,
  };
  return requestWithParams(params);
}
