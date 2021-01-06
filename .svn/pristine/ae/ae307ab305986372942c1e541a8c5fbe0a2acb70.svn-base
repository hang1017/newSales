import React, { FC, useEffect, useState } from 'react';
import { RechargeModelState, ConnectProps, connect, history, router } from 'alita';
import { InputItem, Button } from 'antd-mobile';
import classnames from 'classnames';
import { ClaimPng, WhiteBackPng, RedCheckPng } from '@/assets';
import styles from './index.less';

interface PageProps extends ConnectProps {
  recharge: RechargeModelState;
}

interface gridProps {
  skuId: string | number;
  faceValue: string | number;
  salesPrice: string | number;
}

const gridData = [
  { skuId: 1, faceValue: '10元', salesPrice: 9.98 },
  { skuId: 2, faceValue: '20元', salesPrice: 19.96 },
  { skuId: 3, faceValue: '30元', salesPrice: 29.94 },
  { skuId: 4, faceValue: '50元', salesPrice: 49.9 },
  { skuId: 5, faceValue: '100元', salesPrice: 99.8 },
  { skuId: 6, faceValue: '200元', salesPrice: 199.6 },
  { skuId: 7, faceValue: '300元', salesPrice: 299.4 },
  { skuId: 8, faceValue: '400元', salesPrice: 399.2 },
  { skuId: 9, faceValue: '500元', salesPrice: 499.0 },
];

const hList: any[] | (() => any[]) = [
  // { phone: '123 4567 8901', name: '张三疯', operators: '广州电信' },
  // { phone: '133 4567 8902', name: '张三疯', operators: '广州电信' },
  // { phone: '143 4567 8903', name: '张三疯', operators: '广州电信' },
];

