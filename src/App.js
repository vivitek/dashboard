import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Routes from "./Routes";
import ThemeContext from "./contexts/themeContext";
import Page from "./components/Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apollo";

function App() {
  const [theme, setTheme] = useState("dark");

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
        <ApolloProvider client={client}>
          <header>
            {/*             <Header />
             */}{" "}
          </header>
          <main>
            <Page>
              <Routes />
            </Page>
          </main>
          <ThemeContext.Provider
            value={{
              theme,
              changeTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
            }}
          >
            <footer>
              <Footer />
            </footer>
          </ThemeContext.Provider>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
