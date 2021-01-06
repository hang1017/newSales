import React, { FC, useEffect, useState } from 'react';
import { MyServicesModelState, ConnectProps, connect } from 'alita';

import MyTabs from '@/pages/customer/components/MyTabs';
import Empty from '@/components/Empty';

import { Toast, List, Picker } from 'antd-mobile';
import ServiceItem from '../components/ServiceItem';

import styles from './index.less';

interface PageProps extends ConnectProps {
  myServices: MyServicesModelState;
}

const MyServicesPage: FC<PageProps> = ({ myServices, dispatch }) => {
  const [isMyService, updateServiceFlag] = useState(false);
  const [accNbr, updateAccNbr] = useState('');
  const [activeIndex, updateIndex] = useState(0);

  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'myServices/numberList',
      payload: {
        statusFlag: 'true',
      },
    }).then((res: any[]) => {
      if (res && res.length) {
        updateAccNbr([res[0].value]);
        dispatch!({
          type: 'myServices/qryGoodsSpecialRuls',
          payload: {
            stype: '1000',
            storeId: -1,
            accNbr: res[0].label,
            contractStatus: ['9999', '3000'],
          },
        });
      }
    });

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { serviceList, phoneList, numberList } = myServices;
  const onTabChange = (index) => {
    dispatch!({
      type: 'myServices/save',
      payload: {
        serviceList: [],
      },
    });
    updateIndex(index);
    switch (index) {
      case 0:
        updateServiceFlag(false);
        // eslint-disable-next-line no-case-declarations
        const filter = phoneList.filter((it: any) => `${it.value}` === `${accNbr}`);
        if (filter && filter?.length) {
          dispatch!({
            type: 'myServices/qryGoodsSpecialRuls',
            payload: {
              stype: '1000',
              storeId: -1,
              accNbr: filter[0].label,
              contractStatus: ['9999', '3000'],
            },
          });
        }
        break;
      case 1:
        dispatch!({
          type: 'myServices/contractList',
          payload: {
            statusCd: '1000',
          },
        });
        updateServiceFlag(true);
        break;
      default:
        break;
    }
  };
  const tabList = [
    {
      label: '服务签约',
      key: 0,
    },
    {
      label: '我的服务',
      key: 1,
    },
  ];

  /**
   * 解除签约列表
   * @param data
   */
  const cancelContract = (data: any) => {
    dispatch!({
      type: 'myServices/contractList',
    });
    updateServiceFlag(true);
  };

  const renderList = () => {
    return (
      <div className={styles.myService}>
        {serviceList && serviceList.length ? (
          <div
            className={styles.serviceList}
            style={{ height: document.documentElement.clientHeight - 270 }}
          >
            {serviceList.map((item: any) => (
              <ServiceItem
                isMyService={isMyService}
                data={item}
                selectPhoneObj={numberList[parseInt(accNbr, 10)]}
                accNbr={accNbr}
                dispatch={dispatch}
                cancelContract={cancelContract}
                myOrderSevice={(res: any) => {
                  if (res.success) {
                    // 跳转到支付页面
                    window.location.href = res.data;
                  } else {
                    Toast.fail(res.errMessage || '签约失败，请稍候再试', 1);
                  }
                  // console.log('签约结果:' + data)
                }}
              />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    );
  };
  return (
    <div>
      <MyTabs activeIndex={0} tabList={tabList} onTabChange={onTabChange} />

      {activeIndex === 0 ? (
        <>
          {numberList && numberList.length ? (
            <>
              <Picker
                data={phoneList}
                cols={1}
                value={accNbr}
                onOk={(val: string) => {
                  updateAccNbr(val);
                  const filter = phoneList.filter((it: any) => `${it.value}` === `${val}`);
                  dispatch!({
                    type: 'myServices/qryGoodsSpecialRuls',
                    payload: {
                      stype: '1000',
                      storeId: -1,
                      accNbr: filter[0].label,
                      contractStatus: ['9999', '3000'],
                    },
                  });
                }}
              >
                <List.Item arrow="horizontal">选择号码</List.Item>
              </Picker>
              {renderList()}
            </>
          ) : (
            <div className={styles.noPhoneList}>暂无可签约号码</div>
          )}
        </>
      ) : (
        <> {renderList()}</>
      )}
    </div>
  );
};

export default connect(({ myServices }: { myServices: MyServicesModelState }) => ({ myServices }))(
  MyServicesPage,
);
