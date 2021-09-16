import { useContext } from "react";
import { useLocation, useHistory } from "react-router";
import ThemeContext from "../contexts/themeContext";
import { noFooterHeader } from "../utils/constants";
import Sun from "../images/Sun";
import Moon from "../images/Moon";
import ViviHourglass from "../images/ViviHourglass";

const Footer = () => {
  const themeContext = useContext(ThemeContext);
  const location = useLocation();
  const history = useHistory();
  if (noFooterHeader.includes(location.pathname)) {
    return <div></div>;
  }
  return (
    <footer className="w-full">
      <div className="w-full h-12 md:h-20 bg-gray-400 dark:bg-darkBlue flex items-center dark:text-white">
        <div className="h-full flex items-center w-full">
          <ViviHourglass
            className="h-1/3 w-auto cursor-pointer m-3"
            dark={themeContext.theme === "dark"}
            onClick={() => history.push("/")}
          />
          <p className="ml-4">
            &copy; {new Date().getFullYear()} <a href="mailto:contact@vincipit.com">Vincipit</a>
          </p>
        </div>
        <div
          className="cursor-pointer text-black dark:text-white justify-self-end mr-12"
          onClick={() => themeContext.changeTheme()}
        >
          {themeContext.theme === "dark" ? <Sun className="stroke-current fill-current" /> : <Moon className="stroke-current fill-current" />}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
