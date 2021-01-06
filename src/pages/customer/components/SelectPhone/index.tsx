import React, { useState, useEffect } from 'react';
import { Toast } from 'antd-mobile';
import clearIcon from '@/assets/img/customer/clear.png';
import downIcon from '@/assets/img/customer/down.png';
import CommonSelectAlert from '../CommonSelectAlert';
import OldPhoneAlert from '../OldPhoneAlert';

import styles from './index.less';

interface SelectPhoneProps {
  onClick?: () => void;
  selectedPhone?: string; // 已经选择的号码
  dispatch?: any;
  provinceId: string;
  lanId: string;
  phoneInfoCallBack?: (phoneInfo: any) => void;
  linePhone?: string;
  initiazePage?: number;
  onChange?: (val: string) => void;
}

const Page: React.FC<SelectPhoneProps> = (props) => {
  const {
    onClick,
    selectedPhone,
    dispatch,
    provinceId,
    lanId,
    phoneInfoCallBack,
    linePhone = '',
    onChange = () => {},
    initiazePage = 0,
  } = props;
  const [phone, updatePhone] = useState(selectedPhone);
  const [shownewPhoneAlert, setShownewPhoneAlert] = useState(false);
  const [oldPhoneList, setOldPhoneList] = useState([]);
  const [showOld, updateShowOld] = useState(false);
  const clearClick = () => {
    updatePhone('');
  };

  const showNewPhone = () => {
    setShownewPhoneAlert(true);
    onChange('new');
  };
  useEffect(() => {
    // updatePhone(selectedPhone || '');
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  const showOldPhone = () => {
    onChange('old');
    dispatch!({
      type: 'payConfirm/queryPhoneNumByMemberIdModels',
    }).then((data) => {
      if (data.length > 0) {
        setOldPhoneList(data);
        updateShowOld(true);
      } else {
        updateShowOld(false);
        Toast.show('当前无老用户号码！');
      }
    });
  };

  /**
   * 选择新号码
   * @param item
   */
  const newOnComfirm = (item) => {
    const { phoneNum } = item;
    updatePhone(phoneNum);
    setShownewPhoneAlert(false);
    phoneInfoCallBack && phoneInfoCallBack(item);
  };
  /**
   * 选择旧号码
   */
  const oldPhoneSubmit = (selectPhone: any) => {
    updatePhone(selectPhone.phoneNum);
    updateShowOld(false);
    phoneInfoCallBack && phoneInfoCallBack(selectPhone);
  };
  return (
    <>
      <div className={styles.selectPhoneBlock}>
        <div>
          <span className={styles.label}>号码</span>
          {phone ? (
            ''
          ) : (
            <>
              <span className={styles.spanBtn} onClick={showNewPhone}>
                选择新号码
                <img src={downIcon} alt="" />
              </span>
              {initiazePage !== 0 && (
                <span className={styles.spanBtn} onClick={showOldPhone}>
                  选择老号码
                  <img src={downIcon} alt="" />
                </span>
              )}
            </>
          )}
        </div>
        <div>
          {phone ? (
            <>
              <span className={styles.selectPhone}>{phone}</span>
              <img src={clearIcon} alt="" onClick={clearClick} />
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <CommonSelectAlert
        dispatch={dispatch}
        show={shownewPhoneAlert}
        isShowNew
        from="bilibi"
        provinceId={provinceId}
        lanId={lanId}
        linePhone={linePhone}
        closeClick={() => {
          setShownewPhoneAlert(false);
        }}
        onComfirm={newOnComfirm}
      />

      <OldPhoneAlert
        phoneList={oldPhoneList}
        show={showOld}
        onClick={oldPhoneSubmit}
        closeClick={() => {
          updateShowOld(false);
        }}
      />
    </>
  );
};

export default Page;
