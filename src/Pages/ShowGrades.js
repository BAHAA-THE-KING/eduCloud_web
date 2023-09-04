import { useEffect, useState } from "react";


function ShowGrades() {

  const menu = [
    {
      id: 1,
      text: "School Classes",
      active: true
    },
    {
      id: 2,
      text: "Add new student",
      active: false
    },
    {
      id: 3,
      text: "Grade Classes",
      active: false
    }
  ]


  useEffect(() => {



  }, [])

  return (
    <>
      <div className="container w-100 pt-5 grade">
        {/* main buttons */}
        <div className="d-flex justify-content-around w-50 fw-bold ms-auto">
          {
            menu.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  item.active = !item.active;
                }}
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
        <div className="ms-auto mt-3 row">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button"
              id="class-dropdown" data-bs-toggle="dropdown"
            >
              Grade 1
            </button>
          </div>
        </div>
      </div>
    </>
  );

}

export default ShowGrades;