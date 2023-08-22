import { Title, Multiple, ListOfButtons, InputWithLabel } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { Col, Container, Form, Row } from "react-bootstrap";
import { AddInterface } from "../../Interfaces";

function AddSubject() {
   let [name, setName] = useState("");
   let [grade, setGrade] = useState("");
   let [maxMark, setMaxMark] = useState("");
   let [passMark, setPassMark] = useState("");
   let [notes, setNotes] = useState("");

   let [grades, setGrades] = useState([]);

   useEffect(
      () => {
         handler.getGrades(setGrades);
      }
      , []
   );

   return (
      <AddInterface
         image={
            <img
               src="Images/class.jpg"
               alt=""
               style={{
                  width: "60%",
                  height: "CALC(100% - 73px)",
                  position: "fixed",
                  bottom: "0",
                  left: "0",
                  transform: "translateX(-25%)",
                  clipPath: "ellipse(55% 50% at 30% 50%)"
               }}
            />
         }
         control={
            <>
               <Title text="إضافة مادة" />
               <InputWithLabel
                  id="name"
                  text="اسم المادة"
                  hint="مثال: رياضيات - جبر"
                  value={name}
                  hook={setName}
               />
               <InputWithLabel
                  id="maxMark"
                  type="number"
                  text="العلامة الكلية"
                  hint="العلامة الكلية"
                  value={maxMark}
                  hook={setMaxMark}
               />
               <InputWithLabel
                  id="passMark"
                  type="number"
                  text="علامة النجاح"
                  hint="علامة النجاح"
                  value={passMark}
                  hook={setPassMark}
               />
               <InputWithLabel
                  id="notes"
                  as="textarea"
                  text="ملاحظات"
                  hint="ملاحظات"
                  value={notes}
                  hook={setNotes}
               />
               <Multiple
                  id="grade"
                  text="الصف الذي تتبع له"
                  options={grades}
                  value={grade}
                  hook={setGrade}
               />
            </>
         }
         addFunc={
            () => {
               handler.addSubject(
                  name,
                  grade,
                  maxMark,
                  passMark,
                  notes,
                  () => { }
               );
            }
         }

      />
   );
}

export default AddSubject;