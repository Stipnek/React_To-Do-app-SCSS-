import { NavLink, Outlet } from 'react-router-dom';
import './Help.scss';

export default function Help() {
  return (
    <div className='helpPageContainer'>
      <div>
        <Outlet />
      </div>

      <aside>
        <ul>
          <li><NavLink to={'/help'}>Help</NavLink></li>
          <li><NavLink to={'/help/add'}>Add</NavLink></li>
          <li><NavLink to={'/help/remove'}>Remove</NavLink></li>
        </ul>
      </aside>
    </div>

  );
}

