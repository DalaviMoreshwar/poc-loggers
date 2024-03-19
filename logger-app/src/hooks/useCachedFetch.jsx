import { useState, useEffect } from "react";

const useCachedFetch = (url, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);

  // Unique identifier for cache based on URL
  const cacheKey = JSON.stringify(url);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      // Check for cached data before fetching
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          setData(JSON.parse(cachedData));
          setIsLoading(false);
          return; // Early exit if data is found in cache
        } catch (error) {
          // Handle potential parsing errors from cache
          console.error("Error parsing cached data:", error);
        }
      }

      // Fetch data from the API only if not found in cache
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        localStorage.setItem(cacheKey, JSON.stringify(fetchedData)); // Cache fetched data
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data only if data is not already present or on initial render
    if (data === null) {
      fetchData();
    }

    // Cleanup function to prevent memory leaks (optional)
    return () => {};
  }, [url, data, cacheKey]); // Dependency array includes url and data to trigger fetch on url change or data reset

  return { data, isLoading, isError };
};

export default useCachedFetch;
