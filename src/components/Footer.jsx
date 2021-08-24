import { useContext } from "react";
import { useLocation, useHistory } from "react-router";
import ThemeContext from "../contexts/themeContext";
import { noFooterHeader } from "../utils/constants";
import Sun from "../images/Sun";
import Moon from "../images/Moon";

const Footer = () => {
  const themeContext = useContext(ThemeContext);
  const location = useLocation();
  const history = useHistory();
  if (noFooterHeader.includes(location.pathname)) {
    return <div></div>;
  }
  return (
    <footer>

      <div className="w-full h-12 md:h-20 bg-gray-400 dark:bg-[#292E41] flex items-center justify-around dark:text-white">
        <div className="h-full flex items-center w-1/2">
          <img
            src="/vivi_no-text.png"
            alt="ViVi header logo"
            className="h-1/3 w-auto cursor-pointer ml-2"
            onClick={() => history.push("/")}
          />
          <p className="ml-4">
            &copy; {new Date().getFullYear()} <a href="mailto:contact@vincipit.com">Vincipit</a>
          </p>
        </div>
        <div className="">
        </div>
        <div
          className="cursor-pointer text-black dark:text-white"
          onClick={() => themeContext.changeTheme()}
        >
          {themeContext.theme === "dark" ? <Sun className="stroke-current fill-current" /> : <Moon className="stroke-current fill-current" />}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
