import React, { FC } from 'react';
import { Modal, Toast } from 'antd-mobile';
import { history, connect } from 'alita';
import { CartFooter, TabListData } from '..';
import styles from './index.less';

interface CartModalProps {
  visible: boolean;
  close: () => void;
  footerClick?: () => void;
  data: any;
  reduceClick: (res: any, id: string) => void;
  addClick: (res: any, id: string) => void;
  click?: (res: any) => void;
  skuList: any[];
  toOrderClick?: (e: any) => void;
}

const CartModal: FC<CartModalProps> = (props) => {
  const {
    visible = false,
    close,
    footerClick = () => {},
    data,
    reduceClick,
    addClick,
    click = () => {},
    skuList,
    toOrderClick,
  } = props;

  const selectData = {
    categoryId: '000',
    categoryName: '已选产品',
    values: skuList || [],
  };

  const giftData = {
    categoryId: '111',
    categoryName: '已获赠品',
    values: data?.giftList || [],
  };

  const rightData = {
    categoryId: '222',
    categoryName: '权益赠品',
    values: data?.rightsList || [],
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide-up"
      popup
      className={styles.cartModalStyle}
      onClose={close}
    >
      <div className={styles.cartTab}>
        <TabListData
          data={selectData}
          reduceClick={(data: any) => reduceClick(data, data.categoryId)}
          addClick={(data: any) => addClick(data, data.categoryId)}
          click={click}
          type="sku"
        />
        {data?.giftList && data.giftList.length > 0 && (
          <TabListData
            data={giftData}
            reduceClick={() => {}}
            addClick={() => {}}
            click={() => {}}
            type="gift"
          />
        )}
        {/* {data?.rightsList && data.rightsList.length > 0 && (
          <TabListData
            data={rightData}
            reduceClick={() => {}}
            addClick={() => {}}
            click={() => {}}
            type="gift"
          />
        )} */}
      </div>
      <CartFooter
        data={skuList}
        allData={data}
        cartClick={footerClick}
        toOrderClick={toOrderClick}
      />
    </Modal>
  );
};

export default connect()(CartModal);
