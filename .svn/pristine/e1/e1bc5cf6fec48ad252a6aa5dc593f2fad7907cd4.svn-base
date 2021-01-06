import { apiCode } from '@/utils/apiConfig';
import { requestWithParams } from './api';

/**
 * 立即购买（含新增会员基础信息）
 */
export async function commitCartQuickByMemberService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.commitCartQuickByMemberApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 快捷下单-交易中心的注册登录返回地址的接口
 */
export async function cartLoginService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.cartLoginApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 星座包权益列表查询
 */
export async function qryConstellationRightsService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryConstellationRightsApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
