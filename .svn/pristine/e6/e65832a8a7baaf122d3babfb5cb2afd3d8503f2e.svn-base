import { apiCode } from '@/utils/apiConfig';
import { requestWithParams } from './api';

// bilibili用户查询号码信息
export async function queryPhoneNumInfoForBilibiliService(requestParams: any): Promise<any> {
  const params = {
    apiCode: apiCode.queryPhoneNumInfoForBilibili,
    requestObject: { ...requestParams },
  };
  return requestWithParams(params);
}
