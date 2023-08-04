import "./AddAbilityTestForm.css";

import { Title, TextInput, Button, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';

function AddAbilityTestForm() {
   const [subject, setSubject] = useState("");
   const [name, setName] = useState("");
   const [isEntry, setIsEntry] = useState(false);
   const [sections, setSections] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [subjectName, setSubjectName] = useState("");

   useEffect(
      () => {
         handler.getSubjects(
            data => {
               const temp = [];
               for (const k of data) {
                  for (const n of k.subjects) {
                     temp.push(
                        {
                           id: n.id,
                           name: n.name,
                           maxMark: n.max_mark,
                           passMark: n.min_mark,
                           notes: n.notes,
                           grade: {
                              id: k.id,
                              name: k.name
                           }
                        }
                     );
                  }
               }
               setSubjects(temp);
            }
         );
      },
      []
   );

   return (
      <div className="addabilitytestform">
         <Title text="إنشاء نموذج لاختبار القدرات" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <form onSubmit={e => e.preventDefault()}>
               <label>اسم النموذج :</label>
               <br />
               <TextInput defaultValue={name} inputHook={setName} editable={true} enterHook={() => { }} hint="الاسم" />
               <br />
               <label>هل هو اختبار قبول ؟</label>
               <br />
               <TextInput type="checkbox" defaultValue={isEntry} inputHook={e => setIsEntry(Boolean(e))} editable={true} enterHook={() => { }} hint="سبر قبول" />
               <label>{"المادة :" + subjectName}</label>
               <br />
               <br />
               <MultipletButton open={true} text="اختر المادة" options={subjects} dataHook={setSubject} textHook={setSubjectName} />
               <br />
               <label>الأقسام :</label>
               <br />
               <br />
               {
                  sections.map(
                     (e, i) =>
                        <>
                           <img src="Icons/deleteRed.svg" onClick={() => setSections([...sections].filter((ee, ii) => ii != i))} />
                           <label>{"القسم :"}</label>
                           <br />
                           <TextInput
                              defaultValue={e.name}
                              hint="اسم القسم"
                              inputHook={
                                 value =>
                                    setSections(
                                       [...sections]
                                          .map(
                                             (ee, ii) => {
                                                if (ii === i) ee["name"] = value
                                                return ee;
                                             }
                                          )
                                    )
                              }
                           />
                           <br />
                           <label>{"العلامة الكلية :"}</label>
                           <br />
                           <TextInput
                              defaultValue={e.max_mark}
                              hint="علامة القسم"
                              inputHook={
                                 value =>
                                    setSections(
                                       [...sections]
                                          .map(
                                             (ee, ii) => {
                                                if (ii === i) ee["max_mark"] = value
                                                return ee;
                                             }
                                          )
                                    )
                              }
                           />
                           <br />
                           <label>{"علامة النجاح :"}</label>
                           <br />
                           <TextInput
                              defaultValue={e.min_mark}
                              hint="علامة النجاح في القسم"
                              inputHook={
                                 value =>
                                    setSections(
                                       [...sections]
                                          .map(
                                             (ee, ii) => {
                                                if (ii === i) ee["min_mark"] = value
                                                return ee;
                                             }
                                          )
                                    )
                              }
                           />
                           <br />
                        </>
                  )
               }
               <br />
               <button className="addbtn" onClick={() => setSections([...sections, { "name": "", "min_mark": "", "max_mark": "" }])} >
                  {"أضف قسماً"}
               </button>
               <br />
               <br />
               <br />
               <Button
                  text="إدخال"
                  hook={
                     e => {
                        e.preventDefault();
                        handler.addAbilityTestForm(
                           subject,
                           name,
                           isEntry,
                           sections,
                           () => {
                              //setName("");
                              //setSections([]);
                           }
                        );
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default AddAbilityTestForm;