/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-empty */
import moment from 'moment';
import { Toast } from 'antd-mobile';
import { imgVerificationCode } from '@/utils/apiConfig';
import { dateChange } from '@alitajs/dform';
//
/**
 * 获取随机数 7位
 */
export const random = () => Math.random().toString(36).substring(7);

// 将当前商品详情页的数据保存本地
export const putHoneyGoodsDetail = (data: any) => {
  window.localStorage.setItem('honeyGoodsDetail', JSON.stringify(data));
};

// 获取保存本地的商品详情页数据
// eslint-disable-next-line consistent-return
export const getHoneyGoodsDetail = () => {
  try {
    const detaill = window.localStorage.getItem('honeyGoodsDetail') || '{}';
    return JSON.parse(detaill);
  } catch (e) {}
};

/**
 * 从商品列表进入到商品详情页时，需要sku 的数据，将数据保存到本地
 */
export const setSkuGoodsDetail = (data: any) => {
  try {
    window.localStorage.setItem('skuGoodsDetail', JSON.stringify(data));
  } catch (e) {}
};

export const getSkuGoodsDetail = () => {
  try {
    const detaill = window.localStorage.getItem('skuGoodsDetail') || '{}';
    return JSON.parse(detaill);
  } catch (e) {}
};

/**
 * 挂失解卦所选择的商品数据存储
 */
export const setEmergencyData = (data: any) => {
  try {
    window.localStorage.setItem('emergencyData', JSON.stringify(data));
  } catch (e) {}
};

export const getEmergencyData = () => {
  try {
    const data = window.localStorage.getItem('emergencyData') || '{}';
    return JSON.parse(data);
  } catch (e) {}
};

/**
 * 与当前时间进行比较
 * 若超过30分钟则展示flag 为 true
 */
export const showTimeFlag = (beforeTime: moment.MomentInput) => {
  const wsLatestTime = moment(beforeTime);
  const nowTime = moment();
  if (nowTime.diff(wsLatestTime, 'minutes') >= 3) {
    return '1';
  }
  return '0';
};

// 展示日期
export const timeFormat = (value: number) => {
  const nowTime = moment(new Date()).format('YYYY-MM-DD');
  const valueTime = moment(value).format('HH:mm');
  const valueFormat = moment(value).format('YYYY/MM/DD HH:mm');
  if (nowTime === moment(value).format('YYYY-MM-DD')) {
    return `今天 ${valueTime}`;
  }
  if (nowTime === moment(value).add(1, 'days').format('YYYY-MM-DD')) {
    return `昨天 ${valueTime}`;
  }
  return valueFormat;
};

/**
 * 获取图片验证码
 */
export const getPicCode = () => `${new Date().getTime()}`;

/**
 * 校验身份证
 */
export const veriryIdCard = (val: string) => {
  if (val) {
    const idCard = val.replace(/\s+/g, '');
    if (
      !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        idCard,
      ) &&
      idCard
    ) {
      Toast.fail('身份证号码有误');
      return false;
    }
    return true;
  }
  return false;
};

/**
 * 根据版本号确认是否要清空 tokenCode
 */
export const checkVersionForClearTokenCode = () => {
  const version = localStorage.getItem('newSaleVersion');
  if (version !== '20201015') {
    localStorage.setItem('newSaleVersion', '20201015');
    localStorage.setItem('tokenCode', '');
  }
};

/**
 * 图形验证码url
 */
export const getVerificationCodeImgUrl = () => {
  return `${imgVerificationCode}?time=${new Date().getTime()}`;
};

/**
 * 转化数字类型的格式
 */
export const numFormat = (num1: string) => {
  // const num = parseFloat(num1);
  // return num.toLocaleString();
  const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  const val = num1.toString().replace(regForm, '$1,');
  return val;
};

/**
 * 判断鹅外惊喜目前正在什么时间段
 */
export const getTimeSlot = (data: any) => {
  const nowTime = parseInt(moment(new Date()).format('YYYYMMDDHHmmss'), 10);
  const beginTime = parseInt(
    moment(new Date(dateChange(data?.beginTime))).format('YYYYMMDDHHmmss'),
    10,
  );
  const endTime = parseInt(
    moment(new Date(dateChange(data?.endTime))).format('YYYYMMDDHHmmss'),
    10,
  );
  if (nowTime < beginTime) {
    return '即将开始';
  } else if (nowTime >= beginTime && nowTime <= endTime) {
    return '火热进行中';
  } else {
    return '已结束';
  }
};
// 时间补零
export const prefixInteger = (num: number, n: number) => (Array(n).join(0) + num).slice(-n);

