/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import React, { FC, useEffect, useState, useRef } from 'react';
import {
  PayConfirmModelState,
  ConnectProps,
  connect,
  history,
  OrderConfirmModelState,
  setPageNavBar,
  IndexListModelState,
  router,
  OldUserLoginSuccessModelState,
} from 'alita';
import classnames from 'classnames';
import DynamicForm, { IFormItemProps, useForm } from '@alitajs/dform';
import { FileModal, OtherCustomer } from '@/pages/customer/components';
import { GuideModal } from '@/components';
import { Toast, InputItem, List, Modal } from 'antd-mobile';
import rightIcon from '@/assets/right.png';
import CloseIcon from '@/assets/close.png';
import GrayDownIcon from '@/assets/img/customer/grayDown.png';
import IconShopAction from '@/assets/img/goodsdetail/shop-action.png';
import Utils from '@/utils/tool';
import { putHoneyGoodsDetail, backIframeViewPort, resetIframeViewPort } from '@/utils';
import CommonSelectAlert from '@/pages/customer/components/CommonSelectAlert';
import OldPhoneAlert from '@/pages/customer/components/OldPhoneAlert';
import FileHtml from '@/assets/file/service.txt';
import FileHtml1 from '@/assets/file/new_service.txt';
import AddressPickerView from '@/components/AddressPickerView';
import MagicFootBtn from '../components/MagicFootBtn';
import ConfirmItem from '../components/ConfirmItem';
import InvoiceAlert from '../components/InvoiceAlert';
import styles from './index.less';

import BetterScroll from 'better-scroll';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';

interface PageProps extends ConnectProps {
  payConfirm: PayConfirmModelState;
  orderConfirm: OrderConfirmModelState;
  indexList: IndexListModelState;
  oldUserLoginSuccess: OldUserLoginSuccessModelState;
}

let bs: BScrollConstructor<{}> | null = null;

