import React, { FC } from 'react';
import styles from './index.less';
import Tools from '@/utils/tool';
import IconExp from '@/assets/img/phone.png';
import { history, connect, WarrantyListModelState } from 'alita';
import { json } from 'express';
import { Card } from 'antd-mobile';

interface WarrantyCellProps {
  item?: any;
  onRefresh?: () => void;
  title: React.ReactNodeArray;
}

const WarrantyCell: FC<WarrantyCellProps> = ({ item = {}, dispatch, onRefresh = () => {} }) => {
  const { orderReturnItemCOList = [], applyStatus, applyType } = item;
  const { memberId = '' } = Tools.getStorageForJson('userInfo') || {};

  let returnItemCO: any = {};
  if (orderReturnItemCOList && orderReturnItemCOList.length > 0) {
    returnItemCO = orderReturnItemCOList[0];
  }
  /**
     * 取消申请- 等待审核1100 、审核不通过 1200、退款审核不通过1700
修改申请 --等待审核 1100
售后评价 --已完成2200、已取消2400、已关闭2300
     */
  const btnList: {
    title: string;
    key: string;
    onClick: (() => void) | (() => void) | (() => void);
  }[] = [];
  // if (orderReturnItemCOList && orderReturnItemCOList.length) {
  //   const { statusCd } = orderReturnItemCOList[0];

  if (applyStatus === '1100') {
    btnList.push({
      title: '修改申请',
      key: '01',
      onClick: () => {
        if (applyType === 1000) {
          history.push({
            pathname: '/salesWarranty/refund',
            query: {
              goodsInfo: JSON.stringify({
                ...returnItemCO,
              }),
              orderInfo: JSON.stringify(item),
            },
          });
        }
        if (applyType === 1100) {
          history.push({
            pathname: '/salesWarranty/returnsSRefunds',
            query: {
              goodsInfo: JSON.stringify({
                ...returnItemCO,
              }),
              orderInfo: JSON.stringify(item),
            },
          });
        }
      },
    });
  }

  if (applyStatus === '1100' || applyStatus === '1200' || applyStatus === '1700') {
    btnList.push({
      title: '取消申请',
      key: '02',
      onClick: () => {
        console.log('returnItemCO', returnItemCO);
        dispatch!({
          type: 'warrantyList/cancelApply',
          payload: {
            memberId,
            applyId: item.applyId,
            callback: () => {
              onRefresh();
            },
          },
        });
      },
    });
  }
  if (applyStatus === '2200' || applyStatus === '2400' || applyStatus === '2300') {
    // btnList.push({
    //   title: '售后评价',
    //   key: '03',
    //   onClick: () => {},
    // });
  }
  // }

  return (
    <div
      className={styles.warrantyCell}
      onClick={(e) => {
        e.stopPropagation();
        history.push({
          pathname: '/salesWarranty/applyDetail',
          query: {
            orderId: item.orderId,
            applyId: item.applyId,
          },
        });
      }}
    >
      {(orderReturnItemCOList || []).map((returnItemCO) => {
        return (
          <>
            <div className={styles.goodsInfo}>
              <div className={styles.picWidth}>
                <img src={returnItemCO.skuPicFileUrl} alt="" />
              </div>
              <div className={styles.infos}>
                <div className={styles.title}>{returnItemCO.skuName}</div>
                <div className={styles.price}>￥{returnItemCO.skuPrice}</div>
              </div>
            </div>
            {btnList.length > 0 && (
              <div className={styles.btnList}>
                {btnList.map((item) => {
                  return (
                    <div
                      className={styles.btnItem}
                      key={item.key}
                      onClick={(e) => {
                        e.stopPropagation();
                        item.onClick && item.onClick();
                      }}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default connect(({ warrantyList }: { warrantyList: WarrantyListModelState }) => ({
  warrantyList,
}))(WarrantyCell);
