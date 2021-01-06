/* eslint-disable no-unused-expressions */
import Cookies from 'js-cookie';
import { Toast } from 'antd-mobile';
import { dateChange } from '@alitajs/dform';
import { sysParams } from '@/utils/AppContext';

const phoneNumberDesensit = (phoneStr: string) => {
  const pat = /(\d{3})\d*(\d{4})/;
  const phone = phoneStr.replace(pat, '$1****$2');
  return phone;
};

// 工具类
/*
 *
 * 用来对值进行空校验
 * @param {*} str
 */
const isNotEmpty = (str: string | null | undefined) => {
  if (str === '' || str === undefined || str === null || str === 'null') {
    return false;
  }
  return true;
};
/**
 * 获取随机数
 * toString后的参数规定可以是2-36之间的任意整数，不写的话默认是10（也就是十进制），此时返回的值就是那个随机数。
 *typeNum--若是偶数，返回的数值字符串都是短的，若是奇数，则返回的将是一个很大长度的表示值。
 *typeNum--若<10 则都是数字组成，>10 才会包含字母。
 *length 要截取的长度，现在项目里面用到是8为
 * @param {*} param
 */
const getRandom = (param: any) => {
  // if (!param) {
  //     param = {};
  // }
  const typeNum = param.typeNum || 11;
  const length = param.length || 8;
  return Math.random().toString().substr(typeNum, length);
};
/**
 * 获取时间戳
 */
const getTimestamp = () => new Date().getTime();

/**
 * 格式化时间范围
 */
const formatActTime = (timeStr: string) => {
  if (timeStr) {
    const tempTime = timeStr.split('~');
    const startTime = tempTime[0].substr(0, 10);
    const endTime = tempTime[1].substr(0, 10);

    return `${startTime}-${endTime}`;
  }
  return '';
};

const phoneNum = (phoneNum: string) => {
  // 对手机号进行脱敏
  const regExp = /(\d{3})\d*(\d{4})/;
  return phoneNum.replace(regExp, '$1****$2');
};

const getTodayDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  let monthStr = `${month + 1}`;
  if (month < 10) {
    monthStr = `0${month}`;
  }
  const day = today.getDate();
  let dayStr = `${day}`;
  if (day < 10) {
    dayStr = `0${day}`;
  }
  const hours = today.getHours();
  let hoursStr = `${hours}`;
  if (hours < 10) {
    hoursStr = `0${hours}`;
  }
  const minutes = today.getMinutes();
  let minutesStr = `${minutes}`;
  if (minutes < 10) {
    minutesStr = `0${minutes}`;
  }

  const date = `${today.getFullYear()}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}`;
  return date;
};
/**
 * 默认返回的时间格式为2020-03-04
 * @param date
 * @param formateStr
 */
const formateDate = (date: Date, formateStr?: string) => {
  if (!formateStr) {
    formateStr = '-';
  }
  const month = date.getMonth() + 1;
  let monthStr = `${month}`;
  if (month < 10) {
    monthStr = `0${month}`;
  }
  const currentDate = date.getDate();
  let dateStr = `${currentDate}`;
  if (currentDate < 10) {
    dateStr = `0${currentDate}`;
  }
  return date.getFullYear() + formateStr + monthStr + formateStr + dateStr;
};
/**
 * 获取数的整数和小数部分
 */
const getIntegerAndDecimal = (numStr) => {
  if (!numStr) {
    return {
      integer: '0',
      decimal: '.00',
    };
  }
  const tempNum = parseFloat(numStr);
  const remainder = tempNum % 1;
  const integer = tempNum - remainder;
  let decimal = '';
  if (remainder === 0) {
    decimal = '00';
  } else {
    let tempDecimal = `${remainder}`.split('.')[1];
    tempDecimal = `${tempDecimal}`;
    decimal = tempDecimal.length > 1 ? tempDecimal.substring(0, 2) : `${tempDecimal}0`;
  }
  decimal = `.${decimal}`;

  return {
    integer,
    decimal,
  };
};

//
const setStorageForJson = (key: string, value: any) => {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(value));
};

