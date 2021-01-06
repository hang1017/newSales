import React, { FC, useState } from 'react';

import { Modal } from 'antd-mobile';
import IconUnSelect from '@/assets/img/un_select.png';
import IconSelect from '@/assets/img/customer/c_select.png';
import ServiceContent from '@/components/ServiceContent';
import styles from './index.less';

interface ServiceTipsProps {
  onChange: (e: boolean) => void;
  defaultSelect: boolean;
}

const ServiceTips: FC<ServiceTipsProps> = (props) => {
  const { onChange = () => {}, defaultSelect = true } = props;
  const [select, setSelect] = useState(defaultSelect);
  const [showService, updateShowService] = useState(false);
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
        注册登录即表示您接受并同意
        <span
          className={styles.protocol}
          onClick={() => {
            updateShowService(true);
          }}
        >
          《用户协议条款》
        </span>
      </span>

      <Modal
        visible={showService}
        transparent
        title="《用户协议条款》"
        footer={[
          {
            text: 'Ok',
            onPress: () => {
              updateShowService(!showService);
            },
          },
        ]}
      >
        <div style={{ height: 600, overflow: 'scroll', textAlign: 'left' }}>
          <ServiceContent />
        </div>
      </Modal>
    </div>
  );
};

export default ServiceTips;
