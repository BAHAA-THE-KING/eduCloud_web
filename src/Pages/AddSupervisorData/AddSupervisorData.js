import "./AddSupervisorData.css";

import { Button, MultipletButton, DataHandler, Title } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';

//[{ grade_id, subject_id, classes_id: [] }]
let datahandler = [];

function AddSupervisorData() {
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

   function removeGrade(index) {
      datahandler[index] = undefined;
      datahandler = datahandler.filter(e => e);
      setRefresh(refresh + 1);
   }

   function addClassToGrade(index, classes_id) {
      datahandler[index].classes_id = classes_id;
      setRefresh(refresh + 1);
   }

   const [allGrades, setGrades] = useState([]);

   const [refresh, setRefresh] = useState(0);

   let selectedGrades = datahandler.map(e => e.grade_id);

   return (
      <div className="addsupervisor">
         <img src="../Images/addemployee.jpg" alt="" className="bg" />
         <div className="content">
            <Title text="إنشاء حساب لموجه" />
            <form>
               <DataHandler
                  fullData={allGrades}

                  selectedData={selectedGrades}

                  removeDataHook={removeGrade}

                  hasButtonSelection={false}

                  checkboxSelectionData={"g_classes"}
                  checkboxSelectionHook={addClassToGrade}
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
                        handler.addSupervisor(
                           10,
                           {
                              "classes": datahandler.map(
                                 e => e.classes_id
                              ).flat(Infinity)
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

export default AddSupervisorData;