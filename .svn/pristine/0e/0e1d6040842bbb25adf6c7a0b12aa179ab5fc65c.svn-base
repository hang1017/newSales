import React, { FC } from 'react';
import calssnames from 'classnames';
import styles from './index.less';

interface LeftTabProps {
  data: any[];
  activeId: string | number;
  tabClick: (res: any) => void;
}

const LeftTabPage: FC<LeftTabProps> = (props) => {
  const { data = [], activeId = '', tabClick } = props;
  return (
    <div className={styles.leftTabStyle}>
      {data.map((item) => (
        <div
          key={item?.categoryId}
          className={calssnames({
            [styles.leftTabItem]: true,
            [styles.leftTabItemActive]: item.categoryId === activeId,
          })}
          onClick={() => tabClick(item)}
        >
          <div className={styles.leftCategoryName}>{item.categoryName}</div>
          {item?.quantity > 0 && <div className={styles.leftTabItemNum}>{item?.quantity}</div>}
        </div>
      ))}
    </div>
  );
};

export default LeftTabPage;
