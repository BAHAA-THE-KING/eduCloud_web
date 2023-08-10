import "./AddTeacherData.css";

import { Button, MultipletButton, DataHandler, Title } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { useNavigate } from "react-router-dom";

function AddTeacherData() {
   const navigate = useNavigate();

   useEffect(
      function () {
         handler.getSubjects(
            grades => {
               setAllGrades(grades);
            }
         );
      },
      []
   );

   function addGrade(grade_id) {
      setSelectedData([...selectedData, { grade_id, classes_id: [] }]);
   }
   function removeGrade(index) {
      const temp = [...selectedData];
      temp[index] = undefined;
      setSelectedData(temp.filter(e => e));
   }
   function addSubjectToGrade(index, subject_id) {
      const temp = [...selectedData];
      temp[index].subject_id = subject_id;
      setSelectedData([...temp]);
   }
   function addClassesToGrade(index, classes) {
      const temp = [...selectedData];
      temp[index].classes_id = classes;
      setSelectedData(temp);
   }

   const [allGrades, setAllGrades] = useState([]);

   //[{ grade_id, subject_id, classes_id: [] }]
   const [selectedData, setSelectedData] = useState([]);

   return (
      <div className="addteacher">
         <img src="Images/addemployee.png" alt="" className="bg" />
         <Title text="إنشاء حساب لمعلم" />
         <div className="content">
            <form>
               {/*<DataHandler
                  fullData={allGrades}

                  selectedData={selectedGrades}

                  removeDataHook={removeGrade}

                  hasButtonSelection={true}
                  buttonSelectionData={"subjects"}
                  buttonSelectionHook={addSubjectToGrade}

                  checkboxSelectionData={"g_classes"}
                  checkboxSelectionHook={addClassToGrade}
               />*/}
               <DataHandler
                  allGrades={allGrades}
                  selectedData={selectedData}
                  hasButtonSelection={true}
                  addSubjectToGrade={addSubjectToGrade}
                  addClassesToGrade={addClassesToGrade}
                  removeGrade={removeGrade}
               />
               <div className="add">
                  <label>إضافة صف :</label>
                  <MultipletButton
                     text="اختر الصف"
                     options={allGrades}
                     dataHook={addGrade}
                     textHook={() => { }}
                  />
               </div>
               <br />
               <Button
                  text="متابعة"
                  hook={
                     e => {
                        e.preventDefault();
                        let { empData, next } = JSON.parse(localStorage.getItem("next"));
                        if (empData.roles.indexOf("teacher") === -1) {
                           next = [];
                           localStorage.removeItem("next");
                        }
                        handler.addTeacher(
                           empData.id,
                           selectedData.map(
                              e => {
                                 return {
                                    "subject_id": e.subject_id,
                                    "classes": e.classes_id
                                 };
                              }
                           ),
                           () => {
                              next.shift();
                              if (next.length !== 0) {
                                 localStorage.setItem("next", JSON.stringify({ empData, next }))
                                 navigate(next[0]);
                              } else {
                                 localStorage.removeItem("next");
                                 navigate(handler.HOME);
                              }
                           }
                        )
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default AddTeacherData;