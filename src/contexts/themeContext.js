import { createContext } from "react";

const ThemeContext = createContext({ theme: "dark", changeTheme: () => {} });

export default ThemeContext;
