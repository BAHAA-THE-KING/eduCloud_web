import { useEffect, useState, useReducer } from "react";
import { GradeDropDownMenu } from "../components";
import { AddButton } from "../components/AddButton";
import { StudentPopUp } from "../components/AddStudentPopup.js/StudentPopUp";
import * as handler from "../handlers"
import { Loading } from '../components';
import { StudentInfo } from "../components/StudentInfo/StudentInfo";

const buttonName = "Add New Student";

export function AddNewStudent() {

  const [students, setStudents] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [controller, setControllers] = useReducer(
    
    (state, { type, value }) => {
      if (type === "stop") state.abort()
      else return value;
    },
    new AbortController()
  );

  function handleSubmit(e) {
    e.preventDefault();

    setSearch('');
  }

  function handlPop() {
    console.log(showPop);
    setShowPop((pop) => !pop);
  }

  useEffect(() => {
    const controller = new AbortController();
    setControllers({ value: controller });
    handler.getStudents(
      null,
      null,
      null,
      null,
      null,
      controller,
      data => {
        setStudents(data);
      },
      err => { console.log(err); },
      () => { setIsLoaded(true); }
      );
    return () => {
      setControllers({ type: "stop" });
      setIsLoaded(false);
    };
  }, [])

  return (
    <>
      {!isLoaded && <Loading />}
      <div className="container student">
        {/* add and search buttons */}
        <div className="d-flex justify-content-around align-items-end">
          <AddButton text={buttonName} handlPop={handlPop} />
          <form onSubmit={handleSubmit} >
            <input type="text" className="ms-5 rounded text-purple" placeholder="Enter Student Name" value={search} onChange={(e)=> setSearch(e.target.value)}/>
          </form>
        </div>

        {/* popup for adding student */}
        <StudentPopUp active={showPop} handlPop={handlPop} />

        {/* students info  */}
        <div className="ms-auto students w-100 mt-3">
          <StudentInfo students={students} search={search} />
        </div>
      </div>
    </>
  )
}