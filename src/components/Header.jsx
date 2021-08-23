import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { noFooterHeader } from "../utils/constants";
import UserContext from "../contexts/userContext";
import Menu from "../images/Hamburger";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const userContext = useContext(UserContext);

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const renderLogo = () => {
    return (
      <>
        <Link to="/">
          <img src="/vivi_white.svg" className=" m-3 h-8 md:h-12 w-auto" alt="Vivi Logo" />
        </Link>
        <button onClick={toggleOpen} className="block md:hidden">
          <Menu className="stroke-current fill-current w-auto h-8" isOpen={isOpen} />
        </button>
      </>
    )
  }

  const renderBurgerMenu = () => {
    return (
      <div className="flex flex-col h-screen absolute bg-[#292E41] text-white z-10 top-0 left-0" style={{ minWidth: "40vw" }}>
        <div className="h-12 md:h-20 flex items-center">
          {renderLogo()}
        </div>
        <div className="flex flex-col mt-4 ml-4">
          <Link to="/" onClick={toggleOpen}>
            Home
          </Link>
          <Link to="/box" onClick={toggleOpen}>
            Box
          </Link>
        </div>
        {userContext.authed && <div className="flex flex-col mt-4 ml-4">
          <Link to="/logout">Sign Out</Link>
          <Link to="/profile">Profile</Link>
        </div>}
      </div>
    )
  }

  const renderMenu = () => {
    return (
      <div className="w-full md:flex flex-row items-center h-full hidden ml-12">
        <div className="flex justify-between">
          <Link to="/">
            Home
          </Link>
          <Link to="/box" className="ml-4">
            Boxes
          </Link>
        </div>

      </div>
    )
  }
  if (location.pathname.includes(noFooterHeader)) {
    return (<div></div>)
  }

  return (
    <header className="z-0">
      <div
        className="w-full bg-gray-400 dark:bg-[#292E41] h-12 md:h-20 dark:text-white flex items-center"
      >
        {!isOpen && renderLogo()}
        {!isOpen && renderMenu()}
      </div>
      {isOpen && renderBurgerMenu()}
    </header>
  );
};

export default Header;
