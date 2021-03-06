import React, { FC, useEffect, useState, useRef } from 'react';
import { AdvertBiliModelState, ConnectProps, connect, history } from 'alita';
import { AllWhiteLoading } from '@/components';

import bgImg1 from '@/assets/img/customer/advertBili/red_01.jpg';
import bgImg2 from '@/assets/img/customer/advertBili/red_02.jpg';
import bgImg3 from '@/assets/img/customer/advertBili/red_03.jpg';
import bgImg4 from '@/assets/img/customer/advertBili/red_04.jpg';
import bgImg5 from '@/assets/img/customer/advertBili/red_05.jpg';
import bgImg6 from '@/assets/img/customer/advertBili/red_06.jpg';
import footBtn from '@/assets/img/customer/advertBili/foot_button.png';

import SingleBtn from '@/pages/customer/components/SingleBtn';

import { Carousel, Toast, Modal } from 'antd-mobile';
import BetterScroll from 'better-scroll';

import Utils from '@/utils/tool';

import styles from './index.less';

interface PageProps extends ConnectProps {
  advertBili: AdvertBiliModelState;
}

const AdvertBiliPage: FC<PageProps> = ({ dispatch, location }) => {
  const [cuIndex, upCuIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  // const { source = '', sn = '' } = location?.query;

  // 这里发起了初始化请求
  useEffect(() => {
    document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';
    const source = Utils.getQueryString('source') || '';
    const sn = Utils.getQueryString('sn') || '';
    Utils.accessPermission({
      sn,
      source,
      dispatch,
      successCallBack: () => {
        window.onload = function () {
          const bs = new BetterScroll(ref.current, {
            probeType: 3,
            scrollY: true,
            scrollX: false,
            click: true,
            bounce: false,
          });
        };

        dispatch!({
          type: 'indexList/dmosbrowse',
          payload: {
            sn: sn || '',
            source: source || '',
          },
        });

        Toast.loading('加载中...', 1);
      },
    });

    // document.querySelector('#advertBili').style.height = '100%';
    // window.onload = function () {
    //   const bs = new BetterScroll(ref.current, {
    //     probeType: 3,
    //     scrollY: true,
    //     scrollX: false,
    //     click: true,
    //     bounce: false,
    //   });
    // };

    // dispatch!({
    //   type: 'indexList/dmosbrowse',
    //   payload: {
    //     sn: sn || '',
    //     source: source || '',
    //   },
    // });

    // Toast.loading('加载中...', 1);

    return () => {
      // document.querySelector('#advertBili').style.height = '100%';
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const goToIndexList = () => {
    const source = Utils.getQueryStringSourceAndSn('source') || '';
    const sn = Utils.getQueryStringSourceAndSn('sn') || '';
    const salesCode = Utils.getQueryString('salesCode') || '';
    const test = Utils.getQueryString('test') || '';
    localStorage.setItem('source', source);
    localStorage.setItem('sn', sn);
    localStorage.setItem('salesCode', salesCode);
    localStorage.setItem('test', test);

    dispatch!({
      type: 'indexList/goToIndexList',
    });
  };

  return (
    <div
      className={styles.warrper}
      id="advertBili"
      style={{ height: document.documentElement.clientHeight }}
    >
      {loading && <AllWhiteLoading />}

      <div className={styles.content} ref={ref}>
        <div>
          <img src={bgImg1} alt="" />
          <img src={bgImg2} alt="" onClick={goToIndexList} />
          <img src={bgImg3} alt="" />
          <img src={bgImg4} alt="" />
          <img src={bgImg5} alt="" />
          <img src={bgImg6} alt="" onLoad={() => setLoading(false)} />
          <div className={styles.block}></div>
        </div>
      </div>

      <div className={styles.footBtnBlock}>
        <img src={footBtn} alt="" onClick={goToIndexList} style={{ width: '100%' }} />
        {
          //   <div className={styles.footSingleBtn}>
          //     <div className={styles.submit} onClick={goToIndexList}>
          //       立即申请
          // </div>
          //   </div>
        }
      </div>
    </div>
  );
};

export default connect(({ advertBili }: { advertBili: AdvertBiliModelState }) => ({ advertBili }))(
  AdvertBiliPage,
);
