import React, { FC, useEffect } from 'react';
import { ApplyAfterSaleModelState, ConnectProps, connect, history } from 'alita';
import { Modal } from 'antd-mobile';
import refundOnly from '@/assets/img/customer/afterSale/refund_only.png';
import refunds from '@/assets/img/customer/afterSale/refunds.png';
import rightIcon from '@/assets/img/rigth_more.png';
import Utils from '@/utils/tool'
import RefundProduct from '../components/RefundProduct';
import styles from './index.less';

interface PageProps extends ConnectProps {
  applyAfterSale: ApplyAfterSaleModelState;
}

const ApplyAfterSalePage: FC<PageProps> = ({ applyAfterSale, dispatch, location }) => {
  const { data } = location.query || {};

  const orderInfo = JSON.parse(data);
  // 这里发起了初始化请求
  useEffect(() => {

    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = applyAfterSale;

  const myOnClick = (type: string) => {
    if (type === '1') {
      const { createDate, isActivate = '' } = orderInfo;
      const tempDate = createDate.substring(0, 10);
      const daysDiffer = Utils.dateDiffer(tempDate);
      if (`${isActivate}` === '0' && Number(daysDiffer) > 30) {
        Modal.alert('温馨提示', '购卡超过30天未激活，请寄回进行退款申请', [{
          text: '确定', onPress: () => {
            // return false;
          }
        }]);

        return false;
      }
      // console.log(`${daysDiffer}天数`);

    }

    history.push({
      pathname: '/afterSale/fillApply',
      query: {
        type,
        data
      }
    })
  }
  return <div className={styles.applyPage} style={{ height: document.documentElement.clientHeight - 120 }}>
    <RefundProduct
      data={orderInfo}
      footerElement={<></>}
    />

    <div className={styles.serviceType}>
      <div className={styles.pageTitle}>选择服务类型</div>
      <div className={styles.serviceCell} onClick={() => { myOnClick('1') }}>

        <div className={styles.leftDiv}>
          <img src={refundOnly} alt='' className={styles.letftIcon} />
          <div>
            <div className={styles.typeText}>仅退款(无需退货)</div>
            <div className={styles.subText}>商家未发货</div>

          </div>


        </div>
        <div><img src={rightIcon} alt='' /></div>
      </div>



      <div className={styles.serviceCell} onClick={() => { myOnClick('2') }}>
        <div className={styles.leftDiv}>
          <img src={refunds} alt='' className={styles.letftIcon} />
          <div>
            <div className={styles.typeText}>退货退款</div>
            <div className={styles.subText}>拒收或者需要退还货物</div>
          </div>

        </div>
        <div><img src={rightIcon} alt='' /></div>
      </div>




    </div>
  </div>;
};

export default connect(({ applyAfterSale }: { applyAfterSale: ApplyAfterSaleModelState; }) => ({ applyAfterSale }))(ApplyAfterSalePage);
