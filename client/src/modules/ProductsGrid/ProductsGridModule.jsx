import React, { useEffect, useRef } from 'react';
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

function ProductsGridModule({ meta, total }) {
  const dispatch = useDispatch();
  const metaInit = useRef(meta);
  
  useEffect(() => {
    dispatch(fetchProduct(metaInit.current))
  }, [dispatch, metaInit])

  return (
    <React.Fragment>
      <ProductsHeader totalProducts={total} />
      <ProductsGrid />
    </React.Fragment>
  );
}

const mapStateToProps = store => ({
  meta: store.products.productsGrid.get('meta'),
  total: store.products.productsGrid.get('result').size
});
const mapDispatchToProps = {
  fetchProduct
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withToJS
)(ProductsGridModule)