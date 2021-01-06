import React, { FC, useEffect } from 'react';
import { EmptyShopCartModelState, ConnectProps, connect } from 'alita';

import emptyIcon from '@/assets/img/empty_cart.png';
import Recommend from '@/components/Recommend';
import Empty from '@/components/Empty';

import styles from './index.less';

interface PageProps extends ConnectProps {
  emptyShopCart: EmptyShopCartModelState;
}

const EmptyShopCartPage: FC<PageProps> = ({ emptyShopCart, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = emptyShopCart;
  return (
    <div className={styles.emptyCart}>
      <Empty imgSrc={emptyIcon} text="购物车还是空的" />

      <Recommend />
    </div>
  );
};

export default connect(({ emptyShopCart }: { emptyShopCart: EmptyShopCartModelState }) => ({
  emptyShopCart,
}))(EmptyShopCartPage);
