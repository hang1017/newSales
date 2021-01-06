import React, { FC } from 'react';
import { WhiteSpace } from 'antd-mobile';
import styles from './index.less';
import CommentItem from '@/pages/shopProcess/goodsDetail/components/CommentItem';

interface CommentViewProps {
  isAllComment?: boolean;
  labelData?: any; // 评价标签数据
  onLabelClick?: (item: any) => void; // 标签点击事件
  commentData?: any; // 评价列表数据
  total?: number; // 评价数
  onItemClick?: () => void; // 评论点击事件
  onMoreClick?: () => void; // 查看更多
}

const CommentView: FC<CommentViewProps> = (props) => {
  const {
    isAllComment = false,
    labelData = [],
    onLabelClick,
    commentData = [],
    total = 0,
    onItemClick,
    onMoreClick,
  } = props;

  return (
    <>
      <WhiteSpace />
      <div className={styles.commentView}>
        <div className={styles.commentNavBar}>
          <div className={styles.leftTitle}>
            评价
            <span>{total > 2000 ? `${2000}+` : total}</span>
          </div>
          <div className={`${styles.rightItem} ${isAllComment && styles.hideRightArrow}`}>
            好评度99%
          </div>
        </div>
        <div className={styles.keywordTag}>
          {labelData.map((item: any) => {
            return (
              <div
                className={styles.tag}
                key={item.labelId}
                onClick={() => {
                  onLabelClick && onLabelClick(item);
                }}
              >
                {item.labelCmmt}({item.pageSize})
              </div>
            );
          })}
        </div>

        {!isAllComment && <div style={{ height: '0.12rem', backgroundColor: '#F5F7F9' }}></div>}
        {!isAllComment &&
          commentData.map((item: any) => {
            return (
              <div
                onClick={() => {
                  onItemClick && onItemClick();
                }}
              >
                <CommentItem commentInfo={item} />
              </div>
            );
          })}
        {!isAllComment && (
          <div
            className={styles.allComment}
            onClick={() => {
              onMoreClick && onMoreClick();
            }}
          >
            查看全部评论
          </div>
        )}
      </div>
    </>
  );
};

export default CommentView;
