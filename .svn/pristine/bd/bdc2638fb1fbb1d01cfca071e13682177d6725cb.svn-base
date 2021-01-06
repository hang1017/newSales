import React, { FC, useEffect, useRef, useState } from 'react';
import { OrderSearchModelState, ConnectProps, connect, history } from 'alita';
import { Toast } from 'antd-mobile';
import { encode } from '@/utils/base64.min.js';

import styles from './index.less';
import IconIdCard from '@/assets/img/orderSearch/idcard.png';
import IconPhone from '@/assets/img/orderSearch/phone.png';
import IconVercode from '@/assets/img/orderSearch/vercode.png';

interface PageProps extends ConnectProps {
  orderSearch: OrderSearchModelState;
}

let seccond: number = 60;

const OrderSearchPage: FC<PageProps> = ({ orderSearch, dispatch }) => {
  const refPhone = useRef();
  const refIdCard = useRef();
  const refVerCode = useRef();
  const [fSecond, setFSecond] = useState(60);
  const [timewait, setTimewait] = useState(false);
  const [verCodeBtnText, setVerCodeBtnText] = useState('获取验证码');
  // 这里发起了初始化请求
  useEffect(() => {
    // dispatch!({
    //   type: 'orderSearch/addUserMember',
    //   payload: {
    //     phone: '18149540924',
    //     pwd: '053015'
    //   }
    // })
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);

  const startTimer = () => {
    setTimewait(true);
    const timer = setInterval(() => {
      if (seccond === 0) {
        setTimewait(false);
        setVerCodeBtnText('重新发送');
        setFSecond(60);
        clearInterval(timer);
        seccond = 60;
        return;
      }
      setFSecond(seccond--);
    }, 1000);
  };

  const submitHandle = () => {
    const idCard = (refIdCard.current as any).value;
    const phone = (refPhone.current as any).value;
    const verCode = (refVerCode.current as any).value;

    // 校验phone
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      Toast.fail('手机号码格式有误');
      return;
    }

    if (!/^[0-9xX]{6}$/.test(idCard)) {
      Toast.fail('身份证后6位格式有误');
      return;
    }

    if (verCode.length !== 6) {
      Toast.fail('验证码格式不正确');
      return;
    }

    dispatch!({
      type: 'orderSearch/loginToken',
      payload: {
        sourceFrom: 'BSITE',
        username: phone,
        password: encode(idCard),
        smsCode: verCode,
        callback: () => {
          history.push({
            pathname: '/bili/orderList',
            query: {
              idCard,
              phone,
              verCode,
            },
          });
        },
      },
    });
  };
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { name } = orderSearch;
  return (
    <div className={styles.orderSearch}>
      <div className={styles.container}>
        <div className={styles.title}>查询您的号卡订单</div>
        <div className={styles.formView}>
          <div className={styles.formItem}>
            <img src={IconPhone} alt="" />
            <input ref={refPhone} maxLength={11} placeholder="下单时的收货手机号码" />
          </div>
          <div className={styles.formItem}>
            <img src={IconIdCard} alt="" />
            <input ref={refIdCard} maxLength={6} placeholder="申卡人身份证后6位" />
          </div>
          <div className={styles.formItem}>
            <img src={IconVercode} alt="" />
            <input ref={refVerCode} maxLength={6} placeholder="输入验证码" />
            <span hidden={!timewait}>{`${fSecond}s`}</span>
            <span
              hidden={timewait}
              onClick={() => {
                const phone = refPhone.current!.value;
                if (phone && phone.length === 11) {
                  dispatch!({
                    type: 'orderSearch/genAppLoginMsgCode',
                    payload: {
                      phone: refPhone.current!.value,
                      callback: () => {
                        startTimer();
                      },
                    },
                  });
                } else {
                  Toast.fail('请输入正确的手机号格式');
                }
              }}
            >
              {verCodeBtnText}
            </span>
          </div>
        </div>
        <div className={styles.submitBtn} onClick={submitHandle}>
          立即查询
        </div>
      </div>
    </div>
  );
};

export default connect(({ orderSearch }: { orderSearch: OrderSearchModelState }) => ({
  orderSearch,
}))(OrderSearchPage);
