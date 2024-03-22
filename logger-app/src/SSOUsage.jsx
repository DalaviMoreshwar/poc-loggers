import { useState } from "react";
import useAuth from "./hooks/useAuth";
import { ssoLogin, ssoLogout } from "./utils/auth";

function SSOUsage() {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    ssoLogout();
    logout();
  };

  const handleLogin = () => {
    const token = ssoLogin(username, password);
    if (token) login(token);
    else alert("Login failed");

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1>SSO Usage</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome! You&apos;re logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>LogIn</button>
        </>
      )}
    </>
  );
}

export default SSOUsage;
