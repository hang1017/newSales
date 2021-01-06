import React from 'react';

import style from './index.less';

interface SingleBtn {
  text: string; // 按钮的字体
  onClick?: (e) => void;
  canClick: Boolean;
  collect?: string;
}

const Page: React.FC<SingleBtn> = (props) => {
  const { text, onClick, canClick = true, collect } = props;
  const onClickFu = (e) => {
    if (canClick) {
      onClick(e);
    }
  };

  return (
    <div className={style.footSingleBtn}>
      <div className={canClick ? style.submit : style.grayBtn} onClick={onClickFu} param-action={collect || ''}>
        {text}
      </div>
    </div>
  );
};

export default Page;
