import { useState } from "react";
import { Link } from "react-router-dom";

// fonts 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faUserInjured } from "@fortawesome/free-solid-svg-icons";

function SideNavbar() {
  const [isExpand, setExpand] = useState(false);

  const menuItems = [
    {
      text: "Home screen",
      icon: faHome,
      link: "/",
    },
    {
      text: "Study plan & calender",
      icon: faCalendar,
      link: "#",
    },
    {
      text: "Add student screen",
      icon: faUserInjured,
      link: "#",
    },
  ];

  return (
    <div className={isExpand ? "side-navbar" : "side-navbar side-navbar-nx "}>
      <div className="nav-upper">
        <button
          className={!isExpand ? "burger burger-in" : "burger burger-out"}
          onClick={() => setExpand(!isExpand)}
        >
          <span> </span>
          <span> </span>
          <span> </span>
        </button>
          <div className="nav-menu ">
					{menuItems.map((item) => (
						<Link
							className={isExpand ? "menu-item " : "menu-item menu-item-NX"}							
						>
							<div className="icon"><FontAwesomeIcon icon={item.icon} className="fs-3 text-light" /></div>
							{isExpand && <p className="text-light ps-3">{item.text}</p>}
						</Link>
					))}
				</div>
      </div>
      <div className="nav-menu space">
      <Link
							className={isExpand ? "logout " : "logout menu-item-NX"}							
						>
							<div className="logout-icon"><FontAwesomeIcon icon={faArrowRightFromBracket} className="fs-3 text-light" /></div>
							{isExpand && <p className="text-light ps-3">logout</p>}
						</Link>
        
      </div>
    </div>
  );
}

export default SideNavbar;
