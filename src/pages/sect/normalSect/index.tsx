import React, { FC, useEffect } from 'react';
import { NormalSectModelState, ConnectProps, connect, history } from 'alita';
import defaultIcon from '@/assets/img/customer/sect/default_icon.png';
import msgIcon from '@/assets/img/customer/sect/msg_icon.png';
import paiIcon from '@/assets/img/customer/sect/pai_icon.png';
import backWhiteIcon from '@/assets/img/back_white.png';
import alertIcon from '@/assets/img/customer/sect/alert.png';
import moreIcon from '@/assets/img/customer/sect/right_more.png';

import MySearchBar from '@/components/MySearchBar';
import SectItem from '../components/SectItem';
import styles from './index.less';

interface PageProps extends ConnectProps {
  normalSect: NormalSectModelState;
}

const NormalSectPage: FC<PageProps> = ({ normalSect, dispatch }) => {
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'normalSect/circleList',
      payload: {
        current: 1,
        size: 10,
      }
    })
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { sectList, accNbre } = normalSect;
  const myClick = (data: string) => {

    dispatch!(
      {
        type: 'sectInfo/save',
        payload: {
          mySectInfo: data
        }
      }
    );
    // 此时无圈子，将类型置为空
    localStorage.setItem('circleMemberType', '')
    setTimeout(() => {
      history.push({
        pathname: '/sect/sectInfo'
      })
    }, 100);


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
    <div className={styles.pageTitle}>我的圈子</div>
    <div className={styles.normalSectHead}>
      <div className={styles.iconContent}>
        <img src={alertIcon} alt='' onClick={
          () => {
            history.push({
              pathname: '/sect/playDes'
            });
          }
        } />
      </div>

      <div className={styles.cardContent}>
        <img src={defaultIcon} alt='' className={styles.myToux} />
        <div className={styles.tipMsg}>您还没有加入任何圈子</div>
        <div className={styles.btnContent}>
          {
            // <div><span className={styles.memberBtn}>取消圈子</span></div>

          }
          <div onClick={() => {
            history.push({
              pathname: '/sect/createSect',
              query: {
                circleMemberType: '1'
              }
            })
          }}
          ><span className={styles.creatHead}><img src={paiIcon} alt='' />我要当掌门</span></div>
        </div>
        <div className={styles.cardCell}>
          <div><img src={msgIcon} alt='' /><span className={styles.leftSpan}>我申请的圈子</span></div>
          <div onClick={() => {
            dispatch!({
              type: 'intoSectAudit/save',
              payload: {
                accNbre,
              }
            });
            history.push({
              pathname: '/sect/intoSectApply'
            });
          }}><span className={styles.rigthSpan}>查看</span><img src={moreIcon} alt='' /></div>
        </div>
      </div>
    </div>

    <div className={styles.headsContent}>
      <MySearchBar
        placeholder='搜索您感兴趣的圈子'
        onOk={() => { }}
        onFocus={() => {
          history.push({
            pathname: '/sect/searchSects'
          });
        }}
      />
      <div className={styles.headList} style={{ height: document.documentElement.clientHeight * 0.32 }}>
        {
          sectList.map((item, index) => {
            const current = index + 1;
            return <SectItem
              data={item}
              current={current}
              onClick={myClick}
            />
          })
        }


      </div>
    </div>
  </div>;
};

export default connect(({ normalSect }: { normalSect: NormalSectModelState; }) => ({ normalSect }))(NormalSectPage);
