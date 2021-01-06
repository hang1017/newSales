import React, { FC, useEffect, useState } from 'react';
import { StarHelpModelState, ConnectProps, connect, history, setPageNavBar } from 'alita';
import { Button, Toast, Modal } from 'antd-mobile';
import moment from 'moment';
import { dateChange } from '@alitajs/dform';
import { countDownTime } from '@/utils';
import copy from 'copy-to-clipboard';
import clipboard from '@/utils/clipboard';
import { FriendList, HelpRuleModal } from '@/pages/starPkg/components';
import { AllWhiteLoading } from '@/components';
import TopBgPng from '@/assets/img/starPkg/helpBg.png';
import RightPng from '@/assets/img/starPkg/helpRight.png';
import WaitPng from '@/assets/img/starPkg/wait.png';
import NoHelpPng from '@/assets/img/starPkg/noHelp.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  starHelp: StarHelpModelState;
}

const initData = Array.from(new Array(9)).map((_val, i) => ({
  type: 'no',
  boostFriendsName: '待助力',
  boostFriendsPic: NoHelpPng,
}));

let cutTimer: NodeJS.Timeout | null = null;

const StarHelpPage: FC<PageProps> = ({ starHelp, dispatch, location }) => {
  const { orderId = '', paySuccess = '', phone = '' } = location.query;
  const [friendData, setFriendData] = useState<any[]>([]); // 好友列表
  const [helpRuleFlag, setHelpRuleFlag] = useState<boolean>(false); // 活动规则弹框标识
  const [cutTime, setCutTime] = useState<string>(''); // 倒计时时间
  const [friendList, setFriendList] = useState([]); // 真好友列表
  const [btnFlag, setBtnFlag] = useState<boolean>(true); // 按钮是否可点击
  const [layoutHeight, setLayoutHeight] = useState(0); // 导航栏的高度
  const [loadingFlag, setLoadingFlag] = useState<boolean>(true); // 页面是否还在加载中的判断
  const [copyUrl, setCopyUrl] = useState(''); // 复制链接
  const [copyFlag, setCopyFlag] = useState(false); // 分享链接弹框

  useEffect(() => {
    setTimeout(() => {
      const hei = document.getElementsByClassName('am-navbar');
      if (hei && hei.length) {
        setLayoutHeight(hei[0].clientHeight);
      }
    }, 100);

    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick: () => {
          if (paySuccess === '1') {
            history.push({
              pathname: '/customer/myPage',
              query: {
                type: 'index',
              },
            });
          } else {
            history.goBack();
          }
        },
      },
    });
    if (!orderId) return;
    // if (paySuccess === '1') {
    //   setBtnFlag(false);
    //   setFriendData(initData);
    // }
    dispatch!({
      type: 'starHelp/qryBoostActivityInstDetailByIdModal',
      payload: {
        orderNo: orderId,
        activityId: '9998',
      },
    }).then(({ boostActivityDetailRspList = [], endDate = '' }) => {
      if (!boostActivityDetailRspList) boostActivityDetailRspList = [];
      const list = JSON.parse(JSON.stringify(boostActivityDetailRspList));
      setFriendList(list);
      boostActivityDetailRspList.push(...initData);
      const newList = boostActivityDetailRspList.slice(0, 9);
      setFriendData(newList);
      if (endDate) {
        cutTimer = setInterval(() => {
          const ti = countDownTime(new Date(), moment(new Date(dateChange(endDate))));
          const tiList = ti.split(':');
          if (
            parseInt(tiList[0], 10) <= 0 &&
            parseInt(tiList[1], 10) <= 0 &&
            parseInt(tiList[2], 10) <= 0
          ) {
            setCutTime('00:00:00');
            if (list && list.length === 9) {
              setBtnFlag(false);
            }
          } else {
            setCutTime(ti);
            setBtnFlag(false);
          }
        }, 1000);
      } else {
        setBtnFlag(false);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      if (cutTimer) {
        clearInterval(cutTimer);
        cutTimer = null;
      }
    };
  }, []);

  /**
   * 邀请好友助力按钮点击事件
   */
  const helpClick = (event: any) => {
    event.persist();
    if (friendList.length === 9) {
      history.push({
        pathname: '/customer/myPage',
      });
    } else {
      dispatch!({
        type: 'starHelp/boostActivityShareModal',
        payload: {
          orderNo: orderId,
          accNbre: phone,
          boostUrl: `${window.location.origin}/#/starPkg/starHelpOrder`,
          mktActivityId: '9998',
        },
      }).then((res: any) => {
        const { boostUrl = '', endDate = '' } = res;
        let newUrl = decodeURIComponent(boostUrl);
        if (newUrl.indexOf('//starPkg') !== -1) {
          newUrl = newUrl.replace('//starPkg', '/#/starPkg');
        }
        setCopyUrl(newUrl);
        setCopyFlag(true);
        // copy(newUrl);
        // setTimeout(() => {
        //   clipboard(newUrl, { target: '#btnId' }, '已将链接拷贝至剪切板，快发送给好友助力吧！');
        // }, 100);

        // Toast.show('已将链接拷贝至剪切板，快发送给好友助力吧！', 1);
        if (!cutTimer) {
          cutTimer = setInterval(() => {
            const ti = countDownTime(new Date(), moment(new Date(dateChange(endDate))));
            const tiList = ti.split(':');
            if (
              parseInt(tiList[0], 10) <= 0 &&
              parseInt(tiList[1], 10) <= 0 &&
              parseInt(tiList[2], 10) <= 0
            ) {
              setCutTime('00:00:00');
            } else {
              setCutTime(ti);
              setBtnFlag(false);
            }
          }, 1000);
        }
      });
    }
  };

  const copyEvent = (event: any) => {
    clipboard(copyUrl, event, '已将链接拷贝至剪切板，快发送给好友助力吧！');
    setCopyFlag(false);
  };

  return (
    <div
      className={styles.starHelpStyle}
      style={{ height: document.documentElement.clientHeight - layoutHeight }}
    >
      <div className={styles.topBg}>
        <img
          src={TopBgPng}
          alt=""
          className={styles.topBgImg}
          onLoad={() => setLoadingFlag(false)}
        />
        <div
          className={styles.activePro}
          onClick={() => setHelpRuleFlag(true)}
          param-action="helpRule"
        >
          活动介绍 <img src={RightPng} alt="" className={styles.rightImg} />
        </div>
      </div>
      <div className={styles.starContainer}>
        <div className={styles.frame}>
          {friendList && friendList.length === 9 ? (
            <div className={styles.textActive}>
              <div>{'恭喜您已集齐9个助力，请到个人中心->'}</div>
              <div>权益中心领取权益兑换</div>
            </div>
          ) : (
            <React.Fragment>
              <div>邀请9个好友助力，即可获得通用流量5GB</div>
              {cutTime && !btnFlag && <div>助力还有{cutTime}失效</div>}
              {cutTime && btnFlag && <div>助力已结束</div>}
            </React.Fragment>
          )}
          <div className={styles.btnDiv}>
            <Button
              className={styles.btn}
              disabled={btnFlag}
              data-clipboard-text="123"
              onClick={(e: any) => helpClick(e)}
            >
              <div className={styles.btns} param-action="helpInvite">
                {friendList && friendList.length === 9 ? '去兑换' : '邀请好友助力'}
              </div>
            </Button>
          </div>
          {/* {copyUrl && (
            <div>
              <div>分享链接已生成：</div>
              <div>{copyUrl}</div>
              <div>复制链接</div>
            </div>
          )} */}
          <div className={styles.line} />
          <div className={styles.titleText}>
            <img src={WaitPng} alt="" className={styles.waitImg} />
            <div className={styles.text}>
              好友助力进度{friendList && friendList.length ? friendList.length : 0}/9
            </div>
            <img src={WaitPng} alt="" className={styles.waitImg} />
          </div>
          <FriendList data={friendData} />
        </div>
      </div>
      <HelpRuleModal visible={helpRuleFlag} close={() => setHelpRuleFlag(false)} />
      {loadingFlag && <AllWhiteLoading />}
      <Modal
        visible={copyFlag}
        transparent
        maskClosable={false}
        title="助力链接"
        className={styles.helpModal}
      >
        <div className={styles.url}>{copyUrl}</div>
        <div className={styles.urlBtnDiv}>
          <Button className={styles.btn} onClick={copyEvent}>
            复制助力链接
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ starHelp }: { starHelp: StarHelpModelState }) => ({
  starHelp,
}))(StarHelpPage);
