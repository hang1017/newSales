import React, { FC, useEffect } from 'react';
import styles from './index.less';
import { InputItem, Flex } from 'antd-mobile';

interface SelectItemProps {
  title?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e) => void;
}

const SelectItem: FC<SelectItemProps> = ({ placeholder, value, title, onChange = () => {} }) => {
  return (
    <Flex direction="row" className={styles.selectItem}>
      <div className={styles.selectItemTitle}>{title}</div>
      <Flex.Item className={styles.sectionbd}>
        <InputItem placeholder={placeholder} onChange={onChange} value={value} />
      </Flex.Item>
    </Flex>
  );
};

export default SelectItem;
