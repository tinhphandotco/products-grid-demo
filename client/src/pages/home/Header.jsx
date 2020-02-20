import React, { useState, useEffect } from "react";

const getRandomNumber = () => Math.floor(Math.random()*1000);

function Header() {
  const [randomNumber, setRandomNumber] = useState(getRandomNumber())

  useEffect(() => {
    const loopChangeImage = setInterval(() => {
      setRandomNumber(getRandomNumber());
    }, 20000); // 20s
    return () => {
      clearInterval(loopChangeImage);
    }
  }, [])

  return (
    <header>
      <h1>Products Grid</h1>
      <p>
        Here you're sure to find a bargain on some of the finest ascii available
        to purchase. Be sure to peruse our selection of ascii faces in an
        exciting range of sizes and prices.
      </p>
      <p>But first, a word from our sponsors:</p>{" "}
      <img class="ad" src={`http://localhost:3001/ads/?r=${randomNumber}`} />
    </header>
  );
}

export default Header;