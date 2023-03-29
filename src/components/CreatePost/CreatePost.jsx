import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import "./CreatePost.css";
import { useContext, useState } from 'react';
import { storage, db } from '../../config/firebase-config';
import { uploadBytes, ref } from 'firebase/storage';
import UserDataContext from '../../contexts/UserDataContext';
import { collection, Timestamp, addDoc } from 'firebase/firestore';

function CreatePost ({ setDisableModal }) {
  const [postDetails, setPostDetails] = useState({});
  const [userData, setUserData] = useContext(UserDataContext);

  const toggleModal = (e) => {
    const target = e.target.className;

    if (target === "post-modal-bg" || target === "close-modal") {
      setDisableModal({clicked: false})
    }
  }

  const handleMedia = (e) => {
    e.preventDefault();

    const droppedItem = e.dataTransfer.files[0];

    if(
      droppedItem.type === "image/jpeg" || 
      droppedItem.type === "image/jpg" ||
      droppedItem.type === "image/png"
    ) {
      const reader = new FileReader();

      reader.readAsDataURL(droppedItem);
      reader.onload = () => {
        setPostDetails({
          ...postDetails, 
          img: reader.result, 
          fileObj: droppedItem,
          fileName: droppedItem.name,
          errorMessage: undefined
        });
      }
    } else {
      setPostDetails({...postDetails, errorMessage: "Unsupported file type. Only .jpeg .jpg .png supported"});
    }
  }

  const uploadPost = async () => {
    const imgRef = ref(storage, `users/${userData.uid}/post-pictures/${postDetails.fileName}`);
    const uploadImg = await uploadBytes(imgRef, postDetails.fileObj);

    const docRef = await addDoc(collection(db, "posts"), {
      caption: postDetails.caption,
      date: Timestamp.fromDate(new Date()),
      image: `gs://instapic-966ac.appspot.com/users/${userData.uid}/post-pictures/${postDetails.fileName}`,
      likes: 0,
      uid: userData.uid
    });

    Promise.all([uploadImg, docRef]).then(() => setDisableModal({clicked: false}));
  }

  return (
    <div className="post-modal-bg" onClick={(e) => toggleModal(e)}>
      <div className="close-modal">
        ✕
      </div>
      <div className="create-modal-container">
        <div className="create-post-bar">
          {postDetails.img &&
            <Icon path={mdiArrowLeft} size={1.25} onClick={() => setPostDetails({...postDetails, img: undefined})}/>
          }
          <h2>Create new post</h2>
          {postDetails.img && <p onClick={(e) => {
            e.target.innerText = "Posting...";
            uploadPost();
          }}>Share</p>}
        </div>
        <div className="create-container">
          {!postDetails.img ? 
            <div className="drop-area" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleMedia(e)}>
              <div>
                <p>Drop images here</p>
                <input type="file" onChange={(e) => handleMedia(e)}></input>
                <p className='format-error'>{postDetails?.errorMessage}</p>
              </div>
            </div> :
            <>
              <div className="create-image-side">
                  <img src={postDetails.img} alt="upload from user"/>
              </div>
              <div className="create-caption-side">
                <div className="creators-info">
                  <img src={userData.profilePicture} alt="user profile"/>
                  <p>{userData.userName}</p>
                </div>
                <textarea 
                  placeholder="Write a caption..." 
                  onChange={(e) => setPostDetails({...postDetails, caption: e.target.value})}
                  value={postDetails.caption}
                ></textarea>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default CreatePost;