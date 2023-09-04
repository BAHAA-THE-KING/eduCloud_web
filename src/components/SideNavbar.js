import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

//import routes from handler.js
import { ADDSTUDENT } from "../handlers.js";


// fonts from fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import * as handlers from "../handlers";
import Swal from "sweetalert2";

function SideNavbar() {
  const [isExpand, setExpand] = useState(false);

  const menuItems = [
    {
      text: "Home screen",
      icon: faHome,
      link: handlers.HOME,
    },
    {
      text: "Study plan & calender",
      icon: faCalendar,
      link: handlers.CALENDAR.main + handlers.CALENDAR.school,
    },
    {
      text: "Add student screen",
      icon: faUser,
      link: ADDSTUDENT,
    },
  ];

  return (
    <div className={isExpand ? "side-navbar" : "side-navbar side-navbar-nx "}>
      <div className="nav-upper">
        <button
          className={!isExpand ? "burger burger-in" : "burger burger-out"}
          onClick={() => setExpand(!isExpand)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-menu ">
          {menuItems.map((item) => (
            <NavLink
              key={item.text}
              to={item.link}
              className={isExpand ? "menu-item " : "menu-item menu-item-NX"}
            >
              <div className="icon">
                <FontAwesomeIcon icon={item.icon} className="fs-3 text-light" />
              </div>
              {isExpand && <p className="text-light ps-3">{item.text}</p>}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="nav-menu space">
        <Link
          className={isExpand ? "logout " : "logout menu-item-NX"}
          onClick={
            () => {
              Swal.fire(
                {
                  title: "Are you sure you want to log out ?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Log out'
                }
              ).then(
                result => result.isConfirmed && handlers.logOut()
              );
            }
          }
        >
          <div className="logout-icon"><FontAwesomeIcon icon={faArrowRightFromBracket} className="fs-3 text-light" /></div>
          {isExpand && <p className="text-light ps-3">logout</p>}
        </Link>

      </div>
    </div>
  );
}

export default SideNavbar;