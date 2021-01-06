import React, { FC } from 'react';
import { Modal, NavBar, Icon } from 'antd-mobile';
import styles from './index.less';

interface InvoicePdfProps {
  visible: boolean;
  close: () => void;
  fileUrl?: string;
}

const InvoicePdf: FC<InvoicePdfProps> = ({ visible = false, close, fileUrl = '' }) => {
  return (
    <Modal visible={visible} className={styles.invoicePdfStyle}>
      <NavBar mode="light" icon={<Icon type="left" onClick={close} />} onLeftClick={() => close}>
        发票详情
      </NavBar>
      {/* {fileUrl && <FileViewer fileType={'pdf'} filePath={fileUrl} />} */}
    </Modal>
  );
};

export default InvoicePdf;
