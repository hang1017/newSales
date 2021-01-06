import React from 'react';

import defaultIcon from '@/assets/img/customer/sect/default_icon.png';
import memberIcon from '@/assets/img/customer/sect/member.png';
import greyMoreIcon from '@/assets/img/customer/sect/grey_more.png';

import styles from './index.less';

interface SectItem {
  data: any;
  current?: number;
  onClick?: (data: any) => void;

}

const Page: React.FC<SectItem> = (props) => {
  const { data, onClick, current } = props;
  const { marketingCircleInstName = '', sectsImage = '', circleTotal = '', circleSize = '' } = data || {};


  return (
    <div className={styles.headCell} onClick={() => {
      onClick(data);
    }}>
      <div className={styles.leftContent}>
        <div className={styles.myIndex}>{current < 10 ? `0${current}` : current}</div>
        <div><img src={sectsImage || defaultIcon} alt='' className={styles.headToux} /></div>
        <div>
          <div className={styles.headsTitle}>{marketingCircleInstName}<div />
            <div className={styles.showText}><img src={memberIcon} alt='' /><span className={styles.currentNum}>{circleTotal}</span>/{circleSize}</div>

          </div>
        </div>
      </div>
      <div><span className={styles.showText}>查看</span> <img src={greyMoreIcon} alt='' /></div>

    </div>
  );
};

export default Page;
