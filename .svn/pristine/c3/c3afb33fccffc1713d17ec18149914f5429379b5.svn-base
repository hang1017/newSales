import React, { FC, useEffect, useState } from 'react';
import { MartailInviteModelState, ConnectProps, connect, history } from 'alita';
import { Button, Modal, Toast } from 'antd-mobile';
import Utils from '@/utils/tool';
import styles from './index.less';

interface PageProps extends ConnectProps {
  martailInvite: MartailInviteModelState;
}

const MartailInvitePage: FC<PageProps> = ({ martailInvite, dispatch }) => {
  const marketingCircleInstId = Utils.getQueryString('marketingCircleInstId');
  // console.log(`marketingCircleInstId:${marketingCircleInstId}`);

  const { sectInfo = {} } = martailInvite;
  const memberInfo = Utils.getStorageForJson('memberInfo') || {};
  let { phone = '', nickname, profilePhoto = '' } = memberInfo;
  const myAccNbr = localStorage.getItem('myAccNbr');
  if (myAccNbr) {
    phone = myAccNbr;
  }
  // console.log(JSON.stringify(memberInfo));

  const { marketingCircleInstName, expDate = '', memberName } = sectInfo;
  const [hoursContent, HoursContent] = useState('');
  const [minuteContent, MinuteContent] = useState('');
  const [secondContent, SecondContent] = useState('');
  const [expireContent, ExpireContent] = useState('已失效，邀请已过期');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [errorMsg, updateErrorMsg] = useState('');
  const [showModal, updateShow] = useState(false);
  // 这里发起了初始化请求
  useEffect(() => {
    if (marketingCircleInstId) {
      dispatch!({
        type: 'martailInvite/circleDecode',
        payload: {
          url: window.location.href,
        }
      }).then((res) => {
        TimeDown(res);
      });
    }

    return () => {
      localStorage.setItem('myAccNbr', '')
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);

  useEffect(() => {

    console.log(secondContent, minuteContent);

  }, []);

  const TimeDown = (expDate) => {

    const timeObj = Utils.timeDiffer(expDate);
    if (!timeObj) {
      setBtnDisabled(true);
    }
    else {
      setBtnDisabled(false);
    }

    // 输出到页面
    HoursContent(timeObj.hours + timeObj.days * 24)
    MinuteContent(timeObj.minutes)
    SecondContent(timeObj.seconds)

    // 延迟一秒执行自己
    setTimeout(() => {
      TimeDown(expDate);
    }, 1000);
  }
  /**
   * 加入圈子
   */
  const joinSect = () => {
    if (btnDisabled) {
      return false;
    }
    Modal.alert('提示', '确定加入圈子', [
      {
        text: '取消', onPress: () => { }
      },
      {
        text: '确定', onPress: () => {
          // 判断是否登录
          dispatch!({
            type: 'my/queryMemberLevel',
          }).then((resFlage: boolean) => {
            if (!resFlage) {
              return false;
            }

            dispatch!({
              type: 'martailInvite/circleJion',
              payload: {
                applyType: '1000', // 搜索入圈
                nickName: nickname || Utils.phoneNum(phone),
                accNbre: phone,
                marketingCircleInstId,
                memberImage: profilePhoto,

              }
            }).then((data: string) => {
              const { success, errMessage } = data;
              if (success) {
                Toast.success('加入成功');


                dispatch!({
                  type: 'normalSect/sectMemberList',
                  payload: {
                    accNbre: phone,
                    couponFlag: true,
                    current: 1,
                    size: 10,
                  }
                }).then((res) => {
                  const { total, records = [] } = res;
                  dispatch!({
                    type: 'headSect/save',
                    payload: {
                      userInfo: records[0] || {},
                      accNbre: phone,
                    }
                  });
                  setTimeout(() => {
                    history.push({
                      pathname: '/sect/headSect',
                    });
                  }, 100);
                })

              }
              else {
                updateErrorMsg(errMessage);
                updateShow(true);

              }
            });


          })

        }
      },
    ]);
  }
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  // const { name } = martailInvite;
  return (
    <>
      <div className={styles.invite}>
        <div className={styles.exitLogin}>{phone ? `${Utils.phoneNum(phone)}退出` : ''} </div>
        <div className={styles.head}>
          <h3>用户名{memberName}</h3>
          <div>邀请你加入他的圈子<span>{marketingCircleInstName}</span></div>
          <div>加入圈子福利多多，好处多多，每月流量权益送不停</div>
        </div>
        <div className={styles.contain}>
          <p>玩法说明</p>
          <p>1、	活动有效期为即日起至2021年6月30日。</p>
          <p>2、	“圈子”由“掌门”和“粉丝”构成，人数最少为2人最多不超过50人。可以自主命名并设计圈子名称、头像等圈子标识。名称、头像等内容应当符合法律法规的规定，不应违背社会公序良俗，没有侵害第三方权利的内容，否则中国电信上海公司有权取消相应的名称、头像等内容</p>
          <p>3、	“圈子”消费满赠福利：每月圈子内所有成员基础通信产品消费金总额每满100元，每名成员可领取1GB国内通用流量兑换券，每人每月最高可领10张。每月圈子内所有成员基础通信产品消费总额每满200元，圈子掌门可以领取1GB国内通用流量兑换券，每月最高５张，可自己使用或赠送给圈子内成员。</p>
          <p>4、	流量兑换券需至“我的圈子”进行领取，主动退出圈子或被掌门踢出圈子，未领取的流量兑换券自动失效，无法再领取。兑换券自达到领取条件后起90天内有效，有效期内未兑换则视作用户主动放弃领取。</p>
          <p>5、	所有青年一派用户均可以参加或建立圈子，但同时只能参加1个圈子，掌门可以通过分享微信或复制链接等方式，邀请粉丝加入圈子，粉丝确认后即可加入圈子。粉丝可以自行退出圈子，掌门也可以把粉丝踢出圈子。掌门若要退出圈子，必须把圈子掌门转移给其它成员。</p>
          <p>6、	本活动参与累计消费金额的基础通信产品包含：基础流量商品（含通用流量、定向流量）、增值业务（音频彩铃、视频彩铃、铃音）、网络权益（5G升速权益）、UIM卡、电信自有权益（天翼超高清、天翼云VR、天翼云游戏，共3款）、标准资费（流量、语音、短信）消费金额的合计。不包含派卡商品（含目前所有的推荐组合及后续新增的推荐组合，如喜鹅派等）、充值（含新开卡专享20元预存）、第三方生态权益商品（如B站大会员、腾讯视频等）等消费金额。</p>
          <div className={styles.copyRight}>
            <span>——</span> 中国电信 <span>——</span>
          </div>
          <div className={styles.footer}>
            <div className={styles.base}>
              <div className={styles.left}></div>
              <div className={styles.right}></div>
            </div>
            <div className={styles.time}>
              <div className={!btnDisabled ? styles.show : styles.hide}>距离邀请失效还有 <span>{hoursContent}</span> 小时 <span>{minuteContent}</span> 分 <span>{secondContent}</span> 秒</div>
              <div className={btnDisabled ? styles.show : styles.hide}> <span className={styles.expier}>{expireContent}</span> </div>
              <Button className={btnDisabled ? styles.disabeBtn : styles.button} onClick={joinSect}>立即加入</Button>
            </div>
          </div>
        </div>

      </div>
      <Modal
        visible={showModal}
        transparent
        maskClosable={false}
        onClose={() => { }}
        title='温馨提示'
      >
        <div style={{ height: 400, }}>
          <div className={styles.errorMsg}>{errorMsg || '是是'}</div>
          <div className={styles.activeBtn}
            onClick={() => {
              Utils.clear();
              history.push({
                pathname: '/login',
                query: {
                  type: 'back',
                },
              });
            }}
          >切换账户</div>
          <div className={styles.activeBtn}
            onClick={() => {
              history.push({
                pathname: '/customer/indexList',
              });
            }}

          >去购买青年一派卡</div>
          <div className={styles.cancleBtn}
            onClick={() => {
              updateShow(false);
            }}
          >取消</div>
        </div>
      </Modal>
    </>
  )
};

export default connect(({ martailInvite }: { martailInvite: MartailInviteModelState; }) => ({ martailInvite }))(MartailInvitePage);
