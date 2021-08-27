import { createContext } from "react";

const UserContext = createContext({
  user: null,
  changeUser: (user) => {},
  authed: false,
  changeAuthed: (authedState) => {},
});

export default UserContext;
