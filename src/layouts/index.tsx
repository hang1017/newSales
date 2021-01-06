import React, { FC, useState, useEffect } from 'react';
import { getQueryString } from '@/utils/tool';

const Layout: FC = ({ children, location }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('source') === '4' || localStorage.getItem('source') === 'wxamp') {
      const layoutNo = document.getElementsByClassName('rumtime-keep-alive-layout-no');
      const layoutHead = document.getElementsByClassName('alita-layout-head');
      const layoutFixed = document.getElementsByClassName('alita-layout-fixed');
      if (layoutNo && layoutNo.length) {
        layoutNo[0].style.height = '100%';
      }
      if (layoutHead && layoutHead.length) {
        layoutHead[0].style.display = 'none';
      }
      if (layoutFixed && layoutFixed.length) {
        layoutFixed[0].style.display = 'none';
      }
    }
  }, [location.pathname, localStorage.getItem('source')]);

  useEffect(() => {
    const myHref = window.location.href;
    if (myHref.indexOf('fromType') > -1) {
      const loginData = getQueryString('loginData');
      const fromType = getQueryString('fromType');
      const source = getQueryString('source');
      const sn = getQueryString('sn');
      const data = JSON.parse(decodeURIComponent(loginData));
      console.log(JSON.parse(decodeURIComponent(loginData)));
      const { tokenCode = '', grayFlag = '', memberId = '' } = data || {};
      localStorage.setItem('fromType', fromType);
      localStorage.setItem('source', source);
      localStorage.setItem('sn', sn);
      if (tokenCode && tokenCode !== null) {
        localStorage.setItem('tokenCode', tokenCode);
      }
      if (grayFlag && grayFlag !== null) {
        localStorage.setItem('grayFlag', grayFlag);
      }
      if (loginData && loginData !== null) {
        localStorage.setItem('memberInfo', decodeURIComponent(loginData));
      }
      if (memberId && memberId !== null) {
        whaleCollect.set('user_id', memberId);
      }
      setShow(true);
    } else {
      setShow(true);
    }
  }, []);
  return <div style={{ height: '100%' }}>{show && children}</div>;
};

export default Layout;
