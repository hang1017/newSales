/* eslint-disable guard-for-in */
import React, { FC, useEffect, useState, useRef } from 'react';
import {
  OrderConfirmModelState,
  ConnectProps,
  connect,
  history,
  setPageNavBar,
  IndexListModelState,
} from 'alita';
import { Toast } from 'antd-mobile';
import _ from 'lodash';
import { Base64 } from 'js-base64';
import DynamicForm, { IFormItemProps, useForm } from '@alitajs/dform';
import Utils from '@/utils/tool';
import { getVerificationCodeImgUrl } from '@/utils';
import { sysParams } from '@/utils/AppContext';
import SlipCheck from '@/pages/customer/components/SlipCheck';
import SingleBtn from '../components/SingleBtn';
import CommonSelectAlert from '../components/CommonSelectAlert';
import MagicTab from '../components/MagicTab';

import styles from './index.less';

interface PageProps extends ConnectProps {
  orderConfirm: OrderConfirmModelState;
  indexList: IndexListModelState;
}

let timer: NodeJS.Timeout | null = null;
let seconds = 60;

const OrderConfirmPage: FC<PageProps> = ({ orderConfirm, dispatch, indexList, location }) => {
  const [showPhoneAlert, setShowPhoneAlert] = useState(false);
  const [isShowChooseNum, updateIsShowChooseNum] = useState(true);
  const [newBtnText, updateNewBtnText] = useState('获取验证码');
  const [oldBtnText, updateOldBtnText] = useState('获取验证码');
  const [showSpliItem, updateShowSpliItem] = useState(false);
  const [btnFlag, setBtnFlag] = useState<boolean>(false);
  const [codeFail, updateCodeFail] = useState(false); // 是否有输出验证码
  const [form] = useForm();
  const isCustomerService = Utils.getQueryString('isCustomerService'); // 是否是客服跳转过来
  const {
    homeAddrData,
    selectPhoneValue,
    tabeValues,
    initiazePage = 0,
    tabOneData = {},
    tabTwoData = {},
    slipInfo = {},
  } = orderConfirm;

  const { raffleDrawId = '', raffleDrawCycleId = '' } = location?.query;

  const { skuList = [] } = indexList;

  const currentRef = useRef(0); // 输入框绑定事件

  const codeRef = useRef();
  const uuidRef = useRef();

  const getBlobImageUrl = (url: any) => {
    const request = new window.XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', url, true);
    request.onreadystatechange = () => {
      if (request.readyState === window.XMLHttpRequest.DONE && request.status === 200) {
        codeRef.current.src = URL.createObjectURL(request.response);
        // 提取UUID
        uuidRef.current = request.getResponseHeader('uuid');
        codeRef.current.onload = () => {
          URL.revokeObjectURL(codeRef.current.src);
        };
      }
    };
    request.send(null);
  };

  /**
   * 获取图形验证码点击事件
   */
  const imgCodeUrlClick = () => {
    const url = getVerificationCodeImgUrl();
    getBlobImageUrl(url);
  };

  const provinceId = 8310000;
  const lanId = 8310100;
  const getIsShowPhone = () => {
    let isShowPhone = false;
    // eslint-disable-next-line no-unused-expressions
    skuList &&
      skuList.length &&
      skuList?.map((item: any) => {
        const { orderAttrs = [] } = item;
        if (!isShowPhone) {
          isShowPhone = Utils.isShowChooseNum(orderAttrs);
        }
      });
    return isShowPhone;
  };

  const startTimer = (isNew: boolean) => {
    timer = setInterval(() => {
      if (seconds === 0) {
        if (timer) clearInterval(timer);
        timer = null;
        seconds = 60;
        if (isNew) {
          updateNewBtnText(`获取验证码`);
        } else {
          updateOldBtnText(`获取验证码`);
        }
      } else {
        seconds -= 1;
        if (isNew) {
          updateNewBtnText(`已发送${seconds}s`);
        } else {
          updateOldBtnText(`已发送${seconds}s`);
        }
      }
    }, 1000);
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
   * 发送验证码
   * @param isNew
   */
  const sendSms = (isNew: boolean) => {
    // updateIsUpdeteNewCode(isNew);
    const linePhone = form.getFieldValue('linePhone');
    const graphValidateCode = form.getFieldValue('graphValidateCode');

    const checkFalg = veriryPhone(linePhone);
    if (!checkFalg) {
      return;
    }
    if (seconds === 60) {
      if (!linePhone) {
        Toast.show('请输入手机号码！');
        return;
      }
      // if (!graphValidateCode) {
      //   Toast.show('请输入图形验证码！');
      //   return;
      // }
      startTimer(isNew);
      setBtnFlag(false);
      dispatch!({
        type: 'orderSearch/genAppLoginMsgCode',
        payload: {
          phone: linePhone && Base64.encode(linePhone.replace(/\s+/g, '')),
          uuid: uuidRef.current,
          graphValidateCode,
          callback: (flag: boolean) => {
            if (!flag && timer) {
              // imgCodeUrlClick();
              setBtnFlag(false);
              if (timer) clearInterval(timer);
              timer = null;
              seconds = 60;
              updateNewBtnText(`获取验证码`);
            }
          },
        },
      });
      // if (!isClickSendSms) {
      //   updateIsClickSendSms(true);
      //   if (!linePhone) {
      //     Toast.show('请输入手机号码！');
      //     return;
      //   }
      //   dispatch!({
      //     type: 'orderSearch/genAppLoginMsgCode',
      //     payload: {
      //       phone: linePhone && linePhone.replace(/\s+/g, ""),
      //       callback: () => {
      //         startTimer(isNew);
      //         Toast.success('发送验证码成功');
      //       },
      //     },
      //   });
      // }
    }
  };
  /**
   * 是否开启验证码
   */
  const getIsSlidVerify = () => {
    dispatch!({
      type: 'orderConfirm/getSlideVerificationCode',
    }).then((res) => {
      const { uuId } = res;
      if (uuId) {
        updateShowSpliItem(true);
      }
    });
  };
  const sendVeriryCode = (isNew) => {
    if (codeFail) {
      getIsSlidVerify();
    } else {
      sendSms(isNew);
    }
  };
  const newUserRegister = (values: any) => {
    dispatch!({
      type: 'orderConfirm/addRegistAndLogin',
      payload: {
        phone: Base64.encode(values.linePhone.replace(/\s+/g, '')),
        // pwd: values.certNum.substring(values.certNum.length - 6),
        smsCode: values.code,
        uuid: uuidRef.current,
        graphValidateCode: values?.graphValidateCode,
        callback: (result) => {
          const { data, success, errCode, errMessage } = result;
          if (!success) {
            // setBtnFlag(false);
            // if (timer) clearInterval(timer);
            // timer = null;
            // seconds = 60;
            // updateNewBtnText(`获取验证码`);
            if (errCode === 'BMS_VERIFICATIONCODEWRONG_LOGIN_005') {
              // 验证码校验失败的
              dispatch!({
                type: 'payConfirm/getH5ConfigurationModel',
                payload: {
                  propertyName: sysParams.slidVerify,
                },
              }).then((flag: boolean) => {
                Toast.fail(errMessage, 1);
                if (flag) {
                  // 开启验证码
                  updateCodeFail(true);
                }
              });

              // getIsSlidVerify();
            } else {
              Toast.fail(errMessage, 1);
            }

            return;
          }

          // 鹅外惊喜登录
          if (location?.query.type === 'goose') {
            dispatch!({
              type: 'goose/raffleDrawTimeAndAuthorityModel',
              payload: {
                raffleDrawId,
                raffleDrawCycleId,
              },
            }).then((res: any) => {
              if (res && Object.keys(res).length) {
                if (res?.authority) {
                  history.replace({
                    pathname: '/goose/luckDraw',
                    query: {
                      raffleDrawId,
                      raffleDrawCycleId,
                    },
                  });
                } else {
                  Toast.show('您暂无权限抽奖，请先订购喜鹅派', 1);
                  setTimeout(() => {
                    history.goBack();
                  }, 1000);
                }
              }
            });
            return;
          }

          if (isCustomerService) {
            history.goBack();
            return;
          }
          if (skuList.length === 0) {
            history.goBack();
            return;
          }
          let urlGoodsList = (skuList || [])?.map((item: any) => {
            return { skuId: item.skuId, quantity: item.quantity };
          });
          dispatch!({
            type: 'login/save',
            payload: {
              loginFlag: true,
            },
          });
          localStorage.setItem('leave', '0');
          setTimeout(() => {
            history.replace({
              pathname: '/customer/payConfirm',
              query: {
                urlGoodsList: JSON.stringify(urlGoodsList),
                type: location.query?.type === 'goosePayConfirm' ? 'goose' : '',
              },
            });
          }, 10);
        },
      },
    });
  };
  const tabData = [
    {
      title: '新加入青年一派',
      key: '01',
    },
    {
      title: '我已是青年一派',
      key: '02',
    },
  ];
  const oldFormsData = [
    {
      type: 'input',
      fieldProps: 'linePhone',
      hasStar: false,
      placeholder: '请输入您的青年一派手机号',
      title: '手机号码',
      required: true,
      onBlur: (value: string) => {
        if (value) {
          veriryPhone(value);
        }
      },
      coverStyle: {
        textAlign: 'left',
      },
      inputType: 'phone',
    },
    // {
    //   type: 'input',
    //   required: true,
    //   fieldProps: 'graphValidateCode',
    //   hasStar: false,
    //   title: '图形验证码',
    //   labelNumber: 6,
    //   placeholder: '请输入图形验证码',
    //   maxLength: 4,
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    //   extra: <img ref={codeRef} className={styles.regLoginCodeImg} onClick={imgCodeUrlClick} />,
    // },
    {
      type: 'input',
      hasStar: false,
      fieldProps: 'code',
      required: true,
      placeholder: '请输入短信验证码',
      inputType: 'number',
      maxLength: 6,
      title: '验证码',
      extra: (
        <span
          onClick={_.debounce(() => sendVeriryCode(false), 500)}
          className={oldBtnText === '获取验证码' ? styles.getCode : styles.disableSend}
          param-action={oldBtnText === '获取验证码' ? 'getVerfifyCode' : ''}
        >
          {oldBtnText}
        </span>
      ),
      coverStyle: {
        textAlign: 'left',
      },
    },
  ];

  const formsData = ([
    // {
    //   type: 'input',
    //   required: true,
    //   fieldProps: 'certName',
    //   placeholder: '请输入真实姓名',
    //   title: '姓名',
    //   hasStar: false,
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    // },
    // {
    //   type: 'input',
    //   required: true,
    //   fieldProps: 'certNum',
    //   placeholder: '请输入身份证号',
    //   title: '身份证号',
    //   hasStar: false,
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    //   maxLength: 18,
    //   // inputType: 'number',
    //   onBlur: (val: string) => {
    //     if (val) {
    //       const idCard = val.replace(/\s+/g, '');
    //       if (
    //         !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    //           idCard,
    //         ) &&
    //         idCard
    //       ) {
    //         Toast.fail('身份证号码有误');
    //       }
    //     }
    //   },
    // },
    {
      type: 'input',
      required: true,
      fieldProps: 'linePhone',
      hasStar: false,
      placeholder: '请输入手机号码',
      title: '手机号码',
      labelNumber: 6,
      onBlur: (value: string) => {
        if (value) {
          veriryPhone(value);
        }
      },
      coverStyle: {
        textAlign: 'left',
      },
      inputType: 'phone',
    },
    // {
    //   type: 'input',
    //   required: true,
    //   fieldProps: 'graphValidateCode',
    //   hasStar: false,
    //   title: '图形验证码',
    //   labelNumber: 6,
    //   placeholder: '请输入图形验证码',
    //   maxLength: 4,
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    //   extra: <img ref={codeRef} className={styles.regLoginCodeImg} onClick={imgCodeUrlClick} />,
    // },
    {
      type: 'input',
      required: true,
      inputType: 'number',
      maxLength: 6,
      labelNumber: 6,
      fieldProps: 'code',
      placeholder: '请输入短信验证码',
      title: '验证码',
      hasStar: false,
      extra: (
        <span
          onClick={_.debounce(() => sendVeriryCode(true), 500)}
          className={newBtnText === '获取验证码' ? styles.getCode : styles.disableSend}
          param-action={newBtnText === '获取验证码' ? 'getVerfifyCode' : ''}
        >
          {newBtnText}
        </span>
      ),
      coverStyle: {
        textAlign: 'left',
      },
    },
    // {
    //   type: 'addressPicker',
    //   required: true,
    //   fieldProps: 'homeAddr',
    //   title: '收货省市',
    //   placeholder: '请选择收货省市',
    //   height: 600,
    //   hasStar: false,
    //   level: 3,
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    //   data: homeAddrData,
    //   placeholderList: ['请选择省', '请选择市', '请选择区'],
    //   onChangeLevel: (values: (string | number)[]) => {
    //     if (values.length > 0 && values.length < 3) {
    //       const parentId = values[values.length - 1];
    //       dispatch!({
    //         type: 'orderConfirm/queryAreaNextLevel',
    //         payload: {
    //           parentId,
    //         },
    //       });
    //     } else if (values.length === 0) {
    //       dispatch!({
    //         type: 'orderConfirm/queryAreaFatherList',
    //       });
    //     }
    //   },
    // },
    // {
    //   type: 'area',
    //   required: true,
    //   fieldProps: 'detailAddress',
    //   placeholder: '请输入街道/小区/门牌号',
    //   title: '详细地址',
    //   labelNumber: 4,
    //   hasStar: false,
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    // },
    // {
    //   type: 'text',
    //   required: true,
    //   fieldProps: 'selectPhoneNum',
    //   placeholder: '请选择手机靓号',
    //   title: '选择号码',
    //   hidden: !isShowChooseNum,
    //   onClick: () => {
    //     setShowPhoneAlert(true);
    //   },
    //   hasStar: false,
    //   extra: (
    //     <div
    //       className={styles.changeText}
    //       onClick={() => {
    //         setShowPhoneAlert(true);
    //       }}
    //     >
    //       换一个
    //     </div>
    //     // <img
    //     //   src={rigthIcon}
    //     //   alt=""
    //     //   onClick={() => {
    //     //     setShowPhoneAlert(true);
    //     //   }}
    //     // />
    //   ),
    //   coverStyle: {
    //     textAlign: 'left',
    //   },
    // },
  ] as unknown) as IFormItemProps[];
  /**
   *清空当前的定时器
   */
  const clearMyTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      seconds = 60;
    }
    updateNewBtnText('获取验证码');
    updateOldBtnText('获取验证码');
  };

  const myValueChange = (values: any) => {
    let fieldProps = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const key in values) {
      switch (key) {
        case 'linePhone':
          fieldProps = 'linePhone';
          break;
        case 'certName':
          fieldProps = 'certName';
          break;
        default:
          break;
      }
      if (values.hasOwnProperty(fieldProps)) {
        dispatch!({
          type: 'orderConfirm/save',
          payload: {
            tabeValues: {
              ...tabeValues,
              [fieldProps]: values[fieldProps],
            },
          },
        });
      }
    }
  };
  const formProps = {
    failScroll: false,
    onFinish: (values: any) => {
      // if (!values?.graphValidateCode) {
      //   Toast.show('请输入图形验证码！');
      //   return;
      // }
      if (!values.code) {
        Toast.show('请输入验证码！');
        return;
      }

      setBtnFlag(true);

      // if (values.certNum) {
      //   const idCard = values.certNum.replace(/\s+/g, '');
      //   if (
      //     !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
      //       idCard,
      //     ) &&
      //     idCard
      //   ) {
      //     Toast.fail('身份证号码有误');
      //     return;
      //   }
      // }
      // 老用户登陆
      if (initiazePage === 1) {
        dispatch!({
          type: 'orderConfirm/oldUserLogin',
          payload: {
            phone: Base64.encode(values.linePhone.replace(/\s+/g, '')),
            validationCode: values.code,
            uuid: uuidRef.current,
            graphValidateCode: values?.graphValidateCode,
          },
        }).then((res: any) => {
          // clearMyTimer();
          if (!res) {
            return false;
          }
          const { success, errCode, errMessage } = res;

          if (!success) {
            // if (timer) clearInterval(timer);
            // timer = null;
            // seconds = 60;
            // updateOldBtnText(`获取验证码`);
            if (errCode === 'BMS_VERIFICATIONCODEWRONG_LOGIN_005') {
              dispatch!({
                type: 'payConfirm/getH5ConfigurationModel',
                payload: {
                  propertyName: sysParams.slidVerify,
                },
              }).then((flag: boolean) => {
                Toast.fail(errMessage, 1);
                if (flag) {
                  // 开启验证码
                  updateCodeFail(true);
                }
              });
            } else {
              Toast.fail(errMessage, 1);
            }
            return false;
          }
          if (isCustomerService) {
            history.goBack();
            return;
          }
          if (skuList.length === 0) {
            history.goBack();
            return;
          }
          dispatch!({
            type: 'login/save',
            payload: {
              loginFlag: true,
            },
          });
          let urlGoodsList = (skuList || [])?.map((item: any) => {
            return { skuId: item.skuId, quantity: item.quantity };
          });
          localStorage.setItem('leave', '0');
          setTimeout(() => {
            history.replace({
              pathname: '/customer/payConfirm',
              query: {
                type: location.query?.type === 'goosePayConfirm' ? 'goose' : '',
                urlGoodsList: JSON.stringify(urlGoodsList),
              },
            });
          }, 10);
        });
      } else {
        newUserRegister(values);
      }
      dispatch!({
        type: 'orderConfirm/save',
        payload: {
          tabeValues: {
            ...values,
          },
        },
      });
    },
    onFinishFailed: (values: any) => {
      if (values.errorFields) {
        Toast.fail(values.errorFields[0].errors[0]);
      }
    },
    onValuesChange: (values: any) => {
      myValueChange(values);
    },
    formsValues: {
      // ...currentVals,
      selectPhoneNum: (selectPhoneValue && selectPhoneValue?.phoneNum) || '',
    },
    data: initiazePage === 0 ? formsData : oldFormsData,
    form,
    autoLineFeed: false,
  };

  // 这里发起了初始化请求
  useEffect(() => {
    // 清空数据
    dispatch!({
      type: 'payConfirm/save',
      payload: {
        addressInfo: {},
        orderInfo: {},
        nameAndNo: {},
        choosePhoneTypeValue: undefined,
      },
    });

    // imgCodeUrlClick();

    dispatch!({
      type: 'orderConfirm/save',
      payload: {
        loginFlag: true,
      },
    });

    currentRef.current = initiazePage;
    setPageNavBar({
      pagePath: '/customer/orderConfirm',
      navBar: {
        onLeftClick: () => {
          let params = {};
          const vals = form.getFieldValue('linePhone');
          if (currentRef.current === 0) {
            params.tabOneData = {
              linePhone: vals,
            };
          } else {
            params.tabTwoData = {
              linePhone: vals,
            };
          }
          dispatch!({
            type: 'orderConfirm/save',
            payload: {
              ...params,
            },
          });
          history.goBack();
        },
      },
    });
    // 获取区县数据
    if (!homeAddrData) {
      dispatch!({
        type: 'orderConfirm/queryAreaFatherList',
      });
    }
    updateIsShowChooseNum(getIsShowPhone());
    if (initiazePage === 0) {
      form.setFieldsValue({
        ...tabOneData,
      });
    } else {
      form.setFieldsValue({
        ...tabTwoData,
      });
    }

    return () => {
      clearMyTimer();
      seconds = 60;
    };
  }, []);

  const onSubmit = () => {
    if (isCustomerService) {
      form.submit();
      return;
    }
    if (initiazePage === 1) {
      dispatch!({
        type: 'orderConfirm/save',
        payload: {
          tabTwoData: {
            linePhone: form.getFieldValue('linePhone'),
          },
        },
      });
    } else {
      dispatch!({
        type: 'orderConfirm/save',
        payload: {
          tabOneData: {
            linePhone: form.getFieldValue('linePhone'),
          },
        },
      });
    }
    form.submit();
  };

  return (
    <div className={styles.orderConfirm}>
      <MagicTab
        onTabClick={(e) => {
          setBtnFlag(false);
          currentRef.current = e;
          clearMyTimer();
          form.setFieldsValue({
            code: '',
            graphValidateCode: '',
          });
          // imgCodeUrlClick();
          const formVal = form.getFieldsValue();
          if (e === 1) {
            dispatch!({
              type: 'orderConfirm/save',
              payload: {
                tabOneData: {
                  ...formVal,
                  code: '',
                  graphValidateCode: '',
                },
                initiazePage: e,
              },
            });
            form.setFieldsValue({
              ...tabTwoData,
              linePhone: form.getFieldValue('linePhone'),
            });
          } else {
            dispatch!({
              type: 'orderConfirm/save',
              payload: {
                tabTwoData: {
                  ...formVal,
                  code: '',
                },
                initiazePage: e,
              },
            });
            form.setFieldsValue({
              ...tabOneData,
              linePhone: form.getFieldValue('linePhone'),
            });
          }
        }}
        initiazePage={initiazePage}
        data={tabData}
      />
      <div className={initiazePage === 0 ? styles.myForm : ''}>
        <DynamicForm {...formProps} />
      </div>

      <>
        {/* {initiazePage === 0 ? (
          <ServiceTips
            defaultSelect={agreement}
            onChange={(isChecked) => {
              setAgreement(isChecked);
            }}
          />
        ) : (
          ''
        )} */}

        {initiazePage === 0 ? (
          <div className={styles.tipMsg}> 未注册的手机号验证后，自动创建账户</div>
        ) : (
          ''
        )}

        {!showSpliItem && (
          <SingleBtn
            text="登录"
            onClick={onSubmit}
            collect="bizLogin"
            // canClick={initiazePage === 0 ? agreement : true}
            canClick
          />
        )}
      </>
      <CommonSelectAlert
        dispatch={dispatch}
        show={showPhoneAlert}
        isShowNew
        from="bilibi"
        provinceId={provinceId}
        lanId={lanId}
        closeClick={() => {
          setShowPhoneAlert(false);
        }}
        onComfirm={(item) => {
          dispatch!({
            type: 'orderConfirm/phoneNumOccupForBilibili',
            payload: {
              phoneNum: item.phoneNum,
              provinceId,
              lanId,
            },
          }).then(() => {
            dispatch!({
              type: 'orderConfirm/save',
              payload: {
                selectPhoneValue: item,
              },
            });
            setShowPhoneAlert(false);
          });
        }}
      />

      {showSpliItem && (
        <SlipCheck
          slipInfo={slipInfo}
          dispatch={dispatch}
          onRefresh={() => {
            dispatch!({
              type: 'orderConfirm/getSlideVerificationCode',
            });
          }}
          onCheckSuccess={() => {
            updateShowSpliItem(false);
            updateCodeFail(false);
            sendSms(`${initiazePage}` === '0');
          }}
        />
      )}
    </div>
  );
};

export default connect(
  ({
    orderConfirm,
    indexList,
  }: {
    orderConfirm: OrderConfirmModelState;
    indexList: IndexListModelState;
  }) => ({
    orderConfirm,
    indexList,
  }),
)(OrderConfirmPage);
