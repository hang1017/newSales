/* eslint-disable no-unused-expressions */
import React, { FC, useEffect, useState, useRef } from 'react';
import { MyOrderModelState, ConnectProps, connect, setPageNavBar, history } from 'alita';
import { Modal, Toast } from 'antd-mobile';

import { queryCustOrderPageToApp } from '@/services/orderApi';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';

import OrderListCell from '@/pages/bili/components/OrderListCell';
import styles from './index.less';

const Alert = Modal.alert;
interface PageProps extends ConnectProps {
  myOrder: MyOrderModelState;
}

const MyOrderPage: FC<PageProps> = ({ dispatch, location }) => {
  const { activeIndex = 0, type = '' } = location?.query || {};

  const [currentIndex, updateIndex] = useState(parseInt(activeIndex, 10));
  const tabList = [
    { label: '全部订单', key: 0 },
    { label: '待付款', key: 1 },
    { label: '待发货', key: 2 },
    { label: '待收货', key: 3 },
    // { label: '已发货', key: 3 },
    { label: '已完成', key: 4 },
  ];

  const [reqParams, updateReqParams] = useState({});

  const loadMoreList = useRef<LoadMoreListAttributes>(null);
  /**
   * 每个商品的点击事件
   * @param item
   */
  const itemClick = (orderId: string) => {
    history.push({
      pathname: '/order/orderDetail',
      query: { orderId, activeIndex: currentIndex },
    });
  };

  const shouldRefresh = () => {
    if (loadMoreList.current) loadMoreList.current?.reloadDataSource();
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
                pageSize: 10,
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
    <OrderListCell
      data={rowData}
      dispatch={dispatch}
      itemClick={itemClick}
      cancelOrder={cancelOrder}
      shouldRefresh={shouldRefresh}
    />
  );
  // 这里发起了初始化请求
  useEffect(() => {
    localStorage.setItem('leave', '0'); // 用完值要设置成初始值
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick: () => {
          if (type === 'index') {
            history.push('/customer/indexList');
          } else {
            history.goBack();
          }
        },
      },
    });

    let myRequest = {
      pageNum: 1,
      pageSize: 10,
    };
    switch (activeIndex) {
      case 1:
        myRequest = {
          ...myRequest,
          orderStatusList: ['1000'],
        };
        break;
      case 2:
        myRequest = {
          ...myRequest,
          orderStatusList: ['1600', '1700'],
        };
        break;
      case 3:
        myRequest = {
          ...myRequest,
          orderStatusList: ['1900'],
        };
        break;
      // case 4:
      //   myRequest = {
      //     ...myRequest,

      //   }
      //   break;
      default:
        break;
    }

    updateReqParams(myRequest);

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const getListData = async (params: object) =>
    new Promise((resolve, reject) => {
      queryCustOrderPageToApp(params)
        .then((res: any) => {
          // console.log('订单列表：' + JSON.stringify(res))
          const { records = [], total = 0 } = res;
          const dataSource = { data: records, total };
          resolve(dataSource);
        })
        .catch((e: any) => {
          reject(e.message);
        });
    });

  const updateReqestParams = (key: any) => {
    switch (key) {
      case 0:
        updateReqParams({
          pageNum: 1,
          pageSize: 10,
        });
        break;
      case 1:
        updateReqParams({
          ...reqParams,
          orderStatusList: ['1000'],
        });
        break;
      case 2:
        updateReqParams({
          ...reqParams,
          orderStatusList: ['1600'],
        });

        break;
      case 3:
        updateReqParams({
          ...reqParams,
          orderStatusList: ['1700', '1100'],
        });
        break;
      case 4:
        updateReqParams({
          ...reqParams,
          orderStatusList: ['1900'],
        });
        break;
      default:
        break;
    }
    loadMoreList.current?.reloadDataSource();
  };
  return (
    <>
      <div className={styles.tabList}>
        {tabList.map((item, index) => {
          const { label, key } = item || {};

          return (
            <div
              className={index === currentIndex ? styles.selectTab : styles.normalTab}
              onClick={() => {
                updateIndex(key);
                updateReqestParams(key);
              }}
            >
              <span>{label}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.orderList}>
        <LoadMoreListView
          ref={loadMoreList}
          requestFunc={getListData}
          renderRow={renderRow}
          requestParams={reqParams}
          alias={{ page: 'pageNum', pageSize: 'pageSize' }}
        />
      </div>
    </>
  );
};

export default connect(({ myOrder }: { myOrder: MyOrderModelState }) => ({ myOrder }))(MyOrderPage);
