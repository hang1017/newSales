import React, { FC } from 'react';
import styles from './index.less';
import { NavBar } from 'antd-mobile';
import classnames from 'classnames';

import IconLeftArrow from '@/assets/img/goodsdetail/left-arrow.png';
import IconShare from '@/assets/img/goodsdetail/share.png';
import IconMore from '@/assets/img/goodsdetail/more.png';
import { router } from 'alita';

interface GoodsDetailNavBarProps {
  narmalNavBar?: boolean;
  navBarTitle?: string;
  activeIndex?: number;
  hasRightContent?: boolean;
  switchToActiveIndex?: (index: number) => void;
}

const GoodsDetailNavBar: FC<GoodsDetailNavBarProps> = (props) => {
  const {
    activeIndex = 0,
    switchToActiveIndex = () => {},
    narmalNavBar = false,
    navBarTitle,
    hasRightContent = true,
  } = props;
  return (
    <div className={styles.header}>
      <NavBar
        mode="light"
        leftContent={
          <img
            src={IconLeftArrow}
            style={{ width: '0.48rem', height: '0.48rem' }}
            onClick={() => {
              router.goBack();
            }}
          />
        }
        rightContent={
          hasRightContent
            ? [
                <img
                  src={IconShare}
                  style={{ width: '0.48rem', height: '0.48rem', marginRight: '0.16rem' }}
                  key="01"
                  alt=""
                />,
                <img
                  src={IconMore}
                  style={{ width: '0.48rem', height: '0.48rem' }}
                  key="02"
                  alt=""
                />,
              ]
            : []
        }
      >
        {narmalNavBar ? (
          navBarTitle
        ) : (
          <>
            <div
              className={classnames({
                [styles.navTitle]: true,
                [styles.active]: activeIndex === 0,
              })}
              onClick={() => {
                switchToActiveIndex(0);
              }}
            >
              商品
            </div>
            <div
              className={classnames({
                [styles.navTitle]: true,
                [styles.active]: activeIndex === 1,
              })}
              onClick={() => {
                switchToActiveIndex(1);
              }}
            >
              评价
            </div>
            <div
              className={classnames({
                [styles.navTitle]: true,
                [styles.active]: activeIndex === 2,
              })}
              onClick={() => {
                switchToActiveIndex(2);
              }}
            >
              详情
            </div>
          </>
        )}
      </NavBar>
    </div>
  );
};

export default GoodsDetailNavBar;
