import React, { useState } from 'react';
import { Toast } from 'antd-mobile';
import SelectPng from '@/assets/img/customer/c_select.png';
import UnSelectPng from '@/assets/img/un_select.png';
import { CustomerPng } from '@/assets';
import styles from './index.less';

interface MagicFootBtn {
  btnText: string; // 按钮的字体
  onClick: () => void;
  children?: React.ReactNode;
  fileClick?: () => void;
  marketingRulesCLick?: () => void;
  showFile?: boolean;
  collect?: string;
  showCustomer?: boolean;
  customerClick?: () => void;
}

const Page: React.FC<MagicFootBtn> = (props) => {
  const {
    btnText,
    onClick,
    children,
    fileClick,
    marketingRulesCLick,
    showFile = true,
    collect,
    showCustomer = false,
    customerClick = () => {},
  } = props;
  const [selectFlag, setSelectFlag] = useState<boolean>(false);

  const imgClick = () => {
    setSelectFlag(!selectFlag);
  };
  const checkClick = () => {
    if (!showFile) {
      onClick();
      return;
    }
    if (selectFlag) {
      onClick();
    } else {
      Toast.show('请阅读并勾选协议');
    }
  };

  return (
    <div className={styles.magicBtn}>
      {showFile && (
        <div className={styles.checkDiv}>
          <img
            src={selectFlag ? SelectPng : UnSelectPng}
            alt=""
            className={styles.selImg}
            onClick={imgClick}
          />
          <div className={styles.checkBtn}>接受并同意</div>
          <div className={styles.mainColor} onClick={fileClick}>
            《服务协议》
          </div>
          <div>与</div>
          <div className={styles.mainColor} onClick={marketingRulesCLick}>
            《营销规则》
          </div>
        </div>
      )}
      <div className={styles.footContent}>
        {showCustomer && (
          <img src={CustomerPng} alt="" className={styles.customer} onClick={customerClick} />
        )}
        <div className={styles.btnContent} onClick={checkClick} param-action={collect || ''}>
          {children}
          <div className={styles.btnText} param-action={collect || ''}>
            {btnText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
