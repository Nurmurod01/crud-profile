import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ArticleDetails,
  CreateArticle,
  Search,
  Home,
  Login,
  Navbar,
  SignUp,
  UpdateArticle,
  ArticlesPage,
  Profile,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { getUserAPI } from "./service/api";
import { setIsAuthenticated, setUser } from "./slices/authSlice";
import UpdateProfile from "./components/UpdateProfile";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ls = localStorage.getItem("token");
    const getUserHandler = async (token) => {
      try {
        const res = await getUserAPI(token);
        dispatch(setUser(res));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        localStorage.removeItem("token");
      }
    };
    if (ls) {
      getUserHandler(ls);
    }
  }, []);

  return (
    <div className="dark:bg-black max-lg:pb-20 min-h-screen dark:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/update-article/:id" element={<UpdateArticle />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </div>
  );
};

export default App;
