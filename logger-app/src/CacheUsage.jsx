import useCachedFetch from "./hooks/useCachedFetch";

function CacheUsage() {
  const API_URL = `https://dummyjson.com/products/1`;

  const { data, isLoading, isError } = useCachedFetch(API_URL);

  if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Error loading data...</p>;

  return (
    <div>
      {data && (
        <>
          <p>{data.title}</p>
          <img src={data.thumbnail} alt={data.title} />
        </>
      )}
    </div>
  );
}

export default CacheUsage;
