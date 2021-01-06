import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { CouponsPopViewProps, CouponsPopItemProps } from './data';
import {
  IconArrowRight,
  IconCloseBtn,
  IconEnable,
  IconSelect,
  IconUnselect,
  IconEnableFlag,
} from './assets';

const CouponsPopView: FC<CouponsPopViewProps> = (props) => {
  const { enableData = [], disableData = [], onSubmit = () => {} } = props;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [show, setshow] = useState(false);
  const [enableList, setEnableList] = useState([]);
  const [disableList, setDisableList] = useState([]);
  const [selectNum, setSelectNum] = useState(0);
  const [disAmount, setDisAmount] = useState(0);

  useEffect(() => {
    setDisableList(disableData);
  }, [disableData]);
  useEffect(() => {
    setEnableList(enableData);
  }, [enableData]);

  // 获取选择的个数
  const selectNumber = enableList.filter((item: CouponsPopItemProps) => item.select === true)
    .length;

  const discountAmount = () => {
    const tempList = enableList.filter((item: CouponsPopItemProps) => item.select === true);
    let count = 0;
    tempList.forEach((item: CouponsPopItemProps) => {
      count += +item.amount;
    });
    return count;
  };

  const tabBarList = [
    {
      title: `可用抵扣券（${enableData.length}）`,
      key: 0,
    },
    {
      title: `不可用抵扣券（${disableData.length}）`,
      key: 0,
    },
  ];

  const InputItem = () => (
    <div
      className={styles.inputView}
      onClick={() => {
        setshow(true);
      }}
    >
      <div className={styles.inputBd}>
        <span className={styles.inputBdTitle}>优惠券</span>
        {selectNum > 0 ? <span className={styles.subTitle}>已选{selectNum}张</span> : ''}
      </div>
      <div className={styles.inputFt}>
        {disAmount ? <span>{disAmount}</span> : <span className={styles.placeholder}>请选择</span>}
        <img src={IconArrowRight} alt="" />
      </div>
    </div>
  );
  const TitleView = () => (
    <div className={styles.titleView}>
      <div className={styles.title}>抵扣券</div>
      <img
        className={styles.closeBtn}
        src={IconCloseBtn}
        alt=""
        onClick={(e) => {
          e.stopPropagation();
          setshow(false);
        }}
      />
    </div>
  );

  const TabBar = () => (
    <div className={styles.tabbar}>
      {tabBarList.map((item, index) => (
        <div
          onClick={() => setActiveTabIndex(index)}
          key={item.key}
          className={classnames({
            [styles.tabbarItem]: true,
            [styles.activeTab]: activeTabIndex === index,
          })}
        >
          {item.title}
        </div>
      ))}
    </div>
  );

  const ListCell = ({ item, index = 0 }: { item: CouponsPopItemProps; index: number }) => (
    <div
      className={styles.listViewItem}
      onClick={() => {
        if (activeTabIndex === 0) {
          const tempList = JSON.parse(JSON.stringify(enableList));
          item.select = !item.select;
          tempList[index] = item;
          setEnableList(tempList);
        }
      }}
    >
      <div className={styles.leftItem} style={{ backgroundImage: `url(${IconEnable})` }}>
        ￥<span>{item.amount}</span>
      </div>
      <div className={styles.rightItem}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.phoneNum}>手机号码：{item.phoneNumber}</div>
        <div className={styles.date}>有效期：{item.expiryDate}</div>
      </div>
      {activeTabIndex === 0 ? (
        <img className={styles.radio} src={!item.select ? IconUnselect : IconSelect} />
      ) : (
        <img className={styles.enableFlag} src={IconEnableFlag} />
      )}
    </div>
  );

  const ListView = () => (
    <div className={styles.listView}>
      <div className={styles.headerView}>
        您已选中优惠券{selectNumber}张，共抵用¥{discountAmount()}元
      </div>
      {activeTabIndex === 0 ? (
        <>
          {enableList.map((item: CouponsPopItemProps, index) => (
            <ListCell key={item.id} item={item} index={index} />
          ))}
        </>
      ) : (
        <>
          {disableList.map((item: CouponsPopItemProps, index) => (
            <ListCell key={item.id} item={item} index={index} />
          ))}
        </>
      )}
    </div>
  );

  const BottomView = () => (
    <div className={styles.bottomView}>
      <div
        className={styles.okeyBtn}
        onClick={() => {
          const resultList = enableList.filter((item) => item.select === true);
          setDisAmount(`-${discountAmount()}元`);
          setSelectNum(resultList.length);
          onSubmit(resultList);
          setshow(false);
        }}
      >
        确认
      </div>
    </div>
  );

  const TipsView = () => <div className={styles.tipsview}>此券暂不可和已购选券叠加使用</div>;
  return (
    <>
      <InputItem />
      <div
        className={styles.couponsMaskView}
        hidden={!show}
        onClick={(e) => {
          e.stopPropagation();
          setshow(false);
        }}
      ></div>
      <div
        className={classnames({
          [styles.couponsPopView]: true,
          [styles.show]: show,
        })}
      >
        <TitleView />
        <TabBar />
        <ListView />
        <TipsView />
        <BottomView />
      </div>
    </>
  );
};

export default CouponsPopView;
