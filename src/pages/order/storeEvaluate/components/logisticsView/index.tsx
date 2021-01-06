import React, { FC, useState } from 'react';
import styles from './index.less';
import IconLogo from '@/assets/img/order/logo.png';
import RankItem from '@/components/RankItem';
import { EvaluateKinds, StarScore } from '@/utils/AppContext';

interface LogisticsViewProps {
  detail?: any;
  onChange: (e) => void;
}

const LogisticsView: FC<LogisticsViewProps> = ({ onChange = () => {}, detail = {} }) => {
  const [logisticsStore, setLogisticsStore] = useState({
    totalScore: StarScore.five,
    servScore: StarScore.five,
  });
  return (
    <div className={styles.logisticsView}>
      <div className={styles.storeInfo}>
        <img src={IconLogo} alt="" />
        <span>{detail.storeName}</span>
      </div>
      <RankItem
        label="物流服务"
        onClick={(rank: number, evaluteType: string) => {
          const store = {
            ...logisticsStore,
            totalScore: (11 + rank) * 100,
          };
          setLogisticsStore(store);
          onChange(store);
        }}
        evaluteType={EvaluateKinds.service}
      />
      <RankItem
        label="服务态度"
        onClick={(rank: number, evaluteType: string) => {
          const store = {
            ...logisticsStore,
            servScore: (11 + rank) * 100,
          };
          setLogisticsStore(store);
          onChange(store);
        }}
        evaluteType={EvaluateKinds.service}
      />
    </div>
  );
};

export default LogisticsView;
