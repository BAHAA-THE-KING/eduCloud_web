import "./ViewTestData.css";

import { Title, TextInput, Button, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handlers from './../../handlers';
import { useParams } from "react-router-dom";

function ViewTestData() {
   const { id } = useParams();

   const [title, setTitle] = useState("");
   const [passMark, setPassMark] = useState("");
   const [maxMark, setMaxMark] = useState("");
   const [date, setDate] = useState("");
   const [type, setType] = useState("");
   const [theClass, setTheClass] = useState();
   const [subject, setSubject] = useState();

   const [typeName, setTypeName] = useState("");
   const [theClassName, setTheClassName] = useState("");
   const [subjectName, setSubjectName] = useState("");
   const [searchGradeName, setSearchGradeName] = useState("");

   const [types, setTypes] = useState([]);

   useEffect(
      () => {
         handlers.getTestData(
            id,
            test => {
               setTitle(test.title);
               setPassMark(test.min_mark);
               setMaxMark(test.max_mark);
               setDate(test.date);
               setType(test.type.id);
               setTypeName(test.type.name);
               const temp = test.g_class.id;
               setTheClass(temp);
               setTheClassName(test.g_class.name);
               setSubjectName(test.subject.name);
               handlers.getSubjects(
                  res => {
                     let temp2;
                     for (const k of res) {
                        let b = false;
                        for (const n of k.g_classes) {
                           if (n.id === temp) {
                              b = true;
                              break;
                           }
                        }
                        if (b) {
                           temp2 = k.name;
                           break;
                        }
                     }
                     setSearchGradeName(temp2);
                  }
               );
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
      <div className="viewtestdata">
         <Title text="تعديل اختبار" />
         <img src="Images/addtest.jpg" alt="" className="bg" />
         <div className="content">
            <form>
               <label>اسم الاختبار :</label>
               <br />
               <TextInput defaultValue={title} inputHook={setTitle} editable={true} enterHook={() => { }} hint="الاسم" />
               <br />
               <label>{"الصف : " + searchGradeName}</label>
               <br />
               <br />
               <label>{"الشعبة : " + theClassName}</label>
               <br />
               <br />
               <label>{"المادة : " + subjectName}</label>
               <br />
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
               <br />
               <Button
                  text="تعديل"
                  hook={
                     e => {
                        e.preventDefault();
                        date.replace("/", "-");
                        handlers.editTest(
                           id,
                           title,
                           passMark,
                           maxMark,
                           type,
                           date,
                           theClass,
                           subject,
                           () => handlers.goTo(handlers.VIEWTESTS)
                        );
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default ViewTestData;