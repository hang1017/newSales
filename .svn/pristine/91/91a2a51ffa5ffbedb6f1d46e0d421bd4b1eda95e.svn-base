import React, { FC, useEffect } from 'react';
import { PlayDesModelState, ConnectProps, connect } from 'alita';
import styles from './index.less';

interface PageProps extends ConnectProps {
  playDes: PlayDesModelState;
}

const PlayDesPage: FC<PageProps> = ({ playDes, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'playDes/query',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = playDes;
  return <div className={styles.playDesPage} style={{ height: document.documentElement.clientHeight - 100 }}>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、	活动有效期为即日起至2021年6月30日。</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、	“圈子”由“掌门”和“粉丝”构成，人数最少为2人最多不超过50人。可以自主命名并设计圈子名称、头像等圈子标识。名称、头像等内容应当符合法律法规的规定，不应违背社会公序良俗，没有侵害第三方权利的内容，否则中国电信上海公司有权取消相应的名称、头像等内容。</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、	“圈子”消费满赠福利：每月圈子内所有成员基础通信产品消费金总额每满100元，每名成员可领取1GB国内通用流量兑换券，每人每月最高可领10张。每月圈子内所有成员基础通信产品消费总额每满200元，圈子掌门可以领取1GB国内通用流量兑换券，每月最高５张，可自己使用或赠送给圈子内成员。</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、	流量兑换券需至“我的圈子”进行领取，主动退出圈子或被掌门踢出圈子，未领取的流量兑换券自动失效，无法再领取。兑换券自达到领取条件后起90天内有效，有效期内未兑换则视作用户主动放弃领取。</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、	所有青年一派用户均可以参加或建立圈子，但同时只能参加1个圈子，掌门可以通过分享微信或复制链接等方式，邀请粉丝加入圈子，粉丝确认后即可加入圈子。粉丝可以自行退出圈子，掌门也可以把粉丝踢出圈子。掌门若要退出圈子，必须把圈子掌门转移给其它成员。</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、	本活动参与累计消费金额的基础通信产品包含：基础流量商品（含通用流量、定向流量）、增值业务（音频彩铃、视频彩铃、铃音）、网络权益（5G升速权益）、UIM卡、电信自有权益（天翼超高清、天翼云VR、天翼云游戏，共3款）、标准资费（流量、语音、短信）消费金额的合计。不包含派卡商品（含目前所有的推荐组合及后续新增的推荐组合，如喜鹅派等）、充值（含新开卡专享20元预存）、第三方生态权益商品（如B站大会员、腾讯视频等）等消费金额。</div>



  </div>;
};

export default connect(({ playDes }: { playDes: PlayDesModelState; }) => ({ playDes }))(PlayDesPage);
