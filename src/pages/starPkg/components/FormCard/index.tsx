import React, { FC, useState, useRef } from 'react';
import { Button, Toast } from 'antd-mobile';
import { CAddDeliveryAddrModelState, ConnectProps, connect, QuickOrderModelState } from 'alita';
import { Base64 } from 'js-base64';
import _ from 'lodash';
import DynamicForm, { IFormItemProps, Store, useForm } from '@alitajs/dform';
import { SelectNum, SelectProModal } from '@/pages/starPkg/components';
import { veriryIdCard } from '@/utils';
// import FileHtml from '@/assets/file/service.txt';
import FileHtml from '@/assets/file/starpkg_service.txt';
// import FileHtml1 from '@/assets/file/new_service.txt';
import FileHtml1 from '@/assets/file/starpkg_new_service.txt';
import { FileModal } from '@/pages/customer/components';
import CheckPng from '@/assets/img/starPkg/check.png';
import UnCheckPng from '@/assets/img/starPkg/unCheck.png';
import RightPng from '@/assets/img/starPkg/right.png';
import styles from './index.less';

interface FormCardProps extends ConnectProps {
  cAddDeliveryAddr: CAddDeliveryAddrModelState;
  quickOrder: QuickOrderModelState;
  type: string;
  onSubmit: (res: any, newNumData: any) => void;
  selectModalFlag?: (flag: boolean) => void;
  paramAction: string;
}

let timer: NodeJS.Timeout | null = null;

const FormCard: FC<FormCardProps> = ({
  dispatch,
  cAddDeliveryAddr,
  type = 'user',
  onSubmit,
  selectModalFlag,
  paramAction = '',
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
  const [newNumData, setNewNumData] = useState({}); // 选号的数据
  const [selectProFlag, setSelectProFlag] = useState<boolean>(false); // 选择权益商品弹框
  const [selectProData, setSelectProData] = useState<any[]>([]); // 选择权益商品列表数据
  const [acticeSelectPro, setActiceSelectPro] = useState<any>({}); // 已选中的权益商品
  const [btnFlag, setBtnFlag] = useState(true);

  /**
   * 表单提交成功事件
   */
  const onFinish = (values: Store) => {
    if (!veriryIdCard(values?.idenCode)) {
      return;
    }
    const { homeAddr = {} } = values;
    const { label = [], value = [] } = homeAddr;
    if (label?.length !== 3 || value?.length !== 3) {
      Toast.fail('请将所在地区选择完整', 1);
      return;
    }

    if (onSubmit)
      onSubmit(
        {
          ...values,
          memberChooseRightsIds: [acticeSelectPro?.rightsId || ''],
        },
        { ...newNumData, provinceId: 8310000, lanId: 8310100 },
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
              if (provinceId && regionId && cityId) {
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
        const idenCode = form.getFieldValue('idenCode') || '';
        if (!idenCode.trim()) {
          Toast.fail('请先输入身份证号', 1);
          return;
        }
        if (!veriryIdCard(idenCode)) {
          Toast.fail('身份证号格式有误', 1);
          return;
        }
        if (accNum && accNum?.length === 11) {
          if (selectModalFlag) selectModalFlag(true);
          setNewNumFlag(true);
        } else {
          Toast.fail('请先输入联系电话', 1);
        }
      },
    },
    {
      type: 'addressPicker',
      fieldProps: 'homeAddr',
      required: true,
      hasStar: false,
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
      placeholder: '请输入详细地址',
      title: '详细地址',
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'text',
      fieldProps: 'rights',
      required: true,
      hasStar: false,
      placeholder: '请选择星座权益',
      title: '选择星座权益',
      coverStyle: {
        textAlign: 'left',
      },
      extra: (
        <div>
          <img src={RightPng} alt="" className={styles.rightImg} />
        </div>
      ),
      onClick: () => {
        if (selectProData && selectProData.length) {
          setSelectProFlag(true);
          return;
        }
        dispatch!({
          type: 'starPkg/qryConstellationRightsModal',
          payload: {
            mktActivityId: 9999,
          },
        }).then((res: any) => {
          setSelectProData(res);
          setSelectProFlag(true);
        });
      },
    },
  ] as unknown) as IFormItemProps[];

  const selectProConfirm = (res: any) => {
    setActiceSelectPro(res);
    form.setFieldsValue({
      rights: res?.rightsName,
    });
    setSelectProFlag(false);
  };

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
      <div className={styles.formStyle}>
        <DynamicForm {...formProps} />
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
      <FileModal
        visible={fileFlag}
        pathUrl={filePathUrl}
        title={fileTitle}
        close={() => {
          setFileFlag(false);
        }}
      />
      <SelectNum
        dispatch={dispatch}
        show={newNumFlag}
        provinceId={8310000}
        lanId={8310100}
        linePhone={form.getFieldValue('accNum')}
        closeClick={() => {
          setNewNumFlag(false);
        }}
        idCard={form.getFieldValue('idenCode')}
        onComfirm={(item: any) => {
          setNewNumFlag(false);
          form.setFieldsValue({
            selectNum: item?.phoneNum,
          });
          setNewNumData(item);
        }}
      />
      <SelectProModal
        data={selectProData}
        title="请选择您的默认权益"
        visible={selectProFlag}
        close={() => {
          setSelectProFlag(false);
        }}
        onConfrim={selectProConfirm}
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
