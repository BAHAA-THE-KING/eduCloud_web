import { GradeDropDownMenu } from "../components";
import { AddButton } from "../components/AddButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faClose, faArrowRightFromBracket, faHome, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

const buttonName = "Add New Student";

export function AddNewStudent() {

  return (
    <>
      <div className="container student">
        {/* add and search buttons */}
        <div className="d-flex justify-content-around align-items-end">
          <AddButton text={buttonName} />
          <input type="text" className="ms-5 rounded text-purple" placeholder="Enter Student Name" />
        </div>
        
        {/* students info  */}
        <div className="ms-auto students w-75 mt-3">
          <div className="line bg-white d-flex justify-content-around align-items-center">
            <div className="user bg-purple d-flex justify-content-center align-items-center">
              <FontAwesomeIcon icon={faUser} className="text-white fs-6 pointer"/>
            </div>
            <div className="student-info d-flex justify-content-around align-items-center">
              <div className="name text-purple">Hamza kousy saad aldeen</div>
              <div className="grade text-purple">Grade nine</div>
              <div className="class text-purple">Class A </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}