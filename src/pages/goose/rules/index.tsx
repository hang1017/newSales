import React, { FC, useRef, useEffect } from 'react';
import { GooseModelState, ConnectProps, connect } from 'alita';
import styles from './index.less';

import BetterScroll from 'better-scroll';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

interface PageProps extends ConnectProps {
  goose: GooseModelState;
}

let bs: BScrollConstructor<{}> | null = null;

const Rules: FC<PageProps> = () => {
  const ref = useRef(null);
  if (document.readyState === 'complete' && !bs) {
    setTimeout(() => {
      bs = new BetterScroll(ref.current, {
        probeType: 3,
        scrollY: true,
        scrollX: false,
        click: true,
        bounce: false,
      });
    }, 100);
  }
  useEffect(() => {
    return () => {
      bs = null;
    };
  }, []);
  return (
    <div
      className={styles.gooseRuleStyle}
      style={{ height: document.documentElement.clientHeight - 90 }}
      ref={ref}
    >
      <div className={styles.gooseRuleContent}>
        <div className={styles.divs}>
          在直播间成功下单喜鹅派的用户可在指定页面参与抽奖，抽奖共3轮，用户在每轮有一次抽奖机会，
          <span>100%中奖</span>。
        </div>
        <div className={styles.divs}>
          抽奖在整点开始，<span>20:00</span>、<span>21:00</span>、<span>22:00</span>
          ，每次抽奖时长5分钟。用户抽奖前需输入下单登录手机号码进行验证。
        </div>
        <div className={styles.divs}>
          奖品设置：<span>iPhone12手机（每轮抽奖抽出一台）</span>、
          2元话费、5元话费、10元话费、腾讯视频会员（月卡）、5GB流量、2GB流量
          ，用户抽奖后可在“我的奖品”中查看获奖信息。
        </div>
        <div className={styles.divs}>
          如果同一下单手机号下单喜鹅卡超过一张，抽奖获得的腾讯视频会员（月卡）、通用流量以兑换券形式发送至用户下单的第一张喜鹅卡号码内。
        </div>
        <div className={styles.divs}>
          抽奖获赠的2元话费、5元话费、10元话费，腾讯视频会员（月卡）、5GB流量、2GB流量，在激活卡品后可在青年一派页面（
          <span>https://pai.189.cn:10000</span>）— 个人中心 — 权益兑换。
        </div>
        <div className={styles.divs}>
          iPhone12手机将在获奖用户激活卡品后外呼通知确认地址后寄出。
        </div>
      </div>
    </div>
  );
};

export default connect(({ goose }: { goose: GooseModelState }) => ({ goose }))(Rules);
