import React, { useState, useEffect } from 'react';
import { Grid, Flex } from 'antd-mobile';

import closeIcon from '@/assets/img/close.png';
import backIcon from '@/assets/img/back.png';
import styles from './index.less';
import { SelectAlertType } from '@/utils/AppContext';
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
  isShowNew: boolean; //是否选择新号码
  dispatch: any;
  from?: 'bilibi'; // bilibi
  lanId: string | number;
  provinceId: string | number;
  linePhone: string;
}
let selectItem: any = [];

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
  } = props;

  const [dataList, updateDateList] = useState(currentData); //已存在实例数据
  const [newData, updateNewData] = useState([]); // 选择的新数据
  const [showNew, updateShowNew] = useState(isShowNew);
  useEffect(() => {
    if (isShowNew && show) {
      requestNewdata();
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
      newTitle = '选新号码';
      leftHint = '选号码';
      changeBtnName = '选新号码';
      break;
    case SelectAlertType.broadband:
      // 宽带
      currentTitle = '宽带';
      newTitle = '选新号码';
      leftHint = '选号码';
      changeBtnName = '选新号码';
      break;
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
  const requestNewdata = () => {
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
          },
        }).then((result) => {
          const data = result.map((item) => {
            const { depositAmount = '0', minConsume = '0', phoneNumId, phoneNum } = item;
            return {
              ...item,
              value: phoneNum,
              id: phoneNumId,
              attr: '预存' + depositAmount + '，最低消费' + minConsume,
            };
          });
          updateNewData(data);
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
  };

  // 展示选择新数据的页面
  const showNewView = () => {
    updateShowNew(true);
    changeNewData();
  };

  // 换一批
  const changeNewData = async () => {
    requestNewdata();
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
      <div className={`${styles.actAlert} ${show && styles.show}`}>
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
        <div className={styles.titleView}>
          <div className={styles.leftText}>{leftHint}</div>
          <div className={styles.rightText} onClick={showNew ? changeNewData : showNewView}>
            {showNew ? '换一批' : changeBtnName}
          </div>
        </div>
        <div className={styles.list}>
          {/* <Flex wrap="wrap">
            {(showNew ? newData : dataList).map((item) => {
              return (
                <div className={styles.flexWrapper}>
                  {showNew && type === SelectAlertType.phone ? (
                    <div
                      className={
                        item.select ? styles.itemPhoneSelectStyle : styles.itemPhoneUnselectStyle
                      }
                    >
                      <div>{item.value}</div>
                      {from !== 'bilibi' && <div className={styles.attr}>{item.attr}</div>}
                    </div>
                  ) : (
                    <div
                      className={item.select ? styles.itemSelectStyle : styles.itemUnselectStyle}
                    >
                      <span>{item.value}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </Flex> */}

          <Grid
            data={showNew ? newData : dataList}
            hasLine={false}
            columnNum={2}
            itemStyle={{ height: '100px' }}
            activeStyle={false}
            renderItem={(item) =>
              showNew && type === SelectAlertType.phone ? (
                <div
                  className={
                    item.select ? styles.itemPhoneSelectStyle : styles.itemPhoneUnselectStyle
                  }
                >
                  <div>{item.value}</div>
                  {from !== 'bilibi' && <div className={styles.attr}>{item.attr}</div>}
                </div>
              ) : (
                <div className={item.select ? styles.itemSelectStyle : styles.itemUnselectStyle}>
                  <span>{item.value}</span>
                </div>
              )
            }
            itemStyle={{ height: showNew && type === SelectAlertType.phone ? 200 : 140 }}
            onClick={showNew ? changeNews : changeData}
          />
        </div>
        <div
          className={styles.alertFooter}
          onClick={() => {
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
          }}
        >
          <div className={styles.footerBtn}>确定</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
