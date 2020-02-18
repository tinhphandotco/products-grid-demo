import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import withToJS from 'HOC/withToJS';

import {
  ProductsHeader,
  ProductsGrid
} from './components';

// actions
import {
  fetchProduct
} from 'redux/reducers/products/actions'

function ProductsGridModule({ meta }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // component did mount
    dispatch(fetchProduct(meta))
  }, [dispatch, meta])

  return (
    <React.Fragment>
      <ProductsHeader />
      <ProductsGrid />
    </React.Fragment>
  );
}

const mapStateToProps = store => ({
  meta: store.products.productsGrid.get('meta')
});
const mapDispatchToProps = {
  fetchProduct
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withToJS
)(ProductsGridModule)