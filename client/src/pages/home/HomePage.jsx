import React from 'react';

import {
  ProductsHeader,
  ProductsGrid
} from './components';

import './HomePage.scss';

function App() {
  return (
    <div className="App">
      <ProductsHeader />
      <ProductsGrid />
    </div>
  );
}

export default App;
