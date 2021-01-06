import React, { FC, useEffect, useState } from 'react';
import { QueryDetailListModelState, ConnectProps, connect, router } from 'alita';
import { Tabs } from 'antd-mobile';
import moment from 'moment';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
  dateChange,
} from '@alitajs/dform';
import Util from '@/utils/tool';
import { Flow, Note, Voice } from '../components';
import DetailPhoneBgImg from '@/assets/img/customer/detailPhoneBg.png';
import BackImg from '@/assets/img/back_white.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  queryDetailList: QueryDetailListModelState;
}

const DetailListPage: FC<PageProps> = ({ queryDetailList, dispatch, location }) => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState({});
  const [changeFlag, setChangeFlag] = useState<boolean[]>([false, false, false]);
  const [phone] = useState<string>(location?.query?.phone || '');

  const tabs = [
    { title: '流量', sub: '1' },
    { title: '语音', sub: '2' },
    { title: '短信', sub: '3' },
  ];

  useEffect(() => {
    document.getElementsByClassName('rumtime-keep-alive-layout-no')[0].style.height = '100%';
    setFormsValues({
      endTime: dateChange(new Date()),
      beginTime: dateChange(moment().subtract(7, 'days')),
    });
    setChangeFlag([true, true, true]);
  }, []);

  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const changeFlagEvent = (num: number) => {
    let newChangeFlag = JSON.parse(JSON.stringify(changeFlag));
    newChangeFlag[num] = false;
    setChangeFlag(newChangeFlag);
  };

  const formsData = [
    {
      type: 'rangeDatePicker',
      fieldProps: 'beginTime',
      fieldProps2: 'endTime',
      title: '详单日期',
      positionType: 'horizontal',
      firstProps: {
        onChange: (e: any) => {
          const formEndTime = form.getFieldValue('endTime');
          let endTime = moment(e).add(7, 'days');
          if (endTime > new Date()) endTime = new Date(); // 判断结束时间是否超过当前时间
          // 判断如果结束时间和开始时间大于7天的话，则修改结束时间为 开始时间的后7天
          if (moment(formEndTime).subtract(7, 'days') > e) {
            setFormsValues({
              endTime: dateChange(endTime),
            });
          }
          setChangeFlag([true, true, true]);
        },
      },
      secondProps: {
        onChange: (e: any) => {
          const formBeginTime = form.getFieldValue('beginTime');
          if (moment(formBeginTime).add(7, 'days') < e) {
            setFormsValues({
              beginTime: dateChange(moment(e).subtract(7, 'days')),
            });
          }
          setChangeFlag([true, true, true]);
        },
      },
      maxDate: new Date(),
    },
  ] as IFormItemProps[];

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
  };

  return (
    <div className={styles.detailListStyle}>
      <div className={styles.dlHeader}>
        <div className={styles.dlHeaderTitle}>
          <div className={styles.title}>详单查询</div>
          <div className={styles.backDiv}>
            <img src={BackImg} alt="" className={styles.back} onClick={() => router.goBack()} />
          </div>
        </div>
        <div className={styles.dlHeaderContent}>
          <div className={styles.textContent}>
            <div className={styles.text}>手机号码</div>
            <div className={styles.phone}>{Util.phoneNumberDesensit(phone)}</div>
          </div>
          <img src={DetailPhoneBgImg} alt="" className={styles.detailPhoneBg} />
        </div>
      </div>
      <div className={styles.dlCenter}>
        <div className={styles.selectTime}>
          <DynamicForm {...formProps} />
          <Tabs tabs={tabs} prerenderingSiblingsNumber={0}>
            <Flow
              form={form}
              flag={changeFlag[0]}
              changeFlag={() => {
                changeFlagEvent(0);
              }}
              phone={phone}
            />
            <Voice
              form={form}
              flag={changeFlag[1]}
              changeFlag={() => {
                changeFlagEvent(1);
              }}
              phone={phone}
            />
            <Note
              form={form}
              flag={changeFlag[2]}
              changeFlag={() => {
                changeFlagEvent(2);
              }}
              phone={phone}
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default connect(({ queryDetailList }: { queryDetailList: QueryDetailListModelState }) => ({
  queryDetailList,
}))(DetailListPage);
