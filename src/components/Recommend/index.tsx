import React from 'react';

import { Grid } from 'antd-mobile';
import PageTitle from '@/components/PageTitle';

import baiIcon from '@/assets/img/recommend/baidu.png';
import iphoneIcon from '@/assets/img/recommend/iphone.png';
import iwatchIcon from '@/assets/img/recommend/iwatch.png';
import znjjIcon from '@/assets/img/recommend/znjj.png';

import style from './index.less';

interface EmptyItem {
  listData?: any;
  onClick?: (el: Object, index: number) => void;
}

const Page: React.FC<EmptyItem> = (props) => {
  const dataList = [
    {
      icon: iphoneIcon,
      title: '苹果Apple iphone 11 手机 全网通智能手机 绿…',
      price: '5999.00',
    },
    {
      icon: znjjIcon,
      title: '科沃斯扫地机器人扫拖一体机智能家用吸尘器吸…',
      price: '5999.00',
    },
    {
      icon: baiIcon,
      title: '小度智能音箱百 度智能音响海量资源生活助…',
      price: '5999.00',
    },
    {
      icon: iwatchIcon,
      title: 'Amazht GTS 智能手表运动手表14天续航50..',
      price: '5999.00',
    },
  ];
  const { listData = dataList, onClick } = props;
  const imgWidth = (document.documentElement.clientWidth - 120) / 2;

  return (
    <div>
      <PageTitle text="为你推荐" />
      <div className={style.recommendBlock}>
        <Grid
          data={listData}
          hasLine={false}
          onClick={onClick}
          columnNum={2}
          renderItem={(dataItem: any) => (
            <div className={style.recommend}>
              <img src={dataItem.icon} alt="" style={{ width: imgWidth }} />
              <div className={style.proTitle}>{dataItem.title}</div>
              <div className={style.price}>
                <span>￥</span>
                {dataItem.price}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Page;
