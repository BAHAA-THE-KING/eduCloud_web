import { useState } from "react";
import { Link } from "react-router-dom";
import { SCHOOL } from "../handlers"

export function GradesStudentClassesHeader() {
  const [menu, setMenu] = useState([
    {
      id: 1,
      text: "School Classes",
      active: true,
      to: SCHOOL.main + SCHOOL.classes
    },
    {
      id: 2,
      text: "Add new student",
      active: false,
      to: SCHOOL.main + SCHOOL.student
    },
    {
      id: 3,
      text: "Grade Classes",
      active: false,
      to: SCHOOL.main + SCHOOL.school
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
    <div className="d-flex justify-content-around w-50 fw-bold ms-auto school">
      {
        menu.map((item) => (
          <Link
          key={item.id}
          to={item.to}
          onClick={() => titelsHandler(item)}
          className={!item.active ? "text-gray mt-5 ms-5 item pointer" : "text-gray mt-5 ms-5 item pointer active"}
          >
              {item.text}
          </Link>
        ))
      }
    </div>
  )

}