import React, { FC, useEffect, useRef, useState } from 'react';
import { ActivityPreviewModelState, ConnectProps, connect } from 'alita';
import classnames from 'classnames';
import GiftPng from '@/assets/img/goose/gift.png';
import EmptyDrawPng from '@/assets/img/goose/emptyDraw.png';
import BeginDrawPng from '@/assets/img/goose/beginDraw.png';
import TecentIconPng from '@/assets/img/goose/tecentIcon.png';
import RedpkgPng from '@/assets/img/goose/redpkg.png';
import ThreePhonePng from '@/assets/img/goose/smallPhone.png';
import FlowIconPng from '@/assets/img/goose/flowIcon.png';
import DrawBigBgPng from '@/assets/img/goose/drawBigBg.png';
import RightPng from '@/assets/img/goose/right.png';
import styles from './index.less';


interface PageProps extends ConnectProps {
  activityPreview: ActivityPreviewModelState;
}

const LuckDraw: FC<PageProps> = ({ dispatch, location }) => {
  const cutTime = ['00', '00', '00']; // 当前结算时间
  const activeNumRef = useRef();
  const { raffleDrawId = '' } = location.query;
  const [menuList, setMenuList] = useState([]);
  

  const getDetails = () => {
    dispatch!({
      type: 'activityPreview/queryLotteryDetail',
      payload: {
        raffleDrawId,
      },
    }).then((res : any) => {
      const { raffleDrawPrizeList = [] } = res;
      const newMenu = (raffleDrawPrizeList || []).map((item : any, i : number) => ({
        id: i,
        img: RedpkgPng,
        text: item.prizeName,
        type: 'img',
      }));
      while (newMenu.length < 8) {
        const index = Math.floor(Math.random() * 8);
        newMenu.splice(index, 0, {
          id: Math.random(),
          img: RedpkgPng,
          text: (
            <div>
              谢谢
              <br />
              参与
            </div>
          ),
          type: 'text',
        });
      }
      newMenu.splice(4, 0, { id: 'click', img: BeginDrawPng, type: 'click' });
      setMenuList(newMenu);
    });
  };

  useEffect(() => {
    getDetails();
  }, [raffleDrawId]);

  const menuItemNode = (item: any) => {
    switch (item?.type) {
      case 'img':
        return (
          <div className={styles.menuImgItem}>
            <img src={item?.img} alt="" className={styles.menuImg} />
            <div className={styles.menuImgText}>{item?.text}</div>
          </div>
        );
      case 'text':
        return <div className={styles.menuTextItem}>{item?.text}</div>;
      case 'click':
        return (
          <div className={styles.menuClickItem}>
            <img
              param-action="gooseDraw"
              src={item?.img}
              alt=""
              className={styles.menuImg}
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.luckDrawStyle}>
      <div className={styles.luckDrawContent}>
        <div className={styles.topStyle}>
          <img
            src={DrawBigBgPng}
            alt=""
            className={styles.drawBigBgImg}
          />
          <div className={styles.gooseRule}>
            活动介绍
            <img src={RightPng} alt="" className={styles.right} />
          </div>
        </div>
        <div className={styles.cutDownTimeStyle}>
          <div className={styles.cutDownLabel}>本轮抽奖还剩</div>
          {cutTime.map((item: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={`${item}-${index}`}>
              <div className={styles.timeItem}>{item}</div>
              {index + 1 !== cutTime.length && <div className={styles.mao}>:</div>}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.drawStyle}>
          <div className={styles.trunableStyle}>
            {menuList.map((menu: any, index: number) => (
              <div
                key={menu?.id}
                className={classnames({
                  [styles.menuItem]: true,
                  [styles.menuItemActive]: `${index}` === activeNumRef?.current,
                })}
              >
                <div className={styles.menuItemAbs}>{menuItemNode(menu)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.user}>用户：188****3456</div>
        <div className={styles.giftNode}>
          <div className={styles.giftDiv}>
            <div className={styles.giftContent}>
              <div className={styles.myGiftTitle}>
                <img src={GiftPng} alt="" className={styles.giftImg} />
                <div className={styles.giftTitleText}>我的奖品</div>
              </div>
              <div className={styles.giftEmpty}>
                <img src={EmptyDrawPng} alt="" className={styles.giftEmptyImg} />
                <div className={styles.giftEmptyText}>暂无中奖记录</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ activityPreview }: { activityPreview: ActivityPreviewModelState }) => ({ activityPreview }))(LuckDraw);

