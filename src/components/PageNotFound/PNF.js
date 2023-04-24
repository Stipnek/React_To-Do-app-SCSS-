import { NavLink } from "react-router-dom";
import './PNF.scss';

export default function PageNotFound() {
  return (
    <div className='PNF-Container'>
      <h2>Page Not Found</h2>
      <h3>
        The page no longer exists or has never been created. <br/>
        Please, check the URL!
      </h3>
      <NavLink to={'/'}>Click here</NavLink> to return to the main page.
    </div>
  );
}