import React, { FC, useEffect, useState } from 'react';
import { AddDeliveryAddrModelState, ConnectProps, connect, setPageNavBar } from 'alita';
import DynamicForm, { useForm } from '@alitajs/dform';
import { Toast } from 'antd-mobile';
import SingleBtn from '@/components/SingleBtn';
import switchOpenIcon from '@/assets/img/switch_open.png';
import switchOffIcon from '@/assets/img/switch_off.png';
import deleteIcon from '@/assets/img/order/delete_icon.png';
import Utils from '@/utils/tool';

import { AddressType } from '@/utils/AppContext';

import styles from './index.less';

interface PageProps extends ConnectProps {
  addDeliveryAddr: AddDeliveryAddrModelState;
}

const AddDeliveryAddrPage: FC<PageProps> = ({ addDeliveryAddr, dispatch, location }) => {
  const { homeAddrData = [] } = addDeliveryAddr;
  console.log(homeAddrData);

  let addrFormData = [
    {
      type: 'input',
      fieldProps: 'name',
      placeholder: '请填写收货人姓名',
      title: '收货人',
      // required: true,
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'input',
      fieldProps: 'phoneNumber',
      placeholder: '请填写收货人手机号',
      title: '手机号码',
      // required: true,
      inputType: 'phone',
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'addressPicker',
      fieldProps: 'homeAddr',
      // required: true,
      title: '所在地区',
      placeholder: '',
      level: 3,
      height: 800,
      data: homeAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区'],
      onChangeLevel: (values: (string | number)[]) => {
        console.log('存在点击事件1', values);
        console.log(values);
        if (values.length > 0 && values.length < 3) {
          const parentId = values[values.length - 1];
          dispatch!({
            type: 'addDeliveryAddr/queryAreaNextLevel',
            payload: {
              parentId,
            },
          });
        } else if (values.length === 0) {
          dispatch!({
            type: 'addDeliveryAddr/queryAreaFatherList',
          });
        }
      },
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('存在点击事件');
      },
    },
    {
      type: 'area',
      fieldProps: 'detailAddress',
      placeholder: '街道、楼牌号等',
      title: '详细地址',
      // required: true,
      inputType: 'text',
      coverStyle: {
        textAlign: 'left',
      },
    },
  ];
  const { isAddAddress = true, addressInfo, canChangeDefault } = addDeliveryAddr;
  const [switchDefault, updateSwitch] = useState(true);

  const deleteAddress = () => {
    dispatch!({
      type: 'addDeliveryAddr/deleteAddress',
      payload: {
        receiveAddrId: addressInfo.receiveAddrId || '',
      },
    });
  };
  // 这里发起了初始化请求
  useEffect(() => {
    let title = '';
    if (isAddAddress) {
      title = '新建收货地址';
      setPageNavBar({
        pagePath: location.pathname,
        navBar: {
          pageTitle: title,
          rightContent: [],
        },
      });
    } else {
      title = '修改收货地址';
      setPageNavBar({
        pagePath: location.pathname,
        navBar: {
          pageTitle: title,
          rightContent: [
            <img src={deleteIcon} className={styles.topImg} onClick={deleteAddress} key="search" />,
          ],
        },
      });
    }

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
      let areaList = [];
      areaList.push(provinceId);
      areaList.push(cityId);
      areaList.push(regionId);
      areaList.push(streetId);

      let areaName = [];
      areaName.push(province);
      areaName.push(city);
      areaName.push(region);
      areaName.push(street);

      dispatch!({
        type: 'addDeliveryAddr/save',
        payload: {
          addressInfo: { ...addressInfo, homeAddr: { label: areaName, value: areaList } },
        },
      });
      if (addressInfo.defaultAddr === AddressType.default) {
        updateSwitch(true);
      } else {
        updateSwitch(false);
      }
    }
    // 获取区县数据
    dispatch!({
      type: 'addDeliveryAddr/queryAreaFatherList',
      // payload: {
      //   regionGrades: '1',
      // },
    });

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount

      dispatch!({
        type: 'addDeliveryAddr/save',
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
        type: 'addDeliveryAddr/save',
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
            type: 'addDeliveryAddr/addAddress',
            payload: {
              name,
              phoneNumber: phoneNumber.replaceAll(' ', ''),
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
            type: 'addDeliveryAddr/updateAddress',
            payload: {
              receiveAddrId: addressInfo.receiveAddrId || '',
              name,
              phoneNumber: phoneNumber.replaceAll(' ', ''),
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
    onFinishFailed: (values: any) => {
      console.info('onFinishFailed', values);
    },
    data: addrFormData,
    formsValues: { ...addressInfo },
    form,
  };

  return (
    <div className={styles.addAddr}>
      <DynamicForm {...formProps} />
      <div className={styles.marginBlock}></div>

      <div className={styles.defalutBlock}>
        <div className={styles.defalutTitle}>设置默认地址</div>
        <div className={styles.switchBlock}>
          <div className={styles.tipMsg}>提醒：每次下单会默认推荐使用该地址</div>
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
      <SingleBtn
        text="保存并使用"
        onClick={() => {
          form.submit();
        }}
      />
    </div>
  );
};

export default connect(({ addDeliveryAddr }: { addDeliveryAddr: AddDeliveryAddrModelState }) => ({
  addDeliveryAddr,
}))(AddDeliveryAddrPage);
