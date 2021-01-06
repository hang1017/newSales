import ListNoData from '@/components/ListNoData';
import { LoadMoreListAttributes } from '@alitajs/list-view';
import classnames from 'classnames';
import React, { FC, useRef } from 'react';
import styles from './index.less';

interface ComponentProps {
  list: any;
  tabKey: any;
  circleMemberType: any;
  receiveClick: (data: any) => void;
  allotClick?: (data: any) => void;
}

const DcItemList: FC<ComponentProps> = ({ list, tabKey, circleMemberType, receiveClick, allotClick }) => {
  const loadMoreList = useRef<LoadMoreListAttributes>(null);

  return (
    // <LoadMoreListView
    //   ref={loadMoreList}
    //   requestFunc={queryList}
    //   renderRow={renderDcRow}
    //   requestParams={{
    //     ...params,
    //   }}
    //   alias={{ data: 'list' }}
    //   noData={<ListNoData />}
    // />

    //  列表接口不是分页，如果用LoadMoreListView 会无限上啦加载更多，所以改成 列表请求
    <div className={styles.listPadding} style={{ height: circleMemberType === '1' ? '90%' : '100%' }}>
      {list &&
        list.length > 0 &&
        list.map((couponItem: any) => {
          const { rigthsName = '', expDate = '' } = couponItem;
          return (
            <div className={classnames({ [styles.itemDiv]: true, [styles.ownerBg]: tabKey === '1', [styles.memberBg]: tabKey === '2' })}>
              <div className={styles.leftLayout}>
                <div className={styles.columnLayout}>
                  <div className={classnames({ [styles.nameText]: true, [styles.brownColor]: tabKey === '1' })}>{rigthsName}</div>
                  <div className={styles.timeText}>有效期至{expDate}</div>
                </div>
              </div>
              <div className={styles.rightLayout}>
                {
                  tabKey === '1' && (<div className={styles.sendBtn} onClick={() => allotClick && allotClick(couponItem)}>赠送</div>)
                }
                <div className={classnames({ [styles.gainBtn]: true, [styles.redColor]: tabKey === '2' })} onClick={() => receiveClick && receiveClick(couponItem)}>领取</div>
              </div>
            </div>
          );
        })}
      { (!list || list.length === 0) && (
        <div style={{ paddingTop: '2.6rem' }}>
          <ListNoData />
        </div>
      )}
    </div>
  );
};

export default DcItemList;
