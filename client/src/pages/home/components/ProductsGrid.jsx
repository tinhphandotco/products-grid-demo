import React, { useState, useEffect, useCallback } from "react";

import Fetcher from "elements/Fetcher";
import Product from "./Product";

import "./ProductsGrid.scss";

export default function ProductsGrid() {
  const [products, setProducts] = useState(Array(30).fill(1));

  const onFetchMore = useCallback(
    done => {
      setTimeout(() => {
        setProducts([
          ...products,
          ...Array(30).fill(2)
        ])
        done();
      }, 3000);
    },
    [products]
  );

  return (
    <div className="products-grid" id="products-grid">
      {products.map((_, index) => (
        <Product key={index} />
      ))}
      <Fetcher
        shouldFetchMore={products.length < 100}
        parentId={"products-grid"}
        onFetchMore={onFetchMore}
      />
    </div>
  );
}
