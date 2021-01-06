import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, uploadFiles } from './api';

/**
 * 查询客服模块的宝贝列表
 */
export async function qryCartItemPageService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryCartItemPageApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 查询客服模块宝贝已购买列表
 */
export async function qryBuyGoodsPageService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryBuyGoodsPageApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function uploadFileService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.uploadFileApi,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}

/**
 * 在线客服历史会话记录
 */
export async function qryCscOnlineMsgInfoService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryCscOnlineMsgInfoApi,
    requestObject: { ...requestParams },
  };

  return requestWithParams(params);
}

/**
 * 判断客服进入的是IM客服还是新客服
 */
export async function qryOnlineSourceService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryOnlineSourceAPi,
    requestObject: { ...requestParams },
  };

  return requestWithParams(params);
}
