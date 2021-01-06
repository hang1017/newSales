// import { updateMappedTypeNode } from 'typescript';
import MySearchBar from '@/components/MySearchBar';
import CheckBoxOfMember from '@/pages/sect/components/CheckBoxOfMember';
import { connect, ConnectProps, AllMemberModelState, HeadSectModelState, history } from 'alita';
import { Modal } from 'antd-mobile';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';



interface PageProps extends ConnectProps {
  allMember: AllMemberModelState;
  headSect: HeadSectModelState;
}

const ShiftSectPage: FC<PageProps> = ({ allMember, headSect, dispatch }) => {
  
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'allMember/qrySectMemberList',
    });
    // return () => {
    //   // 这里写一些需要消除副作用的代码
    //   // 如: 声明周期中写在 componentWillUnmount
    // };
  }, []);

  const [val, updateVal] = useState('');
  const { memberList = [] } = allMember;
  const { userInfo } = headSect;

  const btnList = [
    {
      color: '#1C60FF',
      name: '转移',
      onClick: (item: any) => {
        console.log('转移-------');
        Modal.alert('', '掌门转移后不可撤销，是否确认转移？', [
          {
            text: '取消',
            onPress: () => { },
          },
          {
            text: '确定',
            onPress: () => {
              dispatch!({
                type: 'allMember/sectOwnerTransfer',
                payload: {
                  transferMarketingCircleInstMemberId: item.mktCircleMemInstId
                },
              }).then((success: any) => {
                if (success) {
                  dispatch!({
                    type: 'headSect/save',
                    payload: {
                      // 移除完该掌门变为了成员，更新标识
                      userInfo: {...userInfo, circleMemberType:'3'},
                    }
                  })
                  setTimeout(() => {
                    // 后退2个页面
                    history.go(-2);
                  }, 100);
                }
              });
            },
          }
        ]);
      },
    },
  ];

  // 加载子项的内容
  const renderItemView = (item: any) => (
    <CheckBoxOfMember
      isCheck={false}
      itemData={item}
      btnList={btnList}
    />
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
      <div className={styles.listLayout}>
        {
          memberList.length ? memberList.map((item: any) => renderItemView(item)) : null
        }
      </div>
    </div>
  );
};

export default connect(({ allMember, headSect }: { allMember: AllMemberModelState, headSect: HeadSectModelState }) => ({ allMember, headSect }))(ShiftSectPage);
