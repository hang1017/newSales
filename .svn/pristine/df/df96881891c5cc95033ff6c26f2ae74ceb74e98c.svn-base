import React, { FC, useEffect, useState } from 'react';
import {
  OldUserLoginSuccessModelState,
  ConnectProps,
  connect,
  history,
  IndexListModelState,
} from 'alita';
import { Toast } from 'antd-mobile';
import SingleBtn from '../components/SingleBtn';
import ConfirmItem from '../components/ConfirmItem';
import ServiceTips from '../components/ServiceTips';

import styles from './index.less';

interface PageProps extends ConnectProps {
  oldUserLoginSuccess: OldUserLoginSuccessModelState;
  indexList: IndexListModelState;
}

const OldUserLoginSuccessPage: FC<PageProps> = ({ oldUserLoginSuccess, dispatch, indexList }) => {
  const [agreement, setAgreement] = useState(false);
  const memberInfo = JSON.parse(localStorage.getItem('memberInfo'));
  const { skuList, cartAllData = [] } = indexList;
  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);

  const sureClick = () => {
    let urlGoodsList = (skuList || [])?.map((item: any) => {
      return { skuId: item.skuId, quantity: item.quantity };
    });
    localStorage.setItem('leave', '0');
    history.push({
      pathname: '/customer/payConfirm',
      query: {
        urlGoodsList: JSON.stringify(urlGoodsList),
      },
    });
  };

  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  return (
    <div className={styles.oldUserLogin}>
      <div className={styles.orderInfo}>
        <div className={styles.headTitle}>{memberInfo && memberInfo.memberName}</div>
        <div className={styles.headTitle}>欢迎回来青年一派</div>
      </div>
      <div className={styles.subTitle}>已选青年一派产品</div>

      <div className={styles.skuListInofo}>
        <>
          {skuList.map((item: any) => {
            return (
              <ConfirmItem
                skuName={item.goodsName}
                quantity={item.quantity}
                des={item.select}
                skuImg={item.skuInfoThumbnail}
                salesPrice={item.salesPrice}
              />
            );
          })}
        </>
        {cartAllData.giftList && cartAllData.giftList.length ? (
          <>
            <div className={styles.subTitle}>赠品</div>
            {cartAllData.giftList.map((item: any) => {
              return (
                <ConfirmItem
                  skuName={item.goodsName}
                  quantity={item.quantity}
                  des={item.skuName}
                  skuImg={item.picUrl}
                  salesPrice={item.price}
                />
              );
            })}
          </>
        ) : (
          ''
        )}
      </div>

      <div className={styles.fooBlock}>
        <ServiceTips
          defaultSelect={agreement}
          onChange={(isChecked) => {
            setAgreement(isChecked);
          }}
        />
        <SingleBtn text="确认提交" canClick={agreement} onClick={sureClick} />
      </div>
    </div>
  );
};

export default connect(
  ({
    oldUserLoginSuccess,
    indexList,
  }: {
    oldUserLoginSuccess: OldUserLoginSuccessModelState;
    indexList: IndexListModelState;
  }) => ({
    oldUserLoginSuccess,
    indexList,
  }),
)(OldUserLoginSuccessPage);
