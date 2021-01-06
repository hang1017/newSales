import React, { FC, useState } from 'react';
import { connect, ConnectProps, InvoiceModelState } from 'alita';
import { Toast } from 'antd-mobile';
import InvoiceSection from '../InvoiceSection';
import InVoiceActionSheet from '../InVoiceActionSheet';

interface InvoiceAlert extends ConnectProps {
  defaultType?: string;
  onSubmit: (data: any) => void;
  userName?: string;
  userPhone?: string;
  showFootBtn: (flag: boolean) => void;
  invoiceContent: any;
  getInvoiceContent: (data: any) => void;
  accNumAndFlag: any; // 打开发票弹框前先调用接口，这是接口入参
  checkPhoneInput: () => boolean;
  canInvoiceFlag?: boolean; // 是否能开发票
}

const Page: React.FC<InvoiceAlert> = (props) => {
  const {
    defaultType,
    onSubmit,
    userName = '',
    userPhone = '',
    showFootBtn,
    invoiceContent,
    getInvoiceContent,
    invoice,
    dispatch,
    accNumAndFlag = {},
    checkPhoneInput = () => false,
    canInvoiceFlag = true,
  } = props;

  const { editInfo = {} } = invoice;

  const { personal = {} } = invoiceContent;

  const [showInvoiceAction, setShowInvoiceAction] = useState(false);
  const [invoiceType, updateInvoiceType] = useState(defaultType);
  let typeName = '不开票';
  if (invoiceType === '2' || !invoiceType) {
    typeName = '不开票';
  } else if (invoiceType === '1') {
    typeName = '个人';
  } else {
    typeName = '公司';
  }
  // if (personal && Object.keys(personal).length) {
  //   typeName = '个人';
  // }

  return (
    <div>
      <InvoiceSection
        text={typeName}
        invoiceHandle={() => {
          if (!canInvoiceFlag) {
            Toast.fail('您选购的商品暂时不能开发票', 1);
            return;
          }
          if (!accNumAndFlag?.accNum) {
            Toast.fail('业务号码不能为空', 1);
            return;
          }
          if (!checkPhoneInput()) {
            return;
          }
          dispatch!({
            type: 'invoice/queryEditInvoiceFlag',
            payload: {
              ...accNumAndFlag,
            },
          }).then((e: any) => {
            setShowInvoiceAction(true);
            showFootBtn(true);
          });
        }}
      />
      <InVoiceActionSheet
        editFlag={editInfo?.editFlag}
        invoiceContent={invoiceContent}
        userName={editInfo?.templateName || userName}
        userPhone={userPhone}
        getInvoiceContent={getInvoiceContent}
        show={showInvoiceAction}
        onClose={() => {
          setShowInvoiceAction(false);
          showFootBtn(false);
        }}
        onSubmit={(data) => {
          updateInvoiceType(data.type);
          setShowInvoiceAction(false);
          onSubmit(data);
          showFootBtn(false);
        }}
      />
    </div>
  );
};

export default connect(({ invoice }: { invoice: InvoiceModelState }) => ({ invoice }))(Page);
