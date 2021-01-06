import React, { useState, useEffect, useRef } from 'react';
import { Grid, Modal, Toast } from 'antd-mobile';
import moment from 'moment';
import closeIcon from '@/assets/img/close.png';
import backIcon from '@/assets/img/back.png';
import SelectIcon from '@/assets/img/select_blue.png';
import UnSelectIcon from '@/assets/img/un_select.png';

import BetterScroll from 'better-scroll';
// eslint-disable-next-line import/no-unresolved
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

import styles from './index.less';

interface SelectAlert {
  closeClick: (e: any) => void; // 关闭弹框
  show?: boolean; // 是否显示弹框
  onComfirm?: (item: any) => void; // 确定选中
  dispatch: any;
  lanId: string | number;
  provinceId: string | number;
  linePhone?: string;
  idCard?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let bs: BScrollConstructor<{}> | null = null;

const Page: React.FC<SelectAlert> = (props) => {
  const {
    show = false,
    closeClick = () => {},
    onComfirm,
    dispatch,
    lanId,
    provinceId,
    linePhone = '',
    idCard = '',
  } = props;

  const ref = useRef(null);

  const [newData, updateNewData] = useState([]); // 选择的新数据
  const [activeData, setActiveData] = useState<any>({}); // 当前选中的号码
  const [inputValue, updateInputValue] = useState('');
  const [grantFlag, setGrantFlag] = useState(false); // 是否勾选企业授权码
  const [grantValue, setGrantValue] = useState(''); // 授权码值
  const [numType, setNumType] = useState<'birthDay' | 'luck'>('birthDay'); // 号码类型

  const source = localStorage.getItem('source');

  useEffect(
    () => () => {
      bs = null;
    },
    [],
  );

  const requestNewdata = (numMatch = '', authCode = '', showToast = false, birFlag?: string) => {
    dispatch!({
      type: 'goodsDetail/queryPhoneNumInfoForBilibili',
      payload: {
        lanId,
        provinceId,
        numMatch,
        phone: linePhone || undefined,
        authCode: grantFlag ? authCode : undefined,
        sourceType: source,
        isLuckyNum: birFlag !== 'init' && (numType === 'luck' || numMatch?.length === 0) ? 3 : 2,
      },
    }).then((result: any) => {
      const data = result.map((item: any) => {
        const { depositAmount = '0', minConsume = '0', phoneNumId, phoneNum } = item;
        return {
          ...item,
          value: phoneNum,
          id: phoneNumId,
          attr: `预存${depositAmount}，最低消费${minConsume}`,
        };
      });
      let spData = data ? JSON.parse(JSON.stringify(data)) : [];
      if (data.length > 10) {
        spData = spData.slice(0, 10);
      }
      if (data && data.length) {
        updateNewData(spData);
        setActiveData({});
      }
      if (
        numMatch &&
        numMatch?.length === 4 &&
        numType === 'birthDay' &&
        !moment(numMatch, ['MMDD']).isValid()
      ) {
        Toast.show('您输入的数字未检索到靓号，请选择幸运号', 1);
      }
      if (showToast) {
        Toast.show('请输入至少三位幸运数字', 1);
      }
    });
  };

  useEffect(() => {
    if (show) {
      let card = '';
      if (idCard.length >= 14) {
        card = idCard.slice(10, 14);
      }
      requestNewdata(card, grantValue, false, 'init');
      setNumType('birthDay');
      updateInputValue(card);
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

  // 换一批
  const changeNewData = async () => {
    requestNewdata(inputValue || '', grantValue);
  };
  const searchClick = () => {
    requestNewdata(inputValue || '', grantValue);
  };
  const myOnChange = (event: any) => {
    let tempValue = event.currentTarget.value;
    if (tempValue.length > 4) {
      tempValue = tempValue.substr(0, 4);
    }
    updateInputValue(tempValue);
  };

  const selectPhone = () => {
    if (onComfirm) onComfirm(activeData);
  };

  return (
    <Modal
      popup
      visible={show}
      animationType="slide-up"
      className={styles.actionModalstyle}
      onClose={closeClick}
    >
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
              <img
                src={backIcon}
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
            <div className={styles.alertTitle}>选择新号码</div>
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
          <div className={styles.numTypeStyle}>
            <img
              src={numType === 'birthDay' ? SelectIcon : UnSelectIcon}
              className={styles.seleImg}
              onClick={() => {
                Toast.show('请输入你的四位幸运数字', 1);
                setNumType('birthDay');
                updateInputValue('');
              }}
            />
            <div
              className={styles.numTypeText}
              onClick={() => {
                Toast.show('请输入你的四位幸运数字', 1);
                setNumType('birthDay');
                updateInputValue('');
              }}
            >
              生日靓号
            </div>
            <img
              src={numType === 'luck' ? SelectIcon : UnSelectIcon}
              className={styles.seleImg}
              onClick={() => {
                setNumType('luck');
                updateInputValue('');
                requestNewdata('', grantValue, true);
              }}
            />
            <div
              className={styles.numTypeText}
              onClick={() => {
                setNumType('luck');
                updateInputValue('');
                requestNewdata('', grantValue, true);
              }}
            >
              幸运靓号
            </div>
          </div>
          <div className={styles.titleView}>
            <div>
              <input
                placeholder="请输入你的幸运数字"
                className={styles.myInput}
                type="number"
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
              data={newData}
              hasLine={false}
              columnNum={2}
              activeStyle={false}
              renderItem={(item) => (
                <div
                  className={
                    item?.phoneNum === activeData?.phoneNum
                      ? styles.itemPhoneSelectStyle
                      : styles.itemPhoneUnselectStyle
                  }
                  onClick={() => setActiveData(item)}
                >
                  <div>{item?.value}</div>
                  {item?.luckyFlag === 'T' && <div className={styles.hotFlag}>HOT</div>}
                </div>
              )}
              itemStyle={{ height: 200 }}
            />
          </div>

          <div onClick={changeNewData} className={styles.refreshData}>
            换一批
          </div>
          <div className={styles.alertFooter} onClick={selectPhone}>
            <div className={styles.footerBtn}>确定</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Page;
