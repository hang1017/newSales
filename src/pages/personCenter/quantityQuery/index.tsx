import React, { FC, useEffect, useState } from 'react';
import { QuantityQueryModelState, ConnectProps, connect, history } from 'alita';
import { Tabs, WhiteSpace, Icon } from 'antd-mobile';
import PhonePopView from '@/components/PhonePopView';
import classnames from 'classnames';
import styles from './index.less';
import Empty from '@/components/Empty';

interface PageProps extends ConnectProps {
  quantityQuery: QuantityQueryModelState;
}

const QuantityQueryPage: FC<PageProps> = ({ quantityQuery, dispatch }) => {
  const [currentIndex, updateIndex] = useState(0);
  const [showPhonePop, updateShowPhonePop] = useState(false);
  const [showDetails, updateShowDetails] = useState({
    key1: false,
    key2: false,
  });
  const {
    myTeleBusiUsages,
    phoneList,
    quantityList,
    currentPhone,
    allTotal,
    allRemain,
    totalUnit,
    remainUnit,
  } = quantityQuery;
  // const [currentPhone, updateCurrentPhone] = useState('');
  const tabList = [{ title: '流量' }, { title: '语音' }, { title: '短信' }];

  const ryMyConsumeUsage = (teleBusiType) => {
    dispatch!({
      type: 'quantityQuery/qryMyConsumeUsage',
      payload: {
        teleBusiType,
      },
    }).then((mobile) => {
      // console.log(mobile);
      // updateCurrentPhone(mobile);
    });
  };
  // 这里发起了初始化请求
  useEffect(() => {
    ryMyConsumeUsage(101003); // 流量
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  const renderHeader = () => (
    <div className={styles.headerContain}>
      <div className={styles.iconBack}>
        <Icon
          type="left"
          onClick={() => {
            history.goBack();
          }}
        />
      </div>
      <div className={styles.headerTitle}>用量查询</div>
    </div>
  );
  const getRealUse = (value: string, type: string, unit: string) => {
    if (unit) {
      return value + unit;
    }

    let num = parseFloat(value);
    if (type === '101003') {
      if (num >= 1024) {
        num /= 1024;
        num = num.toFixed(2);
        return `${num}G`;
      }

      return `${num}M`;
    }
    if (type === '102003') {
      return `${num}分`;
    }
    if (type === '103001') {
      return `${num}条`;
    }
    return num;
  };
  const getShowValue = (type, teleBusiUsages) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in teleBusiUsages) {
      if (Object.prototype.hasOwnProperty.call(teleBusiUsages, key)) {
        const element = teleBusiUsages[key];
        const { teleBusiType } = element;
        if (type === teleBusiType) {
          return element;
        }
      }
    }
    return undefined;
  };
  // 渲染卡片内容
  const renderCardItem = (type) => {
    if (!myTeleBusiUsages) {
      return '';
    }
    const { teleBusiUsages = [], mobile, extraInfos = [] } = myTeleBusiUsages;

    if (!teleBusiUsages.length && !extraInfos.length) {
      return <Empty />;
    }
    // let isShowEmety = true;
    console.log(`teleBusiUsages:${JSON.stringify(teleBusiUsages)}`);
    return (
      <div className={styles.cardContain}>
        {teleBusiUsages.map((item, index) => {
          const {
            teleBusiName,
            total,
            used,
            remain,
            skuUsages,
            usedUnit,
            teleBusiType,
            remainUnit,
          } = item;
          if (teleBusiType !== type) {
            return <div />;
          }
          // isShowEmety = false;
          let realUsed = used;
          let realRemain = remain;
          realUsed = getRealUse(used, teleBusiType, usedUnit);
          realRemain = getRealUse(remain, teleBusiType, remainUnit);

          const percent = (used / total) * 100;
          if (currentPhone !== mobile) {
            dispatch!({
              type: 'quantityQuery/save',
              payload: {
                currentPhone: mobile,
              },
            });
          }
          return (
            <div className={styles.cardItem} key={index}>
              {index === 0 && [
                <div className={styles.title}>
                  <div className={styles.iconBg}></div>
                  <div className={styles.desc}>{mobile}</div>
                </div>,
              ]}
              <div className={styles.mainContain}>
                {
                  // <div className={styles.saleTitle}>
                  //   {skuUsages && skuUsages.length && skuUsages[0].skuName}
                  // </div>
                  // <div className={styles.flowPercentContain}>
                  //   <div className={styles.flowPercent} style={{ width: `${percent}%` }}></div>
                  // </div>
                  //   <div className={styles.descContain}>
                  //   <div>
                  //     <span>已使用</span>
                  //     <div className={styles.flowNum}>{realUsed}</div>
                  //   </div>
                  //   <div>
                  //     <span>未使用</span>
                  //     <div className={styles.flowNum}>{realRemain}</div>
                  //   </div>
                  // </div>
                  //   <div
                  //   className={styles.showMore}
                  //   onClick={() => {
                  //     console.log('点击查看详情');
                  //     showDetails[item.id] = !showDetails[item.id];
                  //     console.log('点击查看详情', showDetails);
                  //     updateShowDetails({ ...showDetails });
                  //   }}
                  // >
                  //   查看详情
                  //   <Icon
                  //     className={styles.iconDetails}
                  //     type={showDetails[item.id] ? 'up' : 'down'}
                  //   />
                  // </div>
                }
              </div>
              <div className={styles.detailsContain}>
                {skuUsages.map((detailsItem) => (
                  <>
                    <div className={styles.orderTitle}>{detailsItem.skuName}</div>

                    <div className={styles.flowDetails}>
                      <div>
                        已使用
                        <span className={styles.flowNum}>
                          {getRealUse(detailsItem.used, teleBusiType, detailsItem?.usedUnit)}
                        </span>
                      </div>
                      <div>
                        未使用
                        <span className={styles.flowNum}>
                          {getRealUse(detailsItem.remain, teleBusiType, detailsItem?.remainUnit)}
                        </span>
                      </div>
                      <div>
                        总共
                        <span className={styles.flowNum}>
                          {getRealUse(detailsItem.total, teleBusiType, detailsItem?.totalUnit)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.expiresTime}>失效时间：{detailsItem.expdate}</div>
                  </>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  // 渲染查询号码内容
  const renderPhone = () => {
    // console.log('renderPhone');
    return (
      <div className={styles.searchPhone}>
        <div className={styles.phoneNum}>
          查询号码：
          {currentPhone}
        </div>
        <div className={styles.moreInfo} onClick={() => updateShowPhonePop(true)}>
          {'更换号码>'}
        </div>
      </div>
    );
  };
  // 渲染用量内容
  const renderQuantity = () => {
    const { extraInfos = [] } = myTeleBusiUsages || {};
    if (!extraInfos || !extraInfos.length) {
      return '';
    }
    return (
      <div className={styles.cardContain}>
        <div className={styles.cardItem}>
          <div className={styles.title}>
            <div className={styles.iconBg}></div>
            <div className={styles.desc}>标准资费使用量</div>
          </div>
          {extraInfos?.map((item) => {
            let { teleBusiType, teleBusiName, extraUse, usedUnit, extraFee } = item;
            let tempBusName = '';
            let label = '';
            switch (teleBusiType) {
              case '101003':
                tempBusName = '国内通用流量';
                label = '流量';
                break;
              case '102003':
                tempBusName = '国内通用语音';
                label = '语音';
                extraUse = extraUse / 60;
                usedUnit = '分钟';
                break;
              case '103001':
                tempBusName = '国内通用短信';
                label = '短信';
                break;
              default:
                break;
            }
            return (
              <>
                <div className={styles.setMealContain}>
                  <div>
                    <span className={styles.subTitle}>{teleBusiName || tempBusName}</span>
                  </div>
                  <div>
                    费用<span className={styles.flowNum}>{extraFee}元</span>
                  </div>
                </div>
                <div className={styles.flowPercentContain}>
                  <div
                    className={classnames([styles.flowPercent, styles.setMealFlowPercent])}
                    style={{ width: `${100}%` }}
                  ></div>
                </div>

                <div className={styles.setMealContain}>
                  <div></div>
                  <div>
                    <span className={styles.overflow}>{label}超出</span>
                    <div className={styles.overflowValue}>{extraUse + usedUnit}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  };

  const updatePhone = (selectedValue: string) => {
    for (let i = 0; i < quantityList.length; i++) {
      // 用来可结束循环
      if (selectedValue === quantityList[i].mobile) {
        if (currentIndex === 0) {
          dispatch!({
            type: 'quantityQuery/save',
            payload: {
              myTeleBusiUsages: quantityList[i],
              currentPhone: selectedValue,
              allTotal: quantityList[i]?.teleBusiUsages[0]?.used || '0.00',
              allRemain: quantityList[i]?.teleBusiUsages[0]?.remain || '0.00',
              totalUnit: quantityList[i]?.teleBusiUsages[0]?.usedUnit || 'G',
              remainUnit: quantityList[i]?.teleBusiUsages[0]?.remainUnit || 'G',
            },
          });
        } else {
          dispatch!({
            type: 'quantityQuery/save',
            payload: {
              myTeleBusiUsages: quantityList[i],
              currentPhone: selectedValue,
            },
          });
        }

        return;
      }
    }
  };
  const onTabChange = (tab, index) => {
    let teleBusiType = 101003;
    switch (index) {
      case 0:
        teleBusiType = 101003;
        break;
      case 1:
        teleBusiType = 102003;
        break;
      case 2:
        teleBusiType = 103001;
        break;
      default:
        break;
    }
    ryMyConsumeUsage(teleBusiType);
  };
  const renderView = (type) => {
    const { extraInfos = [], teleBusiUsages = [] } = myTeleBusiUsages;
    if (!teleBusiUsages.length && !extraInfos.length) {
      return <Empty />;
    }

    renderCardItem(type);
    renderQuantity();
  };
  return (
    <div className={styles.center} style={{ height: document.documentElement.clientHeight - 280 }}>
      {localStorage.getItem('source') !== '4' &&
        localStorage.getItem('source') !== 'wxamp' &&
        renderHeader()}
      <div className={styles.toalAmount}>
        <div>
          <div className={styles.price}>{allTotal + totalUnit}</div>
          <div className={styles.label}>国内流量已用</div>
        </div>
        <div>
          <div className={styles.price}>{allRemain + remainUnit}</div>
          <div className={styles.label}>国内流量剩余</div>
        </div>
      </div>
      <Tabs
        tabs={tabList}
        initialPage={0}
        swipeable={false}
        useOnPan={false}
        prerenderingSiblingsNumber={0}
        onChange={(tab, index) => {
          console.log('onChange', index, tab);
          updateIndex(index);
          onTabChange(tab, index);
        }}
        tabBarActiveTextColor="#fff"
        tabBarUnderlineStyle={{ border: '0', textAlign: 'center' }}
      >
        <div className={styles.tabItem}>
          {renderPhone()}
          {renderCardItem('101003')}
          {renderQuantity()}
        </div>
        <div className={styles.tabItem}>
          {renderPhone()}
          {renderCardItem('102003')}
          {renderQuantity()}
        </div>
        <div className={styles.tabItem}>
          {renderPhone()}
          {renderCardItem('103001')}
          {renderQuantity()}
        </div>
      </Tabs>
      <WhiteSpace />
      <PhonePopView
        visiable={showPhonePop}
        defaultSelect={currentPhone}
        onOk={(selectedValue) => {
          console.log(`selectedValue:${selectedValue}`);
          updatePhone(selectedValue);
          dispatch!({
            type: 'myPage/save',
            payload: {
              userSelectPhone: selectedValue,
            },
          });
        }}
        onClose={() => updateShowPhonePop(false)}
        dataList={phoneList}
      />
    </div>
  );
};

export default connect(({ quantityQuery }: { quantityQuery: QuantityQueryModelState }) => ({
  quantityQuery,
}))(QuantityQueryPage);
