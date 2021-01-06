import React from 'react';
import classnames from 'classnames';

import style from './index.less';

interface SingleBtn {
  text: string; // 按钮的字体
  onClick?: () => void;
  canClick: Boolean;
  newUIFlag?: boolean;
  action?: string;
}

const Page: React.FC<SingleBtn> = (props) => {
  const { text, onClick, canClick = true, newUIFlag = false, action = '' } = props;
  const onClickFu = () => {
    if (canClick) {
      onClick();
    }
  };

  return (
    <div className={style.footSingleBtn}>
      <div
        className={
          canClick
            ? classnames({
              [style.submit]: true,
              [style.newSubmit]: newUIFlag,
            })
            : style.grayBtn
        }
        onClick={onClickFu}
        param-action={action || ''}
      >
        {text}
      </div>
    </div >
  );
};

export default Page;
