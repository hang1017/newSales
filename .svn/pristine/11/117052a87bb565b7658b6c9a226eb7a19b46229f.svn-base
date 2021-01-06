import React, { FC, useState, useEffect } from 'react';
import { connect } from 'alita';
import classnames from 'classnames';
import styles from './index.less';
import { AddDeliveryAddrModelState } from 'alita';

interface AddressPickerViewProps {
  onClose: () => void;
  onSubmit: (e: any) => void;
  show?: boolean;
  title?: string;
  colums?: number;
  isLimitArea?: boolean; //是否调用限制选择区域接口
}

const AddressPickerView: FC<AddressPickerViewProps> = (props) => {
  const {
    show,
    onClose = () => {},
    onSubmit = () => {},
    title = '号码归属',
    addDeliveryAddr,
    dispatch,
    colums = 1000,
    isLimitArea,
  } = props; // shuxing
  const { homeAddrData = [] } = addDeliveryAddr;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectData, setSelectData] = useState([]);
  useEffect(() => {
    // requestProviceList();
    return () => {};
  }, []);

  useEffect(() => {
    setSelectData([]);
    setActiveIndex(0);
    if (show) {
      requestProviceList();
    }
    //
  }, [show]);

  const renderNavBar = (): React.ReactNode => {
    // 头部
    return (
      <div className={styles.navBar}>
        {title}
        <div onClick={onClose}></div>
      </div>
    );
  };

  const renderDidSelectArea = (): React.ReactNode => {
    return (
      <div className={styles.subNavBar}>
        {selectData.map((item: any, index) => {
          return (
            <div
              key={item.value}
              className={activeIndex === index && styles.active}
              onClick={() => {
                if (index == 0) {
                  requestProviceList();
                } else {
                  requestCityList(item);
                }
                setActiveIndex(index);
              }}
            >
              {item.label}
            </div>
          );
        })}
        <div className={activeIndex === selectData.length && styles.active}>请选择</div>
      </div>
    );
  };

  const requestProviceList = () => {
    if (isLimitArea) {
      dispatch!({
        type: 'addDeliveryAddr/queryAreaByLimitCond',
        payload: {
          parentId: -1,
        },
      });
    } else {
      dispatch!({
        type: 'addDeliveryAddr/queryAreaFatherList',
      });
    }
  };
  const requestCityList = (item) => {
    // dispatch!({
    //   type: 'addDeliveryAddr/queryAreaNextLevel',
    //   payload: {
    //     parentId: item.value,
    //     callback: (list) => {
    //       if (list.length === 0) {
    //         submit(selectData);
    //       }
    //     },
    //   },
    // });
    dispatch!({
      type: 'addDeliveryAddr/queryLimitChildAreaByParentIdModels',
      payload: {
        parentId: item.value,
        callback: (list) => {
          if (list.length === 0) {
            submit(selectData);
          }
        },
      },
    });
  };

  const submit = (dataList: any) => {
    onSubmit(dataList);
  };

  return (
    <>
      <div
        hidden={!show}
        className={styles.mask}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      <div
        className={classnames({
          [styles.addressPickerView]: true,
          [styles.show]: show,
        })}
      >
        <div className={styles.nav}>
          {renderNavBar()}
          {renderDidSelectArea()}
        </div>
        <div className={styles.cityList}>
          {homeAddrData.map((item) => {
            return (
              <div
                className={styles.cityItem}
                key={item.value}
                onClick={() => {
                  selectData.splice(activeIndex);
                  setActiveIndex(activeIndex + 1);
                  selectData.push(item);
                  setSelectData(JSON.parse(JSON.stringify(selectData)));
                  if (selectData.length >= colums) {
                    submit(selectData);
                  }
                  requestCityList(item);
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// export default connect({ addDeliveryAddr }: { addDeliveryAddr: AddDeliveryAddrModelState })(AddressPickerView);

export default connect(({ addDeliveryAddr }: { addDeliveryAddr: AddDeliveryAddrModelState }) => ({
  addDeliveryAddr,
}))(AddressPickerView);
