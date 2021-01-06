import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';
import FormItem from '../../../components/FormItem';

type DataType = {
  attributionAddr?: string; //所在地区
  detailAddr?: string; // 详细地区
};
type FunctionType = (e?: string) => void;

interface UserInfoProps {
  data?: DataType;
  attributionAddrHandle: FunctionType;
  onChange?: FunctionType;
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { data = {}, attributionAddrHandle = () => {}, onChange = () => {} } = props;
  const [value, setValue] = useState('');

  // useEffect(() => {
  //   setValue(data.detailAddr);
  // }, [data]);

  return (
    <div className={styles.headerSection}>
      <FormItem
        type="select"
        title="配送地区"
        placeholder="请选择地区"
        onClick={attributionAddrHandle}
        value={data.attributionAddr}
      />
      <FormItem
        type="input"
        title="详细地址"
        placeholder="请填写详细地址"
        onChange={(v) => {
          onChange(v);
        }}
        value={data.detailAddr}
      />
    </div>
  );
};

export default UserInfo;
