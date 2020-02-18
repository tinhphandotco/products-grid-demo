import { normalize, schema } from 'normalizr'

import ProductsAPI from 'api/products';
import { requestAction } from 'redux/utils';
import { FETCH_PRODUCTS, UPDATE_META } from './types';

const productSchema = new schema.Entity('products')
const productsSchema = new schema.Array(productSchema)

export const fetchProduct = (meta) => {
  return requestAction(
    FETCH_PRODUCTS,
    ProductsAPI.getProducts,
    res => { // normalizePayload
      return normalize(res, productsSchema);
    }
  )(meta);
}

export const updateProductsGridMeta = meta => ({
  type: UPDATE_META,
  payload: meta
})