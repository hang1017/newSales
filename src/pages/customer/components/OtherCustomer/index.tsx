/* eslint-disable jsx-a11y/iframe-has-title */
import React, { FC, useEffect, useState } from 'react';
import { OUT_WS_URL } from '@/global';
import styles from './index.less';

interface OhterCustomerProps {
  close: () => void;
  goodsId?: string;
  storeId?: number;
}

const OhterCustomer: FC<OhterCustomerProps> = (props: any) => {
  const { close = () => {}, goodsId = '', storeId = 0 } = props;
  const [url, setUrl] = useState(`${OUT_WS_URL}${localStorage.getItem('tokenCode') || ''}`);

  useEffect(() => {
    let newUrl = `${OUT_WS_URL}${localStorage.getItem('tokenCode')}`;
    if (goodsId) {
      newUrl += `&goodsId=${goodsId}`;
    }
    if (goodsId) {
      newUrl += `&goodsId=${goodsId}`;
    }
    if (storeId) {
      newUrl += `&storeId=${storeId}`;
    }
    setUrl(newUrl);
  }, [storeId, goodsId]);

  return (
    <div className={styles.ohterCustomerStyle}>
      <iframe src={url} id="iframeId" style={{ height: '99vh', width: '100%', border: 'none' }} />
      <div className={styles.backDiv} onClick={close} />
    </div>
  );
};

export default OhterCustomer;
