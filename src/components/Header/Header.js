import './Header.scss';
import { BsListCheck } from 'react-icons/bs';
import MainMenu from '../MainMenu/MainMenu';

const Header = () => {
  return (
    <>
      <header>
        <div className="title"><BsListCheck className="titleIcon" />Todo App</div>
        <div className="author">by Stipnek Artem</div>
      </header>
      <MainMenu />
    </>

  );
};

export default Header;