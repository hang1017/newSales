/**
 * 页面类型
 */
export const PageType = {
  login: 'login', // 登录
  register: 'register', // 注册
  forgetPw: 'forgetPw', // 忘记密码
};

/**
 * 订单类型
 */
export const OrderType = {
  product: 'product', // 商品
  broadband: 'broadband', // 宽带
  recharge: 'recharge', // 充值
};

/**
 * 订单状态
 */
export const OrderState = {
  waitPay: '1000', // 待付款
  waitRecieve: '1100', // 待收货,即  已付款
  finish: '1900', // 已完成
  canceled: '2000', // 已取消

  waitRefund: '1200', // 待退款
  waitPrint: '1300', // 等待打印
  waitOutLibrary: '1400', // 等待出库
  waitPack: '1500', // 等待打包
  waitDelivery: '1600', // 等待发货
  waitSureDelivery: '1700', //  等待确认发货
  pickSelf: '1800', //  上门自提
  closed: '2100', //   已关闭
  pause: '2200', //   暂停
  unArrivalGoods: '2300', //   无法到货
  waitDredge: '2400', //   待开通
};

/**
 * 订单来源
 */

export const SourceType = {
  fromAPP: '1000', // App
  fromPC: '1200', // PC
  fromBli: '1300', // b站
  fromJD: '1400', // 京东
};

/**
 * 地址类型
 */
export const AddressType = {
  default: '1000', // 默认地址
  unDefalut: '2000', // 非默认地址
};

/**
 * 星级评分
 */
export const StarScore = {
  one: 1100, // 一星
  two: 1200, // 二星
  three: 1300, // 三星
  four: 1400, // 四星
  five: 1500, // 五星
};

/**
 * 评价状态
 */
export const EvaluateState = {
  draft: 1000, // 草稿
  pass: 1100, // 已审核通过的评价
  unPass: 1200, // 审核不通过的评价
  choiceness: 1300, // 被平台判定为非法
  beComplaint: 1400, // 已被卖家投诉
  beReport: 1500, // 已被举报
  unMean: 1600, // 无意义评价
};

/**
 * 评价类型
 */
export const EvaluateType = {
  buyerEvaluate: 1000, // 买家评价
  buyerAddEvaluate: 1100, // 买家追评
  systemEvaluate: 1200, // 系统评论
};

/**
 * 文件类型
 */
export const FileType = {
  question: '1000', // 问题提问
  firstAnser: '1100', // 一级回答
  secondAnser: '1200', // 二级回答
  buyerEvaluate: '1300', // 买家评价
  buyerAddEvaluate: '1400', // 买家追评
  firstComment: '1500', // 一级评论
  secondComment: '1600', // 二级评论
  sellerReply: '1700', // 店家回复
};

/**
 * 评价种类
 */
export const EvaluateKinds = {
  goods: 'goods', // 商品描述
  logistics: 'logistics', // 物流
  service: 'service', // 店铺服务
};

/**
 * 选择弹框的类型
 */
export const SelectAlertType = {
  phone: 'phone', // 选择手机号
  broadband: 'broadband', // 选择宽带
  tv: 'tv', // 选择宽带电视
};

export const OrderStatusText = {
  '1000': '待付款',
  '1100': '待收货', // 即  已付款
  '1900': '已完成', // 已完成，需要展示成图片
  '2000': '已取消',
  '1200': '待退款',
  '1300': '等待打印',
  '1400': '等待出库',
  '1500': '等待打包',
  '1600': '等待发货',
  '1700': '等待确认收货',
  '1800': '上门自提',
  '2100': ' 已关闭',
  '2200': ' 暂停',
  '2300': '无法到货',
  '2400': '待开通',
  '3100': '售后中',
};

/**
 * 系统参数
 */

export const sysParams = {
  sectParams: 'app.sect.flag', // 是否开启圈子
  slidVerify: 'app.slidVerify.flag', // 是否开启滑块验证
  publishStatus: 'app.publishStatus.flag', // 是否升级标识
  livingCheck: 'app.livingCheck.flag', // 活体检测的标识
};
