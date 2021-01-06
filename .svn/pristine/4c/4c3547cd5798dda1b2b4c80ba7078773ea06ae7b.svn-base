import React, { useState } from 'react';

import defalutIcon from '@/assets/img/order/rank_default.png';
import selectIcon from '@/assets/img/order/rank_select.png';

import styles from './index.less';

interface RankItem {
  label: string;
  defalutRank?: number;
  onClick: (currentIndex: number, type: string) => void;
  evaluteType: string; // 评价类型，建议用字段名
}

const Page: React.FC<RankItem> = (props) => {
  const { label = '', defalutRank = 5, onClick, evaluteType = '' } = props;
  const [rank, updateRank] = useState(defalutRank);
  const rankList = [1, 1, 1, 1, 1];
  const myClick = (currentIndex: number) => {
    updateRank(currentIndex);
    if (onClick) {
      onClick(currentIndex, evaluteType);
    }
  };

  return (
    <div className={styles.rankItem}>
      <div className={styles.labelText}>{label}</div>
      {rankList.map((item, index) => {
        return (
          <img
            src={index <= rank ? selectIcon : defalutIcon}
            alt=""
            key={index}
            onClick={() => {
              myClick(index);
            }}
          />
        );
      })}
    </div>
  );
};

export default Page;
