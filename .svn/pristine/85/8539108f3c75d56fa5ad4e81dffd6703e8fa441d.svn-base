import B004 from '@/assets/face/B004.png';
import B005 from '@/assets/face/B005.png';
import B006 from '@/assets/face/B006.png';
import B012 from '@/assets/face/B012.png';
import B013 from '@/assets/face/B013.png';
import B014 from '@/assets/face/B014.png';
import B021 from '@/assets/face/B021.png';
import B027 from '@/assets/face/B027.png';
import B032 from '@/assets/face/B032.png';
import B033 from '@/assets/face/B033.png';
import B036 from '@/assets/face/B036.png';
import B042 from '@/assets/face/B042.png';
import B046 from '@/assets/face/B046.png';
import B057 from '@/assets/face/B057.png';
import B063 from '@/assets/face/B063.png';
import B071 from '@/assets/face/B071.png';
import B073 from '@/assets/face/B073.png';
import B074 from '@/assets/face/B074.png';
import B079 from '@/assets/face/B079.png';
import B081 from '@/assets/face/B081.png';
import B088 from '@/assets/face/B088.png';
import B095 from '@/assets/face/B095.png';
import B099 from '@/assets/face/B099.png';
import B109 from '@/assets/face/B109.png';
import B110 from '@/assets/face/B110.png';
import B111 from '@/assets/face/B111.png';
import B118 from '@/assets/face/B118.png';
import B124 from '@/assets/face/B124.png';

export const FACE_MENU = {
  '/:8-)': B004,
  '/::<': B005,
  '/::$': B006,
  '/::P': B012,
  '/::D': B013,
  '/::)': B014,
  '/:<L>': B021,
  '/:love': B027,
  '/:<W>': B032,
  '/:rose': B033,
  '/:heart': B036,
  '/:sun': B042,
  '/:strong': B046,
  '/::>': B057,
  '/:coffee': B063,
  '/:share': B071,
  '/:,@P': B073,
  '/:,@-D': B074,
  '/:,@f': B079,
  '/:?': B081,
  '/:bye': B088,
  '/:v': B095,
  '/:handclap': B099,
  '/::*': B109,
  '/:@x': B110,
  '/:8*': B111,
  '/:@)': B118,
  '/:ok': B124,
};
export const FACE_MENU_SEND = {
  '[B004]': B004,
  '[B005]': B005,
  '[B006]': B006,
  '[B012]': B012,
  '[B013]': B013,
  '[B014]': B014,
  '[B021]': B021,
  '[B027]': B027,
  '[B032]': B032,
  '[B033]': B033,
  '[B036]': B036,
  '[B042]': B042,
  '[B046]': B046,
  '[B057]': B057,
  '[B063]': B063,
  '[B071]': B071,
  '[B073]': B073,
  '[B074]': B074,
  '[B079]': B079,
  '[B081]': B081,
  '[B088]': B088,
  '[B095]': B095,
  '[B099]': B099,
  '[B109]': B109,
  '[B110]': B110,
  '[B111]': B111,
  '[B118]': B118,
  '[B124]': B124,
};

export const changeText = (text: string) => {
  Object.keys(FACE_MENU).forEach((item: string) => {
    var regExp = `${item}`;
    text = text.replaceAll(regExp, () => {
      return `<img src="${FACE_MENU[item]}" />`;
    });
  });
  return text;
};

export const changeTextSend = (text: string) => {
  Object.keys(FACE_MENU_SEND).forEach((item: string) => {
    var regExp = `${item}`;
    text = text.replaceAll(regExp, () => {
      return `<img src="${FACE_MENU_SEND[item]}" />`;
    });
  });
  return text;
};
