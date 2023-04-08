import Menu from "../Menu/Menu";
import PostPopUp from "../PostPopUp/PostPopUp";
import ProfileContext from "../../contexts/ProfileContext";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, getCountFromServer, getDoc, doc } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import uniqid from "uniqid";
import retrieveImagesAndDocIds from "../../helpers/retrieveImagesAndDocIds";
import "./Profile.css";


function Profile () {
  const [profileToRender, setProfileToRender] = useContext(ProfileContext);

  const [profileData, setProfileData] = useState({});
  const [usersPosts, setUsersPosts] = useState([]);
  const [followerCount, setFollowerCount] = useState();
  const [followingCount, setFollowingCount] = useState();
  const [modal, setModal] = useState({});

  const manageModal = (e) => {
    const specificPost = e.target.getAttribute('data-doc-id');

    if(specificPost) setModal({...modal, show: true, postId: specificPost})
  }

  const getProfileInformation = async () => {
    const snap = await getDoc(doc(db, "users", profileToRender.uid));

    const profilePicsRef = ref(storage, snap.data().profilePicture);
    const downloadedPicture = await getDownloadURL(profilePicsRef);
    
    setProfileData({...snap.data(), profilePicture: downloadedPicture});
  }

  const getFollowersCount = async () => {
    const snap = await getCountFromServer(collection(db, "users", profileToRender.uid, "followers"));
    setFollowerCount(snap.data().count);
  }

  const getFollowingCount = async () => {
    const snap = await getCountFromServer(collection(db, "users", profileToRender.uid, "following"));
    setFollowingCount(snap.data().count);
  }

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "users"), where("userName", "==", profileToRender.userName));
      const snap = await getDocs(q);
      
      setProfileToRender({...profileToRender, uid: snap.docs[0].id});
    })()
  }, []);

  useEffect(() => {
    if(profileToRender.uid) {
      const usersPostQuery = query(collection(db, "posts"), where("uid", "==", profileToRender.uid));

      getProfileInformation();
      retrieveImagesAndDocIds(usersPostQuery, setUsersPosts, "post");
      getFollowersCount();
      getFollowingCount();
    }
  }, [profileToRender]);

  return (
    <>
      <Menu />
      <div className="profile-display-container">
        <div className="profile">
          <div className="top-half">
            <div>
              <img src={profileData?.profilePicture} alt="profile" />
              <div className="profile-info">
                <div>
                  <p>{profileData?.userName}</p>
                  <button>Edit Profile</button>
                </div>
                <div className="counts">
                  <p>{usersPosts.length} posts</p>
                  <p>{followerCount} followers</p>
                  <p>{followingCount} following</p>
                </div>
                <div>
                  <p className="username-display">{profileData?.fullName}</p>
                  <p>{profileData?.bio}</p>
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
      { modal.show === true && 
        <PostPopUp 
          modalInfo={modal} 
          setModalInfo={setModal} 
          usersPosts={usersPosts}
          profileData={profileData} />
      }
    </>
  )
}

export default Profile;