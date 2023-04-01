import { mdiHome, mdiMagnify, mdiMessageProcessingOutline, mdiHeartOutline, mdiPlusBox, mdiLoginVariant, mdiCog } from '@mdi/js';
import Icon from '@mdi/react';
import "./Menu.css"
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useState, useRef } from 'react';
import CreatePost from '../CreatePost/CreatePost';
import SearchBar from '../SearchBar/SearchBar';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';

function Menu () {
  const sideMenu = useRef(null)
  const expandingMenuRef = useRef(null);

  const [createPost, setCreatePost] = useState({});
  const [menuOptions, setMenuOptions] = useState({});

  useDetectOutsideClick(sideMenu, expandingMenuRef, () => (setMenuOptions({...menuOptions, active: false})));

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  const expandMenu = (component) => {
    if (menuOptions.display) {
      setMenuOptions({...menuOptions, display: component, active: !menuOptions.active});
    } else {
      setMenuOptions({...menuOptions, display: component, active: true});
    }
  }

  const shrinkMenu = () => {
    setMenuOptions({...menuOptions, display: undefined});
  }

  return (
    <>
      <div className='menu' ref={sideMenu}>
        <h1>InstaPic</h1>
        <div>
          <Icon path={mdiHome} size={1.25} />
          <p>Home</p>
        </div>
        <div onClick={() => expandMenu(<SearchBar />)} data-action="">
          <Icon path={mdiMagnify} size={1.25} />
          <p>Search</p>
        </div>
        <div>
          <Icon path={mdiMessageProcessingOutline} size={1.25} />
          <p>Messages</p>
        </div>
        <div>
          <Icon path={mdiHeartOutline} size={1.25} data-action=""/>
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
      <div 
          ref={expandingMenuRef} 
          className={menuOptions.active ? "expand-container expand-effect" : "expand-container"}>
        <div className={menuOptions.active ? "expand-contents expand-effect-children" : "expand-contents"}>
          {menuOptions.display}
        </div>
      </div>
    </>
  )
}

export default Menu;