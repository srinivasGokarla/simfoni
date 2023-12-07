import React from "react";
import { Link } from "react-router-dom";

interface TopMenu {
    
}

const Menu: React.FC<TopMenu> = () => {
  return (
    <div className="Top-menu-wrap">
      <div className="flex company-wrap">
        <div>Purchase organization</div>
        <div className="flex">
          <div>Company </div>
          <div className="drop-icon"> ▼</div>
        </div>
        <div className="flex">
          <div>Plant</div>
          <div className="drop-icon"> ▼</div>
        </div>
       
      </div>

      <div className="category-drop-wrap">
        <div className="flex">
          <Link to={"/categories"}>
            <div>
              All Categories <span className="drop-icon teal">▼</span>
            </div>
          </Link>
          <div>Fruits</div>
          <div>Vegetables</div>
          <div>Dairy</div>
          <div>Meat & Poultry</div>
          <div>Sea Food</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
