import CryptoJS from 'crypto-js';

const desKeyObj = {
  desKey: 'ztesoftbasemobile20160812..',
  ivKey: '01234567',
};

export default {
  /**
   * 加密
   * @param dataStr
   */
  // eslint-disable-next-line consistent-return
  encrypt(dataStr: any) {
    try {
      const keyHex = CryptoJS.enc.Utf8.parse(desKeyObj.desKey);
      const IV = CryptoJS.enc.Utf8.parse(desKeyObj.ivKey);
      const encrypted = CryptoJS.TripleDES.encrypt(dataStr, keyHex, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    } catch (error) {
      console.log(`加密报错${JSON.stringify(error)}`);
    }
  },
  /**
   *
   * @param dataStr 解密
   */
  // eslint-disable-next-line consistent-return
  crypto(dataStr: any) {
    try {
      const keyHex = CryptoJS.enc.Utf8.parse(desKeyObj.desKey);
      const IV = CryptoJS.enc.Utf8.parse(desKeyObj.ivKey);
      const decrypted = CryptoJS.TripleDES.decrypt(dataStr, keyHex, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log('解密报错');
    }
  },
};
