import React, { FC, useEffect, useState } from 'react';
import { connect, QueryDetailListModelState, ConnectProps } from 'alita';
import classnames from 'classnames';
import moment from 'moment';
import UpImg from '@/assets/img/customer/grayUp.png';
import DownImg from '@/assets/img/customer/grayDown.png';
import CallInImg from '@/assets/img/customer/callIn.png';
import CallOutImg from '@/assets/img/customer/callOut.png';
import styles from './index.less';
//

interface voiceProps extends ConnectProps {
  form: any;
  flag: boolean;
  changeFlag: () => void;
  queryDetailList: QueryDetailListModelState;
  phone: string;
}

const VoiceItem = ({ data = { date: '', dayInfo: [] } }) => {
  const [showFlag, setShowFlag] = useState(false);
  const { dayInfo = [] } = data;

  return (
    <div className={styles.voiceListItem}>
      <div className={styles.itemStyle}>
        <div className={styles.voiceTime}>{moment(data?.date).format('YYYY-MM-DD')}</div>
        <div className={styles.voiceRight} onClick={() => setShowFlag(!showFlag)}>
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
            <div className={styles.voiceFormItemStyle} key={index}>
              <div className={styles.voiceListForm1}>{it?.time || '-'}</div>
              <div className={styles.voiceListForm2}>
                <img
                  alt=""
                  src={it?.callType === '02' ? CallInImg : CallOutImg}
                  className={styles.callImg}
                />
                {it?.dialNumber || '-'}
              </div>
              <div className={styles.voiceListForm3}>{it?.callDuration || '-'}</div>
              <div className={styles.voiceListForm4}>{it?.site || '-'}</div>
              <div className={styles.voiceListForm5}>{it?.expense || '-'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Voice: FC<voiceProps> = (props) => {
  const { form, flag = false, phone = '', changeFlag, dispatch } = props;
  const [data, setData] = useState<any>({ voiceInfo: [] });
  const { voiceInfo = [] } = data;

  useEffect(() => {
    if (flag) {
      const formValue = form.getFieldsValue();
      if (formValue) {
        dispatch!({
          type: 'queryDetailList/qryVoiceDetailModel',
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
    <div className={styles.voiceStyle}>
      <div className={styles.voiceTop}>
        <div className={styles.voiceTopLeft}>
          <span className={styles.voiceText}>通话总数：</span>
          <span className={styles.voiceValue}>{data?.number} 条</span>
        </div>
        <div className={styles.voiceTopRight}>
          <span className={styles.voiceText}>费用合计：</span>
          <span className={styles.voiceValue}>{data?.amounts || '0.00'} 元</span>
        </div>
      </div>
      <div className={styles.listTop}>
        <div className={styles.voiceListForm1}>起始时间</div>
        <div className={styles.voiceListForm2}>对方号码</div>
        <div className={styles.voiceListForm3}>时长</div>
        <div className={styles.voiceListForm4}>地点</div>
        <div className={styles.voiceListForm5}>费用</div>
      </div>
      <div className={styles.voiceListDiv}>
        <div className={styles.voiceList}>
          {voiceInfo.map((item: any, index: number) => {
            return <VoiceItem key={index} data={item} />;
          })}
          {voiceInfo && voiceInfo.length === 0 && (
            <div className={styles.emptyText}>今天很懒，没有打电话哦～</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(({ queryDetailList }: { queryDetailList: QueryDetailListModelState }) => ({
  queryDetailList,
}))(Voice);
