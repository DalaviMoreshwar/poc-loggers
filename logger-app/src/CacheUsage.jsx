import useCachedFetch from "./hooks/useCachedFetch";

function CacheUsage() {
  const API_URL = `https://dummyjson.com/products/1`;

  const { data, isLoading, isError } = useCachedFetch(API_URL);

  if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Error loading data...</p>;

  return (
    <div>
      <h1>Cached Fetch</h1>
      {data && (
        <>
          <h2>{data.title}</h2>
          <p>${data.price}</p>
          <img src={data.thumbnail} alt={data.title} />
          <p>{data.description}</p>
        </>
      )}
    </div>
  );
}

export default CacheUsage;
