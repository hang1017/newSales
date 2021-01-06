import React, { FC, useEffect } from 'react';
import { setPageNavBar, connect, RegisterPhoneModelState, ConnectProps, router } from 'alita';
import { Icon, Button, Toast } from 'antd-mobile';
import CommonInput from '@/components/CommonInput';

import backIcon from '@/assets/img/login/grey_back.png';
import styles from './index.less';
import { PageType } from '@/utils/AppContext';
/**
 * 注册-手机号
 */
interface PageProps extends ConnectProps {
  registerPhone: RegisterPhoneModelState;
}

const RegisterPhonePage: FC<PageProps> = ({ registerPhone, dispatch, location }) => {
  const goBack = () => {
    router.goBack();
  };
  useEffect(() => {}, []);
  const { pageType } = registerPhone;

  const gotoVercode = () => {
    let { phoneNumber } = registerPhone;
    phoneNumber = phoneNumber.replace(/\s+/g, '');
    // 校验手机号
    if (phoneNumber == '') {
      Toast.info('手机号不能为空！');
      return false;
    }
    const re = /^1\d{10}$/;
    if (!re.test(phoneNumber)) {
      Toast.info('请输入正确的手机号');
      return false;
    }

    dispatch!({
      type: 'verificationCode/save',
      payload: {
        userCode: phoneNumber,
      },
    });

    switch (pageType) {
      case PageType.register:
        // 先校验注册会员手机号码是否存在
        dispatch!({
          type: 'registerPhone/checkMemberPhone',
        }).then(() => {
          dispatch!({
            type: 'verificationCode/sendCode',
            payload: {
              bizId: 'register',
            },
          }).then(() => {
            router.push({ pathname: '/verificationCode' });
          });
        });
        break;
      case PageType.forgetPw:
        dispatch!({
          type: 'verificationCode/sendCode',
          payload: {
            bizId: 'login',
          },
        }).then(() => {
          router.push({ pathname: '/verificationCode' });
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.center}>
      <div className={styles.topView}>
        <img src={backIcon} className={styles.close} onClick={goBack} />
      </div>
      <div className={styles.welcome}>
        {pageType === PageType.register ? '欢迎注册' : '忘记密码'}
      </div>
      <CommonInput
        onChange={(value) => {
          dispatch!({
            type: 'registerPhone/save',
            payload: {
              phoneNumber: value,
            },
          });
        }}
        inputType="tel"
        placeholder="请输入手机号码"
        showDelete={true}
      />
      <Button className={styles.btn} onClick={gotoVercode}>
        获取验证码
      </Button>
    </div>
  );
};

export default connect(({ registerPhone }: { registerPhone: RegisterPhoneModelState }) => ({
  registerPhone,
}))(RegisterPhonePage);
