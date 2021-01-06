import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod } from './api';

export async function addMemberInvoice(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addMemberInvoiceTemplate,
    requestObject: requestParams,
  };
  return requestWithParams(params, HttpMethod.post);
}

export async function addInvoice(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addInvoice,
    requestObject: requestParams,
  };
  return requestWithParams(params, HttpMethod.post);
}

/**
 * 查询发票详情
 */
export async function queryInvoiceByOrderIdService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryInvoiceByOrderId,
    requestObject: requestParams,
  };
  return requestWithParams(params, HttpMethod.post);
}

/**
 * 订单填写页面发票校验
 */
export async function queryTemplateNameByAccNumService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryTemplateNameByAccNumApi,
    requestObject: requestParams,
  };
  return requestWithParams(params, HttpMethod.post);
}

/**
 * 个人中心开发票校验
 */
export async function getInvoiceTemplateNameService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.getInvoiceTemplateNameApi,
    requestObject: requestParams,
  };
  return requestWithParams(params, HttpMethod.post);
}
