import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;