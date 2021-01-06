import React, { FC, useEffect } from 'react';
import { DefaultPageModelState, ConnectProps, connect, setPageNavBar } from 'alita';
import defaultIcon from '@/assets/img/customer/default_page.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  defaultPage: DefaultPageModelState;
}

const DefaultPagePage: FC<PageProps> = ({ defaultPage, location }) => {
  const { errMessage = '' } = location.query || {}
  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = defaultPage;
  return <div className={styles.defaultPage}>

    <img src={defaultIcon} alt='' />
    <div className={styles.pageText}>不可访问</div>
    <div className={styles.errorMsg}>{errMessage}</div>
    <div className={styles.footerBlock}></div>
  </div>;
};

export default connect(({ defaultPage }: { defaultPage: DefaultPageModelState; }) => ({ defaultPage }))(DefaultPagePage);
