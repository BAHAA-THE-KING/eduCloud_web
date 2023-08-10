import "./AddTest.css";

import { Title, TextInput, Button, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handlers from './../../handlers';
import { useNavigate } from "react-router-dom";

function AddTest() {
   const navigate = useNavigate();

   const [title, setTitle] = useState("");
   //img
   const [passMark, setPassMark] = useState(60);
   const [maxMark, setMaxMark] = useState(100);
   const dateObj = new Date();
   const [date, setDate] = useState(dateObj.getFullYear() + "-" + (dateObj.getMonth().length !== 1 ? "0" + dateObj.getMonth() : dateObj.getMonth()) + "-" + (dateObj.getDay().length !== 1 ? "0" + dateObj.getDay() : dateObj.getDay()));
   const [type, setType] = useState("");
   const [typeName, setTypeName] = useState("");
   const [types, setTypes] = useState([]);
   const [theClass, setTheClass] = useState();
   const [theClassName, setTheClassName] = useState("");
   const [subjects, setSubjects] = useState([]);
   const [subject, setSubject] = useState();
   const [subjectName, setSubjectName] = useState("");
   const [searchGradeName, setSearchGradeName] = useState("");
   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);

   useEffect(
      () => {
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
               setAllClasses(res);
            }
         );
         handlers.getTestForms(
            res => {
               setTypes(res);
            }
         );
      },
      []
   );

   return (
      <div className="addtest">
         <Title text="إنشاء نموذج لاختبار القدرات" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <form>
               <label>اسم النموذج :</label>
               <br />
               <TextInput defaultValue={title} inputHook={setTitle} editable={true} enterHook={() => { }} hint="الاسم" />
               <br />
               <label>العلامة التامة :</label>
               <br />
               <TextInput type="number" defaultValue={maxMark} inputHook={setMaxMark} editable={true} enterHook={() => { }} hint="العلامة" />
               <br />
               <label>علامة النجاح :</label>
               <br />
               <TextInput type="number" defaultValue={passMark} inputHook={setPassMark} editable={true} enterHook={() => { }} hint="العلامة" />
               <br />
               <label>موعد الاختبار :</label>
               <br />
               <TextInput type="date" defaultValue={date} inputHook={setDate} editable={true} enterHook={() => { }} hint="التاريخ" />
               <br />
               <label>{"نوع الاختبار :" + typeName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر النوع"
                  open={true}
                  options={types}
                  dataHook={
                     (type, select) => {
                        if (select) {
                           setType(type);
                        } else {
                           setType("");
                        }
                     }
                  }
                  textHook={type => setTypeName(type)}
               />
               <br />

               <label>{"الصف :" + searchGradeName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر الصف"
                  open={true}
                  options={grades}
                  dataHook={
                     (grade, select) => {
                        setTheClass("");
                        setTheClassName("");
                        setSubject("");
                        setSubjectName("");
                        if (select) {
                           const temp = allClasses.filter(e => e.id === grade)[0].g_classes;
                           setClasses(temp);
                           const temp2 = allClasses.filter(e => e.id === grade)[0].subjects;
                           setSubjects(temp2);
                        } else {
                           setClasses([]);
                           setSubjects([]);
                        }
                     }
                  }
                  textHook={
                     (grade, select) => {
                        if (select) {
                           setSearchGradeName(grade);
                        } else {
                           setSearchGradeName("");
                        }
                     }
                  }
               />
               <br />
               <label>{"الشعبة :" + theClassName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر الشعبة"
                  open={true}
                  options={classes}
                  dataHook={
                     (theclass, select) => {
                        if (select) {
                           setTheClass(theclass);
                        } else {
                           setTheClass("");
                        }
                     }
                  }
                  textHook={theClass => setTheClassName(theClass)}
               />
               <br />
               <label>{"المادة :" + subjectName}</label>
               <br />
               <br />
               <MultipletButton
                  text="اختر المادة"
                  open={true}
                  options={subjects}
                  dataHook={
                     (subject, select) => {
                        if (select) {
                           setSubject(subject);
                        } else {
                           setSubject("");
                        }
                     }
                  }
                  textHook={subject => setSubjectName(subject)}
               />
               <Button
                  text="إدخال"
                  hook={
                     e => {
                        e.preventDefault();
                        handlers.addTest(
                           title,
                           passMark,
                           maxMark,
                           type,
                           date,
                           theClass,
                           subject,
                           () => navigate(handlers.VIEWTESTS)
                        );
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default AddTest;