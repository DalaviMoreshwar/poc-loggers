import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ConsoleLogger } from "../utils/logger";

function useCookie({ name, initialValue = "", expires = 7 }) {
  const logger = new ConsoleLogger();
  const [value, setValue] = useState(() => {
    return Cookies.get(name) || initialValue;
  });

  useEffect(() => {
    Cookies.set(name, value, { expires });
  }, [name, value, expires]);

  const updateCookie = (newValue, newExpires) => {
    setValue(newValue);
    Cookies.set(name, newValue, { expires: newExpires || expires });
  };

  const deleteCookie = () => {
    logger.log(name);
    setValue("");
    Cookies.remove(name, { path: "/", domain: "localhost" });
  };

  return [value, updateCookie, deleteCookie];
}

export default useCookie;
