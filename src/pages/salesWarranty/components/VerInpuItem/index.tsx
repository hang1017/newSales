import React, { FC, useEffect } from 'react';
import styles from './index.less';
import { InputItem } from 'antd-mobile';

interface SelectItemProps {
  title?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e) => void;
}

const SelectItem: FC<SelectItemProps> = ({ placeholder, value, title, onChange = () => {} }) => {
  return (
    <div className={styles.selectItem}>
      <div className={styles.selectItemTitle}>{title}</div>
      <div className={styles.sectionbd}>
        <InputItem placeholder={placeholder} onChange={onChange} />
      </div>
    </div>
  );
};

export default SelectItem;
