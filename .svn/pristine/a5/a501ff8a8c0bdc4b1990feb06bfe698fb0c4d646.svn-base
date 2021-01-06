/* eslint-disable no-param-reassign */
import React, { FC, useState, useRef, useEffect } from 'react';
import { StarPkgModelState, ConnectProps, connect, history } from 'alita';
import DynamicForm, { IFormItemProps, Store, useForm, dateChange } from '@alitajs/dform';
import { Toast, Button } from 'antd-mobile';
import { Base64 } from 'js-base64';
import moment from 'moment';
import _ from 'lodash';
import { AllWhiteLoading } from '@/components';
import { FriendList } from '@/pages/starPkg/components';
import WaitPng from '@/assets/img/starPkg/waitWhite.png';
import FriendPng from '@/assets/img/starPkg/friendBg.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  starPkg: StarPkgModelState;
}

let timer: NodeJS.Timeout | null = null;

const StarHelpOrderPage: FC<PageProps> = ({ starPkg, dispatch, location }) => {
  const { orderNo = '' } = location.query;
  const [form] = useForm();
  const [codeText, setCodeText] = useState('获取验证码'); // 验证码文字
  const [friendData, setFriendData] = useState<any[]>([]); // 好友数据
  const [codeFail, updateCodeFail] = useState(false); // 是否有输出验证码
  const [btnFlag, setBtnFlag] = useState<boolean>(false); // 按钮是否可点击
  const [btnText, setBtnText] = useState('立即帮好友助力'); // 按钮上的文字
  const [detailData, setDetailData] = useState<any>();
  const [layoutHeight, setLayoutHeight] = useState(0); // 导航栏的高度
  const [loadingFlag, setLoadingFlag] = useState<boolean>(true); // 页面是否还在加载中的判断
  const [bFlag, setBFlag] = useState(true);
  let timerRef = useRef(60);

  useEffect(() => {
    setTimeout(() => {
      const hei = document.getElementsByClassName('am-navbar');
      if (hei && hei.length) {
        setLayoutHeight(hei[0].clientHeight);
      }
    }, 100);

    dispatch!({
      type: 'starHelp/qryBoostActivityInstDetailByIdModal',
      payload: {
        orderNo,
        activityId: '9998',
      },
    }).then((res: any) => {
      setDetailData(res);
      let { boostActivityDetailRspList = [], endDate = '' } = res;
      if (!boostActivityDetailRspList) boostActivityDetailRspList = [];
      setFriendData(boostActivityDetailRspList);
      setBtnFlag(true);
      if (endDate) {
        const endD = moment(new Date(dateChange(endDate))).valueOf();
        const nowDate = moment(new Date()).valueOf();
        if (nowDate > endD) {
          setBtnFlag(false);
          setBtnText('助力已结束');
        }
      }
    });
  }, []);

  /**
   * 短信验证码按钮点击事件
   */
  const getVerCode = () => {
    if (!form.getFieldValue('accNum')) {
      Toast.fail('联系电话不能为空', 1);
      return;
    }
    if (form.getFieldValue('accNum')?.length !== 11) {
      Toast.fail('联系电话输入格式有误', 1);
      return;
    }
    if (bFlag) {
      setBFlag(false);
      timer = setInterval(() => {
        timerRef.current = timerRef?.current - 1;
        setCodeText(`剩余${timerRef?.current}秒`);
        if (timerRef.current <= 1 && timer) {
          clearInterval(timer);
          timer = null;
          timerRef.current = 60;
          setCodeText('获取验证码');
          setBFlag(true);
        }
      }, 1000);
      dispatch!({
        type: 'orderSearch/genAppLoginMsgCode',
        payload: {
          phone: Base64.encode(form.getFieldValue('accNum')),
          callback: (flag: boolean) => {
            if (!flag && timer) {
              clearInterval(timer);
              timer = null;
              setCodeText('获取验证码');
              setBFlag(true);
            }
          },
        },
      });
    }
  };

  /**
   * 前往星座包页面
   */
  const goToStarPkg = () => {
    if (!detailData?.skuId) return;
    history.push({
      pathname: '/starPkg',
      query: {
        skuId: detailData?.skuId,
      },
    });
  };

  /**
   * 表单提交成功事件
   */
  const onFinish = (values: Store) => {
    const { accNum = '', code = '' } = values;
    if (accNum.length !== 11) {
      Toast.fail('联系电话格式不正确', 1);
      return;
    }
    if (code.length !== 6) {
      Toast.fail('验证码格式不正确', 1);
      return;
    }
    dispatch!({
      type: 'starHelp/checkCodeModal',
      payload: {
        phone: Base64.encode(accNum.trim()),
        smsCode: code.trim(),
      },
    }).then((res: any) => {
      const { success = true, errMessage = '' } = res;
      if (success) {
        dispatch!({
          type: 'starHelp/addBoostActivityInstDetailModal',
          payload: {
            boostAccNbre: accNum,
            boostActInstId: detailData?.boostActInstId,
            boostFriendsName: `*${accNum.substring(7, 11)}`,
          },
        }).then(() => {
          Toast.success('助力成功！', 2);
          setFriendData([
            ...friendData,
            {
              boostFriendsName: `${accNum.substring(7, 11)}`,
            },
          ]);
        });
      } else {
        Toast.fail(errMessage, 1);
      }
    });
  };

  /**
   * 表单提交失败事件
   */
  const onFinishFailed = ({ errorFields = [] }) => {
    Toast.fail(errorFields[0]?.errors[0], 1);
  };

  const formsData = ([
    {
      type: 'input',
      fieldProps: 'accNum',
      required: true,
      hasStar: false,
      placeholder: '请输入您的联系电话',
      title: '联系电话',
      inputType: 'number',
      maxLength: 11,
      coverStyle: {
        textAlign: 'left',
      },
      onBlur: (val: string) => {
        if (val && val?.length !== 11) {
          Toast.show('联系电话输入格式有误', 1);
        }
      },
    },
    {
      type: 'input',
      fieldProps: 'code',
      required: true,
      hasStar: false,
      placeholder: '请输入',
      title: '验证码',
      maxLength: 6,
      inputType: 'number',
      coverStyle: {
        textAlign: 'left',
      },
      extra: (
        <div className={styles.codeText} onClick={_.debounce(getVerCode, 500)}>
          {codeText}
        </div>
      ),
    },
  ] as unknown) as IFormItemProps[];

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    form,
    autoLineFeed: false,
    failScroll: false,
  };

  return (
    <div
      className={styles.starHelpOrderStyle}
      style={{ height: document.documentElement.clientHeight - layoutHeight }}
    >
      <div className={styles.imgDiv}>
        <img
          src={FriendPng}
          alt=""
          className={styles.friendImg}
          onLoad={() => setLoadingFlag(false)}
        />
        <div className={styles.hideBtn} onClick={goToStarPkg} param-action="helpGoStarPkg" />
      </div>
      <div className={styles.starHelpOrderContainer}>
        <div className={styles.frame}>
          <DynamicForm {...formProps} />
          <div className={styles.btnDiv}>
            <Button className={styles.btn} disabled={!btnFlag} onClick={() => form.submit()}>
              <div className={styles.btns} param-action="helpActivityFriend">
                {btnText}
              </div>
            </Button>
          </div>
          <div className={styles.titleText}>
            <img src={WaitPng} alt="" className={styles.waitImg} />
            <div className={styles.text}>好友助力进度{friendData?.length}/9</div>
            <img src={WaitPng} alt="" className={styles.waitImg} />
          </div>
          <FriendList data={friendData} mode="dark" />
          {loadingFlag && <AllWhiteLoading />}
        </div>
      </div>
    </div>
  );
};

export default connect(({ starPkg }: { starPkg: StarPkgModelState }) => ({
  starPkg,
}))(StarHelpOrderPage);
