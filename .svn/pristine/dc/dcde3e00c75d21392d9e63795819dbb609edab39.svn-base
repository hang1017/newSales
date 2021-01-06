import { apiCode } from '@/utils/apiConfig';
import { requestWithParams } from './api';

/**
 * 查询流量详单
 */
export async function qryFlowDetailService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryFlowDetailApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 查询短信详单
 */
export async function qryMessageDetailService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryMessageDetailApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 查询语音详单
 */
export async function qryVoiceDetailService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryVoiceDetailApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 详单身份认证接口
 */
export async function identityAuthService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.identityAuthApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
