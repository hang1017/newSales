import React, { FC, useState, useEffect } from 'react';
import RankItem from '@/components/RankItem';
import { Flex, TextareaItem } from 'antd-mobile';
import styles from './index.less';
import { EvaluateKinds } from '@/utils/AppContext';
import ImagePicker from '@/pages/salesWarranty/components/ImagePicker';

import IconSelect from '@/assets/img/select.png';
import IconUnselect from '@/assets/img/un_select.png';

interface GoodsEvaluateProps {
  detail?: any;
  info?: any;
  onChange?: (e: any) => void;
}

const GoodsEvaluate: FC<GoodsEvaluateProps> = (props) => {
  const { info = {}, onChange = () => {}, detail = {} } = props;
  console.log(info);
  const [anonymous, setAnonymous] = useState(true);

  let targetObj = {
    cmmtRefFileCOList: [],
    goodScore: 1500,
    goodCmmt: '',
    ishide: 1100,
    goodId: info.goodsId,
    odCreatetime: detail.orderTime,
    odDealtime: detail.receiverInfo.receiveTime,
    orderId: detail.orderId,
    skuId: info.skuId, // 缺少
    storeId: detail.storeId,
    workId: detail.workId, // 缺少
  };

  const getSkuAttr = () => {
    if (info.skuAttr) {
      try {
        let resultStr = '';
        (JSON.parse(info.skuAttr) || []).forEach((item) => {
          resultStr += `${item.attrName}:${item.attrValName};`;
        });
        return resultStr;
      } catch (error) {}
    }
  };

  useEffect(() => {
    return () => {};
  }, []);
  const renderProductView = () => (
    <Flex align="start" direction="row">
      <img className={styles.productImg} src={info.skuPicFileUrl} />
      <Flex.Item>
        <div className={styles.productInfo}>
          <div className={styles.productTitle}>{info.skuName}</div>
          <div className={styles.productProps}>{getSkuAttr()} </div>
        </div>
      </Flex.Item>
    </Flex>
  );
  return (
    <div className={styles.goodsEvaluate}>
      {renderProductView()}
      <div style={{ marginTop: '0.32rem', padding: '0 0.32rem' }}>
        <RankItem
          label="描述相符"
          onClick={(rank: number, evaluteType: string) => {
            console.log(rank);
            targetObj = {
              ...targetObj,
              goodScore: (rank + 11) * 100,
            };
            onChange({
              ...targetObj,
            });
          }}
          evaluteType={EvaluateKinds.service}
        />
      </div>
      <div className={styles.evaluateContent}>
        <TextareaItem
          rows={5}
          placeholder="感觉怎么样？跟大家分享一下吧～"
          onChange={(e) => {
            targetObj = {
              ...targetObj,
              goodCmmt: e || '',
            };
            onChange(targetObj);
          }}
        />
      </div>
      <ImagePicker
        goodId="13"
        paddingVer="0"
        onChange={(files = [], fileIds = []) => {
          console.log(fileIds);
          targetObj = {
            ...targetObj,
            cmmtRefFileCOList: fileIds.map((item) => {
              return {
                fileId: item,
              };
            }),
          };
          onChange(targetObj);
        }}
      />
      <Flex
        align="center"
        direction="row"
        className={styles.anonymous}
        onClick={() => {
          targetObj = {
            ...targetObj,
            ishide: anonymous ? 1000 : 1100,
          };
          onChange({
            ...targetObj,
          });
          setAnonymous(!anonymous);
        }}
      >
        <div className={styles.leftItem}>
          <img src={anonymous ? IconUnselect : IconSelect} alt="" />
          匿名评价
        </div>
        <Flex.Item>
          <div className={styles.disc} style={{ textAlign: 'right' }}>
            公开的评价会展示在个人主页呦
          </div>
        </Flex.Item>
      </Flex>
    </div>
  );
};

export default GoodsEvaluate;
