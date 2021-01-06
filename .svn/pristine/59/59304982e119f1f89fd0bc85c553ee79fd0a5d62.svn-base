import { request } from 'alita';
import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, HttpMethod, uploadFiles } from './api';

export async function query(): Promise<any> {
  return request('/api/hello');
}

export async function queryList(data: any): Promise<any> {
  return request('/api/list', { data, method: 'post' });
}

export async function queryMyOrderList(data: any): Promise<any> {
  return request('/api/myOrderlist', { data, method: 'post' });
}

export async function queryOrderDetail(data: any): Promise<any> {
  return request('/api/orderDetail', { data, method: 'post' });
}

// 账号密码登录;
export async function loginPassword(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.loginPassword,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 发送验证码
export async function sendMsgCode(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.sendMsgCode,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 校验注册会员手机号码是否存在
export async function checkMemberPhone(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.checkMemberPhone,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 会员注册
export async function registerMemberForPhone(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.registerMemberForPhone,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 校验手机验证码
export async function checkMsgCode(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.checkMsgCode,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 查询会员详情，包括会员信息、地址信息和账户信息
export async function getMemberDetail(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.getMemberDetail,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 短信登陆
export async function loginMsg(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.loginMsg,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 修改会员信息
export async function updateMember(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.updateMember,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 修改密码
export async function updateMemberPassword(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.updateMemberPassword,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 新增收获地址
export async function addAddress(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addAddress,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 获取用户信息
export async function loginApp(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.loginApp,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 修改收获地址
export async function updateAddress(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.updateAddress,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 查询收获地址
export async function queryAddress(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryAddress,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 删除收获地址
export async function deleteAddress(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.deleteAddress,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function iDCardCheckAndSave(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.iDCardCheckAndSave,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function iDCardCheckAndCheck(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.iDCardCheckAndCheck,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function faseIDCardAnalysis(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.faseIDCardAnalysis,
    requestObject: requestParams,
  };
  return requestWithParams(params);
}

export async function natEmblemIDCardAnalysis(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.natEmblemIDCardAnalysis,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function livingCertification(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.livingCertification,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function archivesUpAndCertification(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.archivesUpAndCertification,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
export async function qryMyNumberInstList(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryMyNumberInstList,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
export async function cancelRequest(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.cancel,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}
export async function delayRequest(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.delay,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
export async function queryMemberLevel(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryMemberLevel,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

export async function modHeaderPortraitService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.modHeaderPortraitApi,
    requestObject: requestParams,
  };
  return uploadFiles(params);
}

export async function loginAppService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.loginApp,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, false);
}

export async function qryBalance(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryBalance,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function logout(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.logout,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, false);
}
// 统计量查询
export async function dmosbrowse(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.dmosbrowse,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, false);
}

// 会员实人认证
export async function realPersonAuthService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.realPersonAuthApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true, 80);
}
// 获取签约列表
export async function contractList(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.contractList,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}
// 签约
export async function make(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.make,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}
// 取消服务
export async function cancelContract(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.cancelContract,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

// 获取签约号码-个人中心
export async function numberList(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.numberList,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 获取签约号码-个人中心
export async function qryMyConsumeUsageAll(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.qryMyConsumeUsageAll,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.get);
}

export async function instQryService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.instQryApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function receiveCouponUnclaimedService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.receiveCouponUnclaimedApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 获取主数据
export async function getAttrCacheByAttrNbr(requestParams: any): Promise<any> {
  const { attrNbr } = requestParams;
  const params = {
    apiCode: `${apiCode.getAttrCacheByAttrNbr}?attrNbr=${attrNbr}`,
    // requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
