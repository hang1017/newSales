import React, { FC, useState, useEffect } from 'react';
import FormItem from '../../../components/FormItem';
import { Toast } from 'antd-mobile';
import styles from './index.less';

type FunctionType = (e: any) => void;
type DataType = {
  name?: string;
  idCard?: string;
  phone?: string;
  smsCode?: string;
};
let timer: NodeJS.Timeout | null = null;
let second = 60;

interface UserInfoProps {
  onChange: FunctionType;
  data?: DataType;
  dispatch?: any;
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { data = {}, onChange = () => {}, dispatch } = props;
  // const [second, updateSecond] = useState(60);
  const [btnText, updateBtnText] = useState('发送验证码');
  const [initData, setInitData] = useState({
    name: '',
    idCard: '',
    phone: '',
  } as DataType);

  const changeData = (key: string, value: string) => {
    const data = {
      ...initData,
      [key]: value,
    };
    setInitData(data);
    onChange(data);
  };

  useEffect(() => {
    setInitData(data);
  }, []);

  const myExtraClick = () => {
    if (second === 60) {
      if (!initData.phone) {
        Toast.show('请输入手机号码！', 1);
        return;
      }
      dispatch!({
        type: 'orderSearch/genAppLoginMsgCode',
        payload: {
          phone: initData.phone,
          callback: () => {
          //  Toast.success('发送验证码成功');
            timer = setInterval(() => {
              if (second === 0) {
                if (timer) {
                  clearInterval(timer);
                  timer = null;
                  updateBtnText('发送验证码');
                  second = 60;
                }
              } else {
                second -= 1;
                updateBtnText(`已发送(${second}s)`);
              }
            }, 1000);
          },
        },
      });
    }
  };
  return (
    <div className={styles.headerSection}>
      <FormItem
        type="input"
        title="姓名"
        placeholder="请输入身份证姓名"
        onChange={(value) => {
          changeData('name', value);
        }}
        value={initData.name}
      />
      <FormItem
        type="input"
        title="身份证号码"
        placeholder="请输入身份证件号"
        onChange={(value) => {
          changeData('idCard', value);
        }}
        value={initData.idCard}
        onBlur={(val) => {
          if (
            !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
              val,
            ) &&
            val
          ) {
            Toast.fail('身份证号码有误');
          }
        }}
      />
      <FormItem
        type="input"
        title="联系电话"
        placeholder="请输入联系号码"
        maxlength={11}
        onChange={(value) => {
          changeData('phone', value);
        }}
        value={initData.phone}
        onBlur={(val) => {
          if (!/^1[3-9]\d{9}$/.test(val) && val) {
            Toast.fail('手机号码格式有误');
          }
        }}
      />
      <FormItem
        type="input"
        title="短信验证码"
        placeholder="请输入验证码"
        maxlength={6}
        onChange={(value) => {
          changeData('smsCode', value);
        }}
        value={initData.smsCode}
        extra={
          <span className={styles.smsCode} onClick={myExtraClick}>
            {btnText}
          </span>
        }
      />
    </div>
  );
};

export default UserInfo;
