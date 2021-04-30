import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({
    user: {},
    authed: true,
    updateUser: () => {},
    updateAuthed: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [authed, setAuthed] = useState(true);
    useEffect(() => {
        const u = localStorage.getItem("vivi-user");
        if (u && u !== undefined) {
            setUser(JSON.parse(u));
        }
    }, []);
    return (
        <UserContext.Provider
            value={{
                user,
                authed,
                updateUser: (u) => setUser(u),
                updateAuthed: (u) => setAuthed(u),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
export { UserContext };
