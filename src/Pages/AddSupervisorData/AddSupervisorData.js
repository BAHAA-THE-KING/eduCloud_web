import "./AddSupervisorData.css";

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
   function addClassesToGrade(index, classes) {
      const temp = [...selectedData];
      temp[index].classes_id = classes;
      setSelectedData(temp);
   }

   const [allGrades, setAllGrades] = useState([]);

   //[{ grade_id, classes_id: [] }]
   const [selectedData, setSelectedData] = useState([]);

   return (
      <div className="addsupervisor">
         <img src="Images/addemployee.png" alt="" className="bg" />
         <Title text="إنشاء حساب لموجه" />
         <div className="content">
            <form>
               {
                  <DataHandler
                     allGrades={allGrades}
                     selectedData={selectedData}
                     hasButtonSelection={false}
                     addSubjectToGrade={() => { }}
                     addClassesToGrade={addClassesToGrade}
                     removeGrade={removeGrade}
                  />
               }
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
                        if (empData.roles.indexOf("supervisor") === -1) {
                           next = [];
                           localStorage.removeItem("next");
                        }
                        handler.addSupervisor(
                           empData.id,
                           selectedData.map(
                              e => e.classes_id
                           ).flat(Infinity),
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