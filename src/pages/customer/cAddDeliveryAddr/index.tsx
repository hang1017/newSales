import React, { FC, useEffect, useState } from 'react';
import { cAddDeliveryAddrModelState, ConnectProps, connect, history, setPageNavBar } from 'alita';
import DynamicForm, { useForm, ValidateErrorEntity } from '@/components/DynamicForm';
import { Toast, Modal } from 'antd-mobile';
import switchOpenIcon from '@/assets/img/switch_open.png';
import switchOffIcon from '@/assets/img/switch_off.png';
import Utils from '@/utils/tool';

import { AddressType } from '@/utils/AppContext';
import SingleBtn from '../components/SingleBtn';
import styles from './index.less';

interface PageProps extends ConnectProps {
  cAddDeliveryAddr: cAddDeliveryAddrModelState;
}

const CAddDeliveryAddrPage: FC<PageProps> = ({ cAddDeliveryAddr, dispatch, location }) => {
  const {
    homeAddrData = [],
    isAddAddress = true,
    addressInfo,
    canChangeDefault,
  } = cAddDeliveryAddr;
  const [switchDefault, updateSwitch] = useState(true);
  const memberInfo = Utils.getStorageForJson('memberInfo');

  const addrFormData = [
    {
      type: 'input',
      fieldProps: 'name',
      placeholder: '请填写收货人姓名',
      title: '收货人',
      required: true,
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'input',
      fieldProps: 'phoneNumber',
      placeholder: '请填写收货人手机号',
      title: '联系电话',
      required: true,
      inputType: 'phone',
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'addressPicker',
      fieldProps: 'homeAddr',
      required: true,
      title: '所在地区',
      placeholder: '',
      height: '70vh',
      level: 3,
      data: homeAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区'],
      onChangeLevel: (values: (string | number)[]) => {
        console.log('存在点击事件1', values);
        if (values.length > 0 && values.length < 3) {
          const parentId = values[values.length - 1];
          dispatch!({
            type: 'cAddDeliveryAddr/queryAreaNextLevel',
            payload: {
              parentId,
            },
          });
        } else if (values.length === 0) {
          dispatch!({
            type: 'cAddDeliveryAddr/queryAreaFatherList',
          });
        }
      },
    },
    {
      type: 'area',
      fieldProps: 'detailAddress',
      placeholder: '街道、楼牌号等',
      title: '详细地址',
      required: true,
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
    },
  ];

  const deleteAddress = () => {
    const { receiveAddrId = '' } = addressInfo;
    Modal.alert('提示', '确定删除该地址吗?', [
      { text: '取消', onPress: () => {} },
      {
        text: '确定',
        onPress: () => {
          dispatch!({
            type: 'cAddDeliveryAddr/deleteAddress',
            payload: {
              receiveAddrId,
            },
          }).then(() => {
            dispatch!({
              type: 'payConfirm/clearAddress',
              payload: {
                receiveAddrId,
              },
            }).then(() => {
              history.goBack();
            });
          });
        },
      },
    ]);
  };
  // 这里发起了初始化请求
  useEffect(() => {
    let title = '';
    if (isAddAddress) {
      title = '新建收货地址';
    } else {
      title = '修改收货地址';
    }
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        pageTitle: title,
        title,
        rightContent: [],
      },
    });
    // dispatch!({
    //   type: 'ccAddDeliveryAddr/query',
    // });

    // setPageNavBar({
    //   pagePath: '/customer/ccAddDeliveryAddr',
    //   navBar: {
    //     pageTitle: '编辑收货地址',
    //   },
    // });

    if (!isAddAddress) {
      // 修改地址需要处理一下区域值
      const {
        provinceId = '',
        province = '',
        cityId = '',
        city = '',
        regionId = '',
        region = '',
        streetId = '',
        street = '',
      } = addressInfo;
      const areaList = [];
      areaList.push(provinceId);
      areaList.push(cityId);
      areaList.push(regionId);
      // areaList.push(streetId);

      const areaName = [];
      areaName.push(province);
      areaName.push(city);
      areaName.push(region);
      // areaName.push(street);

      dispatch!({
        type: 'cAddDeliveryAddr/save',
        payload: {
          addressInfo: { ...addressInfo, homeAddr: { label: areaName, value: areaList } },
        },
      });
      if (addressInfo.defaultAddr === AddressType.default) {
        updateSwitch(true);
      } else {
        updateSwitch(false);
      }
    } else {
      // 获取区县数据
      dispatch!({
        type: 'cAddDeliveryAddr/queryAreaFatherList',
      });
    }

    return () => {
      dispatch!({
        type: 'cAddDeliveryAddr/save',
        payload: {
          addressInfo: {},
          isAddAddress: true, // 区分是新增地址还是修改地址
          canChangeDefault: true, // 用于判断默认地址是否可以修改
        },
      });
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const checkFormData = (formData: any) => {
    const { name = '', phoneNumber = '', homeAddr = {} } = formData;
    const { label = [] } = homeAddr;
    const province = label[0] || '';
    const city = label[1] || '';
    const region = label[2] || '';
    const street = label[3] || '';
    if (name === '') {
      Toast.info('收货人姓名不能为空!');
      return false;
    }
    if (phoneNumber === '') {
      Toast.info('收货人手机号不能为空!');
      return false;
    }
    if (province === '') {
      Toast.info('请选择省');
      return false;
    }
    if (city === '') {
      Toast.info('请选择市');
      return false;
    }
    if (region === '') {
      Toast.info('请选择区');
      return false;
    }
    if (phoneNumber === '') {
      Toast.info('详细地址不能为空！');
      return false;
    }
    return true;
  };

  const [form] = useForm();

  const formProps = {
    onValuesChange: (formValue: any) => {
      dispatch!({
        type: 'cAddDeliveryAddr/save',
        payload: {
          addressInfo: { ...addressInfo, ...formValue },
        },
      });
    },
    onFinish: (formValue: any) => {
      if (checkFormData(formValue)) {
        const { name = '', phoneNumber = '', detailAddress = '', homeAddr = {} } = formValue;
        const { label = [], value = [] } = homeAddr;
        const province = label[0] || '';
        const city = label[1] || '';
        const region = label[2] || '';
        const street = label[3] || '';
        const provinceId = value[0] || '';
        const cityId = value[1] || '';
        const regionId = value[2] || '';
        const streetId = value[3] || '';
        const { memberId } = Utils.getStorageForJson('userInfo') || {};
        let defaultAddr = AddressType.default; // 默认
        if (!switchDefault) {
          defaultAddr = AddressType.unDefalut;
        }
        if (isAddAddress) {
          dispatch!({
            type: 'cAddDeliveryAddr/addAddress',
            payload: {
              name,
              phoneNumber: phoneNumber.replaceAll(/\s+/g, ''),
              detailAddress,
              province,
              city,
              region,
              street,
              provinceId,
              cityId,
              regionId,
              streetId,
              memberId,
              defaultAddr,
            },
          });
        } else {
          dispatch!({
            type: 'cAddDeliveryAddr/updateAddress',
            payload: {
              receiveAddrId: addressInfo.receiveAddrId || '',
              name,
              phoneNumber: phoneNumber.replaceAll(/\s+/g, ''),
              detailAddress,
              province,
              city,
              region,
              street,
              provinceId,
              cityId,
              regionId,
              streetId,
              memberId,
              defaultAddr,
            },
          });
        }
      }
    },
    onFinishFailed: ({ errorFields = [] }: ValidateErrorEntity) => {
      Toast.fail(errorFields[0].errors[0], 1);
    },
    data: addrFormData,
    formsValues: {
      ...addressInfo,
    },
    form,
  };

  return (
    <div className={styles.addAddr}>
      <DynamicForm {...formProps} />

      <div className={styles.defalutBlock}>
        <div className={styles.defalutTitle}>设置默认地址</div>
        <div className={styles.switchBlock}>
          <img
            src={switchDefault ? switchOpenIcon : switchOffIcon}
            alt=""
            onClick={() => {
              if (canChangeDefault) {
                updateSwitch(!switchDefault);
              } else {
                Toast.info('默认地址无法修改');
              }
            }}
          />
        </div>
      </div>
      {isAddAddress ? (
        ''
      ) : (
        <div className={styles.deleteBtn} onClick={deleteAddress}>
          删除收货地址
        </div>
      )}
      <SingleBtn
        collect="addAddr"
        text="保存"
        canClick
        onClick={() => {
          form.submit();
        }}
      />
    </div>
  );
};

export default connect(
  ({ cAddDeliveryAddr }: { cAddDeliveryAddr: cAddDeliveryAddrModelState }) => ({
    cAddDeliveryAddr,
  }),
)(CAddDeliveryAddrPage);
