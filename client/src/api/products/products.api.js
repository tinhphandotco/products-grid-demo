import request from 'api/request';

/**
 * API get products with pagination
 */
const defaultMeta = {
  page: 1,
  limit: 20
}
export const getProducts = ({
  page,
  limit
} = defaultMeta) => {
  return request().get(`/products?_page=${page}&_limit=${limit}`)
    .then(res => res.data)
}