import React, { FC, useEffect, useState, useRef } from 'react';
import { QuickOrderModelState, ConnectProps, connect } from 'alita';
import BetterScroll from 'better-scroll';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';
import { AllWhiteLoading } from '@/components';
import { FormCard } from '@/pages/quickOrder/components';
import YellowTopPng from '@/assets/img/quickOrder/yellowTop.png';
import Yellow2Png from '@/assets/img/quickOrder/yellow2.png';
import Yellow3Png from '@/assets/img/quickOrder/yellow3.png';
import Yellow4Png from '@/assets/img/quickOrder/yellow4.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  quickOrder: QuickOrderModelState;
}

let bs: BScrollConstructor<{}> | null = null;

const QuickOrderPage: FC<PageProps> = ({ quickOrder, dispatch, location }) => {
  const { source = '', sn = '', skuId = '', salesCode = '' } = location?.query;
  const [loadingFlag, setLoadingFlag] = useState<boolean>(true);
  const ref = useRef(null);
  useEffect(() => {
    document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';
    localStorage.setItem('source', source);
    localStorage.setItem('sn', sn);
    localStorage.setItem('salesCode', salesCode);

    dispatch!({
      type: 'indexList/dmosbrowse',
      payload: {
        sn: sn || '',
        source: source || '',
      },
    });
  }, []);

  if ((document.readyState === 'complete' || document.readyState === 'interactive') && !bs) {
    setTimeout(() => {
      bs = new BetterScroll(ref.current, {
        probeType: 3,
        scrollY: true,
        scrollX: false,
        click: true,
        bounce: false,
      });
    }, 100);
  }

  return (
    <div className={styles.proxyStyle} style={{ height: document.documentElement.clientHeight }}>
      {loadingFlag && <AllWhiteLoading />}
      <div className={styles.content} ref={ref}>
        <div>
          <img src={YellowTopPng} alt="" className={styles.proxyTop} />
          <div className={styles.proxyContent}>
            <img src={Yellow4Png} alt="" className={styles.proxyImg} />
            <div className={styles.formCardCompStyle}>
              <FormCard
                type={'user'}
                onSubmit={(values: any) => console.log(values)}
                paramAction="experienceQuickOrder"
              />
            </div>
            <img src={Yellow2Png} alt="" className={styles.proxyImg} />
            <img
              src={Yellow3Png}
              alt=""
              className={styles.proxyImg}
              onLoad={() => setLoadingFlag(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ quickOrder }: { quickOrder: QuickOrderModelState }) => ({ quickOrder }))(
  QuickOrderPage,
);
