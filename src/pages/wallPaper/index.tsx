import React, { FC, useEffect, useState } from 'react';
import { WallPaperModelState, ConnectProps, connect } from 'alita';
import { Carousel, Button, Modal, Toast } from 'antd-mobile';
import classnames from 'classnames';
import { Empty } from '@/components';
import copy from 'copy-to-clipboard';
import styles from './index.less';

interface PageProps extends ConnectProps {
  wallPaper: WallPaperModelState;
}

const WallPaperPage: FC<PageProps> = ({ wallPaper, dispatch, location }) => {
  const { pageList = [] } = wallPaper;
  const [modalFlag, setModalFlag] = useState(false);
  const [ratioList, setRatioList] = useState<any[]>([]);
  const [activeRatio, setActiveRatio] = useState<any>();
  const [currentAllRatioData, setCurrentAllRatioData] = useState();
  const { mcInstId = '', mcInstState = '' } = location?.query;
  useEffect(() => {
    if (parseInt(mcInstState, 10) === 1000) {
      dispatch!({
        type: 'wallPaper/queryPagerList',
        payload: {
          mcInstId: location?.query?.mcInstId || '',
        },
      }).then((data: any) => {
        setRatioList(data?.wallPaperCOList);
        setCurrentAllRatioData(data);
        if (data?.wallPaperCOList && data?.wallPaperCOList.length) {
          document.getElementById('wallPaperId').style.backgroundImage =
            'url(' + data?.wallPaperCOList[0]?.wpUrl + ')';
        }
      });
    } else {
      dispatch!({
        type: 'wallPaper/qryRedeemedWallpaperModels',
        payload: {
          mcInstId: location?.query?.mcInstId || '',
        },
      }).then((data: any) => {
        setRatioList(data?.wallPaperCOList);
        setCurrentAllRatioData(data);
        if (data?.wallPaperCOList && data?.wallPaperCOList.length) {
          document.getElementById('wallPaperId').style.backgroundImage =
            'url(' + data?.wallPaperCOList[0]?.wpUrl + ')';
        }
      });
    }
  }, []);
  /**
   * 下载壁纸按钮点击事件
   */
  const downLoadClick = () => {
    setModalFlag(true);
  };

  /**
   * 轮播图滚动事件
   */
  const afterChange = (nowNumber: number) => {
    setRatioList(pageList[nowNumber]?.wallPaperCOList);
    setCurrentAllRatioData(pageList[nowNumber]);
    setActiveRatio({});
    if (pageList[nowNumber]?.wallPaperCOList && pageList[nowNumber]?.wallPaperCOList.length) {
      document.getElementById('wallPaperId').style.backgroundImage =
        'url(' + pageList[nowNumber]?.wallPaperCOList[0]?.wpUrl + ')';
    }
  };

  /**
   * 确认按钮下载事件
   */
  const confirm = () => {
    if (!activeRatio) {
      Toast.fail('请选择分辨率', 1);
      return;
    }
    Toast.success('已将链接拷贝至剪切板，请到浏览器上下载', 1);
    copy(activeRatio?.wpUrl);
    setModalFlag(false);
    if (parseInt(mcInstState, 10) === 1000) {
      dispatch!({
        type: 'wallPaper/exchangeCouponModels',
        payload: {
          mcInstIds: [location?.query?.mcInstId || ''],
          rightsMap: {
            [activeRatio?.wpId]: currentAllRatioData?.wpStyleId,
          },
        },
      });
    }
    window.open(activeRatio?.wpUrl);
  };

  return (
    <div className={styles.wallPaperStyle}>
      <div className={styles.blurBg} id="wallPaperId" />
      <div className={styles.wallPaperCenter}>
        {pageList && pageList.length > 0 && (
          <div className={styles.carContent}>
            <Carousel
              frameOverflow="visible"
              cellSpacing={50}
              slideWidth={0.85}
              afterChange={afterChange}
            >
              {pageList.map((item: any, index: number) => {
                return (
                  <div key={index} className={styles.imgDiv}>
                    <img src={item.wallPaperCOList[0].wpUrl} className={styles.img} />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
        {pageList?.length === 0 && (
          <div style={{ marginTop: '2rem' }}>
            <Empty />
          </div>
        )}
        <div className={styles.footBtn}>
          <Button className={styles.btn} onClick={downLoadClick}>
            下载壁纸
          </Button>
        </div>
        <Modal
          onClose={() => {
            setModalFlag(false);
          }}
          popup
          animationType="slide-up"
          className={styles.paperRatioModalStyle}
          visible={modalFlag}
        >
          <div className={styles.paperRatioModal}>
            <div className={styles.ratioTitle}>请选择壁纸分辨率</div>
            <div className={styles.ratioListStyle}>
              {(ratioList || []).map((item: any, index: number) => (
                <div
                  key={item?.wpId}
                  className={classnames({
                    [styles.ratioItem]: true,
                    [styles.activeRatio]: item.wpId === activeRatio?.wpId,
                  })}
                  onClick={() => {
                    setActiveRatio(item);
                  }}
                >
                  {item.wpSize}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.ratioFootBtn}>
            <Button className={styles.ratioBtn} onClick={confirm}>
              确定
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default connect(({ wallPaper }: { wallPaper: WallPaperModelState }) => ({ wallPaper }))(
  WallPaperPage,
);
