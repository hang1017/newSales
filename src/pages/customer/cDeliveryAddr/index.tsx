import React, { FC, useEffect, useState, useRef } from 'react';
import { CDeliveryAddrModelState, ConnectProps, connect, history } from 'alita';
import { Toast } from 'antd-mobile';
import Utils from '@/utils/tool';
import AddrItem from '@/components/AddrItem';
import addIcon from '@/assets/img/customer/add.png';

import styles from './index.less';

import BetterScroll from 'better-scroll';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

interface PageProps extends ConnectProps {
  cDeliveryAddr: CDeliveryAddrModelState;
}

let bs: BScrollConstructor<{}> | null = null;

const CDeliveryAddrPage: FC<PageProps> = ({ cDeliveryAddr, dispatch, location }) => {
  //  const { isMyPage = '' } = location?.query?.isMyPage || {};
  const [windowHeight, setWindowHeight] = useState(0);
  const memberInfo = Utils.getStorageForJson('memberInfo');

  const ref = useRef(null);
  if (document.readyState === 'complete' && !bs) {
    setTimeout(() => {
      bs = new BetterScroll(ref.current, {
        probeType: 3,
        scrollY: true,
        scrollX: false,
        click: true,
        bounce: false,
      });
    }, 200);
  }

  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'cDeliveryAddr/queryAddress',
    });
    setWindowHeight(document.documentElement.clientHeight - 120);
    return () => {
      bs = null;
      dispatch!({
        type: 'cDeliveryAddr/save',
        payload: {
          addressLists: [],
        },
      });
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { addressLists = [] } = cDeliveryAddr;
  /**
   * 编辑地址
   * @param isAddAddress
   * @param item
   */
  const onMyClick = (isAddAddress: boolean, item?: any) => {
    // 一开始新增的时候，如果这个会员没有收货地址，那么这个地址一定会是默认收货地址
    // 然后当有多个收货地址的时候，可以设置其他地址为默认收货地址。
    // 这样的话可以保证，如果 会员有收货地址，那么他肯定有且只有一个默认收货地址

    let canChangeDefault = true;
    if (!isAddAddress) {
      const { defaultAddr = '' } = item;

      dispatch!({
        type: 'cAddDeliveryAddr/save',
        payload: {
          isAddAddress: false,
          addressInfo: item,
          canChangeDefault,
        },
      });
      const { provinceId = '', cityId = '', regionId = '', streetId = '' } = item;
      const areaList = [];
      areaList.push(provinceId);
      areaList.push(cityId);
      areaList.push(regionId);
      // areaList.push(streetId);
      const parentId = areaList[areaList.length - 2];
      dispatch!({
        type: 'cAddDeliveryAddr/queryAreaNextLevel',
        payload: {
          parentId,
        },
      });
    } else {
      dispatch!({
        type: 'cAddDeliveryAddr/save',
        payload: {
          canChangeDefault,
          addressInfo: {
            phoneNumber: memberInfo && memberInfo?.phone ? memberInfo?.phone : '',
          },
        },
      });
    }
    history.push({
      pathname: '/customer/cAddDeliveryAddr',
    });
  };
  /**
   * 选择地址,支付确认设置地址
   * @param data
   */
  const selectAddress = (data: any) => {
    if (location?.query?.isMyPage === '2') {
      // 二次业务
      dispatch!({
        type: 'emerPayConfirm/selAddress',
        payload: {
          data,
        },
      }).then((isSuccess: boolean) => {
        if (isSuccess) {
          history.goBack();
        }
      });
    } else if (location?.query?.isMyPage === '3') {
      const params = JSON.parse(location?.query?.params || '{}');
      dispatch!({
        type: 'equityExchange/exchangeCertificateOrderCommit',
        payload: {
          ...params,
          receiveAddrId: data?.receiveAddrId,
        },
      }).then((res: any) => {
        if (res) {
          history.replace({
            pathname: '/customer/generalSuccess',
          });
        } else {
          setTimeout(() => {
            history.goBack();
          }, 2000);
        }
      });
    } else if (location?.query?.isMyPage !== '1') {
      dispatch!({
        type: 'payConfirm/selAddress',
        payload: {
          data,
        },
      }).then((isSuccess) => {
        if (isSuccess) {
          // dispatch!({
          //   type: 'payConfirm/save',
          //   payload: {
          //     addressInfo: data,
          //   },
          // });
          history.goBack();
        }
      });
    }
  };

  return (
    <div className={styles.viewStyle} style={{ height: windowHeight }}>
      <div className={styles.addrListBlock}>
        {addressLists.map((item: any) => {
          return (
            <AddrItem
              key={item.receiveAddrId}
              data={item}
              itemClick={() => selectAddress(item)}
              editAddrClick={() => onMyClick(false, item)}
            />
          );
        })}
      </div>

      <div
        className={styles.addBtn}
        onClick={() => {
          onMyClick(true);
        }}
      >
        {' '}
        <img src={addIcon} alt="" />
        添加新地址
      </div>
    </div>
  );
};

export default connect(({ cDeliveryAddr }: { cDeliveryAddr: CDeliveryAddrModelState }) => ({
  cDeliveryAddr,
}))(CDeliveryAddrPage);