// 获取时间差
export const countDownTime = (startTime: any, endTime: any) => {
  const hoursLeft = endTime.diff(startTime, 'hours');
  let minutesLeft = endTime.diff(startTime, 'minutes');
  let secondsLeft = endTime.diff(startTime, 'seconds');
  minutesLeft = minutesLeft > 60 ? minutesLeft % (hoursLeft * 60) : minutesLeft;
  // 分钟剩余时间转秒，小时剩余时间转秒， 最后用总剩余秒数取余即是倒数秒
  secondsLeft =
    secondsLeft > 60 ? secondsLeft % (minutesLeft * 60 + hoursLeft * 60 * 60) : secondsLeft;
  if (hoursLeft < 0 || minutesLeft < 0 || secondsLeft < 0) {
    return `00:00:00`;
  }
  return `${prefixInteger(hoursLeft, 2)}:${prefixInteger(minutesLeft, 2)}:${prefixInteger(
    secondsLeft,
    2,
  )}`;
};

// 设置iframe页面的meta
export function resetIframeViewPort() {
  try {
    const meta = document.querySelector('meta[name="viewport"]');
    window._contentBackUp = meta.getAttribute('content');
    const scale = window._contentBackUp.split('initial-scale=')[1].split(',')[0];
    meta.setAttribute(
      'content',
      'user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimal-ui',
    );
    const html = document.querySelector('html');
    window._fontSize = html.style.fontSize;
    html.style.fontSize = window._fontSize.split('px')[0] * scale + 'px';
  } catch (error) {
    console.log('tool_setIframeViewPort', error);
  }
}

// 还原iframe页面的meta
export function backIframeViewPort() {
  try {
    // 容错
    if (window._fontSize && window._contentBackUp) {
      const meta = document.querySelector('meta[name="viewport"]');
      meta.setAttribute('content', window._contentBackUp);
      const html = document.querySelector('html');
      html.style.fontSize = window._fontSize;
    }
  } catch (error) {
    console.log('tool_backIframeViewPort', error);
  }
}

/**
 * 压缩图片
 */
export const transformFile = (file: any, pictureQuality = 0.5) => {
  /**
   * 针对图片进行压缩,如果图片大小超过压缩阈值,则执行压缩,否则不压缩
   */
  //判断是否是图片类型
  // const pictureQuality = 0.5;
  if (typeof FileReader === 'undefined') {
    return file;
  } else {
    try {
      return new Promise((resolve) => {
        //声明FileReader文件读取对象
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // 生成canvas画布
          const canvas = document.createElement('canvas');
          // 生成img
          const img = document.createElement('img');
          img.src = reader.result;
          img.onload = () => {
            const ctx = canvas.getContext('2d');
            //原始图片宽度、高度
            let originImageWidth = img.width,
              originImageHeight = img.height;
            //默认最大尺度的尺寸限制在（1920 * 1080）
            let maxWidth = 1920,
              maxHeight = 1080,
              ratio = maxWidth / maxHeight;
            //目标尺寸
            let targetWidth = originImageWidth,
              targetHeight = originImageHeight;
            //当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
            if (originImageWidth > maxWidth || originImageHeight > maxHeight) {
              //超过最大宽高比例
              if (originImageWidth / originImageHeight > ratio) {
                //宽度取最大宽度值maxWidth,缩放高度
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originImageHeight / originImageWidth));
              } else {
                //高度取最大高度值maxHeight,缩放宽度
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originImageWidth / originImageHeight));
              }
            }
            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            ctx.clearRect(0, 0, targetWidth, targetHeight);
            // 绘制图片
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            // quality值越小,图像越模糊,默认图片质量为0.92
            const imageDataURL = canvas.toDataURL(file.type || 'image/jpeg', pictureQuality);
            // 去掉URL的头,并转换为byte
            const imageBytes = window.atob(imageDataURL.split(',')[1]);
            // 处理异常,将ascii码小于0的转换为大于0
            const arrayBuffer = new ArrayBuffer(imageBytes.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < imageBytes.length; i++) {
              uint8Array[i] = imageBytes.charCodeAt(i);
            }
            let mimeType = imageDataURL.split(',')[0].match(/:(.*?);/)[1];
            let newFile = new File([uint8Array], file.name, { type: mimeType || 'image/jpeg' });
            // console.log('after compress, the file size is : ', (newFile.size / 1024 / 1024) + "M");
            resolve(newFile);
          };
        };
        reader.onerror = () => file;
      })
        .then((res) => res)
        .catch(() => file);
    } catch (e) {
      //压缩出错,直接返回原file对象
      return file;
    }
  }
};
