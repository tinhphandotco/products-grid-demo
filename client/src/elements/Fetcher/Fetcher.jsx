import React, { useState, useEffect, useCallback } from "react";

import './Fetcher.scss';

function Fetcher({ parentId, loading, onFetchMore, shouldFetchMore }) {
  const [isFetching, setIsFetching] = useState(false);

  const onScroll = useCallback(() => {
    const el = document.getElementById(parentId);
    const isTouchBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 1;

    if (isTouchBottom && isFetching === false && shouldFetchMore) {
      onFetching();
    }
  }, [isFetching, shouldFetchMore]);

  const onFetching = useCallback(() => {
    setIsFetching(true);
    onFetchMore(() => {
      setIsFetching(false)
    })
  }, [onFetchMore])

  useEffect(() => {
    const el = document.getElementById(parentId);
    el.addEventListener("scroll", onScroll);

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return <div className="fetcher">
    {
      isFetching ? loading || <div>Loading</div> : null
    }
  </div>;
}

export default Fetcher;
