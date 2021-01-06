import React from 'react';

import watermarkImg from '@/assets/img/discover/watermark.png';
import style from './index.less';

interface FootItem {
  text?: string;
}

const Page: React.FC<FootItem> = (props) => {
  const { text = '这是我的底线' } = props;

  return (
    <div className={style.fooBlock}>
      <div className={style.textBlock}>
        <div className={style.textItem}>
          <div className={style.textLine}></div>
        </div>
        <div className={`${style.textItem}  ${style.footText}`}>{text}</div>
        <div className={style.textItem}>
          <div className={style.textLine}></div>
        </div>
      </div>
      <div className={style.footImg}>
        <img src={watermarkImg} alt="" />
      </div>
    </div>
  );
};

export default Page;
