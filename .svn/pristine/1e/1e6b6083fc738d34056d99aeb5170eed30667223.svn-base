import React, { FC, useState, useEffect } from 'react';

import styles from './index.less';



interface MyTabsProps {
  activeIndex: number;
  tabList: any[];
  onTabChange: (key: number) => void;
}

const FormItem: FC<MyTabsProps> = (props) => {

  const { activeIndex, tabList, onTabChange } = props;
  const [currentIndex, updateIndex] = useState(activeIndex);

  return (
    <div className={styles.tabList}>
      {tabList.map((item, index) => {
        const { label, key } = item || {};

        return (
          <div
            className={index === currentIndex ? styles.selectTab : styles.normalTab}
            onClick={() => {
              updateIndex(key);
              onTabChange(key);
            }}
          >
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );

};

export default FormItem;
