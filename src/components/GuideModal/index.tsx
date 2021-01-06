/* eslint-disable array-callback-return */
import React, { FC, useEffect, useState } from 'react';
import { Modal, Button } from 'antd-mobile';
import { TabItem } from '@/pages/customer/components';
import ClosePng from '@/assets/close.png';
import styles from './index.less';

interface GuideModalProps {
  visible: boolean;
  close: (res: any[]) => void;
  data: any[];
  reduceClick: (e: any) => void;
  addClick: (e: any) => void;
  confirmClick: (res: any[]) => void;
  getNowClick: (res: any) => void;
}

const GuideModal: FC<GuideModalProps> = (props) => {
  const {
    visible = false,
    close,
    data = [],
    addClick,
    reduceClick,
    confirmClick,
    getNowClick,
  } = props;
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (data && data.length) {
      let num = 0;
      data.map((item: any) => {
        num += item?.quantity;
      });
      if (num) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    } else {
      setBtnDisabled(true);
    }
  }, [data]);

  return (
    <Modal
      visible={visible}
      className={styles.guideModalStyle}
      popup
      onClose={() => close(data)}
      animationType="slide-up"
    >
      <div className={styles.guideModalContent}>
        <img src={ClosePng} alt="" className={styles.closeImg} onClick={() => close(data)} />
        <div className={styles.gmTitle}>选择已有派卡</div>
        <div className={styles.gmSubTitle}>
          您目前还不是派卡用户。
          <span onClick={() => getNowClick(data[0])}>立即获取派卡，加入青年一派。</span>
        </div>
        <div className={styles.listContent}>
          {data.map((item: any) => (
            <TabItem
              key={item.goodsId}
              data={item}
              reduceClick={(e: any) => reduceClick(e)}
              addClick={(e: any) => addClick(e)}
              click={() => {}}
              type="goods"
            />
          ))}
        </div>
        <div className={styles.btnDiv}>
          <Button className={styles.btn} onClick={() => confirmClick(data)} disabled={btnDisabled}>
            确定
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GuideModal;
