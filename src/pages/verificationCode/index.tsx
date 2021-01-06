import React, { FC, useEffect, useState } from 'react';
import { VerificationCodeModelState, ConnectProps, connect, router } from 'alita';
import { Button, Toast } from 'antd-mobile';
import { Form, Input } from 'antd';
import styles from './index.less';
import { PageType } from '@/utils/AppContext';
/**
 * 短信验证
 */
interface PageProps extends ConnectProps {
  verificationCode: VerificationCodeModelState;
}

const VerificationCode: FC<PageProps> = ({ verificationCode, dispatch, location }) => {
  const { timer = null, userCode = '', sms, pageType } = verificationCode;

  const [maxLength, setMaxLength] = useState(1);

  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [valueC, setValueC] = useState('');
  const [valueD, setValueD] = useState('');
  const [valueE, setValueE] = useState('');
  const [valueF, setValueF] = useState('');

  // const [isShow, setIsShow] = useState(false);

  const [count, setCount] = useState(0);

  let firstFoucs: any = '';
  let secondFoucs: any = '';
  let tridFoucs: any = '';
  let fourFoucs: any = '';
  let fivthFoucs: any = '';
  let sixthFoucs: any = '';

  /* 清除计时器 */
  const clearTimer = (timer1: any) => {
    if (timer1) {
      clearInterval(timer1);
    }
    if (timer) {
      // 重新发送验证码时重新计时
      clearInterval(timer);
      dispatch!({
        type: 'verificationCode/save',
        payload: {
          timer: null,
        },
      });
    }
  };

  const getEveryValue = (num: string) => {
    if (num === '') {
      return '_';
    }
    return num;
  };

  const getInputCode = (A: string, B: string, C: string, D: string, E: string, F: string) => {
    let strNum = '';
    strNum = strNum.concat(getEveryValue(A));
    strNum = strNum.concat(getEveryValue(B));
    strNum = strNum.concat(getEveryValue(C));
    strNum = strNum.concat(getEveryValue(D));
    strNum = strNum.concat(getEveryValue(E));
    strNum = strNum.concat(getEveryValue(F));
    return strNum;
  };

  // 验证码光标后移
  const handleInputValue = (e: any, type: string) => {
    const { value = '' } = e.target;
    const myreg = /^\d{6}$/;
    if (myreg.test(value)) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setValuesCilpText(value);
      return;
    }

    let code = '';
    let newValue = value.replace(/\D/g, '').slice(0, 1);
    if (type === 'A') {
      if (newValue) secondFoucs.input.focus();
      setValueA(newValue);
      code = getInputCode(newValue, valueB, valueC, valueD, valueE, valueF);
    } else if (type === 'B') {
      if (newValue) tridFoucs.input.focus();
      setValueB(newValue);
      code = getInputCode(valueA, newValue, valueC, valueD, valueE, valueF);
    } else if (type === 'C') {
      if (newValue) fourFoucs.input.focus();
      setValueC(newValue);
      code = getInputCode(valueA, valueB, newValue, valueD, valueE, valueF);
    } else if (type === 'D') {
      if (newValue) fivthFoucs.input.focus();
      setValueD(newValue);
      code = getInputCode(valueA, valueB, valueC, newValue, valueE, valueF);
    } else if (type === 'E') {
      if (newValue) sixthFoucs.input.focus();
      setValueE(newValue);
      code = getInputCode(valueA, valueB, valueC, valueD, newValue, valueF);
    } else {
      setValueF(newValue);
      // setIsShow(true);
      code = getInputCode(valueA, valueB, valueC, valueD, valueE, newValue);
    }
    if (code && code.length && code.split('_').join('').length === 6) {
      dispatch!({
        type: 'verificationCode/save',
        payload: {
          sms: code,
        },
      });
    }
  };

  // 删除验证码
  const handleDel = (e: any) => {
    const BACK_SPACE = 8;
    const isBackSpaceKey = e.keyCode === BACK_SPACE;
    if (isBackSpaceKey && e.target.value.length === 0) {
      let previous = e.target;
      previous = previous.previousElementSibling;
      while (previous) {
        if (previous === null) break;
        if (previous.tagName.toLowerCase() === 'input') {
          previous.focus();
          break;
        }
      }
    }
  };

  let timer1: NodeJS.Timeout | null = null;

  const onGetCaptcha = () => {
    clearTimer('');
    // eslint-disable-next-line no-shadow
    let count = 59;
    setCount(count);
    timer1 = setInterval(() => {
      count -= 1;
      setCount(count);
      if (count === 0) {
        clearTimer(timer1);
      }
    }, 1000);
  };

  // 这里发起了初始化请求
  useEffect(() => {
    if ((window as any).goBack) {
      (window as any).goBack = false;
    } else {
      onGetCaptcha();
    }

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
      clearTimer(timer);
      if (timer1) {
        clearTimer(timer1);
      }
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  const setValuesCilpText = (clipText = '') => {
    const myreg = /^\d{6}$/;
    if (clipText && myreg.test(clipText)) {
      setValueA(clipText[0]);
      setValueB(clipText[1]);
      setValueC(clipText[2]);
      setValueD(clipText[3]);
      setValueE(clipText[4]);
      setValueF(clipText[5]);
      sixthFoucs.input.focus();
      dispatch!({
        type: 'verificationCode/save',
        payload: {
          sms: clipText,
        },
      });
    }
  };

  // 登录、下一步
  const submit = () => {
    if (sms.length !== 6) {
      Toast.info('验证码错误！');
      return;
    }

    switch (pageType) {
      case PageType.login:
        // 验证码登录
        dispatch!({
          type: 'verificationCode/phoneLogin',
          payload: {},
        });
        break;
      case PageType.register:
        dispatch!({
          type: 'verificationCode/checkMsgCode',
          payload: {},
        });

        break;
      case PageType.forgetPw:
        // 下一步要校验手机号
        dispatch!({
          type: 'verificationCode/checkMsgCode',
          payload: {
            actionType: '1', // 修改密码
          },
        });
        break;
      default:
        break;
    }
  };

  const phoneNum = userCode.substr(0, 3) + '****' + userCode.substr(7, userCode.length);
  let buttonName = '';
  switch (pageType) {
    case PageType.login:
      buttonName = '登录';
      break;
    case PageType.register:
      buttonName = '下一步';
      break;
    case PageType.forgetPw:
      buttonName = '确定';
      break;
    default:
      break;
  }

  return (
    <div className={styles.center}>
      <div className={styles.tip}>验证码将发送到手机号{phoneNum}</div>
      <Form className={styles.codeForm}>
        <Input
          className={styles.checkInput}
          type="tel"
          ref={(ref) => {
            firstFoucs = ref;
          }}
          value={valueA}
          onPaste={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            // eslint-disable-next-line prefer-const
            let clipText = e.clipboardData.getData('Text'); // 粘贴板的内容

            setValuesCilpText(clipText);
          }}
          // maxLength={maxLength}
          onKeyDown={maxLength ? handleDel : () => {}}
          onChange={(e) => handleInputValue(e, 'A')}
        />
        <Input
          className={styles.checkInput}
          type="tel"
          ref={(ref) => {
            secondFoucs = ref;
          }}
          value={valueB}
          // maxLength={maxLength}
          onPaste={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            // eslint-disable-next-line prefer-const
            let clipText = e.clipboardData.getData('Text'); // 粘贴板的内容

            setValuesCilpText(clipText);
          }}
          onKeyDown={maxLength ? handleDel : () => {}}
          onChange={(e) => handleInputValue(e, 'B')}
        />
        <Input
          className={styles.checkInput}
          type="tel"
          ref={(ref) => {
            tridFoucs = ref;
          }}
          value={valueC}
          onPaste={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            // eslint-disable-next-line prefer-const
            let clipText = e.clipboardData.getData('Text'); // 粘贴板的内容

            setValuesCilpText(clipText);
          }}
          // maxLength={maxLength}
          onKeyDown={maxLength ? handleDel : () => {}}
          onChange={(e) => handleInputValue(e, 'C')}
        />
        <Input
          className={styles.checkInput}
          type="tel"
          ref={(ref) => {
            fourFoucs = ref;
          }}
          value={valueD}
          onPaste={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            // eslint-disable-next-line prefer-const
            let clipText = e.clipboardData.getData('Text'); // 粘贴板的内容

            setValuesCilpText(clipText);
          }}
          // maxLength={maxLength}
          onKeyDown={maxLength ? handleDel : () => {}}
          onChange={(e) => handleInputValue(e, 'D')}
        />
        <Input
          className={styles.checkInput}
          type="tel"
          // pattern="[0-9]"
          ref={(ref) => {
            fivthFoucs = ref;
          }}
          value={valueE}
          // maxLength={maxLength}
          onPaste={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            // eslint-disable-next-line prefer-const
            let clipText = e.clipboardData.getData('Text'); // 粘贴板的内容

            setValuesCilpText(clipText);
          }}
          onKeyDown={maxLength ? handleDel : () => {}}
          onChange={(e) => handleInputValue(e, 'E')}
        />
        <Input
          className={styles.checkInput}
          type="tel"
          // pattern="/[0-9\-]/"
          ref={(ref) => {
            sixthFoucs = ref;
          }}
          value={valueF}
          onPaste={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            let clipText = e.clipboardData.getData('Text'); // 粘贴板的内容

            setValuesCilpText(clipText);
          }}
          // maxLength={maxLength}
          onKeyDown={maxLength ? handleDel : () => {}}
          onChange={(e) => handleInputValue(e, 'F')}
        />
      </Form>

      <Button className={styles.btn} onClick={submit}>
        {buttonName}
      </Button>
      <div className={styles.countView}>
        <div> {count ? `${count} 秒后重新获取验证码` : '没有收到短信验证码？'}</div>
        {!count && (
          <div
            onClick={() => {
              dispatch!({
                type: 'verificationCode/sendSms',
                payload: {
                  userCode: userCode,
                },
              });
              onGetCaptcha();
            }}
            // disabled={Boolean(count)}
            className={styles.codeTip}
          >
            重新获取
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  ({ verificationCode }: { verificationCode: VerificationCodeModelState }) => ({
    verificationCode,
  }),
)(VerificationCode);