const getStorageForJson = (key: string) => {
  const storage = window.localStorage;
  const item = storage.getItem(key);
  let result = {};
  if (item && item !== 'undefined') {
    result = JSON.parse(item);
  }
  return result;
};

const setStorage = (key: string, value: any) => {
  const storage = window.localStorage;
  storage.setItem(key, value);
};

const getStorage = (key: string, value: any) => {
  const storage = window.localStorage;
  const item = storage.getItem(key);
  let result = '';
  if (item) {
    result = result;
  }
  return result;
};
/**
 * 获取数字-随机数
 * number为想要获取的几位数
 * @param digits
 */
const getNumRandom = (digits: number) => {
  const randomStr = Math.random().toString().slice(-digits);
  return randomStr;
};

/**
 * base64
 */
const base64Encode = (input: string) => {
  const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var output = '';
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4);
  }
  return output;
};

const base64ToFormData = (base64: string) => {
  const bytes = window.atob(base64);
  const array = [];
  for (var i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  const fd = new FormData();
  fd.append('file', blob, Date.now() + '.jpg');
  return fd;
};

export const getUrlkey = (url: string) => {
  const params = {};
  let arr = url.split('?');
  if (arr.length <= 1) return params;
  arr = arr[1].split('&');
  for (let i = 0, l = arr.length; i < l; i++) {
    const a = arr[i].split('=');
    params[a[0]] = a[1];
  }
  return params;
};

/**
 * 获取URL 参数
 */
export function getQueryString(name: string) {
  const params = {};
  let arr = window.location.href.split('?');
  if (arr.length <= 1) return '';
  const arr1 = arr[1].split('&');
  for (let i = 0, l = arr1.length; i < l; i++) {
    const a = arr1[i].split('=');
    if (a && a.length > 1) {
      params[a[0]] = a[1];
    }
  }
  if (arr.length >= 3) {
    const arr2 = arr[2].split('&');
    for (let i = 0, l = arr2.length; i < l; i++) {
      const a = arr2[i].split('=');
      if (a && a.length > 1) {
        params[a[0]] = a[1];
      }
    }
  }
  if (params[name]) {
    return params[name];
  }
  return null;
}
export function getQueryStringSourceAndSn(name: string) {
  const params = {};
  let arr = window.location.href.split('?');
  if (arr.length <= 1) return '';
  const arr1 = arr[1].split('&');
  for (let i = 0, l = arr1.length; i < l; i++) {
    const a = arr1[i].split('=');
    if (a && a.length > 1) {
      params[a[0]] = decodeURIComponent(a[1].split('#/').join('').trim());
    }
  }
  if (arr.length >= 3) {
    const arr2 = arr[2].split('&');
    for (let i = 0, l = arr2.length; i < l; i++) {
      const a = arr2[i].split('=');
      if (a && a.length > 1) {
        params[a[0]] = decodeURIComponent(a[1].split('#/').join('')).trim();
      }
    }
  }
  if (params[name]) {
    return params[name];
  }
  return null;
}
export function isShowChooseNum(attres: any) {
  let isShowChoosePhone = false;
  if (attres) {
    attres.map((subItem) => {
      if (subItem.attrCode === 'HM') {
        isShowChoosePhone = true;
      }
    });
  }

  return isShowChoosePhone;
}
/**
 * 获取灰度环境标识
 */
export function getGrayFlag() {
  const grayFlag = localStorage.getItem('grayFlag');
  if (grayFlag) {
    Cookies.set('grayFlag', grayFlag, { Secure: true, HttpOnly: true });
    return grayFlag;
  }
  Cookies.remove('grayFlag');
  return '0';
}
export function isLogin() {
  const tokenCode = localStorage.getItem('tokenCode');
  if (tokenCode && tokenCode.length > 0) {
    return true;
  }
  return false;
}
export function clear() {
  localStorage.removeItem('tokenCode');
  localStorage.removeItem('memberInfo');
  // localStorage.removeItem('source');
  // localStorage.removeItem('sn');
  Cookies.remove('grayFlag');
}
export function getPayUrl(payUrl: string) {
  let realPayUrl = payUrl;
  const source = localStorage.getItem('source');
  const sn = localStorage.getItem('sn');
  if (source && source.length > 0) {
    realPayUrl += `&source=${source}`;
  }
  if (sn && sn.length > 0) {
    realPayUrl += `&sn=${sn}`;
  }
  console.log(`跳转到支付页面：${realPayUrl}`);
  return realPayUrl;
}

export function getSourceAndSn(href?: string, isApplets?: boolean) {
  const myHref = href || window.location.href;
  if (myHref.indexOf('source') > -1 && myHref.indexOf('sn') > -1) {
    const sourceTemp = getQueryStringSourceAndSn('source') || '';
    const tempSn = getQueryStringSourceAndSn('sn') || '';
    const tempSalesCode = getQueryStringSourceAndSn('salesCode') || '';
    const test = getQueryStringSourceAndSn('test') || '';
    const fromType = getQueryStringSourceAndSn('fromType') || '';
    let source = sourceTemp;
    let sn = tempSn;
    let salesCode = tempSalesCode;

    if (tempSn?.indexOf('#') > -1) {
      sn = tempSn?.split('#')[0];
    }
    if (sourceTemp?.indexOf('#') > -1) {
      source = sourceTemp?.split('#')[0];
    }
    if (tempSalesCode?.indexOf('#') > -1) {
      source = tempSalesCode?.split('#')[0];
    }
    // 根据链接带的值，进行保存和传递,如果为空，也需要保存为空的情况
    localStorage.setItem('source', source);
    localStorage.setItem('sn', sn);
    localStorage.setItem('salesCode', salesCode);
    // if (source) {
    //   localStorage.setItem('source', source);
    // }
    // if (sn) {
    //   localStorage.setItem('sn', sn);
    // }
    // if (salesCode) {
    //   localStorage.setItem('salesCode', salesCode);
    // }
    console.log(`source: ${source}, sn: ${sn}, salesCode=${salesCode}`);
    if (isApplets && !(myHref.indexOf('indexList') > -1)) {
      // 从小程序跳转过来，且非首页
      return false;
    }
    if (myHref.indexOf('#') !== -1) {
      if (myHref.indexOf('10.45.46.226:8086') !== -1) {
        window.location.replace(
          `${window.location.origin}/polarisApp/#/customer/indexList?source=${source}&sn=${sn}&salesCode=${salesCode}&test=${test}`,
        );
      } else {
        window.location.replace(
          `${window.location.origin}/#/customer/indexList?source=${source}&sn=${sn}&salesCode=${salesCode}&test=${test}`,
        );
      }
    }
  }
}

/**
 * 判断是否是微信环境
 */
const isWeChat = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  }
  return false;
};
/**
 * 判断是否是小程序
 */
