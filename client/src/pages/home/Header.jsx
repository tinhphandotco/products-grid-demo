import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { SERVER_URL } from 'config/constants';

const getRandomNumber = () => Math.floor(Math.random()*1000);

function Header({ adsRandom }) {
  return (
    <header>
      <h1>Products Grid</h1>
      <p>
        Here you're sure to find a bargain on some of the finest ascii available
        to purchase. Be sure to peruse our selection of ascii faces in an
        exciting range of sizes and prices.
      </p>
      <p>But first, a word from our sponsors:</p>{" "}
      <img className="ad" src={`${SERVER_URL}/ads/?r=${adsRandom}`} />
    </header>
  );
}

const mapStateToProps = store => ({
  adsRandom: store.products.productsGrid.get('adsRandom')
})

export default connect(mapStateToProps)(Header);