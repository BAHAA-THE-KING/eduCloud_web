import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

// fonts from fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faHome, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

import * as handlers from "../handlers";
import Swal from "sweetalert2";

function SideNavbar() {
  const url = useLocation().pathname;
  const [isExpand, setExpand] = useState(false);

  const menuItems = [
    {
      text: "Home screen",
      icon: faHome,
      link: handlers.HOME,
      check: "/asd"
    },
    {
      text: "Study plan & calendar",
      icon: faCalendar,
      link: handlers.CALENDAR.main + handlers.CALENDAR.school,
      check: handlers.CALENDAR.main,
    },
    {
      text: "Add student screen",
      icon: faUser,
      link: handlers.VIEWGRADES,
      check: handlers.VIEWGRADES,
    },
  ];

  return (
    <div
      className={
        "overflow-hidden side-navbar" +
        (isExpand ? "" : " side-navbar-nx")
      }
      style={{ zIndex: "1000000" }}
    >
      <div className="nav-upper">
        <button
          className={
            "burger" +
            (!isExpand ? " burger-in" : " burger-out")
          }
          onClick={() => setExpand(!isExpand)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.text}
              to={item.link}
              onClick={() => setExpand(false)}
              className={
                "menu-item" +
                (isExpand ? "" : " menu-item-NX") +
                (url.indexOf(item.check) === 0 ? " active" : "")
              }
              style={{ width: "max-content" }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={item.icon} className="fs-3 text-light" />
              </div>
              <p className="text-light ps-3">{item.text}</p>
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