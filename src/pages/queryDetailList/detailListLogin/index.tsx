import React, { FC, useEffect, useState, useRef } from 'react';
import { QueryDetailListModelState, ConnectProps, connect, router } from 'alita';
import { Button, Toast } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';
import { getPicCode, veriryIdCard, getVerificationCodeImgUrl } from '@/utils';
import _ from 'lodash';
import { Base64 } from 'js-base64';
import PhoneImg from '@/assets/img/customer/detailPhone.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  queryDetailList: QueryDetailListModelState;
}

let timer: NodeJS.Timeout | null = null;
let seconds = 60;

const DetailListLoginPage: FC<PageProps> = ({ queryDetailList, dispatch }) => {
  const [form] = useForm();
  const [windowHeight, setWindowHeight] = useState<number>(0); // 屏幕高度
  const [codeText, setCodeText] = useState<string>('获取验证码'); // 获取验证码的倒计时

  const codeRef = useRef();
  const uuidRef = useRef();

  const { phoneList = [] } = queryDetailList;

  const getBlobImageUrl = (url: any) => {
    const request = new window.XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', url, true);
    request.onreadystatechange = () => {
      if (request.readyState === window.XMLHttpRequest.DONE && request.status === 200) {
        codeRef.current.src = URL.createObjectURL(request.response);
        // 提取UUID
        uuidRef.current = request.getResponseHeader('uuid');
        codeRef.current.onload = () => {
          URL.revokeObjectURL(codeRef.current.src);
        };
      }
    };
    request.send(null);
  };

  /**
   * 获取图形验证码点击事件
   */
  const imgCodeUrlClick = () => {
    const url = getVerificationCodeImgUrl();
    getBlobImageUrl(url);
  };

  useEffect(() => {
    setWindowHeight(document.documentElement.clientHeight - 90);
    // imgCodeUrlClick();
    dispatch!({
      type: 'queryDetailList/numberList',
    });
  }, []);

  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    dispatch!({
      type: 'queryDetailList/identityAuthModel',
      payload: {
        ...values,
        phone: Base64.encode(values?.phone),
        // uuid: uuidRef.current,
      },
    }).then(() => {
      router.push({
        pathname: '/queryDetailList/detailList',
        query: {
          phone: values?.phone,
        },
      });
    });
    // setTimeout(() => {
    //   imgCodeUrlClick();
    // }, 1000);
  };

  const onFinishFailed = ({ errorFields = [] }) => {
    Toast.fail(errorFields[0]?.errors[0], 1);
  };

  /**
   * 图片验证码点击事件
   */
  const picCodeClick = () => {
    imgCodeUrlClick();
  };

  /**
   * 短信验证码点击事件
   */
  const codeClick = () => {
    const formVal = form.getFieldsValue();
    if (!formVal?.phone) {
      Toast.fail('请选择手机号码', 1);
      return;
    }
    // if (!formVal?.graphValidateCode) {
    //   Toast.fail('请输入图形验证码', 1);
    //   return;
    // }
    if (seconds === 60) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (timer) clearInterval(timer);
          timer = null;
          seconds = 60;
          setCodeText('获取验证码');
        } else {
          seconds -= 1;
          setCodeText(`已发送(${seconds}s)`);
        }
      }, 1000);
    }
    dispatch!({
      type: 'orderSearch/genAppLoginMsgCode',
      payload: {
        phone: Base64.encode(formVal?.phone),
        uuid: uuidRef.current,
        graphValidateCode: formVal?.graphValidateCode,
        callback: (flag: boolean) => {
          if (!flag && timer) {
            if (timer) clearInterval(timer);
            timer = null;
            seconds = 60;
            setCodeText('获取验证码');
          }
        },
      },
    });
  };

  const goToDetailList = () => {
    form.submit();
  };

  const data1 = ([
    {
      type: 'picker',
      fieldProps: 'phone',
      required: true,
      data: phoneList,
      placeholder: '请输入',
      title: (
        <div className={styles.phoneTitle}>
          <img className={styles.phoneImg} src={PhoneImg} />
          手机号码
        </div>
      ),
      hasStar: false,
      rules: [{ required: true, message: `请输入手机号码` }],
    },
  ] as unknown) as IFormItemProps[];

  const formsData = ([
    {
      type: 'input',
      fieldProps: 'certName',
      required: true,
      placeholder: '机主真实姓名',
      title: '真实姓名',
      hasStar: false,
      coverStyle: {
        textAlign: 'left',
      },
      labelNumber: 6,
    },
    {
      type: 'input',
      fieldProps: 'certNum',
      required: true,
      placeholder: '机主身份证号码',
      title: '身份证号码',
      hasStar: false,
      coverStyle: {
        textAlign: 'left',
      },
      labelNumber: 6,
      maxLength: 18,
      onBlur: (val: string) => {
        if (val) {
          veriryIdCard(val);
        }
      },
    },
    // {
    //   type: 'input',
    //   fieldProps: 'graphValidateCode',
    //   required: true,
    //   placeholder: '可点击图片更换',
    //   title: '图形验证码',
    //   hasStar: false,
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    //   labelNumber: 6,
    //   extra: <img alt="" ref={codeRef} onClick={picCodeClick} className={styles.codeImgStyle} />,
    // },
    {
      type: 'input',
      fieldProps: 'smsCode',
      required: true,
      placeholder: '6位短信验证码',
      title: '短信验证码',
      hasStar: false,
      coverStyle: {
        textAlign: 'left',
      },
      labelNumber: 6,
      extra: (
        <div
          className={codeText === '获取验证码' ? styles.codeStyle : styles.codeStyleGray}
          onClick={_.debounce(codeClick, 300)}
        >
          {codeText}
        </div>
      ),
      maxLength: 6,
      inputType: 'number',
    },
  ] as unknown) as IFormItemProps[];

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues: {},
    form,
    autoLineFeed: false,
  };
  return (
    <div className={styles.detailListLoginStyle} style={{ height: windowHeight }}>
      <div className={styles.dlsTip}>温馨提示：为了保护您的隐私，请进行身份验证。</div>
      <div className={styles.phoneForm}>
        <DynamicForm {...formProps} data={data1} />
      </div>
      <div className={styles.otherForm}>
        <DynamicForm {...formProps} data={formsData} />
      </div>
      <div className={styles.dlsBtnDiv}>
        <Button className={styles.dlsBtn} onClick={goToDetailList}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default connect(({ queryDetailList }: { queryDetailList: QueryDetailListModelState }) => ({
  queryDetailList,
}))(DetailListLoginPage);
