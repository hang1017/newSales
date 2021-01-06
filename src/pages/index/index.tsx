/* eslint-disable no-nested-ternary */
import React, { FC, useEffect, useState } from 'react';
import { IndexModelState, ConnectProps, connect, setPageNavBar, history } from 'alita';
import Utils from '@/utils/tool';

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const IndexPage: FC<PageProps> = ({ index, dispatch, location }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    const source = Utils.getQueryStringSourceAndSn('source') || '';
    const sn = Utils.getQueryStringSourceAndSn('sn') || '';
    const salesCode = Utils.getQueryStringSourceAndSn('salesCode') || '';
    const test = Utils.getQueryStringSourceAndSn('test') || '';
    if (source && source.length > 0) {
      localStorage.setItem('source', source);
    }
    if (sn && sn.length > 0) {
      localStorage.setItem('sn', sn.substring(0, 1));
    }
    history.push({
      pathname: '/customer/indexList',
      query: {
        source,
        sn,
        salesCode,
        test
      },
    });

    // request(currentIndex);
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);

  return <div></div>;
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(IndexPage);
