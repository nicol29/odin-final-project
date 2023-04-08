import { useContext } from "react";
import UserDataContext from "../../contexts/UserDataContext";
import ProfileContext from "../../contexts/ProfileContext";
import { Link } from "react-router-dom";
import "./Suggestions.css";

function Suggestions () {
  const [userData, setUserData] = useContext(UserDataContext);
  const [profileToRender, setProfileToRender] = useContext(ProfileContext);

  return (
    <div className="profile-access-container">
      <div className="profile-access">
        <img src={userData?.profilePicture} alt="profile"/>
        <div>
          <Link 
            to={`/${userData?.userName}`} 
            onClick={((e) => setProfileToRender({userName: e.target.innerText, uid: userData.uid}))}
          >{userData?.userName}</Link>
          <p>{userData?.fullName}</p>
        </div>
      </div>
    </div>
  )
}

export default Suggestions;