const PayConfirmPage: FC<PageProps> = ({
  payConfirm,
  dispatch,
  indexList,
  location,
  oldUserLoginSuccess,
}) => {
  // const provinceId = 8310000; // 目前写死是上海
  // const lanId = 8310100;
  const {
    addressInfo = {},
    orderInfo = {},
    nameAndNo = {},
    invoiceContent,
    phoneInfo = {},
    guideList = [],
    claimValue = '',
    addrLabel = [],
    addrValue = {},
    needShowOrdAddr = '',
    claimType = [],
    singleFlag = '',
  } = payConfirm;

  const { commonAttrData = [], commonAttrValue = {}, dynamicList = [] } = oldUserLoginSuccess;

  const { type = '', urlGoodsList = '{}' } = location?.query;

  const [footBtnFlag, updateFootFlag] = useState(false);
  const [form] = useForm();
  const [form2] = useForm();
  const [form3] = useForm();
  const [fileFlag, setFileFlag] = useState(false);
  const [filePathUrl, setFilePathUrl] = useState(FileHtml);
  const [invoice, updateInvoice] = useState(invoiceContent);

  const [newNumFlag, setNewNumFlag] = useState(false); // 新号码的弹框
  const [oldNumFlag, setOldNumFlag] = useState(false); // 旧号码的弹框
  const [oldPhoneList, setOldPhoneList] = useState([]); // 旧号码的列表数据
  const [selType, setSelType] = useState<string[]>([]); // 501: 新号码 502: 老号码 503、504: 代表用户输入
  const [fileTitle, setFileTitle] = useState(''); // 协议弹框的标题
  const [guideModalVisible, setGuideModalVisible] = useState(false); // 引导弹框标识
  const [claimData, setClaimData] = useState<any[]>([]); // 配送方式数据源
  const [guideFlag, setGuideFlag] = useState<boolean>(false); // false: 关闭弹框，true: 重新加载 commitClick
  const [addrFlag, setAddrFlag] = useState<boolean>(false); // 归属地弹框开关事件
  const [homeLocationFlag, setHomeLocationFlag] = useState<boolean>(false); // 查询配置表是否展示配置开关
  const [customerVisible, setCustomerVisible] = useState(false);

  const {
    name = '',
    phoneNumber = '',
    province = '',
    city = '',
    region = '',
    detailAddress = '',
  } = addressInfo;
  const { storeList = [], payAmount, memberReceiveAddr = {}, commonAttrList = [] } = orderInfo;

  const { skuList = [], tabs = [], activeGoodData, tabData = [] } = indexList;

  const tabDataRef = useRef(tabData);
  const tabsRef = useRef(tabs);
  const skuListRef = useRef(skuList);

  const ref = useRef(null);

  useEffect(() => {
    tabDataRef.current = tabData;
  }, [tabData]);
  useEffect(() => {
    tabsRef.current = tabs;
  }, [tabs]);
  useEffect(() => {
    skuListRef.current = skuList;
  }, [skuList]);

  useEffect(() => {
    setSendMode(claimType);
  }, [claimType]);

  const memberInfo = Utils.getStorageForJson('memberInfo');

  /**
   * 监听外部客服传参进行跳转
   */
  const listenFun = (e: any) => {
    const { type = '', goodsId = 0, orderId = 0 } = e.data;
    switch (type) {
      case 'baby':
        backIframeViewPort();
        setCustomerVisible(false);
        history.replace({
          pathname: '/customer/cGoodsDetails',
          query: {
            goodsId,
            type: 'index',
          },
        });
        dispatch!({
          type: 'cGoodsDetails/query',
        });
        break;
      case 'order':
        backIframeViewPort();
        history.push({
          pathname: '/order/orderDetail',
          query: {
            orderId,
          },
        });
        break;
      default:
        break;
    }
  };

  // 设置配送数据源
  const setSendMode = (cType: any[]) => {
    if (cType && cType.length) {
      const claimTypeData: React.SetStateAction<any[]> = [];
      cType.forEach((item: string) => {
        if (item === '1000') {
          claimTypeData.push({
            label: '物流配送',
            value: '1000',
          });
        }
        if (item === '1100') {
          claimTypeData.push({
            label: '现场取货',
            value: '1100',
          });
        }
      });
      setClaimData(claimTypeData);
      if (!claimValue) {
        dispatch!({
          type: 'payConfirm/save',
          payload: {
            claimValue: cType[0],
          },
        });
      }
    }
  };

  // 这里发起了初始化请求
  useEffect(() => {
    // 清空一下 登录认证的数据
    dispatch!({
      type: 'nameAuthentication/save',
      payload: {
        userInfo: {},
        catchTime: 0,
      },
    });

    const leave = localStorage.getItem('leave'); // 用来标识如果是从支付页面返回的话，则跳转到我的订单页面
    localStorage.setItem('leave', '0'); // 用完值要设置成初始值
    if (leave === '1') {
      history.push({
        pathname: '/order/myOrder',
        query: {
          type: 'index',
        },
      });
      return;
    }

    if (Object.keys(orderInfo).length === 0) {
      dispatch!({
        type: 'oldUserLoginSuccess/commitCartQuick',
        payload: {
          goodsList: JSON.parse(urlGoodsList),
          dispatch,
        },
      }).then((data: any) => {
        const { commonAttrList = [] } = data;
        const filter = commonAttrList.filter((i: any) => i.attrName === '业务号码');
        const list = filter[0];
        const par = {
          orderInfo: data,
          phoneInfo: {},
        };
        if (list?.attrValue) {
          par.phoneInfo = {
            phoneNum: list?.attrValue || '',
            phoneType: '502',
          };
          par.singleFlag = data?.isOneNum;
        }
        dispatch!({
          type: 'payConfirm/save',
          payload: par,
        });
        localStorage.setItem('leave', '0'); // 用完值要设置成初始值

        const params = { orderInfo: data };
        if (!needShowOrdAddr) {
          params.needShowOrdAddr = data?.needOrdAddr;
          params.claimType = data?.claimType;
        }
        dispatch!({
          type: 'payConfirm/save',
          payload: params,
        });
        if (data?.claimType && data?.claimType.length) {
          setSendMode(data?.claimType);
        }
        initDataValue(data);

        setTimeout(() => {
          bs = new BetterScroll(ref.current, {
            probeType: 3,
            scrollY: true,
            scrollX: false,
            click: true,
            bounce: false,
          });
        }, 100);
        setTimeout(() => {
          if (bs) bs.refresh();
        }, 200);
      });
    } else {
      setTimeout(() => {
        bs = new BetterScroll(ref.current, {
          probeType: 3,
          scrollY: true,
          scrollX: false,
          click: true,
          bounce: false,
        });
      }, 200);
      setTimeout(() => {
        if (bs) bs.refresh();
      }, 300);
    }

    setPageNavBar({
      pagePath: '/customer/payConfirm',
      navBar: {
        onLeftClick: () => {
          history.goBack();
        },
      },
    });

    dispatch!({
      type: 'payConfirm/getH5ConfigurationModel',
      payload: {
        propertyName: 'app.homeLocation.flag',
      },
    }).then((homeFlag: boolean) => {
      setHomeLocationFlag(homeFlag);
    });

    // 判断是否是新老用户还是需要自己手动输入数据
    if (commonAttrList && commonAttrList.length) {
      const filter = commonAttrList.filter((i: any) => i.attrName === '业务号码');
      const list = filter[0];
      if (list && list?.extValues && list?.extValues.accNumSelTypeCOList) {
        const maps = list?.extValues.accNumSelTypeCOList.map((item: any) => item?.typeVal);
        setSelType(maps);
      } else {
        setSelType([]);
      }
    }

    if (memberReceiveAddr) {
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          addressInfo: memberReceiveAddr,
        },
      });
    }
    setSendMode(claimType);

    // eslint-disable-next-line consistent-return
    return () => {
      tabsRef.current = [];
      tabDataRef.current = [];
      skuListRef.current = [];
      bs = null;
      window.removeEventListener('message', listenFun);
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          nameAndNo: form.getFieldsValue(),
          claimValue: form2.getFieldValue('claimValue'),
        },
      });
    };
  }, []);

  const initDataValue = (val: any) => {
    const { commonAttrList = [], memberReceiveAddr = {}, claimType = [] } = val;
    // 判断是否是新老用户还是需要自己手动输入数据
    if (commonAttrList && commonAttrList.length) {
      const filter = commonAttrList.filter((i: any) => i.attrCode === 'HM');
      const list = filter[0];
      if (list && list?.extValues && list?.extValues.accNumSelTypeCOList) {
        const maps = list?.extValues.accNumSelTypeCOList.map((item: any) => item?.typeVal);
        setSelType(maps);
      } else {
        setSelType([]);
      }
    }
    const leave = localStorage.getItem('leave'); // 用来标识如果是从支付页面返回的话，则跳转到我的订单页面
    localStorage.setItem('leave', '0'); // 用完值要设置成初始值
    if (leave === '1') {
      history.push({
        pathname: '/order/myOrder',
      });
    }
    if (memberReceiveAddr) {
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          addressInfo: memberReceiveAddr,
        },
      });
    }
    setSendMode(claimType);

    // 设置动态表单
    const otherData = commonAttrList.filter((i: any) => i.attrCode !== 'HM');
    const dynamicList: { code: any; name: any; required: boolean }[] = [];
    const fData: {
      type: string;
      onClick?: () => void;
      required: boolean;
      placeholder: string;
      title: any;
      fieldProps: any;
      data?: any;
      alias?: { label: string; value: string };
      onChange?: ((e: any) => void) | ((e: any) => void);
    }[] = [];
    otherData.forEach((item: any) => {
      const fefeatureList = item?.featureList.map((it: string) => it?.value);
      dynamicList.push({
        code: item?.attrCode,
        name: item?.attrName,
        required: fefeatureList.indexOf('202') !== -1,
      });
      if (item?.attrName === '安装地址') {
        const par = { params: JSON.stringify(item) };
        if (form3.getFieldValue(item?.attrCode)) {
          par.attrValue = JSON.stringify(form3.getFieldValue(item?.attrCode));
        }
        fData.push({
          type: 'text',
          onClick: () => {
            history.push({
              pathname: '/customer/broadbandSelect',
              query: par,
            });
          },
          required: fefeatureList.indexOf('202') !== -1,
          placeholder: `请选择${item?.attrName}`,
          title: item?.attrName,
          fieldProps: item?.attrCode,
        });
        return;
      }
      if (fefeatureList.indexOf('101') !== -1) {
        let pickerData = [];
        const filter = item?.featureList.filter((it: any) => it?.value === '101');
        if (filter && filter.length && filter[0].selectValues) {
          pickerData = filter[0].selectValues;
        }
        fData.push({
          type: 'picker',
          placeholder: `请选择${item?.attrName}`,
          title: item?.attrName,
          data: pickerData,
          alias: {
            label: 'attrValue',
            value: 'attrValue',
          },
          onClick: () => {
            if (pickerData.length === 0) {
              Toast.fail('暂无可选号码', 1);
            }
          },
          onChange: (e: any) => {
            dispatch!({
              type: 'oldUserLoginSuccess/applyAttrValModal',
              payload: {
                attrCode: item.attrCode,
                attrValue: e,
                attrName: item.attrName,
                cartItemId: item?.extMap?.cartItemId,
              },
            }).then((f: boolean) => {
              if (f) {
                dispatch!({
                  type: 'oldUserLoginSuccess/save',
                  payload: {
                    commonAttrValue: {
                      ...commonAttrValue,
                      [item.attrCode]: e,
                    },
                  },
                });
              }
            });
          },
          required: fefeatureList.indexOf('202') !== -1,
          fieldProps: item?.attrCode,
        });
      }
      if (fefeatureList.indexOf('102') !== -1) {
        fData.push({
          type: 'text',
          placeholder: `请选择${item?.attrName}`,
          title: item?.attrName,
          onChange: (e: any) => {
            dispatch!({
              type: 'oldUserLoginSuccess/applyAttrValModal',
              payload: {
                attrCode: item.attrCode,
                attrValue: e,
              },
            }).then((f: boolean) => {
              if (f) {
                // eslint-disable-next-line no-unused-expressions
                dispatch!({
                  type: 'oldUserLoginSuccess/save',
                  payload: {
                    commonAttrValue: {
                      ...commonAttrValue,
                      [item.attrCode]: e,
                    },
                  },
                });
              }
            });
          },
          required: fefeatureList.indexOf('202') !== -1,
          fieldProps: item?.attrCode,
        });
      }
    });
    dispatch!({
      type: 'oldUserLoginSuccess/save',
      payload: {
        commonAttrData: fData,
        dynamicList,
      },
    });
  };

  const onFinish = () => {};

  const onFinishFailed = () => {};

  const veriryIdCard = (val: string) => {
    if (val) {
      const idCard = val.replace(/\s+/g, '');
      if (
        !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          idCard,
        ) &&
        idCard
      ) {
        Toast.fail('身份证号码有误');
        return false;
      }
      return true;
    }
    return false;
  };

  const formsData = [
    {
      type: 'input',
      fieldProps: 'name',
      required: true,
      placeholder: '请输入身份证姓名',
      title: '真实姓名',
      inputType: 'text',
      hasStar: false,
    },
    {
      type: 'input',
      fieldProps: 'idCard',
      required: true,
      placeholder: '请输入身份证号码',
      title: '身份证号码',
      inputType: 'text',
      hasStar: false,
      maxLength: 18,
      onBlur: (val: string) => {
        if (val) {
          veriryIdCard(val);
        }
      },
    },
  ] as IFormItemProps[];

  const formsData2 = [
    {
      type: 'picker',
      fieldProps: 'claimValue',
      data: claimData,
      title: '配送方式',
    },
  ];

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues: nameAndNo,
    form,
  };

  /**
   * 确认支付
   */
  const onClick = () => {
    // if (selType.length === 0) {
    //   dispatch!({
    //     type: 'payConfirm/commitOrderBfCheck',
    //     payload: {
    //       certData: {
    //         certName: '',
    //         certNum: '',
    //         certType: '1',
    //       },
    //     },
    //   }).then((flag: boolean) => {
    //     if (flag) {
    //       dispatch!({
    //         type: 'payConfirm/commitOrder',
    //         payload: {},
    //       }).then((res: any) => {
    //         if (res) {
    //           dispatch!({
    //             type: 'payConfirm/save',
    //             payload: {
    //               invoiceContent: { personal: {}, company: {} },
    //             },
    //           });
    //           const { payUrl, orderId } = res;
    //           if (payUrl) {
    //             localStorage.setItem('leave', '1'); // 用来标识是跳转到支付页面
    //             window.location.href = Utils.getPayUrl(payUrl);
    //           } else {
    //             window.location.href = `${window.location.origin}/#/customer/paySuccess?retnCode=0000&retnInfo=0000&orderSeq=${orderId}`;
    //           }
    //         }
    //       });
    //     }
    //   });
    //   return;
    // }
    const formsValue = form.getFieldsValue();
    if (selType && selType.length) {
      if (!phoneInfo?.phoneNum) {
        Toast.show('手机号码不能为空');
        return;
      }
      if (selType.length && (!phoneInfo?.phoneNum || phoneInfo?.phoneNum?.length !== 11)) {
        Toast.show('手机号码输入有误');
        return;
      }
    }
    if (
      (selType && selType.length === 1 && selType[0] === '501') ||
      phoneInfo?.phoneType === '501'
    ) {
      if (!formsValue.name) {
        Toast.show('请输入真实姓名！');
        return;
      }
      if (!formsValue.idCard) {
        Toast.show('请输入身份证！');
        return;
      }
      if (!veriryIdCard(formsValue.idCard)) {
        Toast.show('身份证号码有误!');
        return;
      }
    }

    const dynamicVal = form3.getFieldsValue();
    let stopFlag = false;
    if (dynamicVal && Object.keys(dynamicVal).length) {
      const filter = Object.keys(dynamicVal).filter((it: any) => !dynamicVal[it]);
      if (filter && filter.length) {
        filter.forEach((item: any) => {
          if (stopFlag) return;
          const valList = dynamicList.filter((it: any) => it.code === item);
          if (valList && valList.length && valList[0].required) {
            Toast.fail(`请输入${valList[0].name}`, 1);
            stopFlag = true;
          }
        });
      }
    }
    if (stopFlag) return;

    if (dynamicVal && Object.keys(dynamicVal).length) {
      const filter = Object.keys(dynamicVal).filter((it) => !dynamicVal[it]);
      console.log(filter);
    }

    dispatch!({
      type: 'payConfirm/save',
      payload: {
        nameAndNo: form.getFieldsValue(),
      },
    });
    if (claimType && claimType.length > 1) {
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          claimValue: form2.getFieldValue('claimValue'),
        },
      });
    }
    if (needShowOrdAddr === 'T') {
      if (!addressInfo.receiveAddrId) {
        Toast.show('请选择地址！');
        return;
      }
    }
    dispatch!({
      type: 'orderConfirm/save',
      payload: {
        homeAddrData: [], // 区域数据
        skuList: [],
        selectPhoneValue: {},
        tabeValues: {},
      },
    });
    dispatch!({
      type: 'payConfirm/commitOrderBfCheck',
      payload: {
        certData: {
          certName: formsValue?.name ? formsValue?.name.trim() : '',
          certNum: formsValue?.idCard ? formsValue?.idCard.trim() : '',
          certType: '1',
        },
      },
    }).then((data: boolean) => {
      if (data === true) {
        if (phoneInfo?.phoneType === '501') {
          dispatch!({
            type: 'payConfirm/save',
            payload: {
              invoiceContent: { personal: {}, company: {} },
            },
          });
          history.push({
            pathname: '/nameAuthentication',
          });
        } else {
          dispatch!({
            type: 'payConfirm/commitOrder',
            payload: {},
          }).then((res: any) => {
            if (res) {
              dispatch!({
                type: 'payConfirm/save',
                payload: {
                  invoiceContent: { personal: {}, company: {} },
                },
              });
              const { payUrl, orderId } = res;
              if (payUrl) {
                localStorage.setItem('leave', '1'); // 用来标识是跳转到支付页面
                window.location.href = Utils.getPayUrl(payUrl);
              } else {
                window.location.href = `${window.location.origin}/#/customer/paySuccess?retnCode=0000&retnInfo=0000&orderSeq=${orderId}`;
              }
            }
          });
        }
      }
    });
  };
  const getInvoiceInfo = (data: any) => {
    if (data.type !== '2') {
      dispatch!({
        type: 'payConfirm/addMemberInvoice',
        payload: {
          isDefault: 0,
          receiveMobile: data?.taxpayerTel,
          taxpayerName: data?.templateName,
          ...data,
        },
      });
    }
  };

  const selectAddr = () => {
    dispatch!({
      type: 'payConfirm/save',
      payload: {
        nameAndNo: form.getFieldsValue(),
        claimValue: form2.getFieldValue('claimValue'),
      },
    });
    history.push({
      pathname: '/customer/cDeliveryAddr',
    });
  };

  /**
   * 打开新号码的弹框
   */
  const openNewNumClick = () => {
    if (homeLocationFlag) {
      if (addrLabel && addrLabel.length) {
        setNewNumFlag(true);
        // ref.current = null;
        // bs = null;
      } else {
        Toast.show('请先选择归属地！', 1);
      }
    } else {
      setNewNumFlag(true);
      // ref.current = null;
      // bs = null;
    }
  };

  /**
   * 打开旧号码的弹框
   */
  const openOldNumClick = () => {
    dispatch!({
      type: 'payConfirm/queryPhoneNumByMemberIdModels',
    }).then((res: any = {}) => {
      const { data = [], errCode = '', success = false, errMessage = '' } = res;
      if (res && success) {
        if (data && data.length > 0) {
          setOldPhoneList(data);
          setOldNumFlag(true);
          updateFootFlag(true);
        } else {
          setOldNumFlag(false);
          updateFootFlag(false);
          Toast.show('当前无派卡号！');
        }
      } else if (errCode === '002') {
        dispatch!({
          type: 'payConfirm/queryDefaultOrderGoodsModel',
          payload: {
            sType: '2000',
            storeId: -1,
          },
        }).then(() => {
          setGuideModalVisible(true);
        });
      } else {
        Toast.fail(errMessage, 1);
      }
    });
  };

  /**
   * 选中新号码的事件
   */
  const newOnComfirm = (item: any) => {
    dispatch!({
      type: 'payConfirm/choosePhoneNum',
      payload: {
        ...item,
        cartItemId: storeList[0].goodsList[0].cartItemId,
        provinceId: addrValue?.provinceId,
        lanId: addrValue?.lanId,
      },
    }).then((res: any) => {
      storeList[0].goodsList[0].accNum = item?.phoneNum;
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          phoneInfo: {
            ...item,
            phoneType: '501',
          },
        },
      });
      setNewNumFlag(false);
      updateFootFlag(false);
      if (res) {
        const { needShowOrdAddr = '', claimType = [] } = res;
        dispatch!({
          type: 'payConfirm/save',
          payload: {
            needShowOrdAddr,
            claimType,
          },
        });
      }
      setTimeout(() => {
        if (bs) bs.refresh();
      }, 100);
      if (addressInfo && Object.keys(addressInfo).length) return;
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          addressInfo: res?.memberReceiveAddr || {},
        },
      });
    });
  };

  /**
   * 旧号码选中事件
   */
  const oldOnComfirm = (selectPhone: any) => {
    dispatch!({
      type: 'payConfirm/choosePhoneNum',
      payload: {
        ...selectPhone,
        cartItemId: storeList[0].goodsList[0].cartItemId,
        provinceId: null,
      },
    }).then((res: any) => {
      storeList[0].goodsList[0].accNum = selectPhone?.phoneNum;
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          phoneInfo: {
            ...selectPhone,
            phoneType: '502',
          },
        },
      });
      updateFootFlag(false);
      setOldNumFlag(false);
      if (res) {
        const { needShowOrdAddr = '', claimType = [] } = res;
        dispatch!({
          type: 'payConfirm/save',
          payload: {
            needShowOrdAddr,
            claimType,
          },
        });
      }
    });
  };

  /**
   * 清除选中的号码信息
   */
  const clearPhoneInfo = () => {
    dispatch!({
      type: 'payConfirm/save',
      payload: {
        phoneInfo: {},
      },
    });
  };

  /**
   * 引导开卡弹框确认页面
   */
  const confirmClick = (res: any) => {
    const gList: { skuId: any; quantity: any }[] = [];
    res.forEach((it: { skuId: any; quantity: any }) => {
      if (it?.quantity) {
        gList.push({
          skuId: it?.skuId,
          quantity: it?.quantity,
        });
      }
    });
    dispatch!({
      type: 'oldUserLoginSuccess/commitCartQuick',
      payload: {
        goodsList: gList,
        dispatch,
      },
    }).then((data: any) => {
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          orderInfo: data,
          needShowOrdAddr: data?.needOrdAddr,
          claimType: data?.claimType,
        },
      });
      if (data?.claimType && data?.claimType.length) {
        setSendMode(data?.claimType);
      }
      initDataValue(data);
      localStorage.setItem('leave', '0'); // 用完值要设置成初始值
    });
    setGuideModalVisible(false);
  };

  /**
   * 引导开发弹框关闭弹框事件
   */
  const guideModalClose = (res: any) => {
    if (!guideFlag) {
      setGuideModalVisible(false);
    } else if (res[0].quantity) {
      setGuideModalVisible(false);
      const gList = res.map((it: { skuId: any; quantity: any }) => ({
        skuId: it?.skuId,
        quantity: it?.quantity,
      }));
      dispatch!({
        type: 'oldUserLoginSuccess/commitCartQuick',
        payload: {
          goodsList: gList,
          dispatch,
        },
      }).then((data: any) => {
        dispatch!({
          type: 'payConfirm/save',
          payload: {
            orderInfo: data,
            needShowOrdAddr: data?.needOrdAddr,
            claimType: data?.claimType,
          },
        });
        if (data?.claimType && data?.claimType.length) {
          setSendMode(data?.claimType);
        }
        initDataValue(data);
        localStorage.setItem('leave', '0'); // 用完值要设置成初始值
      });
    } else {
      router.goBack();
    }
  };

  // 增加或者删除的点击事件
  const addOrDelClick = (
    proNum: number,
    goodsDetail: any,
    type: 'add' | 'reduce' | 'cart' | 'single',
    categoryId: string,
    mode: string,
  ) => {
    // tabData 的数据修改
    const newTabData = JSON.parse(JSON.stringify(tabDataRef.current));
    newTabData.forEach((tabItem: any) => {
      if (tabItem.categoryId === categoryId) {
        tabItem.values.forEach((item: any) => {
          if (item.goodsId === goodsDetail?.goodsId) {
            if (!item.quantity) item.quantity = 0;
            if (type === 'add') {
              item.quantity += proNum;
            } else if (type === 'reduce') {
              item.quantity -= proNum;
            } else {
              item.quantity = proNum;
            }
          }
        });
      }
    });

    // 左侧tab标题栏的数据修改
    const newTabs = tabsRef.current.map((item: any) => {
      if (item.categoryId === categoryId) {
        if (type === 'add' || type === 'single') {
          item.quantity += proNum;
        } else if (type === 'reduce') {
          item.quantity -= proNum;
        } else {
          let totalQuantity = 0;
          const filterList = newTabData.filter(
            (it: any) => it.categoryId === activeGoodData.categoryId,
          );
          if (filterList && filterList.length) {
            // eslint-disable-next-line array-callback-return
            filterList[0].values.map((it: any) => {
              if (it.quantity) totalQuantity += it.quantity;
            });
          }
          item.quantity = totalQuantity;
        }
      }
      return item;
    });
    dispatch!({
      type: 'indexList/save',
      payload: {
        tabs: newTabs,
        tabData: newTabData,
      },
    });
    if (mode === 'close') {
      confirmClick(skuListRef.current);
    }
  };

  /**
   * 查询 sku
   */
  const querySku = (
    data: any,
    type: 'add' | 'reduce' | 'cart' | 'single',
    categoryId = '',
    mode: string,
  ) => {
    setGuideFlag(true);
    const { saleAttrList = [] } = data;
    let selectName = '';
    let newskuQueryList = saleAttrList.map((item: any) => {
      selectName += `"${
        item?.attrValues && item?.attrValues.length ? item.attrValues[0].name : ''
      }" `;
      return {
        attrCode: item.attrCode,
        attrName: item?.attrValues && item?.attrValues.length ? item.attrValues[0].name : '',
        attrValue: item?.attrValues && item?.attrValues.length ? item.attrValues[0].attrValue : '',
      };
    });

    if (data?.skuQueryList && data?.skuQueryList.length) {
      newskuQueryList = data?.skuQueryList;
    }
    dispatch!({
      type: 'indexList/save',
      payload: {
        skuQueryList: newskuQueryList,
        activeGoodData: {
          categoryId,
          goodDetail: data,
        },
      },
    });
    if (type === 'cart') return;
    dispatch!({
      type: 'goodsDetail/queryDetailByAttr',
      payload: {
        attrList: newskuQueryList,
        goodsId: data?.goodsId,
      },
    }).then((res: any) => {
      const newSkuList: any[] = [];
      skuListRef.current.forEach((item: any) => {
        if (item.skuId === res.skuId) {
          const params = item;
          if (type === 'add') params.quantity += 1;
          if (type === 'reduce') params.quantity -= 1;
          if (params.quantity > 0) {
            newSkuList.push(params);
          }
          return;
        }
        newSkuList.push(item);
      });
      if (type === 'single') {
        const { skuFilePathInServer = '', orderAttrs = [] } = data;
        newSkuList.push({
          ...data,
          skuInfoThumbnail: skuFilePathInServer,
          orderAttrs,
          quantity: 1,
          categoryId,
          skuQueryList: newskuQueryList,
          select: selectName,
        });
      }
      dispatch!({
        type: 'indexList/calFeeModels',
        payload: {
          goodsList: newSkuList,
        },
      }).then(() => {
        addOrDelClick(1, data, type, categoryId, mode);
      });
    });
  };

  /**
   * 引导商品减少事件
   */
  const reduceClick = (e: any) => {
    const newData = guideList.map((item: any) => {
      const newItem = JSON.parse(JSON.stringify(item));
      if (newItem?.skuId === e?.skuId) {
        newItem.quantity -= 1;
        querySku(e, 'reduce', e?.categoryId, 'other');
      }
      return newItem;
    });
    dispatch!({
      type: 'payConfirm/save',
      payload: {
        guideList: newData,
      },
    });
  };

  /**
   * 引导商品增加事件
   */
  const addClick = (e: any, mode: string) => {
    const newData = guideList.map((item: any) => {
      const newItem = JSON.parse(JSON.stringify(item));
      if (newItem?.skuId === e?.skuId) {
        let types = 'single';
        if (newItem.quantity !== 0) {
          types = 'add';
        }
        newItem.quantity += 1;
        if (!guideFlag) {
          const newtabData = tabData.map((nt: any) => {
            if (nt && nt.values && nt.values.length) {
              nt.values.forEach((ntItem: any) => {
                ntItem.quantity = 0;
              });
              return nt;
            }
            return nt;
          });
          const newtabs = newtabData?.map((itemTab: any) => {
            let val = 0;
            // eslint-disable-next-line no-return-assign
            itemTab.values.map((it: any) => (val += it.quantity));
            return {
              categoryId: itemTab.categoryId,
              categoryName: itemTab.categoryName,
              quantity: 0,
            };
          });
          dispatch!({
            type: 'indexList/save',
            payload: {
              tabData: newtabData,
              tabs: newtabs,
              tabActiveId: newtabData && newtabData.length > 0 ? newtabData[0].categoryId : '',
              skuList: [],
              cartAllData: {},
            },
          });
          querySku(e, types, e?.categoryId, mode);
        } else {
          querySku(e, types, e?.categoryId, mode);
        }
      }
      return newItem;
    });

    dispatch!({
      type: 'payConfirm/save',
      payload: {
        guideList: newData,
      },
    });
  };

  const getNowClick = (e: any) => {
    addClick(e, 'close');
  };

  /**
   * 归属地确认事件
   */
  const addrSubmit = (list = []) => {
    dispatch!({
      type: 'payConfirm/save',
      payload: {
        addrLabel: list.map((item: any) => item.label),
        addrValue: list[1],
        phoneInfo: {},
      },
    });
    setAddrFlag(false);
    setAddrFlag(false);
  };

  /**
   * 跳转到客服页面
   */
  const customerClick = () => {
    putHoneyGoodsDetail({});
    dispatch!({
      type: 'my/queryMemberLevel',
    }).then((flag: boolean) => {
      if (flag) {
        dispatch!({
          type: 'customerHoney/qryOnlineSourceModels',
        }).then((res: any) => {
          if (res === 'csms') {
            history.push({
              pathname: '/customerHoney',
            });
          } else {
            resetIframeViewPort();
            window.addEventListener('message', listenFun);
            setCustomerVisible(true);
          }
        });
      } else {
        history.push({
          pathname: '/customer/orderConfirm',
          query: {
            isCustomerService: true,
          },
        });
      }
    });
  };

  const showPhoneImg = (flag: string) => {
    switch (flag) {
      case '1':
        return <div></div>;
      case '2':
        return (
          <img src={GrayDownIcon} onClick={openOldNumClick} alt="" className={styles.closeImg} />
        );
      default:
        return <img src={CloseIcon} onClick={clearPhoneInfo} alt="" className={styles.closeImg} />;
    }
  };

  return (
    <div className={styles.payConfirm}>
      <div
        className={styles.payConfirmContent}
        ref={ref}
        style={{ height: document.documentElement.clientHeight - 100 }}
      >
        <div
          className={classnames({
            [styles.payConfirmRef]: true,
          })}
        >
          {homeLocationFlag && selType.indexOf('501') !== -1 && (
            <div className={styles.selectAddr} onClick={() => setAddrFlag(true)}>
              <div className={styles.selectLeft}>
                <div className={styles.label}>归属地</div>
                <div className={styles.addrValue}>
                  {addrLabel && addrLabel.length > 0 ? addrLabel.join(' ') : '请选择'}
                </div>
              </div>
              <div className={styles.selectRight}>
                <img src={IconShopAction} alt="" className={styles.rightIcon} />
              </div>
            </div>
          )}
          {selType.length !== 0 && (
            <div className={styles.selectNum}>
              {(selType.indexOf('501') !== -1 || selType.indexOf('502') !== -1) && (
                <React.Fragment>
                  <div className={styles.selectNumText}>手机号码</div>
                  <div className={styles.selectNumContent}>
                    {phoneInfo && phoneInfo?.phoneNum ? (
                      <div className={styles.showPhone}>
                        {phoneInfo?.phoneNum}
                        {showPhoneImg(singleFlag)}
                      </div>
                    ) : (
                      <React.Fragment>
                        {selType.indexOf('501') !== -1 && (
                          <div
                            className={styles.selectNumTextLabel}
                            onClick={openNewNumClick}
                            param-action="selectNewNum"
                          >
                            选择新号码
                          </div>
                        )}
                        {selType.indexOf('502') !== -1 && (
                          <div
                            className={styles.selectNumTextLabel}
                            onClick={openOldNumClick}
                            param-action="selectOldNum"
                          >
                            已有派卡号
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                </React.Fragment>
              )}
              {(selType.indexOf('503') !== -1 || selType.indexOf('504') !== -1) &&
                selType.indexOf('501') === -1 &&
                selType.indexOf('502') === -1 && (
                  <List>
                    <InputItem
                      style={{ textAlign: 'right' }}
                      placeholder={
                        selType.indexOf('503') !== -1 ? '请输入派卡号码' : '请输入手机号码'
                      }
                      type="number"
                      maxLength={11}
                      // clear
                      value={phoneInfo?.phoneNum}
                      onBlur={(val: string) => {
                        if (val && val.length === 11) {
                          dispatch!({
                            type: 'payConfirm/choosePhoneNum',
                            payload: {
                              phoneNum: val,
                              cartItemId: storeList[0].goodsList[0].cartItemId,
                              provinceId: null,
                              lanId: null,
                            },
                          }).then((res: any) => {
                            if (res) {
                              const { needShowOrdAddr = '', claimType = [] } = res;
                              dispatch!({
                                type: 'payConfirm/save',
                                payload: {
                                  needShowOrdAddr,
                                  claimType,
                                },
                              });
                            }
                          });
                        } else if (val && val.length !== 11) {
                          Toast.show('号码输入有误', 1);
                        }
                      }}
                      onChange={(e) => {
                        dispatch!({
                          type: 'payConfirm/save',
                          payload: {
                            phoneInfo: {
                              ...phoneInfo,
                              selType: '503',
                              phoneNum: e,
                            },
                          },
                        });
                      }}
                    >
                      手机号码
                    </InputItem>
                  </List>
                )}
            </div>
          )}
          <div className={styles.selTypeDiv}>
            {((selType && selType.length === 1 && selType[0] === '501') ||
              phoneInfo?.phoneType === '501') && <DynamicForm {...formProps} />}
          </div>
          <div className={styles.commonAttrDiv}>
            {commonAttrData && commonAttrData.length > 0 && (
              <DynamicForm form={form3} data={commonAttrData} formsValues={commonAttrValue} />
            )}
          </div>
          <div className={styles.addrInfo} onClick={selectAddr} hidden={needShowOrdAddr !== 'T'}>
            <div>
              {name ? (
                <>
                  {' '}
                  <div className={styles.nameAndPhone}>
                    {province + city + region + detailAddress}
                  </div>
                  <div className={styles.userAddr}>{name + phoneNumber}</div>
                </>
              ) : (
                '选择收货地址'
              )}
            </div>
            <div>
              <img src={rightIcon} alt="" />
            </div>
          </div>
          <div className={styles.invoice}>
            <InvoiceAlert
              checkPhoneInput={() => {
                const names = form.getFieldValue('name');
                if (
                  ((selType && selType.length === 1 && selType[0] === '501') ||
                    phoneInfo?.phoneType === '501') &&
                  !names
                ) {
                  Toast.fail('真实姓名不能为空', 1);
                  return false;
                }
                return true;
              }}
              canInvoiceFlag={!!(selType && selType.length > 0)}
              getInvoiceContent={(data: any) => {
                updateInvoice(data);
                dispatch!({
                  type: 'payConfirm/save',
                  payload: {
                    invoiceContent: data,
                  },
                });
              }}
              showFootBtn={(flag: any) => {
                updateFootFlag(flag);
              }}
              accNumAndFlag={{
                accNum: phoneInfo?.phoneNum,
                newAccNum: phoneInfo?.phoneType === '501' ? 1 : 0,
              }}
              invoiceContent={invoice}
              onSubmit={getInvoiceInfo}
              userName={form?.getFieldsValue()?.name}
              userPhone={memberInfo?.phone}
            />
          </div>
          {claimType && claimType?.length > 0 && (
            <div className={styles.sendTypeStyle}>
              <DynamicForm form={form2} data={formsData2} formsValues={{ claimValue }} />
            </div>
          )}
          <div className={styles.orderContent}>
            {storeList?.map((item: { goodsList: any[] }) =>
              item.goodsList?.map((subItem: any) => (
                <ConfirmItem
                  skuName={subItem.goodsName}
                  quantity={subItem.quantity}
                  des={subItem.skuName}
                  salesPrice={subItem.price}
                  skuImg={subItem.picUrl}
                />
              )),
            )}
          </div>
          <div style={{ width: '100%', height: '2.3rem' }} />
        </div>
      </div>

      {footBtnFlag ? (
        ''
      ) : (
        <MagicFootBtn
          collect="commitOrder"
          btnText="立即提交"
          onClick={onClick}
          showCustomer={type === 'goose'}
          customerClick={customerClick}
          fileClick={() => {
            setFileFlag(true);
            setFilePathUrl(FileHtml);
            setFileTitle('服务协议');
          }}
          marketingRulesCLick={() => {
            setFileFlag(true);
            setFilePathUrl(FileHtml1);
            setFileTitle('营销规则');
          }}
        >
          <div className={styles.orderInfoFoot}>
            共{storeList[0]?.goodsList?.length}件 总计 <span>{payAmount}元</span>
          </div>
        </MagicFootBtn>
      )}
      <FileModal
        visible={fileFlag}
        pathUrl={filePathUrl}
        title={fileTitle}
        close={() => {
          setFileFlag(false);
        }}
      />
      {/* 新号码的弹框 */}
      <CommonSelectAlert
        dispatch={dispatch}
        show={newNumFlag}
        isShowNew
        from="bilibi"
        provinceId={addrValue?.provinceId}
        lanId={addrValue?.lanId}
        linePhone={memberInfo?.phone}
        closeClick={() => {
          setNewNumFlag(false);
          updateFootFlag(false);
        }}
        onComfirm={newOnComfirm}
      />
      {/* 旧号码弹框 */}
      <OldPhoneAlert
        selectPhone={phoneInfo?.phoneNum}
        phoneList={oldPhoneList}
        show={oldNumFlag}
        onClick={oldOnComfirm}
        closeClick={() => {
          setOldNumFlag(false);
          updateFootFlag(false);
        }}
      />
      <GuideModal
        visible={guideModalVisible}
        close={guideModalClose}
        data={guideList}
        reduceClick={reduceClick}
        addClick={(e: any) => addClick(e, 'other')}
        confirmClick={confirmClick}
        getNowClick={getNowClick}
      />
      <AddressPickerView
        show={addrFlag}
        isLimitArea
        title="号码归属"
        colums={2}
        onClose={() => {
          setAddrFlag(false);
        }}
        onSubmit={addrSubmit}
      />
      <Modal visible={customerVisible}>
        <OtherCustomer
          close={() => {
            setCustomerVisible(false);
            backIframeViewPort();
          }}
        />
      </Modal>
    </div>
  );
};

export default connect(
  ({
    payConfirm,
    orderConfirm,
    indexList,
    oldUserLoginSuccess,
  }: {
    payConfirm: PayConfirmModelState;
    orderConfirm: OrderConfirmModelState;
    indexList: IndexListModelState;
    oldUserLoginSuccess: OldUserLoginSuccessModelState;
  }) => ({ payConfirm, orderConfirm, indexList, oldUserLoginSuccess }),
)(PayConfirmPage);
