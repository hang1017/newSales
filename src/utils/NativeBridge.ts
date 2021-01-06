import { Toast } from 'antd-mobile';

interface PushVCOptions {
  className: string;
  params: any;
}

// 是否是销售平台App
const isMallSaleContainerApp = () => {
  return navigator.userAgent.indexOf('/com.iwhalecloud.newmallsale') > -1;
};

/**
 * H5调用原生方法
 * @param methods 调用方法
 * @param params 调用参数
 * @param success 调用成功回调  如果回参就是JSONString，
 * @param fail  调用失败回调  如果回参就是JSONString;
 */
const exec = (methods = '', params: any, success = (q: string) => {}, fail = (e: string) => {}) => {
  if (!isMallSaleContainerApp()) {
    return false;
  }

  if ((window as any).webkit && (window as any).webkit.messageHandlers) {
    (window as any).webkit.messageHandlers[methods].postMessage(params);
  }
  if ((window as any).android) {
    (window as any).android[methods](params);
  }
  window[`${methods}Success`] = (e = '{}') => {
    success(JSON.parse(e));
  };
  window[`${methods}Fail`] = (e = '{}') => {
    fail(JSON.parse(e));
  };

  console.log(window);

  return true;
};

/**
 * 原生端webview开发说明
 *
 * 1、原生端开发webview，页面加载完成后给webview添加自定义UserAgent，获取到UserAgent后追加 '/com.iwhalecloud.newmallsale'(固定) H5端会通过此内容判断是否在本App内部。以兼容外部浏览器版本
 * 2、H5调用原生端方法 会通过webview和JS交互方式调用，
 *    每个js方法调用原生能力后都要回调处理js的success/fail函数之一。
 *    例如：hiddenNavigatorBar()执行后，首先原生端需要做隐藏导航条操作，隐藏完成后需要回调window.hiddenNavigatorBarSuccess()/window.hiddenNavigatorBarFail()【method+'Success'/'Fail'】方法
 */

// 回退到首页
const popToRootViewController = () => {
  exec('popToRootViewController', '');
};

// 导航到原生上一层 关闭window窗口
const popViewController = () => {
  exec('popViewController', '');
};
///跳转支付页面//废弃
const pushPayViewController = (url = '') => {
  exec('pushPayViewController', url);
};

// 隐藏展示导航条。 默认展示
const hiddenNavigatorBar = (hidden = false, success?: () => void, fail?: () => void) => {
  exec('hiddenNavigatorBar', hidden ? '1' : '0', success, fail);
};

const pushOCRAuthViewController = (success?: () => void, fail?: () => void) => {
  exec('pushOCRAuthViewController', {}, success, fail);
};

// 跳转到原生的某个类
const pushViewController = (options: PushVCOptions, success?: () => void, fail?: () => {}) => {
  const params = options ? options : {};
  exec('pushViewController', params, success, fail);
};

// 活体认证完成
const livingAuthFinish = (params: any) => {
  exec('livingAuthFinish', params, () => {});
};

export {
  popToRootViewController, // 返回到首页  无参
  popViewController, // 返回到上一级 无参
  hiddenNavigatorBar, // 隐藏导航条 参数 0 和 1
  isMallSaleContainerApp, // 是否在销售App内   无参
  pushPayViewController, // 跳转支付页面   废弃 无参
  pushOCRAuthViewController, // 跳转到活体检测页面   无参数
  pushViewController, // 跳转到某个页面   参数 className: params 具体可调试查看
  livingAuthFinish, // 活体认证完成   实名认证完成后h5会调用原生方法，用于更新原生实名信息
};
