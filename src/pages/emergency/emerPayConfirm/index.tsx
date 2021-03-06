import React, { FC, useEffect, useState } from 'react';
import { WhiteSpace, Toast } from 'antd-mobile';
import {
  EmerPayConfirmModelState,
  ConnectProps,
  connect,
  router,
  PayConfirmModelState,
} from 'alita';
import DynamicForm, { IFormItemProps, useForm } from '@alitajs/dform';
import Utils from '@/utils/tool';
import { getEmergencyData } from '@/utils';
import ConfirmItem from '@/pages/customer/components/ConfirmItem';
import InvoiceAlert from '@/pages/customer/components/InvoiceAlert';
import MagicFootBtn from '@/pages/customer/components/MagicFootBtn';
import rightIcon from '@/assets/right.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  emerPayConfirm: EmerPayConfirmModelState;
  payConfirm: PayConfirmModelState;
}

const EmerPayConfirmPage: FC<PageProps> = ({ emerPayConfirm, dispatch, location, payConfirm }) => {
  const [form] = useForm();
  const [form2] = useForm();
  const [windowHeight, setWindowHeight] = useState(0);
  const { orderInfo = {}, addressInfo = {}, invoiceContent } = emerPayConfirm;
  const [invoice, updateInvoice] = useState(invoiceContent);
  const [footBtnFlag, updateFootFlag] = useState(false);
  const { storeList = [], payAmount, needOrdAddr = 'T', claimType = [] } = orderInfo;

  const [urlPhone] = useState(location.query?.phone || '');
  const [urlCartOrderId] = useState(location.query?.cartOrderId || '');
  const [idCardData] = useState(JSON.parse(location.query?.idCardInfo) || '');
  const [claimData, setClaimData] = useState<any[]>([]); // 配送方式数据源

  const { claimValue = '' } = payConfirm;

  const {
    name = '',
    phoneNumber = '',
    province = '',
    city = '',
    region = '',
    detailAddress = '',
  } = addressInfo;

  useEffect(() => {
    // 这里需要请求 orderCommit 接口获取列表数据
    // 把skuId 和 quantity 数量加进去
    const emergencyData = getEmergencyData();
    dispatch!({
      type: 'emerPayConfirm/commitCartSecondModels',
      payload: {
        accNum: urlPhone,
        cartOrderId: urlCartOrderId,
        orderBusiType: '',
        orderBusiTypeKind: '',
        orderType: '1800',
        quantity: 1,
        skuId: emergencyData?.skuId,
        sourceType: '',
        serviceOfferId: location.query?.serviceOfferId,
      },
    }).then((data: any) => {
      const { claimType = [] } = data;
      dispatch!({
        type: 'emerPayConfirm/save',
        payload: {
          orderInfo: data,
        },
      });
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          orderInfo: data,
        },
      });

      // 设置配送数据源
      if (claimType && claimType.length) {
        const claimTypeData: React.SetStateAction<any[]> = [];
        claimType.forEach((item: string) => {
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
              claimValue: claimType[0],
            },
          });
        }
      }
    });
    setWindowHeight(document.documentElement.clientHeight - 90);
  }, []);

  /**
   * 跳转到选址页面
   */
  const selectAddr = () => {
    if (claimType && claimType.length > 0) {
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          claimValue: form2.getFieldValue('claimValue'),
        },
      });
    }
    router.push({
      pathname: '/customer/cDeliveryAddr',
      query: {
        isMyPage: '2',
      },
    });
  };

  const getInvoiceInfo = (data: any) => {
    if (data.type !== '2') {
      dispatch!({
        type: 'payConfirm/addMemberInvoice',
        payload: {
          isDefault: 0,
          ...data,
        },
      });
    }
  };

  /**
   * 确认支付
   */
  const onClick = () => {
    if (needOrdAddr === 'T') {
      if (!addressInfo.receiveAddrId) {
        Toast.show('请选择地址！');
        return;
      }
    }
    if (claimType && claimType.length > 1) {
      dispatch!({
        type: 'payConfirm/save',
        payload: {
          claimValue: form2.getFieldValue('claimValue'),
        },
      });
    }
    dispatch!({
      type: 'payConfirm/commitOrderBfCheck',
      payload: {
        certData: {
          certName: idCardData?.certName,
          certNum: idCardData?.certNum,
          certType: '1',
        },
      },
    }).then((data: boolean) => {
      if (!data) return;
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
          const { payUrl, orderId = '' } = res;
          if (payUrl) {
            localStorage.setItem('leave', '1'); // 用来标识是跳转到支付页面
            window.location.href = Utils.getPayUrl(payUrl);
          } else {
            window.location.href = `${window.location.origin}/#/customer/paySuccess?retnCode=0000&retnInfo=0000&orderSeq=${orderId}`;
          }
        }
      });
    });
  };

  const formsData2 = [
    {
      type: 'picker',
      fieldProps: 'claimValue',
      data: claimData,
      title: '配送方式',
    },
  ] as IFormItemProps[];

  const formsData = ([
    {
      type: 'text',
      fieldProps: 'phone',
      placeholder: '暂无',
      title: '业务号码',
      labelNumber: 4,
      coverStyle: {
        textAlign: 'left',
        color: '#A4A4A4',
      },
    },
    {
      type: 'text',
      fieldProps: 'certName',
      placeholder: '暂无',
      title: '姓名',
      labelNumber: 4,
      coverStyle: {
        textAlign: 'left',
        color: '#A4A4A4',
      },
    },
    {
      type: 'text',
      fieldProps: 'certNum',
      placeholder: '暂无',
      title: '身份证',
      labelNumber: 4,
      coverStyle: {
        textAlign: 'left',
        color: '#A4A4A4',
      },
    },
  ] as unknown) as IFormItemProps[];

  return (
    <div className={styles.emerPayConfirmStyle} style={{ height: windowHeight }}>
      <div className={styles.allContent}>
        <DynamicForm
          form={form}
          data={formsData}
          formsValues={{ ...idCardData, phone: urlPhone }}
        />
        <WhiteSpace size="lg" />
        <div className={styles.orderContent}>
          {storeList?.map((item: any) =>
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
        <WhiteSpace size="lg" />
        <div className={styles.addrInfo} onClick={selectAddr} hidden={needOrdAddr !== 'T'}>
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
        <WhiteSpace size="lg" />
        <div className={styles.invoice}>
          <InvoiceAlert
            checkPhoneInput={() => {
              return !!urlPhone;
            }}
            accNumAndFlag={
              {
                accNum: urlPhone,
                isNewAccNum: '0', // 这里都是老号码
              }
            }
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
            invoiceContent={invoice}
            onSubmit={getInvoiceInfo}
            userName={form?.getFieldsValue()?.certName}
            userPhone={urlPhone}
          />
        </div>
        <WhiteSpace size="lg" />
        {claimType && claimType?.length > 0 && (
          <div className={styles.sendTypeStyle}>
            <DynamicForm form={form2} data={formsData2} formsValues={{ claimValue }} />
          </div>
        )}
      </div>
      <div style={{ height: '2rem' }} />

      {footBtnFlag ? (
        ''
      ) : (
          <MagicFootBtn
            btnText="立即提交"
            onClick={onClick}
            showFile={false}
          // fileClick={() => {
          //   setFileFlag(true);
          //   setFilePathUrl(FileHtml);
          //   setFileTitle('服务协议');
          // }}
          // marketingRulesCLick={() => {
          //   setFileFlag(true);
          //   setFilePathUrl(FileHtml1);
          //   setFileTitle('营销规则');
          // }}
          >
            <div className={styles.orderInfoFoot}>
              共{storeList[0]?.goodsList?.length}件 总计 <span>{payAmount}元</span>
            </div>
          </MagicFootBtn>
        )}
    </div>
  );
};

export default connect(
  ({
    emerPayConfirm,
    payConfirm,
  }: {
    emerPayConfirm: EmerPayConfirmModelState;
    payConfirm: PayConfirmModelState;
  }) => ({
    emerPayConfirm,
    payConfirm,
  }),
)(EmerPayConfirmPage);
