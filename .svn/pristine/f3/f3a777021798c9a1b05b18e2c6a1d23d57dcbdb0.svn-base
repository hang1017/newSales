import MySearchBar from '@/components/MySearchBar';
import CheckBoxOfMember from '@/pages/sect/components/CheckBoxOfMember';
import { AllMemberModelState, connect, ConnectProps } from 'alita';
import { List, Modal, Toast } from 'antd-mobile';
import classnames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import Utils from '@/utils/tool';

import clipboard from '@/utils/clipboard';
import styles from './index.less';



interface PageProps extends ConnectProps {
  allMember: AllMemberModelState;
}

const AllMemberPage: FC<PageProps> = ({ allMember, dispatch }) => {
  const [isManage, UpdateIsManage] = useState(false);
  const [showModal, UpdateShowModal] = useState(false);
  const [leaveList, UpdateLeaveList] = useState([]);
  const [val, updateVal] = useState('');
  const [copyUrl, updateCopyUrl] = useState('');
  const { memberList = [], isOwner = false, circleInstId, accNbr, unclaimedId } = allMember;
  /**
   * 分享圈子
   */
  const shareCircle = () => {
    dispatch!({
      type: 'headSect/shareCircle',
      payload: {
        circleInstId,
      }
    }).then((res: string) => {
      if (res) {
        updateCopyUrl(decodeURIComponent(res));
      }

    })
  }
  // 这里发起了初始化请求
  useEffect(() => {
    shareCircle();
    dispatch!({
      type: 'allMember/qrySectMemberList',
    });
    // return () => {
    //   // 这里写一些需要消除副作用的代码
    //   // 如: 声明周期中写在 componentWillUnmount
    // };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明



  const normalBtnList = [
    {
      color: '#1461FC',
      name: '邀请',
      onClick: (item: any, event) => {
        clipboard(copyUrl, event)
        console.log('邀请-------');
        // shareCircle();
      },
    },
    {
      color: '#1C60FF',
      background: '#1C60FF',
      textColor: '#ffffff',
      name: '管理',
      onClick: (item: any) => {
        console.log('通过-------');
        UpdateIsManage(true);
      },
    },
  ];

  const managerBtnList = [
    {
      color: '#FF481C',
      name: '移除',
      onClick: (item: any) => {
        console.log('移除-------');
        if (leaveList.length === 0) {
          Toast.info('请至少选择一个成员移除');
          return;
        }
        UpdateShowModal(true);
      },
    },
    {
      color: '#1C60FF',
      background: '#1C60FF',
      textColor: '#ffffff',
      name: '完成',
      onClick: (item: any) => {
        console.log('完成-------');
        UpdateIsManage(false);
      },
    },
  ];

  const leaveMember = () => {
    dispatch!({
      type: 'allMember/sectLeaveMember',
      payload: {
        leaveCircleCmdList: leaveList,
      },
    }).then(() => {
      dispatch!({
        type: 'allMember/qrySectMemberList',
      });
      UpdateLeaveList([]);
      UpdateIsManage(false);
    });
  }

  const closeModal = () => {
    UpdateShowModal(false);
  }

  // 选中成员
  const checkOnchange = (memberItem: any) => {
    const { marketingCircleInstId, mktCircleMemInstId } = memberItem;
    if (leaveList.length > 0) {
      let isCheck = true;
      for (let index = 0; index < leaveList.length; index += 1) {
        if (leaveList[index].marketCircleMemInstId === mktCircleMemInstId) {
          leaveList.splice(index, 1);
          isCheck = false;
          break;
        }
      }
      if (isCheck) {
        leaveList.push({ circleInstId: marketingCircleInstId, marketCircleMemInstId: mktCircleMemInstId });
      }
    } else {
      leaveList.push({ circleInstId: marketingCircleInstId, marketCircleMemInstId: mktCircleMemInstId });
    }
    UpdateLeaveList(leaveList);
  }

  // 加载子项的内容
  const renderItemView = (item: any) => (
    <div onClick={() => {
      // 若存在优惠券id，则说明是优惠券跳转过来的
      if (unclaimedId) {
        dispatch!({
          type: 'sectCoupon/sectAllotCoupon',
          payload: {
            accNbr,
            allotAccNbr: item.accNbre,
            allotMemberId: item.memberId,
            mktCircleInstId: circleInstId,
            unclaimedId,
          },
        }).then(() => {
          // 往前退一个界面
          history.go(-1);
        })
      }
    }}>
      <CheckBoxOfMember
        isCheck={isManage}
        itemData={item}
        checkOnChange={checkOnchange}
      // btnList={normalBtnList}
      />
    </div>
  )

  return (
    <div className={styles.contentLayout}>
      <div className={styles.searchBar}>
        <MySearchBar
          placeholder="搜索成员名字"
          value={val}
          onChange={(val) => {
            updateVal(val);
          }}
          onOk={(val: string) => {
            dispatch!({
              type: 'allMember/qrySectMemberList',
              payload: {
                nickName: val,
              }
            });
          }}
          onCancel={() => {
            dispatch!({
              type: 'allMember/qrySectMemberList',
            });
          }}
        />
      </div>
      <div className={styles.listLayout} style={{ marginBottom: (isOwner && !unclaimedId) ? '1.5rem' : '0' }}>
        <List>
          {
            memberList.length ? memberList.map((item: any) => renderItemView(item)) : null
          }
        </List>
      </div>
      {
        isOwner && !unclaimedId && (
          <div className={styles.btnLayout}>
            {
              (isManage ? managerBtnList : normalBtnList).map((btnItem: any, index: number) => (
                <div
                  data-clipboard-text={btnItem.name === '邀请' ? copyUrl : ''}
                  className={classnames({ [styles.btn]: true, copyText: btnItem.name === '邀请' })}
                  style={{
                    background: btnItem.background ? btnItem.background : '',
                    borderColor: btnItem.color,
                    color: btnItem.textColor ? btnItem.textColor : btnItem.color,
                  }}
                  key={btnItem.name + index}
                  onClick={(event) => {
                    btnItem.onClick(btnItem, event);
                  }}
                >
                  {btnItem.name}
                </div>
              )
              )
            }
          </div>
        )
      }
      <Modal
        visible={showModal}
        transparent
        maskClosable={false}
        onClose={closeModal}
        title=""
        footer={[
          { text: '否', onPress: () => { closeModal(); } },
          { text: '是', onPress: () => { leaveMember(); closeModal(); }, }
        ]}
      >
        <div className={styles.modalLayout}>
          移除成员后不可撤销，是否确认移除成员？
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ allMember }: { allMember: AllMemberModelState }) => ({ allMember }))(AllMemberPage);
