import { request } from 'alita';


// 查询抽奖活动详情
export async function queryLotteryDetail(requestParams: any): Promise<any> {
  return request(`/consumer/pms/raffleDraw/queryById?raffleDrawId=${requestParams.raffleDrawId}`, { method: 'get' });
}