const RechargePage: FC<PageProps> = ({ recharge, dispatch }) => {
  const { lanId = '' } = recharge;
  const [inputValue, setInputValue] = useState<string>(''); // 输入框的值
  const [inputEditFlag, setInputEditFlag] = useState(false); // 手机号码是否可编辑标识
  const [gridActive, setGridActive] = useState<any>({}); // 九宫格选中id
  const [drawTop, setDrawTop] = useState(0); // 抽屉高度
  const [historyList, setHistoryList] = useState(hList); // 输入号码时的历史记录
  const [gridList, setGridList] = useState<gridProps[]>([]); // 九宫格列表
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true); // 如果九宫格列表为空，按钮不可点击
  const [totalAmount, setTotalAmount] = useState<number>(0); // 实际金额

  useEffect(() => {
    document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';

    // 初始化默认写死的表格
    setGridList(gridData);

    // 请求会员的手机号码
    dispatch!({
      type: 'recharge/queryPhoneNumByMemberIdModels',
    }).then((data: any[]) => {
      if (data && data.length) {
        const phone = data[0];
        const newStr = `${phone.substr(0, 3)} ${phone.substr(3, 4)} ${phone.substr(7)}`;
        setInputValue(newStr);
        qryGridList(phone);
      }
    });
  }, []);

  /**
   * 通过手机号码查询九宫格
   * @param accNum
   */
  const qryGridList = (accNum: string) => {
    dispatch!({
      type: 'recharge/qrySkuListModels',
      payload: {
        accNum,
        categoryCode: 'Recharge',
        pageNum: 1,
        pageSize: 9,
      },
    }).then(({ records = [], lanId = '' }) => {
      if (records && records.length) {
        setGridList(records);
        qryRealAmount(records[0], accNum, lanId);
        setBtnDisabled(false);
      } else {
        setGridList(gridData);
        setBtnDisabled(true);
        setGridActive({});
      }
    });
  };

  /**
   * 查询选中的项的真实价格
   * @param item
   */
  const qryRealAmount = (item: any, attrValue: string, lanIds: string) => {
    dispatch!({
      type: 'recharge/commitCartQuickModels',
      payload: {
        goodsList: [
          {
            attrList: [
              {
                attrCode: 'HM',
                attrValue: attrValue.split(' ').join(''),
                extMap: { lanId: lanIds },
              },
            ],
            quantity: 1,
            skuId: item?.skuId,
          },
        ],
        needCoupons: 1,
        orderBusiTypeKind: '1300',
        sourceType: '1300',
      },
    }).then((res: any) => {
      if (Object.keys(res).length) {
        setTotalAmount(res?.totalAmount);
        setGridActive(item);
        setBtnDisabled(false);
      }
    });
  };

  /**
   * 输入框改变事件
   */
  const inputChange = (e: string) => {
    const newList = hList.filter((it) => it.phone.indexOf(e) !== -1);
    setInputValue(e);
    setHistoryList(newList);
    if (e && e.length === 13) {
      qryGridList(e.split(' ').join(''));
    } else {
      setBtnDisabled(true);
      setGridList(gridData);
      setGridActive({});
    }
  };

  /**
   * 九宫格点击事件
   */
  const gridItemClick = (item: any) => {
    if (btnDisabled) return;
    qryRealAmount(item, inputValue, lanId);
  };

  /**
   * 下拉框开关事件
   */
  const claimImgClick = () => {
    setInputEditFlag(!inputEditFlag);
    const drawTop = document.getElementById('inputId')?.getBoundingClientRect()?.y || 0;
    setDrawTop(drawTop);
  };

  /**
   * 清空历史记录点击事件
   */
  const historyClearClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHistoryList([]);
  };

  /**
   * 历史列表点击事件
   */
  const historyItemClick = (item: any) => {
    setInputValue(item.phone);
  };

  /**
   * 立即充值
   */
  const rechargeClick = () => {
    dispatch!({
      type: 'recharge/cartOrdercommitOrderModels',
    }).then(() => {});
  };

  return (
    <div className={styles.rechargeStyle}>
      {/* 头部 */}
      <div className={styles.recTop}>
        <div className={styles.recTitle}>
          <div className={styles.recTitleLeft}>
            <img
              src={WhiteBackPng}
              alt=""
              className={styles.recTitlebackimg}
              onClick={() => history.goBack()}
            />
          </div>
          <div className={styles.recTitleText}>优惠充值</div>
          <div className={styles.recTitleRight}></div>
        </div>
        <div className={styles.inputContent}>
          <div className={styles.inputDiv} id="inputId">
            <InputItem
              type="phone"
              editable={false}
              value={inputValue}
              onChange={inputChange}
              placeholder="请输入手机号码"
              extra={
                <img
                  src={ClaimPng}
                  alt=""
                  className={styles.claimImg}
                  onClick={() => claimImgClick()}
                />
              }
              style={{
                color: '#fff',
                fontSize: '0.56rem',
              }}
            />
          </div>
        </div>
        <div className={styles.operators}></div>
      </div>
      {/* 九宫格 */}
      <div className={styles.gridStyle}>
        <div className={styles.gridContent}>
          <div className={styles.gridAll}>
            {gridList.map((item: any) => (
              <div
                key={item.skuId}
                className={classnames({
                  [styles.gridItem]: true,
                  [styles.gridItemActive]: gridActive?.skuId === item.skuId,
                })}
                onClick={() => gridItemClick(item)}
              >
                <div className={styles.gridItemTitle}>{item.faceValue}</div>
                <div className={styles.gridItemSubTitle}>售价:{item.salesPrice.toFixed(2)}</div>
                {gridActive?.skuId === item.skuId && (
                  <img src={RedCheckPng} alt="" className={styles.redCheck} />
                )}
              </div>
            ))}
          </div>
          <div className={styles.gridBottom}>
            <div className={styles.gridMoney}>
              支付金额：<span>{totalAmount || '0'}</span>元
            </div>
            <div className={styles.gridMoney}>
              到账金额：
              <span>
                {gridActive?.faceValue
                  ? gridActive?.faceValue.substr(0, gridActive?.faceValue.length - 1)
                  : '0'}
              </span>
              元
            </div>
          </div>
        </div>
      </div>
      {/* 文字说明 */}
      {/* <div className={styles.rechargeInstructions}>
        <div>1.充值服务客服电话XXXXX </div>
        <div>2.充值金额可能分多次到账，但是总金额不变。</div>
        <div>3.充值发票说明介绍… </div>
        <div> 4.充值余额仅限用于按单价计费账单抵扣，不可用于订购商品。</div>
        <div>5.本服务仅限于本平台号码充值。</div>
      </div> */}
      <div className={styles.recordQuery} onClick={() => router.push('/order/myOrder')}>
        充值记录查询
      </div>
      {/* 底部按钮 */}
      <div className={styles.footBtn}>
        <Button
          className={styles.btn}
          onClick={rechargeClick}
          disabled={Object.keys(gridActive).length === 0}
        >
          立即充值
        </Button>
      </div>

      <div
        id="searchDrawerId"
        className={styles.reChargeSearchBarDrawer}
        style={inputEditFlag ? { top: drawTop, position: 'fixed' } : { display: 'none' }}
      >
        <div className={styles.drawTop}>
          <InputItem
            type="phone"
            editable={inputEditFlag}
            value={inputValue}
            onChange={inputChange}
            style={{
              color: '#fff',
              fontSize: '0.56rem',
            }}
            clear
            placeholder="请输入手机号码"
          />
        </div>
        <div className={styles.drawShadow} onClick={() => setInputEditFlag(false)}>
          {historyList && historyList.length > 0 && (
            <div className={styles.drawListContent}>
              <div className={styles.drawList}>
                {historyList.map((item) => (
                  <div
                    className={styles.hisItem}
                    key={item.phone}
                    onClick={() => historyItemClick(item)}
                  >
                    <div className={styles.hisItemPhone}>{item.phone}</div>
                    <span className={styles.hisItemName}>{item.name}</span>
                    <span className={styles.hisItemName}>（{item.operators}）</span>
                  </div>
                ))}
                <div className={styles.clearhistory} onClick={historyClearClick}>
                  清除历史充值号码
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(({ recharge }: { recharge: RechargeModelState }) => ({ recharge }))(
  RechargePage,
);
