import React, { FC, useEffect, useState } from 'react';
import { SalesWarrantyModelState, ConnectProps, connect, history, router } from 'alita';
import SalesWarrantyHeader from '@/components/SalesWarrantyHeader';
import WarrantyTypeCell, { WarrantyTypeCellProps } from './components/WarrantyTypeCell';
import styles from './index.less';

import IconRefund from '@/assets/img/salesWarranty/salesWarranty-refund.png';
import IconReturnGoods from '@/assets/img/salesWarranty/salesWar-returnGoods.png';
import IconShippingPolicy from '@/assets/img/salesWarranty/shippingPolicy.png';
interface PageProps extends ConnectProps {
  salesWarranty: SalesWarrantyModelState;
}

const SalesWarrantyPage: FC<PageProps> = ({ salesWarranty, dispatch, location }) => {
  const [goodsInfo] = useState(JSON.parse(location.query.item));
  // 这里发起了初始化请求
  useEffect(() => {
    console.log(location.query);
    // dispatch!({
    //   type: 'salesWarranty/query',
    // });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = salesWarranty;
  const WarrantyTypes = [
    {
      icon: IconRefund,
      title: '我要退款(无需退货)',
      subTitle: '没收到货，或与卖家协商同意不用退货只退款',
      onClick: () => {
        router.push({
          pathname: '/salesWarranty/refund',
          query: {
            goodsInfo: JSON.stringify(goodsInfo),
            orderInfo: location.query.orderInfo,
          },
        });
      },
    },
    {
      icon: IconReturnGoods,
      title: '我要退货退款',
      subTitle: '已收到货，需要退还收到的货物',
      onClick: () => {
        // /salesWarranty/returnsSRefunds
        router.push({
          pathname: '/salesWarranty/returnsSRefunds',
          query: {
            goodsInfo: JSON.stringify(goodsInfo),
            orderInfo: location.query.orderInfo,
          },
        });
      },
    },
    // {
    //   icon: IconShippingPolicy,
    //   title: '我要换货',
    //   subTitle: '已收到货，需要更换已收到的货物',
    //   onClick: () => {},
    // },
  ] as WarrantyTypeCellProps[];

  return (
    <div className={styles.center}>
      <SalesWarrantyHeader item={goodsInfo} key={goodsInfo.goodsId} />

      <div className={styles.warrantyType}>
        {WarrantyTypes.map((item) => {
          return <WarrantyTypeCell key={item.title} {...item} />;
        })}
      </div>
    </div>
  );
};

export default connect(({ salesWarranty }: { salesWarranty: SalesWarrantyModelState }) => ({
  salesWarranty,
}))(SalesWarrantyPage);
