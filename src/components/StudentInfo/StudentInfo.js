
import "./StudentInfo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function StudentInfo({students, search}) {
  return (
    students.filter((item) => {
      return search.toLowerCase() === '' ? item : item.first_name.toLowerCase().includes(search);
      }).map((student) => (
      <div key={student.id} className="line row bg-white pt-1 pb-1 rounded">
        <div className="student-info d-flex justify-content-around align-items-center">
          <div className="user bg-purple ms-3 d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faUser} className="text-white fs-6" />
          </div>
          <div className="row w-100">
            <div className="name text-purple col-4 d-flex">{student.first_name + " " + student.last_name}</div>
            <div className="grade text-purple col-4">Grade {student.grade_id}</div>
            <div className="class text-purple col-4">Class A </div>
          </div>
        </div>
      </div>
    ))
  )
}