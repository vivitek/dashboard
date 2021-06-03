import { useContext } from "react";
import { useLocation, useHistory } from "react-router";
import ThemeContext from "../contexts/themeContext";
import { noFooterHeader } from "../utils/constants";

function Sun(props) {
  const title = props.title || "sun";

  return (
    <svg
      className={props.className}
      height="48"
      width="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g strokeLinecap="square" strokeWidth="2">
        <line fill="none" x1="2" x2="6" y1="24" y2="24" />
        <line fill="none" x1="8.444" x2="11.272" y1="8.444" y2="11.272" />
        <line fill="none" x1="24" x2="24" y1="2" y2="6" />
        <line fill="none" x1="39.556" x2="36.728" y1="8.444" y2="11.272" />
        <line fill="none" x1="46" x2="42" y1="24" y2="24" />
        <line fill="none" x1="39.556" x2="36.728" y1="39.556" y2="36.728" />
        <line fill="none" x1="24" x2="24" y1="46" y2="42" />
        <line fill="none" x1="8.444" x2="11.272" y1="39.556" y2="36.728" />
        <circle cx="24" cy="24" fill="none" r="12" />
      </g>
    </svg>
  );
}

function Moon(props) {
  const title = props.title || "moon";

  return (
    <svg
      height="64"
      width="64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <title>{title}</title>
      <g fill="#000000" stroke="#000000" strokeLinecap="square" strokeWidth="2">
        <path
          d="M52.5,40 C36.7,40,24,27.3,24,11.5c0-2.6,0.4-5.1,1-7.5C12.9,7.3,4,18.3,4,31.5C4,47.2,16.8,60,32.5,60c13.1,0,24.2-8.9,27.5-21 C57.6,39.7,55.1,40,52.5,40z"
          fill="none"
          stroke="#000000"
        />
      </g>
    </svg>
  );
}

const Footer = () => {
  const themeContext = useContext(ThemeContext);
  const location = useLocation();
  const history = useHistory();
  if (noFooterHeader.includes(location.pathname)) {
    return <div></div>;
  }
  return (
    <div className="w-full h-12 md:h-20 bg-gray-400 dark:bg-[#292E40] flex items-center justify-around dark:text-white">
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
        className="cursor-pointer"
        onClick={() => themeContext.changeTheme()}
      >
        {themeContext.theme === "light" ? (
          <Moon className="px-2 py-2" />
        ) : (
          <Sun className="px-1 py-1 stroke-current text-white " />
        )}
      </div>
    </div>
  );
};
export default Footer;
