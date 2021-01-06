import React, { useState } from 'react';
import { Modal, Progress } from 'antd-mobile';

import checktIcon from '@/assets/img/cumulative/check_orange.png';
import cornerWhiteIcon from '@/assets/img/cumulative/corner_white.png';
import cornerRedIcon from '@/assets/img/cumulative/corner_red.png';
import moneyIcon from '@/assets/img/cumulative/grey_money.png';
import styles from './index.less';

interface ringCumulativeCost {
  accMoney?: any;
  // showGainModal?: boolean;
  // gainCouponCallback?: () => void;
  // cumulativeClick?: (accCInstId: any) => void;
}

const Page: React.FC<ringCumulativeCost> = (props) => {

  const { accMoney = 0 } = props;
  const promStoreContentList = [
    { promThreshold: 100 },
    { promThreshold: 200 },
    { promThreshold: 300 },
    { promThreshold: 400 },
    { promThreshold: 500 },
    { promThreshold: 600 },
    { promThreshold: 700 },
    { promThreshold: 800 },
    { promThreshold: 900 },
    { promThreshold: 1000 },
  ];

  // const accMoney = 800;
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

  // 滚动到最大达标数位置-方法一 scrollIntoView
  // const labelNode = document.getElementById('li-4');
  // if (labelNode) {
  //   labelNode.scrollIntoView({ behavior: 'smooth' });
  // }
  // 滚动到最大达标数位置-方法二 scrollLeft
  const scrollDiv = document.getElementById('scrollDiv');
  if (scrollDiv) {
    scrollDiv.scrollLeft = scrollDiv.scrollWidth * ((compRate - 15) / 100);
  }

  return promStoreContentList && promStoreContentList.length >= 0 ? (
    <div className={styles.cumulativeItem} id="scrollDiv">
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
                <img src={checktIcon} alt="" width="76px" height="76px" />
              </div>
              {/* <div className={styles.moneyText}>0元</div> */}
            </li>
          {
            promStoreContentList.length > 0 && promStoreContentList.map((item: any, index: any) => {
              // 若当前累积的金额已达到该节点的领取条件
              if (accMoney >= item.promThreshold) {
                return (
                  <li>
                    <div className={styles.alreadyLayout} style={{ visibility: lastLevel === (index + 1) ? 'visible' : 'hidden' }}>
                      <div className={styles.already}>
                        已达标
                      </div>
                      <img src={cornerRedIcon} alt="" width="28px" height="12px" />
                    </div>
                    <img src={checktIcon} alt="" height="76px" width="76px" />
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
                    <img src={moneyIcon} alt="" height="76px" width="76px" />
                      {/* <div className={styles.smallCircleNode}>
                        <div className={styles.greyCircle} />
                      </div> */}
                      <div className={styles.moneyText}>{item.promThreshold}元</div>
                  </li>
                );
              }
            }
          )}
        </ul>
        {/* <div className={styles.timeTip}>加油哦，{leftDayNum}天内再消费就可以领取下一档奖</div> */}
      </div>
      {/* <div className={styles.bottom}>
        <div className={styles.left}>本轮消费截止日期: {endDate}</div>
        <div className={styles.right}>
          <div className={styles.bg} onClick={toRules}>活动规则</div>
        </div>
      </div> */}
      {/* <Modal
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
        </Modal> */}
    </div>
  ) : null;
};

export default Page;
