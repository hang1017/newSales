import React from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile';
import { connect } from 'alita';
import smallLogoIcon from '@/assets/img/samll_log.png';
import invoiceIcon from '@/assets/img/invoice.png';

interface InvoiceItemPorps {
  data?: any; // 按钮的字体
  onItemClick?: () => void;
  dispatch?: any;
  shouldRefresh?: () => void;
  onClickEvaluate?: () => void;
  status?: 'noOpen' | 'opened' | 'noAnyClick'; // noOpen:未开票，opened: 已开票
  footBtnClick?: (data: any, type: 'noOpen' | 'opened') => void; // 底部按钮点击事件
}

const InvoiceItem: React.FC<InvoiceItemPorps> = (props) => {
  const { data = {}, status = 'noOpen', footBtnClick } = props;
  const { storeList = [] } = data;
  const btnClick = () => {
    if (footBtnClick) footBtnClick(data, status);
  };

  return (
    <div className={styles.InvoiceCard}>
      <div className={styles.icTitle}>
        <img src={smallLogoIcon} className={styles.icTitleIcon} />
        <div className={styles.icTitleText}>{data?.storeName || '无数据'}</div>
      </div>
      <div className={styles.prodInfoBlock}>
        {storeList && storeList.length === 1 && (
          <div className={styles.prodSingleLeft}>
            <img src={storeList[0].skuPicFileUrl} alt="" className={styles.prodSingleImg} />
            <div className={styles.prodSingleText}>
              <div className={styles.prodSingleTitle}>{storeList[0].skuName}</div>
              <div className={styles.prodSingleDate}>{data?.statusDate}</div>
            </div>
          </div>
        )}
        {storeList && storeList.length > 1 && (
          <div className={styles.prodLeft}>
            {storeList.map((item: any) => (
              <React.Fragment key={item.goodsId}>
                <img
                  src={item?.skuPicFileUrl}
                  alt=""
                  className={styles.prodItemImg}
                  // onLoad={(e) => console.log(e)}
                />
              </React.Fragment>
            ))}
          </div>
        )}
        <div className={styles.prodRight}>
          <div>￥{data?.totalAmount}</div>
          <div className={styles.prodTotalNum}>共{storeList?.length || '--'}件</div>
        </div>
      </div>
      <div className={styles.buttonDiv} hidden={status === 'noAnyClick' ? true : false}>
        <span className={styles.button} onClick={btnClick}>
          {status === 'noOpen' ? '去开票' : '查看发票'}
        </span>
      </div>
      {status === 'opened' && <img src={invoiceIcon} alt="" className={styles.statusImg} />}
    </div>
  );
};
export default connect(({ myInvoice }: { myInvoice: MyInvoiceModelState }) => ({ myInvoice }))(
  InvoiceItem,
);
