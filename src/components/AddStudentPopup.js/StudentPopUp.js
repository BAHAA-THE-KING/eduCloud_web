
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faClose } from "@fortawesome/free-solid-svg-icons";
import "./StudentPopUp.css"
import 'bootstrap/dist/css/bootstrap.min.css';
export function StudentPopUp({ active, handlPop }) {

  const [activeButton, setActiveButton] = useState(true);
  const [activeButtonTop, setActiveButtonTop] = useState(false);

  function handleActiveButton() {
    setActiveButton((active) => !active);
  }

  function handleActiveButtonTop() {
    setActiveButtonTop((state) => !state);
  }

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
        <div className={activeButton ? "mt-3 d-block" : "d-none"}>
          <div>
            <div className="text-right text-gray border-bottom border-3">Main data</div>
            <div className="mt-3 ">
              <div className="row mb-4">
                <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">student name</label> <input className="text-purple col-6" type="text" /></div>
                <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">Grade</label>  <input className="text-purple col-6" type="text" /></div>
                <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">Class</label>  <input className="text-purple col-6" type="text" /></div>
                <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">old school</label> <input className="text-purple col-6" type="text" /></div>
                <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">Address</label>  <input className="text-purple col-6" type="text" /></div>
                <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">Age</label>  <input className="text-purple col-6" type="text" /></div>
              </div>
            </div>
            <div className="text-right text-gray border-bottom border-3">Phone numbers</div>
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <div><label className="text-purple ms-3 me-3">kinship</label><input className="text-purple phone" type="text" /></div>
              <div><label className="text-purple me-3">phone</label><input className="text-purple phone" type="text" /></div>
            </div>
            <div className="text-right text-gray border-bottom border-3 mb-3">Parents data</div>
            <div className="row">
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">situation</label> <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">address</label>  <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">الوضع الاقنصادي</label> <input className="text-purple col-6" type="text" /></div>
            </div>
            <div className="text-right text-gray border-bottom border-3 mb-3">Father data</div>
            <div className="row mb-4">
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">father name</label> <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">age</label>  <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">job</label>  <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">situation</label> <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">Address</label>  <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">health status</label>  <input className="text-purple col-6" type="text" /></div>
            </div>
            <div className="text-right text-gray border-bottom border-3 mb-3">Mother data</div>
            <div className="row mb-5">
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">mother name</label> <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">age</label>  <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">job</label>  <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">situation</label> <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">Address</label>  <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">Health status</label>  <input className="text-purple col-6" type="text" /></div>
            </div>
          </div>
        </div>
        <div className={activeButton ? "d-none" : "mt-3 d-block"}>
          <button onClick={() => handleActiveButtonTop()} className={activeButtonTop ? " donation text-white bg-purple me-2 " : " donation main text-gray bg-white me-2"}>Donations</button>
          <button onClick={() => handleActiveButtonTop()} className={!activeButtonTop ? "bus active text-white bg-purple" : "bus money text-gray bg-white"}>Bus</button>
          <div className="text-right text-gray mb-3 mt-3 border-bottom border-3 w-100">Main data</div>
          <div className="row mb-4">
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">Total Price</label> <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">Phone</label>  <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">Extra Phone</label>  <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">student address</label> <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">Bus stop</label>  <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row"><label className="d-flex justify-content-center align-items-center text-purple col-5">Bus name</label>  <input className="text-purple col-6" type="text" /></div>
          </div>

          <div className="text-right text-gray mb-3 mt-3 border-bottom border-3 w-100">installments</div>
          <div className="row mb-4">
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">number of installments</label> <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">Each installment</label>  <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">Extra Phone</label>  <input className="text-purple col-6" type="text" /></div>
            <div className="d-flex justify-content-center align-items -center">
              <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">total paid</label> <input className="text-purple col-6" type="text" /></div>
              <div className="col-4 row mb-3 ms-5"><label className="d-flex justify-content-center align-items-center text-purple col-5">still have to pay</label>  <input className="text-purple col-6" type="text" /></div>
            </div>
          </div>

          <div className="text-right text-gray mb-3 mt-3 border-bottom border-3 w-100">Extra Info</div>
          <div className="row mb-4">
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">installments</label> <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">How to Pay</label>  <input className="text-purple col-6" type="text" /></div>
            <div className="col-4 row mb-3"><label className="d-flex justify-content-center align-items-center text-purple col-5">accumulated</label>  <input className="text-purple col-6" type="text" /></div>
          </div>
        </div>
        <button onClick={() => handleActiveButton()} className={activeButton ? "main text-white bg-purple me-2 " : "main text-gray bg-white me-2"}>Main</button>
        <button onClick={() => handleActiveButton()} className={!activeButton ? "money text-white bg-purple" : "money text-gray bg-white"}>Money</button>
      </div>
    </>
  )
}