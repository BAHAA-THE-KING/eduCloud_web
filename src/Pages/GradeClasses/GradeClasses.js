import { useState, useEffect, useReducer } from "react";
import "./GradeClasses.css"
import * as handler from "../../handlers"

export function GradeClasses() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [classAndGrades, setClassAndGrades] = useState([]);
  const [gradeValue, setGradeValue] = useState('');
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

  // useEffect(() => {
  //   const controller = new AbortController();
  //   setControllers({ value: controller });
  //   handler.getStudents(
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     controller,
  //     data => {
  //       setStudents(data);
  //     },
  //     err => { console.log(err); },
  //     () => { setIsLoaded(true); }
  //   );
  //   return () => {
  //     setControllers({ type: "stop" });
  //     setIsLoaded(false);
  //   };
  // }, [])

  function handleGrade(e) {
    setGradeValue(e.target.value);
    console.log(gradeValue);
  }

  useEffect(() => {
    const controller = new AbortController();
    setControllers({ value: controller });
    handler.getClassesAndSubjects(
      controller,
      data => {
        setClassAndGrades(data);
      },
      error => { console.log(error) },
      () => { setIsLoaded(true) })
      return () => {
      setControllers({ type: "stop" });
      setIsLoaded(false);
    };
}, [])

return (
  <>
    <div className="grades-classes container">
      <form onSubmit={handleSubmit} className="mt-5 text-end" >
        <div className="d-inline select-container">
          <select className="ms-5 select-box rounded">
            <option value="">Select All Classes</option>
            {
              classAndGrades.filter((ob) => gradeValue === ob.name).map((ob)=>(
                // <option key={ob.id} value={ob.g_class}>Class{ob.g_class}</option>
                ob.g_classes.map((clas)=>(
                  <option value={clas.name} >Class {clas.name}</option>
                ))
              ))
            }
          </select>
        </div>
        <div className="d-inline select-container">
          <select className="ms-5 select-box rounded" onChange={handleGrade}>
            <option value="">Select Grade</option>
            {classAndGrades.map(ob => (
              <option key={ob.id} value={ob.name}>{ob.name}</option>
            ))}
          </select>
        </div>
        <input type="text" className="ms-5 rounded text-purple" placeholder="Enter Student Name" value={search} onChange={(e) => setSearch(e.target.value)} />
      </form>
    </div>
  </>
)

}