import "./Profile.css";
import Menu from "../Menu/Menu";
import PostPopUp from "../PostPopUp/PostPopUp";
import UserDataContext from "../../contexts/UserDataContext";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import uniqid from "uniqid";


function Profile () {
  const [userData, setUserData] = useContext(UserDataContext);

  const [usersPosts, setUsersPosts] = useState([]);
  const [usersFollowers, setUsersFollowers] = useState([]);
  const [usersFollowings, setUsersFollowings] = useState([]);
  const [modal, setModal] = useState({});

  const manageModal = (e) => {
    const specificPost = e.target.getAttribute('data-doc-id');

    if(specificPost) setModal({...modal, show: true, postId: specificPost})
  }

  const getFollowers = async () => {
    const snap = await getDocs(collection(db, "users", userData.uid, "followers"));
    const followers = snap.docs.map(follower => follower.data());

    setUsersFollowers([...followers]);
  }

  const getFollowings = async () => {
    const snap = await getDocs(collection(db, "users", userData.uid, "following"));
    const followings = snap.docs.map(following => following.data());

    setUsersFollowings([...followings]);
  }

  useEffect(() => {
    (async () => {
      const usersPostQuery = query(collection(db, "posts"), where("uid", "==", userData.uid));
      const snap = await getDocs(usersPostQuery);
      const posts = snap.docs.map(post => {
        return {documentId: post.id, ...post.data()};
      });

      const pictures = posts.map(async (post) => {
        const postPicsRef = ref(storage, post.image);
        const downloadedPicture = await getDownloadURL(postPicsRef);
  
        return { ...post, image: downloadedPicture}
      })

      Promise.all([...pictures]).then((values) => {
        setUsersPosts([...values])
      });
    })();

    getFollowers();
    getFollowings();
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
                  <p>{usersFollowings.length} following</p>
                </div>
                <div>
                  <p className="username-display">{userData?.fullName}</p>
                  <p>{userData?.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-half">
            <div className="photo-grid-container" onClick={(e) => manageModal(e)}>
              {usersPosts.map(post => (
                <img 
                  src={post.image} 
                  alt="post" 
                  key={uniqid()}
                  data-doc-id={post.documentId}
                />))
              }
            </div>
          </div>
        </div>
      </div>
      {modal.show === true && <PostPopUp modalInfo={modal} setModalInfo={setModal} usersPosts={usersPosts}/>}
    </>
  )
}

export default Profile;