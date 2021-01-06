import { apiCode } from '@/utils/apiConfig';
import { requestWithParams, uploadFiles, HttpMethod } from './api';

//  申请退款-申请退款提交服务
export async function addRefundApply(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addRefundApply,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 退货退款-申请单生成
export async function addReturnApply(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addReturnApply,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 申请单分页查询
export async function queryOrderApplyPage(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryOrderApplyPage,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 申请单详情查询
export async function quryApplyDetail(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.quryApplyDetail,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 撤销申请
export async function cancelApply(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.cancelApply,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 修改申请单信息
export async function editApplyInfo(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.editApplyInfo,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 文件上传
 * @param requestParams
 */
export async function omsUploadImg(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.omsUploadImg,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}

/**
 * 文件上传
 * @param requestParams
 */
export async function queryApplyHistoryByApplyId(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryApplyHistoryByApplyId,
    requestObject: { ...requestParams },
  };
  return uploadFiles(params);
}

/**
 *售后-修改申请
 * @param requestParams
 */
export async function custConfirm(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.custConfirm,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}

/**
 *售后-修改申请
 * @param requestParams
 */
export async function returnApplyBuyerDeliver(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.returnApplyBuyerDeliver,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params, HttpMethod.post, true, true);
}
