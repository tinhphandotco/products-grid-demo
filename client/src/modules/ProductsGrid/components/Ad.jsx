import React from 'react';
import { SERVER_URL } from 'config/constants';

function Ad({ r }) {
  return (
    <div className="ad">
      <img className="ad" src={`${SERVER_URL}/ads/?r=${r}`} />
    </div>
  )
}

export default React.memo(Ad, (prevProps, nextProps) => {
  return true; // Ad should render in the first time
});