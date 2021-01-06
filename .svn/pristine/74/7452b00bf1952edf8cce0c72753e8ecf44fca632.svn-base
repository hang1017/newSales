import React, { FC, useEffect, useState } from 'react';
//
import {
  GoodsDetailModelState,
  DeliveryAddrModelState,
  ConnectProps,
  connect,
  history,
  router,
  dropByCacheKey,
} from 'alita';
import { Carousel, Toast } from 'antd-mobile';
import { putHoneyGoodsDetail } from '@/utils';
import Utils from '@/utils/tool';
import FootBlock from '@/components/FootBlock';
import ActivityAlert from '@/components/ActivityAlert';
import CommonSelectAlert from '@/components/CommonSelectAlert';
import ProInfoAlert from '@/components/ProInfoAlert';
import CouponsAlertView from '@/components/CouponsAlertView';
import OrderMaskView from '@/components/OrderMaskView';
import IconCustomer from '@/assets/img/goodsdetail/goodsdetail-customer.png';
import goodsCenterIcon from '@/assets/img/goodsdetail/goods_center.png';
import myIcon from '@/assets/img/goodsdetail/my.png';
import toOrderIcon from '@/assets/img/goodsdetail/to_order.png';

import ActionListView, {
  ActionListViewClickType,
  isTypeCheck,
  orderAttrsType,
} from './components/ActionListView';
import ShopInfo from './components/ShopInfo';
import IGoodsDetail from './components/IGoodsDetail';
import styles from './index.less';

interface PageProps extends ConnectProps {
  goodsDetail: GoodsDetailModelState;
  deliveryAddr: DeliveryAddrModelState;
}

