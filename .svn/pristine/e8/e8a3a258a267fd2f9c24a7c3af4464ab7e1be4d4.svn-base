import { connect, ConnectProps, history, SectCouponModelType } from 'alita';
import { Tabs, Toast } from 'antd-mobile';
import React, { FC, useEffect, useState } from 'react';
import DcItemList from './component/DcItemList';
import classnames from 'classnames';
import styles from './index.less';

interface PageProps extends ConnectProps {
  sectCoupon: SectCouponModelType;
}

const SectCouponPage: FC<PageProps> = ({ sectCoupon, dispatch }) => {

  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'sectCoupon/qryCouponUnclaimedList',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { circleInstId, accNbr, circleMemberType, ownerCouponList, memberCouponList } = sectCoupon;
  const [tabIndex, UpdateTabIndex] = useState('2');
  const allCouponList = [ ...(memberCouponList || []), ...(ownerCouponList || []) ];

  const allotClick = (couponItem: any) => {
    dispatch!({
      type: 'allMember/save',
      payload: {
        circleInstId,
        accNbr,
        unclaimedId: couponItem.unclaimedId,
      }
    });
    history.push({
      pathname: '/sect/allMember'
    });
  }

  const receiveClick = (couponItem: any) => {
    dispatch!({
      type: 'sectCoupon/sectReceiveCoupon',
      payload:{
        unclaimedId: couponItem.unclaimedId,
      }
    }).then(() => {
      dispatch!({
        type: 'sectCoupon/qryCouponUnclaimedList',
      });
    });
  }
  return (
    <div className={styles.container}>
      {
        circleMemberType === '1' && (
          <div className={styles.titleLayout}>
            <div
              className={classnames({ [styles.leftNormalText]: true, [styles.activeText]: tabIndex === '2' })}
              onClick={() => UpdateTabIndex('2')}
            >
              成员
            </div>
            <div
              className={classnames({ [styles.normalText]: true, [styles.activeText]: tabIndex === '1' })}
              onClick={() => UpdateTabIndex('1')}
            >
              掌门
            </div>
          </div>
        )
      }
      {/* 若是成员，需拼上掌门送的券列表 */}
      <DcItemList
        tabKey={tabIndex}
        circleMemberType={circleMemberType}
        list={tabIndex === '2' ? (circleMemberType === '1' ? memberCouponList : allCouponList) : ownerCouponList}
        allotClick={allotClick}
        receiveClick={receiveClick}
      />
    </div>
  );
};

export default connect(({ sectCoupon }: { sectCoupon: SectCouponModelType }) => ({
  sectCoupon,
}))(SectCouponPage);
