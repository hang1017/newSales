import React, { FC, useState, useEffect } from 'react';
import { SearchBar, Drawer } from 'antd-mobile';
import classnames from 'classnames';
import { ISearchBarProps } from './data';
import { LightUpIcon, LightDownIcon, DarkUpIcon, DarkDownIcon, SelectDrawerIcon } from './assets';
import styles from './index.less';

const IMG = {
  light: {
    up: LightUpIcon,
    down: LightDownIcon,
  },
  dark: {
    up: DarkUpIcon,
    down: DarkDownIcon,
  },
};

const SearchBarPage: FC<ISearchBarProps> = (props) => {
  const [currentValue, setCurrentValue] = useState<object>({});
  const [drawFlag, setDrawFlag] = useState<string>('down');
  const [drawTop, setDrawTop] = useState<number>(0);
  const {
    type = 'light',
    onOk,
    data = [],
    filterValue = 'all',
    alias = { label: 'label', value: 'value' },
    filterChange,
    ...otherProps
  } = props;

  useEffect(() => {
    if (!filterValue) return;
    if (!data || data.length === 0) return;
    const filterList = data.filter((it) => it[alias.value || 'value'] === filterValue);
    if (filterList && filterList.length) {
      setCurrentValue(filterList[0]);
    }
  }, [data, filterValue]);

  const onClickDrawItem = (id: string | number) => {
    if (filterChange) filterChange(id);
    const selValue = data.filter((it) => it[alias.value || 'value'] === id);
    if (selValue && selValue.length) setCurrentValue(selValue[0]);
    setDrawFlag(drawFlag === 'up' ? 'down' : 'up');
  };

  return (
    <React.Fragment>
      <div className={styles.searchBarStyle}>
        {data && data.length > 0 && (
          <div
            className={classnames({
              [styles.filterLight]: type === 'light',
              [styles.filterDark]: type === 'dark',
            })}
            onClick={() => {
              setDrawFlag(drawFlag === 'up' ? 'down' : 'up');
              if (drawFlag === 'down') {
                const drawTop =
                  document.getElementById('searchDrawerId')?.getBoundingClientRect()?.y || 0;
                setDrawTop(drawTop);
              }
            }}
          >
            <span className={styles.filterLabel}>{currentValue[alias.label || 'label'] || ''}</span>
            <img src={IMG[type][drawFlag]} alt="" className={styles.filterIcon} />
          </div>
        )}
        <div
          className={classnames({
            [styles.searchBarLight]: type === 'light',
            [styles.searchBarDark]: type === 'dark',
          })}
        >
          <SearchBar {...otherProps} onSubmit={onOk} onCancel={onOk} />
        </div>
      </div>

      <div
        id="searchDrawerId"
        className={styles.searchBarDrawer}
        style={drawFlag === 'up' ? { top: drawTop, position: 'fixed' } : {}}
      >
        <div className={styles.drawerStyle}>
          <Drawer
            position="top"
            open={drawFlag === 'up'}
            enableDragHandle={false}
            sidebar={
              <div className={styles.drawSidebar}>
                {data.map((item) => (
                  <div
                    key={item[alias.value || 'value']}
                    className={
                      item[alias.value || 'value'] === currentValue[alias.value || 'value']
                        ? styles.searchBarDrawerSelect
                        : styles.searchBarDrawerNormal
                    }
                    onClick={() => {
                      onClickDrawItem(item[alias.value || 'value']);
                    }}
                  >
                    <div className={styles.drawerItem}> {item[alias.label || 'label']}</div>
                    {item[alias.value || 'value'] === currentValue[alias.value || 'value'] && (
                      <div className={styles.searchBarDrawerItem} style={{ textAlign: 'right' }}>
                        <img src={SelectDrawerIcon} alt="" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchBarPage;
