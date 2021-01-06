import React, { useState } from 'react';
import { router } from 'alita';

import styles from './index.less';
import searchIcon from '@/assets/img/order/search_icon.png';

interface SearchBar {
  value?: string; // 默认数据
  palceholder: string;
  onCancelClick?: () => void;
  onValueSearch?: (value: string) => void;
  onSearchIcon?: (value: string) => void;
  inputOnBlur?: () => void; // 失去焦点时
  inputOnFocus?: () => void; // 获取焦点时
}

const Page: React.FC<SearchBar> = (props) => {
  const {
    value = '',
    palceholder = '请输入',
    onCancelClick,
    onValueSearch,
    onSearchIcon,
    inputOnBlur,
    inputOnFocus,
    children,
  } = props;
  const [text, updateText] = useState(value);

  // 监听输入变化
  const onTextChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    updateText(e.target.value);
  };

  const onSearch = (value: any) => {
    const evt = window.event || value;
    if (evt.keyCode == 13) {
      onValueSearch && onValueSearch(text);
    }
  };
  return (
    <div>
      <div className={styles.topView}>
        <div className={styles.searchView}>
          <img
            src={searchIcon}
            onClick={() => {
              onSearchIcon && onSearchIcon(text);
            }}
          />
          <form action="" target="rfFrame">
            <input
              type="search"
              placeholder={palceholder}
              onChange={onTextChange}
              value={text}
              onKeyDown={onSearch}
              onBlur={inputOnBlur}
              onFocus={inputOnFocus}
            />
          </form>
        </div>
        <div
          className={styles.rightText}
          onClick={() => {
            if (onCancelClick) {
              onCancelClick();
            }
            router.goBack();
          }}
        >
          取消
        </div>
      </div>
      <iframe
        id="rfFrame"
        name="rfFrame"
        src={{ about: 'blank' }}
        style={{ display: 'none' }}
      ></iframe>
      {children}
    </div>
  );
};

export default Page;
