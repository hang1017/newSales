import React, { FC } from 'react';
import IconAvatar from '@/assets/img/goodsdetail/command-avatar.png';
import styles from './index.less';
import IconHStar from '@/assets/img/goodsdetail/command-star5.png';
import IconStar from '@/assets/img/goodsdetail/command-star.png';
import IconAStar from '@/assets/img/goodsdetail/command-astar.png';

interface CommentViewProps {
  commentInfo?: any;
}

const CommentItem: FC<CommentViewProps> = (props) => {
  const { commentInfo = {} } = props;
  const { memberName = '', goodCmmt = '', goodName = '', memberLevel = '' } = commentInfo;
  const renderStoreView = (num = 0) => {
    const stars = [];
    for (let index = 0; index < 5; index++) {
      const score = Math.floor(num);
      //   if (score ===  num) {
      //     // 整数
      //   }
      if (index < score) {
        stars.push(<img src={IconAStar} key={`${num}${index}`} />);
      } else {
        if (score === num) {
          stars.push(<img src={IconStar} key={`${num}${index}`} />);
        } else if (score === index) {
          stars.push(<img src={IconHStar} key={`${num}${index}`} />);
        } else {
          stars.push(<img src={IconStar} key={`${num}${index}`} />);
        }
      }
    }

    return <>{stars}</>;
  };
  let commentName = memberName;
  // if (memberName.length > 12) {
  //   commentName = `${memberName.substr(0, 1)}*${memberName.substr(
  //     memberName.length - 1,
  //     memberName.length,
  //   )}`;
  // }
  return (
    <div>
      <div className={styles.commentCell}>
        <div className={styles.commentHead}>
          <div className={styles.hd}>
            <img src={IconAvatar} alt="" />
            <span>{commentName}</span>
          </div>
          <div className={styles.stars}>{renderStoreView(parseInt(memberLevel))}</div>
        </div>

        <div className={styles.conmentContent}>{goodCmmt}</div>
        <div className={styles.commentOfferpackage}>{goodName}</div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default CommentItem;
