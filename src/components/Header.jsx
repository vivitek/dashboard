import { Link, useHistory } from "react-router-dom";
import User from "../images/user.svg"
import { useState } from "react";
const Header = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const renderBurgerMenu = () => {
    return (
      <div className="flex flex-col h-screen absolute bg-[#292E41] text-white z-10 top-0 left-0" style={{ width: "40vw" }}>
        <div className="h-12 md:h-20 flex items-center">
          <img src="/vivi_white.svg" className="flex-shrink-0 m-3 h-12 w-auto" />
          <button onClick={toggleOpen}>
            menu
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <Link to="/" onClick={toggleOpen}>
            Home
          </Link>
          <Link to="/box" onClick={toggleOpen}>
            Box
          </Link>
        </div>
      </div>
    )
  }

  const renderMenu = () => {
    return (
      <div className="w-full md:flex flex-row items-center h-full hidden">
        <div className="flex justify-between ml-4">
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
  return (
    <header className="z-0">
      <div
        className="w-full bg-gray-400 dark:bg-[#292E41] h-12 md:h-20 dark:text-white flex items-center"
      >
        <img src="/vivi_white.svg" className="flex-shrink-0 m-3 md:m-6 h-12 w-auto" />
        <button onClick={toggleOpen} className="block md:hidden">
          menu
        </button>
        {!isOpen && renderMenu()}
      </div>
      {isOpen && renderBurgerMenu()}
    </header>
  );
};

export default Header;
