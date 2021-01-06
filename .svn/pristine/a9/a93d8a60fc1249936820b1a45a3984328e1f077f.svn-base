import { Request, Response } from 'express';

export default {
  'POST /api/hello': {
    text: 'Alita',
  },
  '/portal/getH5Configuration': (req: Request, res: Response) => {
    return res.json({
      success: true,
    });
  },
  'POST /api/list': (req: Request, res: Response) => {
    const dataSource = [
      {
        id: 1,
        title: 'Ant Design Title 1',
      },
      {
        id: 2,
        title: 'Ant Design Title 2',
      },
      {
        id: 3,
        title: 'Ant Design Title 3',
      },
      {
        id: 4,
        title: 'Ant Design Title 4',
      },
      {
        id: 5,
        title: 'Ant Design Title 5',
      },
      {
        id: 6,
        title: 'Ant Design Title 6',
      },
      {
        id: 7,
        title: 'Ant Design Title 7',
      },
      {
        id: 8,
        title: 'Ant Design Title 8',
      },
      {
        id: 9,
        title: 'Ant Design Title 9',
      },
      {
        id: 10,
        title: 'Ant Design Title 10',
      },
      {
        id: 11,
        title: 'Ant Design Title 11',
      },
      {
        id: 12,
        title: 'Ant Design Title 12',
      },
      {
        id: 13,
        title: 'Ant Design Title 13',
      },
      {
        id: 14,
        title: 'Ant Design Title 14',
      },
      {
        id: 15,
        title: 'Ant Design Title 15',
      },
      {
        id: 16,
        title: 'Ant Design Title 16',
      },
      {
        id: 17,
        title: 'Ant Design Title 17',
      },
      {
        id: 18,
        title: 'Ant Design Title 18',
      },
      {
        id: 19,
        title: 'Ant Design Title 19',
      },
      {
        id: 20,
        title: 'Ant Design Title 20',
      },
    ];
    const { body } = req;

    const { pageSize, offset } = body;
    return res.json({
      total: dataSource.length,
      data: dataSource.slice(offset, offset + pageSize),
    });
  },
  'POST /api/myOrderlist': (req: Request, res: Response) => {
    const dataSource = [
      {
        orderId: '23432424',
        storeName: '广东电信',
        totalAmount: '10999',
        orderState: '已完成',
        storeList: [
          {
            skuName: '全国通用流量40元20G',
            skuPicFileId: 2222,
            skuPrice: 40,
            promotionPrice: '促销价',
            realAmount: '实付价',
            skuQuantity: 1,
            skuAttr: { data: '20G' },
          },
          { skuName: '接入电话', skuPicFileId: 2223, skuAttr: { data: '18912345678' } },
          { skuName: '接入电话', skuPicFileId: 2223, skuAttr: { data: '18912345678' } },
          { skuName: '接入电话', skuPicFileId: 2223, skuAttr: { data: '18912345678' } },
          { skuName: '接入电话', skuPicFileId: 2223, skuAttr: { data: '18912345678' } },
          { skuName: '接入电话', skuPicFileId: 2223, skuAttr: { data: '18912345678' } },
        ],
      },
      {
        orderId: '23432424',
        storeName: '中国电信自营商',
        totalAmount: '10999',
        orderState: '已完成',
        storeList: [
          {
            skuName: '苹果Apple iphone 11 手机 全网通 智能手机 香槟金 4…',
            skuPicFileId: 2222,
            skuPrice: 40,
            promotionPrice: '促销价',
            realAmount: '实付价',
            skuQuantity: 1,
            skuAttr: { data: '香槟金，256GB' },
          },
        ],
      },
      {
        orderId: '23432424',
        storeName: '中国电信自营商',
        totalAmount: '10999',
        orderState: '待付款',
        storeList: [
          {
            skuName: '苹果Apple iphone 11 手机 全网通 智能手机 香槟金 4…',
            skuPicFileId: 2222,
            skuPrice: 40,
            promotionPrice: '促销价',
            realAmount: '实付价',
            skuQuantity: 1,
            skuAttr: { data: '香槟金，256GB' },
          },
        ],
      },
    ];
    const { body } = req;

    const { pageSize, offset } = body;
    return res.json({
      total: dataSource.length,
      data: dataSource.slice(offset, offset + pageSize),
    });
  },
  'POST /api/orderDetail': {
    storeName: '店铺名称',
    orderNbr: '订单编码',
    orderTime: '下单时间',
    payTypeName: '在线支付',
    payTime: '2020-5-21',
    totalAmount: 40, // --商品金额
    shipAmount: 0, // --运费
    payAmount: 40, // --订单价格
    receiverInfo: {
      receiverName: '收货人名称',
      receiverPhone: '137XXXX2343',
      receiverDetailAddress: '收货人详细地址',
    },
    storeList: [
      {
        skuName: '全国通用流量40元20G',
        skuPicFileId: 2222,
        skuPrice: 40, // --sku价格
        promotionPrice: '促销价',
        realAmount: '实付价',
        skuQuantity: 1,
        skuAttr: { 流量: '20G' },
      },
      {
        skuName: '接入电话',
        skuPicFileId: 2223,
        skuPrice: 0,
        promotionPrice: '促销价',
        realAmount: '实付价',
        skuQuantity: 1,
        skuAttr: { 号码: '18912345678' },
      },
    ],
  },
  'POST /api/beEvalute': (req: Request, res: Response) => {
    const dataSource = [
      {
        id: 1,
        imgSrc: '',
        goodsName: '全球通家庭版套餐100M宽带全球通家庭版套餐100M宽带全球通家庭版套餐100M宽带',
        count: '88.90',
        source: '电信自营',
      },
      {
        id: 2,
        imgSrc: '',
        goodsName: '全球通家庭版套餐100M宽带',
        count: '99.97',
        source: '电信自营',
      },
      {
        id: 1,
        imgSrc: '',
        goodsName: '全球通家庭版套餐100M宽带',
        count: '889',
        source: '电信自营',
      },
    ];
    const { body } = req;

    const { pageSize, offset } = body;
    return res.json({
      total: dataSource.length,
      data: dataSource.slice(offset, offset + pageSize),
    });
  },

  'POST /api/queryRegionsList': {
    resultCode: '0',
    resultMsg: 'SUCCESS',
    errorType: '1',
    resultData: [
      {
        regionId: '1',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '北京',
        regionCode: null,
      },
      {
        regionId: '10',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '黑龙江',
        regionCode: null,
      },
      {
        regionId: '11',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '内蒙古',
        regionCode: null,
      },
      {
        regionId: '12',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '江苏',
        regionCode: null,
      },
      {
        regionId: '14',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '安徽',
        regionCode: null,
      },
      {
        regionId: '13',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '山东',
        regionCode: null,
      },
      {
        regionId: '15',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '浙江',
        regionCode: null,
      },
      {
        regionId: '16',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '福建',
        regionCode: null,
      },
      {
        regionId: '17',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '湖北',
        regionCode: null,
      },
      {
        regionId: '18',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '湖南',
        regionCode: null,
      },
      {
        regionId: '19',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '广东',
        regionCode: null,
      },
      {
        regionId: '2',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '上海',
        regionCode: null,
      },
      {
        regionId: '20',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '广西',
        regionCode: null,
      },
      {
        regionId: '22',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '四川',
        regionCode: null,
      },
      {
        regionId: '21',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '江西',
        regionCode: null,
      },
      {
        regionId: '23',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '海南',
        regionCode: null,
      },
      {
        regionId: '24',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '贵州',
        regionCode: null,
      },
      {
        regionId: '32',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '台湾',
        regionCode: null,
      },
      {
        regionId: '25',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '云南',
        regionCode: null,
      },
      {
        regionId: '28',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '甘肃',
        regionCode: null,
      },
      {
        regionId: '29',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '青海',
        regionCode: null,
      },
      {
        regionId: '27',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '陕西',
        regionCode: null,
      },
      {
        regionId: '52993',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '港澳',
        regionCode: null,
      },
      {
        regionId: '3',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '天津',
        regionCode: null,
      },
      {
        regionId: '30',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '宁夏',
        regionCode: null,
      },
      {
        regionId: '31',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '新疆',
        regionCode: null,
      },
      {
        regionId: '26',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '西藏',
        regionCode: null,
      },
      {
        regionId: '5',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '河北',
        regionCode: null,
      },
      {
        regionId: '4',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '重庆',
        regionCode: null,
      },
      {
        regionId: '84',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '钓鱼岛',
        regionCode: null,
      },
      {
        regionId: '9',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '吉林',
        regionCode: null,
      },
      {
        regionId: '6',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '山西',
        regionCode: null,
      },
      {
        regionId: '8',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '辽宁',
        regionCode: null,
      },
      {
        regionId: '7',
        parentRegionId: null,
        regionPath: ',',
        regionGrade: '1',
        regionName: '河南',
        regionCode: null,
      },
    ],
  },
};
