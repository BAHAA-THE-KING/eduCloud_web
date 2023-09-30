import { useEffect, useReducer, useState } from "react";
import * as handlers from "../handlers.js";
import { GradeDropDownMenu, Loading } from "../components";

//font awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faClose } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

function ShowGrades() {
  const [grade, setGrade] = useState([]);
  const [activeEditGrade, setActiveEditGrade] = useState({});

  const [controller, setControllers] = useReducer(
    (state, { type, value }) =>
      type === "stop" ?
        state.abort()
        : value,
    new AbortController()
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // passit from component as prop
  const setActive = (idd) => {
    setActiveEditGrade({ active: true, id: idd });
  };

  useEffect(
    () => {
      setIsLoaded(false);

      const cont = new AbortController();
      setControllers({ value: cont });

      handlers.getClassesAndSubjects(
        controller,
        setGrade,
        error => {
          Swal.fire(error);
        },
        () => setIsLoaded(true)
      );
      return () => setControllers({ type: "stop" })
    },
    []
  );

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

  const titelsHandler = (item) => {
    const updateMenu = menu.map((menuItem) => {
      if (menuItem.id == item.id) {
        return { ...menuItem, active: true };
      } else {
        return { ...menuItem, active: false };
      }
    });
    setMenu(updateMenu);
  }


  return (
    <>
      {isLoaded || <Loading />}
      <div className="container w-100 pt-5 student">
        {/* main buttons */}
        <div className="d-flex justify-content-around w-50 fw-bold ms-auto school">
          {
            menu.map((item) => (
              <div
                key={item.id}
                onClick={() =>titelsHandler(item)}
                className={!item.active ? "text-gray ms-5 item pointer" : "text-gray ms-5 item pointer active"}
              >
                {item.text}
              </div>
            ))
          }
        </div>
        {/* add Grade button */}
        <div className="text-purple ms-auto add-grade-btn rounded fw-bold pointer">+ Add new Grade</div>
        {/* drop down classes from grade */}
        <div>
          <div className="ms-auto mt-5 row grade-menu gx-5 gy-5">
            {grade.map((data) => (
              <div
                className="dropdown col-3 grade-number text-end"
                key={data.id}
              >
                <GradeDropDownMenu id={data.id} classObject={data.g_classes} fun={setActive} />

                {/*       
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
                    const active = { active: true, id: data.id };
                    setActiveEditGrade(active);
                  }}
                >
                  {data.g_classes.map((classes) => (
                    <li className="text-purple class" key={classes.id}>
                      Class {classes.name}
                    </li>
                  ))}
                </ul> */}
                <div className={(activeEditGrade.id == data.id && activeEditGrade.active) ? "layer" : "class-info d-none"}></div>
                <div className={(activeEditGrade.id == data.id && activeEditGrade.active) ? "class-info" : "class-info d-none"}>
                  <div className="d-flex justify-content-end">

                    <FontAwesomeIcon
                      icon={faDownload}
                      className="fs-3 text-purple pointer"
                    />
                    <FontAwesomeIcon
                      icon={faClose}
                      className=" ms-5 fs-3 fw-bold text-purple pointer"
                      onClick={() => {
                        setActiveEditGrade({ active: false, id: data.id })
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-center text-purple mb-5">Grade {data.id}</h2>
                    <div>
                      <div className="text-right text-gray border-bottom border-3">Main data</div>
                      <div className="mt-3 d-flex justify-content-around align-items-center">
                        <div><label className="text-purple me-3">Number of classes</label> <input className="text-purple" type="number" value={data.g_classes.length} /></div>
                        <div><label className="text-purple me-3">Supervisor</label>  <input className="text-purple" type="text" value="ahmad" /></div>
                      </div>
                      <div className="text-right text-gray border-bottom border-3 mt-3">Subject data</div>
                      <div className="mt-3 mb-5 d-flex justify-content-around align-items-center">
                        <div><label className="text-purple me-3">Grade subjects</label> <input className="text-purple" type="number" value={data.subjects.length} /></div>
                        <div><label className="text-purple me-3">Supervisor</label>  <input className="text-purple" type="text" value="ahmad" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

  );
}

export default ShowGrades;
