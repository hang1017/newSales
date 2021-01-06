import React, { FC, useEffect, useState } from 'react';
import { MineeQuitiesModelState, ConnectProps, connect, history } from 'alita';

import backWhiteImg from '@/assets/img/back_white.png';
import { Flex } from 'antd-mobile';

import toux from '@/assets/img/my/toux.png';

import cardImg2 from '@/assets/cardImg2.png';
import cardImg3 from '@/assets/cardImg3.png';
import cardImg4 from '@/assets/cardImg4.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  mineeQuities: MineeQuitiesModelState;
}

const MineeQuitiesPage: FC<PageProps> = ({ mineeQuities, dispatch }) => {
  const { name } = mineeQuities;
  const [cardList, setcardList] = useState([
    {
      title: 'B站大会员免费送',
      titleColor: '#24206B',
      remark: '累计消费满19元',
      remarkColor: '#5E53A3',
      time: '2020年8月1日',
      status: '已领取',
      textAlign: 'left',
      cardImg: cardImg2,
      backgroundColor: '#E5E5E5',
    },
    {
      title: 'B站大会员免费送',
      titleColor: '#BB6601',
      remark: '累计消费满19元',
      remarkColor: '#8F4F02',
      time: '2020年8月1日',
      status: '立即领取',
      textAlign: 'right',
      cardImg: cardImg3,
      backgroundColor: '#F5A623',
    },
    {
      title: 'B站大会员免费送',
      titleColor: '#C23D44',
      remark: '累计消费满19元',
      remarkColor: '#921B27',
      time: '2020年8月1日',
      status: '待领取',
      textAlign: 'left',
      cardImg: cardImg4,
      backgroundColor: '#F53C54',
    },
  ] as any[]);
  // 这里发起了初始化请求
  useEffect(() => {
    document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  // 头部信息
  const renderUserInfo = () => {
    return (
      <div className={styles.userInfo}>
        <div className={styles.headContent}>
          <div>
            <img
              src={backWhiteImg}
              alt=""
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
          <div className={styles.title}>我的权益</div>
          <div className={styles.rigthContent}></div>
        </div>
        <div className={styles.baseInfo}>
          <div className={styles.toux}>
            <img src={toux} />
          </div>
          <div className={styles.myInfo}>张三疯</div>
        </div>
        <div className={styles.giftBag}>已领礼包</div>
        <div className={styles.headMenuNumList}>
          <div className={styles.menuNum}>200</div>
          <div className={styles.menuNum}>9890</div>
        </div>
        <div className={styles.headMenuList}>
          <div className={styles.menutitle}>累计下单</div>
          <div className={styles.lene} />
          <div className={styles.menutitle}>累计消费</div>
        </div>
      </div>
    );
  };

  // 累计消费奖励
  const renderAddUpExpense = () => {
    return (
      <div className={styles.addUpExpenseDiv}>
        <div className={styles.addUpExpenseHeaderDiv}>
          <span>累计消费赢奖励</span>
          <div className={styles.addUpExpenseHeaderSubTitle}>消费多送的多</div>
          <div className={styles.activityBtn}>活动规则</div>
        </div>
      </div>
    );
  };

  // 卡片列表
  const renderCardList = () => {
    const rows = cardList.map((row) => {
      const { cardImg, title, remark, status, time, titleColor, remarkColor } = row;
      return (
        <div className={styles.cardItem} style={{ textAlign: row.textAlign }}>
          <div className={styles.cardItemImg}>
            <img src={cardImg} alt="" />
            <div className={styles.cardItemImgContent}>
              <div className={styles.remarkText} style={{ color: remarkColor }}>
                {remark}
              </div>
              <div className={styles.titleText} style={{ color: titleColor }}>
                {title}
              </div>
            </div>
          </div>
          <div className={styles.cardImgBottom} onClick={() => {}}>
            <div className={styles.timeText}>{time}</div>
            <div className={styles.rightButtom} style={{ background: row.backgroundColor }}>
              {status}
            </div>
          </div>
        </div>
      );
    });
    return rows;
  };

  // 推广信息
  const renderPromotionInfo = () => {
    return (
      <Flex.Item className={styles.content}>
        <div className={styles.promotionCard}>
          <div className={styles.promotionTitle}>业务推广专项补贴</div>
          <div className={styles.subhead}>大礼限时送</div>
          <div className={styles.time}>活动时间：2020.09.01-12.31</div>
        </div>
        {/* 累计消费奖励 */}
        {renderAddUpExpense()}
        {/* 促销卡片 */}
        {renderCardList()}
      </Flex.Item>
    );
  };

  return (
    <Flex direction="column" className={styles.container}>
      {/* 头部信息 */}
      {renderUserInfo()}
      {/* 推广信息 */}
      {renderPromotionInfo()}
    </Flex>
  );
};

export default connect(({ mineeQuities }: { mineeQuities: MineeQuitiesModelState }) => ({
  mineeQuities,
}))(MineeQuitiesPage);
