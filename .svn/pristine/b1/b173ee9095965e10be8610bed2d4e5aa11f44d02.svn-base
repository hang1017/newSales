import React from 'react';

import style from './index.less';

interface ConvergencePackageItem {
  data: any;
  onClick?: (item: any) => void;
}

const Page: React.FC<ConvergencePackageItem> = (props) => {
  const { data = '' } = props || {};
  return (
    <div className={style.covergenceItem}>
      <img src={data.icon} alt="" />
      <div className={style.packgeName}>{data.title || ''}</div>
      <div className={style.priceDes}>{data.priceDes || ''}</div>
    </div>
  );
};

export default Page;
