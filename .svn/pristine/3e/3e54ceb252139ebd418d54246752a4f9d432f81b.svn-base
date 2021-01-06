import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';
import { Toast } from 'antd-mobile';
import FormItem from '../../components/FormItem';
import CommonSelectAlert from '../../components/CommonSelectAlert';
import OldPhoneAlert from '../../components/OldPhoneAlert';
interface TabItemProps {
  featureList: any;
  defaultChooseTyleValue: any;
  defaultPhone: string;
  provinceId: string;
  lanId: string;
  linePhone?: string;
  phoneInfoCallBack?: () => {};
  phoneTypeCallBack?: () => {}; // 返回当前选择的号码类型 新号码，老号码，所有
  dispatch?: any;
  showFootBtn: (flag: boolean) => {};
}
//
const showInputValues = ['503', '504'];

const PhoneChooseItem: FC<TabItemProps> = (props) => {
  const {
    featureList,
    defaultChooseTyleValue,
    dispatch,
    defaultPhone,
    provinceId,
    lanId,
    linePhone = '',
    phoneInfoCallBack,
    phoneTypeCallBack,
    showFootBtn,
  } = props;
  const [phone, updatePhone] = useState(defaultPhone);
  const [shownewPhoneAlert, setShownewPhoneAlert] = useState(false);
  const [oldPhoneList, setOldPhoneList] = useState([]);
  const [showOld, updateShowOld] = useState(false);
  const [inputType, updateInputType] = useState('select');
  const [isShowChoosePhoneType, updateIsShowChoosePhoneType] = useState(false);
  const [selectPhoneType, updateSelectPhoneType] = useState(defaultChooseTyleValue);
  const [placeholder, setPlaceholder] = useState('请选择号码');
  const chooseTypeClick = () => {
    updateIsShowChoosePhoneType(true);
    showFootBtn(true);
  };

  const showNewPhone = () => {
    setShownewPhoneAlert(true);
    showFootBtn(true);
  };
  useEffect(() => {
    if (defaultPhone) {
      updatePhone(defaultPhone);
    }

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, [defaultPhone]);
  const showOldPhone = () => {
    dispatch!({
      type: 'payConfirm/queryPhoneNumByMemberIdModels',
    }).then((data) => {
      if (data.length > 0) {
        setOldPhoneList(data);
        updateShowOld(true);
        showFootBtn(true);
      } else {
        updateShowOld(false);
        showFootBtn(false);
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
    showFootBtn(false);
    phoneInfoCallBack && phoneInfoCallBack(item);
  };
  /**
   * 选择旧号码
   */
  const oldPhoneSubmit = (selectPhone: any) => {
    updatePhone(selectPhone.phoneNum);
    updateShowOld(false);
    showFootBtn(false);
    phoneInfoCallBack && phoneInfoCallBack(selectPhone);
  };

  const selectPhoneTypeClick = (item: any) => {
    if (!item) {
      item = {
        typeName: '新装号码',
        typeVal: '501',
      };
    }
    showFootBtn(false);
    updateIsShowChoosePhoneType(false);
    if (item?.typeVal !== selectPhoneType?.typeVal) {
      updateSelectPhoneType(item);
      if (showInputValues.includes(item?.typeVal)) {
        updateInputType('input');
        setPlaceholder('请输入号码');
      } else {
        updateInputType('select');
        setPlaceholder('请选择号码');
      }
      updatePhone('');
      phoneTypeCallBack && phoneTypeCallBack(item);
    }
  };
  const numSelectClick = () => {
    ///选择新号码
    if (selectPhoneType.typeVal === '501') {
      showNewPhone();
    } else if (selectPhoneType.typeVal === '502') {
      showOldPhone();
    }
  };
  return (
    <div className={styles.headerSection}>
      <FormItem
        type="select"
        title="号码类型"
        placeholder="请选择号码类型"
        onClick={chooseTypeClick}
        value={selectPhoneType?.typeName}
      />
      <FormItem
        type={inputType}
        title="手机号码"
        placeholder={placeholder}
        onClick={numSelectClick}
        value={phone}
        onChange={(text) => {
          updatePhone(text);
        }}
        onBlur={() => {
          phoneInfoCallBack && phoneInfoCallBack({ phoneNum: phone });
        }}
      />
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
          showFootBtn(false);
        }}
        onComfirm={newOnComfirm}
      />

      <OldPhoneAlert
        phoneList={oldPhoneList}
        show={showOld}
        onClick={oldPhoneSubmit}
        closeClick={() => {
          updateShowOld(false);
          showFootBtn(false);
        }}
      />
      <OldPhoneAlert
        title={'选择号码类型'}
        phoneList={featureList}
        show={isShowChoosePhoneType}
        onClick={selectPhoneTypeClick}
        selectPhone={selectPhoneType?.typeVal}
        closeClick={() => {
          updateIsShowChoosePhoneType(false);
          showFootBtn(false);
        }}
      />
    </div>
  );
};

export default PhoneChooseItem;
