import React, { FC, useEffect, useState } from 'react';
import { EditPersonalInfoModelState, ConnectProps, connect, history } from 'alita';
import DynamicForm, { IFormItemProps, useForm } from '@alitajs/dform';
import toux from '@/assets/img/my/toux.png';
import rightMoreIcon from '@/assets/img/rigth_more.png';
import Utils from '@/utils/tool';
import { Toast, Modal } from 'antd-mobile';

import styles from './index.less';

interface PageProps extends ConnectProps {
  editPersonalInfo: EditPersonalInfoModelState;
}

const EditPersonalInfoPage: FC<PageProps> = ({ dispatch, location }) => {
  const [memberInfo, setMemberInfo] = useState({});
  const { nickname, gender, birthday } = memberInfo;
  const [urlType] = useState(location.query?.type || '');
  // 这里发起了初始化请求
  useEffect(() => {
    const member = Utils.getStorageForJson('memberInfo') || {};
    setMemberInfo(member);
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  const editUserName = () => {
    history.push({
      pathname: '/personCenter/editUserName',
    });
  };
  const editUserPhone = () => {
    history.push({
      pathname: '/personCenter/editUserPhone',
    });
  };
  const updateMemberInfo = (updateInfo: any) => {
    dispatch!({
      type: 'editPersonalInfo/updateMember',
      payload: { ...updateInfo },
    }).then(() => {
      Toast.success('修改成功');
      Utils.setStorageForJson('memberInfo', {
        ...memberInfo,
        ...updateInfo,
      });
    });
  };
  const sexList = [
    [
      {
        label: '男',
        value: '1000',
      },
      {
        label: '女',
        value: '2000',
      },
    ],
  ];
  const formsData = ([
    {
      type: 'select',
      fieldProps: 'gender',
      placeholder: '请选择',
      title: '性别',
      data: sexList,
      onOk: (value: any) => {
        if (value && value.length) {
          updateMemberInfo({
            gender: value[0],
          });
        }

        console.log(value);
      },
    },
    {
      type: 'date',
      fieldProps: 'birthday',
      placeholder: '请选择',
      title: '出生日期',
      maxDate: new Date(),
      minDate: new Date('1900-01-01'),
      onOk: (value: any) => {
        // eslint-disable-next-line no-shadow
        const birthday = Utils.formateDate(value);
        updateMemberInfo({ birthday });
      },
    },
  ] as unknown) as IFormItemProps[];
  const [form] = useForm();
  console.log(gender);
  const formProps = {
    onFinishFailed: (values: any) => {
      console.info('onFinishFailed', values);
    },
    formsValues: {
      // nickname,
      gender: gender === '1000' || gender === '2000' ? [gender] : '',
      birthday: birthday ? new Date(birthday) : null,
    },
    data: formsData,
    form,
  };

  /**
   * 退出登录
   */
  const loginOut = () => {
    Modal.alert('提示信息', '确定退出登录吗?', [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          localStorage.setItem('tokenCode', '');
          // history.push({
          //   pathname: '/login',
          // });

          Utils.setStorageForJson('memberInfo', {}); // 清空memberInfo
          localStorage.setItem('grayFlag', '');
          // localStorage.removeItem('source');
          // localStorage.removeItem('sn');
          Toast.success('退出成功');
          if (window.socket) {
            window.socket.disconnect();
            window.socket = null;
          }
          dispatch!({
            type: 'orderConfirm/save',
            payload: {
              loginFlag: true,
            },
          });
          dispatch!({
            type: 'myPage/save',
            payload: {
              userSelectPhone: '',
            },
          });
          if (urlType === 'goose') {
            history.go(-2);
          } else {
            dispatch!({
              type: 'indexList/goToIndexList',
            });
          }
        },
      },
    ]);
  };

  /**
   * 头像点击改变事件
   * @param e
   */
  const fileChange = (e: any) => {
    const { files = {} } = e.target;
    if (Object.keys(files).length === 0) return;
    dispatch!({
      type: 'my/modHeaderPortrait',
      payload: {
        file: files[0],
      },
    }).then((flag: boolean = false) => {
      // 如果上传接口执行成功
      // 替换 Storage 的 memberInfo 数据，以及页面上的 memberInfo 数据
      if (flag) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = function (ie) {
          const newMemberInfo = JSON.parse(JSON.stringify(memberInfo));
          setMemberInfo({ ...newMemberInfo, profilePhoto: ie?.target?.result }); // 替换页面数据
          Utils.setStorageForJson('memberInfo', {
            ...newMemberInfo,
            profilePhoto: ie?.target?.result,
          }); // 替换全局数据
        };
      }
    });
  };

  return (
    <div className={styles.editInfoPage}>
      <div className={styles.myDisbleInfo}>
        <div className={styles.formCell}>
          <div className={styles.labeText}>头像</div>
          <div className={styles.touxDiv}>
            <img src={memberInfo?.profilePhoto || toux} className={styles.toux} />
            <input
              className={styles.touxInput}
              type="file"
              name="file"
              accept="image/*"
              onChange={fileChange}
            />
          </div>
        </div>
        <div className={styles.formCell}>
          <div className={styles.labeText}>绑定手机号码</div>
          <div className={styles.formValue}>{memberInfo?.phone}</div>
          <div onClick={editUserPhone}>
            更换
            <img src={rightMoreIcon} />
          </div>
        </div>
      </div>

      <div className={styles.myForm}>
        <div className={styles.formCell} onClick={editUserName}>
          <div className={`${styles.labeText} ${styles.nickLabel}`}>昵称</div>
          <div className={`${styles.formValue} ${styles.nickValue}`}>
            {nickname}
            <img src={rightMoreIcon} onClick={editUserName} />
          </div>
        </div>
        <DynamicForm {...formProps} />
      </div>

      <div className={styles.loginOut} onClick={loginOut}>
        退出登录
      </div>
    </div>
  );
};

export default connect(
  ({ editPersonalInfo }: { editPersonalInfo: EditPersonalInfoModelState }) => ({
    editPersonalInfo,
  }),
)(EditPersonalInfoPage);
