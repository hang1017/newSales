import React, { FC, useEffect, useState } from 'react';
import { EmergencyListModelState, ConnectProps, connect, router } from 'alita';
import { Button } from 'antd-mobile';
import { setEmergencyData } from '@/utils';
import styles from './index.less';

interface PageProps extends ConnectProps {
  emergencyList: EmergencyListModelState;
}

const EmergencyListPage: FC<PageProps> = ({ emergencyList, dispatch }) => {
  const { emList = [] } = emergencyList;
  const [windowHeight, setWindowHeight] = useState(0);
  // 查询列表数据
  useEffect(() => {
    dispatch!({
      type: 'emergencyList/qryList',
    });
    setWindowHeight(document.documentElement.clientHeight - 90);
    setEmergencyData({});
    // 清空紧急挂失模块数据
    dispatch!({
      type: 'emerPayConfirm/save',
      payload: {
        phone: '',
        orderInfo: {},
        addressInfo: {},
        idCardInfo: {},
        invoiceContent: { personal: {}, company: {} },
      },
    });
  }, []);

  /**
   * 按钮点击事件
   */
  const btnClick = (item?: any) => {
    const { keyAttrList = [] } = item;
    if (!item.skuId) {
      return;
    }
    const serviceOffer = keyAttrList && keyAttrList.find(l => (l.attrCode === 'Service_Offer'));
    const attrValues = serviceOffer && serviceOffer.attrValues?.map(a => a.attrValue);
    setEmergencyData(item);
    router.push({
      pathname: '/emergency/loseAccount',
      query: {
        id: item?.id,
        type: attrValues && attrValues[0],
      },
    });
  };

  return (
    <div className={styles.emergencyListStyle} style={{ height: windowHeight }}>
      {emList.map((item: any) => {
        return (
          <div className={styles.listItem} key={item?.id || item?.skuId}>
            <img src={item?.filePathInServer} alt="" className={styles.emImg} />
            <div className={styles.emContent}>
              <div className={styles.topText}>
                <div className={styles.emTitle}>{item?.goodsName}</div>
                <div className={styles.emSubTitle}>{item?.skuName}</div>
              </div>
              <div className={styles.bottomContent}>
                <div className={styles.emMoney}>{item?.salesPrice}元</div>
                <Button className={styles.emBtn} onClick={() => btnClick(item)}>
                  立即办理
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default connect(({ emergencyList }: { emergencyList: EmergencyListModelState }) => ({
  emergencyList,
}))(EmergencyListPage);
