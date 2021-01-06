import React, { FC, useEffect, useState } from 'react';
import { SelectedPackagesModelState, ConnectProps, connect, router } from 'alita';
import { Grid, PullToRefresh } from 'antd-mobile';
import Utils from '@/utils/tool';
import styles from './index.less';

import dataIcon from '@/assets/img/recommend/data_icon.png';
import iphoneIcon from '@/assets/img/recommend/iphone.png';
import iwatchIcon from '@/assets/img/recommend/iwatch.png';
import dataTwoIcon from '@/assets/img/recommend/data_two_icon.png';
import FootBlock from '@/components/FootBlock';

interface PageProps extends ConnectProps {
  selectedPackages: SelectedPackagesModelState;
}

const SelectedPackagesPage: FC<PageProps> = ({ selectedPackages, dispatch }) => {
  const imgWidth = (document.documentElement.clientWidth - 130) / 2;
  const { dataList, isLoadMore } = selectedPackages;
  const [refreshing, updateRefreshing] = useState(false);

  let pageNum = 1;
  // 这里发起了初始化请求
  useEffect(() => {
    request();
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const request = () => {
    dispatch!({
      type: 'selectedPackages/queryGoodsPage',
      payload: {
        labelCode: 'APP_CODE',
        pageNum,
      },
    }).then(() => {
      if (refreshing) {
        updateRefreshing(false);
      }
    });
  };
  const onItemClick = (item) => {
    router.push({
      pathname: '/shopProcess/goodsDetail',
      query: {
        goodsId: item.goodsId,
      },
    });
  };

  /**
   * 下拉刷新
   */
  const onRefresh = () => {
    // 在这里请求服务，然后更新updateRefreshing(false);
    if (isLoadMore === false) {
      updateRefreshing(true);
      pageNum++;
      request();
    }
    // setTimeout(() => {
    //   updateRefreshing(false);
    // }, 2000);
  };
  return (
    <div className={styles.center}>
      <div className={styles.recommendBlock}>
        <PullToRefresh
          damping={80}
          style={{ background: '#F5F7F9' }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          direction="up"
          style={{
            height: document.documentElement.clientHeight - 150,
            overflow: 'auto',
          }}
        >
          <Grid
            data={dataList}
            hasLine={false}
            onClick={onItemClick}
            columnNum={2}
            renderItem={(dataItem: any) => (
              <div className={styles.recommend}>
                <img src={dataItem.icon} alt="" style={{ width: imgWidth, height: imgWidth }} />
                <div className={styles.proTitle}>{dataItem.title}</div>
                <div className={styles.price}>
                  <span>￥</span>
                  {dataItem.price}
                </div>
                <div className={styles.detail}>
                  <div>{dataItem.total}条评论</div>
                  <div>好评度{dataItem.highCommentRate}</div>
                </div>
              </div>
            )}
          />
        </PullToRefresh>
        {isLoadMore && <FootBlock />}
      </div>
    </div>
  );
};

export default connect(
  ({ selectedPackages }: { selectedPackages: SelectedPackagesModelState }) => ({
    selectedPackages,
  }),
)(SelectedPackagesPage);
