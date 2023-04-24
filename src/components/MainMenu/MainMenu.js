import { NavLink } from "react-router-dom";
import './MainMenu.scss';


const MainMenu = () => {
  return (
    <nav>
      <NavLink to='/'>Tasks</NavLink>
      <NavLink to='/add'>Add</NavLink>
      <NavLink to='/help'>Help</NavLink>
    </nav>
  )
}

export default MainMenu;