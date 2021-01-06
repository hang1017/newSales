import React, { FC } from 'react';
import styles from './index.less';
import FormItem from '../FormItem';

type FunctionType = (e?: string) => void;

interface UserInfoProps {
  text?: string;
  invoiceHandle: FunctionType;
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { text = '', invoiceHandle = () => {} } = props;
  return (
    <div className={styles.headerSection}>
      <FormItem
        type="select"
        title="发票信息"
        placeholder="请选择发票抬头"
        onClick={invoiceHandle}
        value={text}
      />
    </div>
  );
};

export default UserInfo;
