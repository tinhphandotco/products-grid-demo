import React from 'react';

// modules
import ProductsGrid from 'modules/ProductsGrid'
import Header from './Header';

import './HomePage.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <ProductsGrid />
    </div>
  );
}

export default App;
