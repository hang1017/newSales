import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd-mobile';
import CloseIcon from '@/assets/close.png';
import SelectIcon from '@/assets/img/select_blue.png';
import UnSelectIcon from '@/assets/img/un_select.png';
import styles from './index.less';

interface SelectProModalProps {
  visible: boolean;
  title: string | Node;
  close: () => void;
  onConfrim: (res: any) => void;
  data: any[];
}

const SelectProModal: FC<SelectProModalProps> = (props) => {
  const [activePro, setActivePro] = useState<any>({});
  const { visible = false, close = () => {}, title = '', data = [], onConfrim = () => {} } = props;

  return (
    <Modal
      visible={visible}
      popup
      animationType="slide-up"
      className={styles.selectProModalStyle}
      onClose={close}
    >
      <div className={styles.selectProModalContent}>
        <div className={styles.modalTop}>
          <div className={styles.modalTitle}>{title}</div>
          <img src={CloseIcon} alt="" className={styles.closeImg} onClick={close} />
        </div>
        <div className={styles.selectProList}>
          {data.map((item) => (
            <div
              className={styles.selectProItem}
              key={item?.rightsId}
              onClick={() => setActivePro(item)}
            >
              <img className={styles.spImg} src={item?.filePathInServer} alt="" />
              <div className={styles.spTitle}>{item?.rightsName}</div>
              <img
                src={activePro?.rightsId === item?.rightsId ? SelectIcon : UnSelectIcon}
                alt=""
                className={styles.spIcon}
              />
            </div>
          ))}
        </div>
        <div className={styles.btnDiv}>
          <Button className={styles.btn} onClick={() => onConfrim(activePro)}>
            确认
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectProModal;
