import React, { FC, useEffect, useState, useRef } from 'react';
import { AfterSaleListModelState, ConnectProps, connect, history } from 'alita';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import { queryOrderApplyPage, } from '@/services/orderApplyCenter';
import { Modal, Toast } from 'antd-mobile';
import Empty from '@/components/Empty';
import RefundProduct from '../components/RefundProduct';

import styles from './index.less';

interface PageProps extends ConnectProps {
  afterSaleList: AfterSaleListModelState;
}

const AfterSaleListPage: FC<PageProps> = ({ afterSaleList, dispatch }) => {
  const [reqParams, updateReqParams] = useState({
    pageNum: 1,
    pageSize: 10,

  });
  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = afterSaleList;
  const loadMoreList = useRef<LoadMoreListAttributes>(null);
  /**
   * 取消申请
   */
  const cancleApplication = (data: any) => {
    const { applyId } = data;
    Modal.alert('提示', '确定取消申请吗?', [
      {
        text: '取消',
        onPress: () => {
        },
      },
      {
        text: '确定',
        onPress: () => {
          dispatch!({
            type: 'afterSaleList/cancelApply',
            payload: {
              applyId
            }
          }).then(res => {
            if (res) {
              Toast.success('取消成功', 1);
              setTimeout(() => {
                updateReqParams({
                  pageNum: 1,
                  pageSize: 10,
                });
                loadMoreList.current?.reloadDataSource();

              }, 1000)
            }

          });

        },
      }
    ])
  }

  const onMyClick = (data: any) => {
    history.push({
      pathname: '/afterSale/refundResult',
      query: {
        itemData: JSON.stringify(data)
      }
    });
  }


  const renderRow = (rowData: any) => (
    <div className={styles.listCell}>
      <div className={styles.listHead}>
        <div>下单时间：{rowData.createDate}</div>
        <div className={styles.rerundSale}>{rowData.applyStatusName}</div>

      </div>
      <RefundProduct
        data={rowData}
        footerElement={

          <>
            <div className={styles.allAccount}>
              <span className={styles.refunDes}>{`${rowData.applyType}` === '1000' ? '仅退款' : '退货退款'}</span>总计：￥<span className={styles.money}>{rowData.returnAmount}</span>
            </div>
            <div className={styles.footBtn}>
              {
                <span className={styles.grayBtn} onClick={() => { onMyClick(rowData) }}>查看详情</span>
              }

              {
                rowData.applyStatus === '1200' || rowData.applyStatus === '1100' ? <span className={styles.blueBtn} onClick={(event) => {
                  cancleApplication(rowData);
                  event.stopPropagation();
                }}>撤销申请</span> : ''
              }



            </div>
          </>
        }
      />
    </div>
  );
  const getListData = async (params: object) => {
    return new Promise((resolve, reject) => {
      queryOrderApplyPage(params)
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
  return <div className={styles.refundList}>
    <LoadMoreListView
      ref={loadMoreList}
      requestFunc={getListData}
      renderRow={renderRow}
      requestParams={reqParams}
      noData={<Empty />}
      alias={{ page: 'pageNum', }}
    />
  </div>
};

export default connect(({ afterSaleList }: { afterSaleList: AfterSaleListModelState; }) => ({ afterSaleList }))(AfterSaleListPage);
