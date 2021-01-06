/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
import React, { FC, useState, useEffect } from 'react';
import { Modal } from 'antd-mobile';
import { history } from 'alita';
import classnames from 'classnames';
import { PriceLabel } from '@/components';
import { timeFormat } from '@/utils';
import { changeText, changeTextSend } from '@/utils/faceMenu';
import Utils from '@/utils/tool';
import { LoaddingPng, AvatarPng } from '@/assets';
import TouXPng from '@/assets/img/my/toux.png';
import styles from './index.less';
//
interface IChatProps {
  data: any[];
  sendGoods?: (e: any, res: any) => void;
}

const Chat: FC<IChatProps> = ({ data = [], sendGoods = () => {} }) => {
  const [fullScreenImg, setFullScreenImg] = useState(''); // 点击图片全屏内容url
  const [fullScreenFlag, setFullScreenFlag] = useState(false); // 全屏的弹框标识
  const [memberInfo, setMemberInfo] = useState({}); // 会员的信息

  useEffect(() => {
    const member = Utils.getStorageForJson('memberInfo');
    if (member) {
      setMemberInfo(member);
    }
  }, []);

  return (
    <div className={styles.messageContentStyle} id="messageId">
      {[...data].map((item: any) => {
        // if (!item?.randomId) return;
        const showMessage = ({ msgType = '', msgObj = '' }) => {
          if (!msgObj) return;
          msgObj = JSON.parse(msgObj);
          switch (msgType) {
            case 'img':
              return (
                <img
                  src={msgObj.msg}
                  style={{ maxWidth: 400 }}
                  onClick={() => {
                    setFullScreenImg(msgObj.msg);
                    setFullScreenFlag(true);
                  }}
                />
              );
            case 'face':
              return (
                <div
                  className={classnames({
                    [styles.messageText]: true,
                    [styles.pinkBg]: item.userType === 'member',
                  })}
                  dangerouslySetInnerHTML={{
                    __html:
                      item.userType === 'member'
                        ? changeTextSend(msgObj?.msg)
                        : changeText(msgObj?.msg),
                  }}
                />
              );
            case 'text':
              if (!msgObj?.msg) return '';
              if (item.userType === 'member') {
                return (
                  <div
                    className={classnames({
                      [styles.messageText]: true,
                      [styles.pinkBg]: item.userType === 'member',
                    })}
                  >
                    {msgObj?.msg}
                  </div>
                );
              }
              return (
                <div
                  className={classnames({
                    [styles.messageText]: true,
                    // [styles.pinkBg]: item.userType === 'member',
                  })}
                  dangerouslySetInnerHTML={{
                    __html: changeText(msgObj?.msg),
                  }}
                />
              );
            case 'baby':
              if (!msgObj) return;
              const { goodsUrl = '', goodsPrice = 0, goodsId = '' } = msgObj || {};
              return (
                <div
                  className={classnames({
                    [styles.messageText]: true,
                    [styles.messageBaby]: true,
                    // [styles.pinkBg]: item.userType === 'member',
                  })}
                  onClick={() =>
                    history.push({
                      pathname: '/customer/cGoodsDetails',
                      query: {
                        goodsId,
                        noDropByCacheKey: '1',
                      },
                    })
                  }
                >
                  <img src={goodsUrl} className={styles.babyImg} />
                  <div className={styles.babyMoney}>
                    <PriceLabel price={goodsPrice} />
                    {/* <span className={styles.symbol}>¥</span>
                  <span className={styles.mainMoney}>{(money / 100).toFixed(2).split('.')[0]}</span>
                  <span className={styles.subMoney}>
                    {`.${(money / 100).toFixed(2).split('.')[1]}`}
                  </span> */}
                  </div>
                  <div className={styles.babyTitle}>{msgObj?.goodsName}</div>
                </div>
              );
              break;
            case 'goods':
              if (!msgObj) return;
              const { goodsName = '' } = msgObj || {};
              return (
                <div className={styles.messageGoods} onClick={() => history.goBack()}>
                  <img src={msgObj?.goodsUrl} alt="" className={styles.goodsImg} />
                  <div className={styles.goodsContent}>
                    <div className={styles.goodsName}>{goodsName}</div>
                    <div className={styles.goodsText}>
                      <div className={styles.goodsPrice}>
                        <PriceLabel price={msgObj?.goodsPrice} />
                        {/* <span className={styles.symbol}>¥</span>
                      <span className={styles.mainMoney}>
                        {lowestPrice.toFixed(2).split('.')[0]}
                      </span>
                      <span className={styles.subMoney}>
                        {`.${lowestPrice.toFixed(2).split('.')[1]}`}
                      </span> */}
                      </div>
                      <div className={styles.goodsBtn} onClick={(e) => sendGoods(e, msgObj)}>
                        发送给客服
                      </div>
                    </div>
                  </div>
                </div>
              );
            default:
              break;
          }
        };

        const queryJustifyContent = (item: { message: { type: string }; id: string }) => {
          if (item.msgType !== 'goods') {
            return item.userType === 'member' ? 'end' : 'start';
          } else {
            return 'center';
          }
        };

        return (
          <div id={item.randomId} key={item.randomId}>
            {item.timeFlag === '1' && (
              <div className={styles.mcTimestamp}>{timeFormat(item.timestamp)}</div>
            )}
            <div
              style={{
                justifyContent: queryJustifyContent(item),
                flexDirection: item.userType === 'member' ? 'row-reverse' : 'row',
              }}
              key={item.randomId}
              className={styles.messageItem}
            >
              {item.msgType !== 'goods' && (
                <img
                  src={
                    item.userType === 'member' && memberInfo?.profilePhoto
                      ? memberInfo?.profilePhoto
                      : item.userType === 'member'
                      ? TouXPng
                      : AvatarPng
                  }
                  alt=""
                  className={styles.avatarImg}
                />
              )}
              <div
                className={classnames({
                  [styles.message]: true,
                  [styles.messageGood]: item.msgType === 'goods',
                })}
              >
                {showMessage(item)}
              </div>
              <div className={styles.messageLoad}>
                {item.loadding && <img src={LoaddingPng} className={styles.loadding} />}
              </div>
            </div>
          </div>
        );
      })}
      <Modal visible={fullScreenFlag} animationType="up" className={styles.fullScreenStyle}>
        <div className={styles.fullScreenContent} onClick={() => setFullScreenFlag(false)}>
          <img src={fullScreenImg} className={styles.fsImg} />
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
