import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import IconRightMore from '@/assets/img/rigth_more.png';
import PickerView from '../PickerView';

interface SelectItemProps {
  title?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e) => void;
  data?: { title?: string; id: string }[];
  initValue?: string;
}

const SelectItem: FC<SelectItemProps> = ({
  placeholder,
  value,
  title,
  onChange = () => {},
  data = [],
  initValue = '',
}) => {
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div
        className={styles.selectItem}
        onClick={() => {
          setShowPicker(true);
        }}
      >
        <div className={styles.selectItemTitle}>{title}</div>
        <div className={styles.sectionFt}>
          <span hidden={!value || value.length === 0} className={styles.selectItemValue}>
            {value}
          </span>
          <span hidden={!!value && value.length > 0} className={styles.selectItemPlaceholder}>
            {placeholder}
          </span>
          <img src={IconRightMore} alt="" />
        </div>
      </div>
      <PickerView
        show={showPicker}
        onClose={() => {
          setShowPicker(false);
        }}
        onOk={(item) => {
          onChange(item);
        }}
        initialzeValue={initValue}
        title={title}
        data={data}
      />
    </>
  );
};

export default SelectItem;
