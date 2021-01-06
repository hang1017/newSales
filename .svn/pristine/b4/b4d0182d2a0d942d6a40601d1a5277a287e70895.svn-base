// 集团开户
// step0：基础信息

import React, { FC, useRef, useEffect, useState } from 'react';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import moment from 'moment';
import { dateChange } from '@alitajs/dform';
import DcgetedImg from '@/assets/dcgeted.png';
import usedIcon from '@/assets/img/customer/used.png';
import expiredIcon from '@/assets/img/customer/expired.png';
import ListNoData from '@/components/ListNoData';
import styles from './index.less';

interface ComponentProps {
  queryList: (params: any) => Promise<any>;
  params: any;
  onItemClick?: (data: any) => void;
  mcInstState: number;
}

const dcItemImgs = {
  1000: DcgetedImg,
  2000: usedIcon,
  3000: expiredIcon,
};

const itemKey = {
  applyScopeFlag: 'applyScopeFlag',
  rightsTypeName: 'rightsTypeName',
  rightsName: 'rightsName',
  accNbr: 'accNbr',
  expDate: 'expDate',
};
const DcItemList: FC<ComponentProps> = ({ queryList, params, onItemClick, mcInstState }) => {
  const loadMoreList = useRef<LoadMoreListAttributes>(null);
  const [list, setList] = useState<any[]>([]);
  const mOnItemClick = (data: any) => {
    if (onItemClick)
      onItemClick({
        ...data,
        mcInstState,
      });
  };

  const initData = async () => {
    const { list = [] } = await queryList(params);
    if (list && list.length) {
      setList(list);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const renderDcRow = (data: any) => {
    const state = data[itemKey.applyScopeFlag];
    const des = state === 1000 ? '限会员使用' : '限本号码使用';
    // const expates=data[itemKey.expDate].split('  ');
    // if(itemKey.applyScopeFlag)

    return (
      <div className={styles.itemDiv}>
        <div className={styles.leftDiv}>
          <div className={mcInstState !== 1000 ? styles.disableDiv : styles.itemLeftDiv}>
            <div className={styles.price}>{data[itemKey.rightsTypeName] || '--'}</div>
            <div className={styles.remark}>{des}</div>
          </div>
          <div className={styles.itemRightDiv}>
            <div className={styles.dcTitleKey}>{data[itemKey.rightsName] || '--'}</div>
            <span hidden={state === 1000}>手机号码：{data[itemKey.accNbr] || '--'}</span>
            <span>有效期至：{data[itemKey.expDate] || '--'}</span>
          </div>
        </div>
        <div className={styles.rightBtn} hidden={mcInstState !== 1000 ? true : false}>
          <span onClick={() => mOnItemClick(data)}>兑换</span>
        </div>
        <img src={dcItemImgs[mcInstState]} alt="" />
      </div>
    );
  };

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
    <div style={{ position: 'relative', paddingBottom: '20px' }}>
      {list &&
        list.length > 0 &&
        list.map((data) => {
          const state = data[itemKey.applyScopeFlag];
          const des = state === 1000 ? '限会员使用' : '限本号码使用';
          // const expates=data[itemKey.expDate].split('  ');
          // if(itemKey.applyScopeFlag)
          const { rightsTypeCode = '', effDate = '' } = data;
          const nowDate = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').valueOf();

          let checkTime = true;
          if (mcInstState === 1000) {
            if (moment(new Date(dateChange(effDate)), 'YYYY-MM-DD HH:mm:ss').valueOf() > nowDate) {
              checkTime = false;
            }
          }

          const btnShowFlag =
            checkTime && (mcInstState === 1000 || (mcInstState === 2000 && rightsTypeCode === '3'));

          return (
            <div className={styles.itemDiv}>
              <div className={styles.leftDiv}>
                <div className={mcInstState !== 1000 ? styles.disableDiv : styles.itemLeftDiv}>
                  <div className={styles.price}>{data[itemKey.rightsTypeName] || '--'}</div>
                  <div className={styles.remark}>{des}</div>
                </div>
                <div className={styles.itemRightDiv}>
                  <div className={styles.dcTitleKey}>{data[itemKey.rightsName] || '--'}</div>
                  <span hidden={state === 1000}>手机号码：{data[itemKey.accNbr] || '--'}</span>
                  <span>有效期至：{data[itemKey.expDate] || '--'}</span>
                </div>
              </div>
              <div className={styles.rightBtn} hidden={!btnShowFlag}>
                <span onClick={() => mOnItemClick(data)}>
                  {mcInstState === 1000 ? '兑换' : `查看`}
                </span>
              </div>
              <img src={dcItemImgs[mcInstState]} alt="" />
            </div>
          );
        })}
      {list?.length === 0 && (
        <div style={{ paddingTop: '3rem' }}>
          <ListNoData />
        </div>
      )}
      <div style={{ height: '1.5rem' }} />
    </div>
  );
};

export default DcItemList;
