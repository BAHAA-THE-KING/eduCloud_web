import { useEffect, useState } from "react";
import { GradeDropDownMenu } from "../components";
import { AddButton } from "../components/AddButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { StudentPopUp } from "../components/AddStudentPopup.js/StudentPopUp";
import * as handler from "../handlers"

const buttonName = "Add New Student";
const url = "http://localhost:8000/V1.0/supervisor/studentSearch";

export function AddNewStudent() {

  const [students, setStudents] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [search, setSearch] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    setSearch('');
  }

  function handlPop() {
    console.log(showPop);
    setShowPop((pop) => !pop);
  }

  // useEff

  return (
    <>
      <div className="container student">
        {/* add and search buttons */}
        <div className="d-flex justify-content-around align-items-end">
          <AddButton text={buttonName} handlPop={handlPop} />
          <form onSubmit={()=> handleSubmit} ><input type="text" className="ms-5 rounded text-purple" placeholder="Enter Student Name" /></form>
        </div>
        {/* popup for adding student */}
        <StudentPopUp active={showPop} handlPop={handlPop} />
        {/* students info  */}
        <div className="ms-auto students w-75 mt-3">
          <div className="line bg-white pt-1 pb-1 rounded">
            <div className="student-info d-flex justify-content-around align-items-center">
              <div className="user bg-purple ms-3 d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faUser} className="text-white fs-6 pointer"/>
              </div>
              <div className="d-flex justify-content-around align-items-center w-100">
                <div className="name text-purple">Hamza kousy saad aldeen</div>
                <div className="grade text-purple">Grade nine</div>
                <div className="class text-purple">Class A </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}