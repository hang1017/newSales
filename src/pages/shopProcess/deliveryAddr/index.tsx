import React, { FC, useEffect } from 'react';
import { DeliveryAddrModelState, ConnectProps, connect, history, router } from 'alita';

import AddrItem from '@/components/AddrItem';
import SingleBtn from '@/components/SingleBtn';
import Utils from '@/utils/tool';

interface PageProps extends ConnectProps {
  deliveryAddr: DeliveryAddrModelState;
}

const DeliveryAddrPage: FC<PageProps> = ({ deliveryAddr, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'deliveryAddr/queryAddress',
      payload: {},
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
      dispatch!({
        type: 'deliveryAddr/save',
        payload: {
          addressLists: [],
        },
      });
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { addressLists = [] } = deliveryAddr;

  const onMyClick = (isAddAddress: boolean, item?: any) => {
    // 一开始新增的时候，如果这个会员没有收货地址，那么这个地址一定会是默认收货地址
    // 然后当有多个收货地址的时候，可以设置其他地址为默认收货地址。
    // 这样的话可以保证，如果 会员有收货地址，那么他肯定有且只有一个默认收货地址

    let canChangeDefault = true;
    if (!isAddAddress) {
      const { defaultAddr = '' } = item;

      // 修改地址
      // if (defaultAddr === AddressType.default) {
      //   // 如果原来是默认地址则不能修改
      //   canChangeDefault = false;
      // } else {
      //   canChangeDefault = true;
      // }
      dispatch!({
        type: 'addDeliveryAddr/save',
        payload: {
          isAddAddress: false,
          addressInfo: item,
          canChangeDefault,
        },
      });
    } else {
      // 新增地址
      // if (addressLists.length > 0) {
      //   canChangeDefault = true;
      // } else {
      //   canChangeDefault = false;
      // }
      dispatch!({
        type: 'addDeliveryAddr/save',
        payload: {
          canChangeDefault,
        },
      });
    }
    history.push({
      pathname: '/shopProcess/addDeliveryAddr',
    });
  };
  const selectAddress = (data: any) => {
    const { receiveAddrId } = data;

    dispatch!({
      type: 'fillOrder/selAddress',
      payload: {
        receiveAddrId,
        // receiveAddrId: '10',
      },
    }).then(() => {
      dispatch!({
        type: 'fillOrder/save',
        payload: {
          addressInfo: data,
        },
      });
      router.goBack();
    });
  };
  return (
    <div>
      {addressLists.map((item: any) => {
        return (
          <AddrItem
            data={item}
            itemClick={() => selectAddress(item)}
            editAddrClick={() => onMyClick(false, item)}
          />
        );
      })}
      <SingleBtn text="+ 添加新地址" onClick={() => onMyClick(true)} />
    </div>
  );
};

export default connect(({ deliveryAddr }: { deliveryAddr: DeliveryAddrModelState }) => ({
  deliveryAddr,
}))(DeliveryAddrPage);
