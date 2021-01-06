import { ListView, PullToRefresh } from 'antd-mobile';

import React from 'react';
import styles from './index.less';

interface PageProps {
  data: any; // 列表数据
  Item: any; // 每一项的内容
  itemClick: any; // 每一项的点击事件
  height: number | string; // 高度
  onEndReached: any; // 上拉触底事件
  isLoading: boolean; // 是否加载
  refreshing: boolean; // 上拉加载判断
  onRefresh: any; // 下拉加载事件
  otherData?: any;
  hasMore?: boolean; // 是否还有更多
}

interface PageState {
  dataSource: any;
}

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

class Page extends React.Component<PageProps, PageState> {
  state: PageState = {
    dataSource: dataSource.cloneWithRows(this.props.data),
  };

  componentWillReceiveProps(nextProps) {
    // const { data = [] } = this.props;
    // if (data.length !== nextProps.data.length) {
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.setState({
      dataSource: ds.cloneWithRows(nextProps.data),
    });
    // }
  }

  render() {
    const {
      data = [],
      Item,
      itemClick,
      height,
      onEndReached,
      isLoading = false,
      refreshing = false,
      onRefresh,
      otherData = {},
      hasMore = true,
    } = this.props;

    const { dataSource } = this.state;

    let index = data.length - 1;

    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      if (data.length) {
        return (
          <Item data={obj} itemClick={itemClick} {...otherData} />
          // <div>1</div>
        );
      }
      return <></>;
    };

    return (
      <ListView
        dataSource={dataSource}
        renderRow={row}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {hasMore ? (isLoading ? '加载中...' : '加载完成') : '已全部加载'}
          </div>
        )}
        style={{
          height,
          overflow: 'auto',
        }}
        pageSize={4}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
        // pullToRefresh={
        //   <PullToRefresh
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     damping={300}
        //     distanceToRefresh={50}
        //   />
        // }
      />
    );
  }
}

export default Page;
