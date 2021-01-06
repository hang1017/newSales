import React, { useState, useEffect } from 'react';

import unSelectIcon from '@/assets/img/un_select.png';
import selectIcon from '@/assets/img/customer/c_select.png';
import ActionSheet from '@/components/ActionSheet';
import SingleBtn from '../SingleBtn';

import styles from './index.less';

interface OldPhoneAlert {
  selectPhone?: string;
  phoneList: any[];
  show?: boolean; // 是否显示弹框
  onClick?: (selectPhone: any) => void;
  closeClick?: () => void;
  title?: string;
}

const Page: React.FC<OldPhoneAlert> = (props) => {
  const {
    selectPhone = '',
    phoneList = [],
    show,
    onClick = () => {},
    closeClick,
    title = '选择老号码',
  } = props;

  const [showNew, updateShowNew] = useState(show);
  const [currentPhone, updatePhone] = useState(selectPhone);
  const [selectItem, updateSelectitem] = useState();
  const submitClick = (e) => {
    updateShowNew(false);
    if (onClick) {
      onClick(selectItem);
    }
  };

  useEffect(() => {
    updateShowNew(show);
    updatePhone(selectPhone);
    return () => {};
  }, [show]);

  return (
    <>
      <ActionSheet
        title={title}
        show={showNew}
        closeClick={() => {
          updateShowNew(false);
          if (closeClick) {
            closeClick();
          }
        }}
      >
        <div className={styles.phoneAllList}>
          <div className={styles.phoneList}>
            {phoneList?.map((item) => {
              return (
                <div
                  className={styles.phoneCell}
                  onClick={() => {
                    updatePhone(item.phoneNum || item.typeVal);
                    updateSelectitem(item);
                  }}
                >
                  <div className={styles.labelPhone}>{item.phoneNum || item.typeName}</div>
                  <img
                    src={
                      currentPhone === (item.phoneNum || item.typeVal) ? selectIcon : unSelectIcon
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.footBtn}>
            <SingleBtn text="确定" canClick onClick={submitClick} />
          </div>
        </div>
      </ActionSheet>
    </>
  );
};

export default Page;
