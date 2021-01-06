import React, { FC, useEffect, useRef, useState } from 'react';
import { OrderListModelState, ConnectProps, connect, history } from 'alita';
import styles from './index.less';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import { Modal, Toast } from 'antd-mobile';
import OrderListCell from '../components/OrderListCell';
import { queryCustOrderPageToApp } from '@/services/orderApi';

const Alert = Modal.alert;

interface PageProps extends ConnectProps {
  orderList: OrderListModelState;
}

const OrderListPage: FC<PageProps> = ({ orderList, dispatch }) => {
  const [reqParams, updateReqParams] = useState({
    pageNum: 1,
    pageSize: 5,
  });
  const { name } = orderList;
  const loadMoreList = useRef<LoadMoreListAttributes>(null);

  // 这里发起了初始化请求
  useEffect(() => {
    return () => {};
  }, []);
  /**
   * 每个商品的点击事件
   * @param item
   */
  const itemClick = (orderId: string) => {
    history.push({
      pathname: '/order/orderDetail',
      query: { orderId },
    });
  };
  /**
   *
   */
  const cancelOrder = (data: any) => {
    const { orderId } = data;

    Alert('提示', '确定取消该订单?', [
      {
        text: '确定',
        onPress: () => {
          dispatch!({
            type: 'orderList/cancelOrderById',
            payload: {
              orderId,
            },
          }).then((res: any) => {
            let msg = '';
            if (res.success) {
              msg = '取消成功';
              updateReqParams({
                pageNum: 1,
                pageSize: 5,
              });
              loadMoreList.current?.reloadDataSource();
            } else {
              msg = '取消失败';
            }
            Toast.info(msg);
            // console.log('===========:' + JSON.stringify(res));
          });
        },
      },
      { text: '再等等', onPress: () => {} },
    ]);
  };

  const renderRow = (rowData: any) => (
    <OrderListCell data={rowData} itemClick={itemClick} cancelOrder={cancelOrder} />
  );
  const getListData = async (params: object) => {
    return new Promise((resolve, reject) => {
      queryCustOrderPageToApp(params)
        .then((res: any) => {
          // console.log('订单列表：' + JSON.stringify(res))
          const { records = [], total = 0 } = res;
          const dataSource = { data: records, total: total };
          resolve(dataSource);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };
  return (
    <div className={styles.orderList}>
      <LoadMoreListView
        ref={loadMoreList}
        requestFunc={getListData}
        renderRow={renderRow}
        requestParams={reqParams}
        alias={{ page: 'pageNum' }}
      />
    </div>
  );
};

export default connect(({ orderList }: { orderList: OrderListModelState }) => ({ orderList }))(
  OrderListPage,
);
