import { mdiHome, mdiMagnify, mdiMessageProcessingOutline, mdiHeartOutline, mdiPlusBox, mdiLoginVariant, mdiCog } from '@mdi/js';
import Icon from '@mdi/react';
import "./Menu.css"
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useState } from 'react';
import CreatePost from '../CreatePost/CreatePost';
import Modal from '../Modal/Modal';


function Menu () {
  const [createPost, setCreatePost] = useState({});

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='menu'>
        <h1>InstaPic</h1>
        <div>
          <Icon path={mdiHome} size={1.25} />
          <p>Home</p>
        </div>
        <div>
          <Icon path={mdiMagnify} size={1.25} />
          <p>Search</p>
        </div>
        <div>
          <Icon path={mdiMessageProcessingOutline} size={1.25} />
          <p>Messages</p>
        </div>
        <div>
          <Icon path={mdiHeartOutline} size={1.25} />
          <p>Activity</p>
        </div>
        <div onClick={() => setCreatePost({...createPost, clicked: true})}>
          <Icon path={mdiPlusBox} size={1.25} />
          <p>Create</p>
        </div>
        <div className='logout-button' onClick={logOut}>
          <Icon path={mdiLoginVariant} size={1.25} />
          <p>Log Out</p>
        </div>
        <div>
          <Icon path={mdiCog} size={1.25} />
          <p>Settings</p>
        </div>
      </div>
      {createPost.clicked && <CreatePost setDisableModal={setCreatePost}/>}
    </>
  )
}

export default Menu