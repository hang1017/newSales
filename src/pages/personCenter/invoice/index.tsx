import React, { FC, useEffect, useState, useRef } from 'react';
import { InvoiceModelState, ConnectProps, connect, router } from 'alita';
import LoadMoreListView from '@alitajs/list-view';
import { queryCustOrderPageToApp } from '@/services/orderApi';
import { Tabs, Toast } from 'antd-mobile';
import Utils from '@/utils/tool';
import FootBlock from '@/components/FootBlock';
import InvoiceItem from '@/components/InvoiceItem';

import styles from './index.less';

interface PageProps extends ConnectProps {
  invoice: InvoiceModelState;
}

const InvoicePage: FC<PageProps> = ({ location }) => {
  const [tabIndex, updateTabIndex] = useState(0);
  const refDone = useRef();
  const refTodo = useRef();
  const refcompleted = useRef();
  // 这里发起了初始化请求
  useEffect(() => {
    if (localStorage.getItem('source') === '4' || localStorage.getItem('source') === 'wxamp') {
      const layoutNo = document.getElementsByClassName('rumtime-keep-alive-layout-no');
      const layoutHead = document.getElementsByClassName('alita-layout-head');
      const layoutFixed = document.getElementsByClassName('alita-layout-fixed');
      if (layoutNo && layoutNo.length) {
        layoutNo[0].style.height = '100%';
      }
      if (layoutHead && layoutHead.length) {
        layoutHead[0].style.display = 'none';
      }
      if (layoutFixed && layoutFixed.length) {
        layoutFixed[0].style.display = 'none';
      }
    }
  }, [localStorage.getItem('source'), location.pathname]);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const tabs = [
    { title: '未开票', ref: refTodo },
    { title: '开票中', ref: refDone },
    { title: '已开票', ref: refcompleted },
  ];

  const shouldRefresh = () => {
    console.log('需要刷新');
    tabs[tabIndex].ref.current!.reloadDataSource();
  };

  const onTabClick = (tab: any, index: number) => {
    updateTabIndex(index);
  };

  const tabLeft = tabIndex * 33 + 12;
  // 渲染订单列表
  const renderRow = (rowData: any, type: 'noOpen' | 'opened' | 'noAnyClick') => {
    const btnClick = (data: any, status: 'noOpen' | 'opened' | 'noAnyClick') => {
      const { orderId = '' } = data;
      if (status === 'noOpen') {
        if (data?.payChannelType === '5') {
          Toast.fail('企业代付，不允许单独开票！', 1);
          return;
        }
        router.push({
          pathname: '/personCenter/editInvoice',
          query: {
            orderId,
          },
        });
      } else if (status === 'opened') {
        router.push({
          pathname: '/personCenter/invoiceDetail',
          query: {
            orderId,
          },
        });
      }
    };
    return (
      <InvoiceItem
        shouldRefresh={shouldRefresh}
        data={rowData}
        status={type}
        footBtnClick={btnClick}
      />
    );
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
      // resolve({ data: [{}, {}], total: 0 });
    });
  };
  const { memberId } = Utils.getStorageForJson('userInfo') || {};

  return (
    <div className={styles.invoiceStyle}>
      <Tabs
        tabs={tabs}
        initialPage={tabIndex}
        page={tabIndex}
        onTabClick={onTabClick}
        tabBarActiveTextColor="#041C1E"
        tabBarInactiveTextColor="#696D6C"
        tabBarUnderlineStyle={{
          width: '9%',
          height: 8,
          border: '0px #2ca5ff solid',
          backgroundColor: '#2ca5ff',
          left: `${tabLeft}%`,
        }}
        swipeable={false}
      >
        <div style={{ height: '100%' }}>
          <div className={styles.seatHeight} />
          <LoadMoreListView
            ref={refTodo}
            requestFunc={getListData}
            renderRow={(rowData: any) => renderRow(rowData, 'noOpen')}
            requestParams={{
              memberId,
              // orderStatus: '',
              pageNum: 1,
              pageSize: 10,
              isNeedInvoice: '2000',
            }}
            alias={{ page: 'pageNum' }}
          />
        </div>
        <div style={{ height: '100%', width: '100%' }}>
          <div className={styles.seatHeight} />
          <LoadMoreListView
            ref={refDone}
            requestFunc={getListData}
            renderRow={(rowData: any) => renderRow(rowData, 'noAnyClick')}
            requestParams={{
              memberId,
              // orderStatus: '',
              pageNum: 1,
              pageSize: 10,
              isNeedInvoice: '1000',
              isIssue: '1000',
            }}
            alias={{ page: 'pageNum' }}
          />
        </div>
        <div style={{ height: '100%' }}>
          <LoadMoreListView
            ref={refcompleted}
            requestFunc={getListData}
            renderRow={(rowData: any) => renderRow(rowData, 'opened')}
            requestParams={{
              memberId,
              pageNum: 1,
              pageSize: 10,
              isIssue: '1100',
            }}
            alias={{ page: 'pageNum' }}
          />
          <FootBlock />
        </div>
      </Tabs>
    </div>
  );
};

export default connect(({ invoice }: { invoice: InvoiceModelState }) => ({ invoice }))(InvoicePage);
