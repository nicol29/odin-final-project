import Menu from "../Menu/Menu";
import Feed from "../Feed/Feed";
import Suggestions from "../Suggestions/Suggestions";
import { useEffect, useContext } from "react";
import "./Home.css";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import UserDataContext from "../../contexts/UserDataContext";
import LogInContext from "../../contexts/LogInContext";



function Home () {
  const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
  const [userData, setUserData] = useContext(UserDataContext);

  useEffect(() => {
    (async () => {
        const res = await getDoc(doc(db, "users", loggedInUser.uid));
        const userProfile = res.data()
  
        const profilePicRef = ref(storage, userProfile.profilePicture);
        const downloadedPicture = await getDownloadURL(profilePicRef);

        setUserData({ ...userProfile, profilePicture: downloadedPicture, uid: loggedInUser.uid });
      })()
  }, []);

  return (
    <>
      <Menu />
      <div className="content-container">
        <Feed />
        <div className="suggestions-container">
          <Suggestions />
        </div>
      </div>
    </>
  )
}

export default Home;