import React, { FC, useEffect } from 'react';
import { ProgressDetailsModelState, ConnectProps, connect } from 'alita';

import TreeNodeBlock from '@/components/TreeNodeBlock';

import FootBlock from '@/components/FootBlock';
import styles from './index.less';

interface PageProps extends ConnectProps {
  progressDetails: ProgressDetailsModelState;
}

const ProgressDetailsPage: FC<PageProps> = ({ progressDetails, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    // dispatch!({
    //   type: 'progressDetails/query',
    // });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = progressDetails;

  const linkMap = [
    {
      key: 'trackDes',
      subTitle: '',
      // isPhone: true,
    },
    {
      key: 'time',
      subTitle: '',
    },
  ];
  const tempData = [
    {
      trackName: '安装完毕',
      trackDes: '您的服务单1652653456已退款成功',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '安装完毕',
      trackDes: '您的服务单1652653456已退款成功',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '安装完毕',
      trackDes: '您的服务单1652653456已退款成功',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '安装完毕',
      trackDes: '您的服务单1652653456已退款成功',
      time: '2019-07-04 09:36:45',
    },
    {
      trackName: '安装完毕',
      trackDes: '您的服务单1652653456已退款成功',
      time: '2019-07-04 09:36:45',
    },
  ];
  return (
    <div className={styles.details}>
      <div className={styles.trackBlock}>
        {tempData.map((item: any, index: number) => (
          <TreeNodeBlock isFirst={index === 0} data={item} linkMap={linkMap} />
        ))}
        <FootBlock />
      </div>
    </div>
  );
};

export default connect(({ progressDetails }: { progressDetails: ProgressDetailsModelState }) => ({
  progressDetails,
}))(ProgressDetailsPage);
