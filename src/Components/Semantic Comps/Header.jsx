import { useRef } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setInputQuery,
  setSearchResults,
  showMenu,
} from "../../../redux/Slice";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { searchResults, inputQuery } = useSelector(
    (data) => data.youtubeReducer
  );

  const inputRef = useRef();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleResults = (e) => {
    e.preventDefault();
    if (inputQuery.length <= 1) return;
    if (location.pathname !== "/") {
      navigate("/");
    }
    dispatch(setCategory(inputQuery));
    inputRef.current.blur();
  };

  return (
    <header>
      <div className="menu--header">
        <button
          onClick={() => dispatch(showMenu())}
          style={{ fontSize: "1.3rem" }}
        >
          <RxHamburgerMenu />
        </button>
        <Link to="/" className="logo">
          <BsYoutube />
          <h1> Youtube</h1>
        </Link>
      </div>
      <form onSubmit={handleResults} className="search--container">
        <input
          onChange={(e) => dispatch(setInputQuery(e.target.value))}
          value={inputQuery}
          type="text"
          ref={inputRef}
          placeholder="Search"
          className="search-input"
        />
        <button type="submit" className="search--btn">
          <BsSearch />
        </button>
      </form>
      <div className="header-info">
        <RiVideoAddLine />
        <IoMdNotificationsOutline />
        <img
          src="https://images.unsplash.com/photo-1669475576662-af6f022dad1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
          alt="profile-image"
          width={40}
          height={40}
        />
      </div>

      <div
        className={`searchResults ${searchResults && "show"}`}
        id="searchList"
      >
        {searchResults &&
          searchResults.length > 1 &&
          searchResults.slice(0, 6).map((item, index) => (
            <span
              onClick={() => {
                dispatch(setCategory(item));
                dispatch(setSearchResults(null));
              }}
              key={index}
            >
              {item}
            </span>
          ))}
      </div>
    </header>
  );
};

export default Header;
