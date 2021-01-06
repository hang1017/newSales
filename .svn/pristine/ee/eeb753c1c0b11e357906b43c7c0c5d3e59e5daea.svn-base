import React, { FC } from 'react';
import styles from './index.less';
import IconPhone from '@/assets/img/phone.png';
interface SalesWarrantyHeaderProps {
  item?: any;
}

const SalesWarrantyHeader: FC<SalesWarrantyHeaderProps> = (props) => {
  const { item } = props;

  const getSKUAttrText = () => {
    console.log(item.skuAttr);

    if (item.skuAttr && item.skuAttr.length > 0) {
      let skuAttr: any[] = JSON.parse(item.skuAttr);
      return skuAttr.map((it) => {
        return (
          <span>
            {it.attrName}: {it.attrValName}
          </span>
        );
      });
    }
    return '';
  };

  return (
    <div className={styles.header}>
      <div className={styles.goodsImage}>
        <img src={item.skuPicFileUrl} alt="" />
      </div>
      <div className={styles.goodsInfo}>
        <div className={styles.goodsName}>{item.goodsName}</div>
        <div className={styles.goodsProps}>{getSKUAttrText()}</div>
        <div className={styles.goodsPrice}>￥{item.skuPrice}</div>
      </div>
    </div>
  );
};

export default SalesWarrantyHeader;
