import React, { FC } from 'react';
import { WhiteSpace } from 'antd-mobile';
import { DoubleButton } from 'ge-components';

const DoubleButtonPage: FC = () => {
  return (
    <div
      style={{
        height: '100%',
        backgroundColor: 'rgb(242,242,242)',
      }}
    >
      <WhiteSpace size="lg" />
      <DoubleButton
        leftButton={{
          content: '重置',
          onClick: () => {
            console.log('重置按钮');
          },
        }}
        rightButton={{
          content: '确定',
          type: 'primary',
          onClick: () => {
            console.log('确认按钮');
          },
        }}
      />
      <WhiteSpace size="lg" />
      <DoubleButton
        leftButton={{
          content: '重置',
        }}
        rightButton={{
          content: '确定',
          type: 'primary',
          onClick: () => {
            console.log('勾选后执行点击事件');
          },
        }}
        headContent={<div>《ETC服务用户协议》(headContent)</div>}
        errorMessage="请勾选"
        footContent={<div>《ETC服务用户协议》(footContent)</div>}
      />
      <WhiteSpace size="lg" />
      <DoubleButton
        leftButton={{
          content: '重置',
        }}
        rightButton={{
          content: '确定',
          type: 'primary',
        }}
        fixed
      />
    </div>
  );
};

export default DoubleButtonPage;
