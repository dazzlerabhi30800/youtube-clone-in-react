import { BsYoutube, BsSearch } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  return (
    <header>
      <h1 className="logo">
        <BsYoutube />
        <span> Youtube</span>
      </h1>
      <div className="search--container">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search--btn">
          <BsSearch />
        </button>
      </div>
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
    </header>
  );
};

export default Header;
