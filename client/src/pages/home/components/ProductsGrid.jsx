import React, { useState, useEffect, useCallback } from "react";

import Fetcher from "elements/Fetcher";
import Product from "./Product";

import "./ProductsGrid.scss";

export default function ProductsGrid() {
  const [products, setProducts] = useState(
    Array(30).fill({
      id: "14198-3ncn8vpg4tw",
      size: 32,
      price: 965,
      face: "(ง •̀_•́)ง",
      date: "Sun Feb 16 2020 14:06:09 GMT+0700 (Indochina Time)"
    })
  );

  const onFetchMore = useCallback(
    done => {
      setTimeout(() => {
        setProducts([
          ...products,
          ...Array(30).fill({
            id: "14198-3ncn8vpg4tw",
            size: 32,
            price: 965,
            face: "(ง •̀_•́)ง",
            date: "Sun Feb 16 2020 14:06:09 GMT+0700 (Indochina Time)"
          })
        ]);
        done();
      }, 3000);
    },
    [products]
  );

  return (
    <div className="products-grid" id="products-grid">
      {products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
      <Fetcher
        shouldFetchMore={products.length < 100}
        parentId={"products-grid"}
        onFetchMore={onFetchMore}
      />
    </div>
  );
}
