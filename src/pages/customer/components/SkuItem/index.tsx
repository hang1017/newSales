import React, { useState } from 'react';

import styles from './index.less';

interface EmptyItem {
  item: any;
  attrCode: string;
  onClick: (attrCode: string, attrValue: string, attrName: string) => void;
}

const Page: React.FC<EmptyItem> = (props) => {
  const { item = {}, attrCode, onClick } = props;
  const [selectIndex, updateSelectIndex] = useState(0);
  const myClick = (index: number, data: any) => {
    const { attrValue = '', name = '' } = data;
    updateSelectIndex(index);
    if (onClick) {
      onClick(attrCode, attrValue, name);
    }
  };

  return (
    <>
      <div className={styles.alertTitle}>{item.attrName}</div>
      <div className={styles.colorBlock}>
        {item.attrValues.map((childItem: any, index: number) => (
          <span
            key={index}
            className={index === selectIndex ? styles.selectColor : styles.normalColor}
            onClick={() => {
              myClick(index, childItem);
            }}
          >
            {childItem.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default Page;
