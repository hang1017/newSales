/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Toast } from 'antd-mobile';
import refreshIcon from '@/assets/img/customer/refresh.png';
import styles from './index.less';

interface SlipCheck {
  slipInfo: any;
  dispatch: any;
  onRefresh: () => void;
  onCheckSuccess: () => void;
}

const Page: React.FC<SlipCheck> = (props) => {
  const { slipInfo, dispatch, onRefresh, onCheckSuccess } = props;
  const { shadeImage, cutoutImage, x, y, uuId } = slipInfo || {}

  const wWidth = document.documentElement.clientWidth;
  // console.log(`width` + window.devicePixelRatio);


  const shadeImageWidth = wWidth - 60 * window.devicePixelRatio; // 目前服务端返回的图片固定是 280*171
  const scale = shadeImageWidth / 280; // 图片的比例

  const [width, updateWidth] = useState(55 * scale); // 小块图片的宽度
  const [height, updateHeight] = useState(55 * scale); // 小块图片的高度
  const paddingLeft = (wWidth - shadeImageWidth) / 2;
  const frontX = paddingLeft;
  const frontY = y * scale; // 滑块Y轴位置
  const [moveingX, updateMoveX] = useState(frontX);// 小滑块X轴位置
  const [btnX, updateBtnX] = useState(0);
  const [slipText, updateText] = useState('请拖动滑块解锁');
  const [checkResult, updateCheckRes] = useState('0');

  const onCheck = (clientX) => {
    console.log(clientX);
    dispatch!({
      type: 'login/checkSlideVerificationCode',
      payload: {
        uuId,
        y,
        x: ((moveingX - paddingLeft) / scale)
      }
    }).then(res => {
      const { errMessage, success } = res;
      if (success) {
        updateCheckRes('1');

        Toast.success('解锁成功');
        setTimeout(() => {
          onCheckSuccess();
        }, 500);
      } else {
        updateCheckRes('2');
        setTimeout(() => {
          updateMoveX(frontX);
          updateBtnX(0);
        }, 1000)
        // Toast.fail(errMessage);
      }
    });

  }

  return (
    <div className={styles.slipModal} >
      <img src={refreshIcon} alt='' className={styles.refreshIcon} onClick={onRefresh} style={{ right: paddingLeft }} />
      <img src={shadeImage} alt='' style={{ width: shadeImageWidth, }} />
      <img src={cutoutImage} alt=''
        // onLoad={() => {
        //   // 创建对象
        //   const img = new Image();
        //   img.src = cutoutImage;



        //   updateWidth(img.naturalWidth * window.devicePixelRatio);
        //   updateHeight(img.naturalHeight * window.devicePixelRatio);
        // }}
        style={{ width, height, left: moveingX, top: frontY + 50 * window.devicePixelRatio, position: 'absolute', zIndex: 9999 }}
      />

      <div className={styles.drag}>
        <div className={checkResult === '1' ? styles.successBg : checkResult === '0' ? styles.bg : styles.failBg} style={{ width: btnX }}> </div>
        <div className={styles.text} onSelect={
          () => {
            return false;
          }}>{slipText}</div>
        <div className={styles.btn} style={{ left: btnX }}
          onTouchStart={
            (e) => {
              updateCheckRes('0');
              updateText('');
            }}
          onTouchMove={
            e => {
              let { clientX } = e.changedTouches[0];
              let myFrontX = clientX;
              if (clientX < 0) {
                clientX = 0;
                myFrontX = 48;
              } else if (myFrontX > shadeImageWidth) {
                clientX = shadeImageWidth - 40 * window.devicePixelRatio; // 减去滑块的位置
                myFrontX = shadeImageWidth - (55 * scale * 0.48); // 需要减去滑块的一些位置
              }
              updateMoveX(myFrontX);
              updateBtnX(clientX);
            }}

          onTouchEnd={
            e => {

              const { clientX } = e.changedTouches[0];
              if (clientX === 0) {
                return;
              }
              // updateCheckRes('2');
              onCheck && onCheck(clientX);
              // Toast.success('校验失败')
              // console.log('请求服务验证');
            }}

        >&gt;&gt;</div>
      </div>
    </div>
  );
};

export default Page;
