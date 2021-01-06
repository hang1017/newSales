import React, { FC, useEffect, useState } from 'react';
import { EditUserNameModelState, ConnectProps, connect, setPageNavBar, history } from 'alita';
import CommonInput from '@/components/CommonInput';
import Utils from '@/utils/tool';
import { Modal, Toast } from 'antd-mobile';

import styles from './index.less';

interface PageProps extends ConnectProps {
  editUserName: EditUserNameModelState;
}
let tempNickName = '';
const EditUserNamePage: FC<PageProps> = ({ editUserName, dispatch }) => {
  const member = Utils.getStorageForJson('memberInfo');
  const { nickname } = member;
  const [myNickName, updateNickName] = useState(nickname);

  const updateMember = () => {
    Modal.alert('提示', '确定修改该昵称?', [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          dispatch!({
            type: 'editPersonalInfo/updateMember',
            payload: {
              nickname: tempNickName,
              phone: member.phone,
            },
          }).then(() => {
            Toast.success('修改成功');
            Utils.setStorageForJson('memberInfo', {
              ...member,
              nickname: tempNickName,
            });
            history.goBack();
          });
        },
      },
    ]);
  };
  // 这里发起了初始化请求
  useEffect(() => {
    setPageNavBar({
      pagePath: '/personCenter/editUserName',
      navBar: {
        rightContent: (
          <span className={styles.submitBtn} onClick={updateMember}>
            确定
          </span>
        ),
      },
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = editUserName;
  const onChange = (value: string) => {
    console.log(`sss:${value}`);
    updateNickName(value);
    tempNickName = value;
  };

  return (
    <div className={styles.editUserNamePage}>
      <div className={styles.myForm}>
        <CommonInput value={myNickName} onChange={onChange} maxLength={8} inputType="text" />
      </div>
    </div>
  );
};

export default connect(({ editUserName }: { editUserName: EditUserNameModelState }) => ({
  editUserName,
}))(EditUserNamePage);
