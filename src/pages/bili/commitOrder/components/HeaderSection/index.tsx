import React, { FC } from 'react';
import styles from './index.less';
import ProductInfo from '../../../components/ProductInfo';
import FormItem from '../../../components/FormItem';

type DataType = {
  phoneAddr?: string;
  selectPhone?: string;
};
type FunctionType = () => void;

interface HeaderSectionProps {
  data?: DataType;
  phoneAddrHandle: FunctionType;
  selectPhoneHandle: FunctionType;
  proInfo: any;
  showPhone?: boolean;
}

const HeaderSection: FC<HeaderSectionProps> = ({
  data = {},
  phoneAddrHandle = () => {},
  selectPhoneHandle = () => {},
  proInfo = {},
  showPhone,
}) => {
  return (
    <div className={styles.headerSection}>
      <ProductInfo proInfo={proInfo} />
      {showPhone && (
        <>
          <FormItem
            type="select"
            title="号码归属"
            placeholder="请选择号码归属地"
            onClick={phoneAddrHandle}
            value={data.phoneAddr}
          />
          <FormItem
            type="select"
            title="选择号码"
            placeholder="请选择号码"
            onClick={selectPhoneHandle}
            value={data.selectPhone}
          />
        </>
      )}
    </div>
  );
};

export default HeaderSection;
