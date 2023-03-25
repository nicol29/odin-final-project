import { mdiHome, mdiMagnify, mdiMessageProcessingOutline, mdiHeartOutline, mdiPlusBox, mdiLoginVariant, mdiCog } from '@mdi/js';
import Icon from '@mdi/react';
import "./Menu.css"
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';

function Menu () {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
      <div>
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
  )
}

export default Menu