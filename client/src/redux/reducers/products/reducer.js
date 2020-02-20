import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

import { entities, productsGrid } from './sub';

// products
const initState = fromJS({
  entities: {
    byId: {},
    allIds: []
  },
  productsGrid: {
    meta: {
      page: 1,
      limit: 20,
      sort: 'id',
      isLastPage: false
    },
    isFetching: false,
    result: [],
    adsRandom: Math.floor(Math.random()*1000)
  },
});

const entitiesReducer = (state = initState.get('entities'), action) => entities(state, action)
const productsGridReducer = (state = initState.get('productsGrid'), action) => productsGrid(state, action);

export default combineReducers({
  entities: entitiesReducer,
  productsGrid: productsGridReducer
})
