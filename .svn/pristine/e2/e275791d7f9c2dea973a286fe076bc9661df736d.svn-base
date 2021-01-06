import React, { FC, useEffect, useState } from 'react';
import { List, InputItem, Toast, Button, Modal } from 'antd-mobile';
import { EmerPayConfirmModelState, ConnectProps, connect, router, setPageNavBar } from 'alita';
import { setEmergencyData } from '@/utils';
import styles from './index.less';
//

const { alert } = Modal;
interface PageProps extends ConnectProps {
  emerPayConfirm: EmerPayConfirmModelState;
}

const ANTILIST = ['5007', '5008', '5009', '5010'];

const LoseAccountPage: FC<PageProps> = ({ emerPayConfirm, dispatch, location }) => {
  const { phone = '', iccId = '' } = emerPayConfirm;
  const [downLoadLink, setDownLoadLink] = useState({});
  const [antiFlag, setAntiFlag] = useState(false); // 反诈复机的标识
  const { skuId = '', type = '' } = location?.query;

  useEffect(() => {
    setPageNavBar({
      pagePath: location?.pathname,
      navBar: {
        pageTitle: '紧急电信业务',
        onLeftClick: () => {
          router.goBack();
        },
      },
    });
    dispatch!({
      type: 'emerPayConfirm/queryDownLoadLink',
      payload: {
        paramCode: 'fraud_recovery_agreement_url',
      },
    }).then((res: any) => {
      setDownLoadLink({ ...(res?.data || {}) });
    });

    if (skuId) {
      setEmergencyData({
        skuId,
      });
    }
  }, []);

  /**
   * 输入框改变事件
   */
  const phoneChange = (e: any, field: string) => {
    dispatch!({
      type: 'emerPayConfirm/save',
      payload: {
        [field]: e,
      },
    });
  };

  /**
   * 校验手机
   * @param val
   */
  const veriryPhone = (value: string) => {
    if (value) {
      const phone = value.replace(/\s+/g, '');
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        Toast.fail('手机号码格式有误', 2);
        return false;
      }
      return true;
    }
    Toast.fail('请输入电话！', 2);
    return false;
  };

  /**
   * 输入框失焦
   */
  const inputBlur = (e: any) => {
    if (e) {
      veriryPhone(e);
    }
  };

  /**
   * 校验ICCID
   * @param val
   */
  const veriryICCID = (value: string) => {
    if (value) {
      if (!/^[0-9]*$/.test(value.replace(/\s+/g, ''))) {
        Toast.fail('ICCID格式有误', 2);
        return false;
      }
      return true;
    }
    Toast.fail('请输入ICCID！', 2);
    return false;
  };

  /**
   * 下一步按钮点击事件
   */
  const nextStep = (params = {}) => {
    dispatch!({
      type: 'checkIdentity/queryCustOrderPageToAppModel',
      payload: {
        accNum: phone,
        ...params,
        serviceOffer: type,
      },
    }).then((flag: string) => {
      if (flag && (flag === '1' || antiFlag)) {
        setTimeout(() => {
          router.push({
            pathname: '/emergency/checkIdentity',
            query: {
              phone,
              type,
              serviceOfferId: flag && flag !== '1' ? flag : type,
            },
          });
        }, 100);
      } else if (flag && ANTILIST.indexOf(flag) !== -1) {
        setAntiFlag(true);
      } else if (flag && ANTILIST.indexOf(flag) === -1) {
        setTimeout(() => {
          router.push({
            pathname: '/emergency/checkIdentity',
            query: {
              phone,
              type,
              serviceOfferId: flag && flag !== '1' ? flag : type,
            },
          });
        }, 100);
      }
    });
  };
  const btnClick = () => {
    if (!veriryPhone(phone)) {
      return;
    }
    if (antiFlag) {
      // 反欺诈复机
      if (veriryICCID(iccId)) {
        alert('确认', '您是否已经下载了复机承诺书？', [
          { text: '取消', onPress: () => console.log('cancel') },
          {
            text: '确认',
            onPress: () => {
              nextStep({
                iccId,
              });
            },
          },
        ]);
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className={styles.loseAccountStyle}>
      <List>
        <InputItem
          maxLength={11}
          value={phone}
          onChange={(e) => phoneChange(e, 'phone')}
          placeholder="请输入手机号码"
          onBlur={inputBlur}
          disabled={antiFlag}
        >
          手机号码
        </InputItem>
      </List>
      {antiFlag && [
        <List key="iccId">
          <InputItem
            maxLength={20}
            value={iccId}
            onChange={(e) => phoneChange(e, 'iccId')}
            placeholder="手机卡背面前20个字符"
            // onBlur={inputBlur}
          >
            ICCID
          </InputItem>
        </List>,
        <a key="download" className={styles.commitmentDown} href={downLoadLink?.paramVal}>
          复机承诺书下载
        </a>,
      ]}

      <div className={styles.btnDiv}>
        <Button className={styles.nextBtn} onClick={btnClick}>
          下一步
        </Button>
      </div>
    </div>
  );
};

export default connect(({ emerPayConfirm }: { emerPayConfirm: EmerPayConfirmModelState }) => ({
  emerPayConfirm,
}))(LoseAccountPage);
