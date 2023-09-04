import { useEffect, useState } from "react";
import getGrades from "../handlers.js";

function ShowGrades() {
  // const menu = [
  //   {
  //     id: 1,
  //     text: "School Classes",
  //     active: true
  //   },
  //   {
  //     id: 2,
  //     text: "Add new student",
  //     active: false
  //   },
  //   {
  //     id: 3,
  //     text: "Grade Classes",
  //     active: false
  //   }
  // ]

  const [menu, setMenu] =
    useState(
      [
        {
          id: 1,
          text: "School Classes",
          active: true,
        },
        {
          id: 2,
          text: "Add new student",
          active: false,
        },
        {
          id: 3,
          text: "Grade Classes",
          active: false,
        },
      ]
    );

  useEffect(() => {}, []);

  return (
    <>
      <div className="container w-100 pt-5 grade">
        {/* main buttons */}
        <div className="d-flex justify-content-around w-50 fw-bold ms-auto">
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                const updateMenu = menu.map((menuItem) => {
                  if(menuItem.id == item.id) {
                    return {...menuItem, active: true}
                  } else {
                    return {...menuItem, active: false}
                  }
                })
                setMenu(updateMenu)
              }}
              className={
                !item.active
                  ? "text-gray ms-5 item pointer"
                  : "text-gray ms-5 item pointer active"
              }
            >
              {item.text}
            </div>
          ))}
        </div>
        {/* add Grade button */}
        <div className="text-purple ms-auto add-grade-btn rounded fw-bold pointer">
          + Add new Grade
        </div>
        {/* drop down classes from grade */}
        <div className="ms-auto mt-5 row grade-menu justify-content-around">
          <div className="dropdown col-3 grade-number text-end">
            <button
              className="btn dropdown-toggle text-gray fw-bold border-0"
              type="button"
              id="class-dropdown1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Grade 1
            </button>
            <ul className="dropdown-menu" aria-labelledby="class-dropdown1">
              <li className="text-purple class">Class A</li>
              <li className="text-purple class">Class B</li>
              <li className="text-purple class">Class C</li>
            </ul>
          </div>
          <div className="dropdown col-3 grade-number text-end">
            <button
              className="btn dropdown-toggle text-gray fw-bold border-0"
              type="button"
              id="class-dropdown2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Grade 2
            </button>
            <ul className="dropdown-menu" aria-labelledby="class-dropdown2">
              <li className="text-purple class">Class A</li>
              <li className="text-purple class">Class B</li>
              <li className="text-purple class">Class C</li>
            </ul>
          </div>
          <div className="dropdown col-3 grade-number text-end">
            <button
              className="btn dropdown-toggle text-gray fw-bold border-0"
              type="button"
              id="class-dropdown3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Grade 3
            </button>
            <ul className="dropdown-menu" aria-labelledby="class-dropdown3">
              <li className="text-purple class">Class A</li>
              <li className="text-purple class">Class B</li>
              <li className="text-purple class">Class C</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowGrades;