const isFromApplets = () => {
  const myHref = window.location.href;
  let isApplets = false; // 如果是小程序过来，会直接跳转到其他页面，不一定是首页
  if (myHref.indexOf('fromType') > -1) {
    isApplets = true;
    const loginData = getQueryString('loginData');
    const data = JSON.parse(decodeURIComponent(loginData));

    const { tokenCode = '', grayFlag = '', memberId = '' } = data || {};
    if (tokenCode) {
      localStorage.setItem('tokenCode', tokenCode);
    }
    if (grayFlag) {
      localStorage.setItem('grayFlag', grayFlag);
    }
    if (memberId) {
      whaleCollect.set('user_id', memberId);
    }
    if (data) {
      setStorageForJson('memberInfo', data);
    }
  }
  getSourceAndSn(myHref, isApplets);
};

// /**
//  * 复制URL
//  */
// const coypUrl = (text, event) => {
//   Toast.loading('请稍后...', 10);
//   clipboard(text, event);
//   Toast.hide();
//   // Toast.loading('请稍后...', 10);

//   // const clipboard = new Clipboard(document.getElementsByClassName(className));
//   // clipboard.on('success', () => {
//   //   // 释放内存
//   //   Toast.success('邀请链接复制成功啦');
//   // })
//   // clipboard.on('error', () => {
//   //   // 不支持复制
//   //   Toast.fail('该浏览器不支持自动复制')
//   // })
//   // Toast.hide();

