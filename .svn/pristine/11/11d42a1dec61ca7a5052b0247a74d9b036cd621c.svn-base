import { Reducer } from 'redux';
import { circleJion } from '@/services/sect';
import { Effect, history } from 'alita';
import Utils from '@/utils/tool';
import { Modal, Toast } from 'antd-mobile';

export interface SectInfoModelState {
  mySectInfo: any;
}

export interface SectInfoModelType {
  namespace: 'sectInfo';
  state: SectInfoModelState;
  effects: {
    circleJion: Effect;
  };
  reducers: {
    save: Reducer<SectInfoModelState>;
  };
}

const SectInfoModel: SectInfoModelType = {
  namespace: 'sectInfo',

  state: {
    mySectInfo: {},
  },

  effects: {
    *circleJion({ payload }, { call, put, select }) {
      let { accNbre, numberInstId } = yield select(_ => _.createSect);
      if (!accNbre) {
        accNbre = localStorage.getItem('accNbre');
      }

      const { nickName } = payload;

      let tempNickName = nickName;
      if (!nickName) {
        tempNickName = Utils.phoneNum(accNbre);
      }
      const data = yield call(circleJion, {
        ...payload,
        accNbre,
        numberInstId,
        nickName: tempNickName
      });
      const { success, errMessage } = data;

      if (success) {
        Toast.success('申请已发送');
      }
      else {
        Modal.alert('申请失败', errMessage, [
          {
            text: '取消',
            onPress: () => {
            },
          },
          {
            text: '看看其他圈子',
            onPress: () => {  //
              history.push({
                pathname: '/sect/searchSects'
              });
            },
          }
        ])
      }

    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default SectInfoModel;
