import React, { FC } from 'react';
import styles from './index.less';
import IconCustomerService from '@/assets/img/customerService.png';
import { WhiteSpace } from 'antd-mobile';
import { OrderType } from '@/utils/AppContext';

interface ShopInfoViewProps {
  orderInfo?: any;
  orderId: string;
}

const ShopInfoView: FC<ShopInfoViewProps> = (props) => {
  const { orderInfo = {}, orderType = OrderType.product } = props;
  const { orderNbr = '', storeName = '', payTypeName = '', storeList = [] } = orderInfo;
  return (
    <>
      <WhiteSpace size="md" />
      <div className={styles.shopInfoView}>
        {/* {storeList.map((item) => {
          return <div></div>;
        })} */}
        <div className={styles.shopInfo}>
          <div className={styles.shop}>
            <img className={styles.shopImg} />
            <div className={styles.info}>
              <div className={styles.title}>
                闪迪（SanDisk) 240GB SSD固态硬闪迪（SanDisk) 240GB SSD固态硬
              </div>
              <div className={styles.props}>数量：1颜色：「240GB」电脑升级优选配件</div>
              <div className={styles.price}>￥259.00</div>
            </div>
          </div>
          <div className={styles.shopFooter}>
            <div className={styles.footerTitle}>退款总金额</div>
            <div className={styles.footerValue}> ￥259.00</div>
          </div>
        </div>
        <div className={styles.notescontact}>
          <img src={IconCustomerService} alt="" />
          <span>联系客服</span>
        </div>
      </div>
    </>
  );
};

export default ShopInfoView;
