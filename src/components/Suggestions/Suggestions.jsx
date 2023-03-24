import { useEffect, useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getDoc, doc } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import "./Suggestions.css";

function Suggestions () {
  const [userObj, setUserObj] = useState({});
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const downloadImage = async () => {
    const profilePicRef = ref(storage, userObj.profilePicture);
    
    const downloadedPicture = await getDownloadURL(profilePicRef);
    setUserObj({ ...userObj, profilePicture: downloadedPicture });
  }
 
  useEffect(() => {
    (async () => {
      const res = await getDoc(doc(db, "users", loggedInUser.uid));
      const userProfile = res.data()

      const profilePicRef = ref(storage, userProfile.profilePicture);
      const downloadedPicture = await getDownloadURL(profilePicRef);
      
      setUserObj({ ...userProfile, profilePicture: downloadedPicture });
    })();
  }, []);

  return (
    <div className="profile-access-container">
      <div className="profile-access">
        <img src={userObj.profilePicture}/>
        <div>
          <p>{userObj.userName}</p>
          <p>{userObj.fullName}</p>
        </div>
      </div>
    </div>
  )
}

export default Suggestions;

