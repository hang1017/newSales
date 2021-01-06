import React, { FC, useEffect, useState } from 'react';
import { RefundModelState, ConnectProps, connect, history } from 'alita';
import ImagePicker from '../components/ImagePicker';
import { InputItem, Toast } from 'antd-mobile';
import styles from './index.less';
import SalesWarrantyHeader from '@/components/SalesWarrantyHeader';
import SelectItem from '../components/SelectItem';
import VerInpuItem from '../components/VerInpuItem';
import IconSelect from '@/assets/img/select.png';

import Utils from '@/utils/tool';
import InpuItem from '../components/InpuItem';
interface PageProps extends ConnectProps {
  refund: RefundModelState;
}

const RefundPage: FC<PageProps> = ({ refund, dispatch, location }) => {
  const [goodsInfo] = useState(JSON.parse(location.query.goodsInfo));
  const [orderInfo] = useState(JSON.parse(location.query.orderInfo));
  const { memberId = '' } = Utils.getStorageForJson('userInfo') || {};

  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [amountValue, setAmountValue] = useState(goodsInfo.skuPrice);
  const [logistics, setLogistics] = useState('');
  const [params, setParams] = useState({
    applyStatusText: '物流',
  });

  // 这里发起了初始化请求
  useEffect(() => {
    if (goodsInfo && goodsInfo.applyId) {
      setLogistics(orderInfo.expressNo || '');
      setInputValue(orderInfo.description || '');
      setAmountValue(orderInfo.returnAmount || '0');
      setParams({
        applyStatusText: '物流',
        reason: orderInfo.reason,
      });
      // 说明是修改
      // dispatch!({
      //   type: 'applyDetail/quryApplyDetail',
      //   payload: { applyId: goodsInfo.applyId, memberId },
      // });
    }
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明

  const imageOnChange = (files) => {
    setFiles(files);
  };

  // returnsSRefunds
  const formSubmit = () => {
    if (!params.applyStatusText || params.applyStatusText.length === 0) {
      Toast.fail('请选择退款方式');
      return;
    }
    if (!params.reason || params.reason.length === 0) {
      Toast.fail('请选择退款原因');
      return;
    }

    // if (amountValue > goodsInfo.skuPrice) {
    //   Toast.fail(`退款金额不可大于${goodsInfo.skuPrice}`);
    //   return;
    // }

    if (files.length === 0) {
      Toast.fail('请上传图片凭证');
      return;
    }

    if (goodsInfo && goodsInfo.applyId) {
      dispatch!({
        type: 'warrantyList/editApplyInfo',
        payload: {
          applyId: goodsInfo.applyId,
          applyType: '1100',
          expressNo: logistics,
          memberId,
          proofPicFileIds: files.join(','),
          reason: params.reason,
          orderItemsList: [goodsInfo.orderItemsId],
          returnAmount: amountValue,
          remark: inputValue,
          description: inputValue,
          callback: () => {
            Toast.success('修改成功');
            setTimeout(() => {
              history.goBack();
            }, 1000);
          },
        },
      });
    } else {
      dispatch!({
        type: 'refund/addReturnApply',
        payload: {
          // 申请单类型 1000退款 1100 退款退货 1200换货 1300 返修
          applyType: '1100',
          memberId,
          orderId: orderInfo.orderId || orderInfo.orderNbr,
          proofPicFileIds: files.join(','),
          reason: params.reason,
          remark: inputValue,
          description: inputValue,
          returnAmount: amountValue,
          returnName: Utils.getStorageForJson('userInfo').username,
          returnPhone: Utils.getStorageForJson('userInfo').phone,
          statusCd: params.applyStatusText,
          storeName: orderInfo.storeName,
          expressNo: logistics,
          orderItemsList: [goodsInfo.orderItemsId],
          orderReturnItemCOList: [
            {
              goodsId: goodsInfo.goodsId,
              goodsName: goodsInfo.goodsName,
              memberId,
              orderId: orderInfo.orderNbr,
              orderItemsId: goodsInfo.orderItemsId,
              // receiveNum: 0,
              // returnItemId: 0,
              // skuId: 0,
              skuName: goodsInfo.skuName,
              // spuId: 0,
              // spuName: '',
              // statusCd: '',
            },
          ],
          callback: (item) => {
            history.replace({
              pathname: '/salesWarranty/result',
              payload: item,
            });
          },
        },
      });
    }
  };
  return (
    <>
      <div className={styles.center}>
        <div className={styles.main}>
          <SalesWarrantyHeader item={goodsInfo} />
          <div className={styles.warrantyType}>
            <SelectItem
              title="退货方式"
              placeholder="请选择"
              value={params.applyStatusText}
              initValue={params.applyStatus}
              data={[
                {
                  title: '物流',
                  id: '01',
                },
                // {
                //   title: '已收到货',
                //   id: '02',
                // },
              ]}
              onChange={(item) => {
                setParams({
                  ...params,
                  applyStatus: item.id,
                  applyStatusText: item.title,
                });
              }}
            />
            <InpuItem
              title="物流单号"
              placeholder="请输入物流单号"
              value={logistics}
              onChange={(text) => {
                setLogistics(text);
              }}
            />
            <SelectItem
              title="退款原因"
              placeholder="请选择"
              value={params.reason}
              initValue={params.reasonid}
              data={[
                {
                  title: '7天无理由退换货',
                  id: '01',
                },
                {
                  title: '大小/尺寸与商品描述不符',
                  id: '02',
                },
                {
                  title: '颜色/图案/款式与商品描述不符',
                  id: '03',
                },
                {
                  title: '材质与商品描述不符',
                  id: '04',
                },
                {
                  title: '生产日期/保质期与商品描述不符',
                  id: '05',
                },
                {
                  title: '做工粗糙/有瑕疵',
                  id: '06',
                },
                {
                  title: '质量问题',
                  id: '07',
                },
              ]}
              onChange={(item) => {
                setParams({
                  ...params,
                  reasonid: item.id,
                  reason: item.title,
                });
              }}
            />
          </div>
          <div className={styles.warrantyType}>
            <div className={styles.amount}>
              <div className={styles.amountTitle}>
                退款金额：<span>￥</span>
                <input
                  value={amountValue}
                  type="number"
                  disabled
                  onChange={(e) => {
                    setAmountValue(e.target.value);
                  }}
                />
              </div>
              <div className={styles.amountTips}>
                可修改，最多￥{goodsInfo.skuPrice}，含发货邮费￥0.00
              </div>
            </div>
            <VerInpuItem
              title="退款说明："
              placeholder="选填"
              onChange={(e) => {
                setInputValue(e);
              }}
            />
          </div>
          <div className={styles.warrantyType}>
            <ImagePicker
              onChange={imageOnChange}
              title="上传凭证"
              goodId={goodsInfo.goodsId}
              type="oms"
            ></ImagePicker>
          </div>
          {/* <div className={styles.authTips}>
            <img src={IconSelect} alt="" />
            授权商家填写运单号
          </div> */}
        </div>
        <div className={styles.commitFooter}>
          <div className={styles.footerBtn} onClick={formSubmit}>
            提交
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(({ refund }: { refund: RefundModelState }) => ({ refund }))(RefundPage);
