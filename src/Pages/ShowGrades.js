import { useEffect, useState } from "react";
import * as handlers from "../handlers.js";

//font awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faClose } from "@fortawesome/free-solid-svg-icons";

function ShowGrades() {
  function getToken() {
    return JSON.parse(localStorage.getItem("auth")).token;
  }

  const [grade, setGrade] = useState([]);

  useEffect(() => {
    fetch(`${handlers.host}/general/getAllGradesWithClassesAndSubjects`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => {
        if (res.ok) console.log("Succes");
        else console.log("UnSuccessful");
        return res.json();
      })
      .then((res) => {
        setGrade(res.data);
        console.log(res.data);
      });
  }, []);

  const [menu, setMenu] = useState([
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
  ]);

  return (
    <>
      <div className="container w-100 pt-5 grade">
        <div className="class-info">
          <div className="d-flex justify-content-end">
            <FontAwesomeIcon icon={faDownload} className="fs-3 text-purple"/>
            <FontAwesomeIcon icon={faClose} className=" ms-5 fs-3 fw-bold text-purple d-flex justify-content-center align-items-center"/>
          </div>
        </div>
        {/* main buttons */}
        <div className="d-flex justify-content-around w-50 fw-bold ms-auto school">
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                const updateMenu = menu.map((menuItem) => {
                  if (menuItem.id == item.id) {
                    return { ...menuItem, active: true };
                  } else {
                    return { ...menuItem, active: false };
                  }
                });
                setMenu(updateMenu);
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
        <div>
          <div className="ms-auto mt-5 row grade-menu gx-5 gy-5">
            {grade.map((data) => (
              <>
                <div
                className="dropdown col-3 grade-number text-end"
                key={data.id}
              >
                <button
                  className="btn dropdown-toggle text-gray fw-bold border-0"
                  type="button"
                  id={`class-dropdown${data.id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Grade {data.id}
                </button>
                <ul
                  className="dropdown-menu pointer"
                  aria-labelledby={`class-dropdown${data.id}`}
                  onClick={() => {
                    console.log("clicked" + data.id);
                  }}
                >
                  {data.g_classes.map((classes) => (
                    <>
                    <li className="text-purple class" key={classes.id}>
                      Class {classes.name}
                    </li>
                    {/* fuck */}
                    <li className="text-purple class" key={classes.id}>
                      Class {classes.name}
                    </li>
                    </>
                    
                  ))}
                </ul>
                
              </div>
              <div
                className="dropdown col-3 grade-number text-end"
                key={data.id}
              >
                <button
                  className="btn dropdown-toggle text-gray fw-bold border-0"
                  type="button"
                  id={`class-dropdown${data.id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Grade {data.id}
                </button>
                <ul
                  className="dropdown-menu pointer"
                  aria-labelledby={`class-dropdown${data.id}`}
                  onClick={() => {
                    console.log("clicked" + data.id);
                  }}
                >
                  {data.g_classes.map((classes) => (
                    <>
                    <li className="text-purple class" key={classes.id}>
                      Class {classes.name}
                    </li>
                    {/* fuck */}
                    <li className="text-purple class" key={classes.id}>
                      Class {classes.name}
                    </li>
                    </>
                    
                  ))}
                </ul>
                
              </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowGrades;
