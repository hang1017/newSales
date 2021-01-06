import React, { FC, useState } from 'react';

import IconUnSelect from '@/assets/img/un_select.png';
import IconSelect from '@/assets/img/select.png';
import styles from './index.less';

interface ServiceTipsProps {
  onChange: (e: boolean) => void;
  defaultSelect: boolean;
  showService: () => void;
}

const ServiceTips: FC<ServiceTipsProps> = (props) => {
  const { onChange = () => {}, defaultSelect = true, showService } = props;
  const [select, setSelect] = useState(defaultSelect);
  return (
    <div className={styles.serviceTips}>
      <img
        src={select ? IconSelect : IconUnSelect}
        onClick={() => {
          onChange(!select);
          setSelect(!select);
        }}
      />
      <span>
        我已阅读并同意《
        <span className={styles.protocol} onClick={showService}>
          客户入网服务协议
        </span>
        》及资费规则
      </span>
    </div>
  );
};

export default ServiceTips;
