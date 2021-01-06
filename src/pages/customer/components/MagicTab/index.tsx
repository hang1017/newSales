import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { MagicTabProps, MagicTabDataProps } from './data';
import { IconTabLeft, IconTabRight } from './asset';

const MagicTab: FC<MagicTabProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { initiazePage = 0, onTabClick = () => {}, data = [] } = props;

  useEffect(() => {
    setActiveIndex(initiazePage);
  }, [initiazePage]);

  const tabClick = (index: number) => {
    setActiveIndex(index);
    onTabClick(index);
  };
  const renderFirstView = (item: MagicTabDataProps) => {
    return (
      <>
        <span hidden={activeIndex === 0}>{item.title}</span>
        <div
          hidden={activeIndex !== 0}
          style={{ backgroundImage: `url(${IconTabLeft})` }}
          className={styles.tabItemBd}
        >
          <span>{item.title}</span>
        </div>
      </>
    );
  };

  const renderLastView = (item: MagicTabDataProps) => {
    return (
      <>
        <span hidden={activeIndex === data.length - 1}>{item.title}</span>
        <div
          hidden={activeIndex !== data.length - 1}
          style={{ backgroundImage: `url(${IconTabRight})` }}
          className={styles.tabItemBd}
        >
          <span>{item.title}</span>
        </div>
      </>
    );
  };

  const renderTabItemView = (item, index) => {
    if (index === 0) {
      return renderFirstView(item);
    }
    if (data.length - 1 === index) {
      return renderLastView(item);
    }

    return <div></div>;
  };

  return (
    <div className={styles.magicTab}>
      {data.map((item, index) => {
        return (
          <div
            className={classnames({
              [styles.tabItem]: true,
              [styles.tabItemActve]: activeIndex === index,
            })}
            onClick={() => tabClick(index)}
          >
            {renderTabItemView(item, index)}
          </div>
        );
      })}
    </div>
  );
};

export default MagicTab;
