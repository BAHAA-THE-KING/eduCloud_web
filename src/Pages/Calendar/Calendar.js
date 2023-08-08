import "./Calendar.css";

import { Title, TextInput, Button, MultipletButton } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';

function Calendar() {
   const [data, setData] = useState([]);
   const [grade, setGrade] = useState("");
   const [subject, setSubject] = useState("");

   const [gradeName, setGradeName] = useState("");
   const [subjectName, setSubjectName] = useState("");

   const [grades, setGrades] = useState([]);
   const [subjects, setSubjects] = useState([]);

   const [isEdit, setIsEdit] = useState(false);
   const [isAdd, setIsAdd] = useState(false);

   const [id, setId] = useState(null);
   const [title, setTitle] = useState("");
   const [date, setDate] = useState("");
   const [isTest, setIsTest] = useState(false);

   useEffect(
      () => {
         handler.getSubjects(
            data => {
               setGrades(data);
            }
         );
      }
      , []
   );

   useEffect(
      () => {
         let temp = -1;
         for (let i = 0; i < grades.length; i++) {
            if (grades[i].id === grade) {
               temp = i;
               break;
            }
         }
         (temp === -1) ||
            setSubjects(grades[temp].subjects);
      }
      , [grade]
   );

   useEffect(
      () => {
         subject &&
            handler.getBaseCalendar(
               subject,
               data => {
                  setData(data);
               }
            );
      }
      , [subject]
   );

   return (
      <div className="calendar">
         <Title text="إضافة خطة دراسية" />
         <img src="Images/calendar.jpg" alt="" className="bg" />
         <div className="content">
            <form>
               <label>{"الصف : " + gradeName}</label>
               <br />
               <br />
               <MultipletButton
                  editable={!isEdit}
                  open={true}
                  text={"اختر الصف"}
                  options={grades}
                  dataHook={setGrade}
                  textHook={setGradeName}
               />
               <br />
               <label>{"المادة : " + subjectName}</label>
               <br />
               <br />
               <MultipletButton
                  editable={!isEdit}
                  open={true}
                  text={"اختر المادة"}
                  options={subjects}
                  dataHook={setSubject}
                  textHook={setSubjectName}
               />
               <br />
               {
                  data.map(
                     e => {
                        if (e.id === id) {
                           e.title = title;
                           e.date = date;
                           e.is_test = isTest;
                        }
                        return (
                           <>
                              <br />
                              <br />
                              <label>{"العنوان : " + e.title}</label>
                              <br />
                              <TextInput
                                 defaultValue={e.title}
                                 inputHook={
                                    title => {
                                       setTitle(title);
                                       setDate(e.date);
                                       setIsTest(e.is_test);
                                       setId(e.id);
                                    }
                                 }
                                 editable={isEdit}
                                 enterHook={() => { }}
                                 hint="مثال: درس التوابع الخطية"
                              />
                              <br />
                              <label>{"تاربخ الانتهاء : "}</label>
                              <br />
                              <TextInput
                                 type="date"
                                 defaultValue={e.date}
                                 inputHook={
                                    date => {
                                       setTitle(e.title);
                                       setDate(date);
                                       setIsTest(e.is_test);
                                       setId(e.id);
                                    }
                                 }
                                 hint="موعد نهاية الدرس"
                                 editable={isEdit}
                              />
                              <br />
                              <label>{"هل هي اختبار ؟" + (e.is_test ? "نعم" : "لا")}</label>
                              <br />
                              <TextInput
                                 type="checkbox"
                                 defaultValue={!!e.is_test}
                                 inputHook={
                                    isTest => {
                                       setTitle(e.title);
                                       setDate(e.date);
                                       setIsTest(isTest);
                                       setId(e.id);
                                    }
                                 }
                                 editable={isEdit}
                              />
                              <br />
                           </>
                        )
                     }
                  )
               }
               <br />
               <Button
                  text={isEdit ? "إدخال التعديلات" : "تعديل"}
                  hook={
                     e => {
                        e.preventDefault();
                        if (!isEdit) {
                           setIsEdit(true);
                        } else {
                           handler.editCalendar(
                              id,
                              title,
                              date,
                              isTest,
                              () => {
                                 setData(
                                    data.map(
                                       e => {
                                          if (e.id === id)
                                             return {
                                                id,
                                                title,
                                                date,
                                                is_test: isTest
                                             };
                                          return e;
                                       }
                                    )
                                 );
                                 setId(null);
                                 setTitle("");
                                 setDate("");
                                 setIsTest(false);
                                 setIsEdit(false);
                              }
                           );
                        }
                     }
                  }
               />

               <Button
                  text="+"
                  className="add"
                  hook={
                     e => {
                        e.preventDefault();
                        if (!isAdd) {
                           setIsAdd(true);
                           setData(
                              [
                                 ...data,
                                 {
                                    "id": null,
                                    "title": "",
                                    "is_test": false,
                                    "date": "",
                                 }
                              ]
                           );
                        } else {
                           handler.addCalendar(
                              subject,
                              title,
                              date,
                              isTest,
                              item => {
                                 setData([...data, item]);
                                 setId(null);
                                 setTitle("");
                                 setDate("");
                                 setIsTest(false);
                                 setIsAdd(false);
                              }
                           );
                        }
                     }
                  }
               />
            </form>
         </div>
      </div>
   );
}

export default Calendar;