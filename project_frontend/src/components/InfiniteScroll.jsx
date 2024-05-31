import { useEffect, useRef, useState } from "react";

const InfiniteScroll = ({ fetchMoreData, hasMore }) => {
  const [isFetching, setIsFetching] = useState(false);
  const scrollContainer = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const handleScroll = () => {
      if (
        scrollContainer.current &&
        scrollContainer.current.scrollTop + scrollContainer.current.clientHeight >=
          scrollContainer.current.scrollHeight - 20
      ) {
        setIsFetching(true);
      }
    };

    scrollContainer.current.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.current.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  useEffect(() => {
    if (!isFetching) return;

    fetchMoreData().then(() => {
      setIsFetching(false);
    });
  }, [isFetching, fetchMoreData]);

  return (
    <div ref={scrollContainer} style={{ overflowY: "scroll", height: "400px" }}>
      {/* Content goes here */}
      {isFetching && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
