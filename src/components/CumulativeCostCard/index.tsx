import React, { useState } from 'react';
import { Modal, Progress } from 'antd-mobile';

import biasIcon from '@/assets/img/cumulative/bias.png';
import checktIcon from '@/assets/img/cumulative/check.png';
import giftIcon from '@/assets/img/cumulative/gift.png';
import cornerWhiteIcon from '@/assets/img/cumulative/corner_white.png';
import cornerOrangeIcon from '@/assets/img/cumulative/corner_orange.png';
import titleGiftIcon from '@/assets/img/cumulative/title_gift.png';
import { router } from 'alita';
import styles from './index.less';

interface cumulativeCostCard {
  cumulativeInfo?: any;
  showGainModal: boolean;
  gainCouponCallback?: () => void;
  cumulativeClick?: (accCInstId: any) => void;
}

const Page: React.FC<cumulativeCostCard> = (props) => {
  const { cumulativeInfo = {}, gainCouponCallback, cumulativeClick, showGainModal } = props;
  // 获取的礼包金额
  const [gainMoney, setGainMoney] = useState(0);
  const { promStoreContentList = [], endDate = '', leftDayNum = 0, accMoney = 0 } = cumulativeInfo;
  // 消费占总比的比例
  let compRate = 0;
  // 达到的最大层级优惠
  let lastLevel = 0;
  if (promStoreContentList && promStoreContentList.length > 0) {
    const maxRecMoney = promStoreContentList[promStoreContentList.length - 1].promThreshold;
    promStoreContentList.forEach((promItem: any, index: number) => {
      if (accMoney >= promItem.promThreshold) {
        lastLevel = index + 1;
      }
    });
    // 保证满赠在达到某个节点时进度条能正常到达该位置
    if ((accMoney / maxRecMoney) <= (lastLevel / (promStoreContentList.length))) {
      compRate = lastLevel / promStoreContentList.length * 100;
    } else {
      compRate = accMoney / maxRecMoney * 100;
    }
  }

  const gainClick = (accCInstId: any, money: any) => {
    setGainMoney(money)
    cumulativeClick && cumulativeClick(accCInstId);
  }

  const toRules = () => {
    router.push('/customer/consumerRights');
  }

  return promStoreContentList && promStoreContentList.length > 0 ? (
    <div className={styles.cumulativeItem}>
      <div className={styles.content}>
        <ul className={styles.ulLayout}>
          {/* <div className={styles.unfinishedLine} />
          <div className={styles.middleLine} style={{ width: compRate }} /> */}
          <div className={styles.unfinishedLine}>
            <Progress percent={compRate} position="normal" appearTransition />
          </div>
          <li>
              <div style={{ display: 'flex', flexDirection: 'column', visibility: 'hidden' }}>
                <div className={styles.already}>
                  无
                </div>
                <img src={cornerWhiteIcon} alt="" width="12px" height="6px" />
                <div className={styles.circleNode}>
                  <img src={checktIcon} alt="" width="20px" height="20px" />
                </div>
              </div>
              <div className={styles.moneyText}>0元</div>
            </li>
          {
            promStoreContentList.length > 0 && promStoreContentList.map((item: any) => {
              // 若当前累积的金额已达到该节点的领取条件
              if (accMoney >= item.promThreshold) {
                return (
                  <li>
                    <div className={item.receiveFlag ? styles.already : styles.wait} onClick={() => item.receiveFlag ? null : gainClick(item.accCInstId, item.promThreshold)}>
                      {item.receiveFlag ? '已领取' : '待领取'}
                      {!item.receiveFlag && <img src={biasIcon} alt="" style={{ display: 'block', position: 'absolute' }} />}
                    </div>
                    <img src={item.receiveFlag ? cornerWhiteIcon : cornerOrangeIcon} alt="" width="12px" height="6px" />
                    <div className={item.receiveFlag ? styles.circleNode : styles.bigCircleNode}>
                      {
                        item.receiveFlag ? (
                          <img src={checktIcon} alt="" width="20px" height="20px" />
                        ) : (
                          <img src={giftIcon} alt="" height="30.54px" width="30.54px" />
                        )
                      }
                    </div>
                    <div className={styles.moneyText}>{item.promThreshold}元</div>
                  </li>
                );
                // 还未到领取的条件
              } else {
                return (
                  <li>
                    <div style={{ display: 'flex', flexDirection: 'column', visibility: 'hidden' }}>
                      <div className={styles.already}>
                        无
                      </div>
                      <img src={cornerWhiteIcon} alt="" width="12px" height="6px" />
                    </div>
                      <div className={styles.smallCircleNode}>
                        <div className={styles.greyCircle} />
                      </div>
                      <div className={styles.moneyText}>{item.promThreshold}元</div>
                  </li>
                );
              }
            }
          )}
        </ul>
        <div className={styles.timeTip}>加油哦，{leftDayNum}天内再消费就可以领取下一档奖</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>本轮消费截止日期: {endDate}</div>
        <div className={styles.right}>
          <div className={styles.bg} onClick={toRules}>活动规则</div>
        </div>
      </div>
      <Modal
          visible={showGainModal}
          transparent
          maskClosable={false}
          closable={true}
          className={styles.modalLayout}
          onClose={gainCouponCallback}
          title={[<img src={titleGiftIcon} alt="" />]}
          footer={[{ text: '立即查看', onPress: () => { gainCouponCallback; router.push('/personCenter/discountCounpon'); } }]}
        >
          <div className={styles.modalContent}>
            <div className={styles.success}>
              奖励领取成功
            </div>
            <div className={styles.had}>消费满额{gainMoney}元礼盒已领取！</div>
            <div className={styles.tip}>请至“个人中心”-“权益兑换”查看使用</div>
          </div>
        </Modal>
    </div>
  ) : null;
};

export default Page;
