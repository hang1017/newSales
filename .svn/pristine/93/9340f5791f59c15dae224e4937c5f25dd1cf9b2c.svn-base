import React, { FC } from 'react';

import styles from './index.less';


interface RefundProgress {
  currentStatus: number;
  progressData: any;
}

const RefundProgress: FC<RefundProgress> = (props) => {
  const { currentStatus = 1, progressData = [] } = props;

  const renderView: any = () => {
    return progressData.map((_item, index) => {
      if (index < currentStatus) {
        return <>
          <div className={styles.activeRound}></div>
          <div className={styles.activeLine}></div>
        </>
      }
      if (index === currentStatus && (index < progressData.length - 1)) { // 非最后一个
        return <>
          <div className={styles.activeRound}></div>
          <div className={styles.normalLine}></div>
        </>
      }
      if (index > currentStatus && (index < progressData.length - 1)) {
        return <>
          <div className={styles.normalRound}></div>
          <div className={styles.normalLine}></div>
        </>
      }
      if (index > currentStatus && (index === progressData.length - 1)) {
        return <>
          <div className={styles.normalRound}></div>
        </>
      }
      if (index === currentStatus && (index === progressData.length - 1)) {
        return <>
          <div className={styles.activeRound}></div>
        </>
      }

      return <></>;

    })
  }

  return (
    <div className={styles.refundProgress}>
      <div className={styles.progress}>
        {renderView()}
      </div>
      <div className={styles.progressTextBlock}>
        {
          progressData.map(item => {
            return <div className={styles.progressText}>{item}</div>
          })
        }
      </div>
    </div>
  );
};

export default RefundProgress;
