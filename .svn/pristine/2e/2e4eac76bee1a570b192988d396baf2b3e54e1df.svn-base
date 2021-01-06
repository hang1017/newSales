import React, { FC, useEffect, useRef, useState } from 'react';
import { SearchSectsModelState, ConnectProps, connect, history } from 'alita';
import MySearchBar from '@/components/MySearchBar';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import { circleList } from '@/services/sect'
import SectItem from '../components/SectItem';

import styles from './index.less';

interface PageProps extends ConnectProps {
  searchSects: SearchSectsModelState;
}

const SearchSectsPage: FC<PageProps> = ({ searchSects, dispatch }) => {
  const [reqParams, updateReqParams] = useState({
    current: 1,
    size: 10,

  });
  const [val, updateVal] = useState('');
  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = searchSects;
  const myClick = (data: string) => {

    dispatch!(
      {
        type: 'sectInfo/save',
        payload: {
          mySectInfo: data
        }
      }
    );
    setTimeout(() => {
      history.push({
        pathname: '/sect/sectInfo'
      })
    }, 100);


  }

  const loadMoreList = useRef<LoadMoreListAttributes>(null);
  const renderRow = (rowData: any) => (
    <SectItem data={rowData} onClick={myClick} />
  );
  const getListData = async (params: object) => {
    return new Promise((resolve, reject) => {
      circleList(params)
        .then((res: any) => {
          // console.log('订单列表：' + JSON.stringify(res))
          const { records = [], total = 0 } = res;
          const dataSource = { data: records, total };
          resolve(dataSource);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };
  return <div className={styles.sectSearchPage}>

    <MySearchBar
      placeholder='搜索您感兴趣的圈子'
      value={val}
      onChange={(val) => {
        updateVal(val);
      }}
      onOk={(val: string) => {
        updateReqParams({
          ...reqParams,
          current: 1,
          size: 10,
          marketingCircleName: val,
        });
        loadMoreList.current?.reloadDataSource();
        console.log(`搜索：${val}`)
      }}
      onCancel={() => {
        updateReqParams({
          current: 1,
          size: 10,
          marketingCircleName: '',
        });
        updateVal('');
        loadMoreList.current?.reloadDataSource();
      }}
    />


    <div>

      {
        <LoadMoreListView
          ref={loadMoreList}
          requestFunc={getListData}
          renderRow={renderRow}
          requestParams={reqParams}
          alias={{ page: 'current', pageSize: 'size' }}
        />

      }
      {
        // [1, 1, 1, 1, 1].map((item, index) => {
        //   const current = index + 1;
        //   return <SectItem
        //     data={{}}
        //     current={current}

        //   />
        // })
      }
    </div>
  </div>;
};

export default connect(({ searchSects }: { searchSects: SearchSectsModelState; }) => ({ searchSects }))(SearchSectsPage);
