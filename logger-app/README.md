# Core Skeleton

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Logger

`./logger.js` is a simple template that prints the log messages of the component rendered with the given log level and log message format for each log level passed in the template.

## Cookie Support

To create a custom hook for cookie management in React, we'll use the `js-cookie` library for handling cookies. This custom hook, `useCookie`, will abstract away the direct interaction with `js-cookie`, simplifying updates, removals, and state management. It will synchronize the cookie value with React state, ensuring consistency between cookies and React components, and encapsulate the cookie logic within a reusable hook, making component code cleaner and more focused on its main functionality.

First, ensure you have `js-cookie` installed in your project:

```bash
npm install js-cookie
```

The `useCookie` hook allows you to effortlessly handle cookies by providing a concise interface. Upon initialization, `useCookie` retrieves the cookie value with the specified name. If the cookie exists, it returns its value; otherwise, it sets the cookie to the default value provided.

### USAGE

```jsx
import { ConsoleLogger } from "./logger";

function App() {
  const [usename, setUserName, deleteUsername] = useCookie({
    name: "guest",
    initialValue: "Jack",
    expires: 1,
  });


  <h1>Cookie Usage</h1>
  <h2>{usename}</h2>
  <button onClick={() => setUserName("Martini")}>Update Username</button>
  <button onClick={deleteUsername}>Delete Username</button>
}

export default App;
```

---

## Caching Data

`useCachedFetch`: This custom hook takes the URL of the API endpoint as its first argument and an optional `initialData` argument to specify a default value for the state before fetching.

```javascript
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
```

### USAGE

```javascript
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
```
