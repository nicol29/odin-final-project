import { mdiHome, mdiMagnify, mdiMessageProcessingOutline, mdiHeartOutline, mdiPlusBox } from '@mdi/js';
import Icon from '@mdi/react';
import "./Menu.css"

function Menu () {
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
    </div>
  )
}

export default Menu