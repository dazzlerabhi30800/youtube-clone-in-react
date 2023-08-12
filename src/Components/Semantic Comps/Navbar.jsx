import { categories } from "../utils/NavbarUtils";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCategory } from "../../../redux/Slice";

export default function Navbar() {
  const { menu, category } = useSelector((data) => data.youtubeReducer);
  const dispatch = useDispatch();

  const location = useLocation();
  const handleCategory = (name, type) => {
    if (type === "menu") return;
    dispatch(setCategory(name));
  };
  return (
    <nav
      style={{
        transform: menu && "translateX(0px)",
      }}
      className={`${location.pathname !== "/" && "hide"}`}
    >
      <div className="links">
        {categories.map(({ name, icon, type, divider }, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => handleCategory(name, type)}
              style={{
                padding: `8px ${menu ? "1.8rem" : "1rem"}`,
              }}
              className={`link ${category === name ? "active" : ""} `}
            >
              {icon} {menu && name}
            </div>
            {divider && <hr />}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
