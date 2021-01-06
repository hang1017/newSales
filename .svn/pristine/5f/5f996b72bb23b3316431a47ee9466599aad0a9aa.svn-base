import React, { FC, useEffect, useState } from 'react';
import { SelectNumberModelState, ConnectProps, connect, setPageNavBar, router } from 'alita';
import { Button, Toast } from 'antd-mobile';
import classnames from 'classnames';
import AddressPickerView from '@/components/AddressPickerView';
import { ClosePng, SearchPng, NoNumberPng } from '@/assets';
import CloseIcon from '@/assets/img/close.png';
import RightIcon from '@/assets/img/rigth_more.png';
import TipsIcon from '@/assets/tips.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  selectNumber: SelectNumberModelState;
}

// const numList = Array.from(new Array(50)).map((_val, i) => `1234567890${i}`);

const SelectNumberPage: FC<PageProps> = ({ selectNumber, dispatch, location }) => {
  const [addrFlag, setAddrFlag] = useState(false); // 是否弹出选址的框
  const [addrLabel, setAddrLabel] = useState<string[]>(['上海市', '上海市辖区']); // 地址文本列表
  const [addrValue, setAddrValue] = useState<any>({
    label: '上海市辖区',
    lanId: '8310100',
    provinceId: '8310000',
    value: '8310100',
  }); //  文本id
  const [searchValue, setSearchValue] = useState<string>(''); // 搜索的输入值
  const [selectValue, setSelectValue] = useState<any>({}); // 选中号码的值
  const [numList, setNumList] = useState<any>([]);
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        icon: <img src={CloseIcon} alt="" className={styles.selectNumberCloseIcon} />,
      },
    });
    if (addrValue.lanId) {
      queryNumList(addrValue, '');
    }
  }, []);

  // 输入框改变事件
  const searchChange = (e: any) => {
    const { value = '' } = e.target;
    if (value && value.length === 12) return;
    setSearchValue(value.trim());
    if (addrValue && Object.keys(addrValue).length && value.length >= 3) {
      queryNumList(addrValue, value.trim());
    }
  };

  // 输入框清空事件
  const searchCloseClick = () => {
    setSearchValue('');
    if (addrValue && Object.keys(addrValue).length) {
      queryNumList(addrValue, '');
    }
  };

  const addrSubmit = (list = []) => {
    setAddrValue(list[1]);
    setAddrLabel(list.map((item: any) => item.label));
    setAddrFlag(false);
    queryNumList(list[1], searchValue);
  };

  const queryNumList = (addrData: any, numMatch: string) => {
    dispatch!({
      type: 'selectNumber/queryPhoneNumInfoForBilibiliModal',
      payload: {
        provinceId: addrData.provinceId,
        lanId: addrData.lanId,
        numMatch,
      },
    }).then((data: any) => {
      setNumList(data);
    });
  };

  // 数据提交保存
  const submit = () => {
    if (!addrValue.lanId) {
      Toast.show('请选择归属地!');
      return;
    }
    if (!selectValue.phoneNum) {
      Toast.show('请选择号码!');
      return;
    }
    dispatch!({
      type: 'commitOrder/phoneNumOccupForBilibili',
      payload: {
        phoneNum: selectValue.phoneNum,
        provinceId: addrValue.provinceId,
        lanId: addrValue.lanId,
      },
    }).then((res) => {
      dispatch!({
        type: 'selectNumber/save',
        payload: {
          phoneData: selectValue,
        },
      });
      router.goBack();
    });
  };

  return (
    <div className={styles.selectNumberStyle}>
      <div className={styles.selectAddr} onClick={() => setAddrFlag(true)}>
        <div className={styles.selectLeft}>
          <div className={styles.label}>归属地</div>
          <div className={styles.addrValue}>
            {addrLabel && addrLabel.length > 0 ? addrLabel.join(' ') : '请选择'}
          </div>
        </div>
        <div className={styles.selectRight}>
          {/* <img src={TipsIcon} alt="" className={styles.tipsIcon} />
          <div className={styles.tipsText}>号码归属地：上海</div> */}
          <img src={RightIcon} alt="" className={styles.rightIcon} />
        </div>
      </div>
      <div className={styles.searchContent}>
        <img src={SearchPng} alt="" className={styles.searchIcon} />
        <input
          value={searchValue}
          className={styles.searchText}
          type="number"
          onChange={searchChange}
        />
        <img src={ClosePng} alt="" className={styles.searchIcon} onClick={searchCloseClick} />
      </div>
      {numList && numList.length > 0 && (
        <div className={styles.addrNumList}>
          {numList.map((item: any) => (
            <div
              className={classnames({
                [styles.numItem]: true,
                [styles.numItemActive]: selectValue?.phoneNum === item?.phoneNum,
              })}
              key={item}
              onClick={() => setSelectValue(item)}
            >
              {searchValue && item?.phoneNum.indexOf(searchValue) !== -1 ? (
                <React.Fragment>
                  {item?.phoneNum.split(searchValue).map((it: any, index: number) => {
                    if (index === item?.phoneNum.split(searchValue).length - 1) {
                      return <span>{it}</span>;
                    }
                    return (
                      <span>
                        {it}
                        <span style={{ color: 'red' }}>{searchValue}</span>
                      </span>
                    );
                  })}
                </React.Fragment>
              ) : (
                item?.phoneNum
              )}
            </div>
          ))}
          <div className={styles.listHeight} />
        </div>
      )}
      {numList.length === 0 && (
        <div className={styles.noNumList}>
          <img src={NoNumberPng} alt="" className={styles.noNumImg} />
          <div className={styles.noNumText}>请选择归属地</div>
        </div>
      )}
      <div className={styles.addrFooter}>
        <div className={styles.footText}>已选号码：</div>
        <div
          className={classnames({
            [styles.footValue]: true,
            [styles.footValueActive]: selectValue?.phoneNum,
          })}
        >
          {selectValue.phoneNum || '请选择'}
        </div>
        <Button className={styles.footBtn} onClick={submit}>
          完成
        </Button>
      </div>
      <AddressPickerView
        show={addrFlag}
        isLimitArea={true}
        title="号码归属"
        colums={2}
        onClose={() => {
          setAddrFlag(false);
        }}
        onSubmit={addrSubmit}
      />
    </div>
  );
};

export default connect(({ selectNumber }: { selectNumber: SelectNumberModelState }) => ({
  selectNumber,
}))(SelectNumberPage);
