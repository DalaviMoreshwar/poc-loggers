// Simulate SSO login
export const ssoLogin = (username, password) => {
  // In a real application, this would involve sending a request to an authentication server
  // For simplicity, we'll just check if the username and password match a predefined set
  if (username === "user" && password === "password") {
    return "authToken"; // Return a token upon successful login
  }

  return null;
};

export const ssoLogout = () => {
  // In a real application, this would involve invalidating the session on the server
  // For simplicity, we'll just remove the token from local storage
  localStorage.removeItem("authToken");
};
