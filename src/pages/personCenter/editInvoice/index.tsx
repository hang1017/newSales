import React, { FC, useEffect, useState } from 'react';
import { Button, Toast } from 'antd-mobile';
import { EditInvoiceModelState, ConnectProps, connect, dropByCacheKey } from 'alita';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';
import SelectIcon from '@/assets/img/customer/c_select.png';
import UnSelectIcon from '@/assets/img/un_select.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  editInvoice: EditInvoiceModelState;
}

const EditInvoicePage: FC<PageProps> = ({ editInvoice, dispatch, location }) => {
  const [form] = useForm();
  const [invoiceType, setInvoiceType] = useState('1');
  const [editData, setEditData] = useState({});
  const { orderId = '' } = location.query;

  useEffect(() => {
    // 解除当前发票列表的keepalive
    dropByCacheKey('/personcenter/invoice');

    dispatch!({
      type: 'invoice/getInvoiceTemplateNameModel',
      payload: {
        orderId: parseInt(orderId, 10),
      },
    }).then((res: any) => {
      setEditData(res);
    });
  }, []);

  const onFinish = (values: Store) => {
    const params = {
      isDefault: 0,
      invoiceContent: '1000',
      type: parseInt(invoiceType, 10),
      taxpayerTel: values.receiveMobile,
      ...values,
    };
    dispatch!({
      type: 'editInvoice/addMemberInvoiceTemplate',
      payload: { params, orderId: parseInt(orderId, 10) },
    });
  };

  const onFinishFailed = ({ errorFields = [] }: ValidateErrorEntity) => {
    // console.log(errorFields);
    Toast.fail(errorFields[0].errors[0], 1);
  };

  /**
   * 发票类型改变事件
   */
  const invoiceTypeChange = (type: string) => {
    setInvoiceType(type);
  };

  const personFormsData = [
    {
      type: 'input',
      fieldProps: 'templateName',
      required: true,
      editable: editData?.editFlag === 1 ? true : false,
      title: '发票抬头',
      placeholder: '请输入',
      rules: [
        { required: true, message: `请输入发票抬头` },
        {
          pattern: new RegExp(/^[\u4e00-\u9fa5]{2,6}$/, 'g'),
          message: '名称只允许包含2～6位中文',
        },
      ],
    },
    {
      type: 'input',
      fieldProps: 'receiveMobile',
      title: '手机号码',
      required: true,
      placeholder: '请输入',
      inputType: 'number',
      maxLength: 11,
    },
    {
      type: 'input',
      fieldProps: 'receiveEmail',
      title: '电子邮箱',
      placeholder: '请输入',
    },
  ] as IFormItemProps[];

  const compFormData = [
    {
      type: 'input',
      fieldProps: 'templateName',
      required: true,
      title: '发票抬头',
      placeholder: '请输入',
    },
    {
      type: 'input',
      fieldProps: 'taxpayerCd',
      required: true,
      title: '税号',
      placeholder: '请输入',
    },
    {
      type: 'input',
      fieldProps: 'receiveMobile',
      title: '手机号码',
      placeholder: '请输入',
      inputType: 'number',
      maxLength: 11,
    },
    {
      type: 'input',
      fieldProps: 'receiveEmail',
      title: '电子邮箱',
      placeholder: '请输入',
    },
    {
      type: 'input',
      fieldProps: 'taxpayerAddress',
      title: '单位地址',
      placeholder: '请输入',
    },
    {
      type: 'input',
      fieldProps: 'taxpayerBankName',
      title: '开户银行',
      placeholder: '请输入',
    },
    {
      type: 'input',
      fieldProps: 'taxpayerBankAcct',
      title: '银行账户',
      placeholder: '请输入',
    },
  ] as IFormItemProps[];

  const formProps = {
    onFinish,
    onFinishFailed,
    // data: invoiceType === '1' ? personFormsData : compFormData,
    data: personFormsData,
    formsValues: {
      templateName: editData?.templateName || '',
    },
    form,
  };

  return (
    <div className={styles.editInvoiceStyle}>
      <div className={styles.editCenter}>
        <div className={styles.editContent}>
          <div className={styles.editSelect}>
            <img
              onClick={() => invoiceTypeChange('1')}
              src={invoiceType === '1' ? SelectIcon : UnSelectIcon}
              alt=""
              className={styles.editSelectImg}
            />

            <div className={styles.editSelectText}>个人</div>

            {/* <img
              onClick={() => invoiceTypeChange('0')}
              src={invoiceType === '0' ? SelectIcon : UnSelectIcon}
              alt=""
              className={styles.editSelectImg}
            />
            <div className={styles.editSelectText}>公司</div> */}
          </div>
          <DynamicForm {...formProps} />
          {/* {invoiceType === '2' && <DynamicForm {...formProps} />} */}
        </div>
      </div>
      <div className={styles.eiBtnDiv}>
        <Button className={styles.eiBtn} onClick={() => form.submit()}>
          提交
        </Button>
      </div>
    </div>
  );
};

export default connect(({ editInvoice }: { editInvoice: EditInvoiceModelState }) => ({
  editInvoice,
}))(EditInvoicePage);
