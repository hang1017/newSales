import defaultIcon from '@/assets/img/customer/my/toux.png';
import { Checkbox } from 'antd-mobile';
import classnames from 'classnames';
import React from 'react';
import styles from './index.less';


/**
 * 列表带选择框的组件（可单纯列表也可多选的列表 isCheck区分）
 * dataList 列表的数据
 * btnList 列表右侧的按钮 color-只更改边框和文字的颜色 background-背景色 textColor-文字颜色，若没有设置，则默认使用color传进来的颜色
 * isCheck 是否展示可选的按钮
 * isApply 是否是入派申请界面
 */
interface checkBoxOfMember {
  itemData?: any;
  btnList?: any;
  isCheck?: boolean;
  isApply?: boolean;
  checkOnChange?: (data: any) => void;
}

const CheckboxItem = Checkbox.CheckboxItem;

const Page: React.FC<checkBoxOfMember> = (props) => {
  const { isCheck = false, itemData = [], btnList = [], checkOnChange, isApply = false } = props;

  // 根据类型获取角色名称
  const getRoleName = (type: any) => {
    let roleName = '';
    // 1 掌门 2 长老 3 成员
    switch(Number(type)) {
      case 1:
        roleName = '掌门';
        break;
      case 2:
        roleName = '长老';
        break;
      case 3:
        roleName = '成员';
        break;
      default:
        break;
    }
    return roleName;
  }
  
  // 每一个子项的左边内容
  const listItemLeftView = (itemData: any) => (
    <div className={styles.checkItem}>
      <img src={itemData.memberImage ? itemData.memberImage : defaultIcon} alt="" />
      <div className={styles.columnLayoutWithMargin}>
        <span className={styles.nameText}>{isApply ? itemData.marketingCircleInstName : itemData.nickName}</span>
        <span className={styles.roleText}>{isApply ? `申请时间 ${itemData.createDate}` : getRoleName(itemData.circleMemberType)}</span>
      </div>
    </div>
  );

  return (
    <div className={styles.columnLayout}>
      <div className={classnames({
          [styles.listItem]: true,
          [styles.listMargin]: !isCheck,
        })}>
        {
          isCheck ? (
            <CheckboxItem onChange={() => checkOnChange && checkOnChange(itemData)}>
              {listItemLeftView(itemData)}
            </CheckboxItem>
          ) : (
            <div className={styles.normalLayout}>
              {listItemLeftView(itemData)}
            </div>
          )
        }
        {
          (btnList && btnList.length) ? (
            <div className={styles.btnLayout}>
              {
                btnList.map((btnItem: any, index: number) => (
                    <div
                      className={classnames({ [styles.btn]: true })}
                      key={btnItem.name + index}
                      style={{
                        background: btnItem.background ? btnItem.background : '',
                        borderColor: btnItem.color,
                        color: btnItem.textColor ? btnItem.textColor : btnItem.color,
                      }}
                      onClick={() => {
                        btnItem.onClick(itemData);
                      }}
                    >
                      {btnItem.name}
                    </div>
                  )
                )
              }
            </div>
          ) : null
        }
      </div>
      <div className={ styles.greyLine} />
    </div>
  );
};

export default Page;
