import React, { FC, useEffect, useState } from 'react';
import { MyPageModelState, ConnectProps, connect, history, dropByCacheKey } from 'alita';
import { putHoneyGoodsDetail, resetIframeViewPort, backIframeViewPort } from '@/utils';
import { OtherCustomer } from '@/pages/customer/components';
import rightIcon from '@/assets/right.png';
import logoIcon from '@/assets/img/customer/my/toux.png';
import setIcon from '@/assets/img/customer/my/setting.png';
import Utils from '@/utils/tool';
import addrIcon from '@/assets/img/customer/my/addr.png';
import amoutcon from '@/assets/img/customer/my/amout.png';
import invoiceIcon from '@/assets/img/customer/my/invoice.png';
import serviceIcon from '@/assets/img/customer/my/service.png';
import msgIcon from '@/assets/img/customer/my/msg.png';
import orderIcon from '@/assets/img/customer/my/order.png';
import selectedIcon from '@/assets/img/customer/my/selected.png';
import whiteBack from '@/assets/img/back_white.png';
import smallLogoIcon from '@/assets/img/customer/my/logo_small.png';
import qydhIcon from '@/assets/img/customer/my/qydh.png';
import ylcxIcon from '@/assets/img/customer/my/ylcx.png';
import yueIcon from '@/assets/img/customer/my/yue.png';
import sectIcon from '@/assets/img/customer/my/sect.png';
import phoneStatusIcon from '@/assets/img/customer/my/phone_status.png';
import detailPhoneIcon from '@/assets/img/customer/detailPhone.png';
import phoneIcon from '@/assets/img/customer/phone.png';
import refundIcon from '@/assets/img/customer/my/refund.png';

import ActionSheet from '@/components/ActionSheet';
import SingleBtn from '@/pages/customer/components/SingleBtn';
import { Grid, Modal } from 'antd-mobile';
import CumulativeCostCard from '@/components/CumulativeCostCard';
import { sysParams } from '@/utils/AppContext';

import styles from './index.less';

interface PageProps extends ConnectProps {
  myPage: MyPageModelState;
}
//

