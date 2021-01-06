/* eslint-disable no-unused-expressions */
import React, { FC, useEffect, useState } from 'react';
import { MaintenanceRecordsModelState, ConnectProps, connect } from 'alita';

import TreeNodeBlock from '@/components/TreeNodeBlock';
import Recommend from '@/components/Recommend';
import GoodsDetailNavBar from '@/pages/shopProcess/goodsDetail/components/GoodsDetailNavBar';
import topIcon from '@/assets/img/gotoTop.png';
import FootBlock from '@/components/FootBlock';
import styles from './index.less';

interface PageProps extends ConnectProps {
  maintenanceRecords: MaintenanceRecordsModelState;
}

const MaintenanceRecordsPage: FC<PageProps> = ({ maintenanceRecords, dispatch }) => {
  const [topFlag, updateTopFlag] = useState(false);
  const onScroll = () => {
    const windowHeight = document.documentElement.clientHeight;
    const scrolElement = document.getElementById('root')?.firstChild?.firstChild;
    scrolElement?.addEventListener('scroll', () => {
      // console.log('ssss');
      const top = scrolElement ? scrolElement?.scrollTop * devicePixelRatio : 0;
      if (top > windowHeight) {
        updateTopFlag(true);
      } else {
        updateTopFlag(false);
      }
    });
  };

  // 这里发起了初始化请求
  useEffect(() => {
    onScroll();
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = maintenanceRecords;

  const linkMap = [
    {
      key: 'opName',
      subTitle: '操作人员',
    },
    {
      key: 'phone',
      subTitle: '手机号码',
      isPhone: true,
    },
    {
      key: 'time',
      subTitle: '',
    },
  ];
  const tempData = [
    {
      trackName: '安装完毕',
      opName: '张三',
      phone: '13774518991',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '派单人员',
      opName: '张三',
      phone: '13774518991',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '创建订单',
      opName: '张三',
      phone: '',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '派单人员',
      opName: '张三',
      phone: '13774518991',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '创建订单',
      opName: '张三',
      phone: '',
      time: '2019-07-04 09:36:45',
    },
  ];

  const goToTop = () => {
    console.log(0);
    // document.documentElement.scrollTop = 0;
    // document.body.scrollTop = 0;
    // window.scrollTo();
    document.getElementById('base').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <div className="navBarBlock">
        <GoodsDetailNavBar narmalNavBar navBarTitle="装维记录" hasRightContent={false} />
      </div>
      <div className={styles.maintenanceRecords} id="base">
        <div className={styles.trackBlock}>
          {tempData.map((item: any, index: number) => (
            <TreeNodeBlock isFirst={index === 0} data={item} linkMap={linkMap} />
          ))}
        </div>
        <Recommend />
        <FootBlock />
      </div>
      <img className={topFlag ? 'topIcon' : 'hideElement'} onClick={goToTop} src={topIcon} alt="" />
    </>
  );
};

export default connect(
  ({ maintenanceRecords }: { maintenanceRecords: MaintenanceRecordsModelState }) => ({
    maintenanceRecords,
  }),
)(MaintenanceRecordsPage);
