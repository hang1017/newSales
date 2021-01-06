import React, { FC, useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import classnames from 'classnames';
import { CheckIcon, UnCheckIcon } from './assets';
import { IDoubleButtonProps } from './data';
import styles from './index.less';

const DoubleButton: FC<IDoubleButtonProps> = (props) => {
  const { leftButton, rightButton, leftClick, rightClick } = props;

  return (
    <div className={styles.doubleButtonStyle}>
      <Button className={styles.leftStyle} onClick={leftClick}>
        {leftButton?.content}
      </Button>
      <Button onClick={rightClick} className={styles.rightStyle}>
        {rightButton?.content}
      </Button>
    </div>
  );
};

export default DoubleButton;
