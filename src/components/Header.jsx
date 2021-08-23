const { Link, useHistory } = require("react-router-dom");

const Header = () => {
  const history = useHistory();
  return (
    <div
      className="w-full bg-gray-400 dark:bg-gray-700 md:h-20 h-12 
    flex items-center justify-between  dark:text-white"
    >
      <div className="h-full flex flex-col justify-center ml-2">
        <img
          src="/vivi_no-text.png"
          alt="ViVi header logo"
          className="h-1/3 w-auto cursor-pointer"
          onClick={() => history.push("/")}
        />
      </div>
      <div className="">
        <Link to="/box">Boxes</Link>
      </div>
      <div className="w-1/3 md:w-1/6 flex justify-around mr-2">
        <Link to="/profile">Settings</Link>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Header;
