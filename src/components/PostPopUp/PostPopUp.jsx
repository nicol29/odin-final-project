import { mdiHeartOutline, mdiHeart, mdiBookmarkOutline } from "@mdi/js";
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import "./PostPopUp.css";
import { collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import uniqid from "uniqid";
import Modal from "../Modal/Modal";
import retrieveImagesAndDocIds from "../../helpers/retrieveImagesAndDocIds";


function PostPopUp ({ modalInfo, setModalInfo, usersPosts, profileData}) {
  const [selectedPost, setSelectedPosts] = useState({});
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    usersPosts.forEach(post => {
      if (post.documentId === modalInfo.postId) {
        setSelectedPosts({...post});
      }
    })

    const usersPostQuery = collection(db, "posts", modalInfo.postId, "comments");
    retrieveImagesAndDocIds(usersPostQuery, setPostComments, "profile");
  }, []);

  return (
    <Modal setModalState={setModalInfo} modalStyle="post-modal-container">
      <div className="image-side">
          <img src={selectedPost?.image} alt="Post from user"/>
      </div>
      <div className="comments-side">
        <div className="user-posts-info">
          <img src={profileData.profilePicture} alt="user profile"/>
          <p>{profileData.userName}</p>
        </div>
        <div className="comments-container">
          {selectedPost.caption !== "" &&
            <div>
              <img src={profileData.profilePicture} alt="user profile"/>
              <p><span style={{fontWeight: "bold"}}>{profileData.userName}</span> {selectedPost.caption}</p>
            </div>
          }
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