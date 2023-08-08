import { categories } from "../utils/NavbarUtils";
import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const menu = useSelector((data) => data.youtubeReducer.menu);
  return (
    <nav style={{ transform: menu && "translateX(0px)" }}>
      <div className="links">
        {categories.map(({ name, icon, type, divider }, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                padding: `8px ${menu ? "1.8rem" : "1rem"}`,
              }}
              className="link"
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
