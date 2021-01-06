import React, { FC } from 'react';
import { Modal } from 'antd-mobile';
import styles from './index.less';
import closeIcon from '@/assets/img/close.png';

interface FileModalProps {
  visible: boolean;
  pathUrl: any;
  type?: string;
  close?: () => void;
  title?: string;
}

const FileModal: FC<FileModalProps> = (props) => {
  const { visible = false, pathUrl, type = 'docx', close, title = '' } = props;
  return (
    <Modal
      popup
      visible={visible}
      animationType="slide-up"
      className={styles.fileModalstyle}
      onClose={close}
    >
      <div className={styles.modalContent}>
        <div className={styles.alertHead}>
          <div className={styles.leftBack}></div>
          <div className={styles.alertTitle}>{title}</div>
          <div
            className={styles.rightClose}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <img src={closeIcon} alt="" onClick={close} />
          </div>
        </div>
        {/* <div>{pathUrl}</div> */}
        <div className={styles.htmlContent}>
          <div dangerouslySetInnerHTML={{ __html: pathUrl }}></div>
        </div>
      </div>
    </Modal>
  );
};

export default FileModal;
