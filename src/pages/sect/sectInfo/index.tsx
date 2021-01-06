import React, { FC, useEffect } from 'react';
import { SectInfoModelState, ConnectProps, connect, history } from 'alita';
import defaultIcon from '@/assets/img/customer/sect/default_icon.png';
import memberBlue from '@/assets/img/customer/sect/member_blue.png';
import backWhiteIcon from '@/assets/img/back_white.png';

import Utils from '@/utils/tool';

import SingleBtn from '../components/SingleBtn';
import styles from './index.less';

interface PageProps extends ConnectProps {
  sectInfo: SectInfoModelState;
}

const SectInfoPage: FC<PageProps> = ({ sectInfo, dispatch }) => {
  // 如果是掌门的话，则只能查看消息
  const circleMemberType = localStorage.getItem('circleMemberType');
  // 这里发起了初始化请求
  useEffect(() => {

    dispatch!({
      type: 'sectInfo/query',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { mySectInfo } = sectInfo;
  const { circleSize, circleTotal, circleInstDesc, memberName, marketingCircleInstId, marketingCircleInstName } = mySectInfo;

  /**
   *申请加入会员
   */
  const myClick = () => {
    if (circleMemberType === '1') {
      return false
    }
    const member = Utils.getStorageForJson('memberInfo') || {};
    // console.log(JSON.stringify(member));

    const { nickname = '', profilePhoto = '' } = member;
    dispatch!({
      type: 'sectInfo/circleJion',
      payload: {
        applyType: '2000', // 搜索入圈
        marketingCircleInstId,
        memberImage: profilePhoto,
        nickName: nickname,
      }
    });
  }
  return <div className={styles.normalSectPage}>
    <img src={backWhiteIcon} alt='' className='backIcon' onClick={() => {
      history.goBack();
    }} />
    <div className={styles.pageTitle}>圈子资料</div>
    <div className={styles.normalSectHead}>
      <div className={styles.cardContent}>

        <div className={styles.rightContent}>
          <img src={memberBlue} alt='' />
          <span className={styles.currentNum}>{circleTotal}</span>/{circleSize}
        </div>
        <img src={defaultIcon} alt='' className={styles.myToux} />
        <div className={styles.blodTipMsg}>{marketingCircleInstName}</div>
        <div className={styles.tipMsg}>掌门：{memberName}</div>
        <div className={styles.tipMsg}>{circleInstDesc}</div>

      </div>
    </div>
    <div className={styles.btnBlock}>
      <SingleBtn
        text='申请加入'
        canClick={circleMemberType !== '1'}
        onClick={myClick}
      />
    </div>


  </div>;
};


export default connect(({ sectInfo }: { sectInfo: SectInfoModelState; }) => ({ sectInfo }))(SectInfoPage);
