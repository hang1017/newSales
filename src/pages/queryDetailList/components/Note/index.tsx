import React, { FC, useEffect, useState } from 'react';
import { connect, QueryDetailListModelState, ConnectProps } from 'alita';
import classnames from 'classnames';
import Util from '@/utils/tool';
import UpImg from '@/assets/img/customer/grayUp.png';
import DownImg from '@/assets/img/customer/grayDown.png';
import CallInImg from '@/assets/img/customer/callIn.png';
import moment from 'moment';
import CallOutImg from '@/assets/img/customer/callOut.png';
import styles from './index.less';
//

interface NoteProps extends ConnectProps {
  form: any;
  flag: boolean;
  changeFlag: () => void;
  queryDetailList: QueryDetailListModelState;
  phone: string;
}

const NoteItem = ({ data = { date: '', dayInfo: [] } }) => {
  const [showFlag, setShowFlag] = useState(false);
  const { dayInfo = [] } = data;
  return (
    <div className={styles.noteListItem}>
      <div className={styles.itemStyle}>
        <div className={styles.noteTime}>{moment(data?.date).format('YYYY-MM-DD')}</div>
        <div className={styles.noteRight} onClick={() => setShowFlag(!showFlag)}>
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
            <div className={styles.noteFormItemStyle} key={index}>
              <div className={styles.noteListForm1}>{it?.time || '-'}</div>
              <div className={styles.noteListForm2}>{it?.dialNumber || '-'}</div>
              <div className={styles.noteListForm3}>{it?.expense || '-'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Note: FC<NoteProps> = (props) => {
  const { form, flag = false, changeFlag, phone, dispatch } = props;
  const [data, setData] = useState<any>({ messageInfo: [] });
  const { messageInfo = [] } = data;

  useEffect(() => {
    if (flag) {
      const formValue = form.getFieldsValue();
      if (formValue) {
        dispatch!({
          type: 'queryDetailList/qryMessageDetailModel',
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
    <div className={styles.noteStyle}>
      <div className={styles.noteTop}>
        <div className={styles.noteTopLeft}>
          <span className={styles.noteText}>短信总数：</span>
          <span className={styles.noteValue}>{data?.number} 条</span>
        </div>
        <div className={styles.noteTopRight}>
          <span className={styles.noteText}>费用合计：</span>
          <span className={styles.noteValue}>0.00 元</span>
        </div>
      </div>
      <div className={styles.listTop}>
        <div className={styles.noteListForm1}>发送时间</div>
        <div className={styles.noteListForm2}>对方号码</div>
        <div className={styles.noteListForm3}>费用</div>
      </div>
      <div className={styles.noteListDiv}>
        <div className={styles.noteList}>
          {messageInfo.map((item: any, index: number) => {
            return <NoteItem key={index} data={item} />;
          })}
          {messageInfo && messageInfo.length === 0 && (
            <div className={styles.emptyText}>今天很懒，一条信息都没发哦～</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(({ queryDetailList }: { queryDetailList: QueryDetailListModelState }) => ({
  queryDetailList,
}))(Note);
