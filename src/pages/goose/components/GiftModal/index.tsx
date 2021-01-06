import React, { FC } from 'react';
import { Modal } from 'antd-mobile';
import HasGiftPng from '@/assets/img/goose/hasGift.png';
// import NoGiftPng from '@/assets/img/goose/noGift.png';
import styles from './index.less';

interface GiftModalProps {
  visible: boolean;
  close: () => void;
  giftData: any;
}

const GiftModal: FC<GiftModalProps> = (props: any) => {
  const { visible = false, close, giftData = {} } = props;
  return (
    <Modal visible={visible} className={styles.giftModalStyle} transparent>
      <img src={HasGiftPng} alt="" className={styles.hasGiftImg} />
      <div className={styles.smallText}>恭喜您！</div>
      <div className={styles.giftName}>获得{giftData?.prizeName}！</div>
      <div className={styles.backBtn} onClick={close}>
        返回
      </div>
    </Modal>
  );
};

export default GiftModal;
