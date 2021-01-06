import React, { FC } from 'react';
import { Modal, Button } from 'antd-mobile';

import styles from './index.less';

interface HelpRuleModalProps {
  visible: boolean;
  close: () => void;
}

const HelpRuleModal: FC<HelpRuleModalProps> = (props) => {
  const { visible = true, close = () => {} } = props;
  return (
    <Modal visible={visible} className={styles.helpRuleModalStyle} title="活动介绍" transparent>
      <div className={styles.text}>
        1、用户下单完成后在助力界面，点击分享助力，分享助力链接至微信好友或微信朋友圈。
      </div>
      <div className={styles.text}>
        2、用户好友需打开助力页面，输入手机号、验证码完成助力，每个手机号对同一用户只能助力一次。
      </div>
      <div className={styles.text}>
        3、在24小时内，助力好友人数达到9位时，即助力成功。助力成功可获得一张5GB通用流量兑换券。超过24小时未达到9位则助力失败，助力失败用户的同一订单无法再次参与助力活动。
      </div>
      <div className={styles.text}>
        4、兑换券兑换方式：用户激活号卡后使用号码登录https://pai.189.cn:10000，在【个人中心】-【权益兑换】栏目中兑换流量兑换券，兑换券有效期30天，逾期失效，流量有效期31天。
      </div>

      <div className={styles.btnDiv}>
        <Button className={styles.btn} onClick={close}>
          我知道了
        </Button>
      </div>
    </Modal>
  );
};

export default HelpRuleModal;
