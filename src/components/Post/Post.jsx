import "./Post.css";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart, mdiCommentOutline, mdiBookmarkOutline } from "@mdi/js";

function Post () {

  return (
    <div className="post-container">
      <div className="post-profile-info">
        <img className="profile-picture" src="https://firebasestorage.googleapis.com/v0/b/instapic-966ac.appspot.com/o/profile-pic-blank.jpeg?alt=media&token=d0936b71-7958-49ef-9172-364be30e4818" alt="" />
        <p>_belik99</p> 
      </div>
      <img className="post-picture" src="https://firebasestorage.googleapis.com/v0/b/instapic-966ac.appspot.com/o/people-1057167.jpg?alt=media&token=1bb6c387-ee25-4183-a35a-0f2d549f95d5" alt="" />
      <div className="interactables">
        <Icon path={mdiHeartOutline} size={1.25}/>
        <Icon path={mdiCommentOutline} size={1.25}/>
        <Icon path={mdiBookmarkOutline} size={1.25}/>
      </div>
      <p>Liked by sabari_sz and others</p>
      <p>_belik99 First Day in New York!</p>
      <p>View All Comments</p>
      <input type="text" placeholder="Add a comment..."/>
    </div>
  )
}

export default Post;