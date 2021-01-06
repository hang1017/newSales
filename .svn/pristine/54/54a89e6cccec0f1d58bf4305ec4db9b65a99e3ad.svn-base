import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';

import IconShopAction from '@/assets/img/goodsdetail/shop-action.png';
import { red, Color } from 'chalk';

type TypeEmnu = 'select' | 'input';
type KeyBoardType = 'number' | 'text' | 'password';
type FunctionType = (e?: any) => void;

interface FormItemProps {
  type: TypeEmnu;
  placeholder?: string;
  value?: string;
  maxlength?: number; // type为input时生效
  keyborderType?: KeyBoardType;
  title: string;
  onClick?: FunctionType;
  onBlur?: FunctionType;
  onChange?: FunctionType;
  smRight?: boolean; // 右侧是否有间距
  extra?: React.ReactNode;
  isRequest?: boolean;
  blue?: boolean;
  regex?: any;
}

const FormItem: FC<FormItemProps> = (props) => {
  const [inputText, setInputText] = useState('');
  const {
    type = 'input',
    placeholder = '',
    value = '',
    maxlength = 999,
    keyborderType = 'text',
    title = '',
    onChange = () => {},
    onBlur = () => {},
    onClick = () => {},
    smRight = false,
    isRequest = false,
    extra = <></>,
    blue = false,
    regex,
  } = props;

  useEffect(() => {
    setInputText(value);
    return () => {};
  }, [value]);

  const renderInput = () => {
    return (
      <div onClick={onClick} className={styles.selectItem}>
        <input
          className={styles.inputItem}
          style={smRight ? { marginRight: '0.32rem' } : {}}
          type={keyborderType}
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => {
            e.preventDefault();
            const text = e.currentTarget.value;
            if (text.length <= maxlength) {
              if (regex) {
                if (regex.test(text)) {
                  setInputText(text);
                  onChange(text);
                }
              } else {
                setInputText(text);
                onChange(text);
              }
            }
          }}
          onBlur={(e) => {
            e.preventDefault();
            const text = e.currentTarget.value;
            if (text.length <= maxlength) {
              setInputText(text);
              onBlur(text);
            }
          }}
        />
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <div onClick={onClick} className={styles.selectItem}>
        <div className={styles.placeholder} hidden={value.length !== 0}>
          {placeholder}
        </div>
        <div hidden={value.length === 0}>{value}</div>
        <img src={IconShopAction} alt="" />
      </div>
    );
  };

  const inputType = () => {
    switch (type) {
      case 'input':
        return renderInput();
      case 'select':
        return renderSelect();
      default:
        break;
    }
  };

  return (
    <div className={styles.formItem}>
      <span className={blue ? styles.blueRequest : styles.request} hidden={!isRequest}>
        *
      </span>
      <div className={styles.formItemTitle}>{title}</div>
      {inputType()}
      {extra}
    </div>
  );
};

export default FormItem;
