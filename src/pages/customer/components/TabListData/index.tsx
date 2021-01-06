import React, { FC } from 'react';
import { TabItem } from '..';
import styles from './index.less';

interface TabListDataProps {
  data: any;
  reduceClick: (res: any) => void;
  addClick: (res: any) => void;
  click: (res: any) => void;
  type?: 'sku' | 'gift' | 'goods'; // 代表已选的sku商品/赠品/商品列表的数据
}

const TabListData: FC<TabListDataProps> = (props) => {
  const { data = {}, reduceClick, addClick, click, type = 'goods' } = props;
  return (
    <div className={styles.tabListDataStyle} id={`categoryId-${data.categoryId}`}>
      <div className={styles.tdName}>{data.categoryName}</div>
      {data?.values.map((item: any) => (
        <TabItem
          key={item.goodsId}
          data={item}
          reduceClick={(e: any) => reduceClick(e)}
          addClick={(e: any) => addClick(e)}
          click={click}
          type={type}
        />
      ))}
    </div>
  );
};

export default TabListData;
