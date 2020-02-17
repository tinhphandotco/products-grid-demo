import React from 'react';

import './ProductsHeader.scss'

export default function ProductsHeader() {
  return (
    <div className="products-grid-header">
      <div className="total">16 Product(s) found.</div>
      <div className="sort">
        <span>Order by</span>
        <select name="" id="">
          <option value="">Id</option>
          <option value="">Size</option>
          <option value="">Price</option>
        </select>
      </div>
    </div>
  )
}