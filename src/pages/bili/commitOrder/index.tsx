import React, { FC, useEffect, useState } from 'react';
import {
  CommitOrderModelState,
  ConnectProps,
  connect,
  DeliveryAddrModelState,
  router,
  SelectNumberModelState,
} from 'alita';
import FormItem from '../components/FormItem';
import ProductInfo from '../components/ProductInfo';
import CommonSelectAlert from '@/components/CommonSelectAlert';
import InVoiceActionSheet from '@/components/InVoiceActionSheet';
import AddressPickerView from '@/components/AddressPickerView';
import HeaderSection from './components/HeaderSection';
import UserInfoSection from './components/UserInfoSection';
import AddressSection from './components/AddressSection';
import InvoiceSection from './components/InvoiceSection';
import ServiceTips from '../components/ServiceTips';
import ServiceContent from '@/components/ServiceContent';

import { WhiteSpace, Toast, Modal } from 'antd-mobile';
import { SourceType } from '@/utils/AppContext';

//
import styles from './index.less';

interface PageProps extends ConnectProps {
  commitOrder: CommitOrderModelState;
  deliveryAddr: DeliveryAddrModelState;
  selectNumber: SelectNumberModelState;
}

const CommitOrderPage: FC<PageProps> = ({
  commitOrder,
  deliveryAddr,
  dispatch,
  location,
  selectNumber,
}) => {
  const { phoneData = {} } = selectNumber;
  const [showInvoiceAction, setShowInvoiceAction] = useState(false);
  const [showPhoneAlert, setShowPhoneAlert] = useState(false);
  const [showAddrPicker, setShowAddrPicker] = useState(false);
  const [showPhoneArea, setShowPhoneArea] = useState(false);
  const [isShowSelectPhone, setIsShowSelectPhone] = useState(false);
  const [agreement, setAgreement] = useState(true);
  const [showService, updateShowService] = useState(false);

  const [proInfo, setProInfo] = useState({});

  useEffect(() => {
    if (location.query && location.query.proInfo) {
      const jsonProino = JSON.parse(location.query?.proInfo);
      setProInfo(jsonProino);

      const orderAttrs = jsonProino.orderAttrs || [];
      for (const key in orderAttrs) {
        if (Object.prototype.hasOwnProperty.call(orderAttrs, key)) {
          const element = orderAttrs[key];
          const { attrCode = '' } = element;
          if (attrCode === 'HM') {
            setIsShowSelectPhone(true);
          }
        }
      }
    }
  }, [location.query]);

  const [formData, setFormData] = useState({
    goodsList: [],
    attrList: {},
    memberBaseData: {
      certType: '1',
      phoneNum: '',
      smsCode: '',
      certNum: '',
      memberName: '',
      certName: '',
    },
    memberReceiveAddr: {},
    memberInvoiceTemplate: {},
    sourceType: SourceType.fromBli,
  });

  const submitHandle = () => {
    // if (!agreement) {
    //   Toast.fail('请同意客户入网服务协议', 2);
    //   return;
    // }
    if (isShowSelectPhone) {
      if (!phoneData.phoneNum) {
        Toast.fail('请选择号码', 2);
        return;
      }
    }
    if (formData.memberBaseData.memberName.length === 0) {
      Toast.fail('请输入姓名', 2);
      return;
    }

    if (formData.memberBaseData.certNum.length < 15) {
      Toast.fail('身份证号码格式有误', 2);
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(formData.memberBaseData.phoneNum)) {
      Toast.fail('手机号码格式有误', 2);
      return;
    }

    if (!formData.memberBaseData.smsCode || formData.memberBaseData.smsCode.length < 6) {
      Toast.fail('请输入正确的验证码', 2);
      return;
    }

    if (!formData.attributionAddr || formData.attributionAddr.length === 0) {
      Toast.fail('请选择配送地区', 2);
      return;
    }

    if (
      !formData.memberReceiveAddr.detailAddress ||
      formData.memberReceiveAddr.detailAddress.length === 0
    ) {
      Toast.fail('请输入详细地址', 2);
      return;
    }

    const attrList = [];
    let orderAttrs = proInfo.orderAttrs || [];
    for (let index = 0; index < orderAttrs.length; index++) {
      const element = orderAttrs[index];
      attrList.push({
        attrCode: element.attrCode,
        attrValue: phoneData?.phoneNum,
        extMap: phoneData,
      });
    }
    if (!agreement) {
      Toast.fail('请同意客户入网协议');
    }

    console.log({
      sourceType: formData.sourceType,
      memberBaseData: formData.memberBaseData,
      memberReceiveAddr: {
        ...formData.memberReceiveAddr,
        name: formData.memberBaseData.memberName,
        phoneNumber: phoneData?.phoneNum,
      },
      memberInvoiceTemplate: formData.memberInvoiceTemplate,
      goodsList: [
        {
          quantity: proInfo.proNum,
          skuId: proInfo.skuInfo.skuId,
          attrList,
        },
      ],
    });

    dispatch!({
      type: 'commitOrder/valIDCard',
      payload: {
        cardNo: formData.memberBaseData.certNum,
        callback: () => {
          dispatch!({
            type: 'commitOrder/addRegistAndLogin',
            payload: {
              phone: formData.memberBaseData.phoneNum,
              pwd: formData.memberBaseData.certNum.substring(
                formData.memberBaseData.certNum.length - 6,
              ),
              smsCode: formData.memberBaseData.smsCode,
              callback: () => {
                dispatch!({
                  type: 'commitOrder/tmsCommitOrder',
                  payload: {
                    sourceType: formData.sourceType,
                    memberBaseData: formData.memberBaseData,
                    memberReceiveAddr: {
                      ...formData.memberReceiveAddr,
                      name: formData.memberBaseData.memberName,
                      phoneNumber: formData.memberBaseData.phoneNum,
                    },
                    memberInvoiceTemplate: formData.memberInvoiceTemplate,
                    goodsList: [
                      {
                        quantity: proInfo.proNum,
                        skuId: proInfo.skuInfo.skuId,
                        attrList,
                      },
                    ],
                  },
                });
              },
            },
          });
        },
      },
    });

    console.log('请提交订单', formData);
  };

  const { tmscalFeeInfo } = commitOrder;

  const showPhoneView = () => {
    let orderAttrs = proInfo.orderAttrs || [];
    for (let index = 0; index < orderAttrs.length; index++) {
      const element = orderAttrs[index];
      if (element.attrCode === 'HM') {
        return true;
      }
    }
    return false;
  };

  const genAppLoginMsgCode = (phone) => {
    dispatch!({
      type: 'orderSearch/genAppLoginMsgCode',
      payload: {
        phone,
        callback: () => {
        //  Toast.success('发送验证码成功');
        },
      },
    });
  };

  useEffect(() => {
    if (location.query && location.query.proInfo) {
      const newProInfo = JSON.parse(location.query?.proInfo);
      dispatch!({
        type: 'commitOrder/tmscalFee',
        payload: {
          goodsList: [
            {
              quantity: newProInfo?.proNum,
              skuId: newProInfo?.skuInfo?.skuId,
            },
          ],
        },
      });
    }
    return () => {};
  }, []);

  // 选择号码点击事件，跳转到选择号码页面
  const goToSelectNumber = () => {
    router.push({
      pathname: '/selectNumber',
    });
  };

  return (
    <div className={styles.commitOrder}>
      <div className={styles.main}>
        <ProductInfo proInfo={proInfo} />
        {isShowSelectPhone ? (
          <FormItem
            type="select"
            title="选择号码"
            placeholder="选择号码"
            onClick={goToSelectNumber}
            value={phoneData?.phoneNum || ''}
          />
        ) : (
          <div />
        )}

        {/* <HeaderSection
          showPhone={showPhoneView()}
          data={{
            phoneAddr: formData.phoneAddrText,
            selectPhone: formData.phoneNum,
          }}
          proInfo={proInfo}
          phoneAddrHandle={() => {
            setShowPhoneArea(true);
          }}
          selectPhoneHandle={() => {
            console.log(formData);
            if (!formData.lanId) {
              Toast.fail('请选择号码归属地', 2);
              return;
            }
            setShowPhoneAlert(true);
          }}
        /> */}

        <WhiteSpace size="lg" />

        <UserInfoSection
          dispatch={dispatch}
          onChange={(e) => {
            setFormData({
              ...formData,
              memberBaseData: {
                certType: '1',
                certNum: e.idCard || '',
                memberName: e.name || '',
                phoneNum: e.phone || '',
                certName: e.name || '',
                smsCode: e.smsCode || '',
              },
            });
          }}
        />
        <WhiteSpace size="lg" />
        <AddressSection
          data={{
            attributionAddr: formData.attributionAddrText,
          }}
          attributionAddrHandle={() => {
            // console.log('所在地区');
            setShowAddrPicker(true);
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              memberReceiveAddr: {
                ...formData.memberReceiveAddr,
                detailAddress: e,
              },
            });
          }}
        />
        <WhiteSpace size="lg" />
        <InvoiceSection
          text={
            formData.memberInvoiceTemplate.type
              ? formData.memberInvoiceTemplate.type === '1'
                ? '个人'
                : '公司'
              : '不开票'
          }
          invoiceHandle={() => {
            setShowInvoiceAction(true);
          }}
        />
        <WhiteSpace size="lg" />
      </div>
      <ServiceTips
        defaultSelect={agreement}
        onChange={(isChecked) => {
          setAgreement(isChecked);
        }}
        showService={() => {
          updateShowService(true);
        }}
      />
      <div className={styles.footer}>
        <div className={styles.priceNum}>
          ￥<span>{tmscalFeeInfo.payAmount}</span>.00
        </div>
        <div
          className={styles.commitBtn}
          onClick={() => {
            submitHandle();
          }}
        >
          提交订单
        </div>
      </div>
      <InVoiceActionSheet
        userName={formData.memberBaseData.memberName}
        userPhone={formData.memberBaseData.phoneNum}
        show={showInvoiceAction}
        onClose={() => {
          setShowInvoiceAction(false);
        }}
        onSubmit={(data) => {
          let tempData = {};
          if (data.type === '2') {
            tempData = {};
          } else {
            tempData = data;
          }
          tempData.receiveMobile = data.taxpayerTel || '';
          setFormData({
            ...formData,
            memberInvoiceTemplate: tempData,
          });
          setShowInvoiceAction(false);
        }}
      />
      <CommonSelectAlert
        dispatch={dispatch}
        show={showPhoneAlert}
        isShowNew
        from="bilibi"
        provinceId={formData.provinceId}
        lanId={formData.lanId}
        closeClick={() => {
          setShowPhoneAlert(false);
        }}
        onComfirm={(item) => {
          console.log(item);
          setFormData({
            ...formData,
            phoneNum: item.phoneNum,
            attrList: item,
          });
          setShowPhoneAlert(false);
        }}
      />
      <AddressPickerView
        show={showPhoneArea}
        title="号码归属"
        colums={2}
        isLimitArea={false}
        onClose={() => {
          setShowPhoneArea(false);
        }}
        onSubmit={(list = []) => {
          let lanId;
          let provinceId;
          if (list.length != 0) {
            lanId = list[list.length - 1].lanId;
            provinceId = list[list.length - 1].provinceId;
          }

          console.log(list, provinceId, lanId);

          setFormData({
            ...formData,
            phoneAddr: list,
            phoneAddrText: list.map((item: { label: any }) => item.label).join(','),
            lanId,
            provinceId,
          });
          setShowPhoneArea(false);
        }}
      />
      <AddressPickerView
        show={showAddrPicker}
        title="所在地区"
        colums={3}
        onClose={() => {
          setShowAddrPicker(false);
        }}
        onSubmit={(list = []) => {
          let memberReceiveAddr = {};
          if (list.length === 2) {
            memberReceiveAddr = {
              ...formData.memberReceiveAddr,
              city: list[0].label,
              cityId: list[0].value,
              region: list[1].label,
              regionId: list[1].value,
            };
          } else if (list.length >= 3) {
            memberReceiveAddr = {
              ...formData.memberReceiveAddr,
              province: list[0].label,
              provinceId: list[0].value,
              city: list[1].label,
              cityId: list[1].value,
              region: list[2].label,
              regionId: list[2].value,
            };
          }
          setFormData({
            ...formData,
            memberReceiveAddr,
            attributionAddr: list,
            attributionAddrText: list.map((item: { label: any }) => item.label).join(','),
          });
          setShowAddrPicker(false);
        }}
      />

      <Modal
        visible={showService}
        transparent
        title="客户入网协议"
        footer={[
          {
            text: 'Ok',
            onPress: () => {
              updateShowService(!showService);
            },
          },
        ]}
      >
        <div style={{ height: 600, overflow: 'scroll', textAlign: 'left' }}>
          <ServiceContent />
        </div>
      </Modal>
    </div>
  );
};

export default connect(
  ({
    commitOrder,
    deliveryAddr,
    selectNumber,
  }: {
    commitOrder: CommitOrderModelState;
    deliveryAddr: DeliveryAddrModelState;
    selectNumber: SelectNumberModelState;
  }) => ({
    commitOrder,
    deliveryAddr,
    selectNumber,
  }),
)(CommitOrderPage);
