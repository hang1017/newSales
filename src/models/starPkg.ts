import { Reducer } from 'redux';
import { qryConstellationRightsService } from '@/services/quickOrder';
import { Effect } from 'alita';

export interface StarPkgModelState {
  name: string;
}

export interface StarPkgModelType {
  namespace: 'starPkg';
  state: StarPkgModelState;
  effects: {
    qryConstellationRightsModal: Effect;
  };
  reducers: {
    save: Reducer<StarPkgModelState>;
  };
}

const StarPkgModel: StarPkgModelType = {
  namespace: 'starPkg',

  state: {
    name: '',
  },

  effects: {
    *qryConstellationRightsModal({ payload }, { call }) {
      const data = yield call(qryConstellationRightsService, payload);
      return data;
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

export default StarPkgModel;
