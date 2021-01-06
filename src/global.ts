// import '../public/collection-1.3.1';
// import Utils from '@/utils/tool';
import io from 'socket.io-client';
import { checkVersionForClearTokenCode } from '@/utils';

const windows: any = window as any;
(windows as any).isLogin = true;
windows.reqUrl = '';
//
// if (windows.openProxy) {
//   windows.reqUrl = '';
//   console.log('代理已打开');
// } else if (windows.ENV === 'dev') {
//   console.log('开发环境');
//   windows.reqUrl = 'http://10.45.46.40:10000'; // 开发环境
// } else if (windows.ENV === 'test') {
//   console.log('测试环境');
//   windows.reqUrl = 'http://10.45.46.226:8086'; // 测试环境
// } else {
//   windows.reqUrl = 'http://182.42.226.4:10000'; // 生产
// }

export let WS_URL = 'https://pai3.189.cn:10000';
const COLLECT_URL = 'https://pai.189.cn/';

WS_URL = window.location.origin;
if (WS_URL.indexOf('pai') !== -1) {
  WS_URL = 'https://pai3.189.cn:10000';
}
console.log(WS_URL);

export const OUT_WS_URL = `${WS_URL}/online-mobile/#/?tokenCode=`;

// 客服中心socket 连接
(windows as any).socket = null;

(windows as any).connectSocket = () => {
  (windows as any).socket = io(WS_URL, {
    query: {
      accessToken: localStorage.getItem('tokenCode') || '',
    },
    // path: '/socket/socket.io',
    transports: ['websocket'],
  });
  window.socket.on('connect', function (s) {
    console.log('链接成功');
    console.log(window.socket);
  });
};

(windows as any).sendSocketMsg = (params: any) => {
  (windows as any).socket.emit('messageEvent', params);
};
// const isApplets = Utils.getQueryString('isApplets');

// if (isApplets === '1') {
//   windows.hideNavBar = true;
// } else {
//   windows.hideNavBar = false;
// }

window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
};

if (whaleCollect) {
  whaleCollect.config({
    app_key: 'h5_newSell_202010',
    server_url: `${COLLECT_URL}event-tracking-inf/event/webBpCollect`,
    // page_info_keys: "productId|shopId",
    // 使用string的方式
    // filter_send: 'id',
    // 使用Function方式
    // filter_send: function (params, event) {
    //   var target = event.target || event.srcElement;
    //   // 如果自身id不存在id,且其最终祖先元素的id为root的情况下,返回false,不发送请求
    //   return !(target.id === "" && params.eTargetId === "root");
    // },
    use_parent_id: true,
  });
}

// 浏览器 左侧小标签 favicon
// const favicon = document.createElement('link');
// favicon.href = 'favicon.ico';
// favicon.type = 'image/x-icon';
// favicon.rel = 'rel';
// document.head.appendChild(favicon);

// 人脸识别
// console.log('whaleFace begin');
// if (whaleFace) {
//   console.log('whaleFace', whaleFace);
//   whaleFace.config({
//     // app_key: '******你的app id******', // 目前不需要
//     // server_url: 'http://localhost:8080/xxx', // 目前不需要
//     modelPath: './models', // face-api 检测人脸需要的models文件夹路径
//   });
// }

/**
 * 校验下版本后，若非新版本，则清空 tokenCode
 */
checkVersionForClearTokenCode();

/**
 * 小程序通信引入
 */
let script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';
document.head.appendChild(script);
