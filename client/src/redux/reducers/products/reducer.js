import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

import { entities, productsGrid } from './sub';

const getLimit = () => {
  if (window.innerHeight > 1000) {
    return 32;
  } else {
    return 16;
  }
}

// products
const initState = fromJS({
  entities: {
    byId: {},
    allIds: []
  },
  productsGrid: {
    meta: {
      page: 1,
      limit: getLimit(),
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
