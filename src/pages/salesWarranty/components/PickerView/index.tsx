import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import IconClose from '@/assets/img/close.png';
import IconUnSelect from '@/assets/img/un_select.png';
import IconSelect from '@/assets/img/select.png';

interface PickViewItem {
  title?: string;
  id: string;
}

interface PickViewProps {
  data: PickViewItem[];
  onOk?: (e: PickViewItem) => void;
  show: boolean;
  onClose?: () => void;
  title?: string;
  initialzeValue?: string; // id
}

const PickerView: FC<PickViewProps> = ({
  title = '',
  onClose = () => {},
  show,
  onOk = () => {},
  data = [],
  initialzeValue = '',
}) => {
  const onCloseHandle = () => {
    onClose();
  };

  return (
    <>
      <div className={styles.mask} hidden={!show} onClick={onClose}></div>
      <div className={`${styles.pickerView} ${show ? styles.show : ''}`}>
        <div className={styles.titleView}>
          <div className={styles.title}>{title}</div>
          <div className={styles.closeBtn} onClick={onCloseHandle}>
            <img src={IconClose} alt="" />
          </div>
        </div>
        <div className={styles.mainScroll}>
          {data.map((item) => {
            return (
              <div
                className={styles.radioItem}
                key={item.id}
                onClick={() => {
                  onOk(item);
                  onCloseHandle();
                }}
              >
                <div>{item.title}</div>
                <img src={item.id === initialzeValue ? IconSelect : IconUnSelect} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PickerView;
