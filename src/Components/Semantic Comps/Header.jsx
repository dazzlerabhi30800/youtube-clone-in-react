import { useEffect, useRef } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputQuery,
  setSearchResults,
  showMenu,
} from "../../../redux/Slice";
import { FetchResults } from "../../api/FetchApi";

const Header = () => {
  const { menu, searchResults, inputQuery } = useSelector(
    (data) => data.youtubeReducer
  );

  const inputRef = useRef();

  const closeSearchMenu = () => {
    dispatch(setSearchResults(null));
    dispatch(setInputQuery(""));
    inputRef.current.value = "";
  };

  const dispatch = useDispatch();

  const handleResults = async (e) => {
    e.preventDefault();
    if (inputQuery.length <= 1) return;
    const data = await FetchResults(`auto-complete/?q=${inputQuery}`);
    console.log(data);
  };

  useEffect(() => {
    const funcTimeout = setTimeout(async () => {
      if (inputQuery.length <= 1) {
        dispatch(setSearchResults(null));
        return;
      }
      const { data } = await FetchResults(`auto-complete/?q=${inputQuery}`);
      dispatch(setSearchResults(data.results));
    }, 400);
    return () => clearTimeout(funcTimeout);
  }, [inputQuery]);

  return (
    <header>
      <div className="menu--header">
        <button
          onClick={() => dispatch(showMenu())}
          style={{ fontSize: "1.3rem" }}
        >
          <RxHamburgerMenu />
        </button>
        <div className="logo">
          <BsYoutube />
          <h1> Youtube</h1>
        </div>
      </div>
      <form onSubmit={handleResults} className="search--container">
        <input
          onChange={(e) => dispatch(setInputQuery(e.target.value))}
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="search-input"
        />
        {searchResults && (
          <button onClick={closeSearchMenu} className="cancel--search">
            <AiOutlineClose className="" />
          </button>
        )}
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
          searchResults
            .slice(0, 6)
            .map((item, index) => <span key={index}>{item}</span>)}
      </div>
    </header>
  );
};

export default Header;
