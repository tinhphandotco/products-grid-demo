import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

import { entities, productsGrid } from './sub';

// products
const initState = fromJS({
  entities: {
    byId: {
      '1': {
        id: "1",
        size: 32,
        price: 965,
        face: "(ง •̀_•́)ง",
        date: "Sun Feb 16 2020 14:06:09 GMT+0700 (Indochina Time)"
      },
      '2': {
        id: "2",
        size: 16,
        price: 965,
        face: "(ง •̀_•́)ง",
        date: "Sun Feb 18 2020 14:06:09 GMT+0700 (Indochina Time)"
      }
    },
    allIds: [1, 2]
  },
  productsGrid: {
    meta: {
      page: 1,
      limit: 16,
      sort: 'id',
      isLastPage: false
    },
    isFetching: false,
    result: []
  },
});

const entitiesReducer = (state = initState.get('entities'), action) => entities(state, action)
const productsGridReducer = (state = initState.get('productsGrid'), action) => productsGrid(state, action);

export default combineReducers({
  entities: entitiesReducer,
  productsGrid: productsGridReducer
})
