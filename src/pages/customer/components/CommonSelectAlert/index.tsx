import React, { useState, useEffect, useRef } from 'react';
import { Grid } from 'antd-mobile';
import classnames from 'classnames';
import closeIcon from '@/assets/img/close.png';
import backIcon from '@/assets/img/back.png';
import SelectIcon from '@/assets/img/select_blue.png';
import UnSelectIcon from '@/assets/img/un_select.png';
import { SelectAlertType } from '@/utils/AppContext';

import BetterScroll from 'better-scroll';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

import styles from './index.less';
/**
 * 数组数据格式：
 * [{
 * value: "18900010001",
 * id: "3",
 * attr: "预存100，最低消费0",
 * select: true}]
 */
interface SelectAlert {
  currentData?: any; // 地址数据
  closeClick?: (e: any) => void; // 关闭弹框
  show?: boolean; // 是否显示弹框
  onComfirm?: (item: any, isShowNew: boolean) => void; // 确定选中
  type?: string; // 类型，phone-手机号 broadband-宽带 tv-电视
  isShowNew: boolean; // 是否选择新号码
  dispatch: any;
  from?: 'bilibi'; // bilibi
  lanId: string | number;
  provinceId: string | number;
  linePhone?: string;
}
let selectItem: any = [];
let bs: BScrollConstructor<{}> | null = null;

