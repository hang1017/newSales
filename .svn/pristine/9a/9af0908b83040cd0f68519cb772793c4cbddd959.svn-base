import React, { FC, useEffect, useState } from 'react';
import { CheckIdentityModelState, ConnectProps, connect, router } from 'alita';
import { Toast, WhiteSpace, Button, List, InputItem } from 'antd-mobile';
import { transformFile, getEmergencyData } from '@/utils';
import Utils from '@/utils/tool';
import camera from '@/assets/cameraTransparent.png';
import loading from '@/assets/loading.png';
import handCommitmentPic from '@/assets/handCommitmentPhoto.png';
import styles from './index.less';

interface PageProps extends ConnectProps {
  checkIdentity: CheckIdentityModelState;
}

const CheckCommitment: FC<PageProps> = ({ dispatch, location }) => {
  const { phone, cartOrderId, idCardInfo } = location.query;
  const [idCardData] = useState(idCardInfo && (JSON.parse(idCardInfo) || ''));
  const [imageInfo, setImageInfo] = useState({}); // 上传的图片
  const [contactPhone, setConcactPhone] = useState(''); // 联系电话
  const [windowHeight, setWindowHeight] = useState(0);

  // 这里发起了初始化请求，加入购物车
  useEffect(() => {
    setWindowHeight(document.documentElement.clientHeight - 90);
    // 把skuId 和 quantity 数量加进去
    const emergencyData = getEmergencyData();
    dispatch!({
      type: 'emerPayConfirm/commitCartSecondModels',
      payload: {
        accNum: phone,
        cartOrderId,
        orderBusiType: '',
        orderBusiTypeKind: '',
        orderType: '1800',
        quantity: 1,
        skuId: emergencyData?.skuId,
        sourceType: '',
        serviceOfferId: location?.query?.serviceOfferId || '',
      },
    }).then((data: any) => {
      dispatch!({
        type: 'emerPayConfirm/save',
        payload: {
          orderInfo: data,
        },
      });
    });
  }, []);

  // 上传图片
  const uploadChange = (e: any, type: string) => {
    const files = e.target.files as any;
    if (files && files.length > 0) {
      transformFile(files[0], 0.2).then((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          if (!new RegExp('(jpg|jpeg|gif|png)+', 'gi').test(file.type)) {
            Toast.fail('您上传的图片格式有误，请重新上传~');
          } else {
            dispatch!({
              type:
                type === 'handCommitmentPhoto'
                  ? 'checkIdentity/queryUploadAgreementPic'
                  : 'checkIdentity/queryUploadAgreement',
              payload: {
                attach: file,
              },
            }).then((data: object) => {
              if (data) {
                setImageInfo({
                  ...imageInfo,
                  [type]: data?.url,
                });
              }
            });
          }
        };
        reader.onerror = () => {
          Toast.fail('文件读取失败', 2);
        };
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            if (event.loaded === event.total) {
              Toast.hide();
            } else {
              Toast.loading('图片上传中，请稍候...', 0);
            }
          }
        };
      });
    }
  };

  const veriryPhone = (value: string) => {
    if (value) {
      if (!/^1[3-9]\d{9}$/.test(value.replace(/\s+/g, ''))) {
        Toast.fail('手机号码格式有误', 2);
        return false;
      }
      return true;
    }
    Toast.fail('请输入联系电话！', 2);
    return false;
  };

  const phoneChange = (e: any) => {
    setConcactPhone(e);
  };
  const handleBlur = (e: any) => {
    if (e) {
      veriryPhone(e);
    }
  };

  /**
   * 确认按钮点击事件
   */
  const checkBtnClick = () => {
    const { commitmentPhoto, handCommitmentPhoto } = imageInfo;
    if (!commitmentPhoto) {
      Toast.fail('请先上传已签名的承诺书', 2);
      return;
    }
    if (!handCommitmentPhoto) {
      Toast.fail('请先上传手持已签名的承诺书', 2);
      return;
    }
    // if (veriryPhone(contactPhone)) {
    dispatch!({
      type: 'payConfirm/commitOrderBfCheck',
      payload: {
        certData: {
          certName: idCardData?.certName,
          certNum: idCardData?.certNum,
          certType: '1',
        },
      },
    }).then((data: boolean) => {
      if (!data) return;
      dispatch!({
        type: 'payConfirm/commitOrder',
        payload: {},
      }).then((res: any) => {
        if (res) {
          router.push({
            pathname: '/emergency/checkResult',
            query: {
              status: '200',
              code: encodeURIComponent(res?.smallProgramUrl),
            },
          });
        }
      });
    });
    // }
  };
  // 图片上传组件
  const RenderUploadImg = (obj: object) => {
    const { options = {} } = obj;
    const { title, subTitle, field, backgroundPic } = options;
    return (
      <div className={styles.liveDiv}>
        <div className={styles.liveTitle}>{title}</div>
        <div className={styles.liveSubTitle}>{subTitle}</div>
        <div className={styles.livePhotoDiv}>
          <div className={styles.livePhoto}>
            <input
              param-action={field}
              type="file"
              name="file"
              accept="image/*"
              className={styles.liveFileUpload}
              onChange={(e) => uploadChange(e, field)}
            />
            {imageInfo[field] ? (
              <div className={styles.showLiveloadImg}>
                <img src={imageInfo[field]} alt="" className={styles.liveimg} />
              </div>
            ) : (
              <div
                className={styles.photos}
                style={
                  backgroundPic
                    ? {
                        backgroundImage: `url(${backgroundPic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                      }
                    : {}
                }
              >
                <div className={styles.photoRadio}>
                  <img src={camera} alt="" />
                </div>
              </div>
            )}
            {imageInfo[field] ? (
              <div className={styles.cardText}>
                <span className={styles.reLoad}>
                  <img src={loading} />
                  点击重新上传
                </span>
              </div>
            ) : (
              <div className={styles.cameraText}>
                <div className={styles.leftText}>点击上传</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.checkIdentityStyle} style={{ height: windowHeight }}>
      <WhiteSpace size="lg" />
      {/* <RenderUploadImg
        key="commitmentPhoto"
        options={{
          title: '上传承诺书',
          subTitle: '上传承诺书照片，承诺书已签名，且签名清晰可见',
          field: 'commitmentPhoto',
        }}
      /> */}
      {RenderUploadImg({
        key: 'commitmentPhoto',
        options: {
          title: '上传承诺书',
          subTitle: '上传承诺书照片，承诺书已签名，且签名清晰可见',
          field: 'commitmentPhoto',
        },
      })}
      <WhiteSpace size="xl" />
      {/* <RenderUploadImg
        key="handCommitmentPhoto"
        options={{
          title: '上传手持承诺书',
          subTitle: '必须本人手持承诺书承诺书已签名，且签名清晰可见',
          field: 'handCommitmentPhoto',
          backgroundPic: handCommitmentPic,
        }}
      /> */}
      {RenderUploadImg({
        key: 'handCommitmentPhoto',
        options: {
          title: '上传手持承诺书',
          subTitle: '必须本人手持承诺书承诺书已签名，且签名清晰可见',
          field: 'handCommitmentPhoto',
          backgroundPic: handCommitmentPic,
        },
      })}
      <WhiteSpace size="xl" />
      {/* <div className={styles.liveDiv}>
        <List>
          <InputItem
            maxLength={11}
            value={contactPhone}
            onChange={(e) => phoneChange(e)}
            placeholder="请输入手机号码"
            onBlur={handleBlur}
          >
            联系电话
          </InputItem>
        </List>
        <List>
          <div className={styles.liveSubTitle}>
            联系号码用于接收验证码，请确保该手机可以正常接收短信
          </div>
        </List>
      </div> */}
      <WhiteSpace size="xl" />
      <div className={styles.btnDiv}>
        <Button className={styles.btn} onClick={checkBtnClick}>
          提交
        </Button>
      </div>
      <WhiteSpace size="xl" />
    </div>
  );
};

export default connect(({ checkIdentity }: { checkIdentity: CheckIdentityModelState }) => ({
  checkIdentity,
}))(CheckCommitment);
