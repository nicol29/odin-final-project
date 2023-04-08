import { createContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider ({ children }) {
  const [profileToRender, setProfileToRender] = useState();

  return (
    <ProfileContext.Provider value={[profileToRender, setProfileToRender]}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext;