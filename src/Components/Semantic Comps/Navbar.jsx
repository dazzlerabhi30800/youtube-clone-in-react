import { categories } from "../utils/NavbarUtils";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <div className="links">
        {categories.map(({ name, icon, type, divider }, index) => (
          <React.Fragment key={index}>
            <div className="link">
              {icon} {name}
            </div>
            {divider && <hr />}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
