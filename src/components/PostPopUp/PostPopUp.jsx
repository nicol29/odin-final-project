import { useEffect, useState } from "react";
import "./PostPopUp.css";

function PostPopUp ({ modalInfo, setModalInfo, usersPosts}) {
  const [selectedPost, setSelectedPosts] = useState({});

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
  }, []);

  return (
    <div className="post-modal-bg" onClick={(e) => toggleModal(e)}>
      <div className="close-modal">
        ✕
      </div>
      <div className="post-modal-container">
        <div className="image-side">
          <img src={selectedPost?.image} alt="Post from user"/>
        </div>
        <div className="comments-side">
          
        </div>
      </div>
    </div>
  );
}

export default PostPopUp;