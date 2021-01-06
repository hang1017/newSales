import React, { FC, useEffect } from 'react';
import { ConsumerRightsModelState, ConnectProps, connect } from 'alita';
import consumerRightsImg from '@/assets/consumerRigtsImge.png';

import styles from './index.less';

interface PageProps extends ConnectProps {
  consumerRights: ConsumerRightsModelState;
}

const ConsumerRightsPage: FC<PageProps> = ({ consumerRights, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'consumerRights/query',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = consumerRights;
  return (
    <div className={styles.consumerRights}>
      <div className={styles.head}>
        <img src={consumerRightsImg} />
        <div className={styles.title}>
          <span className={styles.diamond}></span>
          <div>活动规则</div>
          <span className={styles.diamond}></span>
        </div>
      </div>
      <div className={styles.contain}>
        <div className={styles.detail}>
          <p>1、活动有效期为: <b>即日起至2020年12月13日</b></p>
          <p>
            2、活动对象：1995年1月1日（含）以后出生的用户（以用户登记的身份证信息为准）</p>
          <p>3、用户自第一次消费之日起，<b>每31天为一个周期</b>，每个周期内累积消费基础通信产品满额可获得权益赠送：</p>
        </div>
        <table>
          <tr>
            <td>当个周期消费金额达到</td>
            <td>赠送权益</td>
          </tr>
          <tr>
            <td>20元</td>
            <td>赠送一张权益兑换券和一张定向流量兑换券</td>
          </tr>
          <tr>
            <td>60元</td>
            <td>再赠送一张权益兑换券和一张定向流量兑换券</td>
          </tr>
          <tr>
            <td>100元</td>
            <td>再赠送一张权益兑换券和一张定向流量兑换券</td>
          </tr>
        </table>
        <div className={styles.detail}>
          <p>4、用户需要主动在兑换页面领取权益券和10GB定向流量券，<b>当前周期内未领取则视作用户主动放弃领取。</b></p>
          <p>
            5、权益兑换券（可用于兑换页面中各项生态权益中的一项）和定向流量兑换券（可用于兑换页面中各项定向流量包中的一项）有效期为达到领取条件之日起90天，在有效期内选择兑换权益产品和定向流量包。
            <b>超出有效期内视作用户主动放弃领取</b>。</p>
          <p>
            6、本活动参与累计的消费金额包含：基础流量商品（含通用流量、定向流量）增值业务（音频彩铃、视频彩铃、铃音）网络权益（5G升速权益）、UIM卡、电信自有权益（天翼超高清、天翼云VR、天翼云游戏，共3款）、标准资费（流量、语音、短信）消费金额的合计。不包含派卡商品（含所有派，包括5G派青年一派标准版等）、充值（含新开卡专享9元预存）、第三方生态权益商品（如B站大会员、腾讯视频等）等消费金额。</p>
        </div>
      </div>
    </div>
  )
};

export default connect(({ consumerRights }: { consumerRights: ConsumerRightsModelState; }) => ({ consumerRights }))(ConsumerRightsPage);
