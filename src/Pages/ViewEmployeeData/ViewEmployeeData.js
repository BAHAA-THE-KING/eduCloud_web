import 'react-tabs/style/react-tabs.css';
import "./ViewEmployeeData.css";

import { TextInput, Title, ButtonWithIcon, DataHandler, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function ViewEmployeeData() {
   const { id } = useParams();

   //[{ grade_id, subject_id, classes_id: [] }]
   const [teacherData, setTeacherData] = useState(false);

   function addGradeToTeacher(grade_id) {
      setTeacherData([...teacherData, { grade_id, classes_id: [] }]);
   }
   function removeGradeToTeacher(index) {
      const temp = [...teacherData];
      temp[index] = undefined;
      setTeacherData(temp.filter(e => e));
   }
   function addSubjectToGradeToTeacher(index, subject_id) {
      const temp = [...teacherData];
      temp[index].subject_id = subject_id;
      setTeacherData([...temp]);
   }
   function addClassesToGradeToTeacher(index, classes) {
      const temp = [...teacherData];
      temp[index].classes_id = classes;
      setTeacherData(temp);
   }

   //[{ grade_id, classes_id: [] }]
   const [supervisorData, setSupervisorData] = useState(false);

   function addGradeToSupervisor(grade_id) {
      setSupervisorData([...supervisorData, { grade_id, classes_id: [] }]);
   }
   function removeGradeToSupervisor(index) {
      const temp = [...supervisorData];
      temp[index] = undefined;
      setSupervisorData(temp.filter(e => e));
   }
   function addClassesToGradeToSupervisor(index, classes) {
      const temp = [...supervisorData];
      temp[index].classes_id = classes;
      setSupervisorData(temp);
   }

   const [allGrades, setAllGrades] = useState([]);

   let [allRoles, setRoles] = useState([]);
   let [name, setName] = useState("");
   let [surName, setSurName] = useState("");
   let [selectedRoles, setSelectedRoles] = useState([]);

   useEffect(
      function () {
         handler.getRoles(
            roles => {
               roles = roles.map(e => Object.create({ id: e, name: e }));
               setRoles(roles);
            }
         );

         handler.getSubjects(
            grades => {
               setAllGrades(grades);
            }
         );

         handler.getEmployeeData(
            id,
            data => {
               setName(data.first_name);
               setSurName(data.last_name);
               setSelectedRoles(data.cuurentRoles);
               Object.values(data.cuurentRoles)
                  .map(
                     e => (
                        (e.length === undefined) ?
                           (
                              e.teaches ?
                                 setTeacherData(e.teaches.map(e => { return { grade_id: e.grade_id, subject_id: e.subject_id, classes_id: [e.class_id + ""] }; }))
                                 : (
                                    e.ofClasses ?
                                       setSupervisorData(e.ofClasses.map(e => { console.log(e.id); return { grade_id: e.grade_id, classes_id: [e.id + ""] }; }))
                                       : ""
                                 )
                           )
                           : ""
                     )
                  )
            }
         );
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

   const [setEdit, setSetEdit] = useState(0);
   if (setEdit === 3) {
      setSetEdit(0);
      setIsEdit(false);
   }

   return (
      <div className="viewemployeedata">
         {/*<img src="../../Images/addemployee.png" alt="" className="bg" />*/}
         <Title text="عرض حساب الموظف" />
         <div className="content">
            <div className="frm">
               <div>
                  <label><b>اسم الموظف :</b></label>
                  <TextInput editable={isEdit} defaultValue={name} inputHook={setName} enterHook={() => { }} hint="الاسم" />
                  <br />
                  <br />
                  <br />
                  <br />
                  <label><b>كنية الموظف :</b></label>
                  <TextInput editable={isEdit} defaultValue={surName} inputHook={setSurName} enterHook={() => { }} hint="الكنية" />
               </div>
               <div>
                  <label><b>الأدوار و تفاصيلها :</b></label>
                  <br />
                  <br />
                  <Tabs>
                     <TabList>
                        {
                           Object.keys(selectedRoles)
                              .map(
                                 e =>
                                    <Tab>
                                       {e}
                                       <img
                                          className='tabicon'
                                          src="Icons/deleteRed.svg"
                                          onClick={
                                             () => {
                                                handler.removeEmployeeRole(
                                                   id,
                                                   e,
                                                   () => {
                                                      if (e === "teacher") {
                                                         setTeacherData(false);
                                                      } else if (e === "supervisor") {
                                                         setSupervisorData(false);
                                                      }
                                                      const temp = Object.fromEntries(Object.entries(selectedRoles).filter(elm => elm[0] !== e));
                                                      setSelectedRoles(temp);
                                                   }
                                                );
                                             }
                                          }
                                       />
                                    </Tab>
                              )
                        }
                        {
                           isEdit ?
                              <Tab>
                                 +
                              </Tab>
                              : ""
                        }
                     </TabList>
                     {
                        Object.values(selectedRoles)
                           .map(
                              e =>
                                 <TabPanel>
                                    {
                                       (
                                          (e.length !== undefined) ?
                                             <i style={{ color: "#888888" }}>لا يوجد معلومات لهذا الدور.</i>
                                             : (
                                                e.teaches ?
                                                   <>
                                                      <DataHandler
                                                         editable={isEdit}
                                                         allGrades={allGrades}
                                                         selectedData={teacherData}
                                                         hasButtonSelection={true}
                                                         addSubjectToGrade={addSubjectToGradeToTeacher}
                                                         addClassesToGrade={addClassesToGradeToTeacher}
                                                         removeGrade={removeGradeToTeacher}
                                                      />

                                                      {
                                                         isEdit ?
                                                            <div className="add">
                                                               <label>إضافة صف :</label>
                                                               <MultipletButton
                                                                  text="اختر الصف"
                                                                  options={allGrades}
                                                                  dataHook={addGradeToTeacher}
                                                                  textHook={() => { }}
                                                               />
                                                            </div>
                                                            : ""
                                                      }
                                                   </>
                                                   : (
                                                      e.ofClasses ?
                                                         <>
                                                            <DataHandler
                                                               editable={isEdit}
                                                               allGrades={allGrades}
                                                               selectedData={supervisorData}
                                                               hasButtonSelection={false}
                                                               addSubjectToGrade={() => { }}
                                                               addClassesToGrade={addClassesToGradeToSupervisor}
                                                               removeGrade={removeGradeToSupervisor}
                                                            />
                                                            {
                                                               isEdit ?
                                                                  <div className="add">
                                                                     <label>إضافة صف :</label>
                                                                     <MultipletButton
                                                                        text="اختر الصف"
                                                                        options={allGrades}
                                                                        dataHook={addGradeToSupervisor}
                                                                        textHook={() => { }}
                                                                     />
                                                                  </div>
                                                                  : ""
                                                            }
                                                         </>
                                                         : ""
                                                   )
                                             )
                                       )
                                    }
                                 </TabPanel>
                           )
                     }
                     {
                        isEdit ?
                           <TabPanel>
                              <MultipletButton
                                 open={true}
                                 dontClose={true}
                                 text="اختر الدور"
                                 options={allRoles}
                                 dataHook={
                                    rid => {
                                       handler.addEmployeeRole(
                                          id,
                                          rid,
                                          () => { }
                                       );
                                    }
                                 }
                                 textHook={
                                    name => {
                                       let val;
                                       if (name === "teacher") {
                                          val = { teaches: [] };
                                          setTeacherData([]);
                                       } else if (name === "supervisor") {
                                          val = { ofClasses: [] };
                                          setSupervisorData([]);
                                       } else {
                                          val = [];
                                       }
                                       const temp = { ...selectedRoles };
                                       temp[name] = val;
                                       console.log(temp)
                                       console.log(selectedRoles)
                                       setSelectedRoles(temp);
                                    }
                                 }
                              />
                           </TabPanel>
                           : ""
                     }
                  </Tabs>
                  <br />
               </div>
            </div>
            <div className='btns'>
               <ButtonWithIcon
                  text={isEdit ? "تأكيد التعديلات" : "تعديل"}
                  className="modify"
                  src="Icons/subject.svg"
                  hook={
                     () => {
                        if (isEdit) {
                           handler.editEmployee(
                              id,
                              name,
                              surName,
                              () => {
                                 setSetEdit(setEdit + 1);
                              }
                           );

                           if (teacherData !== false) {
                              handler.addTeacher(
                                 id,
                                 teacherData.map(
                                    e => {
                                       return {
                                          "subject_id": e.subject_id,
                                          "classes": e.classes_id
                                       };
                                    }
                                 ),
                                 () => {
                                    setSetEdit(setEdit + 1);
                                 }
                              );
                           } else {
                              setSetEdit(setEdit + 1);
                           }

                           if (supervisorData !== false) {
                              handler.addSupervisor(
                                 id,
                                 supervisorData.map(e => e.classes_id).flat(Infinity),
                                 () => {
                                    setSetEdit(setEdit + 1);
                                 }
                              );
                           } else {
                              setSetEdit(setEdit + 1);
                           }
                        } else {
                           setIsEdit(true);
                        }
                     }
                  }
               />
               {/*<br />
               <ButtonWithIcon
                  text="حذف"
                  className="modify"
                  src="Icons/delete.svg"
                  hook={() => { }}
               />*/}
            </div>
         </div>
      </div>
   );
}

export default ViewEmployeeData;