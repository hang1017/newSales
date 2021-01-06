import React, { FC, useEffect, useState } from 'react';
import {
  CGoodsDetailsModelState,
  ConnectProps,
  connect,
  history,
  IndexListModelState,
  dropByCacheKey,
  setPageNavBar,
} from 'alita';
import rightMoreIcon from '@/assets/img/rigth_more.png';
import { Carousel, Toast, Modal } from 'antd-mobile';
import { OtherCustomer } from '@/pages/customer/components';
import {
  getSkuGoodsDetail,
  putHoneyGoodsDetail,
  backIframeViewPort,
  resetIframeViewPort,
} from '@/utils';
import IGoodsDetail from '@/pages/shopProcess/goodsDetail/components/IGoodsDetail';
import Utils from '@/utils/tool';
import addIcon from '@/assets/img/customer/add.png';
import CFootBlock from '../components/CFootBlock';
import CactivityAlert from '../components/CactivityAlert';
import { CartModal, ProInfoAlert } from '../components';

import styles from './index.less';

interface PageProps extends ConnectProps {
  cGoodsDetails: CGoodsDetailsModelState;
  indexList: IndexListModelState;
}

const CGoodsDetailsPage: FC<PageProps> = ({ cGoodsDetails, indexList, dispatch, location }) => {
  const [current, updateCurrent] = useState(1);
  const [cartVisible, setCartVisible] = useState<boolean>(false); // 购物车弹窗标识
  const [showActivity, setShowActivity] = useState(false);
  const [cartNum, setCartNum] = useState(0);
  const [skuGoodsDetail] = useState<any>(getSkuGoodsDetail());
  const [skuVisible, setSkuVisible] = useState<boolean>(false); // 选择属性的弹框
  const [memberInfo] = useState(Utils.getStorageForJson('memberInfo'));
  const [customerVisible, setCustomerVisible] = useState(false);

  const { noDropByCacheKey = '', goodsId = '', type = '' } = location.query;

  const listenFun = (e: any) => {
    const { type = '', goodsId = 0, orderId = 0 } = e.data;
    switch (type) {
      case 'baby':
        backIframeViewPort();
        setCustomerVisible(false);
        history.replace({
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

  // 这里发起了初始化请求
  useEffect(() => {
    // 清空订单确认页面
    dispatch!({
      type: 'payConfirm/save',
      payload: {
        addressInfo: {},
        orderInfo: {},
        nameAndNo: {},
        choosePhoneTypeValue: undefined,
        invoiceContent: { personal: {}, company: {} },
        phoneInfo: {},
        needShowOrdAddr: '', // 是否需要展示选址的功能
        claimType: [], // 配送方式
      },
    });

    dispatch!({
      type: 'oldUserLoginSuccess/save',
      payload: {
        cartOrderId: '',
        commonAttrData: [],
        commonAttrValue: {},
      },
    });

    dispatch!({
      type: 'cGoodsDetails/query',
    });
    window.addEventListener('message', listenFun);

    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick: () => {
          if (type === 'index') {
            dispatch!({
              type: 'indexList/goToIndexList',
            });
          } else {
            history.goBack();
          }
        },
      },
    });

    return () => {
      window.removeEventListener('message', listenFun);
    };
  }, []);
  const {
    goodsPictureList,
    goodsInfoAppText,
    goodsDesc,
    goodsName,
    price,
    promotions,
    storeId,
  } = cGoodsDetails;

  const {
    skuList = [],
    tabData = [], // 类目全部数据
    tabs = [], // 左侧tab 列表
    cartAllData = {}, // 购物车全部数据，商品列表，赠品列表，总金额等等
    activeGoodData, // 当前选中增加或减少的数据
    skuQueryList = [],
  } = indexList;

  const toOrderClick = (e: any) => {
    e.stopPropagation();
    if (skuList.length === 0) {
      Toast.show('请至少选择一个商品！');
      return;
    }
    if (Utils.isLogin()) {
      let urlGoodsList = (skuList || [])?.map((item: any) => {
        return { skuId: item.skuId, quantity: item.quantity };
      });
      localStorage.setItem('leave', '0'); // 用完值要设置成初始值
      history.push({
        pathname: '/customer/payConfirm',
        query: {
          urlGoodsList: JSON.stringify(urlGoodsList),
        },
      });
    } else {
      history.push({
        pathname: '/customer/orderConfirm',
      });
    }
  };

  /**
   * 页面初始化
   */
  useEffect(() => {
    // 清除选择号码页面的keepalive
    // if (window.socket) window.socket.disconnect();
    dropByCacheKey('/selectnumber');

    if (noDropByCacheKey !== '1') {
      // 清除客服模块的keepalive
      dropByCacheKey('/customerhoney');
      // if (window.socket) window.socket.disconnect();

      // 清空客服模块model 数据
      dispatch!({
        type: 'customerHoney/save',
        payload: {
          chatList: [],
          chatPage: 1,
          hasMore: true,
        },
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    let num = 0;
    skuList.forEach((item) => {
      num += item.quantity;
    });
    setCartNum(num);
  }, [skuList]);

  /**
   * 查询 sku
   */
  const querySku = (data: any, type: 'add' | 'reduce' | 'cart' | 'single', categoryId = '') => {
    const { saleAttrList = [] } = data;
    let newskuQueryList = saleAttrList.map((item: any) => {
      return {
        attrCode: item.attrCode,
        attrName: item.attrName,
        attrValue: item?.attrValues && item?.attrValues.length ? item.attrValues[0].attrValue : '',
      };
    });
    if (data?.skuQueryList && data?.skuQueryList.length) {
      newskuQueryList = data?.skuQueryList;
    }
    dispatch!({
      type: 'indexList/save',
      payload: {
        skuQueryList: newskuQueryList,
        activeGoodData: {
          categoryId,
          goodDetail: data,
        },
      },
    });
    if (type === 'cart') return;
    dispatch!({
      type: 'goodsDetail/queryDetailByAttr',
      payload: {
        attrList: newskuQueryList,
        goodsId: data?.goodsId,
      },
    }).then((res: any) => {
      const newSkuList: any[] = [];
      skuList.forEach((item) => {
        if (item.skuId === res.skuId) {
          const params = item;
          if (type === 'add') params.quantity += 1;
          if (type === 'reduce') params.quantity -= 1;
          if (params.quantity > 0) {
            newSkuList.push(params);
          }
          return;
        }
        newSkuList.push(item);
      });
      if (type === 'single') {
        const { skuFilePathInServer = '' } = data;
        const { orderAttrs = [] } = skuGoodsDetail;
        newSkuList.push({
          ...data,
          skuInfoThumbnail: skuFilePathInServer,
          quantity: 1,
          orderAttrs,
          skuQueryList: newskuQueryList,
        });
      }

      dispatch!({
        type: 'indexList/calFeeModels',
        payload: {
          goodsList: newSkuList,
        },
      }).then(() => {
        addOrDelClick(1, data, type, categoryId);
        if (newSkuList.length === 0) setCartVisible(false);
      });
    });
  };

  /**
   * 加入购物车的方法
   */
  const insCart = (skuInfo: any, proNum: number, goodsDetail: any, categoryId: string) => {
    let skuFlag = false;
    const newSkuList = skuList.map((item) => {
      if (item.skuId === skuInfo.skuId) {
        skuFlag = true;
        return {
          ...item,
          quantity: item.quantity + proNum,
          goodsName: goodsDetail.goodsName,
        };
      }
      return item;
    });
    if (!skuFlag) {
      const { orderAttrs = [] } = skuGoodsDetail;
      newSkuList.push({
        ...skuInfo,
        quantity: proNum,
        goodsId: goodsDetail.goodsId,
        categoryId,
        goodsName: goodsDetail.goodsName,
        orderAttrs,
        skuQueryList,
      });
    }
    let num = 0;
    newSkuList.forEach((item) => {
      if (item.goodsId === goodsDetail.goodsId) {
        num += item.quantity;
      }
    });

    dispatch!({
      type: 'indexList/save',
      payload: {
        skuList: newSkuList,
      },
    });
    dispatch!({
      type: 'indexList/calFeeModels',
      payload: {
        goodsList: newSkuList,
      },
    }).then(() => {
      setSkuVisible(false);
      addOrDelClick(num, goodsDetail, 'cart', categoryId);
      // history.push({
      //   pathname: '/customer/indexList',
      // });
      history.goBack();
    });
  };

  // 增加或者删除的点击事件
  const addOrDelClick = (
    proNum: number,
    goodsDetail: any,
    type: 'add' | 'reduce' | 'cart' | 'single',
    categoryId: string,
  ) => {
    // tabData 的数据修改
    const newTabData = JSON.parse(JSON.stringify(tabData));
    newTabData.forEach((tabItem: any) => {
      if (tabItem.categoryId === categoryId) {
        tabItem.values.forEach((item: any) => {
          if (item.goodsId === goodsDetail?.goodsId) {
            if (!item.quantity) item.quantity = 0;
            if (type === 'add') {
              item.quantity += proNum;
            } else if (type === 'reduce') {
              item.quantity -= proNum;
            } else {
              item.quantity = proNum;
            }
          }
        });
      }
    });

    // 左侧tab标题栏的数据修改
    const newTabs = tabs.map((item) => {
      if (item.categoryId === categoryId) {
        if (type === 'add' || type === 'single') {
          item.quantity += proNum;
        } else if (type === 'reduce') {
          item.quantity -= proNum;
        } else {
          let totalQuantity = 0;
          const filterList = newTabData.filter(
            (it: any) => it.categoryId === activeGoodData.categoryId,
          );
          if (filterList && filterList.length) {
            filterList[0].values.map((it: any) => {
              if (it.quantity) totalQuantity += it.quantity;
            });
          }
          item.quantity = totalQuantity;
        }
      }
      return item;
    });
    dispatch!({
      type: 'indexList/save',
      payload: {
        tabs: newTabs,
        tabData: newTabData,
      },
    });
  };

  /**
   * 添加商品
   */
  const addGoods = () => {
    const { single = false, skuId = '', categoryId = '' } = skuGoodsDetail;
    if (single) {
      const skuFilter = skuList.filter((it) => it.skuId === skuId);
      if (skuFilter && skuFilter.length) {
        querySku(skuGoodsDetail, 'add', categoryId);
      } else {
        querySku(skuGoodsDetail, 'single', categoryId);
      }
      // history.push({
      //   pathname: '/customer/indexList',
      // });
      history.goBack();
    } else {
      querySku(skuGoodsDetail, 'cart', categoryId);
      setSkuVisible(true);
    }
  };

  /**
   * 客服点击事件
   */
  const customerClick = () => {
    putHoneyGoodsDetail({
      ...cGoodsDetails,
      goodsId,
    });
    dispatch!({
      type: 'my/queryMemberLevel',
    }).then((flag: boolean) => {
      if (flag) {
        if (noDropByCacheKey === '1') {
          history.goBack();
        } else {
          dispatch!({
            type: 'customerHoney/qryOnlineSourceModels',
          }).then((res: any) => {
            if (res === 'csms') {
              history.push({
                pathname: '/customerHoney',
              });
            } else {
              setCustomerVisible(true);
              setTimeout(() => {
                resetIframeViewPort();
              }, 100);
            }
          });
        }
      } else {
        history.push({
          pathname: '/customer/orderConfirm',
          query: {
            isCustomerService: true,
          },
        });
      }
    });
  };

  const activityShow = () => {
    setShowActivity(true);
  };

  const renderCarousel = () => {
    return (
      <div className={styles.shopImgs}>
        <Carousel
          autoplay
          infinite
          afterChange={(current: number) => {
            updateCurrent(current + 1);
          }}
        >
          {goodsPictureList.map((item: any) => {
            if (item.filePathInServer) {
              return (
                // <div
                //   className={styles.carouselImg}
                //   style={{ backgroundImage: `url(${item.filePathInServer})` }}
                // ></div>
                <img
                  src={item.filePathInServer}
                  className={styles.carouselImg}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              );
            }
          })}
        </Carousel>
        <div className={styles.currentPage}>
          {current}/{goodsPictureList.length}
        </div>
      </div>
    );
  };

  const renderGoodsSkuInfo = () => {
    return (
      <div className={styles.skuBlock}>
        <div className={styles.skuName}>{goodsName}</div>
        <div className={styles.skuCell}>
          <div className={styles.goodsPrice}>￥{price}</div>
          <img src={addIcon} alt="" onClick={addGoods} param-action="shopCart" />
        </div>
        <div className={styles.skuAttr}>{goodsDesc}</div>
        <div
          className={promotions && promotions.length ? styles.activityDiv : 'hideElement'}
          onClick={() => activityShow()}
        >
          <div className={styles.itemHeader}>
            <span className={styles.title}>活动</span>
          </div>
          <div className={styles.itemBody}>
            <span>赠品</span>
            {promotions[0]?.promName}
          </div>
          <div className={styles.itemFt}>
            <img src={rightMoreIcon} alt="" />
          </div>
        </div>
        {/* <div
          className={
            promotions[0]?.giftAndCouponList && promotions[0]?.giftAndCouponList.length
              ? styles.giftsStyle
              : 'hideElement'
          }
        >
          <span>赠品:{promotions[0]?.giftAndCouponList[0]?.objName}</span>
        </div> */}
      </div>
    );
  };
  return (
    <div
      className={styles.cGoodsDetials}
      style={{ height: document.documentElement.clientHeight - 92 }}
    >
      <div className={styles.cGoodsContent}>
        {renderCarousel()}
        {renderGoodsSkuInfo()}
        <IGoodsDetail goodsInfoAppText={goodsInfoAppText}>
          <div className={styles.detailsTitle} style={{ margin: '32px 0' }}>
            商品详情
          </div>
        </IGoodsDetail>
      </div>
      <CFootBlock
        righBtnText="就选这个"
        isCollect="shopCart"
        rightClick={() => {
          addGoods();
        }}
        cartNum={cartNum}
        cartClick={() => {
          if (cartNum) setCartVisible(true);
        }}
        myClick={() => {
          history.push({
            pathname: '/customer/myPage',
          });
        }}
        customerClick={customerClick}
      />
      <CactivityAlert
        show={showActivity}
        coupons={promotions}
        closeClick={() => {
          setShowActivity(false);
        }}
      />
      <CartModal
        visible={cartVisible}
        close={() => setCartVisible(false)}
        data={cartAllData}
        skuList={skuList}
        reduceClick={(data, id) => {
          querySku(data, 'reduce', id);
        }}
        addClick={(data, id) => {
          querySku(data, 'add', id);
        }}
        toOrderClick={toOrderClick}
      />
      <ProInfoAlert
        saleList={activeGoodData.goodDetail?.saleAttrList}
        show={skuVisible}
        closeClick={() => {
          setSkuVisible(false);
        }}
        attrQueryCOList={skuQueryList}
        goodDetail={activeGoodData.goodDetail}
        dispatch={dispatch}
        flag="1"
        leftClick={insCart}
        rightClick={() => {
          history.push('/customer/orderConfirm');
        }}
        // updateAttrList={(data) => {
        // }}
        categoryId={activeGoodData?.categoryId || ''}
      />
      <Modal visible={customerVisible}>
        <OtherCustomer
          goodsId={goodsId}
          storeId={storeId}
          close={() => {
            setCustomerVisible(false);
            backIframeViewPort();
          }}
        />
      </Modal>
    </div>
  );
};

export default connect(
  ({
    cGoodsDetails,
    indexList,
  }: {
    cGoodsDetails: CGoodsDetailsModelState;
    indexList: IndexListModelState;
  }) => ({
    cGoodsDetails,
    indexList,
  }),
)(CGoodsDetailsPage);
