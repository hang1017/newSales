import React, { FC, useRef, useEffect } from 'react';
import styles from './index.less';

import BetterScroll from 'better-scroll';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

interface GooseDetailProps {}

let bs: BScrollConstructor<{}> | null = null;

const GooseDetail: FC<GooseDetailProps> = () => {
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
    }, 200);
  }

  useEffect(() => {
    return () => {
      bs = null;
    };
  }, []);
  return (
    <div
      className={styles.gooseDetailStyle}
      style={{ height: document.documentElement.clientHeight - 90 }}
      ref={ref}
    >
      <div className={styles.gooseDetailContent}>
        <div className={styles.divs}>宝贝详情：</div>
        <div className={styles.divs}>
          1.售价20元，包含5GB国内通用流量（有效期31天），短信以及国内通话按国内语音0.1元/分钟，国内短信0.1元/条扣费。国内通用流量仅限于大陆地区使用，不含中国台湾、中国香港、中国澳门地区，手机上网流量不区分5G、4G、3G、2G网络接入方式，不含WLAN(Wi-Fi)。
        </div>
        <div className={styles.divs}>
          2.流量用完或到期后按国内流量5元/GB扣费，流量不满1GB的部分按0.03元/MB收费，不满1MB的部分按1MB计费,不足1分按1分收取，收满5元后1GB以内不再收费。请确保您的产品卡内有充足的余额，以免影响您正常使用。
        </div>
        <div className={styles.divs}>3.成功订购用户可获赠：</div>
        <div className={styles.divs}>（1）腾讯视频会员月卡（兑换券形式发送至派卡用户账号）。</div>
        <div className={styles.divs}>
          （2）综合视频平台APP（腾讯视频、爱奇艺、优酷）定向流量10GB（有效期31天，以兑换券形式发送至派卡用户账号）。
        </div>
        <div className={styles.divs}>使用说明：</div>
        <div className={styles.divs}>1.使用范围：全国用户。</div>
        <div className={styles.divs}>2.活动时间：2020年12月12日直播期间订购。</div>
        <div className={styles.divs}>
          3.权益开通后立即生效，逾期则失效，不会自动扣费（流量自助订购服务除外），权益到期后用户可单独购买权益。
        </div>
        <div className={styles.divs}>
          4.用户激活号卡后可登录<span>https://pai.189.cn:10000</span>
          ，在【个人中心】-【权益兑换】栏目中兑换会员权益兑换券和定向流量包兑换券，兑换券有效期31天，逾期失效。
        </div>
        <div className={styles.divs}>
          5.用户需处于正常可用状态，停机、欠费、黑名单、未实名登记等特殊状态下，上述各类优惠权益将无法正常享受。
        </div>
        <div className={styles.divs}>
          6.用户知晓并同意，使用腾讯视频会员月卡和腾讯视频定向流量需要在腾讯视频注册，并接受腾讯视频相关的用户协议、隐私政策等内容；用户知晓并同意，腾讯视频有权对权益内容做出调整，具体调整的方式由权益提供方决定。
        </div>
        <div className={styles.divs}>
          7.根据国家规定，中国电信实施用户实名登记制度，请您在下单日起30日内，根据随卡提供的激活指南或搜索微信小程序“真实身份信息”完成实名制激活，逾期订单将被取消。您的号卡实名激活后，中国电信将实施实名制人工审核，若审核不通过将以短信通知您按要求补传照片，逾期未补传照片的，号码将被暂停通信服务。
        </div>
        <div className={styles.divs}>
          8.若连续66天无流量/无语音呼出/无发送短信的，中国电信将暂停向用户提供各项功能（停机）。停机期间如需复机，请联系客服（
          <span>https://pai.189.cn:10000</span>）查询。停机60天后仍未复机的将自动拆机，用户可登陆（
          <span>https://pai.189.cn:10000</span>
          ）-【个人中心】-【客服售后】在线查询。在线客服咨询工作时间：9:30-22:30。
        </div>
        <div className={styles.divs}>
          9.本商品为中国电信与腾讯视频网站深度合作定制的产品，暂无法变更为中国电信其他移动业务套餐。暂不支持开通以下功能：彩信、呼叫转移、国际及中国台湾、中国香港、中国澳门地区长途直拨和漫游。敬请见谅。
        </div>
        <div className={styles.divs}>
          10.商品语音、数据业务可在中国国内使用（为本业务之目的，仅限大陆地区，不包括中国香港、中国澳门和台湾地区）。
        </div>
        <div className={styles.divs}>
          11.目前在线申请的“青年一派”卡号归属地均为上海号卡。
          “青年一派”的卡只能在（https://pai.189.cn:10000 -
          续费充值）进行充值，暂不支持其他任何渠道的充值。
        </div>
        <div className={styles.divs}>
          12.因物流配送原因，下单时配送地址暂不能选择部分地区，具体地区如下：
        </div>
        <div className={styles.divs}>
          云南：临沧、保山、德宏、思茅、普洱、昭通、红河、西双版纳、玉溪、大理、楚雄、丽江、曲靖、怒江、迪庆、文山
        </div>
        <div className={styles.divs}>
          内蒙古：乌兰察布、乌海、兴安盟、包头、呼伦贝尔、呼和浩特、巴彦淖尔、赤峰、通辽、鄂尔多斯、锡林郭勒、阿拉善盟
        </div>
        <div className={styles.divs}>
          吉林：吉林、四平、延边、松原、白城、白山、辽源、通化、长春、珲春市
        </div>
        <div className={styles.divs}>四川：成都、阿坝、甘孜</div>
        <div className={styles.divs}>山东：菏泽、泰安、聊城</div>
        <div className={styles.divs}>
          广东：汕头、湛江、潮州、肇庆、茂名、阳江、珠海、东莞、惠州、佛山、中山、韶关、河源、梅州、清远、云浮、揭阳、汕尾、江门
        </div>
        <div className={styles.divs}>
          广西：南宁、玉林、防港城、柳州、桂林、百色、北海、钦州、防城港、来宾、河池、贵港、梧州、崇左、贺州
        </div>
        <div className={styles.divs}>江苏：宿迁、连云港、淮安、泰州、镇江</div>
        <div className={styles.divs}>
          江西：上饶、吉安、赣州、九江、抚州、宜春、景德镇、萍乡、新余、鹰潭
        </div>
        <div className={styles.divs}>河北：邯郸、秦皇岛、石家庄、保定、唐山</div>
        <div className={styles.divs}>
          河南：郑州、驻马店、安阳、南阳、平顶山、濮阳、三门峡、商丘、许昌、新乡、信阳、漯河、鹤壁
        </div>
        <div className={styles.divs}>海南：儋州、海口</div>
        <div className={styles.divs}>湖北：仙桃、孝感、黄石</div>
        <div className={styles.divs}>
          湖南：娄底、怀化、衡阳、邵阳、郴州、长沙、岳阳、常德、吉首、张家界、永州、益阳
        </div>
        <div className={styles.divs}>福建：泉州、漳州、龙岩、莆田、福州、三明、南平</div>
        <div className={styles.divs}>
          贵州: 六盘水、安顺、毕节、贵阳、遵义、铜仁、黔东南,凯里、黔南、黔西南
        </div>
        <div className={styles.divs}>
          安徽：滁州、蚌埠、淮北、宿州、淮南、阜阳、亳州、芜湖、铜陵、池州
        </div>
        <div className={styles.divs}>
          四川：绵阳、广元、德阳、宜宾、自贡、内江、泸州、乐山、雅安、西昌、攀枝花、南充、广安、遂宁、达州、巴中
        </div>
        <div className={styles.divs}>辽宁：沈阳</div>
        <div className={styles.divs}>宁夏：吴忠、中卫</div>
        <div className={styles.divs}>陕西：安康</div>
        <div className={styles.divs}>青海：玛沁</div>
        <div className={styles.divs}>黑龙江：佳木斯、绥化</div>
        <div className={styles.divs}>13.本商品购买后不支持退款、退货。</div>
        <div className={styles.divs}>转卖转借风险提示：</div>
        <div className={styles.divs}>
          严禁个人擅自买卖实名电话卡行为，出售、出租、分租、转让实名电话卡等行为容易被他人用于实施电信网络诈骗等违法犯罪活动，从而卷入法律纠纷。
        </div>
        <div className={styles.divs}>请您提高个人用户信息保护意识，妥善保管好实名电话卡。</div>
        <div className={styles.divs}>骚扰电话垃圾短信提示:</div>
        <div className={styles.divs}>
          根据工信部规定若实名登记的号码后续存在违规外呼、拔打骚扰电话、呼叫频次异常、发送垃圾短信、非法转售、被公安机关通报以及被用户投诉等情况的，由此产生的责任将由您本人承担，中国电信股份有限公司上海分公司有权对号码停止通信服务。
        </div>
        <div className={styles.divs}>警方提示：</div>
        <div className={styles.divs}>
          亲爱的用户:请勿将已登记您本人身份证信息的号码卡随意提供他人使用，以免被诈骗等违法犯罪人员利用。
        </div>
      </div>
    </div>
  );
};

export default GooseDetail;
