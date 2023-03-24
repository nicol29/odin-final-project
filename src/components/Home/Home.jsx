import Menu from "../Menu/Menu";
import Post from "../Post/Post";
import Suggestions from "../Suggestions/Suggestions";
import { useEffect } from "react";
import "./Home.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";


function Home () {
  const retrieveFollowingsPosts = async () => {
    // const user = await getDoc(doc(db, "users", "JoIAINZ58Ub4yLHs7S2za2B9ccK2"));
    // console.log(user)
  };

  useEffect(() => {
    retrieveFollowingsPosts();
  });

  return (
    <>
      <Menu />
      <div className="content-container">
        <div className="feed-container">
          <Post />
          <Post />
          <Post />
        </div>
        <div className="suggestions-container">
          <Suggestions />
        </div>
      </div>
    </>
  )
}

export default Home;