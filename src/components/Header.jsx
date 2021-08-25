import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from '@headlessui/react'
import { noFooterHeader } from "../utils/constants";
import UserContext from "../contexts/userContext";
import MenuIcon from "../images/Hamburger";
import User from "../images/User"
import ViviHourglass from "../images/ViviHourglass";
import ThemeContext from "../contexts/themeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const renderLogo = () => {
    return (
      <>
        <Link to="/">
          <ViviHourglass className="m-3 h-6 w-auto" dark={themeContext.theme === "dark"} />
        </Link>
        <button onClick={toggleOpen} className="block md:hidden">
          <MenuIcon className="stroke-current fill-current w-auto h-8" isOpen={isOpen} />
        </button>
      </>
    )
  }

  const renderBurgerMenu = () => {
    return (
      <div className="flex flex-col h-screen absolute bg-[#292E41] text-white z-10 top-12 left-0" style={{ minWidth: "40vw" }}>
        <div className="flex flex-col mt-4 ml-4 gap-4">
          <Link to="/" onClick={toggleOpen}>
            {t("header.home")}
          </Link>
          <Link to="/box" onClick={toggleOpen}>
            {t("header.boxes")}
          </Link>
        </div>
        {!userContext.authed && <div className="flex flex-col mt-4 ml-4">
          <Link to="/settings">{t("header.settings")}</Link>
          <span className="cursor-pointer">{t("header.logout")}</span>
        </div>}
      </div>
    )
  }

  const renderMenu = () => {
    return (
      <div className="w-full md:flex flex-row items-center justify-between h-full hidden ml-12 font-itc">
        <div className="flex justify-between">
          <Link to="/">
            {t("header.home")}
          </Link>
          <Link to="/box" className="ml-4">
            {t("header.boxes")}
          </Link>
        </div>
        {!userContext.authed &&
          <Menu as="div" className="relative mr-12">
            <Menu.Button>
              <User className="stroke-current fill-current h-8" title="settings" />
            </Menu.Button>
            <Menu.Items as="div" className="dark:bg-[#292E41] bg-white absolute right-0 p-4 mr-10 w-48">
              <Menu.Item as="div" className="menu_item" >
                <Link to="/settings">
                  {t("header.settings")}
                </Link>
              </Menu.Item>
              <Menu.Item as="div" className="menu_item" >
                <span className="cursor-pointer">{t("header.logout")}</span>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        }
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
        {renderLogo()}
        {!isOpen && renderMenu()}
      </div>
      {isOpen && renderBurgerMenu()}
    </header>
  );
};

export default Header;
