import React from 'react';

import pageLeftIcon from '@/assets/img/page_left.png';
import pageRightIcon from '@/assets/img/page_right.png';

import style from './index.less';

interface PageTitle {
  text: string;
}

const Page: React.FC<PageTitle> = (props) => {
  const { text = '' } = props;

  return (
    <div className={style.pageTitle}>
      <img src={pageLeftIcon} alt="" />
      {text}
      <img src={pageRightIcon} alt="" />
    </div>
  );
};

export default Page;
