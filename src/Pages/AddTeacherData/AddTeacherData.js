import "./AddTeacherData.css";

import { Button, MultipletButton, DataHandler, Title } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';

//[{ grade_id, subject_id, classes_id: [] }]
const datahandler = [];

function AddTeacherData() {
   useEffect(
      function () {
         handler.getSubjects(
            grades => {
               setGrades(grades);
            }
         );
      },
      []
   );

   function addGrade(grade_id) {
      datahandler.push({ grade_id, classes_id: [] });
      setRefresh(refresh + 1);
   }
   function addSubjectToGrade(index, subject_id) {
      datahandler[index].subject_id = subject_id;
      setRefresh(refresh + 1);
   }
   function addClassToSubject(index, classes_id) {
      datahandler[index].classes_id = classes_id;
      setRefresh(refresh + 1);
   }

   const [allGrades, setGrades] = useState([]);

   const [refresh, setRefresh] = useState(0);

   let selectedGrades = datahandler.map(e => e.grade_id);

   return (
      <div className="addteacher">
         <img src="../Images/addemployee.jpg" alt="" className="bg" />
         <div className="content">
            <Title text="إنشاء حساب لمعلم" />
            <form>
               <DataHandler
                  grades={allGrades}
                  selectedGrades={selectedGrades}
                  addSubjectToGrade={addSubjectToGrade}
                  addClassToSubject={addClassToSubject}
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
                        handler.addTeacher(
                           9,
                           datahandler.map(
                              e => {
                                 return {
                                    "subject_id": e.subject_id,
                                    "classes": e.classes_id
                                 };
                              }
                           )
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