const Page: React.FC<SelectAlert> = (props) => {
  const {
    show = false,
    closeClick = () => {},
    currentData = [],
    onComfirm,
    type = SelectAlertType.phone,
    isShowNew = false,
    dispatch,
    from,
    lanId,
    provinceId,
    linePhone = '',
  } = props;

  const ref = useRef(null);

  const source = localStorage.getItem('source');

  const [dataList, updateDateList] = useState(currentData); // 已存在实例数据
  const [newData, updateNewData] = useState([]); // 选择的新数据
  const [showNew, updateShowNew] = useState(isShowNew);
  const [inputValue, updateInputValue] = useState('');
  const [grantFlag, setGrantFlag] = useState(false); // 是否勾选企业授权码
  const [grantValue, setGrantValue] = useState(''); // 授权码值

  useEffect(() => {
    return () => {
      bs = null;
    };
  }, []);

  useEffect(() => {
    if (isShowNew && show) {
      requestNewdata();
      setTimeout(() => {
        bs = new BetterScroll(ref.current, {
          probeType: 3,
          scrollY: true,
          scrollX: false,
          click: true,
          bounce: false,
        });
      }, 150);
    } else {
      ref.current = null;
      bs = null;
    }
  }, [show]);

  let currentTitle = '';
  let newTitle = '';
  let leftHint = '';
  let changeBtnName = '';
  switch (type) {
    case SelectAlertType.phone:
      // 手机号
      currentTitle = '号码';
      newTitle = '选择新号码';
      leftHint = '';
      changeBtnName = '选新号码';
      break;
    case SelectAlertType.broadband:
      // 宽带
      currentTitle = '宽带';
      newTitle = '选新号码';
      leftHint = '选号码';
      changeBtnName = '选新号码';
      break;
    // eslint-disable-next-line no-duplicate-case
    case SelectAlertType.broadband:
      // 宽带
      currentTitle = '宽带';
      leftHint = '宽带账号';
      changeBtnName = '新装宽带';
      newTitle = '选新装宽带';
      break;
    case SelectAlertType.tv:
      // 宽带
      currentTitle = '宽带电视';
      leftHint = '宽带电视';
      changeBtnName = '新装电视';
      newTitle = '选新宽带电视';
      break;
    default:
      break;
  }
  const requestNewdata = (numMatch = '', authCode = '') => {
    switch (type) {
      case SelectAlertType.phone:
        let types = 'goodsDetail/queryPhoneNumInfo';
        if (from === 'bilibi') {
          types = 'goodsDetail/queryPhoneNumInfoForBilibili';
        }
        // 手机号
        dispatch!({
          type: types,
          payload: {
            lanId,
            provinceId,
            numMatch,
            phone: linePhone ? linePhone : undefined,
            authCode: grantFlag ? authCode : undefined,
            sourceType: source,
          },
        }).then((result: any) => {
          const data = result.map((item: any) => {
            const { depositAmount = '0', minConsume = '0', phoneNumId, phoneNum } = item;
            return {
              ...item,
              value: phoneNum,
              id: phoneNumId,
              attr: '预存' + depositAmount + '，最低消费' + minConsume,
            };
          });
          let spData = data ? JSON.parse(JSON.stringify(data)) : [];
          if (data.length > 10) {
            spData = spData.slice(0, 10);
          }
          updateNewData(spData);
        });
        break;
      case SelectAlertType.broadband:
        // 宽带

        break;
      case SelectAlertType.tv:
        // itv
        break;
      default:
        break;
    }
  };
  const changeData = (item: any, selectIndex: number) => {
    selectItem = item;
    dataList.forEach((element: any) => {
      if (element.id === item.id) {
        element.select = true;
      } else {
        element.select = false;
      }
    });
    newData.forEach((element: any) => {
      element.select = false;
    });
    updateDateList(JSON.parse(JSON.stringify(dataList))); // 浅拷贝不会改变，不会重新渲染
    updateNewData(JSON.parse(JSON.stringify(newData)));
  };

  const changeNews = (item: any) => {
    console.log('changeNews');
    selectItem = item;
    newData.forEach((element: any) => {
      if (element.id === item.id) {
        element.select = true;
      } else {
        element.select = false;
      }
    });
    dataList.forEach((element: any) => {
      element.select = false;
    });
    updateNewData(JSON.parse(JSON.stringify(newData)));
    updateDateList(JSON.parse(JSON.stringify(dataList))); // 浅拷贝不会改变，不会重新渲染
    if (onComfirm) {
      onComfirm(item, false);
    }
  };

  // 展示选择新数据的页面
  const showNewView = () => {
    updateShowNew(true);
    changeNewData();
  };

  // 换一批
  const changeNewData = async () => {
    requestNewdata(inputValue || '', grantValue);
  };
  const searchClick = () => {
    requestNewdata(inputValue || '', grantValue);
  };
  const myOnChange = (event: any) => {
    let tempValue = event.currentTarget.value;
    if (tempValue.length > 11) {
      tempValue = tempValue.substr(0, 11);
    }
    updateInputValue(tempValue);
  };

  const selectPhone = () => {
    if (type === SelectAlertType.phone && from !== 'bilibi') {
      dispatch!({
        type: 'goodsDetail/phoneNumOccup',
        payload: {
          channelNbr: '',
          staffCode: '',
          phoneNum: selectItem.value,
        },
      }).then(() => {
        onComfirm && onComfirm(selectItem, isShowNew);
      });
    } else {
      dispatch!({
        type: 'commitOrder/phoneNumOccupForBilibili',
        payload: {
          phoneNum: selectItem.value,
          provinceId,
          lanId,
        },
      }).then((res) => {
        onComfirm && onComfirm(selectItem, isShowNew);
      });
    }
  };

  return (
    <div className={styles.actionModel}>
      {show && (
        <div
          className={styles.actionBg}
          onClick={(e) => {
            e.stopPropagation();
            closeClick(e);
          }}
        ></div>
      )}
      <div
        className={classnames({
          [styles.actAlert]: true,
          [styles.show]: show,
        })}
      >
        <div className={styles.alertHead}>
          <div className={styles.leftBack}>
            {showNew && !isShowNew ? (
              <img
                src={backIcon}
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  updateShowNew(false);
                }}
              />
            ) : (
              <div />
            )}
          </div>
          <div className={styles.alertTitle}>{showNew ? newTitle : currentTitle}</div>
          <div
            className={styles.rightClose}
            onClick={(e) => {
              e.stopPropagation();
              closeClick(e);
            }}
          >
            <img src={closeIcon} alt="" />
          </div>
        </div>
        {source === 'business' && (
          <div className={styles.grantDiv}>
            <img
              src={grantFlag ? SelectIcon : UnSelectIcon}
              alt=""
              className={styles.selectImg}
              onClick={() => setGrantFlag(!grantFlag)}
            />
            <div className={styles.grantTitle}>企业授权码</div>
            <input
              className={styles.inputDiv}
              placeholder="请输入"
              value={grantValue}
              disabled={!grantFlag}
              onChange={(e) => {
                if (e.target.value.length <= 8) {
                  setGrantValue(e.target.value);
                }
                if (e.target.value.length === 8) {
                  requestNewdata(inputValue || '', e.target.value);
                }
              }}
            />
          </div>
        )}
        <div className={styles.titleView}>
          <div style={{ flex: '1' }}>
            <input
              placeholder="请输入你的幸运数字"
              className={styles.myInput}
              type="number"
              maxLength={11}
              value={inputValue}
              onChange={myOnChange}
            />
          </div>
          <div onClick={searchClick} className={styles.searchBtn}>
            搜索
          </div>
        </div>
        <div
          className={styles.list}
          //  ref={ref} style={{ height: 300 }}
        >
          <Grid
            data={showNew ? newData : dataList}
            hasLine={false}
            columnNum={2}
            // itemStyle={{ height: '100px' }}
            activeStyle={false}
            renderItem={(item) =>
              showNew && type === SelectAlertType.phone ? (
                <div
                  className={
                    item?.select ? styles.itemPhoneSelectStyle : styles.itemPhoneUnselectStyle
                  }
                >
                  <div>{item?.value}</div>
                  {from !== 'bilibi' && <div className={styles.attr}>{item?.attr}</div>}
                  {item?.luckyFlag === 'T' && <div className={styles.hotFlag}>HOT</div>}
                </div>
              ) : (
                <div className={item?.select ? styles.itemSelectStyle : styles.itemUnselectStyle}>
                  <span>{item?.value}</span>
                </div>
              )
            }
            itemStyle={{ height: showNew && type === SelectAlertType.phone ? 200 : 140 }}
            onClick={showNew ? changeNews : changeData}
          />
        </div>

        <div onClick={changeNewData} className={styles.refreshData}>
          换一批
        </div>
        {
          //   <div
          //   className={styles.alertFooter}
          //   onClick={selectPhone}
          // >
          //   <div className={styles.footerBtn}>确定</div>
          // </div>
        }
      </div>
    </div>
  );
};

export default Page;
