import React, { FC } from 'react';

import HasHelpImg from '@/assets/img/starPkg/hasHelp.png';
import styles from './index.less';

interface FriendListProps {
  data: any[];
  mode?: 'light' | 'dark';
}

const FriendList: FC<FriendListProps> = (props) => {
  const { data = [], mode = 'light' } = props;
  return (
    <div className={styles.friendListStyle}>
      {(data || []).map((item: any) => (
        <div className={styles.friendItem}>
          <img
            className={styles.friendImg}
            src={item?.type === 'no' ? item?.boostFriendsPic : HasHelpImg}
          />
          {mode === 'light' && (
            <div className={item?.type !== 'no' ? styles.friendName : styles.friendNameNo}>
              {item?.boostFriendsName}
            </div>
          )}
          {mode === 'dark' && <div className={styles.friendNameDark}>{item?.boostFriendsName}</div>}
        </div>
      ))}
    </div>
  );
};

export default FriendList;
