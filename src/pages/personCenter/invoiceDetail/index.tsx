import React, { FC, useEffect, useState } from 'react';
import { InvoiceDetailModelState, ConnectProps, connect } from 'alita';
import { Button, Modal, Toast } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm } from '@alitajs/dform';
import Utils from '@/utils/tool';
import { InvoicePdf } from '@/components';
import { WavePng, InvoicePng, RightPng } from '@/assets';
import styles from './index.less';

interface PageProps extends ConnectProps {
  invoiceDetail: InvoiceDetailModelState;
}

const InvoiceDetailPage: FC<PageProps> = ({ invoiceDetail, dispatch, location }) => {
  const { orderId = '' } = location.query;
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState({});
  const [pdfFlag, setPdfFlag] = useState(false);
  const user = Utils.getStorageForJson('userInfo');
  useEffect(() => {
    dispatch!({
      type: 'invoiceDetail/queryInvoice',
      payload: {
        memberId: user?.memberId || '',
        orderId,
      },
    }).then((data: any) => {
      if (data) {
        if (data.length > 0) {
          setFormsValues({ ...data[0] });
        }
      }
    });
  }, []);

  const formsData = [
    {
      type: 'text',
      fieldProps: 'invoiceHeader',
      title: '发票抬头',
      placeholder: '暂无数据',
    },
    {
      type: 'text',
      fieldProps: 'invoiceNo',
      title: '发票号码',
      placeholder: '暂无数据',
    },
    {
      type: 'text',
      fieldProps: 'invoiceAmount',
      title: '发票金额',
      placeholder: '暂无数据',
      coverStyle: {
        color: '#F53C54',
      },
    },
    {
      type: 'text',
      fieldProps: 'createDate',
      title: '开票时间',
      placeholder: '暂无数据',
    },
    {
      type: 'text',
      fieldProps: 'invoiceType',
      title: '账户标识',
      placeholder: '暂无数据',
    },
  ] as IFormItemProps[];

  const formProps = {
    data: formsData,
    formsValues,
    form,
  };

  return (
    <div className={styles.invoiceDetailStyle}>
      <div className={styles.idsCenter}>
        <img src={WavePng} alt="" className={styles.idsImg} />
        <div className={styles.idsContent}>
          <div className={styles.idsImgDiv}>
            <img src={InvoicePng} alt="" className={styles.idsInvoiceImg} />
          </div>
          <div className={styles.idsDform}>
            <DynamicForm {...formProps} />
          </div>
          <div
            className={styles.idsLookInv}
            onClick={() => {
              if (formsValues.pdfUrl && formsValues.pdfUrl.length > 0) {
                // setPdfFlag(true);
                window.open(formsValues.pdfUrl); ///改用下载
              } else {
                Toast.show('当前无发票查看链接!', 1);
              }
            }}
          >
            <div>查看发票</div>
            <img src={RightPng} alt="" className={styles.idsRightImg} />
          </div>
          {/* <div className={styles.idsBtnDiv}>
            <Button className={styles.idsBtn}>推送到邮箱</Button>
          </div> */}
        </div>
      </div>
      {/* <Modal visible={pdfFlag}>
        <InvoicePdf
          visible={pdfFlag}
          close={() => {
            setPdfFlag(false);
          }}
          fileUrl={formsValues.pdfUrl}
        />
      </Modal> */}
    </div>
  );
};

export default connect(({ invoiceDetail }: { invoiceDetail: InvoiceDetailModelState }) => ({
  invoiceDetail,
}))(InvoiceDetailPage);
