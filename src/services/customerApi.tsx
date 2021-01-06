import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

/**
 * 查询类目列表数据
 */
export async function queryGoodsByFgCategoryService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryGoodsByFgCategoryApi,
    requestObject: requestParams,
  };
  return requestWithParams(params);
}

/**
 * 根据父类目ID查询所有生效子类目
 */
export async function queryFgCategoryByParIdService(requestParams: any): Promise<any> {
  const params = {
    apiCode: requestParams.url,
    requestObject: {},
  };
  return requestWithParams(params, HttpMethod.get);
}
/**
 * 查询类目列表数据
 */
export async function queryGoodsByStoreCatalog(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryGoodsByStoreCatalog,
    requestObject: requestParams,
  };
  return requestWithParams(params);
}

/**
 * 确认用户的实名认证是否可用
 */
export async function checkMemberIdCardNumService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.checkMemberIdCardNumApi,
    requestObject: requestParams,
  };
  return requestWithParams(params);
}
