import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import "./CreatePost.css";


function CreatePost () {
  
  return (
    <div>
      <div className="create-post-bar">
        <Icon path={mdiArrowLeft} size={1.25}/>
      </div>
      <div className="drag-n-drop-container">

      </div>
    </div>
  )
}

export default CreatePost;