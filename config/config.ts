// const testUrl = 'http://10.45.46.40:10000'; //开发
// const testUrl = 'http://10.45.46.226:8086'; //测试
// const testUrl = 'https://pai.189.cn:10000'; //生产
// const testUrl = ''; //测试
// const testUrl = 'http://10.45.103.141:8080'; // 李伟本机
// const testUrl = 'http://10.45.103.97:8089'; // 黄晓明本机
const testUrl = 'http://182.42.226.7:10000'; // 验收
// const testUrl = 'https://pai3.189.cn:10004'; // 灰度
// const testUrl = 'http://10.45.102.197:8080'; // 林斌本机

export default {
  appType: 'h5',
  mobileLayout: true,
  hash: true,
  // history: {
  //   type: 'browser',
  // },
  // dynamicImport: {},
  keepalive: [
    '/shopProcess/goodsDetail',
    '/customerHoney',
    '/personCenter/invoice',
    '/nepia',
    // '/bili/commitOrder',//取消保活，解决[2206163]H5填写订单页面，金额没有刷新问题
    // '/selectNumber',
  ],
  theme: {
    '@alita-dform-title-color': '#696D6C',
    '@alita-dform-title-font-size': '0.32rem',
    '@alita-dform-select-font-size': '0.32rem',
    '@color-text-disabled': '#95969C',
    '@alita-dform-placeholder': '#B3B5B7',
  },
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/polarisApp/',
  // base: process.env.NODE_ENV === 'production' ? './' : '/polarisApp/',
  publicPath: './',
  proxy: {
    '/consumer': {
      target: testUrl,
      changeOrigin: true,
    },
    '/mms': {
      target: testUrl,
      changeOrigin: true,
    },
    '/bms': {
      target: testUrl,
      changeOrigin: true,
    },
    '/tms': {
      target: testUrl,
      changeOrigin: true,
    },
    '/oms': {
      target: testUrl,
      changeOrigin: true,
    },
    '/cms': {
      target: testUrl,
      changeOrigin: true,
    },
    '/stafforg': {
      target: testUrl,
      changeOrigin: true,
    },
    '/portal': {
      target: testUrl,
      changeOrigin: true,
    },
    '/yys-dx-download': {
      target: 'http://182.42.226.4:9300',
      changeOrigin: true,
    },
  },
  retainLog: true,
  chunks: ['vendors', 'alita', 'other', 'umi'],
  chainWebpack(config: any) {
    config.optimization.splitChunks({
      chunks: 'all',
      automaticNameDelimiter: '～',
      name: true,
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        alita: {
          name: 'alita',
          test: /[\\/]node_modules[\\/](moment|antd|@alitajs|better-scroll)[\\/]/,
          priority: -9,
          enforce: true,
        },
        other: {
          name: 'other',
          test: /[\\/]node_modules[\\/](core-js|antd-mobile|lodash|moment|lottie-web)[\\/]/,
          priority: -10,
          enforce: true,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -11,
          enforce: true,
        },
      },
    });
  },
};