const MyPagePage: FC<PageProps> = ({ myPage, dispatch, location }) => {
  const [memberInfo, setMemberInfo] = useState({});
  const [actionState, updateAcState] = useState(false);
  const [selectPhone, updatePhone] = useState('');
  const [showGainModal, UpdateShowGainModal] = useState(false);
  const [customerVisible, setCustomerVisible] = useState(false);
  const [urlType] = useState(location.query?.type || '');
  const source = localStorage.getItem('source') || '';
  const [numberInstId, updateNumberInstId] = useState('');
  const [phoneStatusShow, updateStatuShow] = useState(false);
  // const [sectFlag, updateSectFlag] = useState(false);

  const [listData, updateList] = useState([
    {
      icon: orderIcon,
      text: '我的订单',
      pathname: '/order/myOrder',
      query: {
        activeIndex: 0,
      },
    },
    {
      icon: amoutcon,
      text: '电信业务',
      pathname: '/personCenter/electronicBusiness',
    },
    {
      icon: addrIcon,
      text: '我的地址',
      pathname: '/customer/cDeliveryAddr',
      query: {
        isMyPage: '1',
      },
    },
    {
      icon: invoiceIcon,
      text: '我的发票',
      pathname: '/personCenter/invoice',
    },
    {
      icon: yueIcon,
      text: '余额查询',
      pathname: '/customer/qryBalance',
    },
    {
      icon: ylcxIcon,
      text: '用量查询',
      pathname: '/personCenter/quantityQuery',
    },
    {
      icon: msgIcon,
      text: '客服售后',
      pathname: '/customerHoney',
    },
    {
      icon: serviceIcon,
      text: '我的服务',
      pathname: '/customer/myServices',
    },
    {
      icon: phoneStatusIcon,
      text: '号码状态',
      pathname: 'phoneStatus',
    },
    {
      icon: refundIcon,
      text: '退款/售后',
      pathname: 'refund',
    },
  ]);

  const listenFun = (e: any) => {
    const { type = '', goodsId = 0, orderId = 0 } = e.data;
    switch (type) {
      case 'baby':
        backIframeViewPort();
        setCustomerVisible(false);
        history.push({
          pathname: '/customer/cGoodsDetails',
          query: {
            goodsId,
          },
        });
        dispatch!({
          type: 'cGoodsDetails/query',
        });
        break;
      case 'order':
        backIframeViewPort();
        history.push({
          pathname: '/order/orderDetail',
          query: {
            orderId,
          },
        });
        break;
      default:
        break;
    }
  };

  /**
   * 获取系统参数
   */
  const getH5ConfigurationApi = () => {
    dispatch!({
      type: 'payConfirm/getH5ConfigurationModel',
      payload: {
        propertyName: sysParams.sectParams,
      },
    }).then((flag: boolean) => {
      if (flag) {
        updateList([
          ...listData,
          {
            icon: sectIcon,
            text: '我的圈子',
            pathname: 'menpai',
          },
        ]);
      }
    });
  };

  // 这里发起了初始化请求
  useEffect(() => {
    let newList = [...listData];
    if (source !== 'bilibili') {
      newList.push({
        icon: qydhIcon,
        text: '权益兑换',
        pathname: '/personCenter/discountCounpon',
      });
      updateList(newList);
    }

    dispatch!({
      type: 'myPage/getH5ConfigurationModel',
      payload: {
        propertyName: sysParams.sectParams,
      },
    }).then((list: any[]) => {
      console.log(list);
      if (list && list.length) {
        newList.push(...list);
        updateList(newList);
      }
    });

    dispatch!({
      type: 'my/queryMemberLevel',
    }).then((flag: boolean) => {
      if (!flag) return;
      dispatch!({
        type: 'myPage/qryBalance',
        payload: {
          balanceTypeId: '1',
        },
      });
      dispatch!({
        type: 'myPage/qryRights',
        payload: {
          mcInstState: '1000', // 1000-待使用
        },
      });
      dispatch!({
        type: 'myPage/numberList',
        // eslint-disable-next-line no-shadow
      }).then(({ selectPhone, numberInstId }) => {
        updatePhone(selectPhone);
        updateNumberInstId(numberInstId);
        if (selectPhone) {
          dispatch!({
            type: 'myPage/qryMyConsumeUsageAll',
            payload: {
              mobile: selectPhone,
            },
          });
          dispatch!({
            type: 'myPage/instQryModel',
            payload: {
              accNbre: selectPhone,
              extValues: {},
              storeId: 1006,
            },
          });

          const stausData = listData.filter((item: any) => item.pathname === 'phoneStatus');
          if (stausData.length) {
            return false;
          }
          newList.push({
            icon: phoneStatusIcon,
            text: '号码状态',
            pathname: 'phoneStatus',
          });
          console.log('号码状态');
          updateList(newList);
        }
      });
    });

    const member = Utils.getStorageForJson('memberInfo') || {};
    setMemberInfo(member);
    // if (window.socket) window.socket.disconnect();
    // 清除客服模块的keepalive
    dropByCacheKey('/customerhoney');

    // 清空客服模块model 数据
    dispatch!({
      type: 'customerHoney/save',
      payload: {
        chatList: [],
        chatPage: 1,
        hasMore: true,
      },
    });
    return () => {
      window.removeEventListener('message', listenFun);
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const {
    amount,
    numberList,
    remain,
    remainUnit,
    rightsGoodsCouponNum,
    cumulativeInfo,
    numberStatusList,
  } = myPage;
  const itemClick = (el: Object) => {
    const { pathname = '', query = {} } = el;

    switch (pathname) {
      case '/customerHoney':
        putHoneyGoodsDetail({});
        dispatch!({
          type: 'customerHoney/qryOnlineSourceModels',
        }).then((res: any) => {
          if (res === 'csms') {
            history.push({
              pathname,
              query,
            });
          } else {
            window.addEventListener('message', listenFun);
            setCustomerVisible(true);
            setTimeout(() => {
              resetIframeViewPort();
            }, 100);
          }
        });
        break;
      case 'menpai':
        if (numberList.length) {
          // 如果不存在号码列表

          dispatch!({
            type: 'normalSect/sectMemberList',
            payload: {
              // numberInst: numberInstId, // 掌门、
              accNbre: selectPhone,
              couponFlag: true,
              current: 1,
              size: 10,
            },
          }).then((res: any) => {
            const { total, records = [] } = res;
            localStorage.setItem('accNbre', selectPhone);
            if (`${total}` === '0') {
              dispatch!({
                type: 'createSect/save',
                payload: {
                  accNbre: selectPhone,
                  numberInstId,
                },
              });
              dispatch!({
                type: 'normalSect/save',
                payload: {
                  accNbre: selectPhone,
                },
              });
              history.push({
                pathname: '/sect/normalSect',
              });
            } else {
              dispatch!({
                type: 'headSect/save',
                payload: {
                  userInfo: records[0] || {},
                  accNbre: selectPhone,
                },
              });
              setTimeout(() => {
                history.push({
                  pathname: '/sect/headSect',
                });
              }, 100);
            }
          });
        } else {
          Modal.alert(
            '',
            '您还不是“青年一派”用户您可以下单青年一派卡号加入青年一派后参与活动哦～',
            [
              { text: '取消', onPress: () => {} },
              {
                text: '去下单',
                onPress: () => {
                  history.push({
                    pathname: '/customer/indexList',
                  });
                },
              },
            ],
          );
        }
        break;
      case 'phoneStatus': // 状态展示号码
        dispatch!({
          type: 'myPage/qryMyNumberInstList',
        }).then(() => {
          updateStatuShow(true);
        });

        break;
      case 'refund': // 退款/售后
        history.push({
          pathname: '/afterSale/afterSaleList',
        });
        break;
      case 'livingCheck':
        if (wx) {
          console.log(wx);
          wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
              // alert("是小程序2")
              // 如果当前是小程序环境
              wx.miniProgram.navigateTo({
                url: `/pages/bioassay/index?`,
              });
            }
          });
        }
        break;
      default:
        history.push({
          pathname,
          query,
        });
        break;
    }
  };
  const renderListView = () => {
    return listData.map((item) => {
      const { key, icon, text } = item;
      return (
        <div
          className={styles.listCell}
          key={key}
          onClick={() => {
            itemClick(item);
          }}
        >
          <div>
            <img src={icon} alt="" className={styles.leftIcon} />
            <span>{text}</span>
          </div>
          <img src={rightIcon} alt="" />
        </div>
      );
    });
  };
  /**
   * 根据号码查询流量余额
   */
  const qryMyConsumeUsageAll = () => {
    if (selectPhone) {
      dispatch!({
        type: 'myPage/qryMyConsumeUsageAll',
        payload: {
          mobile: selectPhone,
        },
      }).then(() => {
        updateAcState(false);
      });
    }
  };
  /**
   * 根据号码查询促销活动实例
   */
  const qryCumulativeInst = () => {
    if (selectPhone) {
      dispatch!({
        type: 'myPage/instQryModel',
        payload: {
          accNbre: selectPhone,
          extValues: {},
          storeId: 1006, // 写死1006
        },
      });
    }
  };

  /**
   * 更换号码后的数据更新
   */
  const clickUpdateAll = () => {
    updateAcState(false);
    if (selectPhone) {
      qryMyConsumeUsageAll();
      qryCumulativeInst();
    }
  };

  /**
   * 头像点击改变事件
   * @param e
   */
  const fileChange = (e: { target: { files?: {} | undefined } }) => {
    const { files = {} } = e.target;
    if (Object.keys(fileas).length === 0) return;
    dispatch!({
      type: 'my/modHeaderPortrait',
      payload: {
        file: files[0],
      },
    }).then((flag: boolean = false) => {
      // 如果上传接口执行成功
      // 替换 Storage 的 memberInfo 数据，以及页面上的 memberInfo 数据
      if (flag) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = function (ie) {
          const newMemberInfo = JSON.parse(JSON.stringify(memberInfo));
          setMemberInfo({ ...newMemberInfo, profilePhoto: ie?.target?.result }); // 替换页面数据
          Utils.setStorageForJson('memberInfo', {
            ...newMemberInfo,
            profilePhoto: ie?.target?.result,
          }); // 替换全局数据
        };
      }
    });
  };
  const goToPage = (pathname) => {
    history.push({
      pathname,
    });
  };

  // 关闭弹框且更新兑换券
  const gainCouponCallback = () => {
    UpdateShowGainModal(false);
    qryCumulativeInst();
  };

  // 点击领取满赠券
  const cumulativeClick = (accCInstId: any = 1001) => {
    if (selectPhone) {
      dispatch!({
        type: 'myPage/receiveCouponUnclaimedModel',
        payload: {
          accNbre: selectPhone,
          accCInstId,
        },
      }).then(() => {
        UpdateShowGainModal(true);
      });
    }
  };

  return (
    <>
      <div className={styles.myPage} style={{ height: document.documentElement.clientHeight }}>
        <div className={styles.topInfo}>
          <div className={styles.headInfo}>
            <div className={styles.backIcon}>
              <img
                src={whiteBack}
                alt=""
                onClick={() => {
                  if (urlType === 'index') {
                    dispatch!({
                      type: 'indexList/goToIndexList',
                    });
                  } else {
                    history.goBack();
                  }
                }}
              />
            </div>
            <div className={styles.pageTitle}>我的</div>
            <div className={styles.backIcon}></div>
          </div>
          <div className={styles.myBaseInfo}>
            <div className={styles.leftContent}>
              <div className={styles.toux}>
                <img src={memberInfo?.profilePhoto || logoIcon} />
                {/* <input
                  className={styles.touxInput}
                  type='file'
                  name='file'
                  accept='image/*'
                  onChange={fileChange}
                /> */}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>
                  {selectPhone}
                  {numberList.length > 1 ? (
                    <span
                      className={styles.changePhone}
                      onClick={() => {
                        updateAcState(true);
                        dispatch!({
                          type: 'myPage/numberList',
                        });
                      }}
                    >
                      切换号码
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className={numberList.length === 0 ? styles.noPhone : styles.userPhone}>
                  {memberInfo.nickname || '中国电信-青年一派'}
                </div>
              </div>
            </div>
            <img
              src={setIcon}
              alt=""
              onClick={() => {
                history.push({
                  pathname: '/personCenter/editPersonalInfo',
                  query: {
                    type: urlType,
                  },
                });
              }}
              className={styles.settingIcon}
            />
          </div>

          <div className={styles.accountInfo}>
            <div
              onClick={() => {
                goToPage('/customer/qryBalance');
              }}
            >
              <div className={styles.cellTitle}>账户余额(元)</div>
              <div className={styles.cellValue}>{amount}</div>
            </div>

            <div
              onClick={() => {
                goToPage('/personCenter/quantityQuery');
              }}
            >
              <div className={styles.cellTitle}>剩余流量({remainUnit})</div>
              <div className={styles.cellValue}>{remain}</div>
              {
                // <div className={styles.effDate}>有效期至2020.11.25</div>
              }
            </div>

            {source === 'bilibili' ? (
              ''
            ) : (
              <div
                onClick={() => {
                  goToPage('/personCenter/discountCounpon');
                }}
              >
                <div className={styles.cellTitle}>兑换券(张)</div>
                <div className={styles.cellValue}>{rightsGoodsCouponNum || 0}</div>
                <img alt="" src={smallLogoIcon} className={styles.smallIcon} />
              </div>
            )}
          </div>
        </div>
        {
          // <div className={styles.listView}>{renderListView()}</div>
        }
        <div className={styles.menuContent}>
          {numberList.length ? (
            <CumulativeCostCard
              cumulativeInfo={cumulativeInfo}
              cumulativeClick={cumulativeClick}
              gainCouponCallback={gainCouponCallback}
              showGainModal={showGainModal}
            />
          ) : (
            ''
          )}
          <Grid data={listData} columnNum={4} onClick={itemClick} hasLine={false} />
        </div>
      </div>
      <ActionSheet
        title="切换号码"
        show={actionState}
        heigth={document.documentElement.clientWidth}
        closeClick={() => {
          updateAcState(false);
        }}
      >
        <div className={styles.actionFootBtn}>
          <div className={styles.phoneList}>
            {numberList.map((item) => {
              const { accNbr, numberInstId } = item;
              return (
                <div
                  className={accNbr === selectPhone ? styles.selected : styles.normal}
                  onClick={() => {
                    updateNumberInstId(numberInstId);
                    updatePhone(accNbr);
                    dispatch!({
                      type: 'myPage/save',
                      payload: {
                        userSelectPhone: accNbr,
                      },
                    });
                  }}
                >
                  <div>{accNbr}</div>
                  {accNbr === selectPhone ? (
                    <img className={styles.selectedIcon} alt="" src={selectedIcon} />
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
          </div>
          <SingleBtn text="确定" canClick onClick={clickUpdateAll} />
        </div>
      </ActionSheet>
      <Modal visible={customerVisible}>
        <OtherCustomer
          close={() => {
            setCustomerVisible(false);
            backIframeViewPort();
          }}
        />
      </Modal>

      <ActionSheet
        title="号码状态"
        show={phoneStatusShow}
        heigth={document.documentElement.clientWidth}
        closeClick={() => {
          updateStatuShow(false);
        }}
      >
        {numberStatusList.map((item) => {
          const { accNum, stopFlag, stopTypeNames } = item;
          let stopList = [];
          if (stopTypeNames) {
            if (stopTypeNames.indexOf(',') > -1) {
              stopList = stopTypeNames.split(',');
            } else {
              stopList.push(stopTypeNames); // 只含有一个的情况下
            }
          }
          return (
            <>
              {stopList.length > 2 ? (
                <div>
                  <div className={styles.phoneStatusCell}>
                    <img src={!stopFlag ? detailPhoneIcon : phoneIcon} alt="" />
                    <div className={styles.normalPhone}>{accNum}</div>
                  </div>

                  <div style={{ borderBottom: 'solid 1px #cccccc' }}>
                    {stopList.map((item) => {
                      return <span className={styles.stopStauts}>{item}</span>;
                    })}
                  </div>
                </div>
              ) : (
                <div className={styles.phoneStatusCell}>
                  <img src={!stopFlag ? detailPhoneIcon : phoneIcon} alt="" />
                  <div className={styles.normalPhone}>{accNum}</div>

                  <div>
                    <span className={!stopFlag ? styles.normalStatus : styles.stopStauts}>
                      {!stopFlag
                        ? '正常'
                        : stopList.map((item) => {
                            return <span className={styles.stopStauts}>{item}</span>;
                          })}
                    </span>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </ActionSheet>
    </>
  );
};

export default connect(({ myPage }: { myPage: MyPageModelState }) => ({ myPage }))(MyPagePage);
