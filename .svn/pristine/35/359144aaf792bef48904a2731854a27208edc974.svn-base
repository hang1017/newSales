import React, { FC, useEffect, useState } from 'react';
import { UpgradePageModelState, ConnectProps, connect } from 'alita';
import upgradeIcon from '@/assets/img/customer/upgrade.png';
import styles from '../defaultPage/index.less';

interface PageProps extends ConnectProps {
  upgradePage: UpgradePageModelState;
}

const UpgradePagePage: FC<PageProps> = ({ upgradePage, dispatch }) => {
  const [pageMsg, updatePageMsg] = useState('');
  // 这里发起了初始化请求
  useEffect(() => {
    // 升级的提示语
    dispatch!({
      type: 'login/getSystemParamsCacheByCode',
      payload: {
        paramCode: 'systemUpgradeTips'
      }
    }).then((res) => {
      const { paramVal } = res.data;
      updatePageMsg(paramVal);

    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = upgradePage;
  return <div className={styles.defaultPage}>

    <img src={upgradeIcon} alt='' />
    <div className={styles.pageText}>不可访问</div>
    <div className={styles.errorMsg}>{pageMsg}</div>
    <div className={styles.footerBlock}></div>
  </div>;
};

export default connect(({ upgradePage }: { upgradePage: UpgradePageModelState; }) => ({ upgradePage }))(UpgradePagePage);
