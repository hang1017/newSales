import React, { FC, useEffect, useState } from 'react';
import { OrderSearchModelState, ConnectProps, connect, history } from 'alita';
import styles from './index.less';

import SearchBar from '@/components/SearchBar';
import deleteIcon from '@/assets/img/order/delete_icon.png';
import OrderItem from '@/components/OrderItem';
import FootBlock from '@/components/FootBlock';

import Utils from '@/utils/tool';
import LoadMoreListView from '@alitajs/list-view';
import { queryCustOrderPageToApp } from '@/services/orderApi';

interface PageProps extends ConnectProps {
  orderSearch: OrderSearchModelState;
}

let searchValue = '';
const OrderSearchPage: FC<PageProps> = ({ orderSearch, dispatch }) => {
  // const storage = window.localStorage;
  // storage.clear();
  let data: string[] | (() => string[]) = [];
  const [historyData, updateData] = useState(data);
  const { showListView } = orderSearch;
  const { memberId = '' } = Utils.getStorageForJson('userInfo') || {};

  // 这里发起了初始化请求
  useEffect(() => {
    const localData = Utils.getStorageForJson('searchRecode') || [];
    updateData(localData);
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
      dispatch!({
        type: 'orderSearch/save',
        payload: {
          showListView: false,
        },
      });
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  const onSearch = (value: any) => {
    if (value !== '') {
      history.push({ pathname: '/selectedPackages' });
      // searchValue = value;
      // historyData.push(`${value}`);
      // const data = new Set(JSON.parse(JSON.stringify(historyData)));
      // const newData = [...data];
      // Utils.setStorageForJson('searchRecode', newData);
      // updateData(newData);

      // dispatch!({
      //   type: 'orderSearch/save',
      //   payload: {
      //     showListView: true,
      //   },
      // });
    }
  };

  const onItemSearch = (item: any) => {
    if (item !== '') {
      searchValue = item;
      dispatch!({
        type: 'orderSearch/save',
        payload: {
          showListView: true,
        },
      });
    }
  };

  const onFocus = () => {
    dispatch!({
      type: 'orderSearch/save',
      payload: {
        showListView: false,
      },
    });
  };

  const delHistory = () => {
    console.log('delete');
    updateData([]);
  };

  const getListData = async (params: object) => {
    return new Promise((resolve, reject) => {
      queryCustOrderPageToApp(params)
        .then((res: any) => {
          const { records = [], total = 0 } = res;
          const dataSource = { data: records, total: total };
          resolve(dataSource);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

  // 渲染订单列表
  const renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <OrderItem
      data={rowData}
      onItemClick={() => {
        dispatch!({
          type: 'orderDetail/save',
          payload: {
            orderId: `${rowData.orderId}` || '',
          },
        });
        history.push({ pathname: '/order/orderDetail' });
      }}
    />
  );

  return (
    <div className={styles.contanir}>
      {/* {rednerSearchBar()} */}
      <SearchBar
        palceholder="名称/SKU（字段根据文档）"
        onValueSearch={onSearch}
        onSearchIcon={onSearch}
        inputOnFocus={onFocus}
      >
        {showListView ? (
          <div>
            <LoadMoreListView
              requestFunc={getListData}
              renderRow={renderRow}
              requestParams={{
                memberId,
                orderStatus: '', // 全部
                pageNum: 1,
                pageSize: 10,
                key: searchValue,
              }}
              alias={{ page: 'pageNum' }}
            />
            <FootBlock />
          </div>
        ) : (
          <div className={styles.center}>
            <div className={styles.historyView}>
              <div className={styles.text}>历史搜索</div>
              <img src={deleteIcon} onClick={delHistory} />
            </div>
            <div className={styles.labelView}>
              {historyData.map((item: string, index: number) => {
                return (
                  <div
                    className={styles.label}
                    key={`${item}-${index}`}
                    onClick={() => onItemSearch(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </SearchBar>
    </div>
  );
};

export default connect(({ orderSearch }: { orderSearch: OrderSearchModelState }) => ({
  orderSearch,
}))(OrderSearchPage);
