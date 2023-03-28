import { mdiHeartOutline, mdiHeart, mdiBookmarkOutline } from "@mdi/js";
import { useEffect, useState, useContext } from "react";
import Icon from "@mdi/react";
import UserDataContext from "../../contexts/UserDataContext";
import "./PostPopUp.css";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import uniqid from "uniqid";
import Modal from "../Modal/Modal";

const retrievePhotoUrl = async (query, setState) => {
  const snap = await getDocs(query);
  const items = snap.docs.map(item => {
  return {...item.data()};
  })

  const pictures = items.map(async (item) => {
    const postPicsRef = ref(storage, item.profilePicture);
    const downloadedPicture = await getDownloadURL(postPicsRef);

    return { ...item, profilePicture: downloadedPicture}
  })

  Promise.all([...pictures]).then((values) => {
    setState([...values])
  });
}

function PostPopUp ({ modalInfo, setModalInfo, usersPosts}) {
  const [userData, setUserData] = useContext(UserDataContext);

  const [selectedPost, setSelectedPosts] = useState({});
  const [postComments, setPostComments] = useState([]);

  const toggleModal = (e) => {
    const target = e.target.className;

    if (target === "post-modal-bg" || target === "close-modal") {
      setModalInfo({});
    }
  }

  useEffect(() => {
    usersPosts.forEach(post => {
      if (post.documentId === modalInfo.postId) {
        setSelectedPosts({...post});
      }
    })

    const usersPostQuery = collection(db, "posts", modalInfo.postId, "comments");
    retrievePhotoUrl(usersPostQuery, setPostComments);
  }, []);

  return (
    <Modal setModalState={setModalInfo} modalStyle="post-modal-container">
      <div className="image-side">
          <img src={selectedPost?.image} alt="Post from user"/>
      </div>
      <div className="comments-side">
        <div className="user-posts-info">
          <img src={userData.profilePicture} alt="user profile"/>
          <p>{userData.userName}</p>
        </div>
        <div className="comments-container">
          {postComments.map(comment => (
            <div key={uniqid()}>
              <img src={comment.profilePicture} alt="user profile"/>
              <p><span style={{fontWeight: "bold"}}>{comment.userName}</span> {comment.text}</p>
            </div>
          ))}
        </div>
        <div className="post-actions-container">
          <div>
            <Icon path={mdiHeartOutline} size={1.25}/>
            <Icon path={mdiBookmarkOutline} size={1.25}/>
          </div>
          <p>Liked by</p>
          <p>2 hours ago</p>
        </div>
        <div className="add-comment-section">
          <input placeholder="Add a comment..."></input>
          <button>Post</button>
        </div>
      </div>
    </Modal>
  );
}

export default PostPopUp;