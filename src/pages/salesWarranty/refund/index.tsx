import React, { FC, useEffect, useState } from 'react';
import { RefundModelState, ConnectProps, connect, history, utils } from 'alita';
import ImagePicker from '../components/ImagePicker';
import styles from './index.less';
import SalesWarrantyHeader from '@/components/SalesWarrantyHeader';
import SelectItem from '../components/SelectItem';
import VerInpuItem from '../components/VerInpuItem';
import Utils from '@/utils/tool';
import { Toast } from 'antd-mobile';

interface PageProps extends ConnectProps {
  refund: RefundModelState;
}

const RefundPage: FC<PageProps> = ({ refund, dispatch, location }) => {
  const [goodsInfo] = useState(JSON.parse(location.query.goodsInfo));
  const [orderInfo] = useState(JSON.parse(location.query.orderInfo));
  const { memberId = '' } = Utils.getStorageForJson('userInfo') || {};

  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [params, setParams] = useState({});

  // 这里发起了初始化请求
  useEffect(() => {
    if (goodsInfo && goodsInfo.applyId) {
      setParams({});
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

  const imageOnChange = (files, type, index) => {
    setFiles(files);
  };

  //
  const formSubmit = () => {
    if (!params.applyStatusText || params.applyStatusText.length === 0) {
      Toast.fail('请选择货物状态');
      return;
    }
    if (!params.reason || params.reason.length === 0) {
      Toast.fail('请选择退款原因');
      return;
    }

    if (files.length === 0) {
      Toast.fail('请上传图片凭证');
      return;
    }

    const payload = {
      applyType: '1000',
      memberId,
      orderItemsList: [goodsInfo.orderItemsId],
      proofPicFileIds: files.join(','),
      reason: params.reason,
      description: inputValue,
      callback: (item) => {
        history.replace({
          pathname: '/salesWarranty/result',
          payload: item,
        });
      },
    };
    if (goodsInfo && goodsInfo.applyId) {
      dispatch!({
        type: 'warrantyList/editApplyInfo',
        payload: {
          applyId: goodsInfo.applyId,
          applyType: '1000',
          memberId,
          proofPicFileIds: files.join(','),
          reason: params.reason,
          orderItemsList: [goodsInfo.orderItemsId],
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
        type: 'refund/addRefundApply',
        payload: payload,
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
              title="货物状态"
              placeholder="请选择"
              value={params.applyStatusText}
              initValue={params.applyStatus}
              data={[
                {
                  title: '未收到货',
                  id: '01',
                },
                {
                  title: '已收到货',
                  id: '02',
                },
              ]}
              onChange={(item) => {
                setParams({
                  ...params,
                  applyStatus: item.id,
                  applyStatusText: item.title,
                });
              }}
            />
            <SelectItem
              title="退款原因"
              placeholder="请选择"
              value={params.reason}
              initValue={params.reasonid}
              data={[
                {
                  title: '不喜欢/不想要',
                  id: '01',
                },
                {
                  title: '空包裹',
                  id: '02',
                },
                {
                  title: '未按约定时间发货',
                  id: '03',
                },
                {
                  title: '快递/物流一直未送达',
                  id: '04',
                },
                {
                  title: '快递/物流无跟踪记录',
                  id: '05',
                },
                {
                  title: '货物破损已拒签',
                  id: '06',
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
              <div className={styles.amountTitle}>退款金额：￥{goodsInfo.skuPrice}</div>
              <div className={styles.amountTips}>
                不可修改，最多￥{goodsInfo.skuPrice}，含发货邮费￥0.00
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
