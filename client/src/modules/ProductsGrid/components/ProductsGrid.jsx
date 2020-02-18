import React, { useCallback, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";

import { getProductsGridSelector } from "redux/reducers/products/selectors";
import { updateProductsGridMeta } from "redux/reducers/products/actions";

import Fetcher from "elements/Fetcher";
import Product from "./Product";

// HOC
import { withToJS } from "HOC";

import "./ProductsGrid.scss";

function ProductsGrid({ meta, products, entities, ...props }) {
  const dispatch = useDispatch();

  const onFetchMore = useCallback(done => {
    dispatch(
      updateProductsGridMeta({
        ...meta,
        page: meta.page + 1
      })
    )
  }, [dispatch, meta]);

  return (
    <div className="products-grid" id="products-grid">
      {
        props.isFetching && <div>
          ...
        </div>
      }
      {products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
      <Fetcher
        shouldFetchMore={!meta.isLastPage}
        parentId={"products-grid"}
        onFetchMore={onFetchMore}
      />
    </div>
  );
}

const mapStateToProps = store => {
  return {
    // products: store.products.productsGrid
    //   .get("result")
    //   .map(id => store.products.entities.getIn(['byId', id + ''])),
    isFetching: store.products.productsGrid.get('isFetching'),
    products: getProductsGridSelector(store),
    meta: store.products.productsGrid.get("meta")
    // entities: store.products
  };
  // return {
  //   meta: store.products.productsGrid.meta,
  //   products: store.products.productsGrid.result.map(id => store.products.entities.byId[id]),
  // }
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withToJS
)(ProductsGrid);
