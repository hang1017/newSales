import React, { FC, useEffect } from 'react';
import { BeEvaluatedPagesModelState, ConnectProps, connect } from 'alita';
import LoadMoreListView from '@alitajs/list-view';
import EvaluteItem from '@/components/EvaluteItem';
import FootBlock from '@/components/FootBlock';

import { queryEvaluteList } from '@/services/orderApi';

import styles from './index.less';

interface PageProps extends ConnectProps {
  beEvaluatedPages: BeEvaluatedPagesModelState;
}

const BeEvaluatedPagesPage: FC<PageProps> = ({ beEvaluatedPages, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    // dispatch!({
    //   type: 'beEvaluatedPages/query',
    // });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = beEvaluatedPages;
  const renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <EvaluteItem data={rowData} grayBtnText="查看订单" redBtnText="评价" />
  );
  return (
    <div className={styles.beEvalutePage}>
      <LoadMoreListView
        requestFunc={queryEvaluteList}
        renderRow={renderRow}
        requestParams={{
          abc: '123',
          token: 'alita',
          pageSize: 10,
          offset: 0,
        }}
      />
      <FootBlock />
    </div>
  );
};

export default connect(
  ({ beEvaluatedPages }: { beEvaluatedPages: BeEvaluatedPagesModelState }) => ({
    beEvaluatedPages,
  }),
)(BeEvaluatedPagesPage);
