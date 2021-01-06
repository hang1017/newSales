import React, { FC, useState, useEffect } from 'react';
import { connect, QueryDetailListModelState, ConnectProps } from 'alita';
import classnames from 'classnames';
import moment from 'moment';
import UpImg from '@/assets/img/customer/grayUp.png';
import DownImg from '@/assets/img/customer/grayDown.png';
import styles from './index.less';
//

interface FlowProps extends ConnectProps {
  form: any;
  flag: boolean;
  changeFlag: () => void;
  queryDetailList: QueryDetailListModelState;
  phone: string;
}

const BUSSINESS_MENU = {
  '1': '通用',
  '2': '定向',
};

const FlowItem = ({ data = { date: '', dayInfo: [] } }) => {
  const [showFlag, setShowFlag] = useState(false);
  const { dayInfo = [] } = data;
  return (
    <div className={styles.flowListItem}>
      <div className={styles.itemStyle}>
        <div className={styles.flowTime}>{moment(data?.date).format('YYYY-MM-DD')}</div>
        <div className={styles.flowRight} onClick={() => setShowFlag(!showFlag)}>
          {showFlag ? '收起' : '展开'}
          <img src={showFlag ? UpImg : DownImg} alt="" className={styles.upAndDownImg} />
        </div>
      </div>
      <div
        className={classnames({
          [styles.itemFormStyle]: true,
          [styles.heightNone]: !showFlag,
        })}
      >
        {dayInfo.map((it: any, index: number) => {
          return (
            <div className={styles.flowFormItemStyle} key={index}>
              <div className={styles.flowListForm1}>{it?.time || '-'}</div>
              <div className={styles.flowListForm2}>{it?.internetDuration || '-'}</div>
              <div className={styles.flowListForm3}>{it?.flow || '0.00KB'}</div>
              <div className={styles.flowListForm4}>{BUSSINESS_MENU[it?.business] || '-'}</div>
              <div className={styles.flowListForm5}>{it?.expense || '-'}</div>
            </div>
          );
        })}
        {dayInfo && dayInfo.length === 0 && (
          <div className={styles.emptyText}>今天很懒，没有上网哦～</div>
        )}
      </div>
    </div>
  );
};

const Flow: FC<FlowProps> = (props) => {
  const { form, flag = false, phone = '', changeFlag, dispatch } = props;
  const [data, setData] = useState<any>({ flowInfo: [] });
  const { flowInfo = [] } = data;

  useEffect(() => {
    if (flag) {
      const formValue = form.getFieldsValue();
      if (formValue) {
        dispatch!({
          type: 'queryDetailList/qryFlowDetailModel',
          payload: {
            endDate: moment(formValue?.endTime).format('YYYY-MM-DD'),
            mobile: phone,
            queryDate: moment(new Date()).format('YYYY-MM-DD'),
            startDate: moment(formValue?.beginTime).format('YYYY-MM-DD'),
            timestamp: new Date().getTime(),
            userType: '0',
          },
        }).then((res: any) => {
          console.log(res);
          setData(res);
        });
      }
    }
    changeFlag();
  }, [flag]);

  return (
    <div className={styles.flowStyle}>
      <div className={styles.flowTop}>
        <div className={styles.flowTopLeft}>
          <span className={styles.flowText}>流量合计：</span>
          <span className={styles.flowValue}>{data?.flowTotal}</span>
        </div>
        <div className={styles.flowTopRight}>
          <span className={styles.flowText}>费用合计：</span>
          <span className={styles.flowValue}>{data?.amounts || '0.00'} 元</span>
        </div>
      </div>
      <div className={styles.listTop}>
        <div className={styles.flowListForm1}>起始时间</div>
        <div className={styles.flowListForm2}>上网时长</div>
        <div className={styles.flowListForm3}>流量</div>
        <div className={styles.flowListForm4}>类型</div>
        <div className={styles.flowListForm5}>费用</div>
      </div>
      <div className={styles.flowListDiv}>
        <div className={styles.flowList}>
          {flowInfo.map((item: any, index: number) => {
            return <FlowItem key={index} data={item} />;
          })}
          {flowInfo && flowInfo.length === 0 && (
            <div className={styles.emptyText}>今天很懒，一条信息都没发哦～</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(({ queryDetailList }: { queryDetailList: QueryDetailListModelState }) => ({
  queryDetailList,
}))(Flow);
