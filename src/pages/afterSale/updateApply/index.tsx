import React, { FC, useEffect } from 'react';
import { UpdateApplyModelState, ConnectProps, connect, history } from 'alita';
import SingleBtn from '@/pages/customer/components/SingleBtn';
import DynamicForm, { useForm, ValidateErrorEntity } from '@alitajs/dform';
import { Toast, Modal } from 'antd-mobile';
import alertIcon from '@/assets/img/customer/sect/alert.png';
import RefundProduct from '../components/RefundProduct';
import styles from './index.less';

interface PageProps extends ConnectProps {
  updateApply: UpdateApplyModelState;
}

const UpdateApplyPage: FC<PageProps> = ({ updateApply, dispatch, location }) => {
  const { data } = location.query || {};
  console.log(data);
  const orderInfo = JSON.parse(data);

  const { applyId, } = orderInfo;

  // 这里发起了初始化请求
  useEffect(() => {

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = updateApply;
  const formData = [
    {
      type: 'input',
      fieldProps: 'expressCode',
      placeholder: '请输入物流公司编码',
      title: '物流公司编码',
    },
    {

      type: 'input',
      fieldProps: 'expressName',
      placeholder: '请输入物流公司名称',
      title: '物流公司名称',
    },
    {
      type: 'input',
      fieldProps: 'expressNo',
      placeholder: '请输入物流单号',
      title: '物流单号',
      required: true,
      rules: [
        { required: true, message: `请选择物流单号` },
      ],
    },

    {
      type: 'input',
      fieldProps: 'expressTel',
      placeholder: '请输入联系电话',
      title: '联系电话',
      inputType: 'phone'
    },
  ];
  const [form] = useForm();

  const formProps = {
    onFinish: (formValue: any) => {
      const { expressTel } = formValue;
      const tel = expressTel && expressTel.replace(/\s*/g, '');
      if (tel && tel.length && tel.length < 11) {
        Toast.fail('请输入正确的手机号码');
        return false;
      }

      Modal.alert('提示', '确定提交吗?',
        [{ text: '取消', onPress: () => { } },
        {
          text: '确定', onPress: () => {


            dispatch!({
              type: 'updateApply/returnApplyBuyerDeliver',
              payload: {
                ...formValue,
                applyId,
                deliveryType: '2',
                expressTel: tel,
              }
            }).then((res: any) => {
              const { success, errMessage } = res;
              if (success) {
                Toast.success('单号填写成功');
                setTimeout(() => {
                  history.go(-2); // 回到售后列表
                }, 1000);
              }
              else {
                Toast.fail(errMessage);
              }

            });




          }
        }])

    },
    onFinishFailed: ({ errorFields = [] }: ValidateErrorEntity) => {
      Toast.fail(errorFields[0]?.errors[0], 1);

    },

    data: formData,
    formsValues: {
    },
    form,
  };
  return <div className={styles.updateApply}>
    <div className={styles.content}>
      <div className={styles.tipMsg}><img src={alertIcon} alt='' />退货需付快递邮费，到付方式拒收</div>
      <RefundProduct
        data={orderInfo}

      />
      <div className={styles.logisticsInfo}>
        <div className={styles.pageTitle}>填写物流信息</div>
        <DynamicForm {...formProps} />
        <div className={styles.des}>提交服务后，售后人员可能会与你电话沟通，请保持手机可拨打</div>

      </div>
    </div>

    <div>
      <SingleBtn
        text='确定'
        canClick
        onClick={() => { form.submit() }}
      />
    </div>

  </div>;
};

export default connect(({ updateApply }: { updateApply: UpdateApplyModelState; }) => ({ updateApply }))(UpdateApplyPage);
