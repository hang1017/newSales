import React, { FC, useState } from 'react';
import { EquityExchangeModelState, ConnectProps, connect, router } from 'alita';
import { Modal, Toast } from 'antd-mobile';
import unSelectIcon from '@/assets/img/un_select.png';
import selectIcon from '@/assets/img/customer/c_select.png';
import SingleBtn from '@/components/SingleBtn';
import styles from './index.less';

interface PageProps extends ConnectProps {
  equityExchange: EquityExchangeModelState;
}

const EquityExchangePage: FC<PageProps> = ({ equityExchange, dispatch }) => {
  const [currentSelects, updateSelectSelects] = useState([]);
  const { rightsInfo = {}, exchangeInfo = {} } = equityExchange;
  let {
    couponId = '--',
    rightsTypeName = '--',
    expDate = '--',
    promTypeId = '',
    mcInstId = '',
    rightsTypeCode = '',
  } = rightsInfo;
  let { gnum = '--', relaList = [] } = exchangeInfo;

  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = equityExchange;
  const onItemClick = (id: string) => {
    let selects = JSON.parse(JSON.stringify(currentSelects));
    let ishave = false;
    for (const key in currentSelects) {
      const selectId = currentSelects[0];
      if (selectId === id) {
        selects.splice(key, 1);
        ishave = true;
      }
    }
    if (!ishave) {
      if (selects.length >= parseInt(gnum)) {
        selects[0] = id;
      } else {
        selects.push(id);
      }
    }
    updateSelectSelects(selects);
  };
  const onClick = () => {
    const goodLists: { quantity: number; skuId: never }[] = [];
    // eslint-disable-next-line array-callback-return
    currentSelects.map((item) => {
      goodLists.push({
        quantity: 1,
        skuId: item,
      });
    });
    const message = '是否兑换?';
    Modal.alert('提示', message, [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          dispatch!({
            type: 'equityExchange/checkSkuNeedOrdAddrModel',
            payload: {
              skuIds: currentSelects,
              // skuIds: [12035002],
            },
          }).then((data: boolean) => {
            const params = {
              couponId: mcInstId,
              mcInstId,
              goodsList: goodLists,
              promTypeId,
              rightsTypeCode,
              couponType: 1200,
              couponQuantity: 1,
              orderType: '1600',
            };
            if (data) {
              router.push({
                pathname: '/customer/cDeliveryAddr',
                query: {
                  isMyPage: '3',
                  params: JSON.stringify(params),
                },
              });
            } else {
              dispatch!({
                type: 'equityExchange/exchangeCertificateOrderCommit',
                payload: params,
              }).then((res: any) => {
                if (res) {
                  router.push({
                    pathname: '/customer/generalSuccess',
                  });
                }
              });
            }
          });
        },
      },
    ]);
  };
  const isShowSelect = (skuId: any) => {
    for (const key in currentSelects) {
      const selectID = currentSelects[key];
      if (parseInt(selectID) === parseInt(skuId)) {
        return true;
      }
    }
    return false;
  };
  const canNext = () => {
    if (currentSelects.length > 0) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className={styles.exchangePage}>
        <div className={styles.pageContent}>
          <div className={styles.pageContentTitle}>
            <div className={styles.equityTitleText}>业务号码：{rightsInfo?.accNbr || ''}</div>
            <div className={styles.pageSubTitle}>可选择{gnum}个进行兑换</div>
          </div>
          {relaList.map((item: any) => {
            const { skuId, goodsName, skuName, infoLocation, subTitle = '--' } = item;
            return (
              <div
                className={styles.exchangeCell}
                onClick={() => {
                  onItemClick(skuId);
                }}
              >
                <div className={styles.leftContent}>
                  <img src={infoLocation} alt="" />
                  <div className={styles.equityContent}>
                    <div className={styles.equityTitle}>{goodsName}</div>
                    <div className={styles.subTitle}>{skuName}</div>
                  </div>
                </div>
                <div>
                  <img src={isShowSelect(skuId) ? selectIcon : unSelectIcon} alt="" />
                </div>
              </div>
            );
          })}
          <div className={`${styles.subTitle} ${styles.equityDes}`}>
            <div>有效期至: {expDate} </div>
            <div>请在有效期内兑换，过期作废。</div>
          </div>
        </div>
      </div>
      <SingleBtn text="立即兑换" canClick={canNext()} onClick={onClick} newUIFlag={true} />
    </>
  );
};

export default connect(({ equityExchange }: { equityExchange: EquityExchangeModelState }) => ({
  equityExchange,
}))(EquityExchangePage);
