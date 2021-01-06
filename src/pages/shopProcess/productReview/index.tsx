import React, { FC, useEffect, useState, useRef } from 'react';
import { ProductReviewModelState, ConnectProps, connect } from 'alita';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import { querySellerCommentsPage } from '@/services/evaluationApi';
import ShopAndBuy from '@/components/ShopAndBuy';
import CommentView from '@/pages/shopProcess/goodsDetail/components/CommentView';
import GoodsDetailNavBar from '@/pages/shopProcess/goodsDetail/components/GoodsDetailNavBar';

import styles from './index.less';
import CommentItem from '../goodsDetail/components/CommentItem';

interface PageProps extends ConnectProps {
  productReview: ProductReviewModelState;
}

const ProductReviewPage: FC<PageProps> = ({ productReview, dispatch }) => {
  const { goodId = '' } = productReview;

  const [reqParams, updateReqParams] = useState({
    goodId: goodId,
    pageNum: 1,
    pageSize: 10,
    labelId: '',
  });
  const [totalNum, updateTotal] = useState(0);
  const loadMoreList = useRef<LoadMoreListAttributes>(null);

  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'productReview/queryEvaluationLabel',
      payload: {
        goodId: goodId,
      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { labelData } = productReview;

  const labelClick = (item: any) => {
    console.log('sgkabckac', item.labelId);
    const { labelId = '' } = item;
    updateReqParams({
      goodId: goodId,
      pageNum: 1,
      pageSize: 10,
      labelId: labelId,
    });
    if (loadMoreList) {
      loadMoreList.current && loadMoreList.current.reloadDataSource();
    }
  };
  const getListData = async (params: object) => {
    return new Promise((resolve, reject) => {
      querySellerCommentsPage(params)
        .then((res: any) => {
          const { records = [], total = 0 } = res;
          const dataSource = { data: records, total: total };
          updateTotal(total);
          resolve(dataSource);
        })
        .catch((e) => {
          console.log('e-------->', e.message);
          reject(e.message);
        });
    });
  };

  // 渲染评价列表
  const renderRow = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <CommentItem commentInfo={rowData} />
  );
  return (
    <div>
      <GoodsDetailNavBar narmalNavBar navBarTitle="商品评价" />
      <CommentView isAllComment labelData={labelData} onLabelClick={labelClick} total={totalNum} />
      <div className={styles.list}>
        <LoadMoreListView
          requestFunc={getListData}
          renderRow={renderRow}
          ref={loadMoreList}
          requestParams={reqParams}
          alias={{ page: 'pageNum' }}
        />
      </div>
      {/* <ShopAndBuy /> */}
    </div>
  );
};

export default connect(({ productReview }: { productReview: ProductReviewModelState }) => ({
  productReview,
}))(ProductReviewPage);
