import React, { FC, useEffect } from 'react';
import { DiscountCounponModelState, ConnectProps, connect, setPageNavBar, history } from 'alita';
import { Tabs, Toast } from 'antd-mobile';
import DcItemList from './component/DcItemList';
import { qryRights } from '@/services/promotionApi';
import styles from './index.less';

interface PageProps extends ConnectProps {
  discountCounpon: DiscountCounponModelState;
}

const tabs = [
  {
    title: '待使用',
    key: '1',
    params: {
      mcInstState: 1000,
    },
  },
  {
    title: '已使用',
    key: '2',
    params: {
      mcInstState: 2000,
    },
  },
  {
    title: '已过期',
    key: '3',
    params: {
      mcInstState: 3000,
    },
  },
];

const DiscountCounponPage: FC<PageProps> = ({ discountCounpon, dispatch }) => {
  const { usedData, toBeUsedData, expiredData } = discountCounpon;
  // 这里发起了初始化请求
  useEffect(() => {
    // dispatch!({
    //   type: 'discountCounpon/qryRights',
    //   payload:{
    //       ...tabs[0].params,
    //   }
    // });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  // tab切换事件
  const onTabChange = (tab: any, index: number) => {
    console.log('tab', tab);
    console.log('index', index);
    // dispatch!({
    //   type: 'discountCounpon/qryRights',
    //   payload:{
    //       ...tabs[index].params,
    //   }
    // });
  };

  const queryList = (params: any) => {
    return new Promise((resolve, reject) => {
      qryRights(params)
        .then((res: any) => {
          // console.log('订单列表：' + JSON.stringify(res))
          resolve({ list: res });
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

  // tabBar线条样式
  const percent = 100 / (tabs.length < 5 ? tabs.length * 2 : 10);
  const tabBarUnderLineStyle: React.CSSProperties = {
    width: '60px',
    height: '8px',
    marginLeft: `calc(${percent}% - 30px)`,
    background: 'linear-gradient(270deg, #5CAAFE 0%, #2083FB 100%)',
    borderRadius: '16px 0px 0px 16px',
  };
  const onItemClick = (data: any) => {
    const { promTypeId = '', rightsTypeCode = '', mcInstId = 0 } = data;
    if (promTypeId === '4000' && rightsTypeCode === '1') {
      dispatch!({
        type: 'discountCounpon/qryRightsGoods',
        payload: {
          mcInstId: data?.mcInstId,
        },
      }).then((showGoodInfo) => {
        dispatch!({
          type: 'equityExchange/save',
          payload: {
            rightsInfo: data,
            exchangeInfo: showGoodInfo,
          },
        });
        history.push({
          pathname: '/customer/equityExchange',
        });
      });
    } else if (rightsTypeCode === '3') {
      history.push({
        pathname: '/wallPaper',
        query: {
          mcInstId,
          mcInstState: data?.mcInstState,
        },
      });
    } else {
      Toast.show('暂不支持此权益卷兑换！');
    }
  };
  return (
    <div className={styles.container}>
      <Tabs
        tabs={tabs}
        onChange={onTabChange}
        useOnPan={false}
        swipeable={false}
        tabBarUnderlineStyle={tabBarUnderLineStyle}
        tabBarActiveTextColor="#041C1E"
        tabBarInactiveTextColor="#69696D"
        prerenderingSiblingsNumber={0}
      >
        {tabs.map((row: any, index: number) => {
          const { key, params } = row;
          return (
            <DcItemList
              key={key}
              queryList={queryList}
              params={params}
              onItemClick={onItemClick}
              mcInstState={params.mcInstState}
            />
          );
        })}
      </Tabs>
    </div>
  );
};

export default connect(({ discountCounpon }: { discountCounpon: DiscountCounponModelState }) => ({
  discountCounpon,
}))(DiscountCounponPage);
