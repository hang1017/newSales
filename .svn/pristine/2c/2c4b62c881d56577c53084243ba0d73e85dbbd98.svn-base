/* eslint-disable no-param-reassign */
import { request } from 'alita';
import { Toast } from 'antd-mobile';
import Utils from '@/utils/tool';
import DesUtils from '@/utils/DesUtils';

//demo
export async function query(): Promise<any> {
  return request('/api/hello');
}

const reqTime = Utils.getTimestamp();
export const HttpMethod = {
  get: 'get',
  post: 'post',
};
export async function requestWithParams(
  params: any,
  method = HttpMethod.post,
  loadFlag = true, // 是否有 toast 的请求
  returnAll = false, // 是否将全部的出参进行返回
  toastTime = 4, // toast 时间
): Promise<any> {
  if (!(window as any).antdToast) {
    // 解决多次调用接口，Toast无法通过hide关闭的问题，antd-mobile暂未解决此问题
    if (loadFlag) {
      Toast.loading('请稍后...', toastTime);
      (window as any).antdToast = true;
    }
  }

  const { requestObject = {} } = params;
  const requestData = requestObject;
  let dataStr = '';
  // let url = `${(window as any).reqUrl}${params.apiCode}`; // 打包部署的正式地址

  let url = `${params.apiCode}`; // 打包部署的正式地址

  if (method === HttpMethod.post) {
    dataStr = JSON.stringify(requestData);
    // 加密
    // const dataStr = DesUtils.encrypt(JSON.stringify(requestData));
    console.log(`${params.apiCode}===入参===>`, JSON.stringify(requestData));
  } else {
    if (url.search(/\?/) === -1) {
      if (Object.keys.length > 0) {
        url = url + '?';
        const { requestObject } = params;
        Object.keys(requestObject).forEach((key, index) => {
          url = `${url + (index === 0 ? '' : '&') + key}=${requestObject[key]}`;
        });
      }
    } else {
      const { requestObject } = params;
      Object.keys(requestObject).forEach((key) => {
        url = `${url}&${key}=${requestObject[key]}`;
      });
    }
    // console.log('===入参===>', url);
  }

  const tokenCode = localStorage.getItem('tokenCode') || '';
  let headers = {};
  if (params.textPlain) {
    // 如果是formData的数据，无需设置Content-Type，requestData必须是封装好的formData的数据
    headers = { tokenCode };
  } else {
    headers = {
      'Content-Type': 'application/json',
      tokenCode,
      // grayFlay: Utils.getGrayFlag(),
    };
  }
  Utils.getGrayFlag();
  const options = {
    method,
    mode: 'cors',
    headers: {
      ...headers,
      product: 'Polaris',
    },
    data: params.textPlain ? requestData : dataStr,
    timeout: 30000,
    skipErrorHandler: true,
  };

  if (returnAll) {
    return new Promise((resolve, reject) => {
      request(url, options).then((res: any) => {
        if (loadFlag) Toast.hide();
        return resolve(res);
      });
    });
  }

  return new Promise((resolve, reject) => {
    request(url, options)
      .then((res: any) => {
        (window as any).antdToast = false;
        // console.log(`${params.apiCode}===出参===>`, JSON.stringify(res));
        if (loadFlag) Toast.hide();
        if (!res) {
          throw new Error('');
        }
        // 解密
        // res = DesUtils.crypto(res);
        // console.log(`${params.apiCode}===出参===>`, res);
        if (typeof res === 'string') {
          res = JSON.parse(res);
        }
        // console.log('===出参===>', res);
        let resultObject = {};
        if (url.indexOf('bms/users/addUserMember') !== -1) {
          return res;
        }
        if (res && `${res.success}` === 'true') {
          // 大数据resultCode为number类型
          if (res.data && JSON.stringify(res.data) !== '{}') {
            // eslint-disable-next-line prefer-destructuring
            resultObject = res.data;
            return resultObject;
          }
          // 其他返回成功的情况，会没有值或者{}
          return res;
        }
        const resultMsg = res && res.errMessage;
        throw new Error(resultMsg || '服务开小差啦~请稍后再试');
      })
      .then((resultObject: any) => {
        (window as any).antdToast = false;
        resolve(resultObject);
      })
      .catch((err: any) => {
        (window as any).antdToast = false;
        console.log('requsetErr======>', err);
        if (loadFlag) Toast.hide();
        if (loadFlag && err.message && err.message.indexOf('evaluating') === -1) {
          if (!(url.indexOf('payStatus') > -1)) {
            Toast.info(err.message);
          }
        }
        // reject(err);
      });
  });
}

export async function uploadFiles(params: any): Promise<any> {
  if (!(window as any).antdToast) {
    // 解决多次调用接口，Toast无法通过hide关闭的问题，antd-mobile暂未解决此问题
    Toast.loading('请稍后...', 80);
    (window as any).antdToast = true;
  }

  const fileObject = params.requestObject;

  // 加密
  let formData = new FormData();
  // eslint-disable-next-line no-restricted-syntax
  for (const key in fileObject) {
    if (fileObject.hasOwnProperty(key)) {
      formData.append(key, fileObject[key]);
    }
  }
  // console.log('===入参===>', formData.get('file'));
  // const { tokenCode = '' } = Utils.getStorageForJson('userInfo') || {};
  const tokenCode = localStorage.getItem('tokenCode');

  const options = {
    method: 'post',
    headers: {
      tokenCode,
      product: 'Polaris',
    },
    data: formData,
    timeout: 30000,
    skipErrorHandler: true,
  };

  return new Promise((resolve, reject) => {
    // let url = `${(window as any).reqUrl}${params.apiCode}`; // 打包部署的正式地址
    let url = `${params.apiCode}`; // 打包部署的正式地址
    request(url, options)
      .then((res: any) => {
        (window as any).antdToast = false;
        // console.log(`${params.apiCode}===出参===>`, JSON.stringify(res));

        Toast.hide();
        if (!res) {
          throw new Error('网络开小差啦~请稍后再试');
        }
        // 解密
        // res = DesUtils.crypto(res);
        // console.log(`${params.apiCode}===出参===>`, res);
        if (typeof res === 'string') {
          res = JSON.parse(res);
        }
        // console.log('===出参===>', res);
        let resultObject = {};
        if (res && `${res.success}` === 'true') {
          // 大数据resultCode为number类型
          if (res.data && JSON.stringify(res.data) !== '{}') {
            // eslint-disable-next-line prefer-destructuring
            resultObject = res.data;
            return resultObject;
          }
          // 其他返回成功的情况，会没有值或者{}
          return res;
        }
        const resultMsg = res && res.errMessage;
        throw new Error(resultMsg || '服务开小差啦~请稍后再试');
      })
      .then((resultObject: any) => {
        (window as any).antdToast = false;
        resolve(resultObject);
      })
      .catch((err: any) => {
        (window as any).antdToast = false;
        console.log('requsetErr======>', err);
        Toast.hide();
        Toast.info(err.message);
        // reject(err);
      });
  });
}
