import React, { FC, useEffect } from 'react';
import {
  AuthenticationInfoModelState,
  ConnectProps,
  connect,
  NameAuthenticationModelState,
} from 'alita';
import styles from './index.less';
import { Toast, WhiteSpace, Card, Flex, Button } from 'antd-mobile';
import DynamicForm, { useForm, IFormItemProps } from '@alitajs/dform';
import cardTip from '@/assets/cardTip.png';

interface PageProps extends ConnectProps {
  authenticationInfo: AuthenticationInfoModelState;
  nameAuthentication: NameAuthenticationModelState;
}

const AuthenticationInfoPage: FC<PageProps> = ({
  authenticationInfo,
  dispatch,
  nameAuthentication,
}) => {
  console.log(nameAuthentication);
  const { userInfo = {} } = nameAuthentication;
  const [form] = useForm();
  // 这里发起了初始化请求
  // useEffect(() => {
  //   dispatch!({
  //     type: 'authenticationInfo/query',
  //   });
  //   return () => {
  //     // 这里写一些需要消除副作用的代码
  //     // 如: 声明周期中写在 componentWillUnmount
  //   };
  // }, []);

  const formsData1 = [
    {
      type: 'input',
      inputType: 'text',
      placeholder: '',
      fieldProps: 'custName',
      title: '姓名',
    },
    {
      type: 'input',
      inputType: 'text',
      placeholder: '',
      fieldProps: 'sex',
      title: '性别',
    },
    {
      type: 'input',
      inputType: 'text',
      placeholder: '',
      fieldProps: 'countryArea',
      title: '国家/地区',
    },
  ] as IFormItemProps[];

  const formProps1 = {
    formsValues: {
      custName: userInfo.certName,
      sex: userInfo.gender,
      countryArea: userInfo.nation,
    },
    data: formsData1,
    form,
    isDev: false,
    allDisabled: true,
  };

  const formsData2 = [
    {
      type: 'input',
      inputType: 'text',
      placeholder: '',
      fieldProps: 'type',
      title: '证件类型',
    },
    {
      type: 'input',
      inputType: 'text',
      placeholder: '',
      fieldProps: 'idCardNumber',
      title: '证件号码',
    },
    {
      type: 'input',
      inputType: 'text',
      placeholder: '',
      fieldProps: 'date',
      title: '证件有效期',
    },
  ] as IFormItemProps[];

  const formProps2 = {
    formsValues: {
      type: '身份证',
      idCardNumber: userInfo.certNum,
      date: userInfo.date,
    },
    data: formsData2,
    form,
    isDev: false,
    allDisabled: true,
  };

  return (
    <div className={styles.authenticationInfo}>
      <div className={styles.cardTipBox}>
        <img src={cardTip} className={styles.cardTipImg} />
        <span className={styles.cardTip}>您已实名认证</span>
      </div>
      <DynamicForm {...formProps1} />
      <WhiteSpace size="xl" />
      <DynamicForm {...formProps2} />
    </div>
  );
};

export default connect(
  ({
    authenticationInfo,
    nameAuthentication,
  }: {
    authenticationInfo: AuthenticationInfoModelState;
    nameAuthentication: NameAuthenticationModelState;
  }) => ({
    authenticationInfo,
    nameAuthentication,
  }),
)(AuthenticationInfoPage);
