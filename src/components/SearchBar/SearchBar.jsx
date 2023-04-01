import { db } from "../../config/firebase-config";
import { collection, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import retrieveImagesAndDocIds from "../../helpers/retrieveImagesAndDocIds";
import { Link } from "react-router-dom";
import "./SearchBar.css";


function SearchBar () {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMatches, setSearchMatches] = useState([]);

  const getSearchedUsers = async () => {
    const q = query(collection(db, "users"), where("searchTerms", "array-contains", searchTerm.toLocaleLowerCase()));
    retrieveImagesAndDocIds(q, setSearchMatches, "profile");
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
          <div className="profile-access">
            <img src={match.profilePicture} alt="searched profile"/>
            <div>
              <Link to={`/${match.documentId}`}>{match.userName}</Link>
              <p>{match.fullName}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchBar;