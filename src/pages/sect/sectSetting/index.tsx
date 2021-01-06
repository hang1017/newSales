import React, { FC, useEffect } from 'react';
import { SectSettingModelState, ConnectProps, connect, history, HeadSectModelState } from 'alita';
import DynamicForm, { useForm } from '@alitajs/dform';
import defaultIcon from '@/assets/img/customer/sect/default_icon.png';
import rigthIcon from '@/assets/img/rigth_more.png';
import { Toast, Modal } from 'antd-mobile';
import styles from './index.less';

interface PageProps extends ConnectProps {
  sectSetting: SectSettingModelState;
  headSect: HeadSectModelState;

}

const SectSettingPage: FC<PageProps> = ({ sectSetting, headSect, dispatch, location }) => {
  const { circleMemberType } = location.query || {};
  const { userInfo, gridViewData } = headSect;
  const { mktCircleMemInstId, sectsImage = '' } = userInfo || {};
  // 这里发起了初始化请求
  useEffect(() => {
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { sectInfo } = sectSetting;
  const [form] = useForm();
  /**
   * 修改圈子信息
   */
  const updateSectInfo = () => {
    history.push({
      pathname: '/sect/createSect',
      query: {
        isUpdate: '1',
        circleMemberType,
      }
    });

  }
  const addrFormData = [
    {
      type: 'input',
      fieldProps: '',
      placeholder: '',
      title: '圈子头像',
      onClick: () => {
        updateSectInfo();
      },
      extra: <> <img src={sectInfo?.sectsImage || defaultIcon} alt='' onClick={updateSectInfo} className={styles.toux} /><img src={rigthIcon} alt='' className={styles.rigthIcon} onClick={updateSectInfo} /></>,
      editable: false,
    },
    {
      type: 'input',
      fieldProps: 'marketingCircleInstName',
      placeholder: '请输入圈子名称',
      editable: false,
      title: '圈子名称',
      extra: <img src={rigthIcon} alt='' className={styles.rigthIcon} onClick={updateSectInfo} />,
      onClick: () => {
        updateSectInfo();
      },
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'area',
      fieldProps: 'circleInstDesc',
      placeholder: '请输入圈子简介',
      labelNumber: 8,
      editable: false,
      positionType: 'vertical',
      title: '圈子简介',
      // required: true,
    },

  ];
  const formProps = {
    data: addrFormData,
    formsValues: {
      ...sectInfo,

    },
    form,
  };
  const onTransferClick = () => {
    // 转移圈子
    dispatch!({
      type: 'allMember/save',
      payload: {
        circleInstId: sectInfo.marketingCircleInstId,
        selfCircleMemInstId: mktCircleMemInstId,
      }
    });
    history.push({
      pathname: '/sect/shiftSect'
    });
  }

  /**
   * 退出圈子
   */
  const sectLeaveMember = () => {
    dispatch!({
      type: 'allMember/sectLeaveMember',
      payload: {
        leaveCircleCmdList: [{
          circleInstId: sectInfo.marketingCircleInstId,
          marketCircleMemInstId: mktCircleMemInstId
        }],
      }
    }).then(() => {
      // history.go(-2);

      setTimeout(() => {
        history.replace({
          pathname: '/sect/normalSect'
        });
      }, 1000);

    });
  }
  // 退出圈子
  const onExitClick = () => {
    if (circleMemberType === '1') {
      Toast.info('掌门位置要先转移，才能退出圈子');
    } else {

      Modal.alert('', '确定退出圈子吗?', [
        {
          text: '取消',
          onPress: () => { },
        },
        {
          text: '确定',
          onPress: () => {

            if (gridViewData.length <= 2) {
              Modal.alert('', '人数不足两人，退出后圈子将会自动解散 ', [
                {
                  text: '取消',
                  onPress: () => { },
                },
                {
                  text: '确定',
                  onPress: () => {
                    sectLeaveMember();
                  },
                },
              ]);
            }
            else {
              sectLeaveMember();
            }


          },
        }
      ]);
    }
  }

  return <div className={styles.center}>
    <DynamicForm {...formProps} />
    {
      circleMemberType === '1' && (
        <div className={styles.footBtn} onClick={onTransferClick}>转移圈子</div>
      )
    }
    <div className={styles.footBtn} onClick={onExitClick}>退出圈子</div>
  </div>;
};

export default connect(({ sectSetting, headSect }: { sectSetting: SectSettingModelState; headSect: HeadSectModelState }) => ({ sectSetting, headSect }))(SectSettingPage);
