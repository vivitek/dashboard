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
        <div className="h-full flex flex-col justify-center ml-2">
          <img
            src="/vivi_no-text.png"
            alt="ViVi header logo"
            className="h-1/3 w-auto cursor-pointer"
            onClick={() => history.push("/")}
          />
        </div>
        <div className="">
          <p>
            <span className="">&copy; {new Date().getFullYear()}</span>
            <a href="mailto:contact@vincipit.com">Vincipit</a>
          </p>
        </div>
        <div
          className="cursor-pointer text-black dark:text-white"
          onClick={() => themeContext.changeTheme()}
        >
          {themeContext.theme === "dark" ? <Sun className="stroke-current fill-current text-black dark:text-white" /> : <Moon className="stroke-current fill-current text-black dark:text-white" />}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