const GoodsDetailPage: FC<PageProps> = ({ goodsDetail, deliveryAddr, dispatch, location }) => {
  const [navActiveIndex, setNavActiveIndex] = useState(0);
  const [showActivity, setShowActivity] = useState(false);
  const [showAddressAlert, setShowAddressAlert] = useState(false);
  const [addressIndex, updateAddressIndex] = useState(0);
  const [buyVisiable, setBuyVisiable] = useState(false);
  const [couponsVisiable, setCouponsVisiable] = useState(false);
  const [loginSliderLeft, setLoginSliderLeft] = useState(false);
  const [flag, updateFlag] = useState('0');
  const [showSelectNum, setShowSelectAccNumAlert] = useState(false);
  const [current, updateCurrent] = useState(1);

  const {
    goodsName,
    saleCount,
    goodsInfoAppText,
    lowestPrice,
    highestPrice,
    goodsPictureList,
    saleList,
    storeId,
    labelData,
    commentData,
    commentTotal,
    goodsDesc,
    orderAttrs = [],
    attrQueryCOList = [],
    defaultAddr = '',
    selectPhoneinfo,
    cartNum,
    coupons,
  } = goodsDetail;
  const { addressLists = [] } = deliveryAddr;
  const { goodsId, noDropByCacheKey = '' } = location.query;
  // const  goodsId =1001;
  // Coupons
  // 这里发起了初始化请s求
  useEffect(() => {
    if (location.pathname === '/shopProcess/goodsDetail') {
      // 清除 提交订单的keepalive
      dropByCacheKey('/bili/commitorder');

      // 清除选择号码页面的keepalive
      dropByCacheKey('/selectnumber');

      if (noDropByCacheKey !== '1') {
        // 清除客服模块的keepalive
        dropByCacheKey('/customerhoney');

        // 清空客服模块model 数据
        dispatch!({
          type: 'customerHoney/save',
          payload: {
            chatList: [],
          },
        });
      }

      // 清除选择号码页面的model 数据
      dispatch!({
        type: 'selectNumber/save',
        payload: {
          phoneData: {},
        },
      });

      // if (window.socket) window.socket.disconnect();
    }
  }, [location.pathname]);
  const eventListenerScroll = () => {
    const el = document.getElementById('goodsDetailContainer');
    const el1 = document.getElementById('$goods0')!.offsetTop;
    const el2 = document.getElementById('$goods1')!.offsetTop;
    const el3 = document.getElementById('$goods2')!.offsetTop;

    el?.addEventListener('scroll', (e) => {
      const scrollTop = el.scrollTop + 45 * devicePixelRatio;

      if (scrollTop >= el1 && scrollTop < el2) {
        setNavActiveIndex(0);
      } else if (scrollTop >= el2 && scrollTop < el3) {
        setNavActiveIndex(1);
      } else if (scrollTop >= el3) {
        setNavActiveIndex(2);
      }

      if (scrollTop >= 750 * devicePixelRatio) {
        setLoginSliderLeft(true);
      } else {
        setLoginSliderLeft(false);
      }
    });
  };

  const switchToActiveIndex = (index: number, id?: string) => {
    if (index !== navActiveIndex) {
      const element = document.getElementById(`$goods${index}`);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const addCartCanNext = () => {
    if (isTypeCheck(orderAttrsType.mainPhone, orderAttrs)) {
      if (selectPhoneinfo.accNum && selectPhoneinfo.lanId) {
        return true;
      }
      setBuyVisiable(false);
      if (!selectPhoneinfo.lanId) {
        Toast.show('请先选择号码归属地！', undefined, false);
        return false;
      }
      setShowSelectAccNumAlert(true);
      setTimeout(() => {
        Toast.show('请选择号码！', undefined, false);
      }, 300);
      return false;
    }
    return true;
  };
  const addCartClick = (skuInfo, proNum) => {
    if (!addCartCanNext()) {
      return;
    }
    dispatch!({
      type: 'goodsDetail/addToCart',
      payload: {
        goodsList: [
          {
            checked: 1,
            goodsId: goodsId,
            quantity: proNum,
            skuId: skuInfo.skuId,
            storeId: storeId,
            accNum: selectPhoneinfo.accNum,
            cartNumRelCO: {
              ...selectPhoneinfo,
              phoneNum: selectPhoneinfo.accNum,
            },
          },
        ],
        memberId: (window as any).memberId,
      },
    }).then((isSuccess) => {
      if (isSuccess) {
        setBuyVisiable(false);
        dispatch!({
          type: 'goodsDetail/getMemberCartNum',
          payload: {
            memberId: (window as any).memberId,
          },
        });
        Toast.info('添加成功，在购物车等亲');
      }
    });
  };

  /**
   * 跳转到商品评论的页面
   */
  const toAllComment = () => {
    dispatch!({
      type: 'productReview/save',
      payload: {
        goodId: goodsId,
      },
    });
    history.push({
      pathname: '/shopProcess/productReview',
    });
  };
  const commitOrder = (skuInfo, proNum) => {
    // console.log(goodsDetail.orderAttrs, 'orderAttrs');
    console.log('立即购买' + JSON.stringify(skuInfo) + 'proNum:' + proNum);
    setBuyVisiable(false);
    // dispatch!({
    //   type: 'commitOrder/saveProInfo',
    //   payload: {
    //     proInfo: {
    //       skuInfo: {
    //         ...skuInfo,
    //         goodsName,
    //       },
    //       proNum,
    //       goodsId,
    //       orderAttrs: goodsDetail.orderAttrs,
    //       goodsDetail,
    //     },
    //   },
    // });
    history.push({
      pathname: '/bili/commitOrder',
      query: {
        proInfo: JSON.stringify({
          skuInfo: {
            ...skuInfo,
            goodsName,
          },
          proNum,
          goodsId,
          orderAttrs: goodsDetail.orderAttrs,
          goodsDetail,
        }),
      },
    });

    // dispatch!({
    //   type: 'goodsDetail/commitOrder',
    //   payload: {
    //     memberId: (window as any).memberId,
    //     storeList: [
    //       {
    //         goodsList: [
    //           {
    //             accNum: selectPhoneinfo.accNum,
    //             goodsId: goodsId,
    //             skuId: skuInfo.skuId,
    //             quantity: proNum,
    //             cartNumRelCO: {
    //               ...selectPhoneinfo,
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // });
  };

  const actionListViewClick = (type) => {
    switch (type) {
      case ActionListViewClickType.broughtVolume:
        setCouponsVisiable(true);
        break;
      case ActionListViewClickType.clickSaleAttr:
        // if (addCartCanNext()) {
        setBuyVisiable(true);
        // }
        break;
      case ActionListViewClickType.activityClick:
        setShowActivity(true);
        break;
      case ActionListViewClickType.chooseAddree:
        if ((window as any).isLogin) {
          setShowAddressAlert(true);
        } else {
          history.push({
            pathname: '/login',
          });
        }
        break;
      case ActionListViewClickType.chooseMainNum:
        setShowSelectAccNumAlert(true);
        break;
      default:
        break;
    }
  };
  /**
   * 校验用户是否是登录的状态，加入购物车和立即购买都需要是登录的状态
   */
  const isLoginState = () => {
    let { isLogin } = window as any;
    if (!isLogin) {
      Toast.info('请先登录', 3);
      history.push({
        pathname: '/login',
      });
      return false;
    }
    return true;
  };
  /**
   *
   */
  const jumpPage = (pathname: string) => {
    history.push({
      pathname,
    });
  };

  // 前往客服小蜜事件
  const goToHoney = () => {
    putHoneyGoodsDetail({ ...goodsDetail, goodsId });
    router.push({
      pathname: '/customerHoney',
    });
  };

  return (
    <div className={styles.center}>
      {/*  <div
      className={styles.orderSearchBtn}
      onClick={() => {
        // if (!localStorage.getItem('tokenCode')) {
        router.push({
          pathname: '/bili/orderSearch',
        });
      }}
    >
      订单查询
    </div> */}

      <div
        className={styles.main}
        id="goodsDetailContainer"
        onScroll={(e) => {
          eventListenerScroll();
        }}
      >
        <div id="$goods0" className={styles.shopImgs}>
          <Carousel
            autoplay={false}
            afterChange={(current: number) => {
              updateCurrent(current + 1);
            }}
          >
            {goodsPictureList.map((item: any) => {
              if (item.filePathInServer) {
                return (
                  <div
                    className={styles.carouselImg}
                    style={{ backgroundImage: `url(${item.filePathInServer})` }}
                  ></div>
                );
              }
            })}
          </Carousel>
          <div className={styles.currentPage}>
            {current}/{goodsPictureList.length}
          </div>
        </div>
        <ShopInfo
          data={{
            goodsName,
            saleCount,
            lowestPrice,
            highestPrice,
            goodsDesc,
          }}
        />
        <ActionListView
          attrQueryCOList={attrQueryCOList}
          addrName={defaultAddr}
          accNum={selectPhoneinfo.accNum}
          lanId={selectPhoneinfo.lanId}
          dispatch={dispatch}
          orderAttrs={orderAttrs}
          coupons={coupons}
          selectCouponsName={coupons.length && coupons[0].promName}
          onClick={(type) => {
            actionListViewClick(type);
          }}
          lanIdCallBack={(lanId) => {
            selectPhoneinfo.lanId = lanId;
            dispatch!({
              type: 'goodsDetail /save',
              payload: {
                selectPhoneinfo: JSON.parse(JSON.stringify(selectPhoneinfo)),
              },
            });
          }}
        />
        <div id="$goods1">
          {/* <CommentView
            labelData={labelData}
            commentData={commentData}
            total={commentTotal}
            onItemClick={toAllComment}
            onMoreClick={toAllComment}
            onLabelClick={toAllComment}
          /> */}
        </div>
        <div id="$goods2">
          <IGoodsDetail goodsInfoAppText={goodsInfoAppText} />
        </div>

        <FootBlock />
      </div>
      {/* <div className={styles.footer}>
        <GoodsDetailFooter
          onAddCartClick={() => {
            if (!addCartCanNext()) {
              return;
            }
            if (isLoginState()) {
              setBuyVisiable(true);
              console.log('添加购物车');
            }
          }}
          onCartClick={() => {
            updateFlag('0');
            if (!isLoginState()) {
              return;
            }
            history.push({
              pathname: '/shopProcess/shopCart',
            });
            console.log('购物车');
          }}
          onBuyClick={() => {
            if (addCartCanNext()) {
              console.log('立即购买');
              setBuyVisiable(true);
              updateFlag('1');
            }
          }}
          onCustomerClick={() => {
            console.log('客服');
          }}
          cartNum={cartNum}
        />
      </div> */}

      <div className={styles.footer}>
        <div className={styles.leftBlock}>
          <div onClick={goToHoney}>
            <img src={IconCustomer} />
            <div>客服</div>
          </div>
          <div
            onClick={() => {
              jumpPage('/');
            }}
          >
            <img src={goodsCenterIcon} className={styles.alignImg} />
            <div>商品中心</div>
          </div>

          <div
            onClick={() => {
              jumpPage('/personCenter/my');
            }}
          >
            <img src={myIcon} className={styles.alignImg} />
            <div>个人中心</div>
          </div>
        </div>

        <div
          className={styles.buyBtn}
          onClick={() => {
            // if (addCartCanNext()) {
            //   console.log('立即购买');

            // }

            setBuyVisiable(true);
            updateFlag('1');
          }}
        >
          立即购买
        </div>
      </div>

      <ActivityAlert
        show={showActivity}
        coupons={coupons}
        closeClick={() => {
          setShowActivity(false);
        }}
      />
      {/* {showAddressAlert && (
        <AddressAlert
          addressData={addressLists}
          show={showAddressAlert}
          selectIndex={addressIndex}
          closeClick={() => {
            setShowAddressAlert(false);
          }}
          onSelected={(address, index) => {
            updateAddressIndex(index);
            dispatch!({
              type: 'goodsDetail/save',
              payload: {
                defaultAddr: address,
              },
            });
            setShowAddressAlert(false);
          }}
        />
      )} */}
      <CommonSelectAlert
        dispatch={dispatch}
        isShowNew
        show={showSelectNum}
        closeClick={() => {
          setShowSelectAccNumAlert(false);
        }}
        onComfirm={(item, isShowNew) => {
          const datas = {
            ...item,
            accNum: item.value,
            isNew: isShowNew,
            lanId: selectPhoneinfo.lanId,
          };
          dispatch!({
            type: 'goodsDetail/save',
            payload: {
              selectPhoneinfo: datas,
            },
          });
          setShowSelectAccNumAlert(false);
        }}
      />
      <ProInfoAlert
        saleList={saleList}
        show={buyVisiable}
        closeClick={() => {
          setBuyVisiable(false);
        }}
        goodsId={goodsId}
        dispatch={dispatch}
        attrQueryCOList={attrQueryCOList}
        flag="1"
        buyNowClick={(skuInfo, proNum) => {
          setBuyVisiable(true);
          updateFlag('1');
          commitOrder(skuInfo, proNum);
        }}
        addToShop={(skuInfo, proNum) => {}}
        updateAttrList={(data) => {
          dispatch!({
            type: 'goodsDetails/save',
            payload: {
              attrQueryCOList: data,
            },
          });
        }}
      />
      <CouponsAlertView
        show={couponsVisiable}
        closeClick={() => {
          setCouponsVisiable(false);
        }}
      />
      {/* <LoginMaskView show sliderLeft={loginSliderLeft} /> */}
      <OrderMaskView />
      {/* <img
        src={myOrderIcon}
        className={styles.orderimg}
        onClick={() => {
          (window as any).isLogin = true;
          if ((window as any).isLogin) {
            history.push({
              pathname: '/order/myOrder',
            });
          } else {
            history.push({
              pathname: '/login',
            });
          }
        }}
      /> */}
    </div>
  );
};

export default connect(
  ({
    goodsDetail,
    deliveryAddr,
  }: {
    goodsDetail: GoodsDetailModelState;
    deliveryAddr: DeliveryAddrModelState;
  }) => ({
    goodsDetail,
    deliveryAddr,
  }),
)(GoodsDetailPage);
