import React, { FC, useEffect, useState } from 'react';
import { EditUserPhoneModelState, ConnectProps, connect, setPageNavBar, history } from 'alita';
import CommonInput from '@/components/CommonInput';
import Utils from '@/utils/tool';
import { Base64 } from 'js-base64';
import { Modal, Toast, Button } from 'antd-mobile';

import styles from './index.less';

interface PageProps extends ConnectProps {
  editUserPhone: EditUserPhoneModelState;
}
let timer: NodeJS.Timeout | null = null;
let seconds = 60;
const EditUserPhonePage: FC<PageProps> = ({ editUserPhone, dispatch }) => {
  const [btnText, updateBtnText] = useState('获取验证码');
  const [account, updateAccount] = useState('');
  const [password, updatePassword] = useState('');
  const [btnFlag, setBtnFlag] = useState<boolean>(false);

  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  const gotoVercode = () => {
    if (seconds === 60) {
      // 校验手机号
      if (account === '') {
        Toast.info('手机号不能为空！');
        return false;
      }
      const re = /^1\d{10}$/;
      if (!re.test(account)) {
        Toast.info('请输入正确的手机号');
        return false;
      }
      setBtnFlag(false);
      
      timer = setInterval(() => {
        if (seconds === 0) {
          if (timer) clearInterval(timer);
          timer = null;
          seconds = 60;
          updateBtnText(`获取验证码`);
        } else {
          seconds -= 1;
          updateBtnText(`已发送(${seconds}s)`);
        }
      }, 1000);
      dispatch!({
        type: 'editUserPhone/addSendMsgCode',
        payload: {
          phone: Base64.encode(account),
          // 1300-修改手机
          smsType: '1300',
          callback: (flag: boolean) => {
            if (!flag && timer) {
              clearInterval(timer);
              timer = null;
              seconds = 60;
            }
          },
        },
      });
    }
  };

  const submitClick = () => {
    // 校验用户名
    if (account === '') {
      Toast.info('手机号不能为空！');
      return;
    }
    if (password === '') {
      Toast.info('短信验证码不能为空！');
      return;
    }
    dispatch!({
      type: 'editUserPhone/resetPhoneForSelf',
      payload: {
        smsCode: password,
        smsPhone: Base64.encode(account),
      },
    }).then((flag: boolean) => {
      if (!flag) {
        if (timer) clearInterval(timer);
        timer = null;
        seconds = 60;
        updateBtnText(`获取验证码`);
        setBtnFlag(true);
      } else {
        const memberInfoTemp = Utils.getStorageForJson('memberInfo');
        Utils.setStorageForJson('memberInfo', {...memberInfoTemp, phone: account});
        history.goBack();
      }
    });
  };

  return (
    <div className={styles.editUserNamePage}>
      <CommonInput
        onChange={(value: string) => {
          updateAccount(value);
          setBtnFlag(false);
        }}
        inputType="number"
        value={account}
        placeholder="请输入新的手机号"
        showDelete
        maxLength={11}
      />
      <CommonInput
        onChange={(value: string) => {
          updatePassword(value);
          setBtnFlag(false);
        }}
        value={password}
        placeholder="请输入短信验证码"
        inputType="number"
        maxLength={6}
      />
      <span
        className={btnText === '获取验证码' ? styles.verifyCode : styles.disableBtn}
        onClick={_.debounce(gotoVercode, 300)}
      >
        {btnText}
      </span>
      <div className={styles.tipTitle}>温馨提示</div>
      <div className={styles.tipText}>为避免您的特权被别人使用，短信验证码请不要轻易告诉别人！</div>
      <Button className={btnFlag ? styles.submitDisableBtn : styles.btn} onClick={submitClick} disabled={btnFlag}>
        确定
      </Button>
    </div>
  );
};

export default connect(({ editUserPhone }: { editUserPhone: EditUserPhoneModelState }) => ({
  editUserPhone,
}))(EditUserPhonePage);
