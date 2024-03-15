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
