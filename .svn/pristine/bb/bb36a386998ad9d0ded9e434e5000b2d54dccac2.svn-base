import React from 'react';

import style from './index.less';

interface DiscoverTitle {
  titleIcon: string;
  title: string;
}

const Page: React.FC<DiscoverTitle> = (props) => {
  const { titleIcon = '', title = '' } = props;
  return (
    <div className={style.title}>
      <img src={titleIcon} />
      <span className={style.title}>{title}</span>
    </div>
  );
};

export default Page;
