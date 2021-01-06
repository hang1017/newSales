/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { FC, useState } from 'react';
import {
  MarketingModelState,
  ConnectProps,
  connect,
} from 'alita';
import wx from 'weixin-js-sdk';
import { Button, Toast } from 'antd-mobile';
import CommonInput from '@/components/CommonInput';
import storeIcon from '@/assets/img/store.png';
import noIcon from '@/assets/img/no.png';
import successIcon from '@/assets/img/success.png';
import copy from 'copy-to-clipboard';
import styles from './index.less';

interface PageProps extends ConnectProps {
  marketing: MarketingModelState;
}

const MarketingPage: FC<PageProps> = ({ marketing, dispatch, location }) => {

  const { storename = '', shareId = '' } = location.query;
  const { shareTitle, shareDesc, shareIcon, shareUrl, sn, source } = marketing;

  const [isGenerate, setIsGenerate] = useState(false);
  const [saleCode, setSaleCode] = useState('');

  const TextEllipsis = (text : string, maxLen : number) => {
    if (!text || !text.length) return text;

    let finalText = '';
    let length = 0;
    for (let i = 0; i < text.length; i += 1) {
      if (text.charCodeAt(i) >= 0 && text.charCodeAt(i) <= 128) {
        length += 1;
      } else {
        length += 2;
      }
      finalText += text[i];
      if (length >= maxLen) {
        finalText = `${finalText}...`;
        break;
      }
    }
    return finalText;
  };

  const onGenerateLink = () => {
    Toast.loading('正在生成...', 0.5);
    dispatch!({
      type: 'marketing/queryMarketingDetail',
      payload: {
        shareId,
      },
    }).then(() => {
      setIsGenerate(true);
    });
  };

  const onShare = () => {
    // const ua = window.navigator.userAgent.toLowerCase();
    // 如果不在微信浏览器内，微信分享也没意义了
    // if (ua.indexOf('micromessenger') < 0) {
    //   return;
    // }

    copy(`${shareUrl.replace(/\s+/g, '')}?source=${source.replace(/\s+/g, '')}&sn=${sn.replace(/\s+/g, '')}&salesCode=${saleCode.replace(/\s+/g, '')}`);
    copy(`${shareUrl.replace(/\s+/g, '')}?source=${source.replace(/\s+/g, '')}&sn=${sn.replace(/\s+/g, '')}&salesCode=${saleCode.replace(/\s+/g, '')}`);
    Toast.success('复制分享链接成功');

    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: '', // 必填，公众号的唯一标识
    //   timestamp: new Date(), // 必填，生成签名的时间戳
    //   nonceStr: Math.random(), // 必填，生成签名的随机串
    //   signature: '',// 必填，签名，见附录1
    //   jsApiList: [
    //     'onMenuShareAppMessage',
    //     'onMenuShareTimeline'
    //   ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // });

    // const info = {
    //   title: shareTitle,
    //   desc: shareDesc,
    //   imgUrl: shareIcon,
    //   link: '',
    // };

    // wx.ready(() => {
    //   // 分享给朋友
    //   wx.onMenuShareAppMessage({
    //     ...info,
    //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     success: () => {
    //       // 用户确认分享后执行的回调函数
    //     },
    //     cancel: () => {
    //       // 用户取消分享后执行的回调函数
    //     }
    //   })
    
    //   // 分享到朋友圈
    //   wx.onMenuShareTimeline({
    //     ...info,
    //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     success: () => {
    //       // 用户确认分享后执行的回调函数
    //     },
    //     cancel: () => {
    //       // 用户取消分享后执行的回调函数
    //     }
    //   })
    // })

  }

  return (
    <div>
      {!isGenerate ? (
        <div className={styles.center}>
        <div className={styles.inputContainer}>
          <div className={styles.title}>
            <img alt="" src={storeIcon} />
            <div>店铺名称</div>
          </div>
          <div className={styles.text}>
            {storename}
          </div>
          <div className={styles.title}>
            <img alt="" src={noIcon} />
            <div>营销员编码</div>
          </div>
          <CommonInput
            placeholder="请输入营业员编码"
            onChange={value => setSaleCode(value.replace(/\s+/g,""))}
            showDelete
          />
        </div>
        <Button type="primary" className={styles.btn} onClick={onGenerateLink}>生成分享链接</Button>
      </div>
      ) : (
        <div className={styles.result}>
          <div className={styles.title}>
            <img alt="" src={successIcon} />
            <div>分享链接生成成功</div>
          </div>
          <div className={styles.main}>
            <div className={styles.context}>
              <div className={styles.contextTit}>{TextEllipsis(shareTitle, 54)}</div>
              <div className={styles.contextMain}>
                <div className={styles.desc}>{TextEllipsis(shareDesc, 54)}</div>
                <img alt="icon" src={shareIcon} />
              </div>
            </div>
            <Button type="primary" className={styles.mainBtn} onClick={onShare}>立即复制并分享</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(({ marketing }: { marketing: MarketingModelState }) => ({ marketing }))(MarketingPage);
