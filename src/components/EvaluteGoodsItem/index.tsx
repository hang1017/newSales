import React, { useState } from 'react';
import { TextareaItem, ImagePicker } from 'antd-mobile';

import RankItem from '@/components/RankItem';
import phoneIcon from '@/assets/img/order/phone_order.png';
import { uploadToPublic } from '@/services/evaluationApi';
import styles from './index.less';
import {
  StarScore,
  EvaluateState,
  EvaluateType,
  FileType,
  EvaluateKinds,
} from '@/utils/AppContext';

interface EvaluteGoodsItem {
  orderInfo?: any;
  goodsInfo?: any; // 商品信息
  onChangeData?: (value: any) => void;
}

const Page: React.FC<EvaluteGoodsItem> = (props) => {
  const { goodsInfo = {}, onChangeData, orderInfo = {} } = props;
  const { orderId = '', memberId = '' } = orderInfo;
  const { goodId = '', goodName } = goodsInfo;
  // 商品评价
  let cmmtSkuCoItem = {
    goodId: goodId,
    locate: 1, // 前端暂时默认传1
    memberId: memberId,
    orderId: orderId,
    state: EvaluateState.draft,
    type: EvaluateType.buyerEvaluate,
    goodCmmt: '',
    cmmtRefFileCOList: [],
    goodScore: StarScore.five,
  };
  // 物流评价
  let cmmtLogisticsCOItem = {
    goodId: goodId,
    locate: 1, // 前端暂时默认传1
    memberId: memberId,
    notes: '',
    orderId: orderId,
    state: EvaluateState.draft,
    totalScore: StarScore.five,
    type: EvaluateType.buyerAddEvaluate,
  };
  // 店铺服务评价
  let cmmtServCOItem = {
    goodId: goodId,
    locate: 1, // 前端暂时默认传1
    memberId: memberId,
    orderId: orderId,
    servCmmt: '',
    servScore: StarScore.five,
    state: EvaluateState.draft,
    type: EvaluateType.buyerAddEvaluate,
  };

  let cmmtRefFileCOList: any[] = []; // 用于保存上传成功后的数据
  let uploadIndex = 0; // 用于保存上传成功后的数组索引
  let uploadTotal = 0; // 需要上传的总数

  const [files, updateFiles] = useState([]);
  const uploadImg = async (fileData: any, locate: number) => {
    const { file = {} } = fileData;
    const params = {
      file,
      goodId: goodsInfo.goodsId,
    };
    return new Promise((resolve, reject) => {
      uploadToPublic(params)
        .then((res: any) => {
          uploadIndex = uploadIndex + 1;
          const { url = '', fileId = '' } = res;
          let map = {
            ...fileData,
            addr: url,
            fileId: fileId,
            refType: FileType.buyerEvaluate,
          };
          cmmtRefFileCOList.push(map);
          if (uploadIndex === uploadTotal) {
            // 返回新评论数据
            let newFileList: { addr: any; fileId: any; refType: any }[] = [];
            cmmtRefFileCOList.forEach((element) => {
              newFileList.push({
                addr: element.addr,
                fileId: element.fileId,
                refType: element.type,
              });
            });
            cmmtSkuCoItem = { ...cmmtSkuCoItem, cmmtRefFileCOList: newFileList };
            console.log('上传成功后返回cmmtSkuCoItem---', cmmtSkuCoItem);
            onChangeData &&
              onChangeData({
                type: EvaluateKinds.goods,
                data: cmmtSkuCoItem,
                goodId,
              });
            // 更新图片
            updateFiles(JSON.parse(JSON.stringify(cmmtRefFileCOList)));
          }
          resolve(url);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };

  const onFilesChange = async (newfiles: any, type: any, index: any) => {
    console.log(newfiles, type, index);
    if (type === 'add') {
      // 新增操作
      const oldLength = files.length;
      const newLength = newfiles.length;
      // 上传图片
      if (newLength > 0) {
        cmmtRefFileCOList = [];
        uploadTotal = newLength - oldLength;
        uploadIndex = 0;
        await newfiles.forEach(async (element: any, newIndex: number) => {
          if (newIndex + 1 > oldLength) {
            console.log('bakjscbajcnal', element);
            uploadImg(element, newIndex);
          } else {
            cmmtRefFileCOList.push(element);
          }
        });
        console.log('上传成功后返回的图片数据', newfiles);
      }
    } else {
      // 删除操作

      // 返回新评论数据
      let newFileList: { addr: any; locate: any; type: any }[] = [];
      files.forEach((element: any) => {
        newFileList.push({
          addr: element.addr,
          locate: element.locate,
          type: element.type,
        });
      });
      files.splice(index, 1);
      console.log('删除后返回的图片数据', files);
      cmmtSkuCoItem = { ...cmmtSkuCoItem, cmmtRefFileCOList: newFileList };
      onChangeData &&
        onChangeData({
          type: EvaluateKinds.goods,
          data: cmmtSkuCoItem,
          goodId,
        });
      // 更新图片
      updateFiles(files);
    }
  };

  const getRank = (rank: number, evaluteType: string) => {
    let score = '';
    switch (rank) {
      case 0:
        score = StarScore.one;
        break;
      case 1:
        score = StarScore.two;
        break;
      case 2:
        score = StarScore.three;
        break;
      case 3:
        score = StarScore.four;
        break;
      case 4:
        score = StarScore.five;
        break;
      default:
        break;
    }
    switch (evaluteType) {
      case EvaluateKinds.goods:
        // 商品描述
        cmmtSkuCoItem = { ...cmmtSkuCoItem, goodScore: score };
        console.log('cmmtSkuCoItem---', cmmtSkuCoItem);
        onChangeData &&
          onChangeData({
            type: EvaluateKinds.goods,
            data: cmmtSkuCoItem,
            goodId,
          });
        break;
      case EvaluateKinds.logistics:
        // 物流
        cmmtLogisticsCOItem = { ...cmmtLogisticsCOItem, totalScore: score };
        console.log('cmmtLogisticsCOItem---', cmmtLogisticsCOItem);
        onChangeData &&
          onChangeData({
            type: EvaluateKinds.logistics,
            data: cmmtLogisticsCOItem,
            goodId,
          });
        break;
      case EvaluateKinds.service:
        // 服务
        cmmtServCOItem = { ...cmmtServCOItem, servScore: score };
        onChangeData &&
          onChangeData({
            type: EvaluateKinds.service,
            data: cmmtServCOItem,
            goodId,
          });
        break;
      default:
        break;
    }
  };

  const getInputText = (value: any) => {
    cmmtSkuCoItem = { ...cmmtSkuCoItem, goodCmmt: value };
    console.log('cmmtSkuCoItem---', cmmtSkuCoItem);
    onChangeData &&
      onChangeData({
        type: EvaluateKinds.goods,
        data: cmmtSkuCoItem,
        goodId,
      });
  };

  const { skuName = '', skuAttr = '' } = goodsInfo;
  let skuAttrList = [];

  if (skuAttr !== '') {
    skuAttrList = JSON.parse(skuAttr);
  }
  let skuAttrStrList: string[] = [];
  skuAttrList.forEach((element: { attrValue?: '' | undefined }) => {
    const { attrValue = '' } = element;
    skuAttrStrList.push(attrValue);
  });
  const skuAttrStr = skuAttrStrList.join(',');

  return (
    <div className={styles.evaluteItem}>
      <div className={styles.goodsInfo}>
        <img src={phoneIcon} alt="" className={styles.goodsImg} />
        <div className={styles.goodsItem}>
          <div className={styles.goodsName}>{goodName}</div>
          <div className={styles.goodsModule}>{skuAttrStr}</div>
        </div>
      </div>
      <RankItem label="描述相符" onClick={getRank} evaluteType={EvaluateKinds.goods} />
      <RankItem label="物流服务" onClick={getRank} evaluteType={EvaluateKinds.logistics} />
      <RankItem label="服务态度" onClick={getRank} evaluteType={EvaluateKinds.service} />
      <TextareaItem
        rows={6}
        placeholder="动动你的小手，给商品最真实的评价，还可以上传最多9张图片哦～"
        count={500}
        onChange={getInputText}
      />

      <ImagePicker
        files={files}
        onChange={onFilesChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length <= 9}
        multiple
      />
    </div>
  );
};

export default Page;
