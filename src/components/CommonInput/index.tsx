import React, { useState } from 'react';
import style from './index.less';
import deleteIcon from '@/assets/img/login/delete.png';
import showIcon from '@/assets/img/login/show_icon.png';
import unShowIcon from '@/assets/img/login/unshow.png';
/**
 * 公用输入框
 */
interface InputProps {
  value?: string; // 默认数据
  onChange?: (value: any) => void;
  placeholder?: string;
  inputType?: string; // 输入框类型
  showDelete?: boolean; // 是否显示删除按钮
  showPassword?: boolean; // 是否显示密码隐藏按钮
  maxLength?: number;
  regex?: any;
}

const Page: React.FC<InputProps> = (props) => {
  const {
    value = '',
    onChange,
    placeholder,
    inputType = 'text',
    showDelete,
    showPassword,
    maxLength = 100,
    regex,
  } = props;
  const [showPwImg, updateShowPwImg] = useState(unShowIcon);
  const [text, updateText] = useState(value);
  const [type, updateType] = useState(inputType);

  // 监听输入变化
  const onTextChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    if (!e.target.value) {
      updateText(e.target.value);
      onChange && onChange(e.target.value);
      return;
    }
    if (maxLength < e.target.value.length) return;
    if (regex) {
      if (regex.test(e.target.value)) {
        updateText(e.target.value);
        onChange && onChange(e.target.value);
      }
    } else {
      updateText(e.target.value);
      onChange && onChange(e.target.value);
    }
  };
  //清空数据
  const deleteValue = () => {
    updateText('');
    onChange && onChange('');
  };

  let showPw = false;
  const changeShowpw = () => {
    if (showPw) {
      updateShowPwImg(unShowIcon);
      updateType('password');
      showPw = false;
    } else {
      updateShowPwImg(showIcon);
      updateType('text');
      showPw = true;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.inputView}>
        <input
          className={style.inputStyle}
          onChange={onTextChange}
          value={text}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
        />
        {text && showDelete && (
          <img className={style.deleteImg} src={deleteIcon} onClick={deleteValue} />
        )}
        {showPassword && <img className={style.deleteImg} src={showPwImg} onClick={changeShowpw} />}
      </div>
      <div className={style.line} />
    </div>
  );
};

export default Page;
