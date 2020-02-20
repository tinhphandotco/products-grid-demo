import { List } from 'immutable';
import { actionPending, actionFailure, actionSuccess } from 'redux/utils'
import { FETCH_PRODUCTS, UPDATE_META, CLEAN_PRODUCTS, CHANGE_ADS } from '../types';

let prevRandom = null;

export default function (state, action) {
  switch (action.type) {
    case actionPending(FETCH_PRODUCTS): {
      return state.setIn(['isFetching'], true)
    }

    case actionSuccess(FETCH_PRODUCTS): {
      state = state.setIn(['isFetching'], false)
      state = state.updateIn(['result'], result => {
        return result.concat(action.payload.result);
      })
      state = state.setIn(['meta', 'isLastPage'], action.payload.result.length === 0)
      return state;
    }

    case actionFailure(FETCH_PRODUCTS): {
      return state.setIn(['isFetching'], false)
    }

    case UPDATE_META: {
      return state.setIn(['meta'], action.payload)
    }

    case CLEAN_PRODUCTS: {
      return state.setIn(['result'], List())
    }

    case CHANGE_ADS: {
      prevRandom = state.get('adsRandom');
      let newRandom = null;
      const loop = () => {
        newRandom = Math.floor(Math.random()*1000);
        if (prevRandom === newRandom) {
          loop();
        }
      }
      loop();
      return state.setIn(['adsRandom'], newRandom)
    }

    default: return state;
  }
}