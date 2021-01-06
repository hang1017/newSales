import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';
import FormItem from '@/pages/bili/components/FormItem';
import IconUnSelect from '@/assets/img/un_select.png';
import IconSelect from '@/assets/img/customer/c_select.png';
import { Toast, Modal } from 'antd-mobile';
import styles from './index.less';

interface InvoiceActionProps {
  onClose: () => void;
  onSubmit: (e: any) => void;
  show?: boolean;
  userName?: string;
  userPhone?: string;
  invoiceContent: any;
  getInvoiceContent: (data: any) => void; // 获取当前发票的所有信息
  editFlag: number;
}

const InvoiceAction: FC<InvoiceActionProps> = (props) => {
  const {
    onClose = () => {},
    onSubmit = () => {},
    show = false,
    userName = '',
    userPhone = '',
    invoiceContent = {},
    getInvoiceContent = (data) => {},
    editFlag = 0,
  } = props;
  const [form] = useForm();
  const [isPersonal, setIsPersonal] = useState('0');
  const [memberInvoiceTemplate, setMemberInvoiceTemplate] = useState({
    personal: {},
    company: {},
  });

  useEffect(() => {
    const { taxpayerTel, templateName, receiveEmail } = invoiceContent?.personal;
    if ((userName || userPhone) && show) {
      setMemberInvoiceTemplate({
        personal: {
          taxpayerTel: taxpayerTel || userPhone,
          templateName: templateName || userName,
          receiveEmail,
        },
        company: {
          ...invoiceContent?.company,
        },
      });
    }
  }, [show, userName]);
  /**
   * 获取发票信息
   */
  const myGetInvoiceContent = () => {
    getInvoiceContent(memberInvoiceTemplate);
  };

  const renderNavBar = (): React.ReactNode => {
    // 头部
    return (
      <div className={styles.navBar}>
        开具发票
        <div
          onClick={() => {
            myGetInvoiceContent();
            onClose();
          }}
        ></div>
      </div>
    );
  };

  const renderCommitData = (): React.ReactNode => {
    // 提交按钮
    return (
      <div className={styles.commitFooter}>
        <div
          className={styles.commitBtn}
          onClick={() => {
            if (isPersonal === '0') {
              myGetInvoiceContent();
              onSubmit({
                type: '2',
              });
            } else if (isPersonal === '1') {
              if (!isCheckSuccess(isPersonal)) {
                return;
              }
              // eslint-disable-next-line no-restricted-syntax
              for (const key in memberInvoiceTemplate.personal) {
                if (Object.prototype.hasOwnProperty.call(memberInvoiceTemplate.personal, key)) {
                  const element = memberInvoiceTemplate.personal[key];
                  if (!isCanNext(key, element)) {
                    return;
                  }
                }
              }

              const { receiveEmail, taxpayerTel, templateName } =
                memberInvoiceTemplate.personal || {};
              myGetInvoiceContent();
              onSubmit({
                receiveEmail,
                taxpayerTel,
                templateName,
                type: '1',
              });
            } else {
              if (!isCheckSuccess(isPersonal)) {
                return;
              }

              // eslint-disable-next-line no-restricted-syntax
              for (const key in memberInvoiceTemplate.company) {
                if (Object.prototype.hasOwnProperty.call(memberInvoiceTemplate.company, key)) {
                  const element = memberInvoiceTemplate.company[key];
                  if (!isCanNext(key, element)) {
                    return;
                  }
                }
              }
              myGetInvoiceContent();
              onSubmit({
                ...memberInvoiceTemplate.company,
                type: '0',
              });
            }
          }}
        >
          提交
        </div>
      </div>
    );
  };
  const isCheckSuccess = (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case '1':
        form.submit();
        return;
        break;
      case '2':
        if (!Object.keys(memberInvoiceTemplate.company).includes('templateName')) {
          Toast.fail('请输入抬头！');
          return false;
        }
        if (!Object.keys(memberInvoiceTemplate.company).includes('taxpayerCd')) {
          Toast.fail('请输入税号！');
          return false;
        }
        if (!Object.keys(memberInvoiceTemplate.company).includes('taxpayerTel')) {
          Toast.fail('请输入手机号码！');
          return false;
        }
        break;
    }

    return true;
  };
  const isCanNext = (key, element) => {
    if (key === 'templateName') {
      if (element.length === 0) {
        Toast.fail('请输入抬头！');
        return false;
      }
    }
    if (key === 'taxpayerCd') {
      if (element.length === 0) {
        Toast.fail('请输入税号！');
        return false;
      }
    }
    return true;
  };
  const renderRaidoList = () => {
    // 公司和企业选择
    return (
      <div className={styles.radioBox}>
        <div
          className={styles.radioItem}
          onClick={() => {
            setIsPersonal('0');
            setMemberInvoiceTemplate({
              personal: {},
              company: {},
            });
          }}
        >
          <img src={isPersonal === '0' ? IconSelect : IconUnSelect} alt="" />
          <span
            className={classnames({
              [styles.select]: isPersonal === '0',
            })}
          >
            不开票
          </span>
        </div>
        <div
          className={styles.radioItem}
          onClick={() => {
            setIsPersonal('1');
          }}
        >
          <img src={isPersonal === '1' ? IconSelect : IconUnSelect} alt="" />
          <span
            className={classnames({
              [styles.select]: isPersonal === '1',
            })}
          >
            个人
          </span>
        </div>

        {/* <div
          className={styles.radioItem}
          onClick={() => {
            setIsPersonal('2');
          }}
        >
          <img src={isPersonal === '2' ? IconSelect : IconUnSelect} alt="" />
          <span
            className={classnames({
              [styles.select]: isPersonal === '2',
            })}
          >
            公司
          </span>
        </div> */}
      </div>
    );
  };

  const renderPersonalForm = () => {
    return (
      <div className={isPersonal === '0' ? styles.hideElement : styles.formBox}>
        <FormItem
          value={memberInvoiceTemplate.personal.templateName}
          title="发票抬头"
          type="input"
          placeholder="请输入姓名"
          smRight
          isRequest
          maxlength={6}
          blue
          // regex={/^[\u4e00-\u9fa5]{0,6}$/}
          onChange={(e: string) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              personal: {
                ...memberInvoiceTemplate.personal,
                templateName: e,
              },
            });
          }}
        />
        <FormItem
          value={memberInvoiceTemplate.personal.taxpayerTel}
          title="手机号码"
          type="input"
          placeholder="请输入手机号码"
          keyborderType="number"
          isRequest
          maxlength={11}
          blue
          smRight
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              personal: {
                ...memberInvoiceTemplate.personal,
                taxpayerTel: e,
              },
            });
          }}
          onBlur={(val) => {
            if (!/^1[3-9]\d{9}$/.test(val)) {
              Toast.fail('手机号码格式有误');
            }
          }}
        />
        <FormItem
          value={memberInvoiceTemplate.personal.receiveEmail}
          title="电子邮箱"
          type="input"
          placeholder="请输入电子邮箱"
          smRight
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              personal: {
                ...memberInvoiceTemplate.personal,
                receiveEmail: e,
              },
            });
          }}
        />
      </div>
    );
  };

  const renderCompanyForm = () => {
    return (
      <div className={styles.formBox}>
        <FormItem
          value={memberInvoiceTemplate.company.templateName}
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              company: {
                ...memberInvoiceTemplate.company,
                templateName: e,
              },
            });
          }}
          isRequest
          blue
          title="发票抬头"
          type="input"
          placeholder="请输入发票抬头"
          smRight
        />
        <FormItem
          value={memberInvoiceTemplate.company.taxpayerCd}
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              company: {
                ...memberInvoiceTemplate.company,
                taxpayerCd: e,
              },
            });
          }}
          title="税号"
          isRequest
          blue
          type="input"
          placeholder="请输入税号"
          smRight
        />
        <FormItem
          value={memberInvoiceTemplate.company.taxpayerTel}
          isRequest
          keyborderType="number"
          blue
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              company: {
                ...memberInvoiceTemplate.company,
                taxpayerTel: e,
              },
            });
          }}
          title="手机号码"
          type="input"
          placeholder="请输入手机号码"
          smRight
          onBlur={(val) => {
            if (!/^1[3-9]\d{9}$/.test(val)) {
              Toast.fail('手机号码格式有误');
            }
          }}
        />
        <FormItem
          value={memberInvoiceTemplate.company.receiveEmail}
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              company: {
                ...memberInvoiceTemplate.company,
                receiveEmail: e,
              },
            });
          }}
          title="电子邮箱"
          type="input"
          placeholder="选填"
          smRight={true}
        />
        <FormItem
          value={memberInvoiceTemplate.company.taxpayerAddress}
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              company: {
                ...memberInvoiceTemplate.company,
                taxpayerAddress: e,
              },
            });
          }}
          title="单位地址"
          type="input"
          placeholder="请输入单位地址"
          smRight={true}
        />
        <FormItem
          value={memberInvoiceTemplate.company.taxpayerBankName}
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              company: {
                ...memberInvoiceTemplate.company,
                taxpayerBankName: e,
              },
            });
          }}
          title="开户银行"
          type="input"
          placeholder="请输入开户银行"
          smRight={true}
        />
        <FormItem
          value={memberInvoiceTemplate.company.taxpayerBankAcct}
          onChange={(e) => {
            setMemberInvoiceTemplate({
              ...memberInvoiceTemplate,
              company: {
                ...memberInvoiceTemplate.company,
                taxpayerBankAcct: e,
              },
            });
          }}
          title="银行账户"
          type="input"
          placeholder="选填"
          smRight={true}
        />
      </div>
    );
  };

  const personFormsData = [
    {
      type: 'input',
      fieldProps: 'templateName',
      required: true,
      title: '发票抬头',
      placeholder: '请输入',
      editable: editFlag === 1,
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
      fieldProps: 'taxpayerTel',
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

  const onFinish = (values: Store) => {
    let temp = {
      ...memberInvoiceTemplate,
      personal: {
        ...values,
      },
    };
    setMemberInvoiceTemplate(temp);
    getInvoiceContent(temp);
    onSubmit({
      ...values,
      type: '1',
    });
  };

  const onFinishFailed = ({ errorFields = [] }: ValidateErrorEntity) => {
    Toast.fail(errorFields[0].errors[0], 1);
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    data: personFormsData,
    formsValues: memberInvoiceTemplate?.personal,
    form,
  };

  return (
    <>
      <Modal
        popup
        visible={show}
        animationType="slide-up"
        className={styles.actionModalstyle}
        onClose={onClose}
      >
        <div
          className={classnames({
            [styles.invoiceContent]: true,
            [styles.show]: show,
          })}
        >
          {renderNavBar()}
          {renderRaidoList()}
          {isPersonal === '0' && <div className={styles.hideElement}></div>}
          {isPersonal === '1' && (
            <div className={styles.personContent}>
              <DynamicForm {...formProps} />
            </div>
          )}
          {isPersonal === '2' ? renderCompanyForm() : <></>}
          {renderCommitData()}
        </div>
      </Modal>
    </>
  );
};

export default InvoiceAction;
