import { useContext } from "react";
import ThemeContext from "../contexts/themeContext";

const Footer = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <div className="w-full bg-gray-400 dark:bg-gray-700 h-12 flex items-center justify-around dark:text-white">
      <div className="">
        <p>
          <span className="mr-2">&copy; {new Date().getFullYear()}</span>{" "}
          <a href="mailto:quentin.henry@vincipit.com">ViVi</a>. All rights
          reserved
        </p>
      </div>
      <div
        className="mr-2 cursor-pointer"
        onClick={() => themeContext.changeTheme()}
      >
        {themeContext.theme === "light"
          ? "Turn off the lights"
          : "Turn on the lights"}
      </div>
    </div>
  );
};
export default Footer;
