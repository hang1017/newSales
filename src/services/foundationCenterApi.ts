import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod, uploadFiles } from './api';

/**
 * 查询一级的地址
 * @param requestParams
 */
export async function queryAreaFatherList(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryAreaFatherList,
    requestObject: { parentId: -1, ...requestParams },
  };
  return uploadFiles(params);
}
/**
 * 查询一级的地址
 * @param requestParams
 */
export async function queryAreaByLimitCond(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryAreaByLimitCond,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post);
}
/**
 * 根据父id 查询子极
 * @param requestParams
 */
export async function queryAreaNextLevel(parentId: string): Promise<any> {
  const params = {
    apiCode: `${apiCode.queryAreaNextLevel}`,
    requestObject: { parentId },
  };
  return uploadFiles(params);
}

/**
 * 归属地选址，根据父级查询子级
 */
export async function queryLimitChildAreaByParentIdService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryLimitChildAreaByParentIdApi,
    requestObject: requestParams,
  };
  return uploadFiles(params);
}
