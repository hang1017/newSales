import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import IconClose from '@/assets/img/quantity/close.png';
import IconNoCheck from '@/assets/img/quantity/non-check.png';
import IconChecked from '@/assets/img/quantity/checked.png';
import selectIcon from '@/assets/img/customer/c_select.png';

interface PhonePopViewItem {
  onClick?: () => void;
  title: string;
  key: string | number;
}

interface itemProps {
  text: string;
  key: string;
}

interface PhonePopViewProps {
  visiable: boolean;
  defaultSelect: string;
  onClose?: () => void;
  dataList?: Array<itemProps>;
  onOk: (e: string) => void;
}

const PhonePopView: FC<PhonePopViewProps> = ({
  visiable,
  defaultSelect,
  dataList = [],
  onClose = () => {},
  onOk = (val: string) => {},
}) => {
  const [selectKey, setSelectKey] = useState(defaultSelect);
  useEffect(() => {
    // 没有传默认值，则默认选中第一个
    if (!defaultSelect && dataList.length > 0) {
      setSelectKey(dataList[0].key);
    }
    return () => {};
  }, []);

  const renderPayCell = (item: itemProps) => (
    <div
      key={item.key}
      className={styles.payCellBox}
      onClick={() => {
        setSelectKey(item.key);
        onOk(item.key);
        onClose();
      }}
    >
      <div className={styles.leftIcon}>
        <span>{item.text}</span>
      </div>
      <div className={styles.radio}>
        <img src={selectKey !== item.key ? IconNoCheck : selectIcon} alt="" />
      </div>
    </div>
  );
  return (
    <>
      <div
        onClick={onClose}
        hidden={!visiable}
        className={classnames({
          [styles.modal]: true,
        })}
      ></div>
      <div
        className={classnames({
          [styles.wrapper]: true,
          [styles.show]: visiable,
        })}
      >
        <div className={styles.wrapperTitle}>
          <span>选择查询号码</span>
          <img src={IconClose} onClick={onClose} alt="" />
        </div>
        <div className={styles.listContain}>{dataList.map((item) => renderPayCell(item))}</div>

        {/*     <div
                className={styles.okBtn}
                onClick={() => {
                  onClose();
                  onOk(selectKey);
                }}
              >
                确定
             </div>
     */}
      </div>
    </>
  );
};

export default PhonePopView;
