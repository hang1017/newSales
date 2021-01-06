/* eslint-disable no-shadow */
import React, { FC, useEffect, useState } from 'react';
import { FillApplyModelState, ConnectProps, connect } from 'alita';
import DynamicForm, { useForm, ValidateErrorEntity } from '@alitajs/dform';
import SingleBtn from '@/pages/customer/components/SingleBtn';
import idObverse from '@/assets/img/customer/afterSale/id_obverse.png';
import iccid from '@/assets/img/customer/afterSale/iccid.png';
import idFront from '@/assets/img/customer/afterSale/id_front.png';
import bankCard from '@/assets/img/customer/afterSale/bank_card.png';

import { Toast, Modal } from 'antd-mobile';
import RefundProduct from '../components/RefundProduct';
import styles from './index.less';

interface PageProps extends ConnectProps {
  fillApply: FillApplyModelState;
}

const FillApplyPage: FC<PageProps> = ({ fillApply, dispatch, location }) => {
  const { type, update = '', data } = location.query || {};
  console.log(data);
  const orderInfo = JSON.parse(data);
  const { reason = '', description = '', applyId, refuseType, returnMethod, applyType } = orderInfo;
  let myFileList = [];
  if (orderInfo.proofPicFileUrl) {
    if (orderInfo.proofPicFileUrl.indexOf(',') > -1) {
      myFileList = orderInfo.proofPicFileUrl.split(',');
    }
    else {
      myFileList.push(orderInfo.proofPicFileUrl)
    }

  }
  const [addrFormData, updateAddrFormData] = useState([]);

  const [proofPicFileUrl, updateProofPicFileUrl] = useState({
    idBefore: myFileList.length ? myFileList[0] : '',
    idAfter: myFileList.length > 1 ? myFileList[1] : '',
    iccid: myFileList.length > 2 ? myFileList[2] : '',
    bankCard: myFileList.length > 3 ? myFileList[3] : '',
  });
  // const { reasonList } = fillApply;
  // 这里发起了初始化请求
  useEffect(() => {
    dispatch!({
      type: 'fillApply/save',
      payload: {
        formValues: {
          status: type === '2' ? '已发货' : '未发货',
          totalAmount: orderInfo.totalAmount,
          reason,
          returnMethod,
          description
        }
      }
    })

    dispatch!({
      type: 'fillApply/getAttrCacheByAttrNbr',
      payload: {
        attrNbr: 'ORD-0040'
      }
    }).then((reasonList: any[]) => {


      const normalData = [{
        type: 'input',
        fieldProps: 'status',
        placeholder: '',
        title: '货物状态',
        editable: false,
      },
      {
        type: 'picker',
        fieldProps: 'reason',
        title: '退款原因',
        inputType: 'text',
        rules: [
          { required: true, message: `请选择退款原因` },
        ],
        hasStar: true,
        required: true,
        data: reasonList,

      },

      {
        type: 'input',
        fieldProps: 'totalAmount',
        placeholder: '',
        title: '货物金额',
        extra: '元',
        disabled: update !== '2',// 空-新增 1--未发货的修改  2-可修改金额的退货
        inputType: 'money'
        // rules: [
        //   {
        //     pattern: new RegExp(/^d*(?:.d{0,2})?$/, 'g'),
        //     message: '请输入数字',
        //   },
        // ],
      },]
      // normalFormData = ;
      const addrData = type === '2' ? [
        ...normalData,
        {
          type: 'picker',
          fieldProps: 'returnMethod',
          title: '退货方式',
          inputType: 'text',
          disabled: update === '2',// 空-新增 1--未发货的修改  2-可修改金额的退货
          rules: [
            { required: true, message: `请选择退货方式` },
          ],
          required: true,
          data: [
            {
              label: '自行寄回',
              value: '1',
            },
            {
              label: '拒收',
              value: '2',
            },
          ],

        },
        {
          type: 'area',
          fieldProps: 'description',
          placeholder: '请输入',
          labelNumber: 8,
          title: '问题描述',
          count: 200,
          positionType: 'vertical',
          // rules: [
          //   {
          //     pattern: new RegExp(/^[0-9a-zA-Z_\u4e00-\u9fa5]{1,}$/, 'g'),
          //     message: '问题描述只允许包含数字、字母和下划线',
          //   },
          // ],
        },
      ] : [
          ...normalData,
          {
            type: 'area',
            fieldProps: 'description',
            placeholder: '请输入',
            labelNumber: 8,
            title: '问题描述',
            count: 200,
            positionType: 'vertical',
            // rules: [
            //   {
            //     pattern: new RegExp(/^[0-9a-zA-Z_\u4e00-\u9fa5]{1,}$/, 'g'),
            //     message: '问题描述只允许包含数字、字母和下划线',
            //   },
            // ],
          },
        ];


      updateAddrFormData(addrData);
    })
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { formValues } = fillApply;
  const [form] = useForm();

  const getFileStr = () => {
    const fileList: any[] = [];
    Object.keys(proofPicFileUrl).forEach((key) => {
      const imgUrl = proofPicFileUrl[key];
      if (imgUrl) {
        fileList.push(imgUrl)
      }
    });
    const imgStr = fileList.length ? fileList.join(',') : '';
    return imgStr;
  }

  const submit = (formValue: any) => {
    // 对值进行必填的校验

    console.log(JSON.stringify(formValue));
    // eslint-disable-next-line no-shadow
    const { reason, description, returnMethod = '', totalAmount } = formValue;
    const orderItemsList = orderInfo.storeList.map(item => item.orderItemsId)


    Modal.alert('提示', update ? '确定修改该申请吗?' : '确定提交该申请吗?',
      [{ text: '取消', onPress: () => { } },
      {
        text: '确定', onPress: () => {
          if (update) { // 修改
            const params = {
              reason,
              description,
              applyType,
              // orderItemsList,
              applyId,
              refuseType,
              returnAmount: totalAmount,
              proofPicFileUrl: getFileStr()

            }

            dispatch!({
              type: 'fillApply/custConfirm',
              payload: {
                ...params
              }
            });
          }

          if (!update && type === '1') { // 未发货，退款
            const paramRequest = {
              reason,
              description,
              applyType: '1000',
              orderItemsList,
            }

            dispatch!({
              type: 'fillApply/addOrderApply',
              payload: {
                ...paramRequest
              }
            })

          }
          if (!update && type === '2') { // 已发货，退款、退货

            const paramRequest = {
              reason,
              description,
              applyType: '1100',
              orderItemsList,
              returnMethod,
              proofPicFileUrl: getFileStr(),
            }

            dispatch!({
              type: 'fillApply/addOrderApply',
              payload: {
                ...paramRequest
              }
            })

          }
        }
      }])

  }
  const formProps = {
    onFinish: (formValue: any) => {
      submit(formValue);

    },
    onFinishFailed: ({ errorFields = [] }: ValidateErrorEntity) => {
      Toast.fail(errorFields[0]?.errors[0], 1);

    },

    data: addrFormData,
    formsValues: {
      ...formValues
      // status: type === '2' ? '已发货' : '未发货',
      // totalAmount: orderInfo.totalAmount,
      // reason,
      // returnMethod,
      // description
    },
    form,
    onValuesChange: (values) => { // 这里是因为上传图片之后，表单的值会被还原
      const { reason, description, returnMethod, totalAmount } = values;
      if (returnMethod) {
        dispatch!({
          type: 'fillApply/save',
          payload: {
            formValues: {
              ...formValues,
              returnMethod
            }
          }
        });
      }
      if (reason) {
        dispatch!({
          type: 'fillApply/save',
          payload: {
            formValues: {
              ...formValues,
              reason
            }
          }
        });
      }
      if (totalAmount) {
        dispatch!({
          type: 'fillApply/save',
          payload: {
            formValues: {
              ...formValues,
              totalAmount
            }
          }
        });
      }
      if (description !== undefined) {
        dispatch!({
          type: 'fillApply/save',
          payload: {
            formValues: {
              ...formValues,
              description
            }
          }
        });
      }

    }
  };


  /**
   * 上传图片
   */
  const fileChange = (e: any, type) => {

    const { files = {} } = e.target;
    if (Object.keys(files).length === 0) return false;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function (e) {
      // updateImgUrl(e?.target?.result);
      dispatch!({
        type: 'fillApply/omsUploadImg',
        payload: {
          file: files[0],
        }
      }).then((res) => {
        if (res && res.url) {
          switch (type) {
            case '1':
              updateProofPicFileUrl({
                ...proofPicFileUrl,
                idBefore: res.url
              });
              break;
            case '2':
              updateProofPicFileUrl({
                ...proofPicFileUrl,
                idAfter: res.url
              });
              break;
            case '3':
              updateProofPicFileUrl({
                ...proofPicFileUrl,
                iccid: res.url
              });
              break;
            case '4':
              updateProofPicFileUrl({
                ...proofPicFileUrl,
                bankCard: res.url
              });
              break;
            default:
              break;
          }
        }

      })

    };
  };
  return <div className={styles.fillApply}>
    <div className={styles.content}>
      <div className={styles.productInfo}>
        <div className={styles.pageTitle}>退款商品</div>
        <div className={styles.refundBlock}>
          <RefundProduct
            data={orderInfo}
            footerElement={<></>}
          />

        </div>
      </div>

      <div className={styles.pageTitle} >退款信息</div>

      <DynamicForm {...formProps} />




      {
        type === '2' && formValues.returnMethod === '1' ?
          <>
            <div className={styles.pageTitle} style={{ marginTop: '20px' }}>上传照片</div>
            <div className={styles.refundImgBlock}>
              <div>请上传以下材料</div>
              <div>1、UIM卡ICCID面</div>
              <div>2、身份证正面，身份证反面</div>
              <div>3、银行卡卡号面</div>

              <div className={styles.uploadCell}>
                <div className={styles.uploadItem}>
                  <img src={proofPicFileUrl.idBefore || idFront} alt='' />
                  <input
                    className={styles.imgInput}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => { fileChange(e, '1') }}
                  />
                </div>
                <div className={styles.uploadItem}>
                  <img src={proofPicFileUrl.idAfter || idObverse} alt='' />
                  <input
                    className={styles.imgInput}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => { fileChange(e, '2') }}
                  />
                </div>

              </div>
              <div className={styles.uploadCell}>
                <div className={styles.uploadItem}>
                  <img src={proofPicFileUrl.iccid || iccid} alt='' />
                  <input
                    className={styles.imgInput}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => { fileChange(e, '3') }}
                  />
                </div>
                <div className={styles.uploadItem}>
                  <img src={proofPicFileUrl.bankCard || bankCard} alt='' />
                  <input
                    className={styles.imgInput}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => { fileChange(e, '4') }}
                  />
                </div>

              </div>


            </div></> : ''
      }
    </div>


    <div className={styles.footBtn}>
      <SingleBtn
        text='确定'
        canClick
        onClick={() => { form.submit() }}
      />

    </div>

  </div>;
};

export default connect(({ fillApply }: { fillApply: FillApplyModelState; }) => ({ fillApply }))(FillApplyPage);
