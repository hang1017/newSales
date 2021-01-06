import React from 'react';

import closeIcon from '@/assets/img/close.png';

import styles from './index.less';

interface ActionSheet {
  closeClick?: () => void;
  show?: boolean;
  heigth?: number; //  弹窗默认的高度
  title: string; // 弹窗标题
  hasRadio?: boolean; // 弹窗是否有圆角
}

const Page: React.FC<ActionSheet> = (props) => {
  const {
    show,
    closeClick = () => {},
    children,
    heigth = document.documentElement.clientWidth,
    title,
    hasRadio = true,
  } = props;
  return (
    <div className={styles.actionModel}>
      {show && (
        <div
          className={styles.actionBg}
          onClick={(e) => {
            e.stopPropagation();
            closeClick(e);
          }}
        ></div>
      )}
      <div
        className={`${styles.actAlert} ${show && styles.show}`}
        style={
          hasRadio
            ? { maxHeight: '70vh', borderRadius: '24px 24px 0px 0px', overflowY: 'scroll' }
            : { maxHeight: '70vh', overflowY: 'scroll' }
        }
      >
        <div className={styles.alertHead}>
          <div className={styles.alertTitle}>{title}</div>
          <div
            className={styles.rightClose}
            onClick={(e) => {
              e.stopPropagation();
              closeClick(e);
            }}
          >
            <img src={closeIcon} alt="" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Page;
