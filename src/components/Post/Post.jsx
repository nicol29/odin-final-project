import "./Post.css";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart, mdiCommentOutline, mdiBookmarkOutline } from "@mdi/js";
import getElapsedPostedTime from "../../helpers/getElapsedPostedTime";

function Post ({ postInformation }) {
  return (
    <div className="post-container" data-post-id={postInformation?.documentId}>
      <div className="post-profile-info">
        <img className="profile-picture" src={postInformation?.profilePicture} alt="" />
        <p>{postInformation?.userName}</p> 
        <p className="time-difference">{getElapsedPostedTime(postInformation?.date)}</p>
      </div>
      <img className="post-picture" src={postInformation?.image} alt="" />
      <div className="interactables">
        <Icon path={mdiHeartOutline} size={1.25}/>
        <Icon path={mdiCommentOutline} size={1.25}/>
        <Icon path={mdiBookmarkOutline} size={1.25}/>
      </div>
      <p>Liked by sabari_sz and others</p>
      <p><span>{postInformation?.userName}</span> {postInformation?.caption}</p>
      <p>View All Comments</p>
      <input type="text" placeholder="Add a comment..."/>
    </div>
  )
}

export default Post;