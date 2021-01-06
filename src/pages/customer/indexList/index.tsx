/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { FC, useEffect, useState } from 'react';
import { IndexListModelState, ConnectProps, connect, router, history } from 'alita';
import { Toast, Carousel } from 'antd-mobile';
import { setSkuGoodsDetail } from '@/utils';
import { AllWhiteLoading } from '@/components';
import { IndexAvatarPng, IndexListBgPng } from '@/assets';
import Utils from '@/utils/tool';
import { LeftTab, TabListData, CartModal, CartFooter, ProInfoAlert } from '../components';
import styles from './index.less';

interface PageProps extends ConnectProps {
  indexList: IndexListModelState;
}

const IndexListPage: FC<PageProps> = ({ indexList, dispatch }) => {
  let pageContentRef: { style: { transform: string } } | null = null;
  const {
    tabData = [], // 类目全部数据
    cartAllData = {}, // 购物车全部数据，商品列表，赠品列表，总金额等等
    tabs = [], // 左侧tab 列表
    tabActiveId = 0, // 当前选中的tab
    activeGoodData, // 当前选中增加或减少的数据
    skuQueryList, // 属性的查询的数据
    skuList,
    carouselList = [],
  } = indexList;
  const [cartVisible, setCartVisible] = useState<boolean>(false); // 购物车弹窗标识
  const [skuVisible, setSkuVisible] = useState<boolean>(false); // 选择属性的弹框
  const [memberInfo] = useState(Utils.getStorageForJson('memberInfo'));
  const [listenFlag, setListenFlag] = useState<boolean>(true);
  const [imgHeight, setImgHeight] = useState<number | string>(0);
  const [loading, setLoading] = useState(false);

  const source = Utils.getQueryString('source');
  const sn = Utils.getQueryString('sn');
  const salesCode = Utils.getQueryString('salesCode');

  /**
   * 页面初始化
   */
  useEffect(() => {
    localStorage.setItem('leave', '0'); // 用完值要设置成初始值
    Utils.accessPermission({
      sn,
      source,
      dispatch,
      successCallBack: () => {
        Utils.isFromApplets();
        document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';

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
            claimValue: '',
            needShowOrdAddr: '', // 是否需要展示选址的功能
            claimType: [], // 配送方式
            halfPaymenet: {}, //
            singleFlag: '',
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

        // 清空紧急挂失模块数据
        dispatch!({
          type: 'emerPayConfirm/save',
          payload: {
            phone: '',
            orderInfo: {},
            addressInfo: {},
            idCardInfo: {},
            invoiceContent: { personal: {}, company: {} },
            claimValue: '',
          },
        });
        dispatch!({
          type: 'emergencyList/save',
          payload: {
            emList: [],
          },
        });

        if (tabData && tabData.length) {
          setListenFlag(false);
          const labelNode = document.getElementById(`categoryId-${tabActiveId}`);
          if (labelNode) {
            labelNode.scrollIntoView();
          }
          setTimeout(() => {
            setListenFlag(true);
          }, 500);
          return;
        }
        // // 查询首页轮播图
        // if (carouselList.length === 0) {
        //   dispatch!({
        //     type: 'indexList/qryPageDetailCacheModal',
        //     payload: {
        //       pageId: '7002',
        //       storeId: '1006',
        //     },
        //   });
        // }
        dispatch!({
          type: 'indexList/queryGoodsByFgCategoryModels',
        }).then((data: any) => {
          const newtabs = data?.map((item: any) => {
            let val = 0;
            // eslint-disable-next-line no-return-assign
            item.values.map((it: any) => (val += it.quantity));
            return {
              categoryId: item.categoryId,
              categoryName: item.categoryName,
              quantity: 0,
            };
          });
          dispatch!({
            type: 'indexList/save',
            payload: {
              tabData: data,
              tabs: newtabs,
              tabActiveId: data && data.length > 0 ? data[0].categoryId : '',
            },
          });
        });
        dispatch!({
          type: 'indexList/dmosbrowse',
          payload: {
            sn: localStorage.getItem('sn') || '',
            source: localStorage.getItem('source') || '',
          },
        });
      },
    });
  }, []);

  /**
   * 左侧tab 切换点击事件
   */
  const tabClick = (item: any) => {
    dispatch!({
      type: 'indexList/save',
      payload: {
        tabActiveId: item.categoryId,
      },
    });
    setListenFlag(false);
    setTimeout(() => {
      setListenFlag(true);
    }, 1000);
    const labelNode = document.getElementById(`categoryId-${item.categoryId}`);
    if (labelNode) {
      labelNode.scrollIntoView({ behavior: 'smooth' });
    }
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
    // eslint-disable-next-line arrow-parens
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
   * 查询 sku
   */
  const querySku = (data: any, type: 'add' | 'reduce' | 'cart' | 'single', categoryId = '') => {
    const { saleAttrList = [] } = data;
    let selectName = '';
    let newskuQueryList = saleAttrList.map((item: any) => {
      selectName += `"${
        item?.attrValues && item?.attrValues.length ? item.attrValues[0].name : ''
      }" `;
      return {
        attrCode: item.attrCode,
        attrName: item?.attrValues && item?.attrValues.length ? item.attrValues[0].name : '',
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
      // eslint-disable-next-line arrow-parens
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
        const { skuFilePathInServer = '', orderAttrs = [] } = data;
        newSkuList.push({
          ...data,
          skuInfoThumbnail: skuFilePathInServer,
          orderAttrs,
          quantity: 1,
          categoryId,
          skuQueryList: newskuQueryList,
          select: selectName,
        });
      }
      dispatch!({
        type: 'indexList/calFeeModels',
        payload: {
          goodsList: newSkuList,
        },
      }).then(() => {
        setSkuVisible(false);
        addOrDelClick(1, data, type, categoryId);
        if (newSkuList.length === 0) setCartVisible(false);
      });
    });
  };

  /**
   * 减少数量
   */
  const reduceClick = (data: any, id = '') => {
    const filterList = skuList.filter((it: any) => it.goodsId === data.goodsId);
    if (filterList && filterList.length > 1) {
      setCartVisible(true);
    } else if (filterList && filterList.length === 1) {
      querySku(
        {
          ...filterList[0],
        },
        'reduce',
        id,
      );
    }
  };
  /**
   * 增加数量
   */
  const addClick = (data: any, id = '', type = '') => {
    dispatch!({
      type: 'indexList/save',
      payload: {
        tabActiveId: id,
        activeGoodData: {
          categoryId: id,
          goodDetail: data,
        },
      },
    });
    const { single = false } = data;
    if (single) {
      const skuFilter = skuList.filter((it: any) => it.skuId === data.skuId);
      if (skuFilter && skuFilter.length) {
        querySku(data, 'add', id);
      } else {
        querySku(data, 'single', id);
      }
    } else {
      querySku(data, 'cart', id);
      setSkuVisible(true);
    }
  };

  /**
   * 点击前往商品详情
   * @param e
   */
  const itemClick = (e: any, categoryId: string) => {
    setSkuGoodsDetail({
      ...e,
      categoryId,
    });
    const elemnet = document.querySelector(`#details_${e.goodsId}`);
    if (elemnet) {
      elemnet.paramset = { action: 'goodsDetails' };
    }
    history.push({
      pathname: '/customer/cGoodsDetails',
      query: {
        goodsId: e.goodsId,
      },
    });
  };
  /**
   * 购物车点击事件
   */
  const cartClick = () => {
    if (skuList && skuList.length) {
      setCartVisible(!cartVisible);
    }
  };
  const toOrderClick = (e: any) => {
    e.stopPropagation();
    if (skuList.length === 0) {
      Toast.show('请至少选择一个商品！');
      return;
    }
    dispatch!({
      type: 'orderConfirm/save',
      payload: {
        skuList,
      },
    });
    if (Utils.isLogin()) {
      const urlGoodsList = (skuList || [])?.map((item: any) => ({
        skuId: item.skuId,
        quantity: item.quantity,
      }));
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
   * 加入购物车的方法
   */
  const insCart = (skuInfo: any, proNum: number, goodsDetail: any, categoryId: string) => {
    let skuFlag = false;
    const newSkuList = skuList.map((item: any) => {
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
      newSkuList.push({
        ...skuInfo,
        quantity: proNum,
        goodsId: goodsDetail.goodsId,
        categoryId,
        goodsName: goodsDetail.goodsName,
        orderAttrs: goodsDetail.orderAttrs,
        skuQueryList,
      });
    }
    let num = 0;
    newSkuList.forEach((item: any) => {
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
    });
  };

  /**
   * 监听右侧屏幕滚动问题
   */
  const rightScroll = (e: { target: { scrollTop?: 0 | undefined } }) => {
    if (!listenFlag) return;
    const { scrollTop = 0 } = e.target;
    tabData.map((item: any) => {
      const node = document.getElementById(`categoryId-${item.categoryId}`);
      const nodeRight = document.getElementById(`ilRightId`);
      // if (node && node.getBoundingClientRect()?.y < 500 && node.getBoundingClientRect()?.y > 300) {
      if (
        node &&
        nodeRight &&
        node.getBoundingClientRect()?.y - nodeRight.getBoundingClientRect()?.y < 50
      ) {
        dispatch!({
          type: 'indexList/save',
          payload: {
            tabActiveId: item.categoryId,
          },
        });
      }
    });
  };

  /**
   * 轮播图点击事件
   */
  const carouselClick = (res: any) => {
    const { linkUrl = '', features = '{}' } = res;
    if (linkUrl) {
      history.push({
        pathname: linkUrl,
        query: {
          ...JSON.parse(features),
        },
      });
    }
  };

  /**
   * banner 图点击事件
   *
   */
  const bannerClick = () => {
    const test = Utils.getQueryString('test');
    history.push({
      pathname: '/starPkg',
      query: {
        source,
        sn,
        salesCode,
        skuId: '636870',
        test,
      },
    });
  };

  return (
    <div className={styles.indexListStyle}>
      {/* <input type="file" accept="image/*" capture="camera"></input> */}
      <div className={styles.indeListContent}>
        <div className={styles.ilTopBg}>
          <img
            id="topBgId"
            src={IndexListBgPng}
            alt=""
            className={styles.ilTopImg}
            onClick={bannerClick}
          />
          {/* <Carousel autoplay infinite>
            {carouselList.map((val: any) => (
              <img
                src={val?.imageUrl}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: imgHeight }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  setImgHeight('auto');
                  setLoading(false);
                }}
                onClick={() => carouselClick(val)}
              />
            ))}
          </Carousel> */}
          <div
            className={styles.ilTop}
            onClick={() => {
              history.push('/customer/myPage');
            }}
          >
            <div className={styles.ilTopPerson}>
              <img src={IndexAvatarPng} alt="" className={styles.ava} />
              {memberInfo?.nickname || '个人中心'}
            </div>
          </div>
        </div>
        <div
          // eslint-disable-next-line no-return-assign
          ref={(e) => (pageContentRef = e)}
          id="contentId"
          className={styles.ilContent}
          onScroll={rightScroll}
        >
          <div className={styles.ilLeft}>
            <LeftTab data={tabs} activeId={tabActiveId} tabClick={tabClick} />
          </div>
          <div className={styles.ilRight} id="ilRightId">
            {tabData.map((tabItem: any) => (
              <TabListData
                data={tabItem}
                key={tabItem.categoryId}
                reduceClick={(data: any) => reduceClick(data, tabItem.categoryId)}
                addClick={(data: any) => addClick(data, tabItem.categoryId, 'sku')}
                click={(e: any) => itemClick(e, tabItem.categoryId)}
              />
            ))}
          </div>
        </div>
        <div className={styles.heights} />
        <div className={styles.cartFootDiv}>
          <CartFooter
            allData={cartAllData}
            cartClick={cartClick}
            toOrderClick={toOrderClick}
            data={skuList}
          />
        </div>
        <CartModal
          visible={cartVisible}
          close={() => setCartVisible(false)}
          footerClick={cartClick}
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
          rightClick={(skuInfo, proNum) => {
            router.push('/customer/orderConfirm');
          }}
          updateAttrList={(data: any) => {
            dispatch!({
              type: 'indexList/save',
              payload: {
                skuQueryList: data,
              },
            });
          }}
          categoryId={activeGoodData?.categoryId || ''}
        />
      </div>
      {loading && <AllWhiteLoading />}
    </div>
  );
};

export default connect(({ indexList }: { indexList: IndexListModelState }) => ({
  indexList,
}))(IndexListPage);
