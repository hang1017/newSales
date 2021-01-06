import React, { FC, useEffect } from 'react';
import { ElectronicBusinessModelState, ConnectProps, connect } from 'alita';
import { Modal, Toast } from 'antd-mobile';
import BusinessItem from '@/components/BusinessItem';
import { Empty } from '@/components';
import styles from './index.less';

interface PageProps extends ConnectProps {
  electronicBusiness: ElectronicBusinessModelState;
}

const ElectronicBusinessPage: FC<PageProps> = ({ electronicBusiness, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'electronicBusiness/qryMyNumberInstList',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { dataList } = electronicBusiness;
  const cancelRequest = (spuInstId: string) => {
    dispatch!({
      type: 'electronicBusiness/cancelRequest',
      payload: {
        spuInstId,
      },
    }).then(() => {
      Toast.show('取消续订成功！', 1);
      dispatch!({
        type: 'electronicBusiness/qryMyNumberInstList',
      });
    });
  };
  const renewItRequest = (spuInstId: string) => {
    dispatch!({
      type: 'electronicBusiness/delayRequest',
      payload: {
        spuInstId,
      },
    }).then(() => {
      Toast.show('续订成功！', 1);
      dispatch!({
        type: 'electronicBusiness/qryMyNumberInstList',
      });
    });
  };
  const myClickCallback = (renewFlag: boolean, spuInstId: string) => {
    const message = renewFlag ? '取消续订?' : '是否续订？';
    Modal.alert('提示', message, [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          if (renewFlag) {
            cancelRequest(spuInstId);
          } else {
            renewItRequest(spuInstId);
          }
        },
      },
    ]);
  };
  return (
    <div className={styles.eleBusPage}>
      {dataList?.map((item) => {
        return <BusinessItem data={item} clickCallback={myClickCallback} />;
      })}
      {dataList?.length === 0 ? (
        <div style={{ marginTop: '2rem' }}>
          <Empty />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default connect(
  ({ electronicBusiness }: { electronicBusiness: ElectronicBusinessModelState }) => ({
    electronicBusiness,
  }),
)(ElectronicBusinessPage);
