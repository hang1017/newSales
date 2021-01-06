import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, uploadFiles } from './api';

/**
 * 查询商品评价标签
 * @param requestParams
 */
export async function queryEvaluationLabel(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryEvaluationLabel,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 查询商品评价列表
 * @param requestParams
 */
export async function querySellerCommentsPage(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.querySellerCommentsPage,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 新增商品、物流、店铺评价
 * @param requestParams
 */
export async function addEvaluation(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addEvaluation,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 文件上传
 * @param requestParams
 */
export async function uploadToPublic(requestParams: any): Promise<any> {
  console.log({ ...requestParams });
  const params = {
    apiCode: apiCode.uploadToPublic,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}
