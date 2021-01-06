import React, { FC, useEffect, useState } from 'react';
import { HeadSectModelState, ConnectProps, connect, history } from 'alita';
import { Grid, Modal, Toast } from 'antd-mobile';

import defaultIcon from '@/assets/img/customer/sect/default_icon.png';
import alertIcon from '@/assets/img/customer/sect/alert.png';
import searchIcon from '@/assets/img/customer/sect/search.png';
import setIcon from '@/assets/img/customer/sect/set.png'
import msgIcon from '@/assets/img/customer/sect/msg_icon.png';
import moreIcon from '@/assets/img/customer/sect/right_more.png';
import memberBlue from '@/assets/img/customer/sect/member_blue.png';
import rightIcon from '@/assets/img/customer/sect/more_icon.png';
import backWhiteIcon from '@/assets/img/back_white.png';
import RingCumulativeCost from '@/components/RingCumulativeCost'
import inviteIcon from '@/assets/img/customer/sect/invite_icon.png';

import clipboard from '@/utils/clipboard';

import styles from './index.less';

interface PageProps extends ConnectProps {
  headSect: HeadSectModelState;
}

const HeadSectPage: FC<PageProps> = ({ headSect, dispatch }) => {
  const { userInfo } = headSect;
  const { marketingCircleInstId, marketingCircleInstName = '', circleMemberType, couponUnclaimedCount = 0, mktCircleMemInstId } = userInfo || {};
  const [copyUrl, updateCopyUrl] = useState('');
  const initQuery = () => {
    dispatch!({
      type: 'headSect/circleList',
      payload: {
        marketingCircleInstId,
        marketingCircleName: marketingCircleInstName,
        current: 1,
        size: 10,
      }
    }).then((resInfo: any) => {
      dispatch!({
        type: 'headSect/qryMarketDetail',
        payload: {
          circleId: resInfo.circleId,
          mktCircleInstId: resInfo.marketingCircleInstId,
        }
      })
    });


    dispatch!({
      type: 'headSect/sectMemberList',
      payload: {
        marketingCircleInstId,
        current: 1,
        applyFlag: true,
        size: 50,
      }
    })
  }
  const shareCircle = () => {
    dispatch!({
      type: 'headSect/shareCircle',
      payload: {
        circleInstId: marketingCircleInstId,
      }
    }).then((res: string) => {
      if (res) {
        //
        updateCopyUrl(decodeURIComponent(res));

      }

    })
  }

  const handleCopyClick = (id, event) => {

    clipboard(id, event);

  }
  // 这里发起了初始化请求
  useEffect(() => {
    // Utils.coypUrl('copyText');
    initQuery();
    shareCircle();
    // Modal.alert('提示消息', 'http://182.42.226.7:10000/#/sect/martailInvite?marketingCircleInstId=10006', [{}]);
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { sectInfo, gridViewData, marketInfo, accNbre } = headSect;
  console.log(JSON.stringify(sectInfo))
  const { circleInstDesc = '', memberName = '', circleSize = '', circleTotal = '', sectsImage = '', applyingTotal = 0 } = sectInfo || {};
  // 跳转到券列表页
  const goToCouponPage = () => {
    dispatch!({
      type: 'sectCoupon/save',
      payload: {
        circleInstId: marketingCircleInstId,
        accNbre,
        circleMemberType,
      }
    });
    history.push({
      pathname: '/sect/sectCoupon'
    });
  }
  /**
   *取消创建
   */
  const cancelCreateCircle = () => {
    Modal.alert('', '确定取消创建?', [
      {
        text: '取消',
        onPress: () => { },
      },
      {
        text: '确定',
        onPress: () => {  // 通过复制链接
          dispatch!({
            type: 'headSect/cancelCreateCircle',
            payload: {
              circleInstId: marketingCircleInstId,
            }
          }).then((data) => {
            const { errMessage, success } = data;
            if (!success) {
              Toast.fail(errMessage);
              return false;
            }
            dispatch!({
              type: 'createSect/save',
              payload: {
                accNbre,
              }
            });
            dispatch!({
              type: 'normalSect/save',
              payload: {
                accNbre,
              }
            });

            setTimeout(() => {
              history.push({
                pathname: '/sect/normalSect'
              });
            }, 100);
          })
        },
      }
    ]);

  }


  return <div className={styles.normalSectPage}>

    <img src={backWhiteIcon} alt='' className='backIcon' onClick={
      () => {
        history.push(
          {
            pathname: '/customer/myPage',
            query: {
              type: 'index'
            }
          }
        );
      }
    } />
    <div className={styles.pageTitle}>
      {circleMemberType === '1' ? '我的圈子' : '圈子资料'}

    </div>




    <div className={styles.normalSectHead}>
      <div className={styles.iconContent}>
        <img src={alertIcon} alt='' onClick={
          () => {
            history.push({
              pathname: '/sect/playDes'
            });
          }
        } />
        <div>
          <img src={searchIcon} alt='' className={styles.searchIcon}

            onClick={() => {
              localStorage.setItem('circleMemberType', circleMemberType)
              history.push({
                pathname: '/sect/searchSects'
              });
            }}
          />
          <img src={setIcon} alt='' onClick={
            () => {
              dispatch!({
                type: 'sectSetting/save',
                payload: {
                  sectInfo: {
                    ...sectInfo,
                    mktCircleMemInstId,
                  },
                }
              });
              setTimeout(() => {
                history.push({
                  pathname: '/sect/sectSetting',
                  query: {
                    circleMemberType
                  }
                })
              }, 100);
            }
          } />
        </div>

      </div>
      <div className={styles.cardContent}>
        <div className={styles.headInfo}>
          <img src={sectsImage || defaultIcon} alt='' />
          <div className={styles.rightInfo}>

            <div className={styles.headContent}>
              <div className={styles.headName}>{marketingCircleInstName}</div>
              <div>
                <img src={memberBlue} alt='' style={{ marginTop: '-10px' }} />
                <span className={styles.currentNum}>{circleTotal}</span>/{circleSize}
              </div>

            </div>

            <div className={styles.des}>掌门：{memberName}</div>
            <div className={styles.des}>简介：{circleInstDesc}</div>
          </div>
        </div>

        {gridViewData.length <= 1 && circleMemberType === '1' ? <div className={styles.btnContent}>
          <div onClick={cancelCreateCircle}><span className={styles.memberBtn}>取消创建</span></div>


          <div className='copyText' data-clipboard-text={copyUrl} onClick={(event) => handleCopyClick(copyUrl, event)}><span className={styles.creatHead}><img src={inviteIcon} alt='' className={styles.inviteBtn} />邀请成员</span></div>
        </div> :

          <div className={styles.myHeadInfo}>
            {circleMemberType === '1' ? '' : <div style={{ height: '104px', width: '104px' }}></div>}
            <div className={styles.coupon} onClick={() => {
              dispatch!({
                type: 'allMember/save',
                payload: {
                  circleInstId: marketingCircleInstId,
                  accNbre,
                  isOwner: circleMemberType === '1',
                  unclaimedId: '', // 清空
                }
              });
              history.push({
                pathname: '/sect/allMember'
              });
            }}>
              <div>{circleTotal}

              </div>
              <span>成员</span>
            </div>
            <div className={styles.coupon}>
              <div onClick={goToCouponPage}>{marketInfo.couponUnclaimedCount}
              </div>
              <span>流量券</span>
            </div>

            {circleMemberType === '1' ? <div className='copyText' data-clipboard-text={copyUrl} onClick={(event) => handleCopyClick(copyUrl, event)}>
              <div className={styles.inviteBtn}> <img src={inviteIcon} />邀请成员</div>

            </div> : ''}


          </div>

        }

        {

          circleMemberType === '1' ? <div className={styles.cardCell}>
            <div><img src={msgIcon} alt='' /><span className={styles.leftSpan}>您有{applyingTotal}个入派申请需要审核</span></div>
            <div onClick={() => {
              dispatch!({
                type: 'intoSectAudit/save',
                payload: {
                  circleInstId: marketingCircleInstId,
                }
              });
              history.push({
                pathname: '/sect/intoSectAudit'
              });
            }}><span className={styles.rigthSpan}>查看</span><img src={moreIcon} alt='' /></div>

          </div> : ''
        }

      </div>
    </div>

    <div className={circleMemberType === '1' ? styles.headOtherInfo : styles.otherInfo}>
      <div className={styles.contentTitle}>
        <div>
          <div className={styles.titleIcon}></div>
          <div className={styles.titleText}>累计消费金额</div>
          <div className={styles.numText}>{marketInfo.accMoney || 0}</div><span className={styles.unitText}>元</span>
        </div>
        <div>
          <span className={styles.rightText} onClick={goToCouponPage}>还有{marketInfo.couponUnclaimedCount}张流量券未领取</span><img src={rightIcon} alt='' />
        </div>
      </div>
      <div onClick={goToCouponPage}>
        <RingCumulativeCost accMoney={marketInfo.accMoney} />
      </div>
      <div className={styles.contentTitle}>
        <div>
          <div className={styles.titleIcon}></div>
          <div className={styles.titleText}>圈子成员(<span className={styles.rigthSpan}>{circleTotal}</span>/{circleSize})</div>
        </div>
      </div>

      <div className={styles.memberGrid}>

        <Grid
          data={gridViewData}
          onClick={_el => {
            if (_el.text === '邀请') {
              // shareCircle();
            }
          }}
          columnNum={6}
          hasLine={false}
          activeStyle={false}
          renderItem={(item) => (<div className={item?.text === '邀请' ? 'copyText' : ''} data-clipboard-text={copyUrl}>
            <img src={item?.icon} alt='' className={styles.gridIcon} />
            <div className={styles.gridText}>{item?.text}</div>
          </div>)}
        />

      </div>

    </div>
  </div >;
};

export default connect(({ headSect }: { headSect: HeadSectModelState; }) => ({ headSect }))(HeadSectPage);
