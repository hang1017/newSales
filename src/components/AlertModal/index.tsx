import React, { FC, useState, useEffect } from 'react';
import { Modal } from 'antd-mobile';
import styles from './index.less';
import ReactDOM from 'react-dom';

interface FooterItemProps {
  title: string;
  onPress?: () => void;
}

interface AlertModalProps {
  visible?: boolean;
  title?: string;
  content?: string;
  leftItem?: FooterItemProps;
  rightItem?: FooterItemProps;
}

const AlertModal: FC<AlertModalProps> = (props) => {
  const { title = '', content, visible = false, leftItem, rightItem } = props;
  const [doubleItem, setDoubleItem] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (leftItem && rightItem) {
      setDoubleItem(true);
    }

    setShow(visible);

    return () => {};
  }, []);
  return (
    <Modal className={styles.alertModal} visible={show} transparent maskClosable={false}>
      <div className={styles.alertContent}>
        {title.length > 0 ? <div className={styles.title}>{title}</div> : <></>}
        <div className={styles.alertBody}>{content}</div>
        <div className={styles.alertFooter}>
          {leftItem ? (
            <div
              className={`${styles.footerBtn} ${styles.leftBtn} ${doubleItem && styles.space}`}
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
                leftItem.onPress && leftItem.onPress();
              }}
            >
              {leftItem.title}
            </div>
          ) : (
            <></>
          )}
          {rightItem ? (
            <div
              className={`${styles.footerBtn} ${styles.rightBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
                rightItem.onPress && rightItem.onPress();
              }}
            >
              {rightItem.title}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default {
  show: (props: AlertModalProps) => {
    let div = document.getElementById('alert-div');
    if (div) {
      //  如果存在节点就删除
      div.remove();
    }
    div = document.createElement('div');
    div.id = 'alert-div';
    document.body.appendChild(div);

    ReactDOM.render(<AlertModal visible={true} {...props} />, div);
  },
};
