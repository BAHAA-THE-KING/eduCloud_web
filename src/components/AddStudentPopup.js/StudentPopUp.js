
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faClose } from "@fortawesome/free-solid-svg-icons";

import "./StudentPopUp.css"

export function StudentPopUp({ active, handlPop }) {
  return (
    <>
      <div className={(active) ? "layer" : "d-none"}></div>
      <div className={active ? "pop-up d-block w-75 " : "pop-up d-none w-75"}>
        <div className="d-flex justify-content-end align-items-center">
          <FontAwesomeIcon
            icon={faDownload}
            className="fs-3 text-purple pointer"
          />
          <FontAwesomeIcon
            icon={faClose}
            className=" ms-5 fs-3 fw-bold text-purple pointer"
            onClick={() => handlPop()}
          />
        </div>
        <div className="mt-3">
          <div>
            <div className="text-right text-gray border-bottom border-3">Main data</div>
            <div className="mt-3 d-flex justify-content-around align-items-around flex-column">
              <div className="d-flex justify-content-around align-items-center mb-4">
                <div><label className="text-purple me-3">Student name</label> <input className="text-purple" type="text" /></div>
                <div><label className="text-purple me-3">Grade</label>  <input className="text-purple" type="text" /></div>
                <div><label className="text-purple me-3">Class</label>  <input className="text-purple" type="text" /></div>
              </div>
              <div className="d-flex justify-content-around align-items-center">
                <div><label className="text-purple me-4">Old school</label> <input className="text-purple" type="text" /></div>
                <div><label className="text-purple me-3">Address</label>  <input className="text-purple" type="text" /></div>
                <div><label className="text-purple me-3">Age</label>  <input className="text-purple" type="text" /></div>
              </div>
            </div>
            <div className="text-right text-gray border-bottom border-3 mt-3">Subject data</div>
            <div className="mt-3 mb-5 d-flex justify-content-around align-items-center">
              <div><label className="text-purple me-3">Grade subjects</label> <input className="text-purple" type="text" /></div>
              <div><label className="text-purple me-3">Supervisor</label>  <input className="text-purple" type="text" /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}