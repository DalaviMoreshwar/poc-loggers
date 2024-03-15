import "./App.css";
import useCookie from "./hooks/useCookie";
import { ConsoleLogger } from "./utils/logger";

function App() {
  const logger = new ConsoleLogger();
  const [usename, setUserName, deleteUsername] = useCookie({
    name: "guest",
    initialValue: "Jack",
    expires: 1,
  });

  logger.log("Hello!");
  logger.warn("Careful there!");
  logger.error("Oh, no!");

  return (
    <>
      <h1>Logger Demo</h1>

      <h1>Cookie Usage</h1>
      <h2>{usename}</h2>
      <button onClick={() => setUserName("Martini")}>Update Username</button>
      <button onClick={deleteUsername}>Delete Username</button>
    </>
  );
}

export default App;
