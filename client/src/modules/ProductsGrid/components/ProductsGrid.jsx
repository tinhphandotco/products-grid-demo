import React, { useCallback, useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";

import { getProductsGridSelector } from "redux/reducers/products/selectors";
import { fetchProduct, updateProductsGridMeta } from "redux/reducers/products/actions";

import {
  Fetcher,
  Spinner
} from "elements";
import Product from "./Product";
import Ad from './Ad';

// HOC
import { withToJS } from "HOC";

import "./ProductsGrid.scss";

function ProductsGrid({ meta, products, entities, ...props }) {
  const dispatch = useDispatch();
  const prevR = useRef({
    page: meta.page,
    r: null,
    indexs: []
  });

  useEffect(() => {
    if (meta.page === 1 && prevR.current.r !== null) {
      prevR.current = {
        page: meta.page,
        r: null,
        indexs: []
      }
    }
  }, [meta, prevR])

  const onFetchMore = useCallback(done => {
    const newMeta = {
      ...meta,
      page: meta.page + 1
    };
    dispatch(
      updateProductsGridMeta(newMeta)
    )
    dispatch(fetchProduct(newMeta))
      .then(() => {
        done();
      })
  }, [dispatch, meta]);

  const getAd = useCallback((index) => {
    if (prevR.current.indexs.indexOf(index) > -1) return null;
    let r = null;
    const loop = () => {
      r = parseInt(Math.floor(Math.random()*1000), 10) % 10;
      if (prevR.current.r === r) {
        loop();
      }
    }
    loop();
    prevR.current.r = r;
    prevR.current.indexs.push(index)
    return r;
  }, [prevR])

  return (
    <div className="products-grid" id="products-grid">
      {
        props.isFetching && products.length === 0 && <div>
          <Spinner />
        </div>
      }
      {products.map((product, index) => (
        <React.Fragment key={index}>
          <Product key={index} product={product} />
          {
            (index + 1) % 20 === 0 && index > 0 ? <Ad index={index} r={getAd(index)} /> : null
          }
        </React.Fragment>
      ))}
      <Fetcher
        loading={<Spinner />}
        shouldFetchMore={!meta.isLastPage}
        parentId={"window"}
        onFetchMore={onFetchMore}
      />
    </div>
  );
}

const mapStateToProps = store => {
  return {
    isFetching: store.products.productsGrid.get('isFetching'),
    products: getProductsGridSelector(store),
    meta: store.products.productsGrid.get("meta")
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withToJS
)(ProductsGrid);
