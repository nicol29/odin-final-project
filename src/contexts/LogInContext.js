import { createContext, useState } from "react";

const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <LogInContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {children}
    </LogInContext.Provider>
  )
}

export default LogInContext;