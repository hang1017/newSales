import React, { FC, useEffect, useState } from 'react';
import { CreateSectModelState, ConnectProps, connect, history, SectSettingModelState } from 'alita';
import DynamicForm, { useForm, ValidateErrorEntity } from '@alitajs/dform';
import { Toast, Modal } from 'antd-mobile';
import defaultIcon from '@/assets/img/customer/sect/default_icon.png';
import rigthIcon from '@/assets/img/rigth_more.png';
import clipboard from '@/utils/clipboard';
import CropperModal from '@/pages/sect/components/CropperModal';

import SingleBtn from '../components/SingleBtn';
import styles from './index.less';

interface PageProps extends ConnectProps {
  createSect: CreateSectModelState;
  sectSetting: SectSettingModelState;
}

const CreateSectPage: FC<PageProps> = ({ createSect, dispatch, sectSetting, location }) => {
  const { isUpdate = '', circleMemberType = '' } = location.query || {};
  const [imgUrl, updateImgUrl] = useState('');
  const [newSectInfo, updateSectInfo] = useState({});
  const [showModal, updateModal] = useState(false);
  const [copyUrl, updateCopyUrl] = useState('');
  const [cropModal, updateCropModal] = useState(false);
  const [modalFile, updateModalFile] = useState(null);

  // 这里发起了初始化请求
  useEffect(() => {
    // Utils.coypUrl('copyText');
    return () => {
      // 这里写一些需要消除副作用的代码
      // 如: 声明周期中写在 componentWillUnmount
    };
  }, []);
  // 注意，上面这里写空数组，表示初始化，如果需要监听某个字段变化再发起请求，可以在这里写明
  const { accNbre } = createSect;
  const { sectInfo } = sectSetting;
  const [form] = useForm();
  const addrFormData = [
    // {
    //   type: 'input',
    //   fieldProps: 'sectsImage',
    //   placeholder: '',
    //   title: '圈子头像',
    //   extra: <img src={defaultIcon} alt='' className={styles.sectIcon} />,
    //   editable: false,
    // },
    {
      type: 'input',
      fieldProps: 'marketingCircleInstName',
      placeholder: '请输入圈子名称',
      title: '圈子名称',
      editable: circleMemberType === '1',
      inputType: 'text',
      rules: [
        { required: true, message: `请输入圈子` },
        {
          pattern: new RegExp(/^[0-9a-zA-Z_\u4e00-\u9fa5]{1,}$/, 'g'),
          message: '名称只允许包含数字、字母和下划线',
        },
      ],
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'area',
      fieldProps: 'circleInstDesc',
      placeholder: '请输入圈子简介',
      editable: circleMemberType === '1',
      labelNumber: 8,
      title: '圈子简介',
      positionType: 'vertical',
      rules: [
        { required: true, message: `请输入简介` },
        {
          pattern: new RegExp(/^[0-9a-zA-Z_\u4e00-\u9fa5]{1,}$/, 'g'),
          message: '简介只允许包含数字、字母和下划线',
        },
      ],
    },

  ];

  const shareCircle = (marketingCircleInstId: string) => {
    dispatch!({
      type: 'headSect/shareCircle',
      payload: {
        circleInstId: marketingCircleInstId,
      }
    }).then((res: string) => {
      if (res) {
        //
        updateCopyUrl(decodeURIComponent(res));


      }

    })
  }
  const formProps = {
    onFinish: (formValue: any) => {
      const { circleInstDesc, marketingCircleInstName, sectsImage } = formValue;
      if (!marketingCircleInstName) {
        Toast.fail('请输入圈子名称', 1);
        return false;

      }
      if (!circleInstDesc) {
        Toast.fail('请输入圈子简介', 1);
        return false;

      }

      if (isUpdate === '1') {
        Modal.alert('', '确定修改圈子信息?', [
          {
            text: '取消',
            onPress: () => { },
          },
          {
            text: '确定',
            onPress: () => {  // 修改信息
              const { marketingCircleInstId, mktCircleMemInstId } = sectInfo;
              dispatch!({
                type: 'createSect/editCircle',
                payload: {
                  circleInstId: marketingCircleInstId,
                  circleInstDesc,
                  marketingCircleInstName,
                  sectsImage: imgUrl,
                  marketCircleMemInstId: mktCircleMemInstId

                }
              }).then((data) => {

                if (!data.success) {
                  Toast.fail(data.errMessage);
                  return false;
                }

                dispatch!({
                  type: 'headSect/save',
                  payload: {
                    userInfo: { ...sectInfo, circleInstDesc, marketingCircleInstName, circleMemberType },
                    accNbre,
                  }
                });

                Toast.success('修改成功');
                setTimeout(() => {
                  history.push({
                    pathname: '/sect/headSect',
                  });
                }, 1000);
              });


            },
          }
        ]);
      }
      else {
        dispatch!({
          type: 'createSect/createMarketingCircle',
          payload: {
            circleInstDesc,
            sectsImage: imgUrl,
            marketingCircleInstName,
            callBack: (data) => {

              updateSectInfo(data);
              updateModal(true);
              const { marketingCircleInstId = '' } = data || {};
              shareCircle(marketingCircleInstId);

              //   Modal.alert('创建成功', '至少需要1名成员圈子才可成立', [
              //     {
              //       text: '退出',
              //       onPress: () => {
              //         dispatch!({
              //           type: 'headSect/save',
              //           payload: {
              //             userInfo: { ...data, circleMemberType: '1' },
              //             accNbre,
              //           }
              //         });
              //         setTimeout(() => {
              //           history.push({
              //             pathname: '/sect/headSect',
              //           });
              //         }, 100);
              //       },
              //     },
              //     {
              //       text: '去邀请成员',
              //       onPress: () => {  // 通过复制链接
              //         const { marketingCircleInstId = '' } = data || {};
              //         dispatch!({
              //           type: 'headSect/shareCircle',
              //           payload: {
              //             circleInstId: marketingCircleInstId,
              //           }
              //         }).then((res) => {
              //           if (res) {
              //             Utils.coypUrl(res);
              //           }

              //         });
              //       },
              //     }
              //   ]);
            }
          }
        });


      }

    },
    onFinishFailed: ({ errorFields = [] }: ValidateErrorEntity) => {
      Toast.fail(errorFields[0]?.errors[0], 1);

    },
    data: addrFormData,
    formsValues: isUpdate === '1' ? { ...sectInfo } : {},
    form,
  };


  /**
  * 头像点击改变事件
  * @param e
  */
  const fileChange = (e: any) => {
    if (circleMemberType !== '1') {
      return false;
    }
    const { files = {} } = e.target;
    if (Object.keys(files).length === 0) return false;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function (e) {
      updateModalFile(e.target.result);
      updateCropModal(true);
    };
  };

  const exitPage = () => {
    dispatch!({
      type: 'headSect/save',
      payload: {
        userInfo: { ...newSectInfo, circleMemberType: '1' },
        accNbre,
      }
    });
    setTimeout(() => {
      history.push({
        pathname: '/sect/headSect',
      });
    }, 100);

  }

  const getResultImgUrl = (imgUrl) => {
    updateImgUrl(imgUrl);

  }
  return <><div className={styles.createPage}>

    <div className={styles.formCell}>
      <div className={styles.labeText}>头像</div>
      <div className={styles.touxDiv}>
        <img src={imgUrl || defaultIcon} className={styles.toux} />

        {circleMemberType !== '1' ? '' : <>
          <input
            className={styles.touxInput}
            type="file"
            name="file"
            accept="image/*"
            onChange={fileChange}
            onClick={(e) => {
              e.target.value = '';
            }}
          />
          <img src={rigthIcon} alt='' /></>}

      </div>


    </div>
    <DynamicForm {...formProps} />

    <div >
      {
        circleMemberType === '1' ? <SingleBtn text={isUpdate === '1' ? '修改' : '创建'} canClick onClick={() => { form.submit() }} /> :
          <div className={styles.memberTipMsg}>
            <div className={styles.tipLine}></div>
      仅圈子掌门可编辑
      <div className={styles.tipLine}></div>
          </div>
      }
    </div>
  </div>
    {cropModal && (
      <CropperModal
        uploadedImageFile={modalFile}
        onClose={() => {
          updateCropModal(false);
        }}
        onSubmit={getResultImgUrl}
      />
    )}

    <Modal
      visible={showModal}
      transparent
      maskClosable={false}
      className={styles.modalLayout}
      onClose={() => { }}
    // title={[<img src={titleGiftIcon} alt="" />]}
    >
      <div className={styles.modalTitle}>创建成功</div>
      <div>至少需要1名成员圈子才可成立</div>
      <div className={styles.modalBtn}>

        <div className={`${styles.exitBtn} ${styles.leftBtn}`} onClick={exitPage}><span>退出</span></div>
        <div className='copyText' data-clipboard-text={copyUrl} onClick={(e) => { clipboard(copyUrl, e) }}> <div className={styles.inviteMemberBtn} ><span>去邀请成员</span></div></div>

      </div>
    </Modal>
  </>
    ;
};

export default connect(({ createSect, sectSetting }: { createSect: CreateSectModelState; sectSetting: SectSettingModelState }) => ({ createSect, sectSetting }))(CreateSectPage);
