import React, { useState, useEffect, useCallback, useRef } from "react";

import './Fetcher.scss';

function Fetcher({ parentId, loading, onFetchMore, shouldFetchMore, stopBanner }) {
  const [isFetching, setIsFetching] = useState(false);

  const onFetching = useCallback(() => {
    setIsFetching(true);
    onFetchMore(() => {
      setTimeout(() => {
        setIsFetching(false)
      }, 500);
    })
  }, [onFetchMore])

  const onScroll = useCallback(() => {
    const el = parentId === "window" ? window : document.getElementById(parentId);
    let isTouchBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 1;

    if (parentId === "window") {
      isTouchBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    }

    if (isTouchBottom && isFetching === false && shouldFetchMore && (parentId === "window" ? el.scrollY : el.scrollTop) > 0) {
      onFetching();
    }
  }, [isFetching, shouldFetchMore, onFetching, parentId]);

  useEffect(() => {
    const el = parentId === "window" ? window : document.getElementById(parentId);

    el.addEventListener("scroll", onScroll);

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [onScroll, parentId]);

  return <div className="fetcher">
    {
      isFetching ? loading || <div>Loading more ...</div> : null
    }
    {
      !shouldFetchMore && <div>
        {
          stopBanner || "~ end of catalogue ~"
        }
      </div>
    }
  </div>;
}

export default React.memo(Fetcher);
