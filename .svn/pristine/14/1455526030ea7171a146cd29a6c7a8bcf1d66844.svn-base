import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import FormItem from '@/pages/bili/components/FormItem';
import styles from './index.less';
import IconUnSelect from '@/assets/img/un_select.png';
import IconSelect from '@/assets/img/select.png';
import { Toast } from 'antd-mobile';

interface InvoiceActionProps {
  onClose: () => void;
  onSubmit: (e: any) => void;
  show?: boolean;
  userName?: string;
  userPhone?: string;
}

const InvoiceAction: FC<InvoiceActionProps> = (props) => {
  const {
    onClose = () => {},
    onSubmit = () => {},
    show = false,
    userName = '',
    userPhone = '',
  } = props;
  const [isPersonal, setIsPersonal] = useState('0');
  const [memberInvoiceTemplate, setMemberInvoiceTemplate] = useState({
    personal: {},
    company: {},
  });

  useEffect(() => {
    if ((userName || userPhone) && show) {
      setMemberInvoiceTemplate({
        personal: {
          taxpayerTel: userPhone,
          templateName: userName,
        },
        company: {},
      });
    }
  }, [show]);

  const renderNavBar = (): React.ReactNode => {
    // 头部
    return (
      <div className={styles.navBar}>
        开具发票
        <div onClick={onClose}></div>
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
              onSubmit({
                type: '2',
              });
            } else if (isPersonal === '1') {
              if (!isCheckSuccess(isPersonal)) {
                return;
              }
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

              for (const key in memberInvoiceTemplate.company) {
                if (Object.prototype.hasOwnProperty.call(memberInvoiceTemplate.company, key)) {
                  const element = memberInvoiceTemplate.company[key];
                  if (!isCanNext(key, element)) {
                    return;
                  }
                }
              }

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
    switch (type) {
      case '1':
        if (!Object.keys(memberInvoiceTemplate.personal).includes('templateName')) {
          Toast.fail('请输入抬头！');
          return false;
        }
        if (!Object.keys(memberInvoiceTemplate.personal).includes('taxpayerTel')) {
          Toast.fail('请输入手机号码！');
          return false;
        }
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

    if (type === '2') {
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
        <div
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
        </div>
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
          smRight={true}
          isRequest={true}
          onChange={(e) => {
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
          isRequest={true}
          smRight={true}
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
          smRight={true}
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
          isRequest={true}
          title="发票抬头"
          type="input"
          placeholder="请输入发票抬头"
          smRight={true}
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
          isRequest={true}
          type="input"
          placeholder="请输入税号"
          smRight={true}
        />
        <FormItem
          value={memberInvoiceTemplate.company.taxpayerTel}
          isRequest={true}
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
          smRight={true}
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

  return (
    <>
      <div
        hidden={!show}
        className={styles.mask}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      <div
        className={classnames({
          [styles.invoiceContent]: true,
          [styles.show]: show,
        })}
      >
        {renderNavBar()}
        {renderRaidoList()}
        {isPersonal !== '2' ? renderPersonalForm() : <></>}
        {isPersonal === '2' ? renderCompanyForm() : <></>}
        {renderCommitData()}
      </div>
    </>
  );
};

export default InvoiceAction;
