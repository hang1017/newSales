import { request } from 'alita';
import { apiCode } from '@/utils/apiConfig';
import { requestWithParams } from './api';

export async function queryEvaluteList(data: any): Promise<any> {
  return request('/api/beEvalute', { data, method: 'post' });
}

// 查询我的订单列表
export async function queryCustOrderPageToApp(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryCustOrderPageToApp,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// 查询我的订单详情
export async function queryCustOrderDetailToApp(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryCustOrderDetailToApp,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
// 重新支付
export async function orderPaymentForJFUsingPOST(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.orderPaymentForJF,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
// 取消订单
export async function cancelOrderById(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.cancelOrderById,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// buyerReceive 确认收货
export async function buyerReceive(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.buyerReceive,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

// queryInvoiceByOrderId
export async function queryInvoiceByOrderId(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryInvoiceByOrderId,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

export async function receiveOrderPayResultNotify(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.receiveOrderPayResultNotify,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 订单的物流跟踪
 * @param requestParams
 */
export async function queryExpressInfo(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryExpressInfo,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 订单状态统计
 * @param requestParams
 */
export async function countOrderStatus(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.countOrderStatus,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
/**
 * 订单的交易快照查询
 * @param requestParams
 */
export async function qryOrderSnapshot(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryOrderSnapshotApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 支付结果回调
 * @param requestParams
 */
export async function payStatus(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.payStatus,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
/**
 * 支付结果回调
 * @param requestParams
 */
export async function queryNoSignPhoneNum(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryNoSignPhoneNum,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 售后申请
 * @param requestParams
 */
export async function addOrderApply(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.addOrderApply,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}

/**
 * 通过订单id 查询内容
 */
export async function quryOrderBaseInfoByOrderIdService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.quryOrderBaseInfoByOrderIdApi,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
