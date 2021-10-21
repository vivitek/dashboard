import React, { useState, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import ThemeContext from "./contexts/themeContext";
import Page from "./components/Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apollo";
import LoadingPage from "./pages/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserContext from "./contexts/userContext";

function App() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("vivi-user")) {
      const u = JSON.parse(localStorage.getItem("vivi-user"));
      setUser(u);
    }
  }, []);

  return (
    <div
      className={
        theme === "dark"
          ? "dark w-screen h-screen flex flex-col"
          : "w-screen h-screen flex flex-col"
      }
    >
      <ToastContainer
        position="bottom-center"
        hideProgressBar={true}
      ></ToastContainer>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            changeUser: (u) => setUser(u),
            authed,
            changeAuthed: (a) => setAuthed(a),
          }}
        >
          <ApolloProvider client={client}>
            <ThemeContext.Provider
              value={{
                theme,
                changeTheme: () =>
                  setTheme(theme === "dark" ? "light" : "dark"),
              }}
            >
              <Suspense fallback={LoadingPage}>
                <Header />
                <main>
                  <Page>
                    <Routes />
                  </Page>
                </main>
                <Footer />
              </Suspense>
            </ThemeContext.Provider>
          </ApolloProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
