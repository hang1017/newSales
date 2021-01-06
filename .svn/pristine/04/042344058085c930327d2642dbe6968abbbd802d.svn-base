/**
 * 对购物车的选择的数据进行操作
 * @param data
 */
export const getGoodsInfoList = (data: any) => {
  const { storeList, selectGoodsList, checked = '' } = data;
  const goodsList: any = [];
  storeList.map((item: any) => {
    item.goodsList.map((childItem: any) => {
      const { skuId, quantity } = childItem;
      const tempObj = {
        skuId,
        quantity,
      };
      if (selectGoodsList.has(skuId)) {
        if (checked) {
          goodsList.push({
            ...tempObj,
            checked: 1,
          });
        } else {
          goodsList.push({ ...tempObj });
        }
      } else if (checked) {
        goodsList.push({
          ...tempObj,
          checked: 0,
        });
      }
    });
  });
  return goodsList;
};

/**
 * 获取地址数据
 * @param data
 */
export const getAddrListData = (data: any) => {
  const newData: any[] = [];
  data.forEach((element: any) => {
    newData.push({
      label: element.areaName,
      value: element.areaId,
      lanId: element.lanId,
      provinceId: element.parentId,
    });
  });
  return newData;
};