// };
const timeDiffer = (timeStr: string) => {
  const newDate = new Date(dateChange(timeStr)); // 设置将来的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
  const oldDate = new Date();

  if (newDate < oldDate) {
    // 失效的情况下
    return false;
  }

  const difftime = (newDate - oldDate) / 1000; // 计算时间差,并把毫秒转换成秒

  const days = parseInt(difftime / 86400); // 天  24*60*60*1000
  const hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数
  const minutes = parseInt((difftime % 3600) / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
  const seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};


/**
 * 访问服务来校验source和sn是否可访问
 */
const checkSourceAndSn = (payload: any) => {
  const myHref = window.location.href;
  const { source, sn, successCallBack, failCallBack, dispatch } = payload;
  if (!source && !sn) {
    successCallBack && successCallBack();
  }
  if (source || sn) {
    // 如果都为空，那就是都可以访问

    dispatch!({
      type: 'indexList/checkSaleChannelNbrOpenStatus',
      payload: {
        snNbr: sn,
        sourceFrom: source,
      },
    }).then((res: any) => {
      if (!res) {
        return false;
      }

      const { success, errMessage } = res || {};
      if (success) {
        successCallBack && successCallBack();
      } else {
        failCallBack && failCallBack();
        // history.push({
        //   pathname: '/defaultPage',
        //   query: { errMessage }
        // });
        if (myHref.indexOf('10.45.46.226:8086') !== -1) {
          // 替换路由，这样可以不返回到上个页面
          window.location.replace(
            `${window.location.origin}/polarisApp/#/defaultPage?errMessage=${errMessage}`,
          );
        } else {
          window.location.replace(
            `${window.location.origin}/#/defaultPage?errMessage=${errMessage}`,
          );
        }
      }
    });
  }
};
/**
 * 访问权限
 */
const accessPermission = (payload: any) => {
  const { dispatch } = payload;
  const myHref = window.location.href;
  dispatch!({
    type: 'payConfirm/getH5ConfigurationModel',
    payload: {
      propertyName: sysParams.publishStatus,
    },
  }).then((flag: boolean) => {
    if (flag) {
      if (window.location.href.indexOf('test=1') > -1) {
        checkSourceAndSn(payload);
      } else if (myHref.indexOf('10.45.46.226:8086') > -1) {
        // 替换路由，这样可以不返回到上个页面,测试环境需要上下文polarisApp
        window.location.replace(`${window.location.origin}/polarisApp/#/upgradePage`);
      } else {
        window.location.replace(`${window.location.origin}/#/upgradePage`);
      }
    } else {
      checkSourceAndSn(payload);
    }
  });
};
/**
 * 获取指定时间和当天两个日期之前的差的天数，如果需要其他的返回值后续可增加
 */
const dateDiffer = (oldDateStr: string) => {
  const currentDate = formateDate(new Date(), '-');
  const newDate = new Date(dateChange(currentDate));
  const oldDate = new Date(dateChange(oldDateStr));
  const differDays = (newDate - oldDate) / 1000 / 24 / 60 / 60; // 计算时间差
  return differDays;
}
export default {
  phoneNumberDesensit,
  isNotEmpty,
  getRandom,
  getTimestamp,
  phoneNum,
  formatActTime,
  getTodayDate,
  formateDate,
  getIntegerAndDecimal,
  setStorageForJson,
  getStorageForJson,
  setStorage,
  getStorage,
  getNumRandom,
  base64Encode,
  base64ToFormData,
  getQueryString,
  isShowChooseNum,
  getGrayFlag,
  isLogin,
  clear,
  getPayUrl,
  getSourceAndSn,
  isWeChat,
  isFromApplets,
  getQueryStringSourceAndSn,
  // coypUrl,
  timeDiffer,
  accessPermission,
  dateDiffer
};
