import React, { FC, useEffect, useState } from 'react';
import { MyModelState, ConnectProps, connect, history } from 'alita';
import Utils from '@/utils/tool';
import backWhiteImg from '@/assets/img/back_white.png';
import orderImg from '@/assets/img/my/order.png';
import paymentImg from '@/assets/img/my/pending_payment.png';
import toux from '@/assets/img/my/toux.png';
import receivedImg from '@/assets/img/my/to_be_received.png';
import xfylImg from '@/assets/img/my/xfyl.png';
import bizServiceImg from '@/assets/img/my/biz_service.png';
import rechargeImg from '@/assets/img/my/recharge.png';
import invoiceImg from '@/assets/img/my/invoice.png';
import setIcon from '@/assets/img/my/setting.png';
import watermarkImg from '@/assets/img/discover/watermark.png';

import styles from './index.less';
//
interface PageProps extends ConnectProps {
  my: MyModelState;
}

const MyPage: FC<PageProps> = ({ my, dispatch }) => {
  const [memberInfo, setMemberInfo] = useState({});
  // 这里发起了初始化请求
  useEffect(() => {
    const member = Utils.getStorageForJson('memberInfo');
    if (member) {
      setMemberInfo(member);
    }
    dispatch!({
      type: 'my/queryMemberLevel',
    });

    dispatch!({
      type: 'my/countOrderStatus',
    });
    dispatch!({
      type: 'my/qryBalance',
      payload: {
        balanceTypeId: '1',
        memberId: member && member.memberId,
      },
    });
  }, []);
  const { levelType, needReceive, needPay, amount = '--' } = my;
  const goToOrderList = (index: number) => {
    history.push({
      pathname: '/order/myOrder',
      query: {
        activeIndex: index,
      },
    });
  };
  // const addrManager = () => {
  //   history.push({
  //     pathname: '/shopProcess/deliveryAddr',
  //   });
  // };

  // const nameAuthentication = () => {
  //   history.push({
  //     pathname: '/nameAuthentication',
  //   });
  // };

  // const jumpPage = (pathname: string) => {
  //   history.push({
  //     pathname,
  //   });
  // };

  const jumpPage = (pathname: string) => {
    history.push({
      pathname,
    });
  };

  /**
   * 头像点击改变事件
   * @param e
   */
  const fileChange = (e: { target: { files?: {} | undefined } }) => {
    const { files = {} } = e.target;
    if (Object.keys(files).length === 0) return;
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

  /**
   * 前往售后中心
   */
  const goToAfterSale = () => {
    history.push({
      pathname: '/salesWarranty/warrantyList',
    });
  };

  const updateUserInfo = () => {
    history.push({
      pathname: '/personCenter/editPersonalInfo',
    });
  };
  return (
    <div className={styles.myPage}>
      <div className={styles.userInfo}>
        <div className={styles.headContent}>
          <div>
            <img src={backWhiteImg} alt="" />
          </div>
          <div className={styles.title}>个人中心</div>
          <div className={styles.rigthContent}>
            <img src={setIcon} alt="" onClick={updateUserInfo} />
            {/* <img src={setIcon} alt='' />
              <img src={msgIcon} alt='' /> */}
          </div>
        </div>
        <div className={styles.baseInfo}>
          <div className={styles.toux}>
            <img src={memberInfo?.profilePhoto || toux} />
            <input
              className={styles.touxInput}
              type="file"
              name="file"
              accept="image/*"
              onChange={fileChange}
            />
          </div>
          <div className={styles.myInfo}>
            <div className={styles.userName}>
              <div>{memberInfo?.nickname}</div>
              <div className={styles.level}>等级：{levelType}</div>
            </div>
            <div className={styles.userAccount}>我的账户：¥{amount}</div>
          </div>
        </div>

        {/*         <div className={styles.headMenuList}>
                  <div onClick={() => { jumpPage('/personCenter/discountCounpon') }}>
                    <div className={styles.menuNum}>5</div>
                    <p>我的优惠券</p>
                  </div>
                  <div onClick={() => { jumpPage('/personCenter/mineeQuities') }}>
                    <div className={styles.menuNum}>5</div>
                    <p>我的权益</p>
                  </div>
                  <div>
                    <div className={styles.menuNum}>￥88.00</div>
                    <p>我的账户</p>
                  </div>
                </div> */}
      </div>
      <div className={styles.otherFeatures}>
        <div className={styles.featuresTitle}>我的订单</div>
        <div className={styles.myOrder}>
          <div
            onClick={() => {
              goToOrderList(1);
            }}
          >
            <img src={paymentImg} alt="" />
            <p>待付款</p>
            {parseInt(needPay, 10) !== 0 && <span className={styles.orderNum}>{needPay}</span>}
          </div>
          <div
            onClick={() => {
              goToOrderList(2);
            }}
          >
            <img src={receivedImg} alt="" />
            <p>待收货</p>
            {parseInt(needReceive, 10) !== 0 && (
              <span className={styles.orderNum}>{needReceive}</span>
            )}
          </div>
          <div
            onClick={() => {
              goToOrderList(0);
            }}
          >
            <img src={orderImg} alt="" />
            <p>全部订单</p>
          </div>
          {/* <div onClick={goToAfterSale}>
            <img src={AfterSaleImg} alt="" />
            <p>退换/售后</p>
          </div> */}
        </div>

        {/*  <div className={styles.featuresTitle}>相关服务</div>
           <div className={styles.service}>
             <div className={styles.addrBlock} onClick={addrManager}>
               <div className={styles.serviceTitle}>地址管理</div>
               <div className={styles.subTitle}>收货地址</div>
               <img src={addrImg} alt='' />
             </div>
             <div className={styles.accountBlock} onClick={nameAuthentication}>
               <div className={styles.serviceTitle}>账号认证</div>
               <div className={styles.subTitle}>实名认证</div>
               <img src={accountImg} alt='' />
             </div>
           </div>
  */}

        <div className={styles.featuresTitle}>服务信息</div>

        <div className={styles.myOrder}>
          <div
            onClick={() => {
              jumpPage('/personCenter/quantityQuery');
            }}
          >
            <img src={xfylImg} alt="" />
            <p>消费/用量</p>
          </div>
          <div
            onClick={() => {
              jumpPage('/personCenter/electronicBusiness');
            }}
          >
            <img src={bizServiceImg} alt="" />
            <p>电信业务管理</p>
          </div>
          <div onClick={() => jumpPage('/personCenter/recharge')}>
            <img src={rechargeImg} alt="" />
            <p>优惠充值</p>
          </div>
          <div onClick={() => jumpPage('/personCenter/invoice')}>
            <img src={invoiceImg} alt="" />
            <p>电子发票</p>
          </div>
        </div>
      </div>

      <div className={styles.footLogo}>
        <img src={watermarkImg} alt="" />
      </div>
    </div>
  );
};

export default connect(({ my }: { my: MyModelState }) => ({ my }))(MyPage);
