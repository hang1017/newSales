import React, { Component } from 'react';
import {
  CustomerCenterModelState,
  CustomerHoneyModelState,
  ConnectProps,
  connect,
  router,
} from 'alita';
import moment from 'moment';
import { Tabs } from 'antd-mobile';
import { random, showTimeFlag } from '@/utils';
import { Empty } from '@/components';
import SearchBar from './components/SearchBar';
import ListView from './components/ListView';
import styles from './index.less';

interface PageProps extends ConnectProps {
  customerCenter: CustomerCenterModelState;
  customerHoney: CustomerHoneyModelState;
}

interface PageState {
  searchValue: string;
  buyedLoading: boolean;
  buyedRefreshing: boolean;
  currentTab: number;
  cartLoading: boolean;
  cartRefreshing: boolean;
}

const tabs = [
  { title: '已买到', sub: '1' },
  { title: '购物车', sub: '2' },
];

@connect(({ customerCenter, customerHoney }) => ({ customerCenter, customerHoney }))
class Page extends Component<PageProps, PageState> {
  state = {
    searchValue: '',
    buyedLoading: false,
    buyedRefreshing: false,
    currentTab: 0,
    cartLoading: false,
    cartRefreshing: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch!({
      type: 'customerCenter/queryBuyedList',
      payload: {
        pageOne: true,
      },
    });
    dispatch!({
      type: 'customerCenter/queryCartListLocal',
      payload: {
        pageOne: true,
      },
    });

    //
    // window.connectSocket();
  }

  // 上啦加载事件
  buyedOnEndReached = () => {
    const { buyedLoading, searchValue } = this.state;
    const { dispatch, customerCenter } = this.props;
    const { buyedData = {} } = customerCenter;
    if (buyedLoading) return;
    if (!buyedData.hasMore) return;
    this.setState({ buyedLoading: true });
    dispatch!({
      type: 'customerCenter/queryBuyedList',
    }).then(() => {
      this.setState({ buyedLoading: false });
    });
  };
  // // 上啦加载事件
  // cartOnEndReached = () => {
  //   const { cartLoading, searchValue } = this.state;
  //   const { dispatch, customerCenter } = this.props;
  //   const { cartData = {} } = customerCenter;
  //   if (cartLoading) return;
  //   if (!cartData.hasMore) return;
  //   this.setState({ cartLoading: true });
  //   dispatch!({
  //     type: 'customerCenter/queryCartList',
  //     payload: {
  //       searchValue,
  //     },
  //   }).then(() => {
  //     this.setState({ cartLoading: false });
  //   });
  // };

  /**
   * 搜索框改变事件
   */
  searchChange = (e: string) => {
    this.setState({
      searchValue: e,
    });
    const { dispatch, customerCenter } = this.props;
    const { buyedData = {}, cartData = {} } = customerCenter;
    const { currentTab = 0 } = this.state;
    if (currentTab === 0) {
      dispatch!({
        type: 'customerCenter/save',
        payload: {
          buyedData: {
            ...buyedData,
            searchValue: e,
          },
        },
      });
    } else {
      dispatch!({
        type: 'customerCenter/save',
        payload: {
          cartData: {
            ...cartData,
            searchValue: e,
          },
        },
      });
    }
  };

  /**
   * 发送按钮点击事件
   */
  sendBaby = (data: any) => {
    const { currentTab = 0 } = this.state;
    const {
      customerHoney: { chatList = [] },
      dispatch,
    } = this.props;
    // 是否展示时间的判断标识
    let timeFlag = '1';
    if (chatList && chatList.length > 0 && chatList[chatList.length - 1].timestamp) {
      timeFlag = showTimeFlag(chatList[chatList.length - 1].timestamp);
    }
    const params = {
      userType: 'member', // member: 用户， staff：客服
      msgType: 'baby',
      msgObj:
        JSON.stringify({
          goodsId: data?.goodsId,
          goodsName: data?.goodsName,
          goodsUrl: currentTab ? data?.skuInfoThumbnail : data?.picUrl,
          picPath: `${window.location.origin}/#/customer/cGoodsDetails?goodsId=${data?.goodsId}`,
          goodsPrice: currentTab ? data?.salesPrice : data?.price,
        }) || '{}',
      randomId: random(),
      timeFlag,
      timestamp: moment(new Date()).valueOf(),
    };
    dispatch!({
      type: 'customerHoney/save',
      payload: {
        chatList: [...chatList, { ...params, loadding: true }],
      },
    });
    router.goBack();
    if (window.socket) {
      window.socket.emit('messageEvent', params);
      console.log('成功发送消息', params);
    }
  };

  // 搜索确认按钮
  searchConfirm = (e: string) => {
    const { currentTab = 0 } = this.state;
    if (currentTab === 0) {
      this.setState(
        {
          buyedRefreshing: true,
        },
        () => {
          this.props.dispatch!({
            type: 'customerCenter/queryBuyedList',
            payload: {
              pageOne: true,
            },
          }).then(() => {
            this.setState({
              buyedRefreshing: false,
            });
          });
        },
      );
    } else {
      this.props.dispatch!({
        type: 'customerCenter/queryCartListLocal',
      });
    }
  };

  ListItem = ({ data = [] }) => {
    const { currentTab = 0 } = this.state;
    return (
      <div className={styles.proRow}>
        {data.map((item: any) => (
          <div className={styles.proItemStyle}>
            <img
              src={currentTab ? item.skuInfoThumbnail : item.picUrl}
              alt=""
              className={styles.proItemImg}
            />
            <div className={styles.proItemContent}>
              <div className={styles.proItemTitle}>{item.goodsName}</div>
              <div className={styles.proItemFooter}>
                <div className={styles.proItemMoney}>
                  <span className={styles.symbol}>¥</span>
                  <span className={styles.mainMoney}>
                    {/* {(item.money / 100).toFixed(2).split('.')[0]} */}
                    {currentTab ? item.salesPrice : item.price}
                  </span>
                  {/* <span className={styles.subMoney}>
                    {`.${(item.money / 100).toFixed(2).split('.')[1]}`}
                  </span> */}
                </div>
                <div className={styles.proItemSend} onClick={() => this.sendBaby(item)}>
                  发送
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /**
   * 输入框的样式
   */
  SearchBarContent = (value: string) => {
    return (
      <SearchBar
        value={value}
        onChange={this.searchChange}
        type="light"
        placeholder="搜索词"
        cancelText="确定"
        onOk={(e: string) => {
          this.searchConfirm(e);
        }}
      />
    );
  };

  render() {
    const {
      buyedLoading = false,
      buyedRefreshing = false,
      currentTab = 0,
      cartLoading = false,
      cartRefreshing = false,
    } = this.state;
    const { buyedData = {}, cartData = {} } = this.props.customerCenter;
    return (
      <div className={styles.customerCenterStyle}>
        <Tabs
          tabs={tabs}
          initialPage={currentTab}
          tabBarUnderlineStyle={{
            left: `${currentTab * 50 + 21}%`,
          }}
          onChange={(tab, index) => {
            this.setState({
              currentTab: index,
            });
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab);
          }}
        >
          <div className={styles.ccCenter}>
            {this.SearchBarContent(buyedData?.searchValue)}
            <div className={styles.listview}>
              {buyedRefreshing && <div className={styles.loadding}>加载中...</div>}
              {buyedData.list.length > 0 ? (
                <ListView
                  data={buyedData.list}
                  Item={this.ListItem}
                  height={'100%'}
                  isLoading={buyedLoading}
                  onEndReached={this.buyedOnEndReached}
                  hasMore={buyedData.hasMore}
                />
              ) : (
                <div style={{ marginTop: '2rem' }}>
                  <Empty />
                </div>
              )}
            </div>
          </div>
          <div className={styles.ccCenter}>
            {this.SearchBarContent(cartData?.searchValue)}
            <div className={styles.listview}>
              {cartRefreshing && <div className={styles.loadding}>加载中...</div>}
              {cartData.list.length > 0 ? (
                <ListView
                  data={cartData.list}
                  Item={this.ListItem}
                  height={'100%'}
                  isLoading={cartLoading}
                  // onEndReached={this.cartOnEndReached}
                  hasMore={cartData.hasMore}
                />
              ) : (
                <div style={{ marginTop: '2rem' }}>
                  <Empty />
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Page;
