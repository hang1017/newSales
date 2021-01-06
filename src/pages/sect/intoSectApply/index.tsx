import CheckBoxOfMember from '@/pages/sect/components/CheckBoxOfMember';
import { connect, ConnectProps, IntoSectAuditModelState } from 'alita';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import React, { FC, useEffect, useRef, useState } from 'react';
import { sectMemberList } from '@/services/sect';
import styles from './index.less';



interface PageProps extends ConnectProps {
  intoSectAudit: IntoSectAuditModelState;
}

const intoSectApplyPage: FC<PageProps> = ({ intoSectAudit, dispatch }) => {
  
  // 这里发起了初始化请求
  useEffect(() => {
    // dispatch!({
    //   type: 'intoSectAudit/qrySectMemberList',
    //   payload: {
    //     memberStatus: ["1000", "2000", "3000", "4000", "5000"],
    //     applyFlag: true,
    //     accNbre: '' // 赋值在modal层进行赋值了
    //   },
    // });
  //   return () => {
  //     // 这里写一些需要消除副作用的代码
  //     // 如: 声明周期中写在 componentWillUnmount
  //   };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { accNbre } = intoSectAudit;
  const [reqParams, updateReqParams] = useState({
    current: 1,
    size: 20,
    memberStatus: ["1000", "2000", "3000", "4000", "5000"],
    applyFlag: true,
    accNbre,
  });
  // const reqParams = {
  //   current: 1,
  //   size: 20,
  //   memberStatus: ["1000", "2000", "3000", "4000", "5000"],
  //   applyFlag: true,
  //   accNbre,
  // };

  // 成员取消入派申请
  const cancelApplyIntoSect = (marketingCircleInstId: any, mktCircleMemInstId: any) => {
    dispatch!({
      type: 'intoSectAudit/sectApplyAuditing',
      payload: {
        // approvalOperation 1000:审批通过 2000:失效 3000:待审批 4000：审批不通过
        approvalOperation: '2000', // 取消申请
        marketingCircleInstId,
	      mktCircleMemInstId,
      },
    }).then(() => {
      // dispatch!({
      //   type: 'intoSectAudit/qrySectMemberList',
      //   payload: {
      //     memberStatus: ["1000", "2000", "3000", "4000", "5000"],
      //     applyFlag: true,
      //     accNbre: '' // 赋值在modal层进行赋值了
      //   },
      // });
      updateReqParams({ ...reqParams, current: 1, size: 20 });
      loadMoreList.current?.reloadDataSource();
    });
  }

  const normalBtnList = [
    {
      color: '#1C60FF',
      name: '取消申请',
      onClick: (item: any) => {
        console.log('取消申请-------');
        cancelApplyIntoSect(item.marketingCircleInstId, item.mktCircleMemInstId);
      },
    },
  ];

  const textBtnList = [
    {
      color: 'transparent',
      name: '已通过',
      textColor: '#45BA26',
      onClick: (item: any) => {
      },
    },
    {
      color: 'transparent',
      name: '被驳回',
      textColor: '#FE6600',
      onClick: (item: any) => {
      },
    },
    {
      color: 'transparent',
      name: '已取消',
      textColor: '#999999',
      onClick: (item: any) => {
      },
    },
    {
      color: 'transparent',
      name: '已失效',
      textColor: '#999999',
      onClick: (item: any) => {
      },
    },
  ];

  const getBtnList = (status: any) => {
    let retList: any = [];
    switch (status) {
      // 审批通过
      case '1000':
        retList.push(textBtnList[0]);
        break;
      // 失效-取消
      case '2000':
        retList.push(textBtnList[2]);
        break;
      // 待审批
      case '3000':
        retList = normalBtnList;
        break;
      // 审批不通过
      case '4000':
        retList.push(textBtnList[1]);
        break;
      // 已失效
      case '5000':
        retList.push(textBtnList[3]);
        break;
      default:
        break;
    }
    return retList;
  }

  const loadMoreList = useRef<LoadMoreListAttributes>(null);
  const getSectMemberList = async (params: object) => {
    return new Promise((resolve, reject) => {
      sectMemberList(params)
        .then((res: any) => {
          const { records = [], total = 0 } = res;
          const dataSource = { data: records, total };
          resolve(dataSource);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

  // 加载子项的内容
  const renderItemView = (item: any) => (
    <CheckBoxOfMember
      isCheck={false}
      isApply
      itemData={item}
      btnList={getBtnList(item.memberStatus)}
    />
  )

  return (
    <div className={styles.contentLayout}>
      <div className={styles.listLayout}>
        {/* {
          memberList.length ? memberList.map((item: any) => renderItemView(item)) : null
        } */}
        <LoadMoreListView
          ref={loadMoreList}
          requestFunc={getSectMemberList}
          renderRow={renderItemView}
          requestParams={reqParams}
          alias={{ page: 'current', pageSize: 'size' }}
        />
      </div>
    </div>
  );
};

export default connect(({ intoSectAudit }: { intoSectAudit: IntoSectAuditModelState }) => ({ intoSectAudit }))(intoSectApplyPage);
