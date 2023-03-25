import "./Profile.css";
import Menu from "../Menu/Menu";
import UserDataContext from "../../contexts/UserDataContext";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

function Profile () {
  const [userData, setUserData] = useContext(UserDataContext);

  const [usersPosts, setUsersPosts] = useState([{caption: "hi"}]);

  let usersFollowers = [];
  let usersFollowing = [];

  useEffect(() => {
    const usersPostQuery = query(collection(db, "posts"), where("uid", "==", userData.uid));

    (async () => {
      const snap = await getDocs(usersPostQuery);
      const posts = snap.docs.map(post => post.data());

      const pictures = posts.map(async (post) => {
        const postPicsRef = ref(storage, post.image);
        const downloadedPicture = await getDownloadURL(postPicsRef);
  
        return { ...post, image: downloadedPicture}
      })

      Promise.all([...pictures]).then((values) => {
        setUsersPosts([...values])
      });
    })();
  }, []);

  return (
    <>
      <Menu />
      <div className="profile-display-container">
        <div className="profile">
          <div className="top-half">
            <div>
              <img src={userData?.profilePicture} alt="profile" />
              <div className="profile-info">
                <div>
                  <p>{userData?.userName}</p>
                  <button>Edit Profile</button>
                </div>
                <div className="counts">
                  <p>{usersPosts.length} posts</p>
                  <p>{usersFollowers.length} followers</p>
                  <p>{usersFollowing.length} following</p>
                </div>
                <div>
                  <p>{userData?.fullName}</p>
                  <p>{userData?.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-half">
            <div className="photo-grid-container">
              {usersPosts.map(post => <img src={post.image} alt="post"/>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;