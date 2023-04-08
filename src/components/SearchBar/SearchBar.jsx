import { db } from "../../config/firebase-config";
import { collection, where, query, limit, getDocs } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import retrieveImagesAndDocIds from "../../helpers/retrieveImagesAndDocIds";
import { Link } from "react-router-dom";
import ProfileContext from "../../contexts/ProfileContext";
import "./SearchBar.css";
import uniqid from "uniqid";


function SearchBar () {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMatches, setSearchMatches] = useState([]);
  const [profileToRender, setProfileToRender] = useContext(ProfileContext);

  const getSearchedUsers = async () => {
    const q = query(collection(db, "users"), where("searchTerms", "array-contains", searchTerm.toLocaleLowerCase()), limit(20));
    retrieveImagesAndDocIds(q, setSearchMatches, "profile");
  }

  const assignProfileInfo = async (e) => {
    const profileUserName = e.currentTarget.querySelector(".profile-search-username").innerText;
    // const q = query(collection(db, "users"), where("userName", "==", profileUserName));
    // const snap = await getDocs(q);

    // setProfileToRender({ userName: profileUserName, uid: snap.docs[0].id});
    setProfileToRender({ userName: profileUserName });
  }

  useEffect(() => {
    getSearchedUsers();
  }, [searchTerm]);

  return (
    <>
      <div className="search-heading">
        <h2>Search</h2>
        <input 
          type="text" 
          placeholder="Search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="search-matches">
        {searchMatches.map(match => (
          <Link to={`/${match.userName}`} key={uniqid()} onClick={(e) => assignProfileInfo(e)}>
            <div className="search-profile">
              <img src={match.profilePicture} alt="searched profile"/>
              <div>
                <p className="profile-search-username">{match.userName}</p>
                <p>{match.fullName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default SearchBar;