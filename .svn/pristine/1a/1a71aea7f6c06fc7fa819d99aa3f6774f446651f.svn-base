import React, { FC, useState, useRef, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { CAddDeliveryAddrModelState, ConnectProps, connect, QuickOrderModelState } from 'alita';
import { Base64 } from 'js-base64';
import _ from 'lodash';
import classnames from 'classnames';
import DynamicForm, { IFormItemProps, Store, useForm } from '@alitajs/dform';
import CommonSelectAlert from '@/pages/quickOrder/components/CommonSelectAlert';
import { veriryIdCard, getVerificationCodeImgUrl } from '@/utils';
import FileHtml from '@/assets/file/service.txt';
import FileHtml1 from '@/assets/file/new_service.txt';
import { FileModal } from '@/pages/customer/components';
import BlingPng from '@/assets/img/quickOrder/bling.png';
import CheckPng from '@/assets/img/quickOrder/check.png';
import UnCheckPng from '@/assets/img/quickOrder/unCheck.png';
import RightPng from '@/assets/img/quickOrder/right.png';
import styles from './index.less';

interface FormCardProps extends ConnectProps {
  cAddDeliveryAddr: CAddDeliveryAddrModelState;
  quickOrder: QuickOrderModelState;
  type: string;
  onSubmit: (res: any, newNumData: any) => void;
  selectModalFlag?: (flag: boolean) => void;
  paramAction: string;
  addr?: boolean;
}

let timer: NodeJS.Timeout | null = null;

const FormCard: FC<FormCardProps> = ({
  dispatch,
  cAddDeliveryAddr,
  type = 'user',
  onSubmit,
  selectModalFlag,
  paramAction = '',
  addr = true,
}) => {
  const [form] = useForm();
  const { homeAddrData } = cAddDeliveryAddr;
  const [fileFlag, setFileFlag] = useState(false); // 协议弹框标识
  const [filePathUrl, setFilePathUrl] = useState(FileHtml); // 协议弹框的内容
  const [fileTitle, setFileTitle] = useState(''); // 协议弹框的标题
  const [readCheckFlag, setReadCheckFlag] = useState(false); // 是否阅读的标识
  const [codeText, setCodeText] = useState('获取验证码'); // 验证码文字
  const [newNumFlag, setNewNumFlag] = useState(false); // 新号码的弹框
  let timerRef = useRef(60);
  const [showAddr, setShowAddr] = useState(false); // 是否展示选址的标识
  const [newNumData, setNewNumData] = useState({}); // 选号的数据
  const [btnFlag, setBtnFlag] = useState(true);

  const codeRef = useRef();
  const uuidRef = useRef();

  const getBlobImageUrl = (url: any) => {
    const request = new window.XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', url, true);
    request.onreadystatechange = () => {
      if (request.readyState === window.XMLHttpRequest.DONE && request.status === 200) {
        console.log(codeRef.current);
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
    if (type === 'proxy') {
      imgCodeUrlClick();
    }
  }, []);

  /**
   * 校验是否展示选址的功能
   */
  const verifyShowAddr = () => {
    const values = form.getFieldsValue();
    if (values?.username && values?.accNum && values?.selectNum && values?.idenCode) {
      setShowAddr(true);
    }
  };

  /**
   * 表单提交成功事件
   */
  const onFinish = (values: Store) => {
    if (!veriryIdCard(values?.idenCode)) {
      return;
    }
    const { homeAddr = {} } = values;
    const { label = [], value = [] } = homeAddr;
    if (addr && (label?.length !== 3 || value?.length !== 3)) {
      Toast.fail('请将所在地区选择完整', 1);
      return;
    }

    if (onSubmit)
      onSubmit(
        {
          ...values,
          uuid: uuidRef.current,
        },
        {
          ...newNumData,
          provinceId: 8310000,
          lanId: 8310100,
        },
      );
  };

  /**
   * 表单提交失败事件
   */
  const onFinishFailed = ({ errorFields = [] }) => {
    Toast.fail(errorFields[0]?.errors[0], 1);
  };

  /**
   * 短信验证码按钮点击事件
   */
  const getVerCode = () => {
    if (!form.getFieldValue('accNum')) {
      Toast.fail('联系电话不能为空', 1);
      return;
    }
    if (form.getFieldValue('accNum')?.length !== 11) {
      Toast.fail('联系电话输入格式有误', 1);
      return;
    }
    if (btnFlag) {
      setBtnFlag(false);
      timer = setInterval(() => {
        timerRef.current = timerRef?.current - 1;
        setCodeText(`剩余${timerRef?.current}秒`);
        if (timerRef.current <= 1 && timer) {
          clearInterval(timer);
          timer = null;
          timerRef.current = 60;
          setCodeText('获取验证码');
          setBtnFlag(true);
        }
      }, 1000);
      dispatch!({
        type: 'orderSearch/genAppLoginMsgCode',
        payload: {
          phone: Base64.encode(form.getFieldValue('accNum')),
          callback: (flag: boolean) => {
            if (!flag && timer) {
              clearInterval(timer);
              timer = null;
              setCodeText('获取验证码');
              setBtnFlag(true);
            }
          },
        },
      });
    }
  };

  const formsData = ([
    {
      type: 'input',
      fieldProps: 'username',
      required: true,
      hasStar: false,
      placeholder: '请输入您的真实姓名',
      title: '用户姓名',
      inputType: 'text',
      maxLength: 20,
      coverStyle: {
        textAlign: 'left',
      },
      onChange: () => {
        verifyShowAddr();
      },
      rules: [
        { required: true, message: `请输入用户姓名` },
        {
          pattern: new RegExp(/^[\u4e00-\u9fa5]{2,6}$/, 'g'),
          message: '姓名只允许包含2～6位中文',
        },
      ],
    },
    {
      type: 'input',
      fieldProps: 'accNum',
      required: true,
      hasStar: false,
      placeholder: '请输入您的联系电话',
      title: '联系电话',
      inputType: 'number',
      maxLength: 11,
      coverStyle: {
        textAlign: 'left',
      },
      onChange: () => {
        verifyShowAddr();
      },
      onBlur: (val: string) => {
        if (val && val?.length !== 11) {
          Toast.show('联系电话输入格式有误', 1);
        }
      },
    },
    {
      type: 'input',
      fieldProps: 'code',
      required: true,
      hasStar: false,
      placeholder: '请输入',
      title: '验证码',
      maxLength: 6,
      inputType: 'number',
      coverStyle: {
        textAlign: 'left',
      },
      hidden: type !== 'user',
      extra: (
        <div className={styles.codeText} onClick={_.debounce(getVerCode, 500)}>
          {codeText}
        </div>
      ),
      onBlur: (val: string) => {
        if (val && val?.length === 6 && !localStorage.getItem('tokenCode')) {
          dispatch!({
            type: 'quickOrder/cartLoginModal',
            payload: {
              phone: form.getFieldValue('accNum').replace(/\s+/g, ''),
              graphValidateCode: val,
            },
          }).then(({ memberReceiveAddr }) => {
            if (memberReceiveAddr) {
              const {
                provinceId,
                province = '',
                cityId,
                city = '',
                region = '',
                regionId,
              } = memberReceiveAddr;
              if (provinceId && cityId && regionId) {
                form.setFieldsValue({
                  homeAddr: {
                    label: [province, city, region],
                    value: [provinceId, cityId, regionId],
                  },
                  detailAddr: memberReceiveAddr?.detailAddress,
                });
              }
            }
          });
        }
      },
    },
    {
      type: 'text',
      fieldProps: 'selectNum',
      required: true,
      hasStar: false,
      title: '选择号码',
      placeholder: '请选择',
      coverStyle: {
        textAlign: 'left',
      },
      extra: (
        <div>
          <img src={RightPng} alt="" className={styles.rightImg} />
        </div>
      ),
      onClick: () => {
        const accNum = form.getFieldValue('accNum');
        if (accNum && accNum?.length === 11) {
          if (selectModalFlag) selectModalFlag(true);
          setNewNumFlag(true);
        } else {
          Toast.fail('请先输入联系电话', 1);
        }
      },
    },
    {
      type: 'input',
      fieldProps: 'idenCode',
      required: true,
      hasStar: false,
      placeholder: '请输入您的身份证号',
      title: '身份证',
      maxLength: 18,
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
      rules: [
        { required: true, message: `请输入身份证号` },
        {
          pattern: new RegExp(/^[0-9a-zA-Z]{0,18}$/, 'g'),
          message: '身份证格式不正确',
        },
      ],
      onChange: () => {
        verifyShowAddr();
      },
    },
  ] as unknown) as IFormItemProps[];

  const addrData = ([
    {
      type: 'addressPicker',
      fieldProps: 'homeAddr',
      required: true,
      hasStar: false,
      hidden: !addr,
      title: '所在地区',
      placeholder: '请选择-省-市-地区',
      height: '70vh',
      level: 3,
      coverStyle: {
        textAlign: 'left',
      },
      data: homeAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区'],
      onChangeLevel: (values: (string | number)[]) => {
        console.log('存在点击事件1', values);
        if (values.length > 0 && values.length < 3) {
          const parentId = values[values.length - 1];
          dispatch!({
            type: 'cAddDeliveryAddr/queryAreaNextLevel',
            payload: {
              parentId,
            },
          });
        } else if (values.length === 0) {
          dispatch!({
            type: 'cAddDeliveryAddr/queryAreaFatherList',
          });
        }
      },
    },
    {
      type: 'input',
      fieldProps: 'detailAddr',
      required: true,
      hasStar: false,
      hidden: !addr,
      placeholder: '请输入详细地址',
      title: '详细地址',
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
    },
  ] as unknown) as IFormItemProps[];

  const validateData = ([
    {
      type: 'input',
      fieldProps: 'graphValidateCode',
      required: true,
      hasStar: false,
      hidden: type === 'user',
      title: '图形验证码',
      maxLength: 4,
      placeholder: '请输入',
      coverStyle: {
        textAlign: 'left',
      },
      labelNumber: 5,
      extra: <img ref={codeRef} className={styles.validateCodeImg} onClick={imgCodeUrlClick} />,
    },
  ] as unknown) as IFormItemProps[];

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    form,
    autoLineFeed: false,
  };

  /**
   * 服务协议
   */
  const serviceFile = () => {
    setFileFlag(true);
    setFilePathUrl(FileHtml);
    setFileTitle('服务协议');
  };

  /**
   * 营销规则
   */
  const marketingRules = () => {
    setFileFlag(true);
    setFilePathUrl(FileHtml1);
    setFileTitle('营销规则');
  };
  return (
    <div className={styles.formCardStyle}>
      <div className={styles.formTitle}>
        <img src={BlingPng} alt="" className={styles.blingImg} />
      </div>
      <div className={styles.formStyle}>
        <DynamicForm {...formProps} />
      </div>
      <div
        className={classnames({
          [styles.formStyle2]: true,
          [styles.formShow]: showAddr && addr,
        })}
      >
        <DynamicForm {...formProps} data={addrData} />
      </div>
      <div className={styles.formStyle}>
        <DynamicForm {...formProps} data={validateData} />
      </div>
      <div className={styles.fcBtnDiv}>
        <Button
          className={styles.fcBtn}
          disabled={!readCheckFlag}
          onClick={_.debounce(() => form.submit(), 300)}
        >
          <div className={styles.fcBtns} param-action={paramAction}>
            领取派卡
          </div>
        </Button>
      </div>
      <div className={styles.footBtnDiv}>
        <img
          src={readCheckFlag ? CheckPng : UnCheckPng}
          alt=""
          onClick={() => {
            setReadCheckFlag(!readCheckFlag);
          }}
          className={styles.checkImg}
        />
        <div className={styles.text}>
          接受并同意<span onClick={serviceFile}>《服务协议》</span>与
          <span onClick={marketingRules}>《营销规则》</span>
        </div>
      </div>
      <FileModal
        visible={fileFlag}
        pathUrl={filePathUrl}
        title={fileTitle}
        close={() => {
          setFileFlag(false);
        }}
      />
      <CommonSelectAlert
        dispatch={dispatch}
        show={newNumFlag}
        isShowNew
        from="bilibi"
        provinceId={8310000}
        lanId={8310100}
        linePhone={form.getFieldValue('accNum')}
        closeClick={() => {
          setNewNumFlag(false);
        }}
        onComfirm={(item: any) => {
          setNewNumFlag(false);
          form.setFieldsValue({
            selectNum: item?.phoneNum,
          });
          setNewNumData(item);
          verifyShowAddr();
        }}
      />
    </div>
  );
};

export default connect(
  ({
    cAddDeliveryAddr,
    quickOrder,
  }: {
    cAddDeliveryAddr: CAddDeliveryAddrModelState;
    quickOrder: QuickOrderModelState;
  }) => ({
    cAddDeliveryAddr,
    quickOrder,
  }),
)(FormCard);
