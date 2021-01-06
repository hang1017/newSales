import React, { FC, useEffect, useRef } from 'react';
import { WarrantyListModelState, ConnectProps, connect } from 'alita';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import Utils from '@/utils/tool';

import WarrantyCell from '../components/WarrantyCell';
import styles from './index.less';
import { queryOrderApplyPage } from '@/services/orderApplyCenter';
import { test, popViewController } from '@/utils/NativeBridge';

interface PageProps extends ConnectProps {
  warrantyList: WarrantyListModelState;
}

const WarrantyListPage: FC<PageProps> = ({ warrantyList, dispatch }) => {
  const loadMoreList = useRef<LoadMoreListAttributes>(null);

  // 这里发起了初始化请求
  useEffect(() => {
    // dispatch!({
    //   type: 'warrantyList/queryOrderApplyPage',
    // });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  // const { name } = warrantyList;
  const renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => {
    return (
      <WarrantyCell
        item={rowData}
        onRefresh={() => {
          loadMoreList.current!.reloadDataSource();
        }}
      />
    );
  };
  return (
    <div className={styles.center}>
      <LoadMoreListView
        ref={loadMoreList}
        requestFunc={queryOrderApplyPage}
        renderRow={renderRow}
        requestParams={{
          pageNum: 1,
          pageSize: 10,
        }}
        alias={{
          data: 'records',
          offset: 'pageNum',
        }}
      />
    </div>
  );
};

export default connect(({ warrantyList }: { warrantyList: WarrantyListModelState }) => ({
  warrantyList,
}))(WarrantyListPage);
