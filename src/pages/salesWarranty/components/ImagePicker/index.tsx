import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { ImagePicker } from 'antd-mobile';
import IconRightMore from '@/assets/img/rigth_more.png';
import { uploadToPublic } from '@/services/evaluationApi';
import { omsUploadImg } from '@/services/orderApplyCenter';
interface SelectItemProps {
  title?: string;
  onChange?: (filelist: Array<any>, e: any) => void;
  maxLength?: number;
  goodId: string;
  paddingVer?: string;
  type?: 'oms' | undefined;
}

const SelectItem: FC<SelectItemProps> = ({
  maxLength = 3,
  title,
  onChange = () => {},
  goodId = '',
  paddingVer = '0.32rem',
  type,
}) => {
  const [files, setFiles] = useState([]);
  const [changeImageList, setChangeImageList] = useState([]);
  const uploadImage = (filelist: any[], index: number) => {
    if (filelist.length <= index) {
      return;
    }

    if (type === 'oms') {
      //  、
      omsUploadImg({ file: filelist[index].file })
        .then((res) => {
          const file = files.concat(JSON.parse(JSON.stringify(filelist[index])));
          setFiles(file);
          uploadImage(filelist, index + 1);
          changeImageList.push(res);
          onChange(
            changeImageList.map((item) => item.url),
            changeImageList.map((item) => item.fileId),
          );
        })
        .catch((err) => {
          uploadImage(filelist, index + 1);
        });
    } else {
      uploadToPublic({ file: filelist[index].file, goodId })
        .then((res) => {
          // 上传成功
          const file = files.concat(JSON.parse(JSON.stringify(filelist[index])));
          setFiles(file);
          uploadImage(filelist, index + 1);
          changeImageList.push(res[0]);
          onChange(
            changeImageList.map((item) => item.url),
            changeImageList.map((item) => item.fileId),
          );
        })
        .catch((err) => {
          uploadImage(filelist, index + 1);
        });
    }
  };

  // omsUploadImg
  const uploadToPublicFinish = () => {};

  const imageChange = (filelist: any[], type: string, index?: number) => {
    const newIndex = files.length;
    if (type === 'add') {
      // 每次增加
      uploadImage(filelist, newIndex);
    } else {
      setFiles(filelist);
      changeImageList.splice(index, 1);
      onChange(
        changeImageList.map((item) => item.url),
        changeImageList.map((item) => item.fileId),
      );
    }
  };
  return (
    <div
      className={styles.selectItem}
      style={{ paddingTop: paddingVer, paddingBottom: paddingVer }}
    >
      {title && <div className={styles.selectItemTitle}>{title}</div>}
      <div>
        <ImagePicker
          files={files}
          onChange={imageChange}
          length={maxLength}
          selectable={files.length < maxLength}
          // multiple
        />
      </div>
    </div>
  );
};

export default SelectItem;
