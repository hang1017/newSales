import React, { FC, useEffect, useState } from 'react';
import { EmergencyModelState, ConnectProps, connect } from 'alita';
import { Toast } from 'antd-mobile';

import { IndexListBgPng } from '@/assets';
import userIcon from '@/assets/img/customer/user.png';
import phoneIcon from '@/assets/img/customer/phone.png';
import selectIcon from '@/assets/img/customer/emerge_select.png';

import SingleBtn from '@/pages/customer/components/SingleBtn';

import styles from './index.less';
import { values } from 'lodash';

interface PageProps extends ConnectProps {
  emergency: EmergencyModelState;
}

const EmergencyPage: FC<PageProps> = ({ emergency, dispatch }) => {
  const [select, updateSelect] = useState(0);
  const [userName, updateUserName] = useState('');
  const [phoone, updatePhone] = useState('');

  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'emergency/query',
    });
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = emergency;
  const productList = [
    {
      key: 0,
      proName: '洛神派',
      des: '5GB流量 送限定壁纸',
      price: 20,
    },
    {
      key: 1,
      proName: '天依派',
      des: '10GB流量 送购物袋',
      price: 60,
    },
    {
      key: 2,
      proName: '5G派',
      des: '20GB流量 送手机壳',
      price: 100,
    },
  ];
  /**
 * 校验手机
 * @param val
 */
  const veriryPhone = (value: string) => {
    if (value) {
      const phone = value.replace(/\s+/g, '');
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        Toast.fail('联系电话格式有误', 1);
        return false;
      }
      return true;
    }
    return false;
  };
  const mySubmit = (e) => {
    if (!userName) {
      Toast.fail('联系人姓名不能为空', 1);
      return;
    }

    if (!phoone) {
      Toast.fail('联系电话不能为空', 1);
      return;
    }
    const resFlag = veriryPhone(phoone);
    if (!resFlag) {
      Toast.fail('请输入正确的联系电话', 1);
      return;
    }

    console.log(userName + ':' + phoone);

    dispatch!({
      type: 'emergency/addEmergencyOrder',
      payload: {
        contactName: userName,
        contactPhone: phoone,
        leaveGoodsName: productList[select].proName,
      }
    }).then(() => {
      updatePhone('');
      updateUserName('');
      updateSelect(0);
    });
  }
  const { clientHeight } = document.documentElement;
  return <div className={styles.emergency} style={{ height: clientHeight }}>
    <img src={IndexListBgPng} alt='' className={styles.ilTopImg} />
    <div className={styles.productContent} style={{ maxHeight: clientHeight * 0.7 }}>
      <div className={styles.formInput}>
        <div>
          <img src={userIcon} alt='' className={styles.formIcon} />
          <span className={styles.label}>联系人姓名</span>
        </div>
        <input placeholder='请输入联系人姓名'
          value={userName}
          onChange={(val) => {
            const myValue = val.currentTarget.value;

            updateUserName(myValue)
          }}
        />

      </div>
      <div className={styles.formInput}>
        <div>
          <img src={phoneIcon} alt='' className={styles.formIcon} />
          <span className={styles.label}>联系电话</span>
        </div>
        <input placeholder='请输入联系电话'
          type='number'
          maxLength={11}
          value={phoone}
          onChange={(val) => {
            let myValue = val.currentTarget.value;
            if (myValue.length > 11) {
              myValue = myValue.substring(0, 11);
            }
            updatePhone(myValue)

          }}
          onBlur={(val) => {
            veriryPhone(val.currentTarget.value);
          }}
        />

      </div>
      <div className={styles.pageTitle}>请选择您要订购的商品</div>
      {
        productList.map((item, index) => {
          const { key, proName, des, price } = item;
          return <div className={index === select ? styles.selected : styles.unSelect} onClick={() => { updateSelect(key) }}>
            <div>
              <div className={styles.proName}>{proName}</div>
              <div className={styles.des}>{des}</div>
            </div>
            <div className={styles.price}>
              {price}元
              {index === select ? <img src={selectIcon} alt='' className={styles.selectIcon} /> : ''}
            </div>

          </div>
        })
      }
      <div className={styles.tipMsg}>尊敬的客户，欢迎您加入“青年一派”，目前订购页面正在紧急修复中，请您留下联系方式，并保持电话与短信通畅。待页面修复后，我们将尽快通过电话与短信方式与您取得联系。</div>

    </div>

    <div>
      <SingleBtn
        text='提交'
        onClick={mySubmit}
        canClick

      />

    </div>

  </div >;
};

export default connect(({ emergency }: { emergency: EmergencyModelState; }) => ({ emergency }))(EmergencyPage);
