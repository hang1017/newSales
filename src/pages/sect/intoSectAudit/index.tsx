import CheckBoxOfMember from '@/pages/sect/components/CheckBoxOfMember';
import { connect, ConnectProps, IntoSectAuditModelState } from 'alita';
import React, { FC, useState, useEffect, useRef} from 'react';
import LoadMoreListView, { LoadMoreListAttributes } from '@alitajs/list-view';
import { sectMemberList } from '@/services/sect';
import styles from './index.less';



interface PageProps extends ConnectProps {
  intoSectAudit: IntoSectAuditModelState;
}

const intoSectAuditPage: FC<PageProps> = ({ intoSectAudit, dispatch }) => {

  // 这里发起了初始化请求
  useEffect(() => {
    // dispatch!({
    //   type: 'intoSectAudit/qrySectMemberList',
    //   payload: {
    //     memberStatus: ["1000", "3000", "4000"],
    //     applyFlag: true,
    //   },
    // });
    // return () => {
    //   // 这里写一些需要消除副作用的代码
    //   // 如: 声明周期中写在 componentWillUnmount
    // };
  }, []);

  const { memberList = [], circleInstId } = intoSectAudit;

  const [reqParams, updateReqParams] = useState({
    current: 1,
    size: 20,
    marketingCircleInstId: circleInstId,
    memberStatus: ["1000", "3000", "4000"],
    applyFlag: true,
    circleMemberTypes:["3"],
  });

  // const reqParams = {
  //   current: 1,
  //   size: 20,
  //   marketingCircleInstId: circleInstId,
  //   memberStatus: ["1000", "3000", "4000"],
  //   applyFlag: true,
  // };

  // 成员入派审批
  const auditMember = (status: any, marketingCircleInstId: any, mktCircleMemInstId: any) => {
    dispatch!({
      type: 'intoSectAudit/sectApplyAuditing',
      payload: {
        // approvalOperation 1000:审批通过 2000:失效 3000:待审批 4000：审批不通过
        approvalOperation: status,
        marketingCircleInstId,
	      mktCircleMemInstId,
      },
    }).then(() => {
      // dispatch!({
      //   type: 'intoSectAudit/qrySectMemberList',
      //   payload: {
      //     memberStatus: ["1000", "3000", "4000"],
      //     applyFlag: true,
      //   },
      // });
      // getSectMemberList({ ...reqParams, current: 1 });
      updateReqParams({ ...reqParams, current: 1, size: 20 });
      loadMoreList.current?.reloadDataSource();
    });
  }

  const normalBtnList = [
    {
      color: '#FF481C',
      name: '拒绝',
      onClick: (item: any) => {
        console.log('拒绝-------');
        auditMember('4000', item.marketingCircleInstId, item.mktCircleMemInstId);
      },
    },
    {
      color: '#1C60FF',
      background: '#1C60FF',
      textColor: '#ffffff',
      name: '通过',
      onClick: (item: any) => {
        console.log('通过-------');
        auditMember('1000', item.marketingCircleInstId, item.mktCircleMemInstId);
      },
    },
  ];

  const textBtnList = [
    {
      color: 'transparent',
      name: '已同意',
      textColor: '#BCBCBC',
      onClick: (item: any) => {
      },
    },
    {
      color: 'transparent',
      name: '已拒绝',
      textColor: '#BCBCBC',
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
      // 失效
      case '2000':
        // retList = normalBtnList;
        break;
      // 待审批
      case '3000':
        retList = normalBtnList;
        break;
      // 审批不通过
      case '4000':
        retList.push(textBtnList[1]);
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

export default connect(({ intoSectAudit }: { intoSectAudit: IntoSectAuditModelState }) => ({ intoSectAudit }))(intoSectAuditPage);
