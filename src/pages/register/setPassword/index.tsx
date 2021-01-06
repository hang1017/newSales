import React, { FC, useEffect } from 'react';
import { setPageNavBar, connect, SetPasswordModelState, ConnectProps, router } from 'alita';
import { Icon, Button, Toast } from 'antd-mobile';
import CommonInput from '@/components/CommonInput';

import styles from './index.less';
import { PageType } from '@/utils/AppContext';

interface PageProps extends ConnectProps {
  setPassword: SetPasswordModelState;
}

const SetPasswordPage: FC<PageProps> = ({ setPassword, dispatch, location }) => {
  const { password, rePassword, pageType } = setPassword;

  useEffect(() => {
    (window as any).goBack = true;
    let title = '';
    switch (pageType) {
      case PageType.register:
        title = '设置密码';
        break;
      case PageType.forgetPw:
        title = '设置新密码';
        break;
      default:
        break;
    }
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        pageTitle: title,
      },
    });
  }, []);

  const submit = () => {
    // const regex = /^(?=.*\\d)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\\s\\u4e00-\\u9fa5]{8,16}/;
    const regex = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
    if (!regex.test(password)) {
      Toast.info('密码格式错误！');
      return;
    }
    if (password !== rePassword) {
      Toast.info('两次密码不一致！');
      return;
    }
    switch (pageType) {
      case PageType.register:
        dispatch!({
          type: 'setPassword/registerMemberForPhone',
        });
        break;
      case PageType.forgetPw:
        dispatch!({
          type: 'setPassword/updateMemberPassword',
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.center}>
      <CommonInput
        onChange={(value) => {
          dispatch!({
            type: 'setPassword/save',
            payload: {
              password: value,
            },
          });
        }}
        inputType="password"
        placeholder="请设置密码"
        showPassword={true}
      />
      <CommonInput
        onChange={(value) => {
          dispatch!({
            type: 'setPassword/save',
            payload: {
              rePassword: value,
            },
          });
        }}
        inputType="password"
        placeholder="请确认密码"
        showPassword={true}
      />
      <div className={styles.inputHint}>密码长度为8-16位，必须包含数字、字母和符号的组合</div>
      <Button className={styles.btn} onClick={submit}>
        确认提交
      </Button>
    </div>
  );
};

export default connect(({ setPassword }: { setPassword: SetPasswordModelState }) => ({
  setPassword,
}))(SetPasswordPage);
