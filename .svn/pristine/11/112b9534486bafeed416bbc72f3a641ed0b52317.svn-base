import React, { FC, useEffect, useState } from 'react';
import { CommonSuccessPageModelState, ConnectProps, connect, router } from 'alita';
import styles from './index.less';
import successIcon from '@/assets/img/login/success.png';
import { PageType } from '@/utils/AppContext';

interface PageProps extends ConnectProps {
  commonSuccessPage: CommonSuccessPageModelState;
}

const CommonSuccessPagePage: FC<PageProps> = ({ commonSuccessPage, dispatch }) => {
  let timer: NodeJS.Timeout | null = null;
  const [count, setCount] = useState(5);
  const { pageType } = commonSuccessPage;
  // 这里发起了初始化请求
  useEffect(() => {
    let count = 5;
    timer = setInterval(() => {
      count -= 1;
      setCount(count);
      if (count === 0) {
        goToPage();
      }
    }, 1000);
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
      clearTimer();
    };
  }, []);

  /* 清除计时器 */
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  //立即跳转
  const goToPage = () => {
    //先清除计时器
    clearTimer();

    switch (pageType) {
      case PageType.register:
        router.go(-4); //往后跳4页，返回到登录页面
        break;
      case PageType.forgetPw:
        router.go(-4); //往后跳4页，返回到登录页面
        break;
      default:
        break;
    }
  };

  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  let successtitle = '';
  switch (pageType) {
    case PageType.register:
      successtitle = '恭喜你，注册成功';
      break;
    case PageType.forgetPw:
      successtitle = '设置成功';
      break;
    default:
      break;
  }

  return (
    <div className={styles.center}>
      <img src={successIcon} className={styles.img} />
      <div className={styles.successContent}>{successtitle}</div>
      <div className={styles.countView}>
        系统将在<span>{count}秒</span>后自动跳转
      </div>
      <div className={styles.btn} onClick={goToPage}>
        立即跳转
      </div>
    </div>
  );
};

export default connect(
  ({ commonSuccessPage }: { commonSuccessPage: CommonSuccessPageModelState }) => ({
    commonSuccessPage,
  }),
)(CommonSuccessPagePage);
