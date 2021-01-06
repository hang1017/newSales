import React, { FC, useEffect, useState } from 'react';
import {
  CheckIdentityModelState,
  ConnectProps,
  connect,
  router,
  EmerPayConfirmModelState,
} from 'alita';
import { Toast, WhiteSpace, Card, Flex, Button, List, InputItem } from 'antd-mobile';
import { transformFile } from '@/utils';
import camera from '@/assets/cameraTransparent.png';
import loading from '@/assets/loading.png';
import styles from './index.less';

const { Header, Body } = Card;
const { Item } = Flex;

interface PageProps extends ConnectProps {
  checkIdentity: CheckIdentityModelState;
  emerPayConfirm: EmerPayConfirmModelState;
}

const ANTILIST = ['5007', '5008', '5009', '5010'];

const CheckIdentityPage: FC<PageProps> = ({ emerPayConfirm, dispatch, location }) => {
  const { idCardInfo = {} } = emerPayConfirm;

  //在页面中显示上传的照片
  const [showFaceUploadImg, setShowFaceUploadImg] = useState('');
  const [showBackUploadImg, setShowBackUploadImg] = useState('');
  const [showLiveloadImg, setShowLiveloadImg] = useState('');
  const [windowHeight, setWindowHeight] = useState(0);
  const [urlPhone] = useState(location.query?.phone || '');
  const [msgSeq, setMsgSeq] = useState(''); // 身份证上传的序列号
  const [cartOrderId, setCartOrderId] = useState('1');

  // 这里发起了初始化请求
  useEffect(() => {
    setWindowHeight(document.documentElement.clientHeight - 90);
    // 清空紧急挂失模块数据
    dispatch!({
      type: 'emerPayConfirm/save',
      payload: {
        idCardInfo: {},
      },
    });
  }, []);

  // 上传图片
  const uploadChange = (e: any, type: string) => {
    const files = e.target.files as any;
    if (files && files.length > 0) {
      // const file = files[0];
      transformFile(files[0], 0.2).then((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function ({ target }) {
          if (!new RegExp('(jpg|jpeg|gif|png)+', 'gi').test(file.type)) {
            Toast.fail('您上传的图片格式有误，请重新上传~');
          } else {
            if (type === 'face') {
              dispatch!({
                type: 'checkIdentity/idCardBackSideVerifyModel',
                payload: {
                  accNbr: urlPhone,
                  image: target?.result,
                  serviceOfferId: location?.query?.type || '',
                },
              }).then((data: string) => {
                if (data) {
                  setShowFaceUploadImg(URL.createObjectURL(file));
                  setMsgSeq(data);
                }
              });
            } else {
              dispatch!({
                type: 'checkIdentity/idCardFrontSideVerifyModel',
                payload: {
                  accNbr: urlPhone,
                  image: target?.result,
                  msgSeq,
                },
              }).then(() => {
                setShowBackUploadImg(URL.createObjectURL(file));
              });
            }
          }
        };
        reader.onerror = function () {
          Toast.fail('文件读取失败', 2);
        };
        reader.onprogress = function (event) {
          if (event.lengthComputable) {
            if (event.loaded === event.total) {
              Toast.hide();
              return;
            } else {
              Toast.loading('图片上传中，请稍候...', 0);
            }
          }
        };
      });
    }
  };
  /**
   * 活体照改变事件
   */
  const liveChange = (e: any) => {
    const files = e.target.files as any;
    if (files && files.length > 0) {
      transformFile(files[0], 0.2).then((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({ target }) => {
          dispatch!({
            type: 'checkIdentity/faceAnalysisVerifyModel',
            payload: {
              msgSeq,
              image: target?.result,
            },
          }).then((res: any) => {
            if (res) {
              setCartOrderId(res);
              setShowLiveloadImg(URL.createObjectURL(file));
            }
          });
        };
      });
    }
  };

  /**
   * 确认按钮点击事件
   * 这里需要活体校验如果成功就跳转到 emerPayConfirm
   * 如果失败就跳转到 checkError 页面
   */
  const checkBtnClick = () => {
    if (showLiveloadImg) {
      router.push({
        pathname:
          location.query?.type === '5998' && ANTILIST.indexOf(location.query?.serviceOfferId) !== -1
            ? '/emergency/checkCommitment'
            : '/emergency/emerPayConfirm',
        query: {
          cartOrderId,
          phone: urlPhone,
          idCardInfo: JSON.stringify(idCardInfo),
          type: location.query?.type,
          serviceOfferId: location.query?.serviceOfferId,
        },
      });
    }
  };
  return (
    <div className={styles.checkIdentityStyle} style={{ height: windowHeight }}>
      <WhiteSpace size="lg" />
      <Card full>
        <Header
          title={
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>上传身份证照片</span>
              <span className={styles.cardSubtitle}>
                根据国家实名制要求，请准确提供申办人身份证信息
              </span>
            </div>
          }
        />
        <Body>
          <Flex>
            <Item className={styles.cardLeft}>
              <input
                param-action="frontCard"
                type="file"
                name="file"
                accept="image/*"
                className={styles.fileUpload}
                onChange={(e) => uploadChange(e, 'face')}
              />
              <div className={styles.cardContent}>
                {showFaceUploadImg ? (
                  <img src={showFaceUploadImg} className={styles.idCardImg} />
                ) : (
                  <div className={styles.cardImgLeft}>
                    <img src={camera} />
                  </div>
                )}
                {showFaceUploadImg ? (
                  <div className={styles.cardText}>
                    <span className={styles.reLoad}>
                      <img src={loading} />
                      点击重新上传
                    </span>
                  </div>
                ) : (
                  <div className={styles.cardText}>
                    <span className={styles.clickUpload}>点击上传</span>
                    <span className={styles.personFace}>人像面</span>
                  </div>
                )}
              </div>
            </Item>
            <Item className={styles.cardRight}>
              <input
                param-action="backgroudCard"
                type="file"
                name="file"
                accept="image/*"
                className={styles.fileUpload}
                onClick={(e) => {
                  if (!showFaceUploadImg) {
                    e.preventDefault();
                    Toast.info('请先上传人像面');
                    return;
                  }
                }}
                onChange={(e) => uploadChange(e, 'back')}
              />
              <div className={styles.cardContent}>
                {showBackUploadImg ? (
                  <img src={showBackUploadImg} className={styles.idCardImg} />
                ) : (
                  <div className={styles.cardImgRight}>
                    <img src={camera} />
                  </div>
                )}
                {showBackUploadImg ? (
                  <div className={styles.cardText}>
                    <span className={styles.reLoad}>
                      <img src={loading} />
                      点击重新上传
                    </span>
                  </div>
                ) : (
                  <div className={styles.cardText}>
                    <span className={styles.clickUpload}>点击上传</span>
                    <span className={styles.personFace}>国徽面</span>
                  </div>
                )}
              </div>
            </Item>
          </Flex>
        </Body>
      </Card>
      <div className={styles.ckInfo}>
        <List>
          {/* 接口出来的数据要存在 emerPayConfirm models 里面 后续好处理 */}
          <InputItem
            placeholder="自动识别"
            editable={false}
            labelNumber={4}
            value={idCardInfo?.certName || ''}
          >
            姓名
          </InputItem>
          <InputItem
            placeholder="自动识别"
            editable={false}
            labelNumber={4}
            value={idCardInfo?.certNum || ''}
          >
            身份证
          </InputItem>
        </List>
      </div>
      <WhiteSpace size="xl" />
      <div className={styles.liveDiv}>
        <div className={styles.liveTitle}>上传免冠照</div>
        <div className={styles.liveSubTitle}>根据国家实名制要求，请准确提供申办人身份证信息</div>
        <div className={styles.liveSubTitleTwo}>
          尊敬的客户，为了您的客户信息安全，请拍摄真人免冠照进行认证，翻拍照片无法进行业务办理，谢谢您的配合
        </div>
        <div className={styles.livePhotoDiv}>
          <div className={styles.livePhoto}>
            <input
              param-action="realPersonPhoto"
              type="file"
              name="file"
              accept="image/*"
              className={styles.liveFileUpload}
              onClick={(e) => {
                if (!showFaceUploadImg) {
                  e.preventDefault();
                  Toast.info('请先上传人像面');
                  return;
                }
                if (!showBackUploadImg) {
                  e.preventDefault();
                  Toast.info('请将身份证件照上传完成');
                  return;
                }
              }}
              onChange={liveChange}
            />
            {showLiveloadImg ? (
              <div className={styles.showLiveloadImg}>
                <img src={showLiveloadImg} alt="" className={styles.liveimg} />
              </div>
            ) : (
              <div className={styles.photos}>
                <div className={styles.photoRadio}>
                  <img src={camera} alt="" />
                </div>
              </div>
            )}
            {showLiveloadImg ? (
              <div className={styles.cardText}>
                <span className={styles.reLoad}>
                  <img src={loading} />
                  点击重新上传
                </span>
              </div>
            ) : (
              <div className={styles.cameraText}>
                <div className={styles.leftText}>点击上传</div>
                <div className={styles.rightText}>免冠照</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <WhiteSpace size="xl" />
      <div className={styles.btnDiv}>
        <Button className={styles.btn} onClick={checkBtnClick} disabled={!showLiveloadImg}>
          确认
        </Button>
      </div>
      <WhiteSpace size="xl" />
    </div>
  );
};

export default connect(
  ({
    checkIdentity,
    emerPayConfirm,
  }: {
    checkIdentity: CheckIdentityModelState;
    emerPayConfirm: EmerPayConfirmModelState;
  }) => ({
    checkIdentity,
    emerPayConfirm,
  }),
)(CheckIdentityPage);
