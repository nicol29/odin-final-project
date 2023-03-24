import "./Post.css";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart, mdiCommentOutline, mdiBookmarkOutline } from "@mdi/js";

function Post () {

  return (
    <div className="post-container">
      <div className="post-profile-info">
        <img className="profile-picture" src="" alt="" />
        <p>_belik99</p> 
        <p>• 2 d</p>
      </div>
      <img className="post-picture" src="" alt="" />
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