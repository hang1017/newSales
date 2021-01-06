import React, { FC, useEffect, useState, useRef } from 'react';
import { GooseModelState, ConnectProps, connect, router } from 'alita';
import { Modal, Toast } from 'antd-mobile';
import classnames from 'classnames';
import moment from 'moment';
import { AllWhiteLoading } from '@/components';
import { countDownTime } from '@/utils';
import Utils from '@/utils/tool';
import { dateChange } from '@alitajs/dform';
import GiftPng from '@/assets/img/goose/gift.png';
import EmptyDrawPng from '@/assets/img/goose/emptyDraw.png';
import BeginDrawPng from '@/assets/img/goose/beginDraw.png';
import TecentIconPng from '@/assets/img/goose/tecentIcon.png';
import RedpkgPng from '@/assets/img/goose/redpkg.png';
import ThreePhonePng from '@/assets/img/goose/smallPhone.png';
import FlowIconPng from '@/assets/img/goose/flowIcon.png';
import DrawBigBgPng from '@/assets/img/goose/drawBigBg.png';
import RightPng from '@/assets/img/goose/right.png';
import WhiteBackPng from '@/assets/img/back_white.png';

import { GiftModal } from '../components';
import styles from './index.less';

import BetterScroll from 'better-scroll';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

const { alert } = Modal;

interface PageProps extends ConnectProps {
  goose: GooseModelState;
}

const DRAW_MENU = [
  { id: '1', img: FlowIconPng, text: '5GB流量', type: 'img' },
  { id: '2', img: ThreePhonePng, text: 'iPhone12', type: 'img' },
  { id: '3', img: RedpkgPng, text: '2元话费', type: 'img' },
  { id: '4', img: RedpkgPng, text: '10元话费', type: 'img' },
  { id: '5', img: BeginDrawPng, type: 'click' },
  { id: '6', img: TecentIconPng, text: '腾讯视频VIP', type: 'img' },
  { id: '7', img: RedpkgPng, text: '5元话费', type: 'img' },
  {
    id: '8',
    img: RedpkgPng,
    text: (
      <div>
        谢谢
        <br />
        参与
      </div>
    ),
    type: 'text',
  },
  { id: '9', img: FlowIconPng, text: '2GB流量', type: 'img' },
];

let timer: NodeJS.Timeout | null = null;
let cutTimer: NodeJS.Timeout | null = null;
let interfaceTimer: NodeJS.Timeout | null = null;
let bs: BScrollConstructor<{}> | null = null;

const LuckDraw: FC<PageProps> = ({ dispatch, location }) => {
  const orderList: string[] = ['0', '1', '2', '5', '8', '7', '6', '3'];
  const [activeNum, setActiveNum] = useState<string>(''); // 当前大转盘指向的位置
  const [btnFlag, setBtnFlag] = useState<boolean>(true); // 按钮是否可点击
  const [cutTime, setCutTime] = useState<string[]>(['00', '00', '00']); // 当前结算时间
  const [loadingFlag, setLoadingFlag] = useState<boolean>(true); // 页面是否加载成功的标识
  const [giftModalVisible, setGiftModalVisible] = useState<boolean>(false); // 奖品的弹框
  const [initData, setInitData] = useState<any>({}); // 初始化的参数信息
  const [giftData, setGiftData] = useState<any>({}); // 奖品信息
  const activeNumRef = useRef();

  const ref = useRef(null);

  const member = Utils.getStorageForJson('memberInfo') || {};

  const { raffleDrawCycleId = '', raffleDrawId = '' } = location.query;

  useEffect(() => {
    bs = new BetterScroll(ref.current, {
      probeType: 3,
      scrollY: true,
      scrollX: false,
      click: true,
      bounce: false,
    });
    document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';
    Toast.loading('加载中...');
    dispatch!({
      type: 'goose/queryRaffleDrawResultByMemberModel',
      payload: {
        raffleDrawCycleId,
        raffleDrawId,
        isAll: true,
      },
    }).then((res: any) => {
      setTimeout(() => {
        Toast.hide();
        if (bs) bs.refresh();
      }, 300);
      setInitData(res);
      const { end = false, endTime = '' } = res;
      if (end) {
        cutTimer = setInterval(() => {
          const ti = countDownTime(new Date(), moment(new Date(dateChange(endTime))));
          const tiList = ti.split(':');
          if (
            parseInt(tiList[0], 10) < 0 ||
            parseInt(tiList[1], 10) < 0 ||
            parseInt(tiList[2], 10) < 0
          ) {
            setCutTime(['00', '00', '00']);
          } else {
            setCutTime(tiList);
          }
        }, 1000);
      }
    });

    return () => {
      bs = null;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (cutTimer) {
        clearInterval(cutTimer);
        cutTimer = null;
      }
    };
  }, []);

  useEffect(() => {
    setActiveNum(activeNum);
    activeNumRef.current = activeNum;
  }, [activeNum]);

  /**
   * 开始点击
   */
  const beginClick = () => {
    if (btnFlag) {
      setBtnFlag(false);
      dispatch!({
        type: 'goose/joinRaffleDrawModel',
        payload: {
          raffleDrawCycleId,
          raffleDrawId,
          // accNbr: member?.phone || '',
        },
      }).then((res: any) => {
        if (res && Object.keys(res).length) {
          timer = setInterval(() => {
            const ind = orderList.indexOf(activeNumRef.current);
            if (ind === -1) {
              setActiveNum(orderList[0]);
              activeNumRef.current = orderList[0];
            } else if (ind + 1 === orderList.length) {
              setActiveNum(orderList[0]);
              activeNumRef.current = orderList[0];
            } else {
              setActiveNum(orderList[ind + 1]);
              activeNumRef.current = orderList[ind + 1];
            }
          }, 100);
          interfaceTimer = setInterval(() => {
            dispatch!({
              type: 'goose/queryRaffleDrawResultByMemberModel',
              payload: {
                raffleDrawId,
                raffleDrawCycleId,
              },
            }).then((drawRes: any) => {
              const { memberPrizeInstList = [] } = drawRes;
              if (memberPrizeInstList && memberPrizeInstList?.length) {
                setGiftData(memberPrizeInstList[0]);
                if (timer) clearInterval(timer);
                timer = null;
                if (interfaceTimer) clearInterval(interfaceTimer);
                interfaceTimer = null;
                setActiveNum('');
                activeNumRef.current = '';
                setBtnFlag(true);
                setGiftModalVisible(true);
              }
            });
          }, 2000);
          setTimeout(() => {
            if (interfaceTimer) {
              if (timer) clearInterval(timer);
              timer = null;
              if (interfaceTimer) clearInterval(interfaceTimer);
              interfaceTimer = null;
              setActiveNum('');
              activeNumRef.current = '';
              setBtnFlag(true);
              alert('网络繁忙，请重试!', '', [{ text: '确认', onPress: () => {} }]);
            }
          }, 60000);
        } else {
          setBtnFlag(true);
        }
      });
    }
  };

  /**
   * 礼物弹框关闭事件
   */
  const giftModalClose = () => {
    setGiftModalVisible(false);
    dispatch!({
      type: 'goose/queryRaffleDrawResultByMemberModel',
      payload: {
        raffleDrawCycleId,
        raffleDrawId,
        isAll: true,
      },
    }).then((res: any) => {
      setInitData(res);
    });
  };

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
              onClick={() => {
                beginClick();
              }}
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  /**
   * 去规则页面
   */
  const goToRule = () => {
    router.push({
      pathname: '/goose/rules',
    });
  };
  return (
    <div className={styles.luckDrawStyle} ref={ref}>
      {(loadingFlag || giftModalVisible) && <AllWhiteLoading />}
      <div className={styles.luckDrawContent}>
        <div className={styles.topStyle}>
          <img
            src={WhiteBackPng}
            alt=""
            className={styles.whiteBackPng}
            onClick={() =>
              router.push({
                pathname: '/goose/indexPage',
                query: {
                  source: localStorage.getItem('source'),
                  sn: localStorage.getItem('sn'),
                },
              })
            }
          />
          <img
            src={DrawBigBgPng}
            alt=""
            className={styles.drawBigBgImg}
            onLoad={() => setLoadingFlag(false)}
          />
          <div className={styles.gooseRule} onClick={goToRule}>
            活动介绍
            <img src={RightPng} alt="" className={styles.right} />
          </div>
        </div>
        <div className={styles.cutDownTimeStyle}>
          <div className={styles.cutDownLabel}>本轮抽奖还剩</div>
          {[...cutTime].map((item: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={`${item}-${index}`}>
              <div className={styles.timeItem}>{item}</div>
              {index + 1 !== cutTime.length && <div className={styles.mao}>:</div>}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.drawStyle}>
          <div className={styles.trunableStyle}>
            {DRAW_MENU.map((menu: any, index: number) => (
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
        <div className={styles.user}>用户：{member?.phone || ''}</div>
        <div className={styles.giftNode}>
          {/* <div className={styles.prizeTop}>
          <img src={PrizeTopPng} alt="" className={styles.prizeTopImg} />
        </div> */}
          <div className={styles.giftDiv}>
            <div className={styles.giftContent}>
              <div className={styles.myGiftTitle}>
                <img src={GiftPng} alt="" className={styles.giftImg} />
                <div className={styles.giftTitleText}>我的奖品</div>
              </div>
              {initData &&
                initData?.memberPrizeInstList &&
                initData?.memberPrizeInstList.length === 0 && (
                  <div className={styles.giftEmpty}>
                    <img src={EmptyDrawPng} alt="" className={styles.giftEmptyImg} />
                    <div className={styles.giftEmptyText}>暂无中奖记录</div>
                  </div>
                )}
              {initData &&
                initData?.memberPrizeInstList &&
                initData?.memberPrizeInstList.length > 0 && (
                  <div className={styles.giftList}>
                    {initData?.memberPrizeInstList.map((gift: any, index: number) => (
                      <div className={styles.giftItem} key={gift?.raffleDrawPrizeId}>
                        <div className={styles.giftName}>
                          {index + 1}、{gift?.prizeName}
                        </div>
                        <div className={styles.giftTime}>{gift?.prizeGetDate}</div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
        <GiftModal visible={giftModalVisible} close={giftModalClose} giftData={giftData} />
      </div>
    </div>
  );
};

export default connect(({ goose }: { goose: GooseModelState }) => ({ goose }))(LuckDraw);